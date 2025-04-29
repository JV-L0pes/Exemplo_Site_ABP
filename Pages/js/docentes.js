// Dados iniciais
const dadosIniciais = [
    {
        id: 1,
        nome: "Prof. João Silva",
        curso: "DSM"
    },
    {
        id: 2,
        nome: "Prof. Maria Santos",
        curso: "GEO"
    },
    {
        id: 3,
        nome: "Prof. Pedro Oliveira",
        curso: "MAR"
    }
];

let docentes = [];
let docenteEditando = null;

// Função para salvar no localStorage
function salvarDados() {
    try {
        localStorage.setItem('docentes', JSON.stringify(docentes));
        console.log('Dados salvos:', docentes);
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
    }
}

// Função para carregar do localStorage
function carregarDados() {
    try {
        const dados = localStorage.getItem('docentes');
        if (dados) {
            docentes = JSON.parse(dados);
        } else {
            // Se não houver dados no localStorage, usa os dados iniciais
            docentes = [...dadosIniciais];
            salvarDados();
        }
        console.log('Dados carregados:', docentes);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Em caso de erro, usa os dados iniciais
        docentes = [...dadosIniciais];
        salvarDados();
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
    console.log('DOM carregado, iniciando...');
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
    
    // Preencher o formulário com os dados do docente
    document.getElementById('edit-id').value = docente.id;
    document.getElementById('edit-nome').value = docente.nome;
    document.getElementById('edit-curso').value = docente.curso;
    
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
function editarDocente(id) {
    const docente = docentes.find(d => d.id === id);
    if (!docente) {
        console.error('Erro: Docente não encontrado');
        return;
    }
    
    // Preencher o formulário com os dados do docente
    document.getElementById('edit-id').value = docente.id;
    document.getElementById('edit-nome').value = docente.nome;
    document.getElementById('edit-curso').value = docente.curso;
    
    // Abrir o modal de edição
    const modal = document.getElementById('modal-editar-docente');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
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
                    <h3>${docente.nome}</h3>
                </div>
            </div>
            <div class="docente-details">
                <div class="docente-detail">
                    <span class="detail-label">Curso:</span>
                    <span class="detail-value ${docente.curso.toLowerCase()}">${docente.curso}</span>
                </div>
            </div>
            <div class="docente-actions">
                <button class="btn-icon btn-edit" onclick="editarDocente(${docente.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="confirmarExclusao(${docente.id})" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        docentesList.appendChild(card);
    });
}

// Event Listeners para o Modal
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
    const form = document.getElementById('form-adicionar-docente');
    const btnSalvar = document.getElementById('salvar-docente');
    
    if (btnSalvar) {
        btnSalvar.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Obter dados do formulário
            const formData = new FormData(form);
            const docenteData = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                curso: formData.get('curso')
            };
            
            // Validar email institucional
            if (!docenteData.email.endsWith('@fatec.sp.gov.br')) {
                console.error('Erro: O email deve ser institucional (@fatec.sp.gov.br)');
                return;
            }
            
            // Adicionar à lista de docentes
            docentes.push({
                id: Date.now(), // Gerar ID único
                ...docenteData
            });
            
            // Salvar dados
            salvarDados();
            
            // Atualizar interface
            renderDocentes();
            
            // Mostrar mensagem de sucesso
            console.log('Docente adicionado com sucesso!');
            
            // Fechar o modal
            fecharModalAdicionarDocente();
        });
    }

    // Renderizar docentes ao carregar a página
    renderDocentes();
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
        btnSalvarEdicao.addEventListener('click', function(event) {
            event.preventDefault();
            
            const form = document.getElementById('form-editar-docente');
            const formData = new FormData(form);
            const docenteData = {
                id: parseInt(formData.get('id')),
                nome: formData.get('nome'),
                email: formData.get('email'),
                curso: formData.get('curso')
            };
            
            // Validar email institucional
            if (!docenteData.email.endsWith('@fatec.sp.gov.br')) {
                console.error('Erro: O email deve ser institucional (@fatec.sp.gov.br)');
                return;
            }
            
            // Atualizar docente na lista
            const index = docentes.findIndex(d => d.id === docenteData.id);
            if (index !== -1) {
                docentes[index] = docenteData;
                
                // Salvar dados
                salvarDados();
                
                // Atualizar interface
                renderDocentes();
                
                // Mostrar mensagem de sucesso
                console.log('Docente atualizado com sucesso!');
                
                // Fechar o modal
                fecharModalEditarDocente();
            } else {
                console.error('Erro ao atualizar docente');
            }
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
        btnConfirmarDelecao.addEventListener('click', function() {
            const modal = document.getElementById('modal-confirmar-delecao');
            const docenteId = parseInt(modal.dataset.docenteId);
            
            if (docenteId) {
                // Remover docente da lista
                docentes = docentes.filter(d => d.id !== docenteId);
                
                // Salvar dados
                salvarDados();
                
                // Atualizar interface
                renderDocentes();
                
                // Mostrar mensagem de sucesso
                console.log('Docente removido com sucesso!');
                
                // Fechar o modal
                fecharModalConfirmarDelecao();
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

// Função para salvar docente
function salvarDocente() {
    if (!validarFormularioDocente()) {
        return;
    }

    const nome = document.getElementById('nome').value.trim();
    const curso = document.getElementById('curso').value.trim();
    
    const novoDocente = {
        id: Date.now(),
        nome: nome,
        curso: curso
    };
    
    docentes.push(novoDocente);
    salvarDados();
    renderDocentes();
    fecharModalAdicionarDocente();
    showAlert('Docente adicionado com sucesso!', 'success');
}

// Função para salvar edição
function salvarEdicao() {
    if (!validarFormularioEdicao()) {
        return;
    }

    const id = document.getElementById('edit-id').value;
    const nome = document.getElementById('edit-nome').value.trim();
    const curso = document.getElementById('edit-curso').value.trim();
    
    const index = docentes.findIndex(d => d.id === parseInt(id));
    if (index !== -1) {
        docentes[index] = {
            ...docentes[index],
            nome: nome,
            curso: curso
        };
        salvarDados();
        renderDocentes();
        fecharModalEditarDocente();
        showAlert('Docente atualizado com sucesso!', 'success');
    }
} 