import { useAuthStore } from './authStore'
import { useUserStore } from '@/entities/user'
import { authService } from '../api/authService'

export function useAuth() {
  const { isAuthenticated, setToken, logout: storeLogout } = useAuthStore()
  const { setCurrentUser } = useUserStore()

  const login = async (enrollment: string, password: string) => {
    const { token, user } = await authService.login({ enrollment, password })
    setToken(token)
    setCurrentUser(user)
  }

  const register = async (
    name: string,
    enrollment: string,
    email: string,
    password: string,
    course: string
  ) => {
    const { token, user } = await authService.register({
      name, enrollment, email, password, course,
    })
    setToken(token)
    setCurrentUser(user)
  }

  const logout = () => {
    authService.logout()
    storeLogout()
    setCurrentUser(null)
  }

  return { isAuthenticated, login, register, logout }
}