import * as fetchCursos  from './fetchFunctions/fetchCursos.js';

// Script específico para a página de Cursos
document.addEventListener("DOMContentLoaded", function() {

    // Inicializar a página
    
    let cursos = initializeCursos();
    
    // Elementos
    const cursosList = document.getElementById("cursos-list");
    const searchInput = document.getElementById("search-curso");
    const addCursoBtn = document.getElementById("add-curso");
    
    // Lista de coordenadores
    const coordenadores = [
        "João Silva",
        "Maria Santos",
        "Pedro Oliveira",
        "Ana Costa",
        "Carlos Pereira",
        "Lucia Mendes",
        "Rafael Souza",
        "Juliana Lima"
    ];

    // Mapeamento de nomes de cursos para siglas
    const cursoParaSigla = {
        "Desenvolvimento de Software Multiplataforma": "Dsm",
        "Geoprocessamento": "Geo",
        "Meio Ambiente e Recursos Hídricos": "Mrh"
    };

    // Função para sincronizar a sigla com o nome do curso
    function sincronizarSigla(nomeSelect, siglaSelect) {
        const nomeCurso = nomeSelect.value;
        const sigla = cursoParaSigla[nomeCurso] || "";
        siglaSelect.value = sigla;
        
        // Atualizar validação
        if (sigla) {
            showSuccess(siglaSelect);
        }
    }

    // Event listeners para sincronização de siglas
    document.getElementById('nome').addEventListener('change', function() {
        sincronizarSigla(this, document.getElementById('sigla'));
    });

    document.getElementById('edit-nome').addEventListener('change', function() {
        sincronizarSigla(this, document.getElementById('edit-sigla'));
    });

    // Função para preencher os selects de coordenadores
    function preencherSelectCoordenadores() {
        const selectAdicionar = document.getElementById('coordenador');
        const selectEditar = document.getElementById('edit-coordenador');
        
        coordenadores.forEach(coordenador => {
            const option = document.createElement('option');
            option.value = coordenador;
            option.textContent = coordenador;
            
            selectAdicionar.appendChild(option.cloneNode(true));
            selectEditar.appendChild(option);
        });
    }
    
    async function initializeCursos(){
        let cursos = await fetchCursos.getCursos(); // Aguarda o resultado da função async
        if (cursos) {
            renderCursos(cursos); // Chama renderCursos com os dados
        } else {
            console.error('Token inválido');
        }
        return cursos;
    }

    // Dados simulados para demonstração
    /*[
        { 
            id: 1, 
            nome: "Desenvolvimento de&nbsp;Software&nbsp;Multiplataforma",
            sigla: "DSM",
            tipo: "Nível Superior",
            semestres: 6,
            coordenador: "João Silva",
            alunos: 150
        },
        { 
            id: 2, 
            nome: "Geoprocessamento",
            sigla: "GEO",
            tipo: "Nível Superior",
            semestres: 6,
            coordenador: "Maria Santos",
            alunos: 120
        },
        { 
            id: 3, 
            nome: "Meio Ambiente e Recursos Hídricos",
            sigla: "MAR",
            tipo: "Nível Superior",
            semestres: 6,
            coordenador: "Pedro Oliveira",
            alunos: 100
        }
    ];*/
    
    // Função para renderizar os cards de cursos
    function renderCursos(cursosToRender = cursos) {
        cursosList.innerHTML = "";
        
        cursosToRender.forEach(curso => {
            const card = createCursoCard(curso);
            cursosList.appendChild(card);
        });
    }
    
    // Função para criar um card de curso
    function createCursoCard(curso) {
        const card = document.createElement("div");
        card.className = "curso-card";
        card.dataset.id = curso.id;
        
        // Definir classe do curso
        let cursoClass = "";
        switch(curso.sigla) {
            case "Dsm": cursoClass = "curso-dsm"; break;
            case "Geo": cursoClass = "curso-geo"; break;
            case "Mrh": cursoClass = "curso-mrh"; break;
        }
        
        card.innerHTML = `
            <div class="curso-header">
                <div class="curso-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="curso-info ${curso.sigla === 'Geo' ? 'geo-title' : ''} ${curso.sigla === 'Dsm' ? 'dsm-title' : ''} ${curso.sigla === 'Mrh' ? 'mrh-title' : ''}">
                    <h3>${curso.nome}</h3>
                    <div class="curso-badges">
                        <span class="curso-sigla ${cursoClass}">${curso.sigla}</span>
                        <span class="curso-tipo">Nível Superior</span>
                    </div>
                    <p class="semestres"> 6 semestres</p>
                    <p class="coordenador">${curso.coordenador}</p>
                </div>
            </div>
            <div class="curso-actions">
                <button class="btn-edit" onclick="editCurso(${curso.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" onclick="deleteCurso(${curso.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        
        return card;
    }
    
    // Função para buscar cursos
    function searchCursos(query) {
        const filteredCursos = cursos.filter(curso => 
            curso.nome.toLowerCase().includes(query.toLowerCase()) ||
            curso.sigla.toLowerCase().includes(query.toLowerCase()) ||
            curso.coordenador.toLowerCase().includes(query.toLowerCase())
        );
        
        renderCursos(filteredCursos);
    }

    // Funções para controle do Modal de Adição
    function abrirModalAdicionarCurso() {
        const modal = document.getElementById('modal-adicionar-curso');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function fecharModalAdicionarCurso() {
        const modal = document.getElementById('modal-adicionar-curso');
        const form = document.getElementById('form-adicionar-curso');
        
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        form.reset();
        limparValidacoes(form);
    }

    // Event Listeners para o modal de adicionar
    document.querySelector('#modal-adicionar-curso .close-modal').addEventListener('click', fecharModalAdicionarCurso);
    document.getElementById('cancelar-adicionar').addEventListener('click', fecharModalAdicionarCurso);

    // Funções para controle do Modal de Edição
    function abrirModalEditarCurso(curso) {
        const modal = document.getElementById('modal-editar-curso');
        const form = document.getElementById('form-editar-curso');
        
        document.getElementById('edit-id').value = curso.id;
        document.getElementById('edit-nome').value = curso.nome;
        document.getElementById('edit-sigla').value = curso.sigla;
        document.getElementById('edit-coordenador').value = curso.coordenador;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function fecharModalEditarCurso() {
        const modal = document.getElementById('modal-editar-curso');
        const form = document.getElementById('form-editar-curso');
        
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        form.reset();
        limparValidacoes(form);
    }

    // Event Listeners para o modal de editar
    document.querySelector('#modal-editar-curso .close-modal').addEventListener('click', fecharModalEditarCurso);
    document.getElementById('cancelar-editar').addEventListener('click', fecharModalEditarCurso);

    // Funções para controle do Modal de Deleção
    function abrirModalConfirmarDelecao(curso) {
        const modal = document.getElementById('modal-confirmar-delecao');
        const cursoDelete = document.getElementById('curso-delete');
        
        cursoDelete.textContent = `${curso.nome} (${curso.sigla})`;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        modal.dataset.cursoId = curso.id;
    }

    function fecharModalConfirmarDelecao() {
        const modal = document.getElementById('modal-confirmar-delecao');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Event Listeners
    searchInput.addEventListener("input", (e) => {
        searchCursos(e.target.value);
    });
    
    addCursoBtn.addEventListener("click", abrirModalAdicionarCurso);
    
    // Funções de validação
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        
        formGroup.className = 'form-group error';
        errorDisplay.textContent = message;
    }

    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.className = 'form-group success';
    }

    function validateField(input, fieldName) {
        if (input.value.trim() === '') {
            showError(input, `${fieldName} não pode ficar vazio`);
            return false;
        }
        showSuccess(input);
        return true;
    }

    function validateForm(form) {
        let isValid = true;
        
        const nome = form.querySelector('[name="nome"]');
        const sigla = form.querySelector('[name="sigla"]');
        const coordenador = form.querySelector('[name="coordenador"]');

        if (!validateField(nome, 'Nome do curso')) isValid = false;
        if (!validateField(sigla, 'Sigla')) isValid = false;
        if (!validateField(coordenador, 'Coordenador')) isValid = false;

        return isValid;
    }

    // Event Listeners para o Modal de Adição
    document.getElementById('salvar-curso').addEventListener('click', function(e) {
        e.preventDefault();
        const form = document.getElementById('form-adicionar-curso');
        
        if (validateForm(form)) {
            const formData = new FormData(form);
            
            const novoCurso = {
                id: Date.now(),
                nome: formData.get('nome'),
                sigla: formData.get('sigla'),
                tipo: formData.get('tipo'),
                semestres: parseInt(formData.get('semestres')),
                coordenador: formData.get('coordenador'),
                alunos: 0
            };
            
            cursos.push(novoCurso);
            renderCursos();
            fecharModalAdicionarCurso();
        }
    });

    // Event Listeners para o Modal de Edição
    document.getElementById('salvar-edicao').addEventListener('click', function(e) {
        e.preventDefault();
        const form = document.getElementById('form-editar-curso');
        
        if (validateForm(form)) {
            const formData = new FormData(form);
            const id = parseInt(formData.get('id'));
            
            const cursoIndex = cursos.findIndex(c => c.id === id);
            if (cursoIndex !== -1) {
                cursos[cursoIndex] = {
                    ...cursos[cursoIndex],
                    nome: formData.get('nome'),
                    sigla: formData.get('sigla'),
                    tipo: formData.get('tipo'),
                    semestres: parseInt(formData.get('semestres')),
                    coordenador: formData.get('coordenador')
                };
                
                renderCursos();
                fecharModalEditarCurso();
            }
        }
    });

    // Event Listeners para o Modal de Deleção
    document.querySelector('#modal-confirmar-delecao .close-modal').addEventListener('click', fecharModalConfirmarDelecao);
    document.getElementById('cancelar-delecao').addEventListener('click', fecharModalConfirmarDelecao);
    
    document.getElementById('confirmar-delecao').addEventListener('click', function() {
        const modal = document.getElementById('modal-confirmar-delecao');
        const cursoId = parseInt(modal.dataset.cursoId);
        
        cursos = cursos.filter(c => c.id !== cursoId);
        renderCursos();
        fecharModalConfirmarDelecao();
    });
    
    // Funções globais para edição e exclusão
    window.editCurso = async function(id) {
        
        if (id) {
            abrirModalEditarCurso(id);
        }
    };
    
    window.deleteCurso = function(id) {
        const curso = cursos.find(c => c.id === id);
        if (curso) {
            abrirModalConfirmarDelecao(curso);
        }
    };
    
    // Limpar validações ao fechar os modais
    function limparValidacoes(form) {
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.className = 'form-group';
            const errorDisplay = group.querySelector('.error-message');
            if (errorDisplay) {
                errorDisplay.textContent = '';
            }
        });
    }
    preencherSelectCoordenadores();
    
}); 