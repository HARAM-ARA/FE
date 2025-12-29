import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import { useCredit } from "../context/CreditContext.jsx";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
`;

const Body = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px 50px 50px;
`;

const TitleSection = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  color: #6B7280;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
`;

const TeamInfoCard = styled.div`
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const TeamNameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TeamBadge = styled.div`
  background: linear-gradient(135deg, #F07F23 0%, #FDB882 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
`;

const TeamName = styled.h2`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

const CreditDisplay = styled.div`
  text-align: right;
`;

const CreditLabel = styled.div`
  color: #6B7280;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const CreditAmount = styled.div`
  color: #F07F23;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

const StatValue = styled.div`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  color: #6B7280;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
`;

const MembersSection = styled.div`
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px 0;
`;

const MembersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const MemberCard = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
`;

const MemberAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #F07F23 0%, #FDB882 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const MemberRole = styled.div`
  color: #6B7280;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
`;

const MemberNumber = styled.div`
  color: #9CA3AF;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  margin-top: 2px;
`;

const MemberActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LeaderButton = styled.button`
  background: ${props => props.isLeader ? '#10B981' : '#F07F23'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  cursor: ${props => props.isLeader ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover {
    background: ${props => props.isLeader ? '#10B981' : props.disabled ? '#F07F23' : '#E06B1F'};
    transform: ${props => props.isLeader || props.disabled ? 'none' : 'translateY(-1px)'};
  }

  &:active {
    transform: ${props => props.isLeader || props.disabled ? 'none' : 'translateY(0)'};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #6B7280;
  font-family: Pretendard;
  font-size: 18px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #EF4444;
  font-family: Pretendard;
  font-size: 18px;
`;

export default function MyTeam() {
  const { teamName, teamId, credit } = useCredit();
  const [teamData, setTeamData] = useState(null);
  const [teamRank, setTeamRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [changingLeader, setChangingLeader] = useState(null);
  const [leaderId, setLeaderId] = useState(null);

  useEffect(() => {
    fetchTeamData();
  }, [teamId]);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 현재 사용자의 계정 정보 조회 (팀 정보 포함)
      const accountResponse = await customaxios.get('std/account');

      // 전체 팀 순위 조회
      const rankingsResponse = await customaxios.get('haram/account');
      let teams = [];

      if (Array.isArray(rankingsResponse.data)) {
        teams = rankingsResponse.data;
      } else if (Array.isArray(rankingsResponse.data?.teams)) {
        teams = rankingsResponse.data.teams;
      } else if (Array.isArray(rankingsResponse.data?.data)) {
        teams = rankingsResponse.data.data;
      }

      const sortedTeams = teams
        .sort((a, b) => (Number(b.teamCredit) || 0) - (Number(a.teamCredit) || 0))
        .map((team, index) => ({
          ...team,
          rank: index + 1
        }));

      const myTeamRank = sortedTeams.find(team => team.teamId === teamId)?.rank || 0;

      // API 응답에서 실제 팀원 데이터 사용
      const teamMembers = accountResponse.data?.members || [];
      const currentLeaderId = accountResponse.data?.leaderId;
      setLeaderId(currentLeaderId);

      // 팀장을 맨 앞에 배치하고 역할 설정
      const processedMembers = teamMembers
        .map(member => ({
          id: member.id,
          name: member.name,
          userNumber: member.userNumber,
          role: member.id === currentLeaderId ? "팀장" : "팀원"
        }))
        .sort((a, b) => {
          // 팀장을 맨 앞에 배치
          if (a.role === "팀장") return -1;
          if (b.role === "팀장") return 1;
          return 0;
        });

      setTeamData({
        members: processedMembers,
        teamId: accountResponse.data?.teamId,
        teamName: accountResponse.data?.teamName,
        credit: accountResponse.data?.credit
      });
      setTeamRank(myTeamRank);

    } catch (error) {
      console.error("팀 데이터 조회 실패:", error);
      setError("팀 정보를 불러오는데 실패했습니다.");

      // 임시 데이터 (개발용)
      setTeamData({
        members: [
          { id: 1, name: "김학생", role: "팀장", userNumber: "1001" },
          { id: 2, name: "이학생", role: "팀원", userNumber: "1002" },
          { id: 3, name: "박학생", role: "팀원", userNumber: "1003" },
          { id: 4, name: "최학생", role: "팀원", userNumber: "1004" }
        ]
      });
      setTeamRank(3);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeLeader = async (studentId) => {
    try {
      setChangingLeader(studentId);

      await customaxios.post('std/team/leader', {
        student: studentId
      });

      // 성공 후 팀 데이터 다시 조회
      await fetchTeamData();

    } catch (error) {
      console.error("팀장 변경 실패:", error);
      alert("팀장은 한 번만 설정할 수 있습니다");
    } finally {
      setChangingLeader(null);
    }
  };

  if (loading) {
    return (
      <>
        <Header isTeamName="true" isCredit="true" />
        <Container>
          <Body>
            <LoadingContainer>팀 정보를 불러오는 중...</LoadingContainer>
          </Body>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header isTeamName="true" isCredit="true" />
      <Container>
        <Body>
          <TitleSection>
            <Title>내 팀</Title>
            <Subtitle>우리 팀의 정보와 현황을 확인해 보세요. 단, 팀장은 한 번만 설정할 수 있습니다.</Subtitle>
          </TitleSection>

          <TeamInfoCard>
            <TeamHeader>
              <TeamNameSection>
                <TeamBadge>TEAM</TeamBadge>
                <TeamName>{teamName}</TeamName>
              </TeamNameSection>
              <CreditDisplay>
                <CreditLabel>보유 크레딧</CreditLabel>
                <CreditAmount>{(teamData?.credit || credit).toLocaleString()}원</CreditAmount>
              </CreditDisplay>
            </TeamHeader>

            <StatsGrid>
              <StatCard>
                <StatValue>{teamRank || '-'}위</StatValue>
                <StatLabel>현재 순위</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{teamData?.members?.length || 0}명</StatValue>
                <StatLabel>팀원 수</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{(teamData?.credit || credit).toLocaleString()}</StatValue>
                <StatLabel>총 크레딧</StatLabel>
              </StatCard>
            </StatsGrid>
          </TeamInfoCard>

          <MembersSection>
            <SectionTitle>팀원 목록</SectionTitle>
            {error ? (
              <ErrorContainer>{error}</ErrorContainer>
            ) : (
              <MembersList>
                {teamData?.members?.map((member, index) => (
                  <MemberCard key={member.id || index}>
                    <MemberAvatar>
                      {member.name?.charAt(0) || '?'}
                    </MemberAvatar>
                    <MemberInfo>
                      <MemberName>{member.name || '알 수 없음'}</MemberName>
                      <MemberRole>{member.role || '팀원'}</MemberRole>
                      {member.userNumber && (
                        <MemberNumber>학번: {member.userNumber}</MemberNumber>
                      )}
                    </MemberInfo>
                    <MemberActions>
                      <LeaderButton
                        isLeader={member.role === '팀장'}
                        disabled={changingLeader === member.id || (leaderId !== null && member.role !== '팀장')}
                        onClick={() => handleChangeLeader(member.id)}
                      >
                        {changingLeader === member.id ? '변경중...' :
                          member.role === '팀장' ? '팀장' : '팀장 지정'}
                      </LeaderButton>
                    </MemberActions>
                  </MemberCard>
                )) || (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6B7280', padding: '40px 0' }}>
                      팀원 정보가 없습니다.
                    </div>
                  )}
              </MembersList>
            )}
          </MembersSection>
        </Body>
      </Container>
    </>
  );
}