// ============================================================
// CONTRATO (interface) de notificação
// ------------------------------------------------------------
// Isso resolve o "DIP" (Dependency Inversion Principle) pedido
// no desafio: em vez do UserService decidir sozinho COMO enviar
// a notificação (email, sms, etc), ele vai depender só desse
// contrato genérico. Qualquer classe que "seguir" esse contrato
// (ter um método send) pode ser usada no lugar de outra, sem
// quebrar nada no UserService.
//
// JS não tem "interface" de verdade como Java/TS, então aqui a
// gente simula: essa classe base define o método send, e quem
// herdar dela é OBRIGADO a sobrescrever (senão cai no throw).
// ============================================================

class Notifier {
  send(email, message) {
    throw new Error("Método 'send' precisa ser implementado pela subclasse");
  }
}

module.exports = Notifier;
