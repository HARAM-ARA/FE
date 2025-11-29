import React from "react";
import styled from '@emotion/styled';

export default function({path, onClick, text, active, isModal}){  
  
  // 이동경로, 안에 들어갈 텍스트, 필터링용 active (true: 간식/ false: 쿠폰), 모달용


  const Btn = styled.button`
    border: 1px solid ${props => 
    props.isModal ? '#F07F23' : (props.active ? 'none' : '#B2B2B2')};
    height: 38px;
    display: inline-flex;
    height: 38px;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: var(--4XL, 80px);
    background-color:${active ? '#FFF2E4' : 'white'};
    &:hover{
      border-radius: var(--4XL, 80px);
      background: var(--Primary-50, #FFF2E4);
      border:none;
      color: var(--Primary-200, #F07F23);
    }
    &:focus{
     
      outline:none;
    }
    color:${props => props.isModal ? "#F07F23" : ( props.active ? '#F07F23' : '#646464')};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.192px;
    cursor: pointer;
  `;
  
  return (
    <>
      <Btn onClick={path || onClick} active={active} isModal={isModal}> {text} </Btn>
    </>
  )
}