// Script para controlar o dropdown do perfil
document.addEventListener("DOMContentLoaded", function() {
    const userProfile = document.getElementById('userProfile');
    
    // Criar overlay para fechar o dropdown
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Função para toggle do dropdown do perfil
    function toggleProfileDropdown() {
        const isActive = userProfile.classList.contains('active');
        
        if (isActive) {
            userProfile.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            userProfile.classList.add('active');
            overlay.classList.add('active');
        }
    }
    
    // Event Listener para o perfil do usuário
    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleProfileDropdown();
    });
    
    // Event Listener para fechar o dropdown ao clicar fora
    overlay.addEventListener('click', () => {
        userProfile.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Event Listener para os itens do dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const action = e.target.textContent.trim();
            
            switch(action) {
                case 'Gerenciar Perfil':
                    console.log('Abrindo gerenciamento de perfil...');
                    break;
                case 'Alterar Senha':
                    console.log('Abrindo alteração de senha...');
                    break;
                case 'Permissões':
                    console.log('Abrindo gerenciamento de permissões...');
                    break;
                case 'Histórico de Atividades':
                    console.log('Carregando histórico de atividades...');
                    break;
                case 'Sair':
                    console.log('Saindo do sistema...');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1000);
                    break;
            }
            
            toggleProfileDropdown();
        });
    });
}); 