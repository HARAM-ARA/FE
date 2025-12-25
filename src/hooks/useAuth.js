import useStore from '../store/useStore'

// 사용자 인증 관련 커스텀 훅
export const useAuth = () => {
  const {
    user,
    isLogin,
    login,
    logout,
    updateUser
  } = useStore()

  return {
    user,
    isLogin,
    login,
    logout,
    updateUser,
    // 편의 함수들
    isAuthenticated: isLogin && user !== null,
    userName: user?.name || '',
    userRole: user?.role || 'student'
  }
}

// 팀 정보 관련 커스텀 훅
export const useTeam = () => {
  const {
    teamName,
    teamId,
    credit,
    setTeamInfo,
    updateCredit
  } = useStore()

  return {
    teamName,
    teamId,
    credit,
    setTeamInfo,
    updateCredit,
    // 편의 함수들
    hasTeam: teamName !== '' || teamId !== null,
    formattedCredit: credit.toLocaleString()
  }
}