// Script específico para a página de Cursos
document.addEventListener("DOMContentLoaded", function() {
    // Elementos
    const cursosList = document.getElementById("cursos-list");
    const searchInput = document.getElementById("search-curso");
    const addCursoBtn = document.getElementById("add-curso");
    
    // Dados simulados para demonstração
    const cursos = [
        { 
            id: 1, 
            nome: "Desenvolvimento de Software Multiplataforma", 
            sigla: "DSM", 
            tipo: "superior",
            semestres: 6, 
            coordenador: "Carlos Eduardo",
            alunos: 120,
            disciplinas: 24
        },
        { 
            id: 2, 
            nome: "Geoprocessamento", 
            sigla: "GEO", 
            tipo: "superior",
            semestres: 6, 
            coordenador: "Ana Maria Souza",
            alunos: 80,
            disciplinas: 24
        },
        { 
            id: 3, 
            nome: "Meio Ambiente e Recursos Hídricos", 
            sigla: "MAR", 
            tipo: "superior",
            semestres: 6, 
            coordenador: "Roberto Mendes",
            alunos: 60,
            disciplinas: 24
        },
        { 
            id: 4, 
            nome: "Técnico em Informática", 
            sigla: "TIN", 
            tipo: "tecnico",
            semestres: 3, 
            coordenador: "Maria Silva",
            alunos: 40,
            disciplinas: 12
        }
    ];
    
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
        
        // Definir classe de tipo
        let tipoClass = "";
        switch(curso.tipo) {
            case "tecnico": tipoClass = "tipo-tecnico"; break;
            case "superior": tipoClass = "tipo-superior"; break;
            case "pos": tipoClass = "tipo-pos"; break;
        }
        
        card.innerHTML = `
            <div class="curso-header">
                <div class="curso-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="curso-info">
                    <h3>${curso.nome}</h3>
                    <p>${curso.sigla}</p>
                </div>
            </div>
            <div class="curso-details">
                <div class="curso-detail">
                    <span class="detail-label">Tipo</span>
                    <span class="detail-value">
                        <span class="curso-tipo ${tipoClass}">${curso.tipo.toUpperCase()}</span>
                    </span>
                </div>
                <div class="curso-detail">
                    <span class="detail-label">Coordenador</span>
                    <span class="detail-value">${curso.coordenador}</span>
                </div>
                <div class="curso-detail">
                    <span class="detail-label">Semestres</span>
                    <span class="detail-value">${curso.semestres}</span>
                </div>
                <div class="curso-detail">
                    <span class="detail-label">Alunos</span>
                    <span class="detail-value">${curso.alunos}</span>
                </div>
                <div class="curso-detail">
                    <span class="detail-label">Disciplinas</span>
                    <span class="detail-value">${curso.disciplinas}</span>
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
    
    // Event Listeners
    searchInput.addEventListener("input", (e) => {
        searchCursos(e.target.value);
    });
    
    addCursoBtn.addEventListener("click", () => {
        // Implementar lógica para adicionar novo curso
        console.log("Adicionar novo curso");
    });
    
    // Funções globais para edição e exclusão
    window.editCurso = function(id) {
        // Implementar lógica para editar curso
        console.log("Editar curso:", id);
    };
    
    window.deleteCurso = function(id) {
        // Implementar lógica para excluir curso
        console.log("Excluir curso:", id);
    };
    
    // Inicializar a página
    renderCursos();
}); 