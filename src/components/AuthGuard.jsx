import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

// 로그인이 필요한 페이지를 보호하는 컴포넌트
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  
  return children
}

// 로그인한 사용자는 접근할 수 없는 페이지 (예: 로그인 페이지)
export const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to="/std" replace />
  }
  
  return children
}

// 특정 역할만 접근 가능한 페이지
export const RoleGuard = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/std" replace />
  }
  
  return children
}