import React from "react";
import styled from "@emotion/styled";
import Timer from "../components/Timer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
`;

export default function TeacherTimer() {
  return (
    <Container>
      <Title>선생님 타이머</Title>
      <Timer isTeacher={true} showAnnouncement={true} />
    </Container>
  );
}