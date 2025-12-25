import HaramLogo from "../assets/Logo.svg";
import styled from "@emotion/styled";
import Logo from "../assets/HaramLogo.svg";
import { AxiosInstnce, tokenUtils } from "../lib/customAxios";
import { useEffect, useState } from "react";
import { useCredit } from "../context/CreditContext";
import { useNavigate } from "react-router-dom";
import { useAuth, useTeam } from "../hooks/useAuth";

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

const LogoutBtn = styled.button`
    height:48px;
    padding: 12px 20px;
    border-radius: var(--XS, 8px);
    background: #6B7280;
    color: var(--white, #FFF);
    text-align: center;
    font-size: 20px;
    font-family: 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &:focus {
      outline: none;
    }
    &:hover {
      background: #4B5563;
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




export default function Header({ teamName: propTeamName, isTeacher = false, isTeamName = false, isLogout = false, isCredit = false, Credit: propCredit }) {

  // 전역 인증 상태 사용
  const { user, isLogin, login, logout: authLogout } = useAuth();
  // 전역 팀 정보 사용
  const { teamName: globalTeamName, teamId: globalTeamId, credit: globalCredit, setTeamInfo } = useTeam();
  
  // Context에서 크레딧 정보 가져오기 (기존 호환성 유지)
  const { credit, teamName: contextTeamName, teamId } = useCredit();
  const [userProfile, setUserProfile] = useState(null);
  const nav = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const response = await AxiosInstnce.get('haram/auth/login');
      window.location.href = response.data.authURL;
    } catch (error) {
      console.error('로그인 요청 실패:', error);
    }
  };

  const GetProfile = async () => {
    try {
      const response = await AxiosInstnce.get('haram/auth/profile');
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
          // 전역 상태에 사용자 정보 저장
          login(profile.data.user);
          
          // 팀 정보도 함께 저장 (API에서 팀 정보를 받아온다면)
          if (profile.data.team) {
            setTeamInfo({
              teamName: profile.data.team.name,
              teamId: profile.data.team.id,
              credit: profile.data.team.credit
            });
          }
        }
      }
    };
    fetchProfile();
  }, [login, setTeamInfo]);

  const handleLogout = async () => {
    try {
      await AxiosInstnce.get('haram/auth/logout');
      tokenUtils.removeToken();
      // 전역 상태에서 로그아웃
      authLogout();
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
      tokenUtils.removeToken();
      authLogout();
      window.location.href = '/';
    }
  };

  // 크레딧 표시 (전역 상태 우선, Context 값, props 순서)
  const displayCredit = globalCredit > 0 ? globalCredit.toLocaleString() : 
                       (credit > 0 ? credit.toLocaleString() : (propCredit || '0'));

  // 팀 이름 표시 (전역 상태 우선, Context 값, props 순서)
  const displayTeamName = globalTeamId || globalTeamName || teamId || contextTeamName || propTeamName || '팀';

  // 사용자 이름 표시 (전역 상태 우선, API에서 받아온 값, props 순서)
  const displayUserName = user?.name || userProfile?.name || propTeamName;

  return (
    <>
      <Headerbox>
        <LogoImg src={HaramLogo} onClick={() => nav("/std")}/>
        <FunctionBox>
          {isTeamName && <AmountText>TEAM {displayTeamName}</AmountText>}
          {isTeacher && <><Img src={Logo} /> <AmountText> {displayUserName} 선생님</AmountText></>}


          {!isLogin && <LoginBtn type="google" onClick={handleGoogleLogin}>로그인</LoginBtn>}
          {(isLogin || isLogout) && <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>}
          {isCredit && <CreditBtn><CreditColor>{displayCredit}</CreditColor><Gray>크레딧</Gray></CreditBtn>}
        </FunctionBox>
      </Headerbox>
    </>

  )
}
