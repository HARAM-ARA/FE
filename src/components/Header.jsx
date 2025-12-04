import HaramLogo from "../assets/Logo.svg";
import styled from "@emotion/styled";

const Headerbox = styled.div`
    width: 1340px;
    height: 90px;
    margin:26px 50px 0px 50px;
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




export default function Header({teamName, isTeamName = false, isLogin = false, isCredit = false, Credit}) {

  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  
  
    const scope = encodeURIComponent(
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
    );
  
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=${scope}`;
    
    window.location.href = url;
  };

  return (
    <>
      <Headerbox>
        <LogoImg src={HaramLogo}></LogoImg>
        <FunctionBox>
            {isTeamName && <AmountText>{teamName}</AmountText>}
         
            {isLogin && <LoginBtn type="google" onClick={handleGoogleLogin}>로그인</LoginBtn>}
            {isCredit && <CreditBtn><CreditColor>{Credit}</CreditColor><Gray>크레딧</Gray></CreditBtn>}
        </FunctionBox>
      </Headerbox>
    </>

  )
}