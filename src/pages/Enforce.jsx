import { useState } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import { useNavigate } from "react-router-dom";
import bronze from "../assets/bronze.svg";
import icon1 from "../assets/icon1.svg";

const Body = styled.div`
    
    height: 575px;
    display: flex;
    align-items: flex-end;
    gap: 12%;
    margin: 0px 50px 95px 50px;
    align-items:center;
    background: #fff;
  `;

const MenuTap = styled.div`
  display: flex;
  width: 329px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const MenuEachBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const MenuText = styled.p`
  color: #6A6A6A;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 44.8px */
  margin:0;
`;

const TierTap = styled.div`
  display: flex;
  width: 375px;
  flex-direction: column;
  align-items: center;
  gap: 90px;
  margin: 0% 0% 20% 0%;
`;

const TierImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  align-self: stretch;
  margin-left:0;
`;

const Title = styled.div`
  color: #2E4358;
  text-align: center;
  font-family: Pretendard;
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.84px;
`;




export default function Enforce() {
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const navigate = useNavigate();

  const handleStartGame = () => {
    setIsGuideOpen(false);
  };

  const goHome = () => {
    navigate("/std")
  }

  return (
    <>
      <Header
        teamName="하람"
        isTeamName={true}
        isCredit={true}
        Credit="20,000" />

      <Body>
        <MenuTap>
          <MenuEachBox>
            <img src={icon1} />
            <MenuText> 크레딧으로 교환하기 </MenuText>
          </MenuEachBox>
          <MenuEachBox>
            <img src={icon1} />
            <MenuText> 크레딧으로 교환하기 </MenuText>
          </MenuEachBox>
          <MenuEachBox>
            <img src={icon1} />
            <MenuText> 크레딧으로 교환하기 </MenuText>
          </MenuEachBox>
        </MenuTap>

        <TierTap>
          <TierImgBox>
            <Title> 티어 강화하기 </Title>
            <img src={bronze} />
          </TierImgBox>
        </TierTap>


      </Body>
      <ModalComponent
        isOpen={isGuideOpen}
        onClose={goHome} // X 버튼은 /std로 나가게
        title="강화하기 게임"
        description="검 강화하기 게임을 아시나요?
             버튼을 누르면 일정 확률로 검 강화에 성공하여 더 좋은 검을 만드는 게임이에요
             정해진 확률에 따라 강화를 하거나, 검을 판매하여 돈을 모을 수 있어요
             하지만 저희는 검 대신 백준 티어를 강화하고 문제 수로 코드를 살 수도 있고
             코드를 유출하며 크레딧을 모으는 게임이에요! 두뇌력을 기를 수록 좋아요"
        catchphrase="지금 바로 시작하기 버튼을 눌러 백준 루비를 향해 달려가세요!!"
        isGuide={true}
        btnText="게임 시작하기"
        onButtonClick={handleStartGame} // 버튼 클릭 -> 게임 시작
      />

    </>
  )
}