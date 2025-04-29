// Script específico para a página de Semestres
document.addEventListener("DOMContentLoaded", function() {
    // Elementos
    const semestresList = document.getElementById("semestres-list");
    const searchInput = document.getElementById("search-semestre");
    const addSemestreBtn = document.getElementById("add-semestre");
    
    // Dados simulados para demonstração
    let semestres = [
        { 
            id: 1, 
            periodo: 1, 
            inicio: "2024-02-10", 
            fim: "2024-07-05",
            status: "concluido",
            disciplinas: 12,
            curso: "DSM"
        },
        { 
            id: 2, 
            periodo: 2, 
            inicio: "2024-08-05", 
            fim: "2024-12-15",
            status: "ativo",
            disciplinas: 12,
            curso: "GEO"
        },
        { 
            id: 3, 
            periodo: 3, 
            inicio: "2025-02-10", 
            fim: "2025-07-05",
            status: "planejado",
            disciplinas: 12,
            curso: "MAR"
        },
        { 
            id: 4, 
            periodo: 4, 
            inicio: "2025-08-05", 
            fim: "2025-12-15",
            status: "planejado",
            disciplinas: 12,
            curso: "DSM"
        },
        { 
            id: 5, 
            periodo: 5, 
            inicio: "2026-02-10", 
            fim: "2026-07-05",
            status: "planejado",
            disciplinas: 12,
            curso: "GEO"
        },
        { 
            id: 6, 
            periodo: 6, 
            inicio: "2026-08-05", 
            fim: "2026-12-15",
            status: "planejado",
            disciplinas: 12,
            curso: "MAR"
        }
    ];
    
    // Função para renderizar os cards de semestres
    function renderSemestres(semestresToRender = semestres) {
        semestresList.innerHTML = "";
        
        semestresToRender.forEach(semestre => {
            const card = createSemestreCard(semestre);
            semestresList.appendChild(card);
        });
    }
    
    // Função para criar um card de semestre
    function createSemestreCard(semestre) {
        const card = document.createElement("div");
        card.className = "semestre-card";
        card.dataset.id = semestre.id;
        
        // Definir classe de status
        let statusClass = "";
        switch(semestre.status) {
            case "ativo": statusClass = "status-ativo"; break;
            case "concluido": statusClass = "status-concluido"; break;
            case "planejado": statusClass = "status-planejado"; break;
        }

        // Definir classe do curso
        let cursoClass = "";
        switch(semestre.curso) {
            case "DSM": cursoClass = "curso-dsm"; break;
            case "GEO": cursoClass = "curso-geo"; break;
            case "MAR": cursoClass = "curso-mar"; break;
        }
        
        // Formatar datas
        const dataInicio = new Date(semestre.inicio);
        const dataFim = new Date(semestre.fim);
        const anoInicio = dataInicio.getFullYear();
        
        card.innerHTML = `
            <div class="semestre-header">
                <div class="semestre-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="semestre-info">
                    <h3>${anoInicio} - ${semestre.periodo}º Semestre</h3>
                    <p>
                        <span class="semestre-status ${statusClass}">${semestre.status.toUpperCase()}</span>
                        <span class="semestre-curso ${cursoClass}">${semestre.curso}</span>
                    </p>
                </div>
            </div>
            <div class="semestre-details">
                <div class="semestre-detail">
                    <span class="detail-label">Início</span>
                    <span class="detail-value">${dataInicio.toLocaleDateString('pt-BR')}</span>
                </div>
                <div class="semestre-detail">
                    <span class="detail-label">Fim</span>
                    <span class="detail-value">${dataFim.toLocaleDateString('pt-BR')}</span>
                </div>
                <div class="semestre-detail">
                    <span class="detail-label">Disciplinas</span>
                    <span class="detail-value">${semestre.disciplinas}</span>
                </div>
            </div>
            <div class="semestre-actions">
                <button class="btn-edit" onclick="editSemestre(${semestre.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" onclick="deleteSemestre(${semestre.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        
        return card;
    }
    
    // Função para buscar semestres
    function searchSemestres(query) {
        const filteredSemestres = semestres.filter(semestre => 
            semestre.ano.toString().includes(query) ||
            semestre.periodo.toString().includes(query) ||
            semestre.status.toLowerCase().includes(query.toLowerCase()) ||
            semestre.curso.toLowerCase().includes(query.toLowerCase())
        );
        
        renderSemestres(filteredSemestres);
    }

    // Funções para controle do Modal de Adição
    function abrirModalAdicionarSemestre() {
        const modal = document.getElementById('modal-adicionar-semestre');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function fecharModalAdicionarSemestre() {
        const modal = document.getElementById('modal-adicionar-semestre');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        limparFormularioSemestre();
    }

    // Funções para controle do Modal de Edição
    function abrirModalEditarSemestre(semestre) {
        const modal = document.getElementById('modal-editar-semestre');
        const form = document.getElementById('form-editar-semestre');
        
        // Pegar o ano da data de início
        const anoInicio = new Date(semestre.inicio).getFullYear();
        
        document.getElementById('edit-id').value = semestre.id;
        document.getElementById('edit-ano').value = anoInicio;
        document.getElementById('edit-periodo').value = semestre.periodo;
        document.getElementById('edit-inicio').value = semestre.inicio;
        document.getElementById('edit-fim').value = semestre.fim;
        document.getElementById('edit-status').value = semestre.status;
        document.getElementById('edit-curso').value = semestre.curso;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function fecharModalEditarSemestre() {
        const modal = document.getElementById('modal-editar-semestre');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.getElementById('form-editar-semestre').reset();
    }

    // Funções para controle do Modal de Deleção
    function abrirModalConfirmarDelecao(semestre) {
        const modal = document.getElementById('modal-confirmar-delecao');
        const semestreDelete = document.getElementById('semestre-delete');
        
        semestreDelete.textContent = `${semestre.ano} - ${semestre.periodo}º Semestre (${semestre.curso})`;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        modal.dataset.semestreId = semestre.id;
    }

    function fecharModalConfirmarDelecao() {
        const modal = document.getElementById('modal-confirmar-delecao');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Event Listeners
    searchInput.addEventListener("input", (e) => {
        searchSemestres(e.target.value);
    });
    
    addSemestreBtn.addEventListener("click", abrirModalAdicionarSemestre);
    
    // Event Listeners para o Modal de Adição
    document.querySelector('#modal-adicionar-semestre .close-modal').addEventListener('click', fecharModalAdicionarSemestre);
    document.getElementById('cancelar-adicionar').addEventListener('click', fecharModalAdicionarSemestre);
    
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

    // Função para validar o formulário de adição
    function validarFormularioSemestre() {
        let isValid = true;
        const ano = document.getElementById('ano').value.trim();
        const periodo = document.getElementById('periodo').value.trim();
        const inicio = document.getElementById('inicio').value.trim();
        const fim = document.getElementById('fim').value.trim();
        const status = document.getElementById('status').value.trim();
        const curso = document.getElementById('curso').value.trim();
        
        // Limpar erros anteriores
        clearError('ano');
        clearError('periodo');
        clearError('inicio');
        clearError('fim');
        clearError('status');
        clearError('curso');
        
        if (!ano || isNaN(ano) || ano < 2024 || ano > 2100) {
            showError('ano', 'Por favor, preencha um ano válido (2024-2100)');
            isValid = false;
        }
        
        if (!periodo) {
            showError('periodo', 'Por favor, selecione o período');
            isValid = false;
        }
        
        if (!inicio) {
            showError('inicio', 'Por favor, selecione a data de início');
            isValid = false;
        }
        
        if (!fim) {
            showError('fim', 'Por favor, selecione a data de término');
            isValid = false;
        }
        
        if (!status) {
            showError('status', 'Por favor, selecione o status');
            isValid = false;
        }
        
        if (!curso) {
            showError('curso', 'Por favor, selecione o curso');
            isValid = false;
        }
        
        return isValid;
    }

    // Função para validar o formulário de edição
    function validarFormularioEdicao() {
        let isValid = true;
        const ano = document.getElementById('edit-ano').value.trim();
        const periodo = document.getElementById('edit-periodo').value.trim();
        const inicio = document.getElementById('edit-inicio').value.trim();
        const fim = document.getElementById('edit-fim').value.trim();
        const status = document.getElementById('edit-status').value.trim();
        const curso = document.getElementById('edit-curso').value.trim();
        
        // Limpar erros anteriores
        clearError('edit-ano');
        clearError('edit-periodo');
        clearError('edit-inicio');
        clearError('edit-fim');
        clearError('edit-status');
        clearError('edit-curso');
        
        if (!ano || isNaN(ano) || ano < 2024 || ano > 2100) {
            showError('edit-ano', 'Por favor, preencha um ano válido (2024-2100)');
            isValid = false;
        }
        
        if (!periodo) {
            showError('edit-periodo', 'Por favor, selecione o período');
            isValid = false;
        }
        
        if (!inicio) {
            showError('edit-inicio', 'Por favor, selecione a data de início');
            isValid = false;
        }
        
        if (!fim) {
            showError('edit-fim', 'Por favor, selecione a data de término');
            isValid = false;
        }
        
        if (!status) {
            showError('edit-status', 'Por favor, selecione o status');
            isValid = false;
        }
        
        if (!curso) {
            showError('edit-curso', 'Por favor, selecione o curso');
            isValid = false;
        }
        
        return isValid;
    }

    // Função para limpar formulário
    function limparFormularioSemestre() {
        const form = document.getElementById('form-adicionar-semestre');
        form.reset();
        clearError('ano');
        clearError('periodo');
        clearError('inicio');
        clearError('fim');
        clearError('status');
        clearError('curso');
    }

    // Atualizar a função de salvar semestre
    document.getElementById('salvar-semestre').addEventListener('click', function() {
        if (!validarFormularioSemestre()) {
            return;
        }
        
        const form = document.getElementById('form-adicionar-semestre');
        const formData = new FormData(form);
        
        const novoSemestre = {
            id: Date.now(),
            periodo: parseInt(formData.get('periodo')),
            inicio: formData.get('inicio'),
            fim: formData.get('fim'),
            status: formData.get('status'),
            curso: formData.get('curso'),
            disciplinas: 0
        };
        
        semestres.push(novoSemestre);
        renderSemestres();
        fecharModalAdicionarSemestre();
    });
    
    // Event Listeners para o Modal de Edição
    document.querySelector('#modal-editar-semestre .close-modal').addEventListener('click', fecharModalEditarSemestre);
    document.getElementById('cancelar-editar').addEventListener('click', fecharModalEditarSemestre);
    
    document.getElementById('salvar-edicao').addEventListener('click', function() {
        if (!validarFormularioEdicao()) {
            return;
        }

        const form = document.getElementById('form-editar-semestre');
        const formData = new FormData(form);
        const id = parseInt(formData.get('id'));
        
        const semestreIndex = semestres.findIndex(s => s.id === id);
        if (semestreIndex !== -1) {
            semestres[semestreIndex] = {
                ...semestres[semestreIndex],
                periodo: parseInt(formData.get('periodo')),
                inicio: formData.get('inicio'),
                fim: formData.get('fim'),
                status: formData.get('status'),
                curso: formData.get('curso')
            };
            
            renderSemestres();
            fecharModalEditarSemestre();
        }
    });
    
    // Event Listeners para o Modal de Deleção
    document.querySelector('#modal-confirmar-delecao .close-modal').addEventListener('click', fecharModalConfirmarDelecao);
    document.getElementById('cancelar-delecao').addEventListener('click', fecharModalConfirmarDelecao);
    
    document.getElementById('confirmar-delecao').addEventListener('click', function() {
        const modal = document.getElementById('modal-confirmar-delecao');
        const semestreId = parseInt(modal.dataset.semestreId);
        
        semestres = semestres.filter(s => s.id !== semestreId);
        renderSemestres();
        fecharModalConfirmarDelecao();
    });
    
    // Funções globais para edição e exclusão
    window.editSemestre = function(id) {
        const semestre = semestres.find(s => s.id === id);
        if (semestre) {
            abrirModalEditarSemestre(semestre);
        }
    };
    
    window.deleteSemestre = function(id) {
        const semestre = semestres.find(s => s.id === id);
        if (semestre) {
            abrirModalConfirmarDelecao(semestre);
        }
    };
    
    // Inicializar a página
    renderSemestres();
}); 