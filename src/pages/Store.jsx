import { useState, useEffect } from "react";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import { useCredit } from "../context/CreditContext.jsx";
import { getUserRoleCached } from "../lib/auth.js";
import Header from "../components/Header.jsx";
import styled from "@emotion/styled";
import Button from "../components/button.jsx";
import ItemCard from "../components/ItemCard.jsx";
import Mock from "../assets/mock.png";
import ModalComponent from "../components/modalComponent.jsx";
import storeImg from "../assets/store.svg";

const Container = styled.div` 
  margin-left: 3rem;
`;

const Body = styled.div`
  width: 1339px;
  height: 575px;
  gap: 55px;
  margin: 0px 50px 95px 70px;
  background: #fff;
`;

const Menu = styled.div`
  display: flex;
  width: 1320px;
  height: 181px;
  align-items: flex-start;
  gap: 840px;
  position: relative; 
`;

const LeftMenu = styled.div`
  display: flex;
  width: 265px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  flex-shrink: 0;
  margin: 0px 0px 0px 0px;
  position: absolute;
  left: 0;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  align-self: stretch;
  width:500px;
  height: 79px;
  margin: 0px 0px 32px 0px;
`;

const Title = styled.p`
  color: #1D1D1D;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 44.8px */
  margin: 0px 0px 0px 0px;
`;

const Description = styled.p`
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
  margin: 0px 0px 0px 0px;
`;

const Filtering = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RightMenu = styled.div`
  position:absolute;
  right:0px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  width: 136px;
  height:24px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  border: 2px solid rgb(178, 178, 178, ${props => (props.active ? 0 : 0.2)}); 
  cursor:pointer;
  background-color: ${props => (props.active ? "#FFF2E4" : "white")}
`;

const PriceDisplay = styled.div`
  position: absolute;
  right: 200px;
  top: 50%;
  transform: translateY(-50%);
  display: ${props => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.sufficient ? "#333" : "#FF4444")};
  border: 1px solid ${props => (props.sufficient ? "#ddd" : "#FF4444")};
`;

const Cost = styled.p`
  color: ${props => (props.active ? "#F07F23" : "#646464")};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  opacity: ${props => (props.active ? 1 : 0.2)};
  cursor:pointer;
`;

const Items = styled.div`
  width:1339px;
  margin: 28px 0px 0px 0px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  margin-top:28px
`;

const EmptyMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 100px;
  color: #B2B2B2;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
`;

const AccessDeniedMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 100px;
  color: #FF4444;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  background-color: #FFF5F5;
  border-radius: 12px;
  border: 2px solid #FFE6E6;
`;



export default function Store() {
  const { refreshCredit, credit } = useCredit(); // credit 추가
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedCards, setCheckedCards] = useState({});
  const [quantities, setQuantities] = useState({}); // 수량 상태 추가
  const [filter, setFilter] = useState(1); // 1: 간식 (type: 1), 2: 쿠폰 (type: 2), 3: 기타 (type: 3)
  const [isOpen, setIsOpen] = useState(false); // 일반 구매 완료 모달용
  const [userRole, setUserRole] = useState(null);

  // 페이지 로드 시 전체 물품 조회 및 사용자 역할 확인
  useEffect(() => {
    fetchAllItems();
    checkUserRole();
  }, []);

  // 사용자 역할 확인
  const checkUserRole = async () => {
    try {
      const role = await getUserRoleCached();

      // student인 경우 팀장인지 확인
      if (role === 'student') {
        try {
          const accountResponse = await customaxios.get('std/account');
          const currentUserId = accountResponse.data?.userId; // 현재 사용자 ID
          const leaderId = accountResponse.data?.leaderId; // 팀장 ID

          // 현재 사용자가 팀장인지 확인
          if (currentUserId === leaderId) {
            setUserRole('teamleader');
          } else {
            setUserRole('student');
          }
        } catch (error) {
          console.error("팀 정보 확인 실패:", error);
          setUserRole(role);
        }
      } else {
        setUserRole(role);
      }
    } catch (error) {
      console.error("사용자 역할 확인 실패:", error);
    }
  };

  // 전체 물품 조회
  const fetchAllItems = async () => {
    try {
      const response = await customaxios.get(`${import.meta.env.VITE_API_URL}haram/store`);

      setItems(response.data.items.map(item => ({
        id: item.itemId,
        name: item.itemName,
        price: item.price,
        stock: item.quantity,
        type: item.type,
        img: item.image || Mock
      })));

    } catch (error) {
      console.error("물품 조회 실패:", error);
      alert("물품 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (id, value) => {
    setCheckedCards(prev => ({ ...prev, [id]: value }));
    if (!value) {
      // 체크 해제 시 수량도 0으로 초기화
      setQuantities(prev => ({ ...prev, [id]: 0 }));
    } else {
      // 체크 시 수량을 1로 설정
      setQuantities(prev => ({ ...prev, [id]: 1 }));
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const anyChecked = Object.values(checkedCards).some(Boolean);

  // 선택된 아이템들의 총 가격 계산 (수량 포함)
  const totalPrice = Object.keys(checkedCards)
    .filter(id => checkedCards[id])
    .reduce((sum, id) => {
      const item = items.find(item => item.id === parseInt(id));
      const quantity = quantities[id] || 1;
      return sum + (item ? item.price * quantity : 0);
    }, 0);

  // 물품 구매
  const handlePurchase = async () => {
    if (!anyChecked) return;

    // teamleader 권한 확인
    if (userRole !== 'teamleader') {
      alert("물품 구매는 팀장만 가능합니다!");
      return;
    }

    // 잔액 확인
    if (totalPrice > credit) {
      alert("크레딧이 부족합니다!");
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const itemIdsToPurchase = Object.keys(checkedCards).filter(id => checkedCards[id]).map(Number);


      for (const itemId of itemIdsToPurchase) {
        const quantity = quantities[itemId] || 1;
        await customaxios.post(`${import.meta.env.VITE_API_URL}std/store`,
          { itemId: itemId, quantity: quantity },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
      }

      setCheckedCards({});
      setQuantities({}); // 수량도 초기화



      await fetchAllItems();

      await refreshCredit();

    } catch (error) {
      console.error("물품 구매 실패:", error);
      if (error.response?.data?.error === "PAYMENT_REQUIRED") {
        alert("크레딧이 부족합니다");
      } else if (error.response?.data?.error === "OUT_OF_STOCK") {
        alert("재고가 부족합니다");
      } else if (error.response?.data?.error === "NON_EXIST_ITEM") {
        alert("존재하지 않는 상품입니다");
      } else {
        alert("물품 구매에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };


  const filteredItems = items.filter(item => {
    return item.type === filter;
  });



  const handleAnnouncementSubmit = async (message) => {
    try {
      const token = localStorage.getItem('auth_token');

      await customaxios.post(`${import.meta.env.VITE_API_URL}haram/notice`,
        { content: message },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error("전체 공지 전송 실패:", error);
      alert("전체 공지 전송에 실패했습니다.");
    }
  };




  return (
    <>
      <Header
        isTeamName="true"
        isCredit="true"
      />
      <Container>
        <Body>
          <Menu>
            <LeftMenu>
              <TextBox>
                <Title>상점</Title>
                <Description>상점에서 원하는 상품을 구매해요<br></br> 체크 박스를 누르면 구매하기 버튼이 나타나요!</Description>
              </TextBox>
              <Filtering>
                <Button
                  text="간식"
                  active={filter === 1}
                  path={() => setFilter(1)}
                />
                <Button
                  text="쿠폰"
                  active={filter === 2}
                  path={() => setFilter(2)}
                />
                <Button
                  text="기타"
                  active={filter === 3}
                  path={() => setFilter(3)}
                />
              </Filtering>
            </LeftMenu>
            <PriceDisplay
              show={anyChecked}
              sufficient={totalPrice <= credit}
            >
              총 {totalPrice.toLocaleString()}원
            </PriceDisplay>

            <RightMenu active={anyChecked}
              onClick={handlePurchase}>
              <Cost active={anyChecked}>구매하기</Cost>
            </RightMenu>

            <ModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)}
              title="구매완료! 상품을 가져가세요!"
              img={storeImg} >
            </ModalComponent>

          </Menu>

          {loading ? (
            <div style={{ marginTop: '28px', textAlign: 'center' }}>
              <Description>물품을 불러오는 중...</Description>
            </div>
          ) : userRole !== 'teamleader' ? (
            <AccessDeniedMessage>
              물품 구매는 팀장만 가능합니다.<br />
              팀장에게 문의하여 필요한 물품을 구매해주세요.
            </AccessDeniedMessage>
          ) : filteredItems.length === 0 ? (
            <EmptyMessage>
              {filter === 1 ? "간식" : filter === 2 ? "쿠폰" : "기타"} 상품이 없습니다.
            </EmptyMessage>
          ) : (
            <Items>
              {filteredItems.map(item =>
                <ItemCard
                  isCoupon={item.type === 2 ? "true" : undefined}
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  img={item.img}
                  stock={item.stock}
                  checked={!!checkedCards[item.id]}
                  quantity={quantities[item.id] || 0}
                  onChange={(e) => handleCheck(item.id, e.target.checked)}
                  onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                />
              )}
            </Items>
          )}
        </Body>
      </Container>
    </>
  )
}