import type { User } from '@/entities/user'

interface LoginPayload {
  enrollment: string
  password: string
}

interface RegisterPayload {
  name: string
  enrollment: string
  email: string
  password: string
  course: string
}

interface AuthResponse {
  token: string
  user: User
}

// mock local — troca pelo httpClient quando backend estiver pronto
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Lucas Silva',
    enrollment: '123456',
    email: 'lucas@feevale.br',
    course: 'CC',
    password: '123456',
  },
]

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 300))

    const user = MOCK_USERS.find(
      (u) => u.enrollment === payload.enrollment && u.password === payload.password
    )

    if (!user) throw new Error('Matrícula ou senha incorretos')

    const { password: _, ...safeUser } = user
    return { token: `mock-token-${user.id}`, user: safeUser }

    // versão real:
    // const { data } = await httpClient.post<AuthResponse>('/auth/login', payload)
    // return data
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 300))

    const exists = MOCK_USERS.find((u) => u.enrollment === payload.enrollment)
    if (exists) throw new Error('Matrícula já cadastrada')

    const newUser: User = {
      id:         String(MOCK_USERS.length + 1),
      name:       payload.name,
      enrollment: payload.enrollment,
      email:      payload.email,
      course:     payload.course as User['course'],
    }

    MOCK_USERS.push({ ...newUser, password: payload.password })
    return { token: `mock-token-${newUser.id}`, user: newUser }

    // versão real:
    // const { data } = await httpClient.post<AuthResponse>('/auth/register', payload)
    // return data
  },

  logout: () => {
    localStorage.removeItem('token')
    // versão real: await httpClient.post('/auth/logout')
  },
}