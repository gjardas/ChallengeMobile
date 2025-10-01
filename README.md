# 🏍️ Mottu - Sistema de Gestão de Motos

Sistema mobile para gerenciamento de motos e vagas de estacionamento desenvolvido para a Mottu, utilizando React Native e Firebase.

## 📱 Funcionalidades Principais

### Autenticação

- Login seguro com e-mail e senha
- Cadastro de novos usuários
- Sistema de logout

### Gestão de Motos

- Cadastro de motos com:
  - Placa (validação de formato Mercosul e antigo)
  - Modelo
  - Ano
  - Status
  - Observações
- Listagem completa de motos cadastradas
- Edição de informações
- Exclusão de registros
- Alocação automática de vagas

### Mapa de Vagas

- Visualização em tempo real do status das vagas
- 20 vagas disponíveis
- Indicadores visuais de ocupação
- Integração com RFID para identificação
- Cores diferentes para vagas livres e ocupadas

## 🚀 Tecnologias Utilizadas

- React Native
- Firebase Authentication
- Firebase Realtime Database
- React Navigation
- React Native Paper
- Expo Vector Icons
- AsyncStorage para persistência local

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js (versão recomendada >= 16)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio ou Xcode para emuladores
- Firebase Project configurado

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/[seu-usuario]/ChallengeMobile.git
```

2. Entre na pasta do projeto:

```bash
cd ChallengeMobile
```

3. Instale as dependências:

```bash
npm install
```

4. Configure as variáveis de ambiente do Firebase:
   - Crie um arquivo `FirebaseConfig.js` na pasta `config`
   - Adicione suas credenciais do Firebase seguindo o modelo:

```javascript
export const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  storageBucket: "seu-storage-bucket",
  messagingSenderId: "seu-messaging-sender-id",
  appId: "seu-app-id",
};
```

5. Inicie o projeto:

```bash
npm start
```

6. Rode o app:
   - Para Android: use `a` no terminal ou abra no Android Studio
   - Para iOS: use `i` no terminal ou abra no Xcode
   - No dispositivo físico: escaneie o QR code com o Expo Go

## 📌 Estrutura do Projeto

```
ChallengeMobile/
├── assets/             # Imagens e recursos
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── components/         # Componentes reutilizáveis
│   ├── HeaderCustom   # Header personalizado
│   └── MotoCard      # Card para exibição de motos
├── config/            # Configurações
│   └── FirebaseConfig # Config do Firebase
├── contexts/          # Contextos React
│   ├── AuthContext   # Contexto de autenticação
│   └── ThemeContext  # Contexto de tema (claro/escuro)
├── routes/            # Configuração de rotas
│   ├── auth.routes   # Rotas de autenticação
│   ├── stack.routes  # Rotas da aplicação
│   └── Routes        # Configuração principal
├── screens/           # Telas do aplicativo
│   ├── LoginScreen
│   ├── CadastroUsuarioScreen
│   ├── HomeScreen
│   ├── CadastroScreen
│   ├── ListaScreen
│   ├── MapaScreen
│   ├── EditarScreen
│   └── SobreScreen
├── services/          # Serviços e APIs
│   ├── ApiService    # Serviços de API
│   ├── AuthServices  # Serviços de autenticação
│   └── VagaService   # Serviços de gestão de vagas
├── themes/           # Configuração de temas
│   └── theme.js     # Definição dos temas claro/escuro
└── utils/           # Utilitários
    └── storage.js   # Funções de armazenamento local
```

## 🎨 Temas

O aplicativo suporta dois temas que podem ser alternados no menu:

### Tema Claro

- Cores suaves e profissionais
- Fundo em tons pastel para conforto visual
- Verde institucional mais suave
- Ideal para uso diurno

### Tema Escuro

- Verde neon característico da Mottu
- Fundo escuro para uso noturno
- Alto contraste para melhor visibilidade
- Reduz fadiga visual em ambientes escuros

## 📱 Telas e Funcionalidades

### Login (`LoginScreen.js`)

- Acesso seguro ao sistema
- Validação de credenciais
- Link para cadastro de novos usuários
- Feedback de erros de autenticação

### Cadastro de Usuário (`CadastroUsuarioScreen.js`)

- Formulário de registro com validações
- Verificação de força da senha
- Confirmação de senha
- Feedback de erros em tempo real

### Home (`HomeScreen.js`)

- Dashboard principal
- Menu de navegação
- Acesso rápido a todas as funcionalidades
- Alternador de tema claro/escuro

### Cadastro de Moto (`CadastroScreen.js`)

- Formulário completo com validações
- Suporte a placas Mercosul e padrão antigo
- Alocação automática de vagas
- Feedback de sucesso/erro

### Lista de Motos (`ListaScreen.js`)

- Visualização de todas as motos cadastradas
- Opções de edição e exclusão
- Filtros e ordenação
- Detalhes completos de cada moto

### Mapa de Vagas (`MapaScreen.js`)

- Visualização em grid do estacionamento
- Atualização em tempo real
- Indicadores de status por cor
- Informações detalhadas por vaga

### Edição (`EditarScreen.js`)

- Formulário pré-preenchido
- Validações de campos
- Atualização em tempo real
- Confirmação de alterações

### Sobre (`SobreScreen.js`)

- Informações do projeto
- Equipe de desenvolvimento
- Versão do aplicativo
- Links úteis

## 🔐 Segurança e Armazenamento

### Firebase Authentication

- Login seguro com email/senha
- Tokens de autenticação
- Recuperação de senha
- Proteção de rotas

### Firebase Realtime Database

- Armazenamento em tempo real
- Sincronização automática
- Backup automático
- Regras de segurança

### AsyncStorage

- Cache local de dados
- Preferências do usuário
- Mapeamento de vagas
- Melhor performance offline

## ✍️ Autores

- Guilherme Jardim (RM556814)
- Fernando (RM555317)

## 📝 Notas de Versão

### Versão 1.0.0

- Sistema completo de autenticação
- CRUD de motos
- Mapa de vagas em tempo real
- Temas claro e escuro
- Integração com Firebase
