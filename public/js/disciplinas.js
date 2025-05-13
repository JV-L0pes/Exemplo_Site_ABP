import { getDisciplinas, createDisciplina, updateDisciplina, deleteDisciplina } from './fetchFunctions/fetchDisciplinas.js';

// Inicializar IRONGATE
if (typeof IRONGATE === 'function') {
    IRONGATE();
}

// Script específico para a página de Disciplinas
document.addEventListener("DOMContentLoaded", function() {
    // Elementos
    const disciplinasList = document.getElementById("disciplinas-list");
    const searchInput = document.getElementById("search-disciplina");
    const addDisciplinaBtn = document.getElementById("add-disciplina");
    
    // Lista de professores
    const professores = [
        "João Silva",
        "Maria Santos",
        "Pedro Oliveira",
        "Ana Costa",
        "Carlos Pereira",
        "Lucia Mendes",
        "Rafael Souza",
        "Juliana Lima"
    ];

    // Função para preencher os selects de professores
    function preencherSelectProfessores() {
        const selectAdicionar = document.getElementById('professor');
        const selectEditar = document.getElementById('edit-professor');
        
        professores.forEach(professor => {
            const option = document.createElement('option');
            option.value = professor;
            option.textContent = professor;
            
            selectAdicionar.appendChild(option.cloneNode(true));
            selectEditar.appendChild(option);
        });
    }
    
    // Remover array simulado
    let disciplinas = [];

    // Buscar disciplinas reais do backend ao carregar a página
    async function carregarDisciplinas() {
        try {
            const data = await getDisciplinas();
            // Se o backend retorna { data: [...] }
            disciplinas = data.data || data;
            renderDisciplinas(disciplinas);
        } catch (error) {
            console.error('Erro ao carregar disciplinas:', error);
            disciplinasList.innerHTML = '<p class="erro">Erro ao carregar disciplinas.</p>';
        }
    }
    
    // Função para renderizar os cards de disciplinas
    function renderDisciplinas(disciplinasToRender = disciplinas) {
        disciplinasList.innerHTML = "";
        disciplinasToRender.forEach(disciplina => {
            // Badge de curso
            let badgeClass = '';
            let cursoLabel = (disciplina.sigla_curso || '').toUpperCase();
            switch (cursoLabel) {
                case 'DSM': badgeClass = 'badge-dsm'; break;
                case 'GEO': badgeClass = 'badge-geo'; break;
                case 'MAR': badgeClass = 'badge-mar'; break;
                default: badgeClass = 'badge-dsm'; // fallback
            }
            const card = document.createElement('div');
            card.className = 'disciplina-card';
            card.innerHTML = `
                <div class="disciplina-header">
                    <span class="badge ${badgeClass}">${cursoLabel}</span>
                    <h3>${disciplina.nome_disciplina}</h3>
                </div>
                <div class="disciplina-info">
                    <p><i class="fas fa-user"></i> ${disciplina.nome_docente}</p>
                    <p><i class="fas fa-hashtag"></i> ID: ${disciplina.id_disciplina}</p>
                </div>
                <div class="disciplina-actions">
                    <button class="btn-edit" title="Editar"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn-delete" title="Excluir"><i class="fas fa-trash"></i> Excluir</button>
                </div>
            `;
            disciplinasList.appendChild(card);
        });
    }
    
    // Função para criar um card de disciplina
    function createDisciplinaCard(disciplina) {
        const card = document.createElement("div");
        card.className = "disciplina-card";
        card.dataset.id = disciplina.id;
        
        // Definir classe do curso
        let cursoClass = "";
        switch(disciplina.curso) {
            case "DSM": cursoClass = "curso-dsm"; break;
            case "GEO": cursoClass = "curso-geo"; break;
            case "MAR": cursoClass = "curso-mar"; break;
        }
        
        card.innerHTML = `
            <div class="disciplina-header">
                <div class="disciplina-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="disciplina-info">
                    <h3>${disciplina.nome}</h3>
                    <p class="professor">${disciplina.professor}</p>
                    <span class="disciplina-curso ${cursoClass}">${disciplina.curso}</span>
                </div>
            </div>
            <div class="disciplina-actions">
                <button class="btn-edit" onclick="editDisciplina(${disciplina.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" onclick="deleteDisciplina(${disciplina.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        
        return card;
    }
    
    // Adaptar busca para usar os dados reais
    function searchDisciplinas(query) {
        const filteredDisciplinas = disciplinas.filter(disciplina => 
            (disciplina.nome || '').toLowerCase().includes(query.toLowerCase()) ||
            (disciplina.codigo || '').toLowerCase().includes(query.toLowerCase()) ||
            (disciplina.curso || '').toLowerCase().includes(query.toLowerCase()) ||
            (disciplina.professor || '').toLowerCase().includes(query.toLowerCase())
        );
        renderDisciplinas(filteredDisciplinas);
    }

    // Funções para controle do Modal de Adição
    function abrirModalAdicionarDisciplina() {
        const modal = document.getElementById('modal-adicionar-disciplina');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function fecharModalAdicionarDisciplina() {
        const modal = document.getElementById('modal-adicionar-disciplina');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        limparFormularioDisciplina();
    }

    // Funções para controle do Modal de Edição
    function abrirModalEditarDisciplina(disciplina) {
        const modal = document.getElementById('modal-editar-disciplina');
        const form = document.getElementById('form-editar-disciplina');
        
        document.getElementById('edit-id').value = disciplina.id;
        document.getElementById('edit-nome').value = disciplina.nome;
        document.getElementById('edit-professor').value = disciplina.professor;
        document.getElementById('edit-curso').value = disciplina.curso;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function fecharModalEditarDisciplina() {
        const modal = document.getElementById('modal-editar-disciplina');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        limparFormularioEdicao();
    }

    // Funções para controle do Modal de Deleção
    function abrirModalConfirmarDelecao(disciplina) {
        const modal = document.getElementById('modal-confirmar-delecao');
        const disciplinaDelete = document.getElementById('disciplina-delete');
        
        disciplinaDelete.textContent = `${disciplina.nome} (${disciplina.codigo})`;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        modal.dataset.disciplinaId = disciplina.id;
    }

    function fecharModalConfirmarDelecao() {
        const modal = document.getElementById('modal-confirmar-delecao');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Event Listeners
    searchInput.addEventListener("input", (e) => {
        searchDisciplinas(e.target.value);
    });
    
    addDisciplinaBtn.addEventListener("click", abrirModalAdicionarDisciplina);
    
    // Event Listeners para o Modal de Adição
    document.querySelector('#modal-adicionar-disciplina .close-modal').addEventListener('click', fecharModalAdicionarDisciplina);
    document.getElementById('cancelar-adicionar').addEventListener('click', fecharModalAdicionarDisciplina);
    
    document.getElementById('salvar-disciplina').addEventListener('click', function() {
        if (!validarFormularioDisciplina()) {
            return;
        }

        const form = document.getElementById('form-adicionar-disciplina');
        const formData = new FormData(form);
        
        const novaDisciplina = {
            id: Date.now(),
            nome: formData.get('nome'),
            professor: formData.get('professor'),
            curso: formData.get('curso')
        };
        
        disciplinas.push(novaDisciplina);
        renderDisciplinas();
        fecharModalAdicionarDisciplina();
    });
    
    // Event Listeners para o Modal de Edição
    document.querySelector('#modal-editar-disciplina .close-modal').addEventListener('click', fecharModalEditarDisciplina);
    document.getElementById('cancelar-editar').addEventListener('click', fecharModalEditarDisciplina);
    
    document.getElementById('salvar-edicao').addEventListener('click', function() {
        if (!validarFormularioEdicao()) {
            return;
        }

        const form = document.getElementById('form-editar-disciplina');
        const formData = new FormData(form);
        const id = parseInt(formData.get('id'));
        
        const disciplinaIndex = disciplinas.findIndex(d => d.id === id);
        if (disciplinaIndex !== -1) {
            disciplinas[disciplinaIndex] = {
                ...disciplinas[disciplinaIndex],
                nome: formData.get('nome'),
                professor: formData.get('professor'),
                curso: formData.get('curso')
            };
            
            renderDisciplinas();
            fecharModalEditarDisciplina();
        }
    });
    
    // Event Listeners para o Modal de Deleção
    document.querySelector('#modal-confirmar-delecao .close-modal').addEventListener('click', fecharModalConfirmarDelecao);
    document.getElementById('cancelar-delecao').addEventListener('click', fecharModalConfirmarDelecao);
    
    document.getElementById('confirmar-delecao').addEventListener('click', function() {
        const modal = document.getElementById('modal-confirmar-delecao');
        const disciplinaId = parseInt(modal.dataset.disciplinaId);
        
        disciplinas = disciplinas.filter(d => d.id !== disciplinaId);
        renderDisciplinas();
        fecharModalConfirmarDelecao();
    });
    
    // Funções globais para edição e exclusão
    window.editDisciplina = function(id) {
        const disciplina = disciplinas.find(d => d.id === id);
        if (disciplina) {
            abrirModalEditarDisciplina(disciplina);
        }
    };
    
    window.deleteDisciplina = function(id) {
        const disciplina = disciplinas.find(d => d.id === id);
        if (disciplina) {
            abrirModalConfirmarDelecao(disciplina);
        }
    };
    
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
    function validarFormularioDisciplina() {
        let isValid = true;
        const nome = document.getElementById('nome').value.trim();
        const professor = document.getElementById('professor').value.trim();
        const curso = document.getElementById('curso').value.trim();
        
        // Limpar erros anteriores
        clearError('nome');
        clearError('professor');
        clearError('curso');
        
        if (!nome) {
            showError('nome', 'Por favor, preencha o nome da disciplina');
            isValid = false;
        }
        
        if (!professor) {
            showError('professor', 'Por favor, selecione um professor');
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
        const professor = document.getElementById('edit-professor').value.trim();
        const curso = document.getElementById('edit-curso').value.trim();
        
        // Limpar erros anteriores
        clearError('edit-nome');
        clearError('edit-professor');
        clearError('edit-curso');
        
        if (!nome) {
            showError('edit-nome', 'Por favor, preencha o nome da disciplina');
            isValid = false;
        }
        
        if (!professor) {
            showError('edit-professor', 'Por favor, selecione um professor');
            isValid = false;
        }
        
        if (!curso) {
            showError('edit-curso', 'Por favor, selecione um curso');
            isValid = false;
        }
        
        return isValid;
    }

    // Função para limpar formulário
    function limparFormularioDisciplina() {
        const form = document.getElementById('form-adicionar-disciplina');
        form.reset();
        clearError('nome');
        clearError('professor');
        clearError('curso');
    }

    // Função para limpar formulário de edição
    function limparFormularioEdicao() {
        const form = document.getElementById('form-editar-disciplina');
        form.reset();
        clearError('edit-nome');
        clearError('edit-professor');
        clearError('edit-curso');
    }

    // Atualizar a função de salvar disciplina
    function salvarDisciplina() {
        if (!validarFormularioDisciplina()) {
            return;
        }
        
        // ... resto do código de salvar ...
    }

    // Atualizar a função de salvar edição
    function salvarEdicao() {
        if (!validarFormularioEdicao()) {
            return;
        }
        
        // ... resto do código de salvar edição ...
    }
    
    // Inicializar a página
    preencherSelectProfessores();
    carregarDisciplinas();
}); 