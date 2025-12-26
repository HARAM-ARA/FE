import { useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "@emotion/styled";
import Star from "../assets/Star.svg";
import ModalComponent from "../components/ModalComponent";
import TeamSelectModal from "../components/TeamSelectModal";
import { useNavigate } from "react-router-dom";
import { useCredit } from "../context/CreditContext";
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
  const { credit, refreshCredit } = useCredit(); // 크레딧 값과 새로고침 함수
  const [cardResult, setCardResult] = useState(null); // 카드 결과
  const [isDrawing, setIsDrawing] = useState(false); // 카드 뽑기 진행 상태
  const [isGuideOpen, setIsGuideOpen] = useState(true); // 게임 시작 안내 모달
  const [isResultOpen, setIsResultOpen] = useState(false); // 카드 결과 모달
  const [drawnCards, setDrawnCards] = useState([]); // 뽑힌 카드 ID 배열
  const [isTeamSelectOpen, setIsTeamSelectOpen] = useState(false);
  const navigate = useNavigate();
  const [isEffectOpen, setIsEffectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  const mockResponses = [
    { message: "1000 크레딧 당첨!", effect: "add1", addCredit: 1000, credit: 11000 },
    { message: "2000 크레딧 당첨!", effect: "add2", addCredit: 2000, credit: 12000 },
    { message: "3000 크레딧 당첨!", effect: "add3", addCredit: 3000, credit: 13000 },
    { message: "4000 크레딧 당첨!", effect: "add4", addCredit: 4000, credit: 14000 },
    { message: "5000 크레딧 당첨!", effect: "add5", addCredit: 5000, credit: 15000 },
    { message: "크레딧 2배 당첨!!", effect: "double", addCredit: 10000, credit: 20000 },
    { message: "크레딧 교환하기!!", effect: "swap" },
    { message: "전체 팀 크레딧 초기화!!!!", effect: "reset" },
    { message: "꽝!", effect: "Boom", credit: 10000, addCredit: 0 },
    { message: "크레딧 뺏어오기!!", effect: "steal" },
    { message: "하은이의 분노!!!!!!!!", effect: "anger" },
  ];

  const loadDrawnCards = async (isInitialLoad = false) => {
    try {
      let cards = [];
      if (typeof localStorage !== 'undefined') { // 윈도우 안돼서 예비로 로칼해둠
        const stored = localStorage.getItem('drawn_cards');
        if (stored) {
          cards = JSON.parse(stored);
        }
      }

      // 100개 이상이면 자동 리셋
      if (cards.length >= 100) {
        console.log(`로드 시 게임판 리셋 (${cards.length}개 -> 0개)`);
        cards = [];
        if (window.storage) {
          await window.storage.set('drawn_cards', JSON.stringify([]), true);
        }
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('drawn_cards', JSON.stringify([]));
        }
      }

      setDrawnCards(cards);
    } catch (error) {
      console.log('뽑힌 카드가 없습니다. 새로 시작합니다.');
      setDrawnCards([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDrawnCards = async (cards) => {
    try {
      if (window.storage) {
        await window.storage.set('drawn_cards', JSON.stringify(cards), true);
      }
      else if (typeof localStorage !== 'undefined') {
        localStorage.setItem('drawn_cards', JSON.stringify(cards));
      }
    } catch (error) {
      console.error('카드 저장 실패:', error);
    }
  };

  //뽑힌 카드 목록
  useEffect(() => {
    loadDrawnCards();
    fetchTeams();
  }, []);

  // 팀 목록 불러오기
  const fetchTeams = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}haram/team`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("팀 목록 API 응답:", data);
        setTeams(data.teams || []);
      } else {
        console.error("팀 목록 조회 실패 - 상태 코드:", response.status);
      }
    } catch (error) {
      console.error("팀 목록 조회 실패:", error);
      // 에러 시 빈 배열 유지
    }
  };


  // 가이드 모달 버튼 클릭 -> 게임 시작
  const handleStartGame = () => {
    setIsGuideOpen(false);
  };

  // 홈으로 나가기
  const goHome = () => {
    navigate("/std")

  }

  const getEffectImage = (effect) => {
    switch (effect) {
      case "add": return add1;
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

  const getEffectKeyForDisplay = (result) => {
    if (!result) return undefined;
    if (result.effect === "add" && typeof result.addCredit === "number") {
      if (result.addCredit >= 5000) return "add5";
      if (result.addCredit >= 4000) return "add4";
      if (result.addCredit >= 3000) return "add3";
      if (result.addCredit >= 2000) return "add2";
      if (result.addCredit >= 1000) return "add1";
    }
    return result.effect;
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

    // 크레딧이 1000 미만이면 뽑기 불가
    if (credit < 1000) {
      alert("크레딧이 부족합니다. 최소 1000 크레딧이 필요합니다.");
      return;
    }

    setIsDrawing(true);
    setCardResult(null);

    // 먼저 카드를 뽑힌 상태로 표시 (UI 즉시 반영)
    const newDrawnCards = [...drawnCards, cardId];
    setDrawnCards(newDrawnCards);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}std/select/pull`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ card: cardId + 1 }),
      });
      if (!response.ok) {
        const error = await response.json();
        // 서버는 code 대신 message만 내려주므로 status로 분기
        if (response.status === 403) {
          alert(error.error || "크레딧이 부족합니다");
          setDrawnCards(drawnCards);
        } else if (response.status === 409) {
          alert(error.error || "이미 뽑힌 카드입니다");
          setDrawnCards(drawnCards);
        } else if (response.status === 400) {
          alert(error.error || "카드 번호가 잘못되었습니다");
          setDrawnCards(drawnCards);
        } else {
          alert(error.error || "카드 뽑기에 실패했습니다");
          setDrawnCards(drawnCards);
        }
        return;
      }

      const data = await response.json();

      // 카드 뽑는 애니메이션

      setCardResult(data);

      // 저장 처리
      await saveDrawnCards(newDrawnCards);

      // 100개 다 뽑으면 리셋
      if (newDrawnCards.length >= 100) {
        console.log(`게임판을 리셋합니다. (현재 ${newDrawnCards.length}개)`);
        setTimeout(() => {
          console.log('리셋 실행 중...');
          // 저장소 초기화
          if (window.storage) {
            window.storage.set('drawn_cards', JSON.stringify([]), true);
          }
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('drawn_cards', JSON.stringify([]));
          }
          // 상태 초기화
          setDrawnCards([]);
        }, 2000);
      }

      console.log('카드 effect:', data.effect);

      if (!(data.effect === "swap" || data.effect === "steal" || data.effect === "anger")) {
        await refreshCredit();
      }

      if (data.effect === "swap" || data.effect === "steal" || data.effect === "anger") {
        // 팀 선택이 필요한지 판단
        setIsEffectOpen(true);
      } else {
        setIsResultOpen(true);
      }

    } catch (error) {
      console.error("카드 뽑기 실패:", error);
      // 에러 발생 시 카드를 다시 뽑을 수 있도록 복구
      setDrawnCards(drawnCards);
      alert("카드 뽑기에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDrawing(false);
    }
  };

  const handleOpenTeamSelect = async () => { // 팀선택 모달
    setIsEffectOpen(false);
    setIsTeamSelectOpen(true);
    // 팀 선택 모달이 열릴 때 최신 팀 목록을 다시 가져옵니다
    await fetchTeams();
  };


  const handleTeamSelect = async (teamId) => {
    try {
      let endpoint = "";
      if (cardResult.effect === "swap") {
        endpoint = `${import.meta.env.VITE_API_URL}std/select/pull/shuffle`;
      } else if (cardResult.effect === "steal") {
        endpoint = `${import.meta.env.VITE_API_URL}std/select/pull/steal`;
      } else if (cardResult.effect === "anger") {
        endpoint = `${import.meta.env.VITE_API_URL}std/select/pull/anger`;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
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

      const finalData = {
        ...data,
        effect: cardResult.effect,
      };

      setCardResult(finalData);
      setIsTeamSelectOpen(false);
      setIsResultOpen(true);

      await refreshCredit();

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
        isTeamName="true"
        isCredit="true"
      />

      {isLoading ? (
        <LoadingContainer>
          <p>게임판을 불러오는 중...</p>
        </LoadingContainer>
      ) : (
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
      )}



      {/* 가이드 모달 */}
      <ModalComponent
        isOpen={isGuideOpen}
        onClose={goHome} // X 버튼은 /std로 나가게
        title="추억의 뽑기 게임"
        dismissKey="select-guide"
        description="추억의 문방구 뽑기 게임을 아시나요?
        뽑기 1회당 1000 크레딧이 차감됩니다!
        뽑기 판 안에는 1000 크레딧부터 5000 크레딧까지 일반적인 보상과
        상대 팀에서 크레딧 뺏아오기, 크레딧 2배 불리기, 상대 팀과 크레딧 바꾸기,
        전체 팀 크레딧 초기화 등 다양한 이벤트도 있어요"
        catchphrase="뽑기 버튼 한 번으로 여러분의 운을 시험 해 보세요!"
        isGuide={true}
        btnText="1000크레딧으로 게임 시작하기"
        onButtonClick={handleStartGame} // 버튼 클릭 -> 게임 시작
      />


      {cardResult && (cardResult.effect === "swap" || cardResult.effect === "steal" || cardResult.effect === "anger") && (
        <ModalComponent
          isOpen={isEffectOpen}
          onClose={closeEffectModal}
          title={cardResult.message}
          img={getEffectImage(getEffectKeyForDisplay(cardResult))}
          isSelectTeam={true}
          description=""
          catchphrase="팀을 선택해주세요"
          btnText="팀 선택하기"
          onButtonClick={handleOpenTeamSelect}
          isResult={true}
          effect={getEffectKeyForDisplay(cardResult)}
        />
      )}

      <TeamSelectModal
        isOpen={isTeamSelectOpen}
        onClose={() => setIsTeamSelectOpen(false)}
        teams={teams}
        selectTeam={handleTeamSelect}
        effect={cardResult?.effect}
      />


      {cardResult && !(cardResult.effect === "swap" || cardResult.effect === "steal" || cardResult.effect === "anger") && (
        <ModalComponent
          isOpen={isResultOpen}
          onClose={() => setIsResultOpen(false)}
          title={
            cardResult.myTeam
              ? cardResult.message
              : cardResult.message
          }
          img={getEffectImage(getEffectKeyForDisplay(cardResult))}
          isResult={true}
          effect={getEffectKeyForDisplay(cardResult)}

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
  background: #fff;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1098px;
  height: 400px;
  margin: 0px 130px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #B2B2B2;
  
  p {
    font-size: 18px;
    color: #666;
  }
`;
