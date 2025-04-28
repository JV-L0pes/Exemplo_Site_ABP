// Script específico para a página de Configurações
document.addEventListener("DOMContentLoaded", function() {
    // Elementos
    const configInputs = document.querySelectorAll('.config-input');
    const configSelects = document.querySelectorAll('.config-select');
    const configCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const saveButtons = document.querySelectorAll('.btn-save');
    
    // Funcionalidade de colapso da sidebar
    const collapseBtn = document.getElementById('collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (collapseBtn && sidebar) {
        collapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            // Salvar o estado da sidebar no localStorage
            localStorage.setItem('sidebarState', sidebar.classList.contains('collapsed') ? 'collapsed' : 'expanded');
        });
        
        // Carregar o estado salvo da sidebar
        const sidebarState = localStorage.getItem('sidebarState');
        if (sidebarState === 'collapsed') {
            sidebar.classList.add('collapsed');
        }
    }
    
    // Criar container para toasts se não existir
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Dados simulados para demonstração
    const configuracoes = {
        usuario: {
            nome: "Administrador",
            email: "admin@fatec.sp.gov.br",
            senha: "********"
        },
        notificacoes: {
            email: true,
            sistema: true,
            atualizacoes: false
        },
        aparencia: {
            tema: "light",
            fonte: "roboto"
        },
        sistema: {
            backup: "daily",
            logs: "all"
        }
    };
    
    // Função para mostrar toast
    function showToast(message, type = 'success') {
        window.showToast(message, type);
    }
    
    // Função para salvar configurações
    function salvarConfiguracoes(tipo) {
        const configCard = document.querySelector(`.config-card:nth-child(${tipo})`);
        const inputs = configCard.querySelectorAll('input, select');
        let dadosAlterados = {};
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                dadosAlterados[input.name || 'checkbox'] = input.checked;
            } else {
                dadosAlterados[input.name || input.type] = input.value;
            }
        });
        
        // Simular salvamento no backend
        setTimeout(() => {
            // Aqui você adicionaria a chamada real para sua API
            console.log('Dados salvos:', dadosAlterados);
            showToast('Alterações salvas com sucesso!', 'success');
        }, 500);
    }
    
    // Função para carregar configurações
    function carregarConfiguracoes() {
        const savedConfig = localStorage.getItem('configuracoes');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            
            // Atualizar inputs
            configInputs.forEach(input => {
                if (config.usuario[input.name]) {
                    input.value = config.usuario[input.name];
                }
            });
            
            // Atualizar selects
            configSelects.forEach(select => {
                if (config[select.dataset.config][select.name]) {
                    select.value = config[select.dataset.config][select.name];
                }
            });
            
            // Atualizar checkboxes
            configCheckboxes.forEach(checkbox => {
                if (config.notificacoes[checkbox.name] !== undefined) {
                    checkbox.checked = config.notificacoes[checkbox.name];
                }
            });
        }
    }
    
    // Event Listeners para botões de salvar
    saveButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
            
            salvarConfiguracoes(index + 1);
            
            // Restaurar botão após salvar
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = 'Salvar Alterações';
            }, 1000);
        });
    });
    
    // Função para alternar o tema
    function toggleTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Função para carregar o tema salvo
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        toggleTheme(savedTheme);
        
        // Atualizar o select de tema
        const themeSelect = document.querySelector('select[class="config-input"]');
        if (themeSelect) {
            themeSelect.value = savedTheme;
        }
    }

    // Adicionar evento de change ao select de tema
    const themeSelect = document.querySelector('select[class="config-input"]');
    if (themeSelect) {
        themeSelect.addEventListener('change', function(e) {
            toggleTheme(e.target.value);
        });
    }

    // Carregar o tema ao iniciar a página
    loadTheme();
}); 