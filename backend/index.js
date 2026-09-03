// ============================================================
// index.js — arquivo pra RODAR e testar o backend
// ------------------------------------------------------------
// Roda com: node index.js  (dentro da pasta backend/)
// Mostra na prática que dá pra trocar o tipo de notificação
// sem mexer em UserService — isso É o DIP funcionando.
// aqui utilizei ajuda da IA
// ============================================================

const UserService = require('./UserService');
const EmailNotification = require('./notifications/EmailNotification');
const SMSNotification = require('./notifications/SMSNotification');

// --- Usando notificação por EMAIL ---
const userServiceEmail = new UserService(new EmailNotification());
userServiceEmail.createUser("teste@email.com");

// --- Usando notificação por SMS (mesma classe UserService, só troca o notifier) ---
const userServiceSMS = new UserService(new SMSNotification());
userServiceSMS.createUser("outro@email.com");

// --- Testando validação de email inválido ---
try {
  userServiceEmail.createUser("email-invalido");
} catch (err) {
  console.log("Erro esperado:", err.message);
}
