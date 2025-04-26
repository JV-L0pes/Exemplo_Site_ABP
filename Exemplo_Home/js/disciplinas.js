// Script específico para a página de Disciplinas
document.addEventListener("DOMContentLoaded", function() {
    // Elementos
    const disciplinasList = document.getElementById("disciplinas-list");
    const searchInput = document.getElementById("search-disciplina");
    const addDisciplinaBtn = document.getElementById("add-disciplina");
    
    // Dados simulados para demonstração
    const disciplinas = [
        { 
            id: 1, 
            nome: "Banco de Dados", 
            curso: "DSM", 
            semestre: 3, 
            aulas: 4, 
            tipo: "obrigatoria",
            professor: "Carlos Silva",
            cargaHoraria: 80
        },
        { 
            id: 2, 
            nome: "Engenharia de Software", 
            curso: "DSM", 
            semestre: 4, 
            aulas: 4, 
            tipo: "obrigatoria",
            professor: "Marina Santos",
            cargaHoraria: 80
        },
        { 
            id: 3, 
            nome: "Geomática", 
            curso: "GEO", 
            semestre: 2, 
            aulas: 4, 
            tipo: "obrigatoria",
            professor: "Rafael Pereira",
            cargaHoraria: 80
        },
        { 
            id: 4, 
            nome: "Programação Web", 
            curso: "DSM", 
            semestre: 3, 
            aulas: 4, 
            tipo: "eletiva",
            professor: "Lucia Mendes",
            cargaHoraria: 60
        }
    ];
    
    // Função para renderizar os cards de disciplinas
    function renderDisciplinas(disciplinasToRender = disciplinas) {
        disciplinasList.innerHTML = "";
        
        disciplinasToRender.forEach(disciplina => {
            const card = createDisciplinaCard(disciplina);
            disciplinasList.appendChild(card);
        });
    }
    
    // Função para criar um card de disciplina
    function createDisciplinaCard(disciplina) {
        const card = document.createElement("div");
        card.className = "disciplina-card";
        card.dataset.id = disciplina.id;
        
        // Definir classe de tipo
        let tipoClass = "";
        switch(disciplina.tipo) {
            case "obrigatoria": tipoClass = "tipo-obrigatoria"; break;
            case "eletiva": tipoClass = "tipo-eletiva"; break;
            case "optativa": tipoClass = "tipo-optativa"; break;
        }
        
        card.innerHTML = `
            <div class="disciplina-header">
                <div class="disciplina-icon">
                    <i class="fas fa-laptop-code"></i>
                </div>
                <div class="disciplina-info">
                    <h3>${disciplina.nome}</h3>
                    <p>${disciplina.curso}</p>
                </div>
            </div>
            <div class="disciplina-details">
                <div class="disciplina-detail">
                    <span class="detail-label">Tipo</span>
                    <span class="detail-value">
                        <span class="disciplina-tipo ${tipoClass}">${disciplina.tipo.toUpperCase()}</span>
                    </span>
                </div>
                <div class="disciplina-detail">
                    <span class="detail-label">Semestre</span>
                    <span class="detail-value">${disciplina.semestre}º</span>
                </div>
                <div class="disciplina-detail">
                    <span class="detail-label">Professor</span>
                    <span class="detail-value">${disciplina.professor}</span>
                </div>
                <div class="disciplina-detail">
                    <span class="detail-label">Carga Horária</span>
                    <span class="detail-value">${disciplina.cargaHoraria}h</span>
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
    
    // Função para buscar disciplinas
    function searchDisciplinas(query) {
        const filteredDisciplinas = disciplinas.filter(disciplina => 
            disciplina.nome.toLowerCase().includes(query.toLowerCase()) ||
            disciplina.curso.toLowerCase().includes(query.toLowerCase()) ||
            disciplina.professor.toLowerCase().includes(query.toLowerCase())
        );
        
        renderDisciplinas(filteredDisciplinas);
    }
    
    // Event Listeners
    searchInput.addEventListener("input", (e) => {
        searchDisciplinas(e.target.value);
    });
    
    addDisciplinaBtn.addEventListener("click", () => {
        // Implementar lógica para adicionar nova disciplina
        console.log("Adicionar nova disciplina");
        console.log('Disciplina adicionada com sucesso!');
    });
    
    // Funções globais para edição e exclusão
    window.editDisciplina = function(id) {
        // Implementar lógica para editar disciplina
        console.log("Editar disciplina:", id);
    };
    
    window.deleteDisciplina = function(id) {
        // Implementar lógica para excluir disciplina
        console.log("Excluir disciplina:", id);
        console.log('Disciplina removida com sucesso!');
    };
    
    // Inicializar a página
    renderDisciplinas();
    
    // Função para atualizar acessos recentes
    function updateRecentAccess(section) {
        // Implementação temporária - pode ser expandida posteriormente
        console.log(`Acesso à seção: ${section}`);
    }
    
    // Atualizar acessos recentes
    updateRecentAccess('disciplinas');
}); 