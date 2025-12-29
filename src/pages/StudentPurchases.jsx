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

const TeamInfo = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
`;

const TeamName = styled.h2`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const TeamCredit = styled.p`
  color: #007bff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
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

export default function StudentPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await customaxios.get(`${import.meta.env.VITE_API_URL}std/purchases`);
      
      if (response.data.success) {
        setPurchases(response.data.data.purchases);
        setTeam(response.data.data.team);
      }
    } catch (err) {
      console.error('구매 기록 조회 실패:', err);
      setError(err.response?.data?.message || '구매 기록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
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
        <Header isTeamName="true" isCredit="true" isMyTeam="true" />
        <Body>
          <LoadingState>구매 기록을 불러오는 중...</LoadingState>
        </Body>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header isTeamName="true" isCredit="true" isMyTeam="true" />
        <Body>
          <BackButton onClick={() => navigate('/std')}>← 돌아가기</BackButton>
          <EmptyState>{error}</EmptyState>
        </Body>
      </Container>
    );
  }

  return (
    <Container>
      <Header isTeamName="true" isCredit="true" isMyTeam="true" />
      <Body>
        <BackButton onClick={() => navigate('/std')}>← 돌아가기</BackButton>
        
        <TitleSection>
          <Title>우리 팀 구매 기록</Title>
          <Subtitle>팀에서 구매한 모든 상품을 확인할 수 있습니다.</Subtitle>
        </TitleSection>

        {team && (
          <TeamInfo>
            <TeamName>{team.name || `${team.class_number}반 ${team.team_number}팀`}</TeamName>
            <TeamCredit>현재 크레딧: {team.team_credit?.toLocaleString() || 0}원</TeamCredit>
          </TeamInfo>
        )}

        <PurchaseList>
          {purchases.length === 0 ? (
            <EmptyState>아직 구매한 상품이 없습니다.</EmptyState>
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
      </Body>
    </Container>
  );
}