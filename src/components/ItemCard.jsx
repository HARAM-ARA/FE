import styled from "@emotion/styled";
import React from "react"
import { useState } from "react";

const Card = styled.div`
    display:flex;
    position: relative;
    width: 333px;
    height: ${props => props.isCoupon ? "300px" : "111px"};
    padding: 32px 40px;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
    margin: 0px 40px 32px 0px;
`;

const StyledInput = styled.input`
    margin: 0;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 1.5px solid gainsboro;
    border-radius: 0.35rem;
    &:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: #F07F23;
    }

`;

const StyledLabel = styled.label`
    display: flex;
    user-select: none;
`;

const Img = styled.img`
    width: ${props => props.isCoupon ? "310px" : "160px"};
    height: ${props => props.isCoupon ? "150px" : "110px"};
    flex-shrink: 0;
    border-radius: 12px;
    margin: 0px 15px 0px 20px;
`;

const Title = styled.p`
    color: #1D1D1D;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: ${props => props.isCoupon ? "25px 0px 10px 25px" : "5px 0px 10px 5px"};
`;

const Price = styled.p`
    color: #B2B2B2;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin:${props => props.isCoupon ? "0px 0px 0px 25px" : "0px 0px 0px 5px "};
`;

const Des = styled.div`
    display : ${props => props.isCoupon ? "" : "flex"};
    align-items: center;

`;

const QuantityBox = styled.div`
    display: flex;
    width: 79px;
    align-items: center;
    gap: 12px;
    color:white;
    margin : ${props => props.isCoupon ? '0px  0px 0px 23px' : '0px 0px 0px 5px'};

`;

const QuantityBtn = styled.button`
    display: flex;
    width: 23px;
    height: 23px;
    padding: 0 7px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 80px;
    border: 1px solid #B2B2B2;

    &:hover{
        border:none;

        background: var(--Primary-50, #FFF2E4);
        color: var(--Primary-200, #F07F23);
    };
    &:focus{
        border:1px solid #B2B2B2;
        outline:none;
    };
`;

const Quantity = styled.p`
    color: #1D1D1D;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;
    margin:0;
`;

const Gray = styled.p`
    color: #B2B2B2;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;
    &:hover{
        color: var(--Primary-200, #F07F23);
    }
`;

const SoldOutOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    z-index: 10;
`;





export default function ItemCard({ isCoupon = false, checked, onChange, img, title, price, stock, isAdmin = false }) {


    const [quantity, setQuantity] = useState(0);

    const increase = () => {
        setQuantity(prev => prev + 1)
    }
    const decrease = () => {
        setQuantity(prev => (prev > 0 ? prev - 1 : 0));
    }

    const handleCheck = (e) => {
        const isChecked = e.target.checked;

        onChange(e);

        if (!isAdmin && isChecked) {
            setQuantity(1);
        } else if (!isAdmin) {
            setQuantity(0);
        }
    };

    return (
        <>
            <Card isCoupon={isCoupon}>
                {!isAdmin && stock === 0 && <SoldOutOverlay>매진입니다!!</SoldOutOverlay>}
                <div style={{margin:'0px'}}>
                    <StyledLabel>
                        <StyledInput type="checkbox" checked={checked} onChange={handleCheck} />
                        <Des isCoupon={isCoupon}>
                            <Img src={img} isCoupon={isCoupon} />
                            <div>
                                <Title isCoupon={isCoupon} >{title}</Title>
                                <Price isCoupon={isCoupon}>{price} 크레딧</Price>
                                {!isAdmin && (
                                    <QuantityBox isCoupon={isCoupon} >
                                        <QuantityBtn onClick={decrease}>
                                            <Gray>-</Gray>
                                        </QuantityBtn>
                                        <Quantity>{quantity}</Quantity>
                                        <QuantityBtn onClick={increase}>
                                            <Gray>+</Gray>
                                        </QuantityBtn>
                                    </QuantityBox>
                                )}
                            </div>
                        </Des>
                    </StyledLabel>
                </div>

            </Card>
        </>
    )
}