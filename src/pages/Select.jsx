import { useState } from "react";
import Header from "../components/Header";
import styled from "@emotion/styled";
import Star from "../assets/Star.svg";
import ModalComponent from "../components/ModalComponent";
import { useNavigate } from "react-router-dom";

export function SelectCard({ cardId, onCardClick, isDrawing, isDrawn }) {
  if (isDrawn) {
    return <EmptyCard />; // 뽑힌 카드는 빈 칸으로 표시
  }

  return (
    <Card
      onClick={() => {
        if (!isDrawing) {
          onCardClick(cardId);
        }
      }}
    >
      <img src={Star} alt="star" />
    </Card>
  );
}

export default function Select() {
  const [result, setResult] = useState(null); // 카드 결과
  const [isDrawing, setIsDrawing] = useState(false); // 카드 뽑기 진행 상태
  const [isGuideOpen, setIsGuideOpen] = useState(true); // 게임 시작 안내 모달
  const [isResultOpen, setIsResultOpen] = useState(false); // 카드 결과 모달
  const [drawnCards, setDrawnCards] = useState([]); // 뽑힌 카드 ID 배열
  const navigate = useNavigate();

  // 가이드 모달 버튼 클릭 -> 게임 시작
  const handleStartGame = () => {
    setIsGuideOpen(false);
  };

  // 홈으로 나가기
  const goHome = () => {
    navigate("/std")
  }

  // 카드 뽑기
  const handleDraw = async (cardId) => {
    if (isDrawing || drawnCards.includes(cardId)) return;

    setIsDrawing(true);
    setResult(null);

    try {
      // 임시 데이터 
      const mockData = {
        name: `${cardId}번 카드 결과`,
        img: Star, 
      };
    
      /*
      const response = await fetch("/api/draw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId }),
      });
      const data = await response.json();
      */
      
      // 카드 뽑는 애니메이션 
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setResult(mockData);
      setDrawnCards(prev => [...prev, cardId]);
      setIsResultOpen(true);
    } catch (error) {
      console.error("카드 뽑기 실패:", error);
    } finally {
      setIsDrawing(false);
    }
  };

  const closeResultModal = () => {
    setIsResultOpen(false);
    
    // 모든 카드를 뽑았으면 리셋
    if (drawnCards.length >= 99) { // 100번째 카드를 뽑은 직후
      setDrawnCards([]);
    }
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
          <SelectCard
            key={index}
            cardId={index}
            onCardClick={handleDraw}
            isDrawing={isDrawing}
            isDrawn={drawnCards.includes(index)}
          />
        ))}
      </Borad>

      {/* 가이드 모달 */}
      <ModalComponent
        isOpen={isGuideOpen}
        onClose={goHome} // X 버튼은 /std로 나가게
        title="추억의 뽑기 게임"
        description="추억의 문방구 뽑기 게임을 아시나요?
        뽑기 1회 당 500 크레딧을 지불하여 진행해요!
        뽑기 판 안에는 1000 크레딧부터 5000 크레딧까지 일반적인 보상과
        상대 팀에서 크레딧 뺏아오기, 크레딧 2배 불리기, 상대 팀과 크레딧 바꾸기,
        전체 팀 크레딧 초기화 등 다양한 이벤트도 있어요"
        catchphrase="뽑기 버튼 한 번으로 여러분의 운을 시험 해 보세요!"
        isGuide={true}
        btnText="500크레딧으로 게임 시작하기"
        onButtonClick={handleStartGame} // 버튼 클릭 -> 게임 시작
      />

      {/* 카드 결과 모달 */}
      {result && (
        <ModalComponent
          isOpen={isResultOpen}
          onClose={closeResultModal}
          title={result.name}
          img={result.img}
          isGuide={false}
        />
      )}
    </>
  );
}

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
  gap: 24px;
`;

const Card = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  border: 1px solid #B2B2B2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
  &:hover {
    background-color: #F07F23;
    border: none;
  }
`;

const EmptyCard = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: not-allowed;
  opacity: 0.5;
`;