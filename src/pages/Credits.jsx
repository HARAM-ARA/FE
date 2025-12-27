import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import Header from "../components/Header.jsx";
import CreditCard from "../components/CreditCard.jsx";
import { dummyCredits } from "../data/dummyCredits.js";
import eyes from "../assets/eyes.svg";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
`;

const Body = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px;
`;

const TitleSection = styled.div`
  margin-bottom: 20px;
  margin-top: -50px;
`;

const Title = styled.h1`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  margin: 0 0 8px 0;
`;

const Description = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  margin: 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
`;

const Eyes = styled.p`
    color: #000;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 60px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 0;
    opacity: 50%;
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
    opacity: 30%;
  margin: 0;
    color: #000;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const NoneDiv= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    align-self: stretch;
`;

export default function Credits() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  // 전체 팀 크레딧 조회
  useEffect(() => {
    fetchAllCredits();
  }, []);

  const fetchAllCredits = async () => {
    try {
      const token = localStorage.getItem('auth_token');

      const response = await customaxios.get(`${import.meta.env.VITE_API_URL}haram/account`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("크레딧 조회 응답:", response.data);

      // 응답 데이터에서 teams 배열 추출
      const teamsData = response.data.teams || [];

      setCredits(teamsData.map(team => ({
        id: team.teamId,
        name: team.teamName,
        credit: team.teamCredit  // 백엔드는 teamCredit으로 응답
      })));

    } catch (error) {
      console.error("크레딧 조회 실패:", error);
      console.error("에러 응답:", error.response?.data);
      // 404 에러 (팀이 없음)일 경우 빈 배열로 설정
      if (error.response?.status === 404) {
        setCredits([]);
      } else {
        // 다른 에러는 더미 데이터 사용
        setCredits(dummyCredits);
      }
    } finally {
      setLoading(false);
    }
  };

  // 크레딧 추가 핸들러
  const handleAddCredit = async (teamId, amount) => {
    try {
      const token = localStorage.getItem('auth_token');

      console.log("크레딧 추가 요청:", { teamId, amount, token: token ? "있음" : "없음" });

      const response = await customaxios.post(`${import.meta.env.VITE_API_URL}tch/account`,
        {
          teamId: teamId,
          addCredit: amount
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log("크레딧 추가 응답:", response.data);
      const data = response.data;
      // data 예시: { teamId: 1, teamName: "TEAM 하람", credit: 1500, addedAmount: 500 }

      // 서버에서 받은 최신 크레딧 정보로 상태 업데이트
      setCredits(prevCredits =>
        prevCredits.map(team =>
          team.id === teamId
            ? { ...team, credit: data.credit }
            : team
        )
      );

      alert(`${data.teamName}에 ${amount.toLocaleString()} 크레딧이 추가되었습니다!`);

    } catch (error) {
      console.error("크레딧 추가 실패:", error);
      console.error("에러 응답:", error.response?.data);
      console.error("에러 상태:", error.response?.status);

      if (error.response?.status === 403) {
        alert("권한이 없습니다. 선생님 계정으로 로그인해주세요.");
      } else if (error.response?.data?.error === "NON_EXIST_TEAM") {
        alert("존재하지 않는 팀입니다");
      } else if (error.response?.data?.error === "INVALID_AMOUNT") {
        alert("올바르지 않은 금액입니다");
      } else {
        alert(`크레딧 추가에 실패했습니다: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <Header teamName="최병준" isTeacher={true}/>
        <Body>
          <TitleSection>
            <Title>전체 팀 크레딧 조회</Title>
            <Description>데이터를 불러오는 중...</Description>
          </TitleSection>
        </Body>
      </Container>
    );
  }

  return (
    <Container>
      <Header teamName="최병준" isTeacher={true}/>
      <Body>
        <TitleSection>
          <Title>전체 팀 크레딧 조회</Title>
          <Description>모든 팀의 크레딧을 한 눈에 확인하고</Description>
          <Description>팀별로 크레딧을 추가할 수 있어요</Description>
        </TitleSection>
        {credits.length === 0 ? (
            <NoneDiv>
                <Eyes>👀</Eyes>
                <EmptyMessage>현재 등록된 팀이 없어요</EmptyMessage>
            </NoneDiv>
            ) : (
            <GridContainer>
        {credits.map((team) => (
            <CreditCard
            key={team.id}
          id={team.id}
          name={team.name}
          credit={team.credit}
          onAddCredit={handleAddCredit}
      />
        ))}
    </GridContainer>
  )
}
</Body>
</Container>
  );
}