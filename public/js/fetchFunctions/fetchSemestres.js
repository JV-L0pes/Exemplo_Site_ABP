import { getToken, getUserData } from './fetchAuth.js';

const API_URL = 'https://errorsquad-server.onrender.com';

function getAdminId() {
    return getUserData().id;
}

export async function getSemestres() {
    try {
        const response = await fetch(`${API_URL}/admin/${getAdminId()}/semestre`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error('Token inválido');
                window.location.href = '/public/login.html';
                return;
            }
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Erro ao buscar semestres:', error);
        throw error;
    }
}

export async function createSemestre(semestre) {
    try {
        const response = await fetch(`${API_URL}/admin/${getAdminId()}/semestre`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                periodo: semestre.periodo,
                inicio: semestre.inicio,
                fim: semestre.fim,
                status: semestre.status,
                curso: semestre.curso
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

export async function updateSemestre(semestre) {
    try {
        const response = await fetch(`${API_URL}/admin/${getAdminId()}/semestre`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                id: semestre.id,
                periodo: semestre.periodo,
                inicio: semestre.inicio,
                fim: semestre.fim,
                status: semestre.status,
                curso: semestre.curso
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

export async function deleteSemestre(id) {
    try {
        const response = await fetch(`${API_URL}/admin/${getAdminId()}/semestre`, {
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