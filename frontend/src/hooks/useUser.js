// ============================================================
// useUser.js — CUSTOM HOOK (essa era a parte que faltava)
// ------------------------------------------------------------
// >>> ESSA É A PARTE QUE A VICTÓRIA NÃO SABIA COMO FAZER <<<
//
// O que é um Custom Hook: é só uma função JS normal, que começa
// com "use" por convenção, e que pode usar outros hooks do React
// (useState, useEffect) dentro dela. Ela existe pra você poder
// TIRAR lógica de dentro de um componente e reutilizar em
// qualquer outro lugar.
//
// Antes, a busca de dados (fetch) estava dentro do componente
// UserProfile, misturada com o JSX/HTML. Isso violava o SRP:
// o componente tinha duas responsabilidades (buscar dado E
// desenhar tela).
//
// Aqui, o useUser cuida SÓ de buscar o dado e devolver pronto
// (user, loading) pra quem quiser usar. O componente que usar
// esse hook não precisa saber nada sobre fetch, useEffect, etc.
// ============================================================

import { useState, useEffect } from 'react';

function useUser(userId = 1) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // roda de novo se o userId mudar

  // Retorna um objeto com tudo que o componente precisa saber
  return { user, loading };
}

export default useUser;
