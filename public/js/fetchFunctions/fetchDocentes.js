import { getToken, getUserData } from './fetchAuth.js';

function getAdminId() {
    return getUserData().id;
}

export async function getDocentes() {
    try {
        const response = await fetch('https://errorsquad-server.onrender.com/docentes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        const result = await response.json();
        
        if (result === 'Token inválido.'){
            console.error('Token inválido');
            window.location.href = '/public/login.html';
            return;
        }

        return result;
    } catch (error) {
        console.error('Erro ao buscar docentes:', error);
        throw error;
    }
}

export async function createDocente(docente) {
  try {
      let response = await fetch(`https://errorsquad-server.onrender.com/admin/${getAdminId()}/docente`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify(docente)
      });

      let result = await response.json();
      return result;
  } catch (error) {
      console.error('Erro:', error);
      return null;
  }
}

export async function updateDocente(docente) {
  try {
      let response = await fetch(`https://errorsquad-server.onrender.com/admin/${getAdminId()}/docente/${docente.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify(docente)
      });

      let result = await response.json();
      return result;
  } catch (error) {
      console.error('Erro:', error);
      return null;
  }
}

export async function deleteDocente(id) {
  try {
      let response = await fetch(`https://errorsquad-server.onrender.com/admin/${getAdminId()}/docente/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
          }
      });

      let result = await response.json();
      return result;
  } catch (error) {
      console.error('Erro:', error);
      return null;
  }
} 
