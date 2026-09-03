// ============================================================
// UserService — CORRIGIDO (SRP + DIP)
// ------------------------------------------------------------
// >>> aqui identifiquei o problema por conta própria <<<
// (o problema do método "send" estar faltando/misturado com o
// envio direto de email). A solução foi:
//
// 1) SRP (Responsabilidade Única): antes, UserService validava o email E também decidia/enviava a notificação (fazia duas coisas). 
//    Agora ele SÓ valida e cria o usuário. Quem manda
//    a notificação é outra classe (injetada via construtor).
//
// 2) DIP (Inversão de Dependência): UserService não importa mais
//    "EmailNotification" diretamente. Ele recebe QUALQUER objeto
//    que tenha um método send() (Notifier) no construtor. Isso
//    quer dizer que ele depende de uma ABSTRAÇÃO, não de uma
//    implementação fixa — dá pra trocar email por SMS sem mudar
//    uma linha aqui dentro.
// ============================================================

class UserService {
  // "notifier" é injetado de fora — pode ser EmailNotification,
  // SMSNotification, ou qualquer outra classe que siga o contrato
  constructor(notifier) {
    this.notifier = notifier;
  }

  createUser(email) {
    if (!email.includes("@")) throw new Error("Email inválido");

    const user = { id: 1, email };

    // UserService não sabe como a notificação é enviada, só que
    // precisa chamar .send() — desacoplamento pedido
    this.notifier.send(email, "Bem-vindo!");

    return user;
  }
}

module.exports = UserService;
