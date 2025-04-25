// Funções globais
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
            console.log('Dados carregados:', docentes);
        } else {
            console.log('Nenhum dado encontrado no localStorage');
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Função para limpar o formulário
function clearForm() {
    const form = document.getElementById("formDocente");
    if (!form) return;

    form.reset();
    docenteEditando = null;

    // Resetar título do modal
    const modalTitle = document.querySelector('#modalDocente .modal-title');
    if (modalTitle) {
        modalTitle.textContent = 'Adicionar Docente';
    }

    // Resetar texto do botão de submit
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Salvar';
    }
}

// Função para abrir o modal
function openModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
    }
}

// Função para fechar o modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        clearForm();
    }
}

// Função para editar docente
function editarDocente(docente) {
    if (!docente || !docente.id) {
        alert("Erro: Docente inválido");
        return;
    }

    docenteEditando = docente;
    
    const form = document.getElementById("formDocente");
    if (!form) {
        alert("Erro: Formulário não encontrado");
        return;
    }

    // Preencher o formulário com os dados do docente
    form.querySelector('input[name="nome"]').value = docente.nome || '';
    form.querySelector('input[name="email"]').value = docente.email || '';
    form.querySelector('select[name="curso"]').value = docente.curso || '';

    // Atualizar título do modal
    const modalTitle = document.querySelector('#modalDocente .modal-title');
    if (modalTitle) {
        modalTitle.textContent = 'Editar Docente';
    }

    // Atualizar texto do botão de submit
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Atualizar';
    }

    openModal();
}

// Função para mostrar notificações
function showToast(message, type = 'info') {
    // Criar ou obter o container de toasts
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Criar o toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <p class="toast-message">${message}</p>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    // Adicionar ao container
    container.appendChild(toast);

    // Remover após 8 segundos com animação suave
    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.8s ease-in-out forwards';
        setTimeout(() => {
            if (toast && toast.parentElement) {
                toast.remove();
            }
        }, 800);
    }, 8000);

    // Parar a animação de saída se o mouse estiver sobre o toast
    toast.addEventListener('mouseenter', () => {
        toast.style.animation = 'none';
    });

    // Retomar a animação de saída quando o mouse sair
    toast.addEventListener('mouseleave', () => {
        toast.style.animation = 'toastFadeOut 0.8s ease-in-out forwards';
        setTimeout(() => {
            if (toast && toast.parentElement) {
                toast.remove();
            }
        }, 800);
    });
}

// Função para confirmar exclusão
function confirmarExclusao(id) {
    if (!id) {
        showToast("Erro: ID do docente não fornecido", "error");
        return;
    }

    const docente = docentes.find(d => d.id === id);
    if (!docente) {
        showToast("Erro: Docente não encontrado", "error");
        return;
    }

    // Atualizar mensagem de confirmação com o nome do docente
    const mensagemConfirmacao = document.querySelector('#modalConfirmacao .modal-body p');
    if (mensagemConfirmacao) {
        mensagemConfirmacao.textContent = `Tem certeza que deseja excluir o(a) docente ${docente.nome}?`;
    }

    // Configurar botão de confirmação
    const btnConfirmar = document.querySelector('#modalConfirmacao .btn-danger');
    if (btnConfirmar) {
        btnConfirmar.onclick = () => {
            docentes = docentes.filter(d => d.id !== id);
            salvarDados();
            renderDocentes();
            closeModalConfirmacao();
            showToast("Docente excluído com sucesso!", "success");
        };
    }

    // Abrir modal de confirmação
    const modalConfirmacao = document.getElementById("modalConfirmacao");
    if (modalConfirmacao) {
        modalConfirmacao.style.display = 'flex';
        modalConfirmacao.classList.add("active");
    }
}

function closeModalConfirmacao() {
    const modalConfirmacao = document.getElementById("modalConfirmacao");
    if (modalConfirmacao) {
        modalConfirmacao.style.display = 'none';
        modalConfirmacao.classList.remove("active");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Carregar dados salvos
    carregarDados();

    // Elementos
    const docentesList = document.getElementById("docentes-list");
    console.log('Estado inicial do docentesList:', {
        exists: !!docentesList,
        id: docentesList?.id,
        innerHTML: docentesList?.innerHTML
    });

    const addDocenteBtn = document.querySelector(".btn-add");
    const importBtn = document.querySelector(".btn-import");
    const exportBtn = document.querySelector(".btn-export");
    const searchInput = document.getElementById("search-docente");
    const modalDocente = document.getElementById("modalDocente");
    const modalConfirmacao = document.getElementById("modalConfirmacao");
    const formDocente = document.getElementById("formDocente");
    const btnConfirmDelete = document.getElementById("btnConfirmDelete");
    
    console.log('Elementos carregados:', { 
        docentesList: !!docentesList,
        addDocenteBtn: !!addDocenteBtn,
        modalDocente: !!modalDocente,
        modalConfirmacao: !!modalConfirmacao,
        formDocente: !!formDocente,
        btnConfirmDelete: !!btnConfirmDelete
    });

    if (!docentesList) {
        console.error('Elemento docentes-list não encontrado! Verifique o ID no HTML.');
        return;
    }

    if (!formDocente) {
        console.error('Formulário de docente não encontrado! Verifique o ID no HTML.');
        return;
    }
    
    // Função para renderizar os cards de docentes
    function renderDocentes() {
        if (!docentesList) {
            console.error('Lista de docentes não encontrada no DOM');
            return;
        }
        
        console.log('Iniciando renderização de docentes:', docentes);
        docentesList.innerHTML = "";
        
        if (docentes.length === 0) {
            console.log('Nenhum docente para renderizar');
            docentesList.innerHTML = '<div class="no-docentes">Nenhum docente cadastrado</div>';
            return;
        }
        
        docentes.forEach(docente => {
            console.log('Renderizando docente:', docente);
            const card = createDocenteCard(docente);
            docentesList.appendChild(card);
        });
    }
    
    // Função para criar um card de docente
    function createDocenteCard(docente) {
        console.log('Criando card para docente:', docente);
        const card = document.createElement("div");
        card.className = "docente-card";
        card.dataset.id = docente.id;
        
        // Garantir que os valores não sejam undefined
        const nome = docente.nome || '';
        const email = docente.email || '';
        const curso = docente.curso || '';
        
        card.innerHTML = `
            <div class="docente-header">
                <div class="docente-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="docente-info">
                    <h3>${nome}</h3>
                    <p>${email}</p>
                </div>
            </div>
            <div class="docente-details">
                <div class="docente-detail">
                    <span class="detail-label">Curso</span>
                    <span class="detail-value">${curso}</span>
                </div>
            </div>
            <div class="docente-actions">
                <button class="btn btn-icon btn-edit" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-icon btn-delete" title="Excluir">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        
        // Adicionar eventos aos botões
        const editBtn = card.querySelector(".btn-edit");
        const deleteBtn = card.querySelector(".btn-delete");
        
        editBtn.addEventListener("click", () => editarDocente(docente));
        deleteBtn.addEventListener("click", () => confirmarExclusao(docente.id));
        
        return card;
    }
    
    // Event listener para o botão de adicionar docente
    if (addDocenteBtn) {
        addDocenteBtn.addEventListener("click", function(e) {
            e.preventDefault();
            docenteEditando = null;
            const modalTitle = modalDocente.querySelector("h3");
            modalTitle.textContent = "Adicionar Docente";
            clearForm();
            openModal();
        });
    }
    
    // Event listener para o formulário de docente
    if (formDocente) {
        formDocente.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Validação dos campos
            const nome = formData.get("nome");
            const email = formData.get("email");
            const curso = formData.get("curso");
            
            if (!nome || !email || !curso) {
                showToast("Por favor, preencha todos os campos obrigatórios.", "error");
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast("Por favor, insira um email válido.", "error");
                return;
            }
            
            const novoDocente = {
                id: docenteEditando ? docenteEditando.id : Date.now(),
                nome: nome.trim(),
                email: email.trim(),
                curso: curso
            };
            
            if (docenteEditando) {
                // Atualizar docente existente
                const index = docentes.findIndex(d => d.id === docenteEditando.id);
                if (index !== -1) {
                    docentes[index] = novoDocente;
                }
            } else {
                // Adicionar novo docente
                docentes.push(novoDocente);
            }
            
            salvarDados();
            renderDocentes();
            closeModal();
            
            // Feedback visual com toast
            const mensagem = docenteEditando ? 
                "Docente atualizado com sucesso!" : 
                "Docente adicionado com sucesso!";
            showToast(mensagem, "success");
        });
    }
    
    // Event listener para o botão de confirmar exclusão
    if (btnConfirmDelete) {
        btnConfirmDelete.addEventListener("click", function() {
            if (docenteEditando) {
                // Remover o docente
                docentes = docentes.filter(d => d.id !== docenteEditando.id);
                
                // Salvar dados
                salvarDados();
                
                // Atualizar a lista
                renderDocentes();
                
                // Fechar o modal
                modalConfirmacao.classList.remove("active");
                modalConfirmacao.style.display = 'none';
                
                // Mostrar mensagem de sucesso
                showToast("Docente excluído com sucesso!", "success");
            }
        });
    }
    
    // Event listeners para fechar modais
    document.querySelectorAll(".modal-close, .btn-cancel").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    });

    // Fechar modal ao clicar fora dele
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", function(e) {
            if (e.target === this) {
                const modal = this;
                modal.classList.remove("active");
                modal.style.display = 'none';
            }
        });

        // Prevenir que cliques dentro do modal fechem ele
        const modal = overlay.querySelector('.modal');
        if (modal) {
            modal.addEventListener("click", function(e) {
                e.stopPropagation();
            });
        }
    });

    // Event listener para busca
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();
            const cards = docentesList.querySelectorAll(".docente-card");
            
            cards.forEach(card => {
                const nome = card.querySelector("h3").textContent.toLowerCase();
                const email = card.querySelector("p").textContent.toLowerCase();
                const curso = card.querySelector(".detail-value").textContent.toLowerCase();
                
                if (nome.includes(searchTerm) || email.includes(searchTerm) || curso.includes(searchTerm)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
    
    // Inicializar a página
    renderDocentes();
});

// Função para editar docente
function editDocente(id) {
    // Aqui você deve implementar a lógica para buscar os dados do docente
    // e preencher o formulário no modal
    openModal();
}

// Função para confirmar exclusão
function confirmDelete(id) {
    // Aqui você pode adicionar o ID do docente a ser excluído em um campo hidden
    const modalConfirm = document.querySelector('#modalConfirmacao');
    if (modalConfirm) {
        const hiddenInput = modalConfirm.querySelector('input[name="docenteId"]');
        if (hiddenInput) {
            hiddenInput.value = id;
        }
        openModal();
    }
}

// Função para exportar para CSV
function exportToCSV() {
    // Implemente a lógica de exportação para CSV aqui
}

// Event listener para o formulário de importação CSV
const formImportCSV = document.querySelector('#formImportCSV');
if (formImportCSV) {
    formImportCSV.addEventListener('submit', function(e) {
        e.preventDefault();
        // Implemente a lógica de importação CSV aqui
        closeModal();
    });
}

// Event listener para o formulário de confirmação de exclusão
const formConfirmDelete = document.querySelector('#formConfirmDelete');
if (formConfirmDelete) {
    formConfirmDelete.addEventListener('submit', function(e) {
        e.preventDefault();
        // Implemente a lógica de exclusão aqui
        closeModal();
    });
}

function saveDocente() {
    // ... existing code ...
}

function importCSV() {
    // ... existing code ...
}

function deleteDocente() {
    // ... existing code ...
} 