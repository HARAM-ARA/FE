import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserRoleCached } from "../lib/auth.js";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #F07F23;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

const LoadingText = styled.div`
  color: #666;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
`;

const AuthConfirm = ({ children, requiredRole = null, allowedRoles = [] }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await getUserRoleCached();
        setUserRole(role);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [requiredRole]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>로딩중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthConfirm;