// Função para decodificar o payload do JWT (base64)
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch (e) {
        return null;
    }
}

// Função para validar token e ID da URL
function validateTokenOrLogout() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('Nenhum token encontrado no localStorage.');
        window.location.href = '/public/login.html';
        return;
    }

    const payload = parseJwt(token);
    if (!payload || !payload.id) {
        console.error('Token inválido ou não contém ID.');
        alert('Token inválido. Faça login novamente.');
        window.location.href = '/public/login.html';
        return;
    }
}

// Inicializar validação
validateTokenOrLogout(); 