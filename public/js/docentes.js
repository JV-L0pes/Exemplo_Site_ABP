// Inicializar IRONGATE
if (typeof IRONGATE === 'function') {
    IRONGATE();
}

// Importando as funções do fetchDocentes.js
import { getDocentes, createDocente, updateDocente, deleteDocente } from './fetchFunctions/fetchDocentes.js';

let docentes = [];
let docenteEditando = null;

// Função para salvar no localStorage
function salvarDados() {
    try {
        localStorage.setItem('docentes', JSON.stringify(docentes));
        console.warn('Dados salvos:', docentes);
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
    }
}

// Função para carregar dados do backend
async function carregarDados() {
    try {
        const data = await getDocentes();
        if (!data) {
            throw new Error('Não foi possível carregar os dados dos docentes');
        }
        docentes = data;
        renderDocentes();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showAlert('Erro ao carregar dados. Por favor, verifique sua conexão e tente novamente.', 'error');
        // Redirecionar para login se o token estiver inválido
        if (error.message.includes('Token inválido') || error.message.includes('não autorizado')) {
            window.location.href = '/public/login.html';
        }
    }
}

// Função para limpar o formulário
function clearForm() {
    const form = document.getElementById("formDocente");
    if (!form) return;

    form.reset();
    docenteEditando = null;

    // Resetar texto do botão de submit
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Salvar';
    }
}

// Função para mostrar mensagens no console
function logMessage(message, type = 'info') {
    switch(type) {
        case 'error':
            console.error(message);
            break;
        case 'warning':
            console.warn(message);
            break;
        default:
            console.log(message);
    }
}

// Função para limpar o localStorage e carregar dados iniciais
function limparEInicializar() {
    localStorage.removeItem('docentes');
    carregarDados();
    renderDocentes();
}

// Funções para gerenciar docentes
document.addEventListener('DOMContentLoaded', function() {
    console.warn('DOM carregado, iniciando...');
    limparEInicializar();
    
    // Configurar busca
    const searchInput = document.getElementById("search-docente");
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.docente-card');
            
            cards.forEach(card => {
                const nome = card.querySelector("h3").textContent.toLowerCase();
                const curso = card.querySelector(".detail-value").textContent.toLowerCase();
                
                if (nome.includes(searchTerm) || curso.includes(searchTerm)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});

// Funções para controle do Modal de Edição
function abrirModalEditarDocente(docente) {
    const modal = document.getElementById('modal-editar-docente');
    const form = document.getElementById('form-editar-docente');
    
    document.getElementById('edit-id').value = docente.id;
    document.getElementById('edit-nome').value = docente.nome;
    document.getElementById('edit-cor').value = docente.cor || '#FF0000';
    document.getElementById('edit-cor-hex').value = docente.cor || '#FF0000';
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function fecharModalEditarDocente() {
    const modal = document.getElementById('modal-editar-docente');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    limparFormularioEdicao();
}

function limparFormularioEdicao() {
    const form = document.getElementById('form-editar-docente');
    form.reset();
}

// Função para editar docente
async function editarDocente(id) {
    try {
        const docente = docentes.find(d => d.id === id);
        if (!docente) {
            console.error('Erro: Docente não encontrado');
            return;
        }
        
        // Preencher o formulário com os dados do docente
        document.getElementById('edit-id').value = docente.id;
        document.getElementById('edit-nome').value = docente.nome;
        
        // Abrir o modal de edição
        const modal = document.getElementById('modal-editar-docente');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Erro ao abrir modal de edição:', error);
        showAlert('Erro ao carregar dados do docente. Por favor, tente novamente.', 'error');
    }
}

// Funções para controle do Modal de Deleção
function abrirModalConfirmarDelecao(docente) {
    const modal = document.getElementById('modal-confirmar-delecao');
    const nomeDocente = document.getElementById('nome-docente-delete');
    
    nomeDocente.textContent = docente.nome;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Armazenar o ID do docente para uso posterior
    modal.dataset.docenteId = docente.id;
}

function fecharModalConfirmarDelecao() {
    const modal = document.getElementById('modal-confirmar-delecao');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    delete modal.dataset.docenteId;
}

// Função para confirmar exclusão
function confirmarExclusao(id) {
    const docente = docentes.find(d => d.id === id);
    if (!docente) {
        console.error('Erro: Docente não encontrado');
        return;
    }
    abrirModalConfirmarDelecao(docente);
}

// Função para exportar para CSV
function exportToCSV() {
    // Implemente a lógica de exportação para CSV aqui
}

// Função para importar CSV
function importCSV() {
    // Implemente a lógica de importação CSV aqui
}

// Funções para controle do Modal
function abrirModalAdicionarDocente() {
    const modal = document.getElementById('modal-adicionar-docente');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Previne rolagem do body
}

function fecharModalAdicionarDocente() {
    const modal = document.getElementById('modal-adicionar-docente');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restaura rolagem do body
    limparFormularioDocente();
}

function limparFormularioDocente() {
    const form = document.getElementById('form-adicionar-docente');
    form.reset();
}

// Função para mostrar mensagem e manter visível enquanto o modal estiver aberto
function logMessageAndKeepVisible(message, type = 'info') {
    logMessage(message, type);
}

// Função para renderizar os cards dos docentes
function renderDocentes() {
    const docentesList = document.getElementById('docentes-list');
    if (!docentesList) {
        console.error('Elemento docentes-list não encontrado');
        return;
    }

    // Limpar lista atual
    docentesList.innerHTML = '';

    // Criar cards para cada docente
    docentes.forEach(docente => {
        const card = document.createElement('div');
        card.className = 'docente-card';
        card.innerHTML = `
            <div class="docente-header">
                <div class="docente-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="docente-info">
                    <h3>
                        <span class="docente-color-box" style="background-color: ${docente.cor || '#FF0000'}"></span>
                        ${docente.nome || ''}
                    </h3>
                </div>
            </div>
            <div class="docente-actions">
                <button class="btn-icon btn-edit" data-docente-id="${docente.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" data-docente-id="${docente.id}" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        docentesList.appendChild(card);
    });

    // Adicionar event listeners para os botões
    docentesList.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => {
            const docenteId = parseInt(button.dataset.docenteId);
            editarDocente(docenteId);
        });
    });

    docentesList.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            const docenteId = parseInt(button.dataset.docenteId);
            confirmarExclusao(docenteId);
        });
    });
}

// Event Listeners para o Modal de Adição
document.addEventListener('DOMContentLoaded', function() {
    // Botão para abrir o modal
    const btnAdicionar = document.querySelector('.btn-add');
    if (btnAdicionar) {
        btnAdicionar.addEventListener('click', abrirModalAdicionarDocente);
    }

    // Botões para fechar o modal
    const closeModal = document.querySelector('.close-modal');
    const btnCancelar = document.getElementById('cancelar-adicionar');
    
    if (closeModal) {
        closeModal.addEventListener('click', fecharModalAdicionarDocente);
    }
    
    if (btnCancelar) {
        btnCancelar.addEventListener('click', fecharModalAdicionarDocente);
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal-adicionar-docente');
        if (event.target === modal) {
            fecharModalAdicionarDocente();
        }
    });

    // Manipular envio do formulário
    const btnSalvar = document.getElementById('salvar-docente');
    if (btnSalvar) {
        btnSalvar.addEventListener('click', async function(event) {
            event.preventDefault();
            await salvarDocente();
        });
    }
});

// Event Listeners para o Modal de Edição
document.addEventListener('DOMContentLoaded', function() {
    // Botões para fechar o modal de edição
    const closeModalEditar = document.querySelector('#modal-editar-docente .close-modal');
    const btnCancelarEditar = document.getElementById('cancelar-editar');
    
    if (closeModalEditar) {
        closeModalEditar.addEventListener('click', fecharModalEditarDocente);
    }
    
    if (btnCancelarEditar) {
        btnCancelarEditar.addEventListener('click', fecharModalEditarDocente);
    }

    // Fechar modal de edição ao clicar fora dele
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal-editar-docente');
        if (event.target === modal) {
            fecharModalEditarDocente();
        }
    });

    // Manipular envio do formulário de edição
    const btnSalvarEdicao = document.getElementById('salvar-edicao');
    if (btnSalvarEdicao) {
        btnSalvarEdicao.addEventListener('click', async function(event) {
            event.preventDefault();
            await salvarEdicao();
        });
    }
});

// Event Listeners para o Modal de Deleção
document.addEventListener('DOMContentLoaded', function() {
    // Botões para fechar o modal de deleção
    const closeModalDelecao = document.querySelector('#modal-confirmar-delecao .close-modal');
    const btnCancelarDelecao = document.getElementById('cancelar-delecao');
    
    if (closeModalDelecao) {
        closeModalDelecao.addEventListener('click', fecharModalConfirmarDelecao);
    }
    
    if (btnCancelarDelecao) {
        btnCancelarDelecao.addEventListener('click', fecharModalConfirmarDelecao);
    }

    // Fechar modal de deleção ao clicar fora dele
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal-confirmar-delecao');
        if (event.target === modal) {
            fecharModalConfirmarDelecao();
        }
    });

    // Manipular confirmação de deleção
    const btnConfirmarDelecao = document.getElementById('confirmar-delecao');
    if (btnConfirmarDelecao) {
        btnConfirmarDelecao.addEventListener('click', async function() {
            const modal = document.getElementById('modal-confirmar-delecao');
            const docenteId = parseInt(modal.dataset.docenteId);
            
            if (docenteId) {
                await deletarDocente(docenteId);
            }
        });
    }
});

// Função para mostrar alerta personalizado
function showAlert(message, type = 'error') {
    const alert = document.getElementById('custom-alert');
    const alertMessage = alert.querySelector('.alert-message');
    const alertIcon = alert.querySelector('.alert-icon i');
    
    // Configurar o alerta
    alert.className = `custom-alert ${type}`;
    alertMessage.textContent = message;
    
    // Configurar o ícone
    if (type === 'error') {
        alertIcon.className = 'fas fa-exclamation-circle';
    } else if (type === 'success') {
        alertIcon.className = 'fas fa-check-circle';
    }
    
    // Mostrar o alerta
    alert.style.display = 'flex';
    
    // Configurar o botão de fechar
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.onclick = () => {
        alert.classList.add('hide');
        setTimeout(() => {
            alert.style.display = 'none';
            alert.classList.remove('hide');
        }, 300);
    };
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
        if (alert.style.display === 'flex') {
            alert.classList.add('hide');
            setTimeout(() => {
                alert.style.display = 'none';
                alert.classList.remove('hide');
            }, 300);
        }
    }, 5000);
}

// Função para mostrar mensagem de erro
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    const errorElement = document.getElementById(`${elementId}-error`);
    
    element.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Função para limpar mensagem de erro
function clearError(elementId) {
    const element = document.getElementById(elementId);
    const errorElement = document.getElementById(`${elementId}-error`);
    
    element.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Função para validar o formulário
function validarFormularioDocente() {
    let isValid = true;
    const nome = document.getElementById('nome').value.trim();
    const curso = document.getElementById('curso').value.trim();
    
    // Limpar erros anteriores
    clearError('nome');
    clearError('curso');
    
    if (!nome) {
        showError('nome', 'Por favor, preencha o nome do docente');
        isValid = false;
    }
    
    if (!curso) {
        showError('curso', 'Por favor, selecione um curso');
        isValid = false;
    }
    
    return isValid;
}

// Função para validar o formulário de edição
function validarFormularioEdicao() {
    let isValid = true;
    const nome = document.getElementById('edit-nome').value.trim();
    const curso = document.getElementById('edit-curso').value.trim();
    
    // Limpar erros anteriores
    clearError('edit-nome');
    clearError('edit-curso');
    
    if (!nome) {
        showError('edit-nome', 'Por favor, preencha o nome do docente');
        isValid = false;
    }
    
    if (!curso) {
        showError('edit-curso', 'Por favor, selecione um curso');
        isValid = false;
    }
    
    return isValid;
}

// Função para salvar curso
async function salvarCurso(curso) {
    try {
        if (!curso) {
            showAlert('Por favor, selecione um curso.', 'error');
            return false;
        }

        // Validar se o curso é válido
        const cursosValidos = ['GEO', 'DSM', 'MAR'];
        if (!cursosValidos.includes(curso)) {
            showAlert('Curso inválido. Por favor, selecione um curso válido.', 'error');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Erro ao validar curso:', error);
        showAlert('Erro ao validar curso. Por favor, tente novamente.', 'error');
        return false;
    }
}

// Função para salvar docente
async function salvarDocente() {
    try {
        const nome = document.getElementById('nome').value;
        const cor = document.getElementById('cor').value;

        if (!nome || !cor) {
            showAlert('Por favor, preencha todos os campos.', 'error');
            return;
        }

        const novoDocente = {
            nome: nome,
            cor: cor
        };

        const result = await createDocente(novoDocente);
        if (result) {
            await carregarDados();
            fecharModalAdicionarDocente();
            showAlert('Docente adicionado com sucesso!', 'success');
        } else {
            showAlert('Erro ao adicionar docente. Por favor, tente novamente.', 'error');
        }
    } catch (error) {
        console.error('Erro ao salvar docente:', error);
        showAlert('Erro ao adicionar docente. Por favor, tente novamente.', 'error');
    }
}

// Função para salvar edição
async function salvarEdicao() {
    try {
        const id = document.getElementById('edit-id').value;
        const nome = document.getElementById('edit-nome').value;
        const cor = document.getElementById('edit-cor').value;

        if (!nome || !cor) {
            showAlert('Por favor, preencha todos os campos.', 'error');
            return;
        }

        const docenteAtualizado = {
            id: parseInt(id),
            nome: nome,
            cor: cor
        };

        const result = await updateDocente(docenteAtualizado);
        if (result) {
            await carregarDados();
            fecharModalEditarDocente();
            showAlert('Docente atualizado com sucesso!', 'success');
        } else {
            showAlert('Erro ao atualizar docente. Por favor, tente novamente.', 'error');
        }
    } catch (error) {
        console.error('Erro ao salvar edição:', error);
        showAlert('Erro ao atualizar docente. Por favor, tente novamente.', 'error');
    }
}

// Função para deletar docente
async function deletarDocente(id) {
    try {
        const result = await deleteDocente(id);
        if (result) {
            await carregarDados();
            fecharModalConfirmarDelecao();
            showAlert('Docente excluído com sucesso!', 'success');
        } else {
            showAlert('Erro ao excluir docente. Por favor, tente novamente.', 'error');
        }
    } catch (error) {
        console.error('Erro ao deletar docente:', error);
        showAlert('Erro ao excluir docente. Por favor, tente novamente.', 'error');
    }
}

// Função para sincronizar os inputs de cor
function sincronizarInputsCor(colorInput, hexInput) {
    colorInput.addEventListener('input', function() {
        hexInput.value = this.value.toUpperCase();
    });

    hexInput.addEventListener('input', function() {
        if (this.value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
            colorInput.value = this.value;
        }
    });
}

// Inicializar sincronização dos inputs de cor
document.addEventListener('DOMContentLoaded', function() {
    const colorInput = document.getElementById('cor');
    const hexInput = document.getElementById('cor-hex');
    const editColorInput = document.getElementById('edit-cor');
    const editHexInput = document.getElementById('edit-cor-hex');

    if (colorInput && hexInput) {
        sincronizarInputsCor(colorInput, hexInput);
    }
    if (editColorInput && editHexInput) {
        sincronizarInputsCor(editColorInput, editHexInput);
    }
});

// Exportar funções necessárias
window.editarDocente = editarDocente;
window.confirmarExclusao = confirmarExclusao;
window.salvarDocente = salvarDocente;
window.salvarEdicao = salvarEdicao; 
