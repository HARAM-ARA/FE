import React from "react";
import styled from "@emotion/styled";

const Btn = styled.button`
    border: 1px solid
        ${({ isModal, active }) =>
            isModal ? "#F07F23" : active ? "none" : "#B2B2B2"};

    height: ${({ isModal }) => (isModal ? "50px" : "40px")};
    display: inline-flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: ${({ isSelect }) => (isSelect ? "12px" : "80px")};
    background-color: ${({ active }) => (active ? "#FFF2E4" : "white")};
    cursor: pointer;

    color: ${({ isModal, active }) =>
            isModal ? "#F07F23" : active ? "#F07F23" : "#646464"};

    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;

    transition: transform 0.08s ease;

    &:hover {
        background: #fff2e4;
        border: 1px solid #fff2e4;
        color: #f07f23;
    }

    &:active {
        transform: scale(0.96);
        background: #fff2e4;
        border: 1px solid #fff2e4;
    }

    &:focus-visible {
        outline: none;
        box-shadow: none;
    }
`;

export default function Button({
    path,
    onClick,
    text,
    active,
    isModal,
    isSelect,
}) {
    const handleClick = () => {
        onClick?.();
        path?.();
    };

    return (
        <Btn
            onClick={handleClick}
            active={active}
            isModal={isModal}
            isSelect={isSelect}
            type="button"
        >
            {text}
        </Btn>
    );
}
