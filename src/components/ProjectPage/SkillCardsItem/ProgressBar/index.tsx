import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Contain = styled.div`
  margin: 20px;
  padding: 20px;
  @media screen and (max-width: 500px) {
    padding: 10px;
  }
`;

const ProgressLabel = styled.div`
  display: flex;
  position: absolute;
  font-family: "Kanit", sans-serif;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const LabelImgBox = styled.img`
  width: 20px;
  height: 15px;
  margin: auto;
  padding-bottom: 1%;
  position: flex;
`;

const ProgressVisualFull = styled.div`
  display: flex;
  height: 6px;
  margin: 20px 0;
`;

const ProgressVisulaPart = styled.div`
  transition: width 4s;
`;

const ProgressPercent = styled.p`
  float: right;
  padding-top: 1%;
  color: black;
  font-family: "Kanit", sans-serif;
  @media screen and (max-width: 500px) {
    padding-top: 10%;
    font-size: 12px;
  }
`;

const ProgressLine = ({
  label,
  logoImg,
  backgroundColor = "#e5e5e5",
  visualParts = [
    {
      percentage: "0%",
      color: "white",
    },
  ],
}: {
  label: string;
  logoImg: any;
  backgroundColor: string;
  visualParts: any;
}) => {
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    })
  );

  useEffect(() => {
    requestAnimationFrame(() =>
      setWidths(
        visualParts.map((item: any) => {
          return item.percentage;
        })
      )
    );
  }, [visualParts]);

  return (
    <Contain>
      <ProgressLabel>
        <LabelImgBox src={logoImg} alt="Logo Img" />
        {label}
      </ProgressLabel>
      <ProgressVisualFull
        style={{
          backgroundColor,
        }}
      >
        {visualParts.map((item: any, index: number) => {
          return (
            <ProgressVisulaPart
              key={index}
              style={{
                width: widths[index],
                backgroundColor: item.color,
              }}
            >
              <ProgressPercent>{item.percentage}</ProgressPercent>
            </ProgressVisulaPart>
          );
        })}
      </ProgressVisualFull>
    </Contain>
  );
};

export default ProgressLine;