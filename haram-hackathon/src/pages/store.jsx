import {useState} from "react";
import Header from "../components/Header";
import styled from "@emotion/styled";
import Button from "../components/button";
import ItemCard from "../components/ItemCard";
import MockImg from "../assets/Frame159.svg";
import Mock from "../assets/Mock.png";


const Body = styled.div`
  width: 1339px;
  height: 575px;
  align-items: flex-end;
  gap: 55px;
  margin: 0px 50px 95px 50px;
`;

const Menu = styled.div`
  display: flex;
  width: 1339px;
  height: 149px;
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
  width: 265px;
  height: 79px;
  margin: 0px 0px 0px 0px;
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
  width: 184px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  border: 2px solid rgb(178, 178, 178, ${props => (props.active ? 1 : 0.2)}); 
  cursor:pointer;
`;

const Cost = styled.p`
  color: #646464; 
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
`;



export default function Store(){

  const mockData = [
    { id: 1, name: "첫 번째", price: 5000, img: Mock },
    { id: 2, name: "두 번째", price: 7000, img: Mock },
    { id: 3, name: "세 번째", price: 9000, img: Mock },
    { id: 4, name: "세 번째", price: 9000, img: Mock },
    { id: 5, name: "세 번째", price: 9000, img: Mock },
    { id: 6, name: "세 번째", price: 9000, img: Mock },
    { id: 7, name: "세 번째", price: 9000, img: Mock },
  ];

  const [checkedCards, setCheckedCards] = useState({});


  const handleCheck = (id, value) => {
    setCheckedCards(prev => ({ ...prev, [id]: value }));
  };
  
  const anyChecked = Object.values(checkedCards).some(Boolean);

  const [filter, setFilter] = useState(true); // 간식

  const handleFilter = () => {
  

  };



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
              <Description>상점에서 원하는 상품을 구매해요</Description>
            </TextBox>
            <Filtering>
              <Button
              text="간식"
              active={filter === true}
              path = {() => setFilter(true)}
              />
              <Button
              text="쿠폰"
              active={filter === false}
              path = {()=> setFilter(false)} 
              />
            </Filtering>
          </LeftMenu>
          <RightMenu active={anyChecked} ><Cost active={anyChecked}>구매하기</Cost></RightMenu>
        </Menu>

        {filter ? 
        <Items>
          {mockData.map(item => 
          <ItemCard 
            key={item.id}
            title={item.name}
            price={item.price}
            img={item.img}
            checked={!!checkedCards[item.id]}
            onChange={(e) => handleCheck(item.id, e.target.checked)}
          />)}
        </Items>
        :
        <div>
          <Items>
          {mockData.map(item => 
          <ItemCard 
            isCoupon = "true"
            key={item.id}
            title={item.name}
            price={item.price}
            img={item.img}
            checked={!!checkedCards[item.id]}
            onChange={(e) => handleCheck(item.id, e.target.checked)}
          />)}
        </Items>
        </div>
        }

        
      </Body>
    </>
  )
}