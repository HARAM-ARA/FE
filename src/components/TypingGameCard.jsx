import React, { useState } from "react";
import Card from "./card.jsx";
import ModalComponent from "./modalComponent.jsx";

export default function TypingGameCard({ testMode = false }) {
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

      {/* 게임 모달 (실제 게임 화면) */}
      <ModalComponent
        isOpen={showGameModal}
        onClose={handleGameClose}
        title="타자 게임"
        description="여기에 실제 타자 게임 로직이 들어갑니다."
        btnText="완료"
        onButtonClick={handleGameClose}
        isButton={true}
      />
    </>
  );
}