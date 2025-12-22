import React from "react";
import styled from "@emotion/styled";
import Btn from "../components/button.jsx";

const Box = styled.div`
    display: flex;
    width: 300px;
    height: 0px;
    padding: 45px 40px;
    justify-content: center;
    align-items: flex-start;
    gap: 60px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
    margin:0px;
`;

const Boxdiv = styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
    width: 100%;
    justify-content: space-between;
`;

const Text = styled.p`
    color: #1D1D1D;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const BtnDiv= styled.div`
    margin-left: auto;
    right:0px;    
`;

export default function newCard (props) {
    return (
        <>
            <Box>
                <Boxdiv>
                    <Text> {props.title} </Text>
                    <BtnDiv>
                        <Btn text="시작하기" onClick={props.onClick}></Btn>
                    </BtnDiv>
                </Boxdiv>
            </Box>
        </>
    )
}