import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HaramLogo from "../assets/Logo.svg";
import styled from "@emotion/styled";
import Logo from "../assets/HaramLogo.svg";
import axios from "axios";

const Headerbox = styled.div`
    width: 1340px;
    height: 90px;
    margin:26px 50px 47px 50px;
    display:flex;
    align-items: center;
    position: relative; 
    justify-content: flex-end;
    flex-wrap: nowrap;
    background: #fff;
    
  `;

const LogoImg = styled.img`
    width:220px;
    height:90px;
    position: absolute;
    left: 0;
  `;

const FunctionBox = styled.div`
    display:flex;
    align-items: center;
    gap: 12px;
    position: absolute;
    right: 0;
  `;


const AmountText = styled.p`
    color: #1D1D1D;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

const LoginBtn = styled.button`
    height:48px;
    padding: 12px 20px;
    border-radius: var(--XS, 8px);
    background: var(--Primary-200, #F07F23);
    color: var(--white, #FFF);
    text-align: center;
    font-size: 20px;
    font-family: 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 500;
    color: var(--white, #FFF);
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &:focus {
      outline: none;
    }
    border:none;
  `;

  const CreditBtn = styled.button`
    display: flex;
    height: 44px;
    padding: 13px 19px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background:white;
    border: 1px solid var(--Primary-150, #FDB882);
    &:hover{
      border:1px solid var(--Primary-150, #FDB882);
    }
    &:focus {
      outline: none;
    }
  `;

  const CreditColor = styled.span`
    color: var(--Primary-200, #F07F23);
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;

  const Gray = styled.span`
    color: #B2B2B2;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;

  const Img = styled.img`
      width: 40px;
      height: 40px;
  `;




export default function Header({teamName, isTeacher=false, isTeamName = false, isLogin = false, isCredit = false, Credit}) {

    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
            const res = await axios.get(`http://blleaf.kro.kr:8031/haram/auth/login`);
            const data = await res.json();
            window.location.href = data.authURL; // 이동만
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}haram/auth/profile`, { credentials: "include" });

                const data = await res.json();
                if (data.role === 'teacher') navigate('/tch');
                else if (data.role === 'student') navigate('/std');
            } catch (err) {
                console.warn("프로필 조회 실패", err);
            }
        };

        fetchProfile();
    }, [navigate]);

  return (
    <>
      <Headerbox>
        <LogoImg src={HaramLogo}></LogoImg>
        <FunctionBox>
            {isTeamName && <AmountText>TEAM {teamName}</AmountText>}
            {isTeacher && <><Img src={Logo}/> <AmountText> {teamName} 선생님</AmountText></>}

         
            {isLogin && <LoginBtn type="google" onClick={handleGoogleLogin}>로그인</LoginBtn>}
            {isCredit && <CreditBtn><CreditColor>{Credit}</CreditColor><Gray>크레딧</Gray></CreditBtn>}
        </FunctionBox>
      </Headerbox>
    </>

  )
}
