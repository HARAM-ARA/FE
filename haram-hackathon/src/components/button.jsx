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
    background-color:${active ? '#F07F23' : 'white'};
    &:hover{
      border-radius: var(--4XL, 80px);
      background: var(--Primary-200, #F07F23);
      color:#fff;
      border:none;
    }
    &:focus {
      outline: none;
    }
    color:${active ? 'white' : '#646464'};
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