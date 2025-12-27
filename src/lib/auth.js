import { AxiosInstnce as customaxios } from "./customAxios.js";

export const getUserProfile = async () => {
  try {
    const response = await customaxios.get('/haram/auth/profile');
    if (response.data?.success && response.data?.data?.user) {
      return response.data.data.user;
    }
    return null;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
};

export const getUserRole = async () => {
  try {
    const user = await getUserProfile();
    return user?.role || null;
  } catch (error) {
    return null;
  }
};

let cachedUserRole = null;
let cacheExpiry = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export const getUserRoleSync = () => {
  return cachedUserRole;
};

export const refreshUserRole = async () => {
  try {
    const role = await getUserRole();
    cachedUserRole = role;
    cacheExpiry = Date.now() + CACHE_DURATION;
    return role;
  } catch (error) {
    console.error('Failed to refresh user role:', error);
    return null;
  }
};

export const getUserRoleCached = async () => {
  if (cachedUserRole && Date.now() < cacheExpiry) {
    return cachedUserRole;
  }
  return await refreshUserRole();
};

export const isStudent = async () => {
  const role = await getUserRole();
  return role === 'student';
};

export const isTeacher = async () => {
  const role = await getUserRole();
  return role === 'teacher';
};

export const isAuthenticated = async () => {
  const role = await getUserRole();
  return role === 'student' || role === 'teacher';
};

export const clearUserCache = () => {
  cachedUserRole = null;
  cacheExpiry = 0;
};