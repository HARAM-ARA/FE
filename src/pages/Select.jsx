import { useState } from "react";
import Header from "../components/Header";
import styled from "@emotion/styled";
import Star from "../assets/Star.svg";
import ModalComponent from "../components/ModalComponent";
import TeamSelectModal from "../components/TeamSelectModal";
import { useNavigate } from "react-router-dom";
import add1 from "../assets/add1.svg";
import add2 from "../assets/add2.svg";
import add3 from "../assets/add3.svg";
import add4 from "../assets/add4.svg";
import add5 from "../assets/add5.svg";
import double from "../assets/double.svg";
import steal from "../assets/steal.svg";
import reset from "../assets/reset.svg";
import anger from "../assets/anger.svg";
import boom from "../assets/boom.svg";
import swap from "../assets/swap.svg";


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
  const [cardResult, setCardResult] = useState(null); // 카드 결과
  const [isDrawing, setIsDrawing] = useState(false); // 카드 뽑기 진행 상태
  const [isGuideOpen, setIsGuideOpen] = useState(true); // 게임 시작 안내 모달
  const [isResultOpen, setIsResultOpen] = useState(false); // 카드 결과 모달
  const [drawnCards, setDrawnCards] = useState([]); // 뽑힌 카드 ID 배열
  const [isTeamSelectOpen, setIsTeamSelectOpen] = useState(false);
  const navigate = useNavigate();
  const [isEffectOpen, setIsEffectOpen] = useState(false);


  const mockTeams = [
    { id: 1, name: "하람", credit: 20000 },
    { id: 2, name: "아라", credit: 50000 },
    { id: 3, name: "스파이더맨", credit: 30000 },
    { id: 4, name: "슈퍼맨", credit: 1000 },
    { id: 5, name: "베트맨", credit: 3000 },
  ];

  const mockResponses = [
    { message: "1000 크레딧 당첨!", effect: "add1", addCredit: 1000, credit: 11000 },
    { message: "2000 크레딧 당첨!", effect: "add2", addCredit: 2000, credit: 12000 },
    { message: "3000 크레딧 당첨!", effect: "add3", addCredit: 3000, credit: 13000 },
    { message: "4000 크레딧 당첨!", effect: "add4", addCredit: 4000, credit: 14000 },
    { message: "5000 크레딧 당첨!", effect: "add5", addCredit: 5000, credit: 15000 },
    { message: "크레딧 2배 당첨!!", effect: "double", addCredit: 10000, credit: 20000 },
    { message: "크레딧 교환하기!! ", effect: "swap" },
    { message: "전체 탐 크레딧 초기화!!!!", effect: "reset" },
    { message: "꽝!", effect: "Boom", credit: 10000, addCredit: 0 },
    { message: "크레딧 뻇어오기!!", effect: "steal" },
    { message: "하은이의 분노!!!!!!!!", effect: "anger" },
  ];

  // 가이드 모달 버튼 클릭 -> 게임 시작
  const handleStartGame = () => {
    setIsGuideOpen(false);
  };

  // 홈으로 나가기
  const goHome = () => {
    navigate("/std")

    if (drawnCards.length >= 100) { // 100번째 카드를 뽑은 직후
      setDrawnCards([]);
    }
  }

  const getEffectImage = (effect) => {
    switch(effect) {
      case "add1": return add1;
      case "add2": return add2;
      case "add3": return add3;
      case "add4": return add4;
      case "add5": return add5;
      case "steal": return steal;
      case "swap": return swap;
      case "anger": return anger;
      case "double": return double;
      case "reset": return reset;
      case "Boom": return boom;
      default: return Star;
    }
  };

  const getEffectButtonText = (effect) => { // 버튼 텍스트 판단
    switch (effect) {
      case "steal": return "10% 뺏기";
      case "swap": return "크레딧 교환";
      case "anger": return "초기화하기";
      default: return "선택하기";
    }
  };


  // 카드 뽑기
  const handleDraw = async (cardId) => {
    if (isDrawing || drawnCards.includes(cardId)) return;

    setIsDrawing(true);
    setCardResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockData = mockResponses[Math.floor(Math.random() * mockResponses.length)];

      /*
      const response = await fetch("/api/draw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ cardId + 1}),
      });
      if (!response.ok) {
        const error = await response.json();
        if (error.error === "PAYMENT_REQUIRED") {
          alert("크레딧이 부족합니다");
        } else if (error.error === "ALREADY_PROCESSED") {
          alert("이미 뽑힌 카드입니다");
        } else if (error.error === "INCORRECT_CARD") {
          alert("카드 번호가 잘못되었습니다");
        }
        return;
      }

      const data = await response.json();


      백엔드 데이터 예시
      effect: "add" | "double" | "swap" | "reset" | "boom" | "steal"
      message : "전달할 메세지"
      "addCredit": 0 추가될 크레딧
      "credit": 10000, // 추가된 크레딧
      requiresTeamSelect: true/false
      availableTeams: [{id: 1, name: "하람"}, ...]
      */

      // 카드 뽑는 애니메이션 

      const data = { ...mockData, cardId: cardId };
      setCardResult(mockData);
      setDrawnCards(prev => [...prev, cardId]);

      if (data.effect === "swap" || data.effect === "steal" || data.effect === "anger") {
        // 팀 선택이 필요한지 판단
        setIsEffectOpen(true); 
      } else {
        setIsResultOpen(true);
      }

    } catch (error) {
      console.error("카드 뽑기 실패:", error);
    } finally {
      setIsDrawing(false);
    }
  };

  const handleOpenTeamSelect = () => { // 팀선택 모달
    setIsEffectOpen(false);
    setIsTeamSelectOpen(true);
  };


  const handleTeamSelect = async (teamId) => {
    try {
      // effect에 따라 API 호출
      let endpoint = "";
      if (cardResult.effect === "swap") {
        endpoint = "/std/select/pull/shuffle";
      } else if (cardResult.effect === "steal") {
        endpoint = "/std/select/pull/steal";
      } else if (cardResult.effect === "anger") {
        endpoint = "/std/select/pull/anger";
      }

      /* 
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ targetTeamId: teamId }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        if (error.error === "NON_EXIST_TEAM") {
          alert("존재하지 않는 팀입니다");
        } else if (error.error === "INCORRECT_TEAM") {
          alert("ID가 잘못되었습니다");
        }
        return;
      }
      
      const data = await response.json();
      */


      await new Promise(resolve => setTimeout(resolve, 300));
      const selectedTeam = mockTeams.find(t => t.id === teamId);

      const data = {
        message: cardResult.effect === "swap"
          ? `${selectedTeam.name} 팀과 크레딧 교환하기`
          : cardResult.effect === "steal"
            ? `${selectedTeam.name} 팀과 크레딧 뺏어오기`
            : `${selectedTeam.name} 팀 크레딧 초기화하기`,
        myTeam: { teamId: 1, credit: 15000 },
        targetTeam: { teamId: teamId, credit: selectedTeam.credit }
      };


      const finalData = {
        ...data,
        effect: cardResult.effect,
        selectedTeamName: selectedTeam.name
      };

      setCardResult(finalData);
      setIsTeamSelectOpen(false);
      setIsResultOpen(true);

    } catch (error) {
      console.error("팀 선택 처리 실패:", error);
      alert("팀 선택 처리에 실패했습니다.");
    }
  };

  const closeEffectModal = () => {
    setIsEffectOpen(false);
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
      {cardResult && (cardResult.effect === "swap" || cardResult.effect === "steal" || cardResult.effect === "anger") && (
        <ModalComponent
          isOpen={isEffectOpen}
          onClose={closeEffectModal}
          title={cardResult.message}
          img={getEffectImage(cardResult?.effect)}
          isSelectTeam={true}
          description=""
          catchphrase="팀을 선택해주세요"
          btnText="팀 선택하기"
          onButtonClick={handleOpenTeamSelect}
          isResult={true}
          effect={cardResult?.effect}
        />
      )}

      <TeamSelectModal
        isOpen={isTeamSelectOpen}
        onClose={() => setIsTeamSelectOpen(false)}
        teams={mockTeams}
        selectTeam={handleTeamSelect}
        effect={cardResult?.effect}
      />


      {cardResult && (
        <ModalComponent
          isOpen={isResultOpen}
          onClose={goHome}
          title={
            cardResult.myTeam
              ? cardResult.message
              : cardResult.message 
          }
          img={getEffectImage(cardResult?.effect)}
          isResult={true}
          effect={cardResult?.effect}
          
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
    background-color:#FDB882;
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