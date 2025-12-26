import { useState, useEffect } from "react";
import axios from "axios";
import { useCredit } from "../context/CreditContext";
import Header from "../components/Header";
import styled from "@emotion/styled";
import Button from "../components/Button";
import ItemCard from "../components/ItemCard";
import Mock from "../assets/Mock.png";
import ModalComponent from "../components/ModalComponent";
import AnnouncementModal from "../components/AnnouncementModal";
import storeImg from "../assets/store.svg";


const Body = styled.div`
  width: 1339px;
  height: 575px;
  align-items: flex-end;
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



export default function Store() {
  const { refreshCredit } = useCredit(); // 크레딧 새로고침 함수
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedCards, setCheckedCards] = useState({});
  const [filter, setFilter] = useState(true); // true가 간식 (type: 1), false가 쿠폰 (type: 2)
  const [isOpen, setIsOpen] = useState(false); // 일반 구매 완료 모달용

  // 페이지 로드 시 전체 물품 조회
  useEffect(() => {
    fetchAllItems();
  }, []);

  // 전체 물품 조회
  const fetchAllItems = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}haram/store`);


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
  };

  const anyChecked = Object.values(checkedCards).some(Boolean);

  // 물품 구매
  const handlePurchase = async () => {
    if (!anyChecked) return;

    try {
      const token = localStorage.getItem('auth_token');
      const itemIdsToPurchase = Object.keys(checkedCards).filter(id => checkedCards[id]).map(Number);


      for (const itemId of itemIdsToPurchase) {
        await axios.post(`${import.meta.env.VITE_API_URL}std/store`,
          { itemId: itemId, quantity: 1 },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
      }

      setCheckedCards({});



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


  const filteredItems = items.filter(item => item.type === (filter ? 1 : 2));




  return (
    <>
      <Header
        teamName="하람"
        isTeamName="true"
        isCredit="true"
        Credit="20,000"
      />
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
                active={filter === true}
                path={() => setFilter(true)}
              />
              <Button
                text="쿠폰"
                active={filter === false}
                path={() => setFilter(false)}
              />
            </Filtering>
          </LeftMenu>
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
                onChange={(e) => handleCheck(item.id, e.target.checked)}
              />
            )}
          </Items>
        )}


      </Body>
    </>
  )
}
