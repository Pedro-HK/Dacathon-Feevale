import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/model/useAuth'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'

export function RegisterPage() {
  const navigate     = useNavigate()
  const { register } = useAuth()

  const handleRegister = async (
    name: string, enrollment: string,
    email: string, password: string, course: string
  ) => {
    await register(name, enrollment, email, password, course)
    navigate('/map')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900">
            Course<span className="text-indigo-600">Mapper</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Crie sua conta</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-medium text-gray-900 mb-5">Cadastro</h2>
          <RegisterForm onSubmit={handleRegister} onGoToLogin={() => navigate('/')} />
        </div>
      </div>
    </div>
  )
}