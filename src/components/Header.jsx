import HaramLogo from "../assets/Logo.svg";
import styled from "@emotion/styled";
import Logo from "../assets/HaramLogo.svg";
import { AxiosInstnce as customaxios, tokenUtils } from "../lib/customAxios";
import { useEffect, useState } from "react";
import { useCredit } from "../context/CreditContext";

import { useNavigate } from "react-router-dom";


const Headerbox = styled.div`
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
    cursor: pointer;
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
    margin-right: 1rem;
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

const LogoutBtn = styled.button`
    display: flex;
    padding: 12px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background:  #FFF2E4;
    &:hover {
        outline: none;
        border: none;
    }
    &:focus {
        outline: none;
    }
`;

const LogoutText = styled.p`
    color: #F07F23;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
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

const TeamBtn = styled.button`
    display: flex;
    height: 44px;
    padding: 13px 19px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: white;
    border: 1px solid var(--Primary-150, #FDB882);
    &:hover{
      border: 1px solid var(--Primary-150, #FDB882);
      background: #FFF2E4;
    }
    &:focus {
      outline: none;
    }
  `;

const TeamText = styled.span`
    color: var(--Primary-200, #F07F23);
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;

const Img = styled.img`
      width: 40px;
      height: 40px;
  `;




export default function Header({ teamName: propTeamName, isTeacher = false, isTeamName = false, isLogin = false, isLogout = false, isCredit = false, isMyTeam = false, Credit: propCredit }) {

  const nav = useNavigate();

  // Context에서 크레딧 정보 가져오기
  const { credit, teamName: contextTeamName, teamId } = useCredit();
  const [userProfile, setUserProfile] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const response = await customaxios.get('haram/auth/login');
      window.location.href = response.data.authURL;
    } catch (error) {
      console.error('로그인 요청 실패:', error);
    }
  };

  const GetProfile = async () => {
    try {
      const response = await customaxios.get('haram/auth/profile');
      return response.data;
    } catch (error) {
      console.error('프로필 조회 실패:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = tokenUtils.getToken();
      if (token) {
        const profile = await GetProfile();
        if (profile?.data?.user) {
          setUserProfile(profile.data.user);
          // localStorage에 프로필 정보 저장 (Timer 컴포넌트에서 재사용)
          localStorage.setItem('userProfile', JSON.stringify(profile.data.user));
        }
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await customaxios.get('haram/auth/logout');
      tokenUtils.removeToken();
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
      tokenUtils.removeToken();
      window.location.href = '/';
    }
  };

  // 크레딧 표시 (Context 값 우선, props로 전달된 값은 fallback)
  const displayCredit = credit > 0 ? credit.toLocaleString() : (propCredit || '0');

  // 팀 이름 표시 (teamId 우선, Context teamName, props 순서)
  const displayTeamName = teamId || contextTeamName || propTeamName || '팀';

  // 사용자 이름 표시 (API에서 받아온 값 우선, props는 fallback)
  const displayUserName = userProfile?.name || propTeamName;

  return (
    <>
      <Headerbox>
        <LogoImg src={HaramLogo} onClick={() => {nav("/")}}></LogoImg>
        <FunctionBox>
          {isTeamName && <AmountText>TEAM {displayTeamName}</AmountText>}
          {isTeacher && <><Img src={Logo} /> <AmountText> {displayUserName} 선생님</AmountText></>}

          {isMyTeam && <TeamBtn onClick={() => nav('/std/team')}><TeamText>내팀 보기</TeamText></TeamBtn>}
          {isLogin && <LoginBtn type="google" onClick={handleGoogleLogin}>로그인</LoginBtn>}

          {isCredit && <CreditBtn><CreditColor>{displayCredit}</CreditColor><Gray>크레딧</Gray></CreditBtn>}
          {!isLogin && <LogoutBtn onClick={handleLogout}><LogoutText>로그아웃</LogoutText></LogoutBtn>}
        </FunctionBox>
      </Headerbox>
    </>

  )
}
