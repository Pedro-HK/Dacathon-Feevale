import { useState } from 'react'
import { cn } from '@/shared/lib/cn'

interface RegisterFormProps {
  onSubmit: (
    name: string,
    enrollment: string,
    email: string,
    password: string,
    course: string
  ) => Promise<void>
  onGoToLogin: () => void
}

export function RegisterForm({ onSubmit, onGoToLogin }: RegisterFormProps) {
  const [form, setForm] = useState({
    name: '', enrollment: '', email: '', password: '', course: 'CC',
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onSubmit(form.name, form.enrollment, form.email, form.password, form.course)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-600">Nome completo</label>
        <input type="text" value={form.name} onChange={set('name')}
          placeholder="Lucas Silva" className={inputClass} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-600">Matrícula</label>
        <input type="text" value={form.enrollment} onChange={set('enrollment')}
          placeholder="Ex: 123456" className={inputClass} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-600">E-mail</label>
        <input type="email" value={form.email} onChange={set('email')}
          placeholder="lucas@feevale.br" className={inputClass} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-600">Curso</label>
        <select value={form.course} onChange={set('course')}
          className={inputClass}>
          <option value="CC">Ciência da Computação</option>
          <option value="SI">Sistemas de Informação</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-600">Senha</label>
        <input type="password" value={form.password} onChange={set('password')}
          placeholder="••••••••" className={inputClass} required />
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
        {loading ? 'Cadastrando...' : 'Criar conta'}
      </button>

      <p className="text-center text-xs text-gray-500">
        Já tem conta?{' '}
        <button type="button" onClick={onGoToLogin}
          className="text-indigo-600 hover:underline font-medium">
          Entrar
        </button>
      </p>
    </form>
  )
}