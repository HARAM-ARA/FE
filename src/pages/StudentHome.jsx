import React, {useState} from "react";
import styled from "@emotion/styled";
import { AxiosInstnce as customaxios } from "../lib/customAxios.js";
import Card from "../components/newCard.jsx";
import Timer from "../components/Timer.jsx";
import TypingGameCard from "../components/TypingGameCard.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useCredit } from "../context/CreditContext.jsx";
import StoreImg from "../assets/store.svg";
import Button from "../components/button.jsx";
import TeamRanking from "../components/TeamRanking.jsx";
import AnnouncementModal from "../components/AnnouncementModal.jsx";
import MusicModal from "../components/MusicModal.jsx";


const Body = styled.div`
    width: 100vh;
    height: 575px;
    display: flex;
    align-items: flex-end;
    gap: 55px;
    margin: 0px 50px 95px 50px;
    background: #fff;
  `;

const LeftBox = styled.div`
   
    height: 575px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 27px;
    margin: 0px 0px 0px 0px;
  `;

const RightBox = styled.div`
    flex: 1;
    height: 575px;
    display: flex;
    align-items: flex-start;
    gap: 32px;
    margin: 0px 0px 0px 0px;
  `;

const GameSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  `;

const RankingSection = styled.div`
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-left: 25px;
  `;


const TextBox = styled.div`
    
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
   
    
  `;

const TitleText = styled.p`
    color: #1D1D1D;
    margin:0px 0px 0px 0px;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 44.8px */
    margin: 0;
  `;

const Text = styled.p`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;
const DescriptionText = styled.p`
    color: #8B8B8B;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
    letter-spacing: -0.168px;
    margin: 0;
`;

const TimerBox = styled.div`
    display: flex;
    height: 392px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    flex-shrink: 0;
    align-self: stretch;
  `;


const MinigameBox = styled.div`
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    margin-top:0px;
    gap: 24px;
    flex-shrink: 0;
    align-self: stretch;
    flex-wrap: wrap;
  `;

const ButtonRow = styled.div`
    margin:0px 0px 0px 0px;
    display: flex;
    align-items: center;
    gap: 24px;
    align-self: stretch;
  `;

const StoreCard = styled.div`
    display: flex;
    padding: 30px 47px 31px 47px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
`;

const Storediv = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
`;
const Storeleft = styled.div`
    display: flex;
    width: 390px;
    align-items: center;
    gap: 18px;
`;

const StoreImgDiv = styled.img`
    width: 50px;
    height: 50px;
    flex-shrink: 0;
`;


export default function Student() {
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false); // 전체 공지 모달용
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false); // 음악 신청 모달용
  const navigate = useNavigate();
  const { credit, refreshCredit } = useCredit();


  const handleAnnouncementSubmit = async (message) => {
        try {
            const token = localStorage.getItem('auth_token');

            // 1단계: 상점에서 TTS 쿠폰 찾기 (ID: 999)
            const storeResponse = await customaxios.get(`${import.meta.env.VITE_API_URL}haram/store`);
            const ttsItem = storeResponse.data.items.find(item => item.itemId === 999);

            if (!ttsItem) {
                alert("TTS 메시지 상품을 찾을 수 없습니다.");
                return;
            }

            console.log("===== TTS 쿠폰 정보 =====");
            console.log("상품명:", ttsItem.itemName);
            console.log("가격:", ttsItem.price);
            console.log("재고:", ttsItem.quantity);
            console.log("현재 보유 크레딧:", credit);

            // 크레딧이 부족한지 확인
            if (credit < ttsItem.price) {
                alert(`크레딧이 부족합니다. 필요: ${ttsItem.price.toLocaleString()}, 보유: ${credit.toLocaleString()}`);
                return;
            }

            // 2단계: TTS 쿠폰 구매
            await customaxios.post(`${import.meta.env.VITE_API_URL}std/store`,
                { itemId: ttsItem.itemId, quantity: 1 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log("TTS 쿠폰 구매 완료");

            // 크레딧 새로고침
            await refreshCredit();

            // 3단계: TTS 메시지 전송
            await customaxios.post(`${import.meta.env.VITE_API_URL}haram/notice`,
                { content: message },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log("TTS 메시지 전송 완료:", message);
        } catch (error) {
            console.error("TTS 메시지 전송 실패:", error);
            console.error("에러 상세:", JSON.stringify(error.response?.data, null, 2));
            console.error("에러 상태 코드:", error.response?.status);
            console.error("에러 URL:", error.config?.url);

            const errorData = error.response?.data;
            const errorMsg = errorData?.error || errorData?.message || "알 수 없는 오류";

            if (errorData?.error === "PAYMENT_REQUIRED" || errorData?.error === "크레딧이 부족합니다") {
                alert("크레딧이 부족합니다.");
            } else if (errorData?.error === "OUT_OF_STOCK") {
                alert("TTS 메시지 상품의 재고가 부족합니다.");
            } else if (errorData?.error === "NON_EXIST_ITEM") {
                alert("TTS 메시지 상품을 찾을 수 없습니다.");
            } else if (error.response?.status === 403) {
                alert(`권한이 없습니다. 에러: ${errorMsg}`);
            } else {
                alert(`TTS 메시지 전송에 실패했습니다. 에러: ${errorMsg}`);
            }
        }
    };

    const handleMusicSubmit = async (youtubeUrl) => {
        try {
            const token = localStorage.getItem('auth_token');

            console.log("===== 음악 신청 시작 =====");
            console.log("YouTube URL:", youtubeUrl);

            // 1단계: 상점에서 음악 신청 쿠폰 찾기 (ID: 998)
            const storeResponse = await customaxios.get(`${import.meta.env.VITE_API_URL}haram/store`);
            const musicItem = storeResponse.data.items.find(item => item.itemId === 998);

            if (!musicItem) {
                alert("음악 신청 상품을 찾을 수 없습니다.");
                throw new Error("음악 신청 상품을 찾을 수 없습니다.");
            }

            console.log("===== 음악 신청 쿠폰 정보 =====");
            console.log("상품명:", musicItem.itemName);
            console.log("가격:", musicItem.price);
            console.log("재고:", musicItem.quantity);
            console.log("현재 보유 크레딧:", credit);

            // 크레딧이 부족한지 확인
            if (credit < musicItem.price) {
                alert(`크레딧이 부족합니다. 필요: ${musicItem.price.toLocaleString()}, 보유: ${credit.toLocaleString()}`);
                throw new Error("크레딧 부족");
            }

            // 2단계: 음악 신청 쿠폰 구매
            await customaxios.post(`${import.meta.env.VITE_API_URL}std/store`,
                { itemId: musicItem.itemId, quantity: 1 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log("음악 신청 쿠폰 구매 완료");

            // 크레딧 새로고침
            await refreshCredit();

            // 3단계: 음악 신청 API 호출
            const response = await customaxios.post(
                `${import.meta.env.VITE_API_URL}std/music/request`,
                { url: youtubeUrl },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log("음악 신청 완료:", response.data);

            // 성공 메시지는 MusicModal에서 처리
        } catch (error) {
            console.error("음악 신청 실패:", error);
            console.error("에러 상세:", JSON.stringify(error.response?.data, null, 2));
            console.error("에러 상태 코드:", error.response?.status);

            const errorData = error.response?.data;
            const errorMsg = errorData?.message || errorData?.error || error.message || "알 수 없는 오류";

            // 상점 구매 관련 에러
            if (errorData?.error === "PAYMENT_REQUIRED" || errorData?.error === "크레딧이 부족합니다") {
                alert("크레딧이 부족합니다.");
            } else if (errorData?.error === "OUT_OF_STOCK") {
                alert("음악 신청 상품의 재고가 부족합니다.");
            } else if (errorData?.error === "NON_EXIST_ITEM") {
                alert("음악 신청 상품을 찾을 수 없습니다.");
            }
            // 음악 신청 API 에러
            else if (errorData?.error === "BAD_REQUEST") {
                if (errorMsg.includes("YouTube URL")) {
                    alert("올바른 YouTube URL을 입력해주세요.");
                } else if (errorMsg.includes("영상 정보")) {
                    alert("YouTube 영상을 찾을 수 없습니다. URL을 확인해주세요.");
                } else {
                    alert(errorMsg);
                }
            } else if (errorData?.error === "PERMISSION_DENIED") {
                alert("음악 신청 권한이 부족합니다.");
            } else if (errorData?.error === "NON_EXIST_TEAM") {
                alert("팀에 소속되어 있지 않습니다.");
            } else if (error.response?.status === 403) {
                alert(`권한이 없습니다: ${errorMsg}`);
            } else if (error.response?.status === 404) {
                alert("팀 정보를 찾을 수 없습니다.");
            } else if (!errorMsg.includes("크레딧 부족") && !errorMsg.includes("찾을 수 없습니다")) {
                alert(`음악 신청에 실패했습니다: ${errorMsg}`);
            }

            // 에러 발생 시 throw하여 모달이 닫히지 않도록 함
            throw error;
        }
    };


  return (
    <>
      <Header
        isTeamName="true"
        isCredit="true"
      />

      <Body>
        <LeftBox>
          <TimerBox onClick={() => navigate("/timer")}>
            <TextBox>
              <TitleText>타이머</TitleText>
            </TextBox>
            <Timer />
          </TimerBox>

          <TitleText>상점</TitleText>
          <ButtonRow>
            <StoreCard>
              <Storediv>
                <Storeleft>
                  <StoreImgDiv src={StoreImg} />
                  <Text>상품 구매</Text>
                </Storeleft>
                <Button text="들어가기" onClick={()=>navigate('/store')}></Button>
              </Storediv>
            </StoreCard>
          </ButtonRow>
        </LeftBox>

        <RightBox>
          <GameSection>
            <TextBox>
              <TitleText>미니게임</TitleText>
            </TextBox>

            <MinigameBox>
              <Card title="추억의 뽑기" onClick={()=>navigate('/select')}/>
              <Card title="강화하기"  onClick={()=>navigate('/enforce')}/>
              <Card title="공룡게임" onClick={()=>navigate('/dino')}/>
              <Card title="TTS 메세지" isItem={true} onClick={()=>setIsAnnouncementModalOpen(true)}/>
              <Card title="음악 신청" isItem={true} onClick={()=>setIsMusicModalOpen(true)}/>
            </MinigameBox>
          </GameSection>

          <RankingSection>
            <TitleText>팀 순위</TitleText>
              <DescriptionText>* 해커톤 순위와는 별개로 1~5위까지 상품을 드립니다! </DescriptionText>
            <TeamRanking />
          </RankingSection>
        </RightBox>

      </Body >

        <AnnouncementModal
            isOpen={isAnnouncementModalOpen}
            onClose={() => setIsAnnouncementModalOpen(false)}
            onSubmit={handleAnnouncementSubmit}
        />

        <MusicModal
            isOpen={isMusicModalOpen}
            onClose={() => setIsMusicModalOpen(false)}
            onSubmit={handleMusicSubmit}
        />
    </>
  )
}