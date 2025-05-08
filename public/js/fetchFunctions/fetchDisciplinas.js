async function getDisciplinas() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/public/login.html';
        return;
    }

    try {
        const response = await fetch('https://errorsquad-server.onrender.com/disciplinas', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/public/login.html';
                return;
            }
            throw new Error(`Erro ao buscar disciplinas: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
        throw error;
    }
}

async function createDisciplina(disciplinaData) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/public/login.html';
        return;
    }

    try {
        const response = await fetch('https://errorsquad-server.onrender.com/disciplinas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(disciplinaData)
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/public/login.html';
                return;
            }
            throw new Error(`Erro ao criar disciplina: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro ao criar disciplina:', error);
        throw error;
    }
}

async function updateDisciplina(id, disciplinaData) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/public/login.html';
        return;
    }

    try {
        const response = await fetch(`https://errorsquad-server.onrender.com/disciplinas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(disciplinaData)
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/public/login.html';
                return;
            }
            throw new Error(`Erro ao atualizar disciplina: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro ao atualizar disciplina:', error);
        throw error;
    }
}

async function deleteDisciplina(id) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/public/login.html';
        return;
    }

    try {
        const response = await fetch(`https://errorsquad-server.onrender.com/disciplinas/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/public/login.html';
                return;
            }
            throw new Error(`Erro ao deletar disciplina: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro ao deletar disciplina:', error);
        throw error;
    }
} 