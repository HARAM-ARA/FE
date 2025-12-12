import styled from "@emotion/styled";

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
  margin-left: 0;
  position: relative;
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

const NextTierText = styled.div`
  color: #5A5A5A;
  text-align: center;
  font-family: Pretendard;
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.84px;
  white-space: nowrap;
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

const TierImgWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 160px;
  height: 180px;
`;

const TierImg = styled.img`
  width: 160px;
  height: 180px;
  position: absolute;
  top: 0;
  left: 0;
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
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  z-index: 1;
`;

export default function TierDisplay({
  currentTier,
  currentLevel,
  currentTierIndex,
  getCurrentTierNumber,
  successRate,
  tiersLength,
}) {
  return (
    <TierTap>
      <TierImgBox>
        <Title> 티어 강화하기 </Title>
        <TierImgWrapper>
          <TierImg src={currentTier.image} />
          <Number>{currentLevel}</Number>
        </TierImgWrapper>
      </TierImgBox>
      <TierImgBox2>
        {currentTierIndex === tiersLength - 1 && currentLevel === 1 ? (
          <Title>최고 등급 달성!</Title>
        ) : (
          <NextTierText>
            +{getCurrentTierNumber()} {currentTier.name} {currentLevel}
          </NextTierText>
        )}
        <Percent>{successRate}%</Percent>
      </TierImgBox2>
    </TierTap>
  );
}