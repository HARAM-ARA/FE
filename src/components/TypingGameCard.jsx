import React, { useState } from "react";
import Card from "./card.jsx";
import ModalComponent from "./modalComponent.jsx";
import TypingModalFlow from "./TypingModalFlow.jsx";

export default function TypingGameCard({ testMode = false, myTeamName = "하람" }) {
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);

  // 타자 게임 시작 핸들러
  const handleTypingGameStart = () => {
    setShowGuideModal(true);
  };

  // 가이드 모달에서 "시작하기" 버튼 클릭
  const handleGuideConfirm = () => {
    setShowGuideModal(false);
    setShowGameModal(true);
  };

  // 게임 모달 닫기
  const handleGameClose = () => {
    setShowGameModal(false);
  };

  return (
    <>
      <Card
        title="타자 게임"
        description="2시간에 한 번, 타자 게임에 도전하세요!"
        isTypingGame={true}
        onTypingGameStart={handleTypingGameStart}
        testMode={testMode}
      />

      {/* 가이드 모달 */}
      <ModalComponent
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        title="타자 게임 가이드"
        description='시작함과 동시에 정확하고 빠르게 타자 게임을 완료 하는 사람이 승리해요
제시어는 랜덤으로 주어지며 1등 팀부터 5등 팀까지 크레딧을 수여해요
단, 같은 팀에서는 한명만 참가 할 수 있어요.'
        catchphrase="지금 바로 시작하기 버튼을 눌러 게임에 참가하세요!!"
        btnText="게임 시작하기"
        onButtonClick={handleGuideConfirm}
        isGuide={true}
      />

      {/* 타자 게임 전체 플로우 모달 */}
      <TypingModalFlow
        isOpen={showGameModal}
        onClose={handleGameClose}
        myTeamName={myTeamName}
      />
    </>
  );
}