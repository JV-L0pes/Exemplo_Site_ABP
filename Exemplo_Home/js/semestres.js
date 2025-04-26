// Script específico para a página de Semestres
document.addEventListener("DOMContentLoaded", function() {
    // Elementos
    const semestresList = document.getElementById("semestres-list");
    const searchInput = document.getElementById("search-semestre");
    const addSemestreBtn = document.getElementById("add-semestre");
    
    // Dados simulados para demonstração
    const semestres = [
        { 
            id: 1, 
            ano: 2025, 
            periodo: 1, 
            inicio: "2025-02-10", 
            fim: "2025-07-05",
            status: "ativo",
            disciplinas: 12,
            alunos: 150
        },
        { 
            id: 2, 
            ano: 2025, 
            periodo: 2, 
            inicio: "2025-08-05", 
            fim: "2025-12-15",
            status: "planejado",
            disciplinas: 12,
            alunos: 150
        },
        { 
            id: 3, 
            ano: 2024, 
            periodo: 2, 
            inicio: "2024-08-05", 
            fim: "2024-12-15",
            status: "concluido",
            disciplinas: 12,
            alunos: 150
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
        
        // Formatar datas
        const dataInicio = new Date(semestre.inicio).toLocaleDateString('pt-BR');
        const dataFim = new Date(semestre.fim).toLocaleDateString('pt-BR');
        
        card.innerHTML = `
            <div class="semestre-header">
                <div class="semestre-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="semestre-info">
                    <h3>${semestre.ano} - ${semestre.periodo}º Semestre</h3>
                    <p>
                        <span class="semestre-status ${statusClass}">${semestre.status.toUpperCase()}</span>
                    </p>
                </div>
            </div>
            <div class="semestre-details">
                <div class="semestre-detail">
                    <span class="detail-label">Início</span>
                    <span class="detail-value">${dataInicio}</span>
                </div>
                <div class="semestre-detail">
                    <span class="detail-label">Fim</span>
                    <span class="detail-value">${dataFim}</span>
                </div>
                <div class="semestre-detail">
                    <span class="detail-label">Disciplinas</span>
                    <span class="detail-value">${semestre.disciplinas}</span>
                </div>
                <div class="semestre-detail">
                    <span class="detail-label">Alunos</span>
                    <span class="detail-value">${semestre.alunos}</span>
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
            semestre.status.toLowerCase().includes(query.toLowerCase())
        );
        
        renderSemestres(filteredSemestres);
    }
    
    // Event Listeners
    searchInput.addEventListener("input", (e) => {
        searchSemestres(e.target.value);
    });
    
    addSemestreBtn.addEventListener("click", () => {
        // Implementar lógica para adicionar novo semestre
        console.log("Adicionar novo semestre");
    });
    
    // Funções globais para edição e exclusão
    window.editSemestre = function(id) {
        // Implementar lógica para editar semestre
        console.log("Editar semestre:", id);
    };
    
    window.deleteSemestre = function(id) {
        // Implementar lógica para excluir semestre
        console.log("Excluir semestre:", id);
    };
    
    // Inicializar a página
    renderSemestres();
}); 