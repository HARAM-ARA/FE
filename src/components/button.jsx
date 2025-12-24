import React from "react";
import styled from '@emotion/styled';

export default function Button({ path, onClick, text, active, isModal, isSelect }) {

    const Btn = styled.button`
        border: 1px solid ${props =>
                props.isModal ? '#F07F23' : (props.active ? 'none' : '#B2B2B2')};
        height: ${props => props.isModal ? '50px' : "40px"};
        display: inline-flex;
        padding: 10px 24px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        border-radius: ${props => props.isSelect ? '12px' : '80px'};
        background-color:${props => props.active ? '#FFF2E4' : 'white'};
        cursor: pointer;

        /* hover 시에도 outline 완전 제거 */
        &:hover {
            background: #FFF2E4;
            border: none;
            color: #F07F23;
            outline: none !important;
            box-shadow: none !important;
        }

        /* focus 전부 제거 */
        &:focus{
            border: 1px solid #B2B2B2;
        }
        &:focus-visible,
        &:active {
            outline: none !important;
            box-shadow: none !important;
            border: none !important;
        }

        color:${props =>
                props.isModal ? "#F07F23" :
                        (props.active ? '#F07F23' : '#646464')};
        font-family: Pretendard;
        font-size: 16px;
        font-weight: 500;
    `;

    const handleClick = () => {
        if (typeof onClick === "function") onClick();
        if (typeof path === "function") path();
    };

    return (
        <Btn
            onClick={handleClick}
            active={active}
            isModal={isModal}
            isSelect={isSelect}
        >
            {text}
        </Btn>
    );
}
