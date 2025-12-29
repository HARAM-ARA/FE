import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: #fff;
  min-height: 100vh;
`;

const Body = styled.div`
  padding: 50px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TitleSection = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 10px 0;
`;

const Subtitle = styled.p`
  color: #8B8B8B;
  font-family: Pretendard;
  font-size: 16px;
  margin: 0;
`;

const TeamSelector = styled.div`
  margin-bottom: 30px;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
`;

const TeamCard = styled.div`
  border: 2px solid ${props => props.selected ? '#007bff' : '#e9ecef'};
  border-radius: 12px;
  padding: 16px;
  background: ${props => props.selected ? '#f8f9ff' : '#fff'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #007bff;
    background: #f8f9ff;
  }
`;

const TeamName = styled.h3`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const TeamCredit = styled.p`
  color: #007bff;
  font-family: Pretendard;
  font-size: 14px;
  margin: 0;
`;

const SelectedTeamInfo = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
`;

const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PurchaseItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const ItemDetails = styled.div`
  display: flex;
  gap: 20px;
  color: #6c757d;
  font-family: Pretendard;
  font-size: 14px;
`;

const PurchaseDate = styled.div`
  color: #8B8B8B;
  font-family: Pretendard;
  font-size: 12px;
  text-align: right;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #8B8B8B;
  font-family: Pretendard;
  font-size: 16px;
`;

const BackButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background: #0056b3;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
  font-family: Pretendard;
  font-size: 16px;
`;

export default function TeacherPurchases() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await customaxios.get(`${import.meta.env.VITE_API_URL}haram/team`);
      setTeams(response.data.teams || []);
    } catch (err) {
      console.error('팀 목록 조회 실패:', err);
      setError('팀 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamPurchases = async (teamId) => {
    try {
      setPurchaseLoading(true);
      const response = await customaxios.get(`${import.meta.env.VITE_API_URL}tch/purchases/${teamId}`);
      
      if (response.data.success) {
        setPurchases(response.data.data.purchases);
        setSelectedTeam(response.data.data.team);
      }
    } catch (err) {
      console.error('구매 기록 조회 실패:', err);
      alert(err.response?.data?.message || '구매 기록을 불러오는데 실패했습니다.');
    } finally {
      setPurchaseLoading(false);
    }
  };

  const handleTeamSelect = (team) => {
    fetchTeamPurchases(team.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container>
        <Header isTeacher={true} />
        <Body>
          <LoadingState>팀 목록을 불러오는 중...</LoadingState>
        </Body>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header isTeacher={true} />
        <Body>
          <BackButton onClick={() => navigate('/tch')}>← 돌아가기</BackButton>
          <EmptyState>{error}</EmptyState>
        </Body>
      </Container>
    );
  }

  return (
    <Container>
      <Header isTeacher={true} />
      <Body>
        <BackButton onClick={() => navigate('/tch')}>← 돌아가기</BackButton>
        
        <TitleSection>
          <Title>팀별 구매 기록 조회</Title>
          <Subtitle>각 팀의 구매 기록을 확인할 수 있습니다.</Subtitle>
        </TitleSection>

        <TeamSelector>
          <h3 style={{ 
            color: '#1D1D1D', 
            fontFamily: 'Pretendard', 
            fontSize: '20px', 
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            팀 선택
          </h3>
          <TeamGrid>
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                selected={selectedTeam?.id === team.id}
                onClick={() => handleTeamSelect(team)}
              >
                <TeamName>{team.name || `${team.class_number}반 ${team.team_number}팀`}</TeamName>
                <TeamCredit>크레딧: {team.team_credit?.toLocaleString() || 0}원</TeamCredit>
              </TeamCard>
            ))}
          </TeamGrid>
        </TeamSelector>

        {selectedTeam && (
          <SelectedTeamInfo>
            <TeamName style={{ fontSize: '20px', marginBottom: '10px' }}>
              {selectedTeam.name || `${selectedTeam.class_number}반 ${selectedTeam.team_number}팀`}
            </TeamName>
            <TeamCredit style={{ fontSize: '16px' }}>
              현재 크레딧: {selectedTeam.team_credit?.toLocaleString() || 0}원
            </TeamCredit>
          </SelectedTeamInfo>
        )}

        {purchaseLoading ? (
          <LoadingState>구매 기록을 불러오는 중...</LoadingState>
        ) : selectedTeam ? (
          <PurchaseList>
            {purchases.length === 0 ? (
              <EmptyState>이 팀은 아직 구매한 상품이 없습니다.</EmptyState>
            ) : (
              purchases.map((purchase) => (
                <PurchaseItem key={purchase.id}>
                  <ItemHeader>
                    <ItemImage 
                      src={purchase.image_url} 
                      alt={purchase.item_name}
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                    <ItemInfo>
                      <ItemName>{purchase.item_name}</ItemName>
                      <ItemDetails>
                        <span>수량: {purchase.quantity}개</span>
                        <span>단가: {purchase.unit_price?.toLocaleString() || 0}원</span>
                        <span>총액: {purchase.total_price?.toLocaleString() || 0}원</span>
                      </ItemDetails>
                    </ItemInfo>
                    <PurchaseDate>
                      {formatDate(purchase.purchased_at)}
                    </PurchaseDate>
                  </ItemHeader>
                </PurchaseItem>
              ))
            )}
          </PurchaseList>
        ) : (
          <EmptyState>팀을 선택하여 구매 기록을 확인하세요.</EmptyState>
        )}
      </Body>
    </Container>
  );
}