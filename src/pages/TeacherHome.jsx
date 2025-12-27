import React from "react";
import styled from "@emotion/styled";
import Card from "../components/card.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";


const Body = styled.div`
    display: flex;
    padding: 110px 51px 162px 50px;
    
    gap: 50px;
    flex-direction: column;
    align-items: center;
    background: #fff;
`;

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap:40px;
`;


const TextBox = styled.div`
    width: 300px;
    height: 80px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`;

const TitleText = styled.p`
    color: #1D1D1D;
    margin: 0px;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
`;


const FunctionBox = styled.div`
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 24px;
    flex-shrink: 0;
    align-self: stretch;
    flex-wrap: wrap;
    margin: 0px;
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export default function TeacherHome() {
    const navigate = useNavigate();

    return (
        <>
            <Header
                isTeacher={true}
            />

            <Body>
                <MainDiv>
                   <Div>
                       <TextBox>
                           <TitleText>선생님 기능</TitleText>
                       </TextBox>

                       <FunctionBox>
                           <Card
                               title="팀 랜덤 생성"
                               description="팀을 랜덤으로 생성해요"
                               buttonText="시작하기"
                               onClick={() => navigate("/random")}
                           />
                           <Card
                               title="팀 조회 및 팀 크레딧 추가"
                               description="팀을 조회하고 크레딧을 추가해요"
                               buttonText="시작하기"
                               onClick={() => navigate("/teams")}
                           />
                           <Card
                               title="상점 관리"
                               description="상점에 상품을 등록하고 삭제해요"
                               buttonText="시작하기"
                               onClick={() => navigate("/adminstore")}
                           />
                       </FunctionBox>
                   </Div>
                </MainDiv>
            </Body>
        </>
    );
}