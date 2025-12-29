import { useState, useEffect } from "react";
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 내 계정 정보, 상점 목록, 구매 기록 동시 조회
      const [accountRes, storesRes, purchasesRes] = await Promise.all([
        customaxios.get(`${import.meta.env.VITE_API_URL}std/account`),
        customaxios.get(`${import.meta.env.VITE_API_URL}haram/store`),
        customaxios.get(`${import.meta.env.VITE_API_URL}std/purchases`).catch(() => ({ data: { success: true, data: { purchases: [] } } }))
      ]);

      setTeam({
        teamId: accountRes.data.teamId,
        teamName: accountRes.data.teamName,
        credit: accountRes.data.credit
      });
      setStores(storesRes.data.items || []);
      
      // std/purchases API 응답 형식에 맞게 처리
      if (purchasesRes.data.success) {
        setPurchases(purchasesRes.data.data.purchases || []);
      } else {
        setPurchases([]);
      }
    } catch (err) {
      console.error('데이터 조회 실패:', err);
      setError(err.response?.data?.message || '데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getStoreName = (itemId) => {
    const store = stores.find(s => s.itemId === itemId);
    return store?.itemName || `상품 #${itemId}`;
  };

  const getStorePrice = (itemId) => {
    const store = stores.find(s => s.itemId === itemId);
    return store?.price || 0;
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
          <LoadingState>데이터를 불러오는 중...</LoadingState>
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
            <TeamName>{team.teamName}</TeamName>
            <TeamCredit>현재 크레딧: {team.credit?.toLocaleString() || 0}원</TeamCredit>
          </TeamInfo>
        )}

        <PurchaseList>
          {purchases.length === 0 ? (
            <EmptyState>아직 구매한 상품이 없습니다.</EmptyState>
          ) : (
            purchases.map((purchase, index) => (
              <PurchaseItem key={index}>
                <ItemInfo>
                  <ItemName>{purchase.item_name || getStoreName(purchase.itemId)}</ItemName>
                  <ItemDetails>
                    <span>수량: {purchase.quantity}개</span>
                    <span>총액: {purchase.total_price?.toLocaleString() || 0}원</span>
                  </ItemDetails>
                </ItemInfo>
                <PurchaseDate>
                  {formatDate(purchase.purchased_at || purchase.when)}
                </PurchaseDate>
              </PurchaseItem>
            ))
          )}
        </PurchaseList>
      </Body>
    </Container>
  );
}