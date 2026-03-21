# CourseMapper

> Plataforma de planejamento acadêmico inteligente — visualize disciplinas, entenda pré-requisitos e acompanhe seu progresso até a formatura.

![CourseMapper](https://img.shields.io/badge/DACathon-2026-6366f1?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=flat-square&logo=nestjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql)

---

## Apresentação

[Ver slides da apresentação →](https://www.figma.com/deck/Bc0XVaFFovyvlWoVCvEsvI)

---

## Sobre o projeto

O CourseMapper resolve um problema que todo estudante de computação já enfrentou: entender o que pode cursar no próximo semestre sem montar um mapa à mão. A plataforma transforma o currículo acadêmico em um mapa visual interativo, calcula automaticamente quais disciplinas estão disponíveis com base nas já cursadas, destaca o caminho crítico até a formatura e estima quantos semestres restam.

### Funcionalidades principais

- Mapa de disciplinas organizado por semestre e trilha (Desenvolvedor, Cientista, Analista, Gestor)
- 4 estados visuais: concluída, disponível, caminho crítico e bloqueada
- Modal com pré-requisitos, correquisitos e disciplinas que são desbloqueadas
- Marcar disciplinas como cursadas com atualização reativa do mapa
- Dashboard com progresso geral, semestres restantes e breakdown por trilha
- Suporte a múltiplos currículos (Ciência da Computação e Sistemas de Informação)
- Persistência do progresso via localStorage

---

## Stack

### Frontend

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Interface |
| TypeScript | 5 | Tipagem |
| Vite | 5 | Build tool |
| Tailwind CSS | 4 | Estilos |
| Zustand | 5 | Gerenciamento de estado |
| React Router | 6 | Roteamento |
| Axios | 1 | Requisições HTTP |
| clsx | 2 | Utilitário de classnames |

### Backend

| Tecnologia | Versão | Uso |
|---|---|---|
| NestJS | 11 | Framework principal |
| TypeScript | 5 | Tipagem |
| PostgreSQL | 16 | Banco de dados |
| TypeORM | 0.3 | ORM |
| JWT + Passport | — | Autenticação |
| bcrypt | — | Hash de senhas |
| Docker Compose | — | Containerização |

---

## Arquitetura

### Frontend — Feature-Sliced Design (FSD)

O frontend adota a arquitetura Feature-Sliced Design com 5 camadas. A regra principal é que camadas superiores podem importar das inferiores, mas features nunca importam de outras features.

```
src/
├── app/                    # Configuração global (Router, providers, estilos)
├── pages/                  # Orquestração de telas (sem lógica própria)
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   └── curriculum-map/
├── features/               # Lógica de negócio isolada por domínio
│   ├── auth/
│   │   ├── api/            # authService
│   │   ├── model/          # authStore, useAuth
│   │   └── ui/             # LoginForm, RegisterForm
│   ├── curriculum-map/
│   │   ├── api/            # curriculumService
│   │   ├── lib/            # criticalPath.ts, availabilityCalc.ts
│   │   ├── model/          # curriculumStore, progressStore, useCurriculumMap
│   │   └── ui/             # CourseMap, SubjectCard, SubjectModal, MapToolbar
│   └── progress/
│       ├── model/          # useDashboard
│       └── ui/             # MetricCard, TrailProgressBar, CriticalPathSummary
├── entities/               # Modelos de domínio
│   ├── subject/            # Type Subject, transformer fromRaw
│   ├── curriculum/         # Type Curriculum, Course
│   └── user/               # Type User, useUserStore
└── shared/                 # Sem lógica de negócio
    ├── api/                # httpClient (axios com interceptors)
    ├── data/               # JSONs dos currículos (mock)
    ├── lib/                # cn (classnames helper)
    └── ui/                 # Button, Modal, Badge, Spinner, ProtectedRoute
```

### Backend — Arquitetura Modular NestJS

```
src/
├── Modules/
│   ├── App/                # Módulo raiz
│   ├── Auth/               # Autenticação JWT
│   ├── User/               # Gestão de usuários
│   ├── discipline/         # Disciplinas e currículo
│   └── Guards/             # Estratégias de proteção
├── config/                 # Configuração TypeORM
├── data/                   # Dados estáticos e seeding
└── scripts/                # Scripts utilitários
```

### Algoritmo — Grafo de Pré-requisitos (DAG)

O currículo é modelado como um DAG (grafo direcionado acíclico). Cada disciplina é um nó e cada pré-requisito é uma aresta.

**`criticalPath.ts`** — calcula a cadeia mais longa de pré-requisitos via ordenação topológica com memoização. Complexidade O(n).

**`availabilityCalc.ts`** — percorre os pré-requisitos de cada disciplina e atribui um dos 4 status: `blocked`, `available`, `critical` ou `completed`.

---

## Como rodar

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose (para o banco)
- npm ou yarn

### Backend

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/dacathon-feevale.git
cd dacathon-feevale/backend

# Subir o banco de dados
docker-compose up -d

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as credenciais do banco

# Popular dados iniciais
npm run seed:courses

# Rodar em desenvolvimento
npm run start:dev
```

O servidor sobe em `http://localhost:3000`.

### Frontend

```bash
cd ../frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# VITE_API_URL=http://localhost:3000

# Rodar em desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`.

---

## Variáveis de ambiente

### Backend — `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=dacathon
JWT_SECRET=seu_secret_aqui
```

### Frontend — `.env`

```env
VITE_API_URL=http://localhost:3000
```

---

## Fluxo de autenticação

```
Cadastro/Login → bcrypt valida senha → JWT gerado pelo backend
→ Frontend armazena token → Axios injeta Bearer token em toda requisição
→ Interceptor de 401 faz logout automático
```

Rotas `/dashboard` e `/mapa-disciplinas` são protegidas por `ProtectedRoute` — redireciona para `/` se não autenticado.

---

## Persistência de progresso

O progresso do usuário (disciplinas cursadas) funciona em duas camadas:

**Camada local** — Zustand `persist` middleware serializa `completedIds` no `localStorage` automaticamente. Sobrevive ao reload da página.

**Camada servidor** — `progressService` com `getProgress`, `markCompleted` e `unmarkCompleted` prontos para consumir a API. A integração usa **optimistic update**: a UI atualiza imediatamente e a chamada ao backend acontece em paralelo.

---

## Requisitos implementados

| Requisito | Descrição | Status |
|---|---|---|
| RF01 | Login com matrícula e senha | ✅ |
| RF02 | Cadastro com nome, matrícula, e-mail e curso | ✅ |
| RF03 | Alternar entre currículos disponíveis | ✅ |
| RF04 | Curso do usuário como visualização padrão | ✅ |
| RF05 | Visualização por trilhas | ✅ |
| RF06 | Indicação visual de pré-requisitos e correquisitos | ✅ |
| RF07 | Organização por semestre e trilha | ✅ |
| RF08 | Destaque do caminho crítico | ✅ |
| RF09 | Marcar disciplinas como cursadas com persistência | ✅ |
| RF10 | Cálculo automático de disciplinas disponíveis | ✅ |
| RF11 | Percentual de conclusão do curso | ✅ |
| RF12 | Estimativa de semestres para conclusão | ✅ |
| RNF01 | Proteção contra acesso não autorizado | ✅ |
| RNF02 | Criptografia de credenciais (bcrypt + JWT) | ✅ |
| RNF03 | Tempo de resposta adequado | ✅ |
| RNF04 | Código modular e bem documentado | ✅ |
| RNF05 | Tratamento de erros | ✅ |
| RNF06 | Interface intuitiva com feedback visual | ✅ |

---

## Time

Desenvolvido para o **DACathon 2026 — Feevale**

---

*Feito com React, NestJS e TypeScript.*
