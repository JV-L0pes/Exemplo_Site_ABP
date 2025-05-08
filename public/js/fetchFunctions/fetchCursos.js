import { getToken, getUserData } from './fetchAuth.js';

const API_URL = 'https://errorsquad-server.onrender.com';

function getAdminId() {
    return getUserData().id;
}

export async function getCursos() {
  try {
    const response = await fetch(`${API_URL}/admin/${getAdminId()}/cursos`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
          },
      });

      let result = await response.json();
      let data = result.data;

      if (result === 'Token inválido.'){
          return null; // Retorna os dados processados
       }
       else{
          return data
       }
  } catch (error) {
      console.error('Erro:', error);
      return null; // Retorna null em caso de erro
  }
}

export async function CreateCurso(curso) {
    try {
      const response = await fetch(`${API_URL}/admin/${getAdminId()}/cursos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: {
                nome:curso.nome,
                coordenador:curso.coordenador,
                sigla:curso.sigla,
                inicio:curso.inicio,
                fim:curso.fim
            }
        });
  
        let result = await response.json();
        let data = result.data;
  
        if (result === 'Token inválido.'){
            return null; // Retorna os dados processados
         }
         else{
            return data
         }
    } catch (error) {
        console.error('Erro:', error);
        return null; // Retorna null em caso de erro
    }
  }

export async function updateDocente(docente) {
    try {
        const response = await fetch(`${API_URL}/admin/${getAdminId()}/docente`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                id: docente.id,
                nome: docente.nome,
                cor: docente.cor
            })
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

export async function deleteDocente(id) {
    try {
        const response = await fetch(`${API_URL}/admin/${getAdminId()}/docente`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ id })
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
} 
