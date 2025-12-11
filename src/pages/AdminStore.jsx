import { useState } from "react";
import styled from "@emotion/styled";

// 실제 컴포넌트 import
import Header from "../components/Header";
import Button from "../components/button.jsx";
import ItemCard from "../components/ItemCard";
import Mock from "../assets/Mock.png";
import storeImg from "../assets/store.svg";
import xImg from "../assets/Frame.svg";
import axios from "axios";



// --- 스타일 정의: AdminStore 기본 스타일 ---
const Body = styled.div`
    width: 1339px;
    height: 575px;
    margin: 0px auto 95px auto;
    padding: 0px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
`;

const Menu = styled.div`
    display: flex;
    width: 1320px;
    height: 181px;
    align-items: flex-start;
    gap: 840px;
    position: relative;
`;

const LeftMenu = styled.div`
    display: flex;
    width: 265px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    flex-shrink: 0;
    margin: 0px 0px 0px 0px;
    position: absolute;
    left: 0;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    align-self: stretch;
    width:500px;
    height: 79px;
    margin: 0px 0px 0px 0px;
`;

const Title = styled.p`
    color: #1D1D1D;
    font-family: Pretendard, sans-serif;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
    margin: 0px 0px 0px 0px;
`;

const Description = styled.p`
    color: #B2B2B2;
    font-family: Pretendard, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    margin: 0px 0px 0px 0px;
`;

const Filtering = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const RightMenu = styled.div`
    position:absolute;
    right:0px;
    display: flex;
    width: 136px;
    height:24px;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid #B2B2B2;
    background-color: white;
    cursor:pointer;
    outline: none;

    &:hover {
        background-color: #FFF2E4;
        border: none;
        p {
            color: #F07F23;
        }
    }
`;

const Cost = styled.p`
    color: #646464;
    text-align: center;
    font-family: Pretendard, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
`;

const Items = styled.div`
    width: 1339px;
    margin-top: 190px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    gap: 0px;
`;

// --- 커스텀 모달 스타일 (AddItemComponent용) ---
const CustomModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const CustomModalContent = styled.div`
    background: white;
    border-radius: 24px;
    /* 상품 추가 완료 모달 크기에 맞춤 */
    width: 648px;
    height: 445px;
    max-height: 90vh;
    overflow-y: auto;

    /* 내부 컨텐츠를 중앙 정렬하기 위해 추가 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// 닫기 버튼 스타일 정의
const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 30px;
    color: #8B8B8B;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    margin-right: 4px;
    outline: none; /* 추가: 파란색 포커스 테두리 제거 */
    &:focus {
        outline: none;
    }
`;


// --- AddItem 컴포넌트 스타일 ---
const ContentWrapper = styled.div`
    /* ContentWrapper는 CustomModalContent의 전체 크기를 차지하도록 조정 */
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    /* padding-bottom: 15px; 제거: ContentWrapper에 높이 100%를 주면서 내부 정렬이 필요함 */
`;

const ContentContainer = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    align-items: stretch;
    padding-bottom: 20px;
    /* 모달의 남은 공간을 차지하도록 flex-grow 추가 */
    flex-grow: 1;
`;

const ImageContainer = styled.div`
    width: 240px;
    background-color: #f4f4f4;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const FormDiv = styled.div`
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

const QuantityControlGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    outline: none;
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
    outline: none;

    &:focus {
        border-color: #F07F23;
    }
`;

const QuantityBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    outline: none;
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
    outline: none; /* 추가: 파란색 포커스 테두리 제거 */

    &:hover {
        border: none;
        background: #FFF2E4;
        p {
            color: #F07F23;
        }
        outline: none;
    }
    &:focus {
        outline: none;
    }
`;

const Quantity = styled.p`
    color: #1D1D1D;
    text-align: center;
    font-family: Pretendard, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;
    margin: 0;
`;

const GrayText = styled.p`
    color: #B2B2B2;
    text-align: center;
    font-family: Pretendard, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;
    margin: 0;
`;

const CustomButton = styled.button`
    width: 100%;
    padding: 16px 0;
    background-color: ${props => props.disabled ? '#ffffff' : '#FFF2E4'};
    color: ${props => props.disabled ? '#E0E0E0' : '#F07F23'};
    border: ${props => props.disabled ? '1px solid #E0E0E0' : 'none'};
    border-radius: 12px;
    font-size: 20px;
    font-weight: 500;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    margin-top: 70px;
    outline: none; /* 추가: 파란색 포커스 테두리 제거 */

    &:hover {
        background-color: ${props => props.disabled ? '#ffffff' : '#FFE8C7'};
    }
    &:focus {
        outline: none;
    }
`;

// --- AdminStore 자체 Success Modal 스타일 ---
const SuccessModalContainer = styled(CustomModalOverlay)`
    /* CustomModalOverlay 스타일 상속 */
`;

const SuccessModalContent = styled.div`
    position: relative;
    width: 648px;
    height: 445px;
    top: 0;
    left: 0;
    border-radius: 24px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
`;

const ModalXButton = styled.img`
    position: absolute;
    top: 30px;
    right: 30px;
    width: 35px;
    height: 35px;
    cursor: pointer;
`;

const SuccessTitle = styled.div`
    color: #1D1D1D;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    margin-top: 10px;
`;

const SuccessImg = styled.img`
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
`;


// AddItem 컴포넌트 (인라인으로 유지)
const AddItemComponent = ({ onAddItem, onClose }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(10);

    const increase = () => setQuantity(prev => prev + 1);
    const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

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
            <ModalHeader>
                <CloseButton onClick={onClose}>&times;</CloseButton>
            </ModalHeader>
            <ContentContainer>
                <ImageContainer>
                    <img src={storeImg} alt="사진 첨부" style={{width: '40px', height: '40px'}} />
                </ImageContainer>
                <FormDiv>
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

                    <QuantityControlGroup>
                        <Label>수량</Label>
                        <QuantityBox>
                            <QuantityBtn onClick={decrease}>
                                <GrayText>-</GrayText>
                            </QuantityBtn>
                            <Quantity>{quantity}</Quantity>
                            <QuantityBtn onClick={increase}>
                                <GrayText>+</GrayText>
                            </QuantityBtn>
                        </QuantityBox>
                    </QuantityControlGroup>

                    <CustomButton onClick={handleSubmit} disabled={!isFormValid}>
                        상품 추가하기
                    </CustomButton>
                </FormDiv>
            </ContentContainer>
        </ContentWrapper>
    );
};


// --- AdminStore Component ---
export default function AdminStore() {
    // Mock Data (생략)
    const mockData = [
        { id: 1, name: "첫 번째", price: 5000, img: Mock, type: 1, stock: 10 },
        { id: 2, name: "두 번째", price: 7000, img: Mock, type: 1, stock: 5 },
        { id: 3, name: "세 번째", price: 9000, img: Mock, type: 1, stock: 0 },
        { id: 4, name: "네 번째", price: 6000, img: Mock, type: 1, stock: 12 },
        { id: 5, name: "다섯 번째", price: 4500, img: Mock, type: 1, stock: 3 },
        { id: 6, name: "여섯 번째", price: 8000, img: Mock, type: 1, stock: 7 },
        { id: 7, name: "일곱 번째", price: 1000, img: Mock, type: 1, stock: 9 },
    ];

    const mockData2 = [
        { id: 8, name: "전체 팀에게 공지 날리기", price: 5000, img: Mock, type: 2, stock: 100 },
        { id: 9, name: "점심 함께 먹기", price: 7000, img: Mock, type: 2, stock: 50 },
        { id: 10, name: "커피 심부름 쿠폰", price: 9000, img: Mock, type: 2, stock: 20 },
    ];

    const [checkedCards, setCheckedCards] = useState({});
    const [filter, setFilter] = useState(true);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleCheck = (id, value) => {
        setCheckedCards(prev => ({ ...prev, [id]: value }));
    };

    const anyChecked = Object.values(checkedCards).some(Boolean);

    const handleCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
        setSuccessMessage("");
    };

    const handleAddItem = async (newItem) => {
        try {

            const token = localStorage.getItem("auth_token"); // ⭐ 추가된 부분

            if (!token) {
                alert("토큰이 없습니다. 다시 로그인 해주세요.");
                return;
            }

            const body = {
                itemName: newItem.name,
                description: newItem.description || "설명 없음",
                image: newItem.image || "https://",
                price: newItem.price,
                quantity: newItem.stock,
                type: 1
            };

            const response = await axios.post(
                "/tch/store",
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("상품이 추가되었습니다!");

            setItems((prev) => [
                ...prev,
                {
                    id: response.data.itemId,
                    name: newItem.name,
                    price: newItem.price,
                    stock: newItem.stock
                }
            ]);

            setIsFormModalOpen(false);

        } catch (error) {
            console.error("물품 추가 실패:", error);
            alert("물품 추가 실패: " + error.message);
        }
    };
    const handleDeleteItems = () => {
        if (!anyChecked) return;
        setCheckedCards({});
        setSuccessMessage("상품 삭제 완료!");
        setIsSuccessModalOpen(true);
    }

    const handleRightMenuClick = () => {
        if (anyChecked) {
            handleDeleteItems();
        } else {
            setIsFormModalOpen(true);
        }
    }

    return (
        <>
            <Header teamName="최병준 선생님" />
            <Body>
                <Menu>
                    <LeftMenu>
                        <TextBox>
                            <Title>상점 관리</Title>
                            <Description>체크 박스를 누르면 상품 삭제하기 버튼이 나타나요!</Description>
                        </TextBox>
                        <Filtering>
                            <Button
                                text="간식"
                                active={filter === true}
                                path={() => setFilter(true)}
                            />
                            <Button
                                text="쿠폰"
                                active={filter === false}
                                path={() => setFilter(false)}
                            />
                        </Filtering>
                    </LeftMenu>

                    <RightMenu onClick={handleRightMenuClick}>
                        <Cost>{anyChecked ? "상품 삭제하기" : "상품 추가하기"}</Cost>
                    </RightMenu>

                    {/* 1. 상품 추가 폼 모달 (Custom Modal) */}
                    {isFormModalOpen && (
                        <CustomModalOverlay onClick={() => setIsFormModalOpen(false)}>
                            <CustomModalContent onClick={(e) => e.stopPropagation()}>
                                <AddItemComponent
                                    onAddItem={handleAddItem}
                                    onClose={() => setIsFormModalOpen(false)}
                                />
                            </CustomModalContent>
                        </CustomModalOverlay>
                    )}

                    {/* 2. 성공 메시지 모달 (AdminStore 자체 구현) */}
                    {isSuccessModalOpen && (
                        <SuccessModalContainer>
                            <SuccessModalContent onClick={(e) => e.stopPropagation()}>
                                <ModalXButton src={xImg} onClick={handleCloseSuccessModal} />
                                <SuccessImg src={storeImg} alt="Success Icon" />
                                <SuccessTitle>{successMessage}</SuccessTitle>
                            </SuccessModalContent>
                        </SuccessModalContainer>
                    )}
                </Menu>

                {filter ? (
                    <Items>
                        {mockData.map(item =>
                            <ItemCard
                                key={item.id}
                                title={item.name}
                                price={item.price}
                                img={item.img}
                                isAdmin={true}
                                stock={item.stock}
                                checked={!!checkedCards[item.id]}
                                onChange={(e) => handleCheck(item.id, e.target.checked)}
                            />
                        )}
                    </Items>
                ) : (
                    <Items>
                        {mockData2.map(item =>
                            <ItemCard
                                isCoupon="true"
                                key={item.id}
                                title={item.name}
                                price={item.price}
                                img={item.img}
                                isAdmin={true}
                                stock={item.stock}
                                checked={!!checkedCards[item.id]}
                                onChange={(e) => handleCheck(item.id, e.target.checked)}
                            />
                        )}
                    </Items>
                )}
            </Body>
        </>
    )
}