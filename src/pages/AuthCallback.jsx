import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosInstnce, tokenUtils } from "../lib/customAxios";

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");

      if (!code) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const response = await AxiosInstnce.get("/haram/auth", {
          params: { code },
        });

        if (response.data && response.data.token) {
          tokenUtils.setToken(response.data.token);
        }
      } catch (error) {
        console.error("OAuth 콜백 처리 실패:", error);
      } finally {
        navigate("/", { replace: true });
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

