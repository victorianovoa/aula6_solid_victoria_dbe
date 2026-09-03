// ============================================================
// UserProfile.js — CORRIGIDO (SRP via Custom Hook)
// ------------------------------------------------------------
// Antes: esse componente fazia o fetch() direto e formatava o
// HTML na mesma função (violação do SRP apontada no PDF).
//
// Depois: toda a lógica de busca foi movida pro hook useUser
// (veja hooks/useUser.js). Esse componente agora só tem UMA
// responsabilidade: decidir O QUE mostrar na tela, sem saber
// de onde os dados vêm nem como foram buscados.
// ============================================================

import useUser from '../hooks/useUser';

function UserProfile() {
  const { user, loading } = useUser();

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile;
