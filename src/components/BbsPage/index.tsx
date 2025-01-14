import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import {
  Breadcrumb,
  BreadcrumbItem,
  TableContainer,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useToast,
} from "@chakra-ui/react";
import "antd/dist/antd.css";
import { Pagination, Input } from "antd";
import WritePage from "./WritePage";
import ContentsPage from "./ContentsPage";
import LoginComponent from "./Login";
import JoinComponent from "./Join";

const Contain = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  position: relative;
`;

const BtnContain = styled.div`
  float: right;
`;

const BreadcrumbContain = styled.div`
  position: absolute;
  padding-left: 91.75%;
  padding-top: 10%;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const BreadcrumbItemText = styled.article`
  font-display: swap;
  font-family: "Kanit", sans-serif;
`;

interface BbsDataFace {
  id: number;
  title: string;
  contents: string;
  register: string;
  date: string;
}

interface ResponseDataFace {
  BOARD_ID: number;
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  REGISTER_ID: string;
  REGISTER_DATE: string;
}

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const BbsPage = () => {
  const pageSize: number = 5;
  const [bbsData, setBbsData] = useState<BbsDataFace[]>([
    {
      id: 0,
      title: "",
      contents: "",
      register: "",
      date: "",
    },
  ]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [contentsId, setContentsId] = useState<number>(0);
  const [contents, setContents] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<any[]>([{}]);
  const [write, setWrite] = useState<boolean>(false);
  const toast = useToast();
  const [current, setCurrent] = useState<number>(0);
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(0);
  const debounceVal = useDebounce(searchKeyword, 400);
  const { t } = useTranslation<string>("");

  /** Get board data function */
  const getBbsList = async () => {
    axios.defaults.withCredentials = true;
    const config = {
      headers: {
        withCredentials: true,
      },
    };
    try {
      //Successful response
      const response = await axios.get(
        "http://localhost:8000/api/boardList",
        config
      );
      const data = response.data;
      setMaxIndex(pageSize);
      setBbsData(
        data.map((item: ResponseDataFace) => ({
          id: item.BOARD_ID,
          title: item.BOARD_TITLE,
          contents: item.BOARD_CONTENT,
          register: item.REGISTER_ID,
          date: moment(item.REGISTER_DATE).format("YYYY MM DD, H:mm:ss a"),
        }))
      );
      setCheckedList([]);
    } catch (error) {
      //Failed to respond
      console.log(error);
    }
  };

  // Search value
  const searchVal = bbsData.filter(
    (i) =>
      !debounceVal || i.title.toUpperCase().includes(debounceVal.toUpperCase())
  );

  /** Function that takes you to the content page of the article when you click on the title */
  const handleContentsPage = (id: number) => {
    setContentsId(id);
    window.scrollTo(0, 0);
    setContents(!contents);
  };

  /** Check box full selection function */
  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray: number[] = [];
      searchVal.forEach((el: { id: any }) => idArray.push(el.id));
      setCheckedList(idArray);
    } else {
      setCheckedList([]);
    }
  };

  /** Checkbox Single Select Function */
  const handleSingleCheck = (checked: boolean, id: {}) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckedList((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckedList(checkedList.filter((el) => el !== id));
    }
  };

  /** Functions that go to the writing page */
  const handleWritePage = () => {
    setWrite(!write);
    window.scrollTo(0, 0);
  };

  /** List delete function */
  const handleDelete = async () => {
    if (checkedList.length === 0) {
      toast({
        title: t("boardDeleteCheckToast1"),
        position: "top-right",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (window.confirm(t("boardDeleteConfirm")) === true) {
      let boardIdList = "";
      checkedList.forEach((v: any) => {
        boardIdList += `'${v}',`;
      });
      try {
        //Successful response
        await axios.post("http://localhost:8000/api/boardDelete", {
          boardIdList: boardIdList.substring(0, boardIdList.length - 1),
        });
        toast({
          title: t("boardDeleteCheckToast2"),
          position: "top-right",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setCheckedList([{}]);
        getBbsList();
      } catch (error) {
        //Failed to respond
        console.log("write error", error);
      }
    } else {
      toast({
        title: t("boardDeleteCheckToast3"),
        position: "top-right",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  /** pagination event handler */
  const handlePageNation = (page: number) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  useEffect(() => {
    getBbsList();
  }, []);

  return (
    <div>
      <BreadcrumbContain>
        <Breadcrumb separator="/">
          <BreadcrumbItem>
            <BreadcrumbItemText>{t("boardBreadcrumbItem1")}</BreadcrumbItemText>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbItemText>{t("boardBreadcrumbItem2")}</BreadcrumbItemText>
          </BreadcrumbItem>
        </Breadcrumb>
      </BreadcrumbContain>
      {write && !contents ? (
        <WritePage />
      ) : !write && contents ? (
        // 해당 title의 id를 조회해 해당 id를 가진 리스트를 컴포넌트에 저장
        <ContentsPage bbsData={bbsData} id={contentsId} />
      ) : (
        <div>
          <Contain>
            <TableContainer padding={"20%"}>
              <Table variant="striped" colorScheme="gray" size="lg">
                <TableCaption
                  placement="top"
                  fontSize={30}
                  paddingBottom={"5%"}
                  zIndex="1"
                >
                  {t("boardTitle")}
                  <LoginComponent />
                  <JoinComponent />
                  <Input.Group compact>
                    <Input.Search
                      allowClear
                      style={{ width: "40%", paddingTop: "5%", float: "right" }}
                      placeholder={t("boardSerchPlaceholder")}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </Input.Group>
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th textAlign={"center"}>
                      <input
                        type="checkbox"
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                        checked={
                          checkedList.length === searchVal.length
                            ? true
                            : checkedList.length === 0
                            ? false
                            : false
                        }
                      />
                    </Th>
                    <Th textAlign={"center"}>{t("boardColNo")}</Th>
                    <Th textAlign={"center"}>{t("boardColTitle")}</Th>
                    <Th textAlign={"center"}>{t("boardColName")}</Th>
                    <Th textAlign={"center"}>{t("boardColDate")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {searchVal
                    .slice(0)
                    .reverse()
                    .map(
                      (item: BbsDataFace, index: number) =>
                        index >= minIndex &&
                        index < maxIndex && (
                          <Tr key={item.id}>
                            <Td textAlign={"center"}>
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  handleSingleCheck(e.target.checked, item.id)
                                }
                                checked={
                                  checkedList.includes(item.id) ? true : false
                                }
                              ></input>
                            </Td>
                            <Td textAlign={"center"}>{item.id}</Td>
                            <Td textAlign={"left"}>
                              <button
                                onClick={() => handleContentsPage(item.id)}
                              >
                                {item.title.length < 10
                                  ? item.title
                                  : item.title.slice(0, 9) + "..."}
                              </button>
                            </Td>
                            <Td textAlign={"left"}>
                              {item.register.length < 4
                                ? item.register
                                : item.register.slice(0, 3) + "..."}
                            </Td>
                            <Td textAlign={"left"}>{item.date}</Td>
                          </Tr>
                        )
                    )}
                </Tbody>
              </Table>
              <div style={{ paddingLeft: "45%", paddingRight: "45%" }}>
                <Pagination
                  pageSize={pageSize}
                  current={current}
                  total={bbsData.length}
                  onChange={handlePageNation}
                  style={{
                    marginTop: "10px",
                    float: "left",
                    background: "white",
                  }}
                  size="small"
                />
              </div>
              <BtnContain>
                <Button
                  colorScheme="messenger"
                  variant="ghost"
                  onClick={handleWritePage}
                >
                  {t("boardWriteBtn")}
                </Button>
                <Button
                  colorScheme="messenger"
                  variant="ghost"
                  onClick={handleDelete}
                >
                  {t("boardDeleteBtn")}
                </Button>
              </BtnContain>
            </TableContainer>
          </Contain>
        </div>
      )}
    </div>
  );
};

export default React.memo(BbsPage);
