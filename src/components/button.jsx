import React from "react";
import styled from '@emotion/styled';

export default function({path, text, active}){

  const Btn = styled.button`
    border: 1px solid ${active ? 'none' : '#B2B2B2;'};
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
      background: ${active ? '#FFF2E4' : " #F07F23"};
      color:${active ? '#F07F23' : '#fff'};
      border:none;
    }
    &:focus{
      border:none;
      outline:none;
    }
    color:${active ? '#F07F23' : '#646464'};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.192px;
  `;
  
  return (
    <>
      <Btn onClick={path}>{text}</Btn>
    </>
  )
}