import styled from "@emotion/styled";
import { useState } from "react";
import storeImg from "../assets/store.svg"; // storeImg 사용

// --- 스타일 정의 ---

const ContentWrapper = styled.div`
    padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 20px; 
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #B2B2B2;
  line-height: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: #E0E0E0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    color: #8B8B8B;
    font-size: 16px;
    margin-top: 8px;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.p`
    color: #1D1D1D;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
`;

const Input = styled.input`
    width: 300px;
    padding: 10px 16px;
    border: 1px solid #B2B2B2;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;
`;

const QuantityBox = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 8px;
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
    background-color: white;
    cursor: pointer;

    &:hover {
        border: none;
        background: #FFF2E4;
        p {
            color: #F07F23;
        }
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
    margin: 0;
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
    margin: 0;
    &:hover {
        color: #F07F23;
    }
`;

const CustomButton = styled.button`
    width: 100%;
    padding: 16px 0;
    background-color: ${props => props.disabled ? '#E0E0E0' : '#F07F23'};
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 20px;
    font-weight: 500;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    margin-top: 15px;

    &:hover {
        background-color: ${props => props.disabled ? '#E0E0E0' : '#E07010'};
    }
`;

// 이미지를 첨부하는 대신 임시 아이콘 사용
const PhotoIcon = () => (
    <ImageContainer>
        <img src={storeImg} alt="사진 첨부" />
        <p>사진을 첨부하세요</p>
    </ImageContainer>
);

// --- Component ---

export default function AddItem({ onAddItem, onClose }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(10);

    const increase = () => {
        setQuantity(prev => prev + 1)
    }
    const decrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }

    // 유효성 검사 (가격이 0보다 커야 함)
    const isFormValid = name.trim() !== "" && price.trim() !== "" && parseInt(price) > 0 && quantity >= 1;

    const handleSubmit = () => {
        if (!isFormValid) return;

        onAddItem({
            id: Date.now(),
            name,
            price: parseInt(price),
            stock: quantity,
            img: null
        });
    };

    return (
        <ContentWrapper>
            {/* 상단 닫기 버튼: onClose를 사용하여 모달 닫기 */}
            <ModalHeader>
                <CloseButton onClick={onClose}>
                    &times;
                </CloseButton>
            </ModalHeader>

            <ContentContainer>
                <PhotoIcon />

                <Form>
                    {/* 상품명 입력 */}
                    <InputGroup>
                        <Label>상품명을 입력하세요</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=""
                        />
                    </InputGroup>


                    <InputGroup>
                        <Label>가격을 입력하세요</Label>
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder=""
                        />
                    </InputGroup>

                    {/* 수량 입력/조절 */}
                    <InputGroup>
                        <Label>수량</Label>
                        <QuantityBox>
                            <QuantityBtn onClick={decrease}>
                                <Gray>-</Gray>
                            </QuantityBtn>
                            <Quantity>{quantity}</Quantity>
                            <QuantityBtn onClick={increase}>
                                <Gray>+</Gray>
                            </QuantityBtn>
                        </QuantityBox>
                    </InputGroup>


                    <CustomButton onClick={handleSubmit} disabled={!isFormValid}>
                        상품 추가하기
                    </CustomButton>
                </Form>
            </ContentContainer>
        </ContentWrapper>
    );
}