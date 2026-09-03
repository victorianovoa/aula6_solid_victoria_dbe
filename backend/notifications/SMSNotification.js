// ============================================================
// Implementação concreta #2 do contrato Notifier: SMS
// ------------------------------------------------------------
// Essa classe é NOVA — não existia no código original. Ela prova
// que o DIP funcionou: dá pra criar quantas formas de notificar
// quiser (email, sms, push, whatsapp...) sem tocar em UserService.
// ============================================================

const Notifier = require('./Notifier');

class SMSNotification extends Notifier {
  send(email, message) {
    // Em um caso real seria um número de telefone, mas mantendo
    // a mesma assinatura (email, message) pedida no desafio.
    console.log(`Enviando SMS para ${email}: ${message}`);
  }
}

module.exports = SMSNotification;
