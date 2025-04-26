// Script específico para a página de Configurações
document.addEventListener("DOMContentLoaded", function() {
    // Elementos
    const configInputs = document.querySelectorAll('.config-input');
    const configSelects = document.querySelectorAll('.config-select');
    const configCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const saveButtons = document.querySelectorAll('.btn-save');
    
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
    
    // Event Listeners para mudanças de tema
    const temaSelect = document.querySelector('select[name="tema"]');
    if (temaSelect) {
        temaSelect.addEventListener('change', (e) => {
            document.body.className = e.target.value;
            showToast('Tema alterado!', 'info');
        });
    }
    
    // Event Listeners para mudanças de fonte
    const fonteSelect = document.querySelector('select[name="fonte"]');
    if (fonteSelect) {
        fonteSelect.addEventListener('change', (e) => {
            document.body.style.fontFamily = e.target.value;
            showToast('Fonte alterada!', 'info');
        });
    }
    
    // Inicializar a página
    carregarConfiguracoes();
}); 