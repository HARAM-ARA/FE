import HaramLogo from "../assets/Logo.svg";
import styled from "@emotion/styled";
import Logo from "../assets/HaramLogo.svg";
import { AxiosInstnce, tokenUtils } from "../lib/customAxios";
import { useEffect } from "react";
import { useCredit } from "../context/CreditContext";

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




export default function Header({ teamName, isTeacher = false, isTeamName = false, isLogin = false, isLogout = false, isCredit = false, Credit }) {

  // Context에서 크레딧 정보 가져오기
  const { credit, teamName: contextTeamName } = useCredit();

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
      console.error('로그인 요청 실패:', error);
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await GetProfile();
      console.log(profile);
    };
    fetchProfile();
  }, []);
  const handleLogout = async () => {
    try {
      await AxiosInstnce.post('haram/auth/logout');
      tokenUtils.removeToken();
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
      tokenUtils.removeToken();
      window.location.href = '/';
    }
  };

  // 크레딧 표시 (Context 값 우선, props로 전달된 값은 fallback)
  const displayCredit = credit > 0 ? credit.toLocaleString() : Credit;
  const displayTeamName = contextTeamName || teamName;

  return (
    <>
      <Headerbox>
        <LogoImg src={HaramLogo}></LogoImg>
        <FunctionBox>
          {isTeamName && <AmountText>TEAM {displayTeamName}</AmountText>}
          {isTeacher && <><Img src={Logo} /> <AmountText> {teamName} 선생님</AmountText></>}


          {isLogin && <LoginBtn type="google" onClick={handleGoogleLogin}>로그인</LoginBtn>}
          {isLogout && <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>}
          {isCredit && <CreditBtn><CreditColor>{displayCredit}</CreditColor><Gray>크레딧</Gray></CreditBtn>}
        </FunctionBox>
      </Headerbox>
    </>

  )
}
