import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosInstnce as customaxios, tokenUtils } from "../lib/customAxios.js";
import { refreshUserRole } from "../lib/auth.js";

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

        const response = await customaxios.post("haram/auth/login", {
          code: code,
        });

        if (response.data?.data?.token) {
          tokenUtils.setToken(response.data.data.token);

          const role = await refreshUserRole();

          if (role === "teacher") {
            window.location.href = "/tch";
            redirected = true;
            return;
          } else if (role === "student") {
            window.location.href = "/std";
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
