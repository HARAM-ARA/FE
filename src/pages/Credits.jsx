import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Header from "../components/Header.jsx";
import CreditCard from "../components/CreditCard.jsx";
import { dummyCredits } from "../data/dummyCredits.js";

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

      const response = await axios.get(`${import.meta.env.VITE_API_URL}tch/account`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // 응답 데이터 형식: [{ teamId: 1, teamName: "하람", credit: 10000 }, ...]
      setCredits(response.data.map(team => ({
        id: team.teamId,
        name: team.teamName,
        credit: team.credit
      })));

    } catch (error) {
      console.error("크레딧 조회 실패:", error);
      alert("크레딧 조회에 실패했습니다.");
      // 에러 시 더미 데이터 사용
      setCredits(dummyCredits);
    } finally {
      setLoading(false);
    }
  };

  // 크레딧 추가 핸들러
  const handleAddCredit = async (teamId, amount) => {
    try {
      const token = localStorage.getItem('auth_token');

      const response = await axios.post(`${import.meta.env.VITE_API_URL}tch/account`,
        {
          teamId: teamId,
          amount: amount
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

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
      if (error.response?.data?.error === "UNAUTHORIZED") {
        alert("권한이 없습니다");
      } else if (error.response?.data?.error === "NON_EXIST_TEAM") {
        alert("존재하지 않는 팀입니다");
      } else if (error.response?.data?.error === "INVALID_AMOUNT") {
        alert("올바르지 않은 금액입니다");
      } else {
        alert("크레딧 추가에 실패했습니다. 다시 시도해주세요.");
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
      </Body>
    </Container>
  );
}