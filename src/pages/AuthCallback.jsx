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
        const response = await AxiosInstnce.get("haram/auth", {
          params: { code },
        });

        if (response.data && response.data.token) {
          tokenUtils.setToken(response.data.token);

          // 토큰 저장 후 프로필 요청으로 역할 확인
          try {
            const profileRes = await AxiosInstnce.get("haram/auth/profile");
            const role = profileRes.data?.data?.user?.role;

            if (role === "teacher") {
              navigate("/tch", { replace: true });
              redirected = true;
              return;
            } else if (role === "student") {
              navigate("/std", { replace: true });
              redirected = true;
              return;
            }
          } catch (profileErr) {
            console.error("프로필 조회 실패:", profileErr);
          }
        }
      } catch (error) {
        console.error("OAuth 콜백 처리 실패:", error);
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
