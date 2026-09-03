# Gerenciador de Notificações — SOLID (DIP + SRP)

Exercício de Desenvolvimento Back-End: aplicar **Single Responsibility Principle (SRP)** e **Dependency Inversion Principle (DIP)** num sistema simples de notificação de usuários.

## Estrutura do projeto

```
Gerenciador-Notificacoes/
  backend/
    notifications/
      Notifier.js            → contrato/interface das notificações
      EmailNotification.js   → implementação: envio por email
      SMSNotification.js     → implementação: envio por SMS
    UserService.js           → serviço de usuário (corrigido)
    index.js                 → arquivo para rodar e testar
    package.json
  frontend/                  → projeto React (Create React App)
    src/
      hooks/
        useUser.js           → Custom Hook (busca de dados)
      components/
        UserProfile.js       → componente (só exibição)
      App.js                 → já ajustado para usar UserProfile
```

## O que foi corrigido e por quê

### Parte 1 — Backend (`UserService`)

**Problema original:** a classe `UserService` fazia duas coisas ao mesmo tempo — validava o email **e** decidia como enviar a notificação (com um `console.log` de email fixo, direto no meio do método). Isso violava:
- **SRP**: uma classe deveria ter um único motivo para mudar. Se a lógica de notificação mudasse, você teria que mexer no `UserService` mesmo sem nada relacionado a "usuário" ter mudado.
- **DIP**: `UserService` dependia diretamente de uma implementação fixa (email via console.log), não de uma abstração.

**Correção:** essa foi a parte que a Victória já tinha identificado sozinha — faltava um método `send` isolado das notificações. A solução foi:
1. Criar `Notifier`, um contrato genérico com o método `send(email, message)`.
2. Criar `EmailNotification` e `SMSNotification`, duas implementações desse contrato.
3. Alterar `UserService` para **receber** um notifier pronto no construtor (injeção de dependência), em vez de decidir sozinho. Ele só chama `.send()`, sem saber se é email, SMS ou qualquer outro meio.

Resultado: `UserService` agora só valida e cria o usuário (SRP), e depende apenas da abstração `Notifier` (DIP) — dá pra trocar de email pra SMS, ou adicionar um terceiro tipo de notificação, sem tocar em uma linha do `UserService`.

### Parte 2 — Frontend (`UserProfile` + Custom Hook)

**Problema original:** o componente `UserProfile` fazia o `fetch()` dos dados **e** montava o HTML na mesma função — duas responsabilidades num só lugar (violação do SRP).

**Correção:** essa foi a parte que a Victória não sabia como resolver — a separação usando um **Custom Hook**. Um Custom Hook é só uma função JavaScript comum (por convenção começa com `use`) que pode usar `useState`/`useEffect` por dentro, permitindo tirar lógica de dentro de um componente e reaproveitar em qualquer lugar.

1. Criado `useUser.js`, que cuida *apenas* de buscar os dados da API e devolver `{ user, loading }`.
2. `UserProfile.js` agora só chama `useUser()` e decide o que renderizar — não sabe mais nada sobre fetch, endpoints ou estado de carregamento internamente.

Resultado: busca de dados (lógica) e apresentação (UI) ficaram completamente separadas — se a API mudar, mexe só no hook; se o layout mudar, mexe só no componente.

## Como rodar

### Backend
```
cd backend
node index.js
```
Deve aparecer no terminal:
```
Enviando E-MAIL para teste@email.com: Bem-vindo!
Enviando SMS para outro@email.com: Bem-vindo!
Erro esperado: Email inválido
```

### Frontend
```
cd frontend
npm install
npm start
```
Abre sozinho em `http://localhost:3000`, mostrando o nome e email de um usuário buscado da API pública (jsonplaceholder), vindos através do hook `useUser`.
