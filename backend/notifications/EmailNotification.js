// ============================================================
// Implementação concreta #1 do contrato Notifier: EMAIL
// ------------------------------------------------------------
// Esse é o código que ANTES estava direto dentro do UserService
// (o console.log de "Enviando E-MAIL..."). Ele só foi movido
// pra cá, isolado, seguindo o contrato da Notifier.
// ============================================================

const Notifier = require('./Notifier');

class EmailNotification extends Notifier {
  send(email, message) {
    console.log(`Enviando E-MAIL para ${email}: ${message}`);
  }
}

module.exports = EmailNotification;
