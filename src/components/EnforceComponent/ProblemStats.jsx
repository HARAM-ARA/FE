import styled from "@emotion/styled";
import NextBtn from "../../assets/nextBtn.svg";

const MenuTap2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  margin: 0 0 5% 0;
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
  margin: 0;
`;

const BtnImg = styled.img`
  width: 200px;
  height: 200px;
  margin: 15% 15% 0 0;
  cursor: pointer;
  display: block;
  flex-shrink: 0;
`;

export default function ProblemStats({ solvedProblems, remainingProblems, handleEnhance }) {
  return (
    <MenuTap2>
      <Text>푼 문제 수 : {solvedProblems}</Text>
      {/* <Text>남은 문제 수 : {remainingProblems}</Text> */}
      <BtnImg src={NextBtn} onClick={handleEnhance} />
    </MenuTap2>
  );
}