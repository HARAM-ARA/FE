import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import Header from "../components/Header.jsx";
import { mockdata } from "../data/studentData.js";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background: #fff;
  min-height: calc(100vh - 200px);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
    color: #1D1D1D;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 44.8px */
    margin:0;
`;

const Subtitle = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

const TracksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const TrackCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 48px;
  border-radius: 16px;
  
  width: 500px;
`;

const TrackTitle = styled.h2`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const InfoText = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  text-align: center;
`;

const GenerateButton = styled.button`
  padding: 16px 48px;
  border-radius: 12px;
  border: 1px solid #8B8B8B;
  background: #FFFFFF;
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
    color: #B2B2B2;

  &:hover {
    background: #F5F5F5;
  }

  &:active {
    background: #E5E5E5;
  }
`;

const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 40px;
  padding: 32px;
  border-radius: 16px;
  background: #F9F9F9;
`;

const ResultTitle = styled.h3`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TeamItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
`;

const TeamName = styled.div`
  color: #F07F23;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Member = styled.span`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  background: #F5F5F5;
`;

const SaveButton = styled.button`
  padding: 16px 48px;
  border-radius: 12px;
  border: none;
  background: #F07F23;
  color: #FFFFFF;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  align-self: center;
  margin-top: 20px;

  &:hover {
    background: #E06F1F;
  }

  &:active {
    background: #D05F1A;
  }

  &:disabled {
    background: #B2B2B2;
    cursor: not-allowed;
  }
`;

export default function RandomTeamGenerator() {
  const navigate = useNavigate();
  const [softwareTeams, setSoftwareTeams] = useState(null);
  const [embeddedTeams, setEmbeddedTeams] = useState(null);
  const [isSaving, setIsSaving] = useState(false);


  const getSoftwareStudents = () => {
    // Combine team1 and team2, then filter by year
    const allSoftware = [...mockdata.team1, ...mockdata.team2];
    const secondYear = allSoftware.filter(s => s.id.startsWith('2'));
    const firstYear = allSoftware.filter(s => s.id.startsWith('1'));
    return { secondYear, firstYear };
  };

  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 소프트웨어 팀 생성
  const generateSoftwareTeams = () => {
    const { secondYear, firstYear } = getSoftwareStudents();
    
    // 랜덤 셔플
    const availableSecond = shuffle(secondYear);
    const availableFirst = shuffle(firstYear);

    // Generate random team numbers for SW (1-27 excluding 3, 8, 13, 18, 23, 28)
    const embeddedNumbers = [3, 8, 13, 18, 23, 28];
    const swNumbers = shuffle(
      Array.from({ length: 28 }, (_, i) => i + 1).filter(n => !embeddedNumbers.includes(n))
    );

    const teams = [];
    let secondIdx = 0;
    let firstIdx = 0;
    let numberIdx = 0;

    // 4명 팀 16개: 2학년 2명 + 1학년 2명
    for (let i = 0; i < 16; i++) {
      const members = [
        availableSecond[secondIdx++],
        availableSecond[secondIdx++],
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
      ].filter(Boolean);

      if (members.length === 4) {
        teams.push({
          name: `소프트웨어 ${swNumbers[numberIdx++]}팀`,
          members
        });
      }
    }

    // 5명 팀 3개: 2학년 3명 + 1학년 2명
    for (let i = 0; i < 3; i++) {
      const members = [
        availableSecond[secondIdx++],
        availableSecond[secondIdx++],
        availableSecond[secondIdx++],
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
      ].filter(Boolean);

      if (members.length === 5) {
        teams.push({
          name: `소프트웨어 ${swNumbers[numberIdx++]}팀`,
          members
        });
      }
    }

    // 5명 팀 3개: 2학년 2명 + 1학년 3명
    for (let i = 0; i < 3; i++) {
      const members = [
        availableSecond[secondIdx++],
        availableSecond[secondIdx++],
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
      ].filter(Boolean);

      if (members.length === 5) {
        teams.push({
          name: `소프트웨어 ${swNumbers[numberIdx++]}팀`,
          members
        });
      }
    }

    return teams;
  };


  const generateEmbeddedTeams = () => {
    // 고정된 임베디드 2학년 팀들
    const fixedTeams = [
      { name: "임베디드 3팀", members: [...mockdata.team4] }, // 정태양, 공재욱
      { name: "임베디드 8팀", members: [...mockdata.team5] }, // 김민석, 제성주
      { name: "임베디드 13팀", members: [...mockdata.team6] }, // 이승환, 이주영
      { name: "임베디드 18팀", members: [...mockdata.team7] }, // 안재민, 방민준
      { name: "임베디드 23팀", members: [...mockdata.team8] }, // 김우성
      { name: "임베디드 28팀", members: [...mockdata.team9] }, // 김현호
    ];

    // team3에서 1학년 학생들을 랜덤으로 섞기
    const availableFirstYear = shuffle([...mockdata.team3]);
    
    let firstYearIndex = 0;
    
    // 각 팀에 1학년 3명씩 추가
    fixedTeams.forEach(team => {
      // 모든 팀에 1학년 3명 추가
      for (let i = 0; i < 3; i++) {
        if (firstYearIndex < availableFirstYear.length) {
          team.members.push(availableFirstYear[firstYearIndex++]);
        }
      }
    });

    return fixedTeams;
  };

  const handleGenerateSoftware = () => {
    const teams = generateSoftwareTeams();
    setSoftwareTeams(teams);
  };

  const handleGenerateEmbedded = () => {
    const teams = generateEmbeddedTeams();
    setEmbeddedTeams(teams);
  };

  // 팀 데이터를 백엔드로 전송
  const handleSaveTeams = async () => {
    const allTeams = [...(softwareTeams || []), ...(embeddedTeams || [])];

    if (allTeams.length === 0) {
      alert("생성된 팀이 없습니다. 먼저 팀을 생성해주세요.");
      return;
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem("auth_token");


      // 팀 이름에서 번호를 추출하여 사용 (예: "소프트웨어 5팀" → 5, "임베디드 3팀" → 3)
      const teamsObject = allTeams.reduce((acc, team) => {
        const teamNumber = parseInt(team.name.match(/\d+/)[0]);
        acc[teamNumber] = team.members.map(member => parseInt(member.id));
        return acc;
      }, {});

      const requestBody = {
        teams: teamsObject
      };



      const response = await customaxios.post(
        `${import.meta.env.VITE_API_URL}tch/append`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );


      alert("팀이 성공적으로 생성되었습니다!");
      navigate('/teams');
    } catch (error) {

      alert("팀 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Header isTeacher={true} />
      <Body>
        <Container>
          <TitleSection>
            <Title>팀 랜덤 생성</Title>
            <Subtitle>소프트웨어개발 트랙과 임베디드소프트웨어 트랙을 나눠 팀을 랜덤 생성해요</Subtitle>
          </TitleSection>

          <TracksContainer>

            <TrackCard>
              <TrackTitle>소프트웨어개발 트랙</TrackTitle>
              <TeamInfo>
                <InfoText>2학년 2명 + 1학년 2명 → 16팀</InfoText>
                <InfoText>2학년 3명 + 1학년 2명 → 3팀</InfoText>
                <InfoText>2학년 2명 + 1학년 3명 → 3팀</InfoText>
              </TeamInfo>
              <GenerateButton onClick={handleGenerateSoftware}>
                랜덤으로 팀 생성하기
              </GenerateButton>
            </TrackCard>


            <TrackCard>
              <TrackTitle>임베디드소프트웨어 트랙</TrackTitle>
              <TeamInfo>
                <InfoText>고정된 2학년 팀 + 1학년 3명씩 배정</InfoText>
                <InfoText>2명 팀 4개 + 1학년 3명씩 → 5명 팀</InfoText>
                <InfoText>1명 팀 2개 + 1학년 3명씩 → 4명 팀</InfoText>
              </TeamInfo>
              <GenerateButton onClick={handleGenerateEmbedded}>
                랜덤으로 팀 생성하기
              </GenerateButton>
            </TrackCard>
          </TracksContainer>

          {softwareTeams && (
            <ResultSection>
              <ResultTitle>소프트웨어개발 트랙 팀 목록</ResultTitle>
              <TeamList>
                {softwareTeams
                  .sort((a, b) => {
                    const aNum = parseInt(a.name.match(/\d+/)[0]);
                    const bNum = parseInt(b.name.match(/\d+/)[0]);
                    return aNum - bNum;
                  })
                  .map((team, idx) => (
                    <TeamItem key={idx}>
                      <TeamName>{team.name}</TeamName>
                      <MemberList>
                        {team.members
                          .sort((a, b) => a.id.localeCompare(b.id))
                          .map((member, mIdx) => (
                            member && <Member key={mIdx}>{member.name} ({member.id})</Member>
                          ))}
                      </MemberList>
                    </TeamItem>
                  ))}
              </TeamList>
            </ResultSection>
          )}


          {embeddedTeams && (
            <ResultSection>
              <ResultTitle>임베디드소프트웨어 트랙 팀 목록</ResultTitle>
              <TeamList>
                {embeddedTeams
                  .sort((a, b) => {
                    const aNum = parseInt(a.name.match(/\d+/)[0]);
                    const bNum = parseInt(b.name.match(/\d+/)[0]);
                    return aNum - bNum;
                  })
                  .map((team, idx) => (
                    <TeamItem key={idx}>
                      <TeamName>{team.name}</TeamName>
                      <MemberList>
                        {team.members
                          .sort((a, b) => a.id.localeCompare(b.id))
                          .map((member, mIdx) => (
                            member && <Member key={mIdx}>{member.name} ({member.id})</Member>
                          ))}
                      </MemberList>
                    </TeamItem>
                  ))}
              </TeamList>
            </ResultSection>
          )}

          {(softwareTeams || embeddedTeams) && (
            <SaveButton onClick={handleSaveTeams} disabled={isSaving}>
              {isSaving ? "저장 중..." : "팀 저장하기"}
            </SaveButton>
          )}
        </Container>
      </Body>
    </>
  );
}