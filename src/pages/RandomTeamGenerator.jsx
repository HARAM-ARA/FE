import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const getEmbeddedStudents = () => {
    // Combine team3 and team4, then filter by year
    const allEmbedded = [...mockdata.team3, ...mockdata.team4];
    const secondYear = allEmbedded.filter(s => s.id.startsWith('2'));
    const firstYear = allEmbedded.filter(s => s.id.startsWith('1'));
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
    
    // Find fixed constraint students - search across ALL data
    const allStudents = [...mockdata.team1, ...mockdata.team2, ...mockdata.team3, ...mockdata.team4];
    const findStudent = (name) => {
      return allStudents.find(s => s.name === name);
    };

    // All 6 fixed pairs are in embedded, so remove them from SW
    const fixedStudents = [
      findStudent("정태양"),
      findStudent("공재욱"),
      findStudent("제성주"),
      findStudent("김민석"),
      findStudent("이주영"),
      findStudent("이승환"),
      findStudent("방민준"),
      findStudent("안재민"),
      findStudent("김우성"),
      findStudent("김현호"),
    ].filter(Boolean);

    // Remove fixed students from available pool
    const availableSecond = shuffle(secondYear.filter(s => 
      !fixedStudents.some(fixed => fixed?.id === s.id)
    ));
    const availableFirst = shuffle(firstYear.filter(s => 
      !fixedStudents.some(fixed => fixed?.id === s.id)
    ));

    // Generate random team numbers for SW (1-28 excluding 3, 8, 13, 18, 23, 28)
    const embeddedNumbers = [3, 8, 13, 18, 23, 28];
    const swNumbers = shuffle(
      Array.from({ length: 28 }, (_, i) => i + 1).filter(n => !embeddedNumbers.includes(n))
    );

    const teams = [];
    let secondIdx = 0;
    let firstIdx = 0;
    let numberIdx = 0;

    // 4-person teams (16개): 2학년 2명 + 1학년 2명
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

    // 5-person teams (4개): 2학년 3명 + 1학년 2명
    for (let i = 0; i < 4; i++) {
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

    // 5-person teams (2개): 2학년 2명 + 1학년 3명
    for (let i = 0; i < 2; i++) {
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
    const { secondYear, firstYear } = getEmbeddedStudents();
    
    // Find fixed constraint students - search across ALL data
    const allStudents = [...mockdata.team1, ...mockdata.team2, ...mockdata.team3, ...mockdata.team4];
    const findStudent = (name) => {
      return allStudents.find(s => s.name === name);
    };

    // All 6 fixed pairs go to embedded
    const fixedPairs = [
      [findStudent("정태양"), findStudent("공재욱")],
      [findStudent("제성주"), findStudent("김민석")],
      [findStudent("이주영"), findStudent("이승환")],
      [findStudent("방민준"), findStudent("안재민")],
      [findStudent("김우성"), null], // alone
      [findStudent("김현호"), null], // alone
    ];

    // Flatten fixed pairs to get all fixed students
    const fixedStudents = fixedPairs.flat().filter(Boolean);

    // Remove fixed students from available pool
    const availableSecond = shuffle(secondYear.filter(s => 
      !fixedStudents.some(fixed => fixed?.id === s.id)
    ));
    const availableFirst = shuffle(firstYear.filter(s => 
      !fixedStudents.some(fixed => fixed?.id === s.id)
    ));

    const teams = [];
    let secondIdx = 0;
    let firstIdx = 0;

    // Fixed embedded team numbers: 3, 8, 13, 18, 23, 28
    const embeddedNumbers = [3, 8, 13, 18, 23, 28];

    // Teams 1-4: Pairs with 2학년 1명 + 1학년 3명 (5명 팀)
    for (let i = 0; i < 4; i++) {
      const pair = fixedPairs[i];
      const members = [
        ...pair,
        availableSecond[secondIdx++],
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
      ].filter(Boolean);
      
      if (members.length === 5) {
        teams.push({
          name: `임베디드 ${embeddedNumbers[i]}팀`,
          members
        });
      }
    }

    // Team 5: 김우성 alone with 1학년 3명 (4명 팀)
    const kimWooSung = fixedPairs[4][0];
    if (kimWooSung) {
      const members = [
        kimWooSung,
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
      ].filter(Boolean);
      
      if (members.length === 4) {
        teams.push({
          name: `임베디드 ${embeddedNumbers[4]}팀`,
          members
        });
      }
    }

    // Team 6: 김현호 alone with 1학년 3명 (4명 팀)
    const kimHyunHo = fixedPairs[5][0];
    if (kimHyunHo) {
      const members = [
        kimHyunHo,
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
        availableFirst[firstIdx++],
      ].filter(Boolean);
      
      if (members.length === 4) {
        teams.push({
          name: `임베디드 ${embeddedNumbers[5]}팀`,
          members
        });
      }
    }

    return teams;
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

      // 팀 데이터를 백엔드 형식으로 변환
      const teamsObject = allTeams.reduce((acc, team, index) => {
        acc[index + 1] = team.members.map(member => parseInt(member.id));
        return acc;
      }, {});

      const requestBody = {
        teams: teamsObject
      };

      console.log("전송할 데이터:", JSON.stringify(requestBody, null, 2));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}tch/append`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("팀 저장 성공:", response.data);
      alert("팀이 성공적으로 생성되었습니다!");
      navigate('/teams');
    } catch (error) {
      console.error("팀 저장 실패:", error);
      console.error("에러 상세:", error.response?.data);
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
                <InfoText>2학년 3명 + 1학년 2명 → 4팀</InfoText>
                <InfoText>2학년 2명 + 1학년 3명 → 2팀</InfoText>
              </TeamInfo>
              <GenerateButton onClick={handleGenerateSoftware}>
                랜덤으로 팀 생성하기
              </GenerateButton>
            </TrackCard>


            <TrackCard>
              <TrackTitle>임베디드소프트웨어 트랙</TrackTitle>
              <TeamInfo>
                <InfoText>2학년 1명 + 1학년 3명 → 2팀</InfoText>
                <InfoText>2학년 2명 + 1학년 3명 → 4팀</InfoText>
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
                        {team.members.map((member, mIdx) => (
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
                        {team.members.map((member, mIdx) => (
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