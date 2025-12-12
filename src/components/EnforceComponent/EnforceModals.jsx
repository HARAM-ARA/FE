import ModalComponent from "../modalComponent.jsx";
import Failure from "../../assets/failure.svg";

export default function EnforceModals({
  // 모달 상태
  isGuideOpen,
  isResultModalOpen,
  isLeakCodeModalOpen,
  isBuyTierModalOpen,
  isExchangeCreditModalOpen,

  // 모달 닫기 핸들러
  goHome,
  handleStartGame,
  closeResultModal,
  closeLeakCodeModal,
  closeBuyTierModal,
  closeExchangeCreditModal,

  // 모달 액션 핸들러
  handleLeakCodeAction,
  handleBuyTierAction,
  handleExchangeCreditAction,

  // 결과 메시지
  resultMessage,
  resultDescription,
}) {
  return (
    <>
      {/* 게임 가이드 모달 */}
      <ModalComponent
        isOpen={isGuideOpen}
        onClose={goHome}
        title="강화하기 게임"
        description="검 강화하기 게임을 아시나요?
             버튼을 누르면 일정 확률로 검 강화에 성공하여 더 좋은 검을 만드는 게임이에요
             정해진 확률에 따라 강화를 하거나, 검을 판매하여 돈을 모을 수 있어요
             하지만 저희는 검 대신 백준 티어를 강화하고 문제 수로 코드를 살 수도 있고
             코드를 유출하며 크레딧을 모으는 게임이에요! 두뇌력을 기를 수록 좋아요"
        catchphrase="지금 바로 시작하기 버튼을 눌러 백준 루비를 향해 달려가세요!!"
        isGuide={true}
        btnText="게임 시작하기"
        onButtonClick={handleStartGame}
      />

      {/* 강화 결과 모달 */}
      <ModalComponent
        isOpen={isResultModalOpen}
        onClose={closeResultModal}
        title={resultMessage}
        onButtonClick={closeResultModal}
        isButton={true}
        btnText="확인"
        img={Failure}
      />

      {/* 코드 유출 모달 */}
      <ModalComponent
        isOpen={isLeakCodeModalOpen}
        onClose={closeLeakCodeModal}
        title="코드를 유출해요"
        description="현재 티어의 문제 수만큼 크레딧을 획득할 수 있어요!"
        catchphrase="지금 바로 크레딧을 획득하세요!"
        isGuide={true}
        btnText="유출하기"
        onButtonClick={handleLeakCodeAction}
      />

      {/* 티어 구매 모달 */}
      <ModalComponent
        isOpen={isBuyTierModalOpen}
        onClose={closeBuyTierModal}
        isGuide={true}
        btnText="구매하기"
        onButtonClick={handleBuyTierAction}
      />

      {/* 크레딧 교환 모달 */}
      <ModalComponent
        isOpen={isExchangeCreditModalOpen}
        onClose={closeExchangeCreditModal}
        title="크레딧으로 교환해요"
        description="푼 문제 수를 크레딧으로 교환할 수 있어요!
                     1문제당 100크레딧으로 교환됩니다.
                     교환 후 푼 문제 수는 0으로 초기화됩니다."
        catchphrase="문제를 풀어서 모은 노력을 크레딧으로 바꿔보세요!"
        isGuide={true}
        btnText="교환하기"
        onButtonClick={handleExchangeCreditAction}
      />
    </>
  );
}