import { useState } from 'react'
import { cn } from '@/shared/lib/cn'

interface LoginFormProps {
  onSubmit: (enrollment: string, password: string) => Promise<void>
  onGoToRegister: () => void
}

export function LoginForm({ onSubmit, onGoToRegister }: LoginFormProps) {
  const [enrollment, setEnrollment] = useState('')
  const [password, setPassword]     = useState('')
  const [error, setError]           = useState('')
  const [loading, setLoading]       = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onSubmit(enrollment, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-600">Matrícula</label>
        <input
          type="text"
          value={enrollment}
          onChange={(e) => setEnrollment(e.target.value)}
          placeholder="Ex: 123456"
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-600">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full py-2.5 rounded-xl text-sm font-medium transition-colors',
          loading
            ? 'bg-indigo-300 text-white cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        )}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      <p className="text-center text-xs text-gray-500">
        Não tem conta?{' '}
        <button
          type="button"
          onClick={onGoToRegister}
          className="text-indigo-600 hover:underline font-medium"
        >
          Cadastre-se
        </button>
      </p>
    </form>
  )
}