/**
 * Script para o Painel Administrativo da FATEC
 */
document.addEventListener("DOMContentLoaded", function() {
    // Elementos
    const container = document.querySelector(".container");
    const sidebar = document.querySelector(".sidebar");
    const collapseBtn = document.getElementById("collapse-btn");
    const menuToggle = document.getElementById("toggle-menu");
    const submenuLinks = document.querySelectorAll(".has-submenu");
    const adminButtons = document.querySelectorAll(".admin-button");
    const entityContainer = document.getElementById("entity-container");
    const mapEditor = document.getElementById("map-editor");
    const entityTitle = document.getElementById("entity-title");
    const entityType = document.getElementById("entity-type");
    const entityList = document.getElementById("entity-list");
    const addEntityBtn = document.getElementById("add-entity");
    const searchInput = document.getElementById("search-entity");
    const modal = document.getElementById("entity-modal");
    const confirmModal = document.getElementById("confirm-modal");
    const modalAction = document.getElementById("modal-action");
    const modalEntityType = document.getElementById("modal-entity-type");
    const formContainer = document.querySelector(".form-container");
    const entityForm = document.getElementById("entity-form");
    const closeModalBtns = document.querySelectorAll(".close-modal");
    const cancelBtn = document.getElementById("btn-cancel");
    const cancelDeleteBtn = document.getElementById("btn-cancel-delete");
    const confirmDeleteBtn = document.getElementById("btn-confirm-delete");
    const breadcrumb = document.getElementById("current-section");
    
    // Dados simulados para demonstração
    const mockData = {
        docentes: [
            { id: 1, nome: "Carlos Silva", email: "carlos.silva@fatec.sp.gov.br", curso: "DSM", cor: "#E30613", disciplinas: ["Banco de Dados", "Engenharia de Software"] },
            { id: 2, nome: "Marina Santos", email: "marina.santos@fatec.sp.gov.br", curso: "GEO", cor: "#1a73e8", disciplinas: ["Geomática", "Sensoriamento Remoto"] },
            { id: 3, nome: "Rafael Pereira", email: "rafael.pereira@fatec.sp.gov.br", curso: "MAR", cor: "#009688", disciplinas: ["Navegação", "Meteorologia Marítima"] },
            { id: 4, nome: "Lucia Mendes", email: "lucia.mendes@fatec.sp.gov.br", curso: "DSM", cor: "#795548", disciplinas: ["Algoritmos", "Estrutura de Dados"] }
        ],
        semestres: [
            { id: 1, ano: 2025, periodo: 1, inicio: "2025-02-10", fim: "2025-07-05" },
            { id: 2, ano: 2025, periodo: 2, inicio: "2025-08-05", fim: "2025-12-15" }
        ],
        salas: [
            { id: 1, nome: "Lab 01", tipo: "lab", capacidade: 30, localizacao: "Bloco B, Térreo", recursos: ["Projetor", "Computadores"] },
            { id: 2, nome: "Lab 02", tipo: "lab", capacidade: 30, localizacao: "Bloco B, Térreo", recursos: ["Projetor", "Computadores"] },
            { id: 3, nome: "Sala 101", tipo: "sala", capacidade: 50, localizacao: "Bloco A, 1º Andar", recursos: ["Projetor"] },
            { id: 4, nome: "Auditório", tipo: "auditorio", capacidade: 120, localizacao: "Bloco C, Térreo", recursos: ["Projetor", "Sistema de Som", "Ar-condicionado"] }
        ],
        disciplinas: [
            { id: 1, nome: "Banco de Dados", curso: "DSM", semestre: 3, aulas: 4, cor: "#E30613" },
            { id: 2, nome: "Engenharia de Software", curso: "DSM", semestre: 4, aulas: 4, cor: "#1a73e8" },
            { id: 3, nome: "Geomática", curso: "GEO", semestre: 2, aulas: 4, cor: "#009688" }
        ],
        cursos: [
            { id: 1, nome: "Desenvolvimento de Software Multiplataforma", sigla: "DSM", semestres: 6, coordenador: "Carlos Eduardo" },
            { id: 2, nome: "Geoprocessamento", sigla: "GEO", semestres: 6, coordenador: "Ana Maria Souza" },
            { id: 3, nome: "Meio Ambiente e Recursos Hídricos", sigla: "MAR", semestres: 6, coordenador: "Roberto Mendes" }
        ]
    };

    // Variáveis de estado
    let currentEntity = "";
    let currentEntityId = null;
    let deletingEntityId = null;
    let isCollapsed = false;
    let mapEntity = null;
    
    // Função para inicializar o estado da sidebar (verificar localStorage)
    function initSidebarState() {
        isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            container.classList.add('collapsed');
        }
    }
    
    // Toggle do colapso da sidebar
    if (collapseBtn) {
        collapseBtn.addEventListener("click", function() {
            isCollapsed = !isCollapsed;
            container.classList.toggle("collapsed", isCollapsed);
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });
    }
    
    // Toggle do menu lateral em dispositivos móveis
    if (menuToggle) {
        menuToggle.addEventListener("click", function() {
            sidebar.classList.toggle("active");
        });
    }
    
    // Fechar sidebar ao clicar fora dela em dispositivos móveis
    document.addEventListener("click", function(e) {
        const isMobile = window.innerWidth <= 768;
        if (isMobile && sidebar.classList.contains("active") && 
            !e.target.closest(".sidebar") && !e.target.closest(".menu-toggle")) {
            sidebar.classList.remove("active");
        }
    });
    
    // Toggle dos submenus
    if (submenuLinks) {
        submenuLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                
                // Em modo colapsado, não fazemos nada - o hover cuidará disso
                if (isCollapsed) return;
                
                // Em modo normal, alternamos a classe .open
                this.classList.toggle("open");
            });
        });
    }
    
    // Navegação da sidebar
    document.querySelectorAll('.sidebar-item a:not(.has-submenu)').forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove a classe active de todos os links
            document.querySelectorAll('.sidebar-item a').forEach(item => item.classList.remove('active'));
            
            // Adiciona a classe active ao link clicado
            this.classList.add('active');
            
            // Atualiza o breadcrumb
            const sectionName = this.dataset.section;
            if (sectionName) {
                breadcrumb.textContent = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
                
                // Esconde todas as seções
                entityContainer.classList.remove('active');
                mapEditor.classList.remove('active');
                
                // Se for seção de mapas, mostra o editor
                if (sectionName === 'mapas') {
                    mapEditor.classList.add('active');
                }
            }
            
            // Fecha o menu móvel
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("active");
            }
        });
    });
    
    // Manipulação dos botões administrativos
    if (adminButtons) {
        adminButtons.forEach(button => {
            button.addEventListener("click", function() {
                const entityName = this.getAttribute("data-entity");
                
                // Adicionando efeito de clique
                this.classList.add('clicked');
                setTimeout(() => this.classList.remove('clicked'), 200);
                
                if (entityName === 'mapas' && mapEditor) {
                    entityContainer.classList.remove('active');
                    mapEditor.classList.add('active');
                    breadcrumb.textContent = 'Editor de Mapas';
                } else if (entityContainer) {
                    showEntityList(entityName);
                    breadcrumb.textContent = entityName.charAt(0).toUpperCase() + entityName.slice(1);
                    if (mapEditor) mapEditor.classList.remove('active');
                }
            });
        });
    }
    
    // Função para exibir a lista de entidades
    function showEntityList(entityName) {
        if (!entityContainer || !entityTitle || !entityType || !entityList) return;
        
        currentEntity = entityName;
        entityContainer.classList.add("active");
        
        // Atualizar acessos recentes
        updateRecentAccess(entityName);
        
        // Atualizar o título e ícone
        let icon = 'list';
        entityType.textContent = entityName.charAt(0).toUpperCase() + entityName.slice(1);
        
        // Definir ícone baseado na entidade
        switch(entityName) {
            case 'docentes': icon = 'chalkboard-teacher'; break;
            case 'semestres': icon = 'calendar-alt'; break;
            case 'salas': icon = 'door-open'; break;
            case 'disciplinas': icon = 'book'; break;
            case 'cursos': icon = 'graduation-cap'; break;
        }
        
        entityTitle.innerHTML = `<i class="fas fa-${icon}"></i> Gerenciar <span id="entity-type"> ${entityType.textContent}</span>`;
        
        // Limpar a lista atual
        entityList.innerHTML = "";
        
        // Renderizar os cards com base no tipo de entidade
        if (mockData[currentEntity]) {
            mockData[currentEntity].forEach(item => {
                const card = createEntityCard(item);
                entityList.appendChild(card);
            });
        }
        
        // Configurar o input de busca
        if (searchInput) {
            searchInput.placeholder = `Buscar ${entityType.textContent.toLowerCase()}...`;
        }
        
        // Adicionar animação de entrada aos cards
        setTimeout(() => {
            const cards = entityList.querySelectorAll('.entity-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50 * index);
            });
        }, 100);
    }
    
    // Função para criar um card de entidade
    function createEntityCard(entity) {
        const card = document.createElement("div");
        card.className = "entity-card";
        card.dataset.id = entity.id;
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        let cardContent = "";
        let iconClass = "";
        
        // Construir o conteúdo do card com base no tipo de entidade
        switch (currentEntity) {
            case "docentes":
                iconClass = "fas fa-chalkboard-teacher";
                cardContent = `
                    <div class="entity-card-header">
                        <div class="entity-color" style="background-color: ${entity.cor}"></div>
                        <h4 class="entity-title">${entity.nome}</h4>
                    </div>
                    <div class="entity-details">
                        <div class="entity-detail">
                            <span class="detail-label">Email</span>
                            <span class="detail-value">${entity.email}</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Curso</span>
                            <span class="detail-value">${entity.curso}</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Disciplinas</span>
                            <span class="detail-value">${entity.disciplinas.join(", ")}</span>
                        </div>
                    </div>
                `;
                break;
            
            case "semestres":
                iconClass = "fas fa-calendar-alt";
                const status = new Date(entity.inicio) > new Date() ? 
                    '<span class="badge badge-info">Futuro</span>' : 
                    (new Date(entity.fim) < new Date() ? 
                        '<span class="badge badge-warning">Encerrado</span>' : 
                        '<span class="badge badge-success">Atual</span>');
                        
                cardContent = `
                    <div class="entity-card-header">
                        <h4 class="entity-title">${entity.ano}.${entity.periodo} ${status}</h4>
                    </div>
                    <div class="entity-details">
                        <div class="entity-detail">
                            <span class="detail-label">Período</span>
                            <span class="detail-value">${entity.periodo == 1 ? "1º Semestre" : "2º Semestre"}</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Início</span>
                            <span class="detail-value">${formatDate(entity.inicio)}</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Fim</span>
                            <span class="detail-value">${formatDate(entity.fim)}</span>
                        </div>
                    </div>
                `;
                break;
            
            case "salas":
                iconClass = "fas fa-door-open";
                const tipoSala = {
                    lab: "Laboratório",
                    sala: "Sala de Aula",
                    auditorio: "Auditório"
                };
                
                cardContent = `
                    <div class="entity-card-header">
                        <h4 class="entity-title">${entity.nome}</h4>
                    </div>
                    <div class="entity-details">
                        <div class="entity-detail">
                            <span class="detail-label">Tipo</span>
                            <span class="detail-value">${tipoSala[entity.tipo] || entity.tipo}</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Capacidade</span>
                            <span class="detail-value">${entity.capacidade} lugares</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Localização</span>
                            <span class="detail-value">${entity.localizacao}</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Recursos</span>
                            <span class="detail-value">${entity.recursos.join(", ")}</span>
                        </div>
                    </div>
                `;
                break;
                
            case "disciplinas":
                iconClass = "fas fa-book";
                cardContent = `
                    <div class="entity-card-header">
                        <div class="entity-color" style="background-color: ${entity.cor}"></div>
                        <h4 class="entity-title">${entity.nome}</h4>
                    </div>
                    <div class="entity-details">
                        <div class="entity-detail">
                            <span class="detail-label">Curso</span>
                            <span class="detail-value">${entity.curso}</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Semestre</span>
                            <span class="detail-value">${entity.semestre}º Semestre</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Aulas Semanais</span>
                            <span class="detail-value">${entity.aulas}</span>
                        </div>
                    </div>
                `;
                break;
                
            case "cursos":
                iconClass = "fas fa-graduation-cap";
                cardContent = `
                    <div class="entity-card-header">
                        <h4 class="entity-title">${entity.nome}</h4>
                    </div>
                    <div class="entity-details">
                        <div class="entity-detail">
                            <span class="detail-label">Sigla</span>
                            <span class="detail-value">${entity.sigla}</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Duração</span>
                            <span class="detail-value">${entity.semestres} semestres</span>
                        </div>
                        <div class="entity-detail">
                            <span class="detail-label">Coordenador</span>
                            <span class="detail-value">${entity.coordenador}</span>
                        </div>
                    </div>
                `;
                break;
        }
        
        // Adicionar ações (editar/excluir) ao card
        cardContent += `
            <div class="entity-actions">
                <button class="btn btn-icon btn-edit" data-id="${entity.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-icon btn-delete" data-id="${entity.id}" title="Excluir">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        
        card.innerHTML = cardContent;
        
        // Adicionar eventos aos botões
        const editBtn = card.querySelector(".btn-edit");
        const deleteBtn = card.querySelector(".btn-delete");
        
        if (editBtn) {
            editBtn.addEventListener("click", function() {
                openEditModal(entity.id);
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener("click", function() {
                openDeleteModal(entity.id);
            });
        }
        
        return card;
    }
    
    // Função para abrir o modal de adição/edição
    function openModal(isEdit = false) {
        if (!modal || !modalAction || !modalEntityType || !formContainer) return;
        
        modal.classList.add("active");
        
        if (isEdit) {
            modalAction.textContent = "Editar";
        } else {
            modalAction.textContent = "Adicionar";
        }
        
        // Definir o tipo de entidade no título
        let entityName = currentEntity.charAt(0).toUpperCase() + currentEntity.slice(1);
        // Remover o "s" final para singular
        if (entityName.endsWith("s")) {
            entityName = entityName.slice(0, -1);
        }
        modalEntityType.textContent = entityName;
        
        // Limpar o formulário anterior
        formContainer.innerHTML = "";
        
        // Criar formulário baseado no tipo de entidade
        createEntityForm(isEdit);
    }
    
    // Função para criar o formulário dinâmico baseado no tipo de entidade
    function createEntityForm(isEdit) {
        if (!formContainer) return;
        
        let formHTML = "";
        let entity = null;
        
        if (isEdit && currentEntityId) {
            entity = mockData[currentEntity].find(item => item.id === currentEntityId);
        }
        
        switch (currentEntity) {
            case "docentes":
                formHTML = `
                    <div class="form-group">
                        <label for="nome">Nome completo</label>
                        <input type="text" id="nome" name="nome" placeholder="Nome do docente" 
                               value="${entity ? entity.nome : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email institucional</label>
                        <input type="email" id="email" name="email" placeholder="email@fatec.sp.gov.br"
                               value="${entity ? entity.email : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="curso">Curso Principal</label>
                        <select id="curso" name="curso" required>
                            <option value="">Selecione o curso</option>
                            <option value="DSM" ${entity && entity.curso === "DSM" ? "selected" : ""}>Desenvolvimento de Software Multiplataforma</option>
                            <option value="GEO" ${entity && entity.curso === "GEO" ? "selected" : ""}>Geoprocessamento</option>
                            <option value="MAR" ${entity && entity.curso === "MAR" ? "selected" : ""}>Meio Ambiente e Recursos Hídricos</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cor">Cor de identificação</label>
                        <input type="color" id="cor" name="cor" value="${entity ? entity.cor : "#E30613"}">
                    </div>
                `;
                break;
                
            case "semestres":
                formHTML = `
                    <div class="form-group">
                        <label for="ano">Ano</label>
                        <input type="number" id="ano" name="ano" min="2020" max="2100" placeholder="Ex: 2025"
                               value="${entity ? entity.ano : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="periodo">Período</label>
                        <select id="periodo" name="periodo" required>
                            <option value="">Selecione o período</option>
                            <option value="1" ${entity && entity.periodo === 1 ? "selected" : ""}>1º Semestre</option>
                            <option value="2" ${entity && entity.periodo === 2 ? "selected" : ""}>2º Semestre</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inicio">Data de início</label>
                        <input type="date" id="inicio" name="inicio" value="${entity ? entity.inicio : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="fim">Data de término</label>
                        <input type="date" id="fim" name="fim" value="${entity ? entity.fim : ""}" required>
                    </div>
                `;
                break;
                
            case "salas":
                formHTML = `
                    <div class="form-group">
                        <label for="nome">Nome/Número da sala</label>
                        <input type="text" id="nome" name="nome" placeholder="Ex: Lab 01, Sala 101"
                               value="${entity ? entity.nome : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="tipo">Tipo</label>
                        <select id="tipo" name="tipo" required>
                            <option value="">Selecione o tipo</option>
                            <option value="lab" ${entity && entity.tipo === "lab" ? "selected" : ""}>Laboratório</option>
                            <option value="sala" ${entity && entity.tipo === "sala" ? "selected" : ""}>Sala de Aula</option>
                            <option value="auditorio" ${entity && entity.tipo === "auditorio" ? "selected" : ""}>Auditório</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="capacidade">Capacidade</label>
                        <input type="number" id="capacidade" name="capacidade" min="1" placeholder="Número de lugares"
                               value="${entity ? entity.capacidade : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="localizacao">Localização</label>
                        <input type="text" id="localizacao" name="localizacao" placeholder="Ex: Bloco B, 1º andar"
                               value="${entity ? entity.localizacao : ""}" required>
                    </div>
                `;
                break;
                
            case "disciplinas":
                formHTML = `
                    <div class="form-group">
                        <label for="nome">Nome da disciplina</label>
                        <input type="text" id="nome" name="nome" placeholder="Nome da disciplina"
                               value="${entity ? entity.nome : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="curso">Curso</label>
                        <select id="curso" name="curso" required>
                            <option value="">Selecione o curso</option>
                            <option value="DSM" ${entity && entity.curso === "DSM" ? "selected" : ""}>Desenvolvimento de Software Multiplataforma</option>
                            <option value="GEO" ${entity && entity.curso === "GEO" ? "selected" : ""}>Geoprocessamento</option>
                            <option value="MAR" ${entity && entity.curso === "MAR" ? "selected" : ""}>Meio Ambiente e Recursos Hídricos</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="semestre">Semestre</label>
                        <select id="semestre" name="semestre" required>
                            <option value="">Selecione o semestre</option>
                            <option value="1" ${entity && entity.semestre === 1 ? "selected" : ""}>1º Semestre</option>
                            <option value="2" ${entity && entity.semestre === 2 ? "selected" : ""}>2º Semestre</option>
                            <option value="3" ${entity && entity.semestre === 3 ? "selected" : ""}>3º Semestre</option>
                            <option value="4" ${entity && entity.semestre === 4 ? "selected" : ""}>4º Semestre</option>
                            <option value="5" ${entity && entity.semestre === 5 ? "selected" : ""}>5º Semestre</option>
                            <option value="6" ${entity && entity.semestre === 6 ? "selected" : ""}>6º Semestre</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="aulas">Aulas por semana</label>
                        <input type="number" id="aulas" name="aulas" min="1" max="20" placeholder="Ex: 4"
                               value="${entity ? entity.aulas : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="cor">Cor de identificação</label>
                        <input type="color" id="cor" name="cor" value="${entity ? entity.cor : "#E30613"}">
                    </div>
                `;
                break;
                
            case "cursos":
                formHTML = `
                    <div class="form-group">
                        <label for="nome">Nome do curso</label>
                        <input type="text" id="nome" name="nome" placeholder="Nome completo do curso"
                               value="${entity ? entity.nome : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="sigla">Sigla</label>
                        <input type="text" id="sigla" name="sigla" placeholder="Ex: DSM"
                               value="${entity ? entity.sigla : ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="semestres">Duração (semestres)</label>
                        <input type="number" id="semestres" name="semestres" min="1" max="12" 
                               value="${entity ? entity.semestres : "6"}" required>
                    </div>
                    <div class="form-group">
                        <label for="coordenador">Coordenador</label>
                        <input type="text" id="coordenador" name="coordenador" placeholder="Nome do coordenador"
                               value="${entity ? entity.coordenador : ""}" required>
                    </div>
                `;
                break;
        }
        
        formContainer.innerHTML = formHTML;
    }
    
    // Função para abrir o modal de edição
    function openEditModal(id) {
        currentEntityId = id;
        openModal(true);
    }
    
    // Função para abrir o modal de confirmação de exclusão
    function openDeleteModal(id) {
        if (!confirmModal) return;
        
        deletingEntityId = id;
        confirmModal.classList.add("active");
        
        // Obter o nome da entidade para mostrar no modal
        const entity = mockData[currentEntity].find(item => item.id === id);
        let entityName = "";
        
        switch (currentEntity) {
            case "docentes":
                entityName = entity.nome;
                break;
            case "semestres":
                entityName = `${entity.ano}.${entity.periodo}`;
                break;
            case "salas":
                entityName = entity.nome;
                break;
            case "disciplinas":
                entityName = entity.nome;
                break;
            case "cursos":
                entityName = entity.nome;
                break;
        }
        
        const confirmMessage = document.getElementById("confirm-message");
        if (confirmMessage) {
            confirmMessage.textContent = 
                `Tem certeza que deseja excluir "${entityName}"? Esta ação não pode ser desfeita.`;
        }
    }
    
    // Fechar modais
    function closeModals() {
        if (modal) modal.classList.remove('show');
        if (confirmModal) confirmModal.classList.remove('show');
        if (formContainer) formContainer.innerHTML = '';
    }

    // Fechar modais ao clicar no botão de fechar
    if (closeModalBtns) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeModals);
        });
    }

    // Fechar modais ao clicar no botão de cancelar
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModals);
    }

    // Fechar modal de confirmação ao clicar no botão de cancelar
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', closeModals);
    }
    
    // Manipulação do formulário
    if (entityForm) {
        entityForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Simular o salvamento
            if (currentEntityId) {
                // É uma edição
                const entityIndex = mockData[currentEntity].findIndex(item => item.id === currentEntityId);
                if (entityIndex !== -1) {
                    // Exibir toast de sucesso
                    showToast(`${currentEntity.charAt(0).toUpperCase() + currentEntity.slice(1, -1)} editado com sucesso!`, "success");
                    
                    // Atualizar a interface após salvamento
                    showEntityList(currentEntity);
                }
            } else {
                // É uma adição
                // Exibir toast de sucesso
                showToast(`Novo ${currentEntity.charAt(0).toUpperCase() + currentEntity.slice(1, -1)} adicionado com sucesso!`, "success");
                
                // Atualizar a interface após salvamento
                showEntityList(currentEntity);
            }
            
            // Fechar o modal
            closeModals();
        });
    }
    
    // Evento para o botão de adicionar entidade
    if (addEntityBtn) {
        addEntityBtn.addEventListener("click", function() {
            openModal(false);
        });
    }
    
    // Evento para confirmar a exclusão
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", function() {
            if (deletingEntityId) {
                // Exibir toast de sucesso
                showToast(`${currentEntity.charAt(0).toUpperCase() + currentEntity.slice(1, -1)} excluído com sucesso!`, "success");
                
                // Atualizar a interface após exclusão
                showEntityList(currentEntity);
                
                // Fechar o modal
                closeModals();
            }
        });
    }
    
    // Função para formatar datas
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR');
    }
    
    // Função para exibir toast de notificação
    function showToast(message, type = "info") {
        // Verificar se já existe um toast container
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Criar o toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Ícone baseado no tipo
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'warning') icon = 'exclamation-circle';
        if (type === 'error') icon = 'times-circle';
        
        // Conteúdo do toast
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="toast-content">
                ${message}
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Adicionar ao container
        toastContainer.appendChild(toast);
        
        // Animação de entrada
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Adicionar evento para fechar o toast
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
        
        // Auto-fechar após 5 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) toast.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Inicializar a busca
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();
            const cards = entityList.querySelectorAll(".entity-card");
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
    
    // Adicionar CSS para toast (alternativa a criar um arquivo separado)
    function addToastStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 9999;
            }
            
            .toast {
                background-color: white;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-md);
                padding: 15px;
                display: flex;
                align-items: center;
                min-width: 300px;
                max-width: 400px;
                transform: translateX(120%);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .toast.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .toast-icon {
                margin-right: 15px;
                font-size: 1.2rem;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            
            .toast-content {
                flex: 1;
            }
            
            .toast-close {
                background: transparent;
                border: none;
                color: var(--text-light);
                cursor: pointer;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.2s ease;
            }
            
            .toast-close:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
            
            .toast-info {
                border-left: 4px solid var(--info);
            }
            
            .toast-info .toast-icon {
                color: var(--info);
            }
            
            .toast-success {
                border-left: 4px solid var(--success);
            }
            
            .toast-success .toast-icon {
                color: var(--success);
            }
            
            .toast-warning {
                border-left: 4px solid var(--warning);
            }
            
            .toast-warning .toast-icon {
                color: var(--warning);
            }
            
            .toast-error {
                border-left: 4px solid var(--danger);
            }
            
            .toast-error .toast-icon {
                color: var(--danger);
            }
            
            .admin-button.clicked {
                animation: pulse 0.3s ease;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(0.95); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar as funções
    initSidebarState();
    addToastStyles();

    // Função para atualizar as estatísticas do dashboard
    function updateDashboardStats() {
        // Atualizar estatísticas com dados reais
        const stats = {
            docentes: mockData.docentes.length,
            salas: mockData.salas.length,
            disciplinas: mockData.disciplinas.length,
            cursos: mockData.cursos.length
        };

        // Atualizar os números nas cards de estatísticas
        document.querySelectorAll('.stat-number').forEach(stat => {
            const type = stat.closest('.stat-card').querySelector('h3').textContent.toLowerCase();
            if (stats[type]) {
                stat.textContent = stats[type];
            }
        });
    }

    // Função para atualizar as atividades recentes
    function updateRecentActivities() {
        const activities = [
            {
                icon: 'user-plus',
                text: 'Novo docente cadastrado',
                time: 'Há 2 horas'
            },
            {
                icon: 'calendar-plus',
                text: 'Novo semestre iniciado',
                time: 'Há 1 dia'
            },
            {
                icon: 'map-marked-alt',
                text: 'Mapa atualizado',
                time: 'Há 3 dias'
            }
        ];

        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            activityList.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas fa-${activity.icon}"></i>
                    </div>
                    <div class="activity-info">
                        <p>${activity.text}</p>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    // Inicializar o dashboard quando a página carregar
    updateDashboardStats();
    updateRecentActivities();
    
    // Atualizar estatísticas a cada 5 minutos
    setInterval(updateDashboardStats, 300000);

    // Função para gerenciar acessos recentes
    function updateRecentAccess(entityName) {
        // Obter acessos recentes do localStorage ou inicializar array vazio
        let recentAccess = JSON.parse(localStorage.getItem('recentAccess')) || [];
        
        // Remover a entidade se já existir (para evitar duplicatas)
        recentAccess = recentAccess.filter(item => item.name !== entityName);
        
        // Adicionar a nova entidade no início do array
        recentAccess.unshift({
            name: entityName,
            timestamp: new Date().getTime()
        });
        
        // Manter apenas os 3 acessos mais recentes
        recentAccess = recentAccess.slice(0, 3);
        
        // Salvar no localStorage
        localStorage.setItem('recentAccess', JSON.stringify(recentAccess));
        
        // Atualizar a interface
        renderRecentAccess();
    }

    // Função para renderizar os acessos recentes
    function renderRecentAccess() {
        const recentAccessContainer = document.getElementById('recent-access');
        if (!recentAccessContainer) return;
        
        const recentAccess = JSON.parse(localStorage.getItem('recentAccess')) || [];
        
        // Limpar o container
        recentAccessContainer.innerHTML = '';
        
        // Mapear ícones para cada tipo de entidade
        const entityIcons = {
            docentes: 'chalkboard-teacher',
            semestres: 'calendar-alt',
            salas: 'door-open',
            disciplinas: 'book',
            cursos: 'graduation-cap',
            mapas: 'map-marked-alt'
        };
        
        // Criar cards para cada acesso recente
        recentAccess.forEach(item => {
            const card = document.createElement('div');
            card.className = 'admin-button';
            card.dataset.entity = item.name;
            
            const icon = entityIcons[item.name] || 'circle';
            
            card.innerHTML = `
                <i class="fas fa-${icon}"></i>
                <span>${item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
            `;
            
            // Adicionar evento de clique
            card.addEventListener('click', function() {
                const entityName = this.getAttribute('data-entity');
                showEntityList(entityName);
                if (breadcrumb) {
                    breadcrumb.textContent = entityName.charAt(0).toUpperCase() + entityName.slice(1);
                }
            });
            
            recentAccessContainer.appendChild(card);
        });
    }

    // Inicializar acessos recentes quando a página carregar
    if (document.getElementById('recent-access')) {
        renderRecentAccess();
    }
});