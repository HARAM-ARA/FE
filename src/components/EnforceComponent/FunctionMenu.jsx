import { useState } from "react";
import styled from "@emotion/styled";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon1hover from "../../assets/icon1hover.svg";
import icon2hover from "../../assets/icon2hover.svg";
import icon3hover from "../../assets/icon3hover.svg";

const MenuTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin: 0 0 5% 0;
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
  line-height: 160%;
  margin: 0;
`;

const FunctionImg = styled.img`
  width: 64px;
  height: 64px;
  cursor: pointer;
  display: block;
`;

export default function FunctionMenu({
  handleLeakCodeClick,
  handleBuyTierClick,
  handleExchangeCreditClick,
}) {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <MenuTap>
      <MenuEachBox>
        <FunctionImg
          src={hoveredIcon === 1 ? icon1hover : icon1}
          onClick={handleLeakCodeClick}
          onMouseEnter={() => setHoveredIcon(1)}
          onMouseLeave={() => setHoveredIcon(null)}
        />
        <MenuText> 코드를 유출해요 </MenuText>
      </MenuEachBox>
      <MenuEachBox>
        <FunctionImg
          src={hoveredIcon === 2 ? icon2hover : icon2}
          onClick={handleBuyTierClick}
          onMouseEnter={() => setHoveredIcon(2)}
          onMouseLeave={() => setHoveredIcon(null)}
        />
        <MenuText> 티어를 살 수 있어요 </MenuText>
      </MenuEachBox>
      <MenuEachBox>
        <FunctionImg
          src={hoveredIcon === 3 ? icon3hover : icon3}
          onClick={handleExchangeCreditClick}
          onMouseEnter={() => setHoveredIcon(3)}
          onMouseLeave={() => setHoveredIcon(null)}
        />
        <MenuText> 크레딧으로 교환해요 </MenuText>
      </MenuEachBox>
    </MenuTap>
  );
}