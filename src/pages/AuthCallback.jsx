import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosInstnce, tokenUtils } from "../lib/customAxios";

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      let redirected = false;
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");

      if (!code) {
        navigate("/", { replace: true });
        return;
      }

      try {
        console.log("인증 코드:", code);

        // POST /haram/auth/login 사용 (백엔드 authController.js의 login 함수)
        const response = await AxiosInstnce.post("haram/auth/login", {
          code: code,
        });

        console.log("로그인 응답:", response.data);

        if (response.data?.data?.token) {
          tokenUtils.setToken(response.data.data.token);

          // 응답에 이미 user 정보가 포함되어 있음
          const role = response.data?.data?.user?.role;
          console.log("사용자 역할:", role);

          if (role === "teacher") {
            navigate("/tch", { replace: true });
            redirected = true;
            return;
          } else if (role === "student") {
            navigate("/std", { replace: true });
            redirected = true;
            return;
          }
        }
      } catch (error) {
        console.error("OAuth 콜백 처리 실패:", error);
        console.error("에러 응답:", error.response?.data);
        console.error("에러 상태:", error.response?.status);
        alert(`로그인에 실패했습니다: ${error.response?.data?.message || error.message}`);
      } finally {
        if (!redirected) {
          navigate("/", { replace: true });
        }
      }
    };

    handleAuth();
  }, [location.search, navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      로그인 처리 중입니다...
    </div>
  );
}
