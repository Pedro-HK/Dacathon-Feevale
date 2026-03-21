import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/model/useAuth'
import { LoginForm } from '@/features/auth/ui/LoginForm'

export function LoginPage() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (enrollment: string, password: string) => {
    await login(enrollment, password)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900">
            Course<span className="text-indigo-600">Mapper</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Planejamento acadêmico inteligente</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-medium text-gray-900 mb-5">Entrar</h2>
          <LoginForm onSubmit={handleLogin} onGoToRegister={() => navigate('/register')} />
        </div>
      </div>
    </div>
  )
}