import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { AxiosInstnce } from "../lib/customAxios.js";


const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const RankingCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  padding: 17px 19px;
  align-self: stretch;
  
  overflow-y: auto;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #D9D9D9;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RankingItem = styled.div`
    display: flex;
    padding: 22px 40px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
  border-radius: 16px;
  background: ${props => props.isMyTeam ? '#FFF4E6' : '#FFFFFF'};
  border: 1px solid ${props => props.isMyTeam ? 'none' : '#8B8B8B'};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isMyTeam ? '#FFF4E6' : '#F9F9F9'};
  }
`;

const RankingLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Rank = styled.div`
    color: #1D1D1D;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin-right:30px;
`;

const TeamName = styled.div`
    color: #1D1D1D;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

const Credit = styled.div`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  margin-left: auto;
`;

const LoadingText = styled.div`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 18px;
  text-align: center;
  padding: 40px 0;
`;

const EmptyText = styled.div`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 18px;
  text-align: center;
  padding: 40px 0;
`;

const Divider = styled.div`
  text-align: center;
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  margin: 8px 0;
`;

export default function TeamRanking({ isBeforeLogin = false }) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myTeamId, setMyTeamId] = useState(null);

  useEffect(() => {
    fetchRankings();

    // 10분(600000ms)마다 순위 자동 갱신
    const interval = setInterval(() => {
      fetchRankings();
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  const fetchRankings = async () => {
    try {
      setLoading(true);

      if (!isBeforeLogin) {
        const accountResponse = await AxiosInstnce.get('std/account');
        const myTeam = accountResponse.data.teamId;
        setMyTeamId(myTeam);
      }

      const allTeamsResponse = await AxiosInstnce.get('haram/account');
      let raw = allTeamsResponse.data;

        console.log("API 응답 전체:", raw);

        // API 응답이 배열이 아닐 수도 있으므로 안전 처리
        let teams = [];

        if (Array.isArray(raw)) {
            teams = raw;
        } else if (Array.isArray(raw?.teams)) {
            teams = raw.teams;
        } else if (Array.isArray(raw?.data)) {
            teams = raw.data;
        } else if (raw && typeof raw === "object") {
            // 객체 형태면 values를 배열로 변환
            teams = Object.values(raw);
        } else {
            teams = [];
        }

        console.log("추출된 teams 배열:", teams);



      const sortedTeams = teams
         .sort((a, b) => {
           const creditA = Number(a.teamCredit) || 0;
           const creditB = Number(b.teamCredit) || 0;
           return creditB - creditA; // 내림차순: 크레딧이 큰 팀이 앞으로
         })
        .map((team, index) => ({
          teamId: team.teamId,
          teamName: team.teamName,
          credit: Number(team.teamCredit) || 0,
          rank: index + 1
        }));

      console.log("정렬된 팀 순위:", sortedTeams.map(t => `${t.rank}위: TEAM ${t.teamId} - ${t.credit}원`));

      setRankings(sortedTeams);

    } catch (error) {
      console.error("팀 순위 조회 실패:", error);

      setRankings([
        { teamId: 2, credit: 45000, rank: 1 },
        { teamId: 3, credit: 40000, rank: 2 },
        { teamId: 4, credit: 35000, rank: 3 },
        { teamId: 5, credit: 30000, rank: 4 },
        { teamId: 6, credit: 30000, rank: 5 },
        { teamId: 1, credit: 20000, rank: 6 },
      ]);
      setMyTeamId(1);
    } finally {
      setLoading(false);
    }
  };

  // 내 팀 순위 찾기
  const myTeamRank = rankings.find(team => team.teamId === myTeamId)?.rank;
  const showMyTeamSeparately = myTeamRank && myTeamRank > 5;

  // 상위 5개 팀
  const top5Teams = rankings.slice(0, 5);

  // 내 팀 (5위 이하인 경우)
  const myTeam = showMyTeamSeparately ? rankings.find(team => team.teamId === myTeamId) : null;

  return (

      <RankingCard>
        {loading ? (
          <LoadingText>순위를 불러오는 중...</LoadingText>
        ) : rankings.length === 0 ? (
          <EmptyText>순위 정보가 없습니다</EmptyText>
        ) : (
          <RankingList>
            {/* 상위 5개 팀 표시 */}
            {top5Teams.map((team) => (
              <RankingItem
                key={team.teamId}
                isMyTeam={team.teamId === myTeamId}
              >
                <RankingLeft>
                  <Rank rank={team.rank}>
                    {team.rank}위
                  </Rank>
                  <TeamName isMyTeam={team.teamId === myTeamId}>
                    TEAM {team.teamId}
                  </TeamName>
                </RankingLeft>
              </RankingItem>
            ))}


            {showMyTeamSeparately && myTeam && (
              <>
                <Divider>•••</Divider>
                <RankingItem
                  key={myTeam.teamId}
                  isMyTeam={true}
                >
                  <RankingLeft>
                    <Rank rank={myTeam.rank}>
                      {myTeam.rank}위
                    </Rank>
                    <TeamName isMyTeam={true}>
                      TEAM {myTeam.teamId}
                    </TeamName>
                  </RankingLeft>
                </RankingItem>
              </>
            )}
          </RankingList>
        )}
      </RankingCard>

  );
}