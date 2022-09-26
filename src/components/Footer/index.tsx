import React from "react";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import styled from "styled-components";
import footerLogo from "../Footer/IMG/footerLogo.svg";

const LogoContain = styled.img`
  width: 130px;
  height: 130px;
  text-align: center;
`;

const Logo = (props: any) => {
  return <LogoContain alt="footer logo" src={footerLogo} />;
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const getDomain = (domain: string) => {
    window.open(domain);
  };

  return (
    <footer>
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 5 }}
            spacing={5}
            style={{ textAlign: "center" }}
          >
            <Stack align={"flex-start"}>
              <ListHeader>Product</ListHeader>
              <Link href={"Home"} color={"#573b3b"}>
                Home
              </Link>
              <Stack direction={"row"} align={"center"} spacing={2}>
                <Link href={"Project"} color={"#573b3b"}>
                  Project
                </Link>
              </Stack>
              <Stack direction={"row"} align={"center"} spacing={2}>
                <Link href={"Career"} color={"#573b3b"}>
                  Career
                </Link>
              </Stack>
              <Stack direction={"row"} align={"center"} spacing={2}>
                <Link href={"Email"} color={"#573b3b"}>
                  E-mail
                </Link>
                <Tag
                  size={"sm"}
                  bg={useColorModeValue("black", "black")}
                  ml={2}
                  color={"white"}
                >
                  New
                </Tag>
              </Stack>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Company</ListHeader>
              <button
                color={"#573b3b"}
                onClick={() => {
                  getDomain("https://www.hnine.com/");
                }}
              >
                Hnine
              </button>
              <button
                color={"#573b3b"}
                onClick={() => {
                  getDomain("https://jinjin.co.kr/main.do");
                }}
              >
                JinJin System
              </button>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Job</ListHeader>
              <button
                color={"#573b3b"}
                onClick={() => {
                  getDomain("https://www.jobkorea.co.kr/");
                }}
              >
                Jop Korea
              </button>
              <button
                color={"#573b3b"}
                onClick={() => {
                  getDomain("https://www.saramin.co.kr/zf_user/");
                }}
              >
                Saramin
              </button>
              <button
                color={"#573b3b"}
                onClick={() => {
                  getDomain("https://www.wanted.co.kr/");
                }}
              >
                Wanted
              </button>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Follow Us</ListHeader>
              <button
                color={"#573b3b"}
                onClick={() => {
                  getDomain(
                    "https://www.linkedin.com/in/dae-hyeon-han-468005249/"
                  );
                }}
              >
                LinkedIn
              </button>
              <button
                color={"#573b3b"}
                onClick={() => {
                  getDomain(
                    "https://careerly.co.kr/profiles/496283?from=%2Fmessenger&location=gnb/"
                  );
                }}
              >
                Careerly
              </button>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Univ</ListHeader>
              <button
                color={"#573b3b"}
                onClick={() => {
                  getDomain("https://www.hallym.ac.kr/hallym_univ/");
                }}
              >
                Hallym University
              </button>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box py={10}>
          <Flex
            align={"center"}
            _before={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              ml: 8,
            }}
          >
            <Logo />
          </Flex>
          <Text pt={0} fontSize={"sm"} textAlign={"center"}>
            © 2022.8.11 부터 구축된 블로그입니다.
          </Text>
        </Box>
      </Box>
    </footer>
  );
};
export default React.memo(Footer);
