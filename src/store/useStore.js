import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      // 사용자 인증 상태
      user: null,
      isLogin: false,
      
      // 팀 정보
      teamName: '',
      teamId: null,
      credit: 0,
      
      // 사용자 인증 액션들
      login: (userData) => set({ 
        user: userData, 
        isLogin: true 
      }),
      logout: () => set({ 
        user: null, 
        isLogin: false,
        teamName: '',
        teamId: null,
        credit: 0
      }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      
      // 팀 정보 액션들
      setTeamInfo: (teamInfo) => set({
        teamName: teamInfo.teamName || '',
        teamId: teamInfo.teamId || null,
        credit: teamInfo.credit || 0
      }),
      updateCredit: (newCredit) => set({ credit: newCredit }),
      
      // 유틸리티 액션들
      reset: () => set({
        user: null,
        isLogin: false,
        teamName: '',
        teamId: null,
        credit: 0
      })
    }),
    {
      name: 'app-storage', // localStorage 키 이름
      partialize: (state) => ({
        user: state.user,
        isLogin: state.isLogin,
        teamName: state.teamName,
        teamId: state.teamId,
        credit: state.credit
      })
    }
  )
)

export default useStore