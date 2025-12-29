import styled from "@emotion/styled";
import React from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Card = styled.div`
    display: flex;
    padding: 2rem 3rem 2rem 1.5rem;
    border-radius: 0.75rem;
    border: 0.0625rem solid #8b8b8b;
`;

const TopContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const StyledLabel = styled.label`
    display: flex;
    user-select: none;
`;

const StyledInput = styled.input`
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid gainsboro;
    border-radius: 0.35rem;

    &:checked {
        border-color: transparent;
        background-color: #f07f23;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
    }
`;

const Des = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1.25rem;
`;

const Img = styled.img`
    width: 10rem;
    height: 7rem;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.p`
    color: #1d1d1d;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0 0 0.5rem 0;
`;

const Price = styled.p`
    color: #b2b2b2;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-weight: 400;
    margin: 0;
`;

const Stock = styled.p`
    color: ${props => props.isLow ? '#FF4444' : '#666'};
    font-family: Pretendard;
    font-size: 1rem;
    font-weight: 400;
    margin: 0.25rem 0 0 0;
`;

const QuantityBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.75rem;
`;

const QuantityBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.4375rem;
    height: 1.4375rem;
    border-radius: 5rem;
    border: 0.0625rem solid #b2b2b2;
    background: transparent;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: #fff2e4;
        border-color: transparent;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const QuantityText = styled.p`
    font-family: Pretendard;
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0;
`;

const Gray = styled.span`
    color: #b2b2b2;
    font-size: 1.25rem;
    font-weight: 500;

    ${QuantityBtn}:hover & {
        color: #f07f23;
    }
`;

export default function ItemCard({
    checked,
    onChange,
    img,
    title,
    price,
    stock = -1, // -1이면 무제한
    quantity = 0,
    onQuantityChange,
    isAdmin = false
}) {
    const isUnlimited = stock === -1;
    const canIncrease = isUnlimited || quantity < stock;
    
    const increase = () => {
        if (canIncrease) {
            onQuantityChange?.(quantity + 1);
        }
    };
    const decrease = () => onQuantityChange?.(Math.max(0, quantity - 1));

    return (
        <Wrapper>
            <Card>
                <TopContainer>
                    <StyledLabel>
                        <StyledInput
                            type="checkbox"
                            checked={checked}
                            onChange={onChange}
                            disabled={!isUnlimited && stock <= 0}
                        />
                        <Des>
                            <Img src={img} />
                            <Content>
                                <Title>{title}</Title>
                                <Price>{price} 크레딧</Price>
                                <Stock isLow={!isUnlimited && stock <= 3}>
                                    {isUnlimited ? '재고: 무제한' : `재고: ${stock}개`}
                                </Stock>

                                {!isAdmin && (
                                    <QuantityBox>
                                        <QuantityBtn onClick={decrease} disabled={quantity <= 0}>
                                            <Gray>-</Gray>
                                        </QuantityBtn>
                                        <QuantityText>{quantity}</QuantityText>
                                        <QuantityBtn onClick={increase} disabled={!canIncrease}>
                                            <Gray style={{ opacity: canIncrease ? 1 : 0.3 }}>+</Gray>
                                        </QuantityBtn>
                                    </QuantityBox>
                                )}
                            </Content>
                        </Des>
                    </StyledLabel>
                </TopContainer>
            </Card>
        </Wrapper>
    );
}