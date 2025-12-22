import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CreditContext = createContext();

export const useCredit = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error("useCredit must be used within a CreditProvider");
  }
  return context;
};

export const CreditProvider = ({ children }) => {
  const [credit, setCredit] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 크레딧 조회 함수
  const fetchCredit = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}std/account`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // 응답 데이터: { teamId: 1, teamName: "하람", credit: 10000 }
      setCredit(response.data.credit);
      setTeamName(response.data.teamName);
      setTeamId(response.data.teamId);

      // teamId를 localStorage에 저장하여 axios interceptor에서 사용
      if (response.data.teamId) {
        localStorage.setItem('team_id', response.data.teamId.toString());
      }

    } catch (error) {
      console.error("크레딧 조회 실패:", error);
      // 에러 시 기본값 유지
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드 시 크레딧 조회
  useEffect(() => {
    fetchCredit();
  }, []);

  // 크레딧 새로고침 함수 (게임, 구매 후 호출)
  const refreshCredit = async () => {
    await fetchCredit();
  };

  const value = {
    credit,
    teamName,
    teamId,
    loading,
    refreshCredit
  };

  return (
    <CreditContext.Provider value={value}>
      {children}
    </CreditContext.Provider>
  );
};