import { useState } from "react";
import Header from "../components/Header"
import styled from "@emotion/styled";
import Star from "../assets/Star.svg";
import ModalComponent from "../components/modalComponent";
import { useNavigate } from "react-router-dom";


const Borad = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  width: 1098px;
  padding: 42px 41px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #B2B2B2;
  margin: 0px 130px;
  gap:24px;
`;

const Card = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  border: 1px solid #B2B2B2;
  align-items:center;
  display: flex;       
  justify-content: center; 
  cursor:pointer;  
  &:active {
    transform: scale(0.95);
  }
  &:hover{
    background-color: #F07F23;
    border:none;
  }
`;

const cards = [
  { name: "점수 뺏기", weight: 1.5 },
  { name: "점수 두배", weight: 1.4 },
  { name: "약탈", weight: 1.3 },
  { name: "점수 교환", weight: 1.3 },
  { name: "전체 리셋", weight: 1.13 },
  { name: "하은이의 분노", weight: 0.00001 },
  { name: "꽝", weight: 50.0 },
  { name: "크레딧: 1000원", weight: 15.0 },
  { name: "크레딧: 2000원", weight: 10.0 },
  { name: "크레딧: 3000원", weight: 7.0 },
  { name: "크레딧: 4000원", weight: 6.0 },
  { name: "크레딧: 5000원", weight: 5.0 },
];


export function SelectCard({ onCardClick, isDrawing }) {
  const handleClick = () => {
    if (!isDrawing) {
      onCardClick();
    }
  };

  return (
    <Card onClick={handleClick} disabled={isDrawing}>
      <img src={Star}></img>
    </Card>
  )
}

export default function Select() {
  const [result, setResult] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShow, serIsshow] = useState(false);

  const navigate = useNavigate();


  


  const handleDraw = () => {
    setIsDrawing(true);
    setResult(null);

    setTimeout(() => {
      const drawnCard = weightRandom();
      setResult(drawnCard);
      setIsDrawing(false);
      setIsModalOpen(true);
    }, 150);
  };

  const closeModal = () => {
    navigate("/")
  };

  return (
    <>

    
      <Header
        teamName="하람"
        isTeamName="true"
        isCredit="true"
        Credit="20,000"
      />
      <Borad>
        {Array.from({ length: 100 }).map((_, index) => (
          <SelectCard key={index} onCardClick={handleDraw}
            isDrawing={isDrawing} />
        ))}
      </Borad>

      {result && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          title={result.name}
        />
      )}

    </>
  )
}