// Inicializar IRONGATE
if (typeof IRONGATE === 'function') {
    IRONGATE();
}

// Importando as funções do fetchSemestres.js
import { getSemestres, createSemestre, updateSemestre, deleteSemestre } from './fetchFunctions/fetchSemestres.js';
import { showToast } from './toast.js';

let semestres = [];
let semestreEditando = null;

// Função para carregar dados do backend
async function carregarDados() {
    try {
        const data = await getSemestres();
        if (!data) {
            console.warn('Nenhum dado retornado do servidor, inicializando array vazio');
            semestres = [];
        } else {
            semestres = data;
        }
        renderSemestres();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showToast('Erro ao carregar dados. Por favor, verifique sua conexão e tente novamente.', 'error');
        // Redirecionar para login se o token estiver inválido
        if (error.message.includes('Token inválido') || error.message.includes('não autorizado')) {
            window.location.href = '../login.html';
        }
    }
}

// Função para renderizar os semestres
function renderSemestres() {
    const semestresList = document.getElementById('semestres-list');
    if (!semestresList) return;

    semestresList.innerHTML = '';

    semestres.forEach(semestre => {
        const card = createSemestreCard(semestre);
        semestresList.appendChild(card);
    });

    // Adiciona os event listeners após renderizar os cards
    semestresList.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => {
            const semestreId = parseInt(button.dataset.semestreId);
            const semestre = semestres.find(s => s.id_semestre_cronograma === semestreId);
            if (semestre) {
                abrirModalEditarSemestre(semestre);
            }
        });
    });

    semestresList.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            const semestreId = parseInt(button.dataset.semestreId);
            const semestre = semestres.find(s => s.id_semestre_cronograma === semestreId);
            if (semestre) {
                abrirModalConfirmarDelecao(semestre);
            }
        });
    });
}

// Função para criar o card do semestre
function createSemestreCard(semestre) {
    const card = document.createElement('div');
    card.className = 'semestre-card';

    const ano = semestre.ano_semestre_cronograma || '';
    const nivel = semestre.nivel_semestre_cronograma || '';
    const siglaCurso = semestre.sigla_curso || '';
    const nomeTurno = semestre.nome_turno || '';

    // Definir classes de cor para badges
    let badgeCursoClass = '';
    switch (siglaCurso.toLowerCase()) {
        case 'dsm': badgeCursoClass = 'badge-dsm'; break;
        case 'geo': badgeCursoClass = 'badge-geo'; break;
        case 'mar': badgeCursoClass = 'badge-mar'; break;
        default: badgeCursoClass = 'badge-default'; break;
    }
    let badgeTurnoClass = '';
    switch (nomeTurno.toLowerCase()) {
        case 'noturno': badgeTurnoClass = 'badge-noturno'; break;
        case 'matutino': badgeTurnoClass = 'badge-matutino'; break;
        case 'vespertino': badgeTurnoClass = 'badge-vespertino'; break;
        default: badgeTurnoClass = 'badge-default'; break;
    }

    card.innerHTML = `
        <div class="semestre-header">
            <div class="semestre-icon">
                <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="semestre-info">
                <h3>${ano} - ${nivel}º Nível</h3>
                <div style="margin-bottom: 6px;">
                    <span class="badge ${badgeCursoClass}">${siglaCurso}</span>
                    <span class="badge ${badgeTurnoClass}">${nomeTurno}</span>
                </div>
            </div>
        </div>
        <div class="semestre-details">
            <div class="semestre-detail">
                <span class="detail-label">Ano</span>
                <span class="detail-value">${ano}</span>
            </div>
            <div class="semestre-detail">
                <span class="detail-label">Nível</span>
                <span class="detail-value">${nivel}</span>
            </div>
        </div>
        <div class="semestre-actions">
            <button class="btn-edit" data-semestre-id="${semestre.id_semestre_cronograma}">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn-delete" data-semestre-id="${semestre.id_semestre_cronograma}">
                <i class="fas fa-trash"></i> Excluir
            </button>
        </div>
    `;
    return card;
}

// Função para salvar semestre
async function salvarSemestre() {
    try {
        if (!validarFormularioSemestre()) return;

        const form = document.getElementById('form-adicionar-semestre');
        const formData = new FormData(form);

        const novoSemestre = {
            ano: parseInt(formData.get('ano')),
            nivel: parseInt(formData.get('nivel')),
            id_curso: parseInt(formData.get('id_curso')),
            id_turno: parseInt(formData.get('id_turno'))
        };

        const result = await createSemestre(novoSemestre);
        if (result) {
            await carregarDados();
            fecharModalAdicionarSemestre();
            showToast('Semestre adicionado com sucesso!', 'success');
            limparFormularioSemestre();
        } else {
            showToast('Erro ao adicionar semestre. Por favor, tente novamente.', 'error');
        }
    } catch (error) {
        showToast('Erro ao adicionar semestre. Por favor, tente novamente.', 'error');
    }
}

// Função para atualizar semestre
async function atualizarSemestre() {
    try {
        if (!validarFormularioEdicao()) return;

        const form = document.getElementById('form-editar-semestre');
        const formData = new FormData(form);

        const semestreAtualizado = {
            id: parseInt(formData.get('id')),
            ano: parseInt(formData.get('ano')),
            nivel: parseInt(formData.get('nivel')),
            id_curso: parseInt(formData.get('id_curso')),
            id_turno: parseInt(formData.get('id_turno'))
        };

        const result = await updateSemestre(semestreAtualizado);
        if (result) {
            await carregarDados();
            fecharModalEditarSemestre();
            showToast('Semestre atualizado com sucesso!', 'success');
        } else {
            showToast('Erro ao atualizar semestre. Por favor, tente novamente.', 'error');
        }
    } catch (error) {
        showToast('Erro ao atualizar semestre. Por favor, tente novamente.', 'error');
    }
}

// Função para deletar semestre
async function deletarSemestre(id) {
    try {
        const response = await deleteSemestre(id);

        if (response.status === 200) {
            fecharModalConfirmarDelecao();
            semestres = semestres.filter(s => s.id !== id);
            renderSemestres();
            showToast('Semestre excluído com sucesso!', 'success');
            await carregarDados();
        } else {
            showToast('Erro ao excluir semestre. Por favor, tente novamente.', 'error');
        }
    } catch (error) {
        showToast('Erro ao excluir semestre. Por favor, tente novamente.', 'error');
    }
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

    document.getElementById('edit-id').value = semestre.id;
    document.getElementById('edit-ano').value = semestre.ano;
    document.getElementById('edit-nivel').value = semestre.nivel;
    document.getElementById('edit-id_curso').value = semestre.id_curso;
    document.getElementById('edit-id_turno').value = semestre.id_turno;

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
    semestreDelete.textContent = `Tem certeza que deseja excluir o semestre ${semestre.ano_semestre_cronograma} - ${semestre.nivel_semestre_cronograma}º Nível (Curso: ${semestre.sigla_curso})?\n\nEsta ação não pode ser desfeita!`;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    modal.dataset.semestreId = semestre.id_semestre_cronograma;
}

function fecharModalConfirmarDelecao() {
    const modal = document.getElementById('modal-confirmar-delecao');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Função para buscar semestres
function searchSemestres(query) {
    const filteredSemestres = semestres.filter(semestre => 
        semestre.ano.toString().includes(query) ||
        semestre.nivel.toString().includes(query) ||
        semestre.status.toLowerCase().includes(query.toLowerCase()) ||
        semestre.id_curso.toString().includes(query)
    );
    
    renderSemestres(filteredSemestres);
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
    if (element) element.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// Função para validar o formulário de adição
function validarFormularioSemestre() {
    let isValid = true;
    const ano = document.getElementById('ano').value.trim();
    const nivel = document.getElementById('nivel').value.trim();
    const id_curso = document.getElementById('id_curso').value.trim();
    const id_turno = document.getElementById('id_turno').value.trim();

    clearError('ano');
    clearError('nivel');
    clearError('id_curso');
    clearError('id_turno');

    if (!ano || isNaN(ano) || ano < 2024 || ano > 2100) {
        showError('ano', 'Por favor, preencha um ano válido (2024-2100)');
        isValid = false;
    }
    if (!nivel) {
        showError('nivel', 'Por favor, preencha o nível');
        isValid = false;
    }
    if (!id_curso) {
        showError('id_curso', 'Por favor, selecione o curso');
        isValid = false;
    }
    if (!id_turno) {
        showError('id_turno', 'Por favor, selecione o turno');
        isValid = false;
    }
    return isValid;
}

// Função para validar o formulário de edição
function validarFormularioEdicao() {
    let isValid = true;
    const ano = document.getElementById('edit-ano').value.trim();
    const nivel = document.getElementById('edit-nivel').value.trim();
    const id_curso = document.getElementById('edit-id_curso').value.trim();
    const id_turno = document.getElementById('edit-id_turno').value.trim();

    clearError('edit-ano');
    clearError('edit-nivel');
    clearError('edit-id_curso');
    clearError('edit-id_turno');

    if (!ano || isNaN(ano) || ano < 2024 || ano > 2100) {
        showError('edit-ano', 'Por favor, preencha um ano válido (2024-2100)');
        isValid = false;
    }
    if (!nivel) {
        showError('edit-nivel', 'Por favor, preencha o nível');
        isValid = false;
    }
    if (!id_curso) {
        showError('edit-id_curso', 'Por favor, selecione o curso');
        isValid = false;
    }
    if (!id_turno) {
        showError('edit-id_turno', 'Por favor, selecione o turno');
        isValid = false;
    }
    return isValid;
}

// Função para limpar formulário
function limparFormularioSemestre() {
    const form = document.getElementById('form-adicionar-semestre');
    form.reset();
    clearError('ano');
    clearError('nivel');
    clearError('id_curso');
    clearError('id_turno');
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    
    // Event listeners para os botões
    document.getElementById('add-semestre')?.addEventListener('click', abrirModalAdicionarSemestre);
    document.getElementById('salvar-semestre')?.addEventListener('click', salvarSemestre);
    document.getElementById('salvar-edicao')?.addEventListener('click', atualizarSemestre);
    
    // Event listeners para os modais
    document.querySelector('#modal-adicionar-semestre .close-modal')?.addEventListener('click', fecharModalAdicionarSemestre);
    document.querySelector('#modal-editar-semestre .close-modal')?.addEventListener('click', fecharModalEditarSemestre);
    document.querySelector('#modal-confirmar-delecao .close-modal')?.addEventListener('click', fecharModalConfirmarDelecao);
    document.getElementById('cancelar-adicionar')?.addEventListener('click', fecharModalAdicionarSemestre);
    document.getElementById('cancelar-editar')?.addEventListener('click', fecharModalEditarSemestre);
    document.getElementById('cancelar-delecao')?.addEventListener('click', fecharModalConfirmarDelecao);
    document.getElementById('confirmar-delecao')?.addEventListener('click', function() {
        const modal = document.getElementById('modal-confirmar-delecao');
        const semestreId = parseInt(modal.dataset.semestreId);
        deletarSemestre(semestreId);
    });
    
    // Event listener para busca
    document.getElementById('search-semestre')?.addEventListener('input', (e) => {
        searchSemestres(e.target.value);
    });
}); 