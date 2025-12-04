import { useState } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import { useNavigate } from "react-router-dom";
import bronze from "../assets/bronze.svg";
import sliver from "../assets/sliver.svg";
import gold from "../assets/gold.svg";
import platinum from "../assets/platinum.svg";
import diamomd from "../assets/Diamond.svg";
import ruby from "../assets/ruby.svg";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import NextBtn from "../assets/nextBtn.svg";

const Body = styled.div`
    height: 650px;
    display: flex;
    align-items: flex-end;
    gap: 12%;
    margin: 0px 50px 95px 50px;
    align-items:center;
    background: #fff;
  `;

const MenuTap = styled.div`
  display: flex;
   margin: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin: 0% 0% 5% 0%;
`;

const MenuTap2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  margin: 0% 0% 5% 0%;
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
  
`;

const TierImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  align-self: stretch;
  margin-left:0;
`;

const TierImgBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
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

const Percent = styled.p`
  color: #3A3A3A;
  text-align: center;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const Text = styled.p`
  color: #6A6A6A;
  text-align: center;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;
  margin:0;
`;

const BtnImg = styled.img`
  width: 200px;
  height: 200px;
  margin: 15% 15% 0% 0%;
  cursor:pointer;
`;

const TierImg = styled.img`
  width: 159.999px;
  height: 179.199px;
  position: relative;
`;

const Number = styled.p`
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 90px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.103px;
  position: absolute;
  margin-top:10.5%;
`;

const FunctionImg = styled.img`
  cursor:pointer;
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
            <FunctionImg src={icon1} />
            <MenuText> 코드를 유출해요 </MenuText>
          </MenuEachBox>
          <MenuEachBox>
            <FunctionImg src={icon2} />
            <MenuText> 티어를 살 수 있어요 </MenuText>
          </MenuEachBox>
          <MenuEachBox>
            <FunctionImg src={icon3} />
            <MenuText> 크레딧으로 교환해요 </MenuText>
          </MenuEachBox>
        </MenuTap>

        <TierTap>
          <TierImgBox>
            <Title> 티어 강화하기 </Title>
            <TierImg src={bronze}/> <Number>3</Number>
          </TierImgBox>
          <TierImgBox2>
            <Title> +8 실버 3 </Title>
            <Percent>80%</Percent>
          </TierImgBox2>
        </TierTap>

        <MenuTap2>
          <Text>푼 문제 수 : 1000</Text>
          <Text>남은 문제 수 : 10000</Text>
          <BtnImg src={NextBtn}/>
        </MenuTap2>


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