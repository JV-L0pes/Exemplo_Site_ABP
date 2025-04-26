// Script específico para a página de Salas
document.addEventListener("DOMContentLoaded", function() {
    // Elementos
    const salasList = document.getElementById("salas-list");
    const searchInput = document.getElementById("search-sala");
    const addSalaBtn = document.getElementById("add-sala");
    
    // Dados simulados para demonstração
    const salas = [
        { 
            id: 1, 
            nome: "Lab 01", 
            tipo: "lab", 
            capacidade: 30, 
            localizacao: "Bloco B, Térreo", 
            recursos: ["Projetor", "Computadores"],
            status: "disponivel"
        },
        { 
            id: 2, 
            nome: "Lab 02", 
            tipo: "lab", 
            capacidade: 30, 
            localizacao: "Bloco B, Térreo", 
            recursos: ["Projetor", "Computadores"],
            status: "ocupada"
        },
        { 
            id: 3, 
            nome: "Sala 101", 
            tipo: "aula", 
            capacidade: 50, 
            localizacao: "Bloco A, 1º Andar", 
            recursos: ["Projetor"],
            status: "disponivel"
        },
        { 
            id: 4, 
            nome: "Auditório", 
            tipo: "auditorio", 
            capacidade: 120, 
            localizacao: "Bloco C, Térreo", 
            recursos: ["Projetor", "Sistema de Som", "Ar-condicionado"],
            status: "manutencao"
        }
    ];
    
    // Função para renderizar os cards de salas
    function renderSalas(salasToRender = salas) {
        salasList.innerHTML = "";
        
        salasToRender.forEach(sala => {
            const card = createSalaCard(sala);
            salasList.appendChild(card);
        });
    }
    
    // Função para criar um card de sala
    function createSalaCard(sala) {
        const card = document.createElement("div");
        card.className = "sala-card";
        card.dataset.id = sala.id;
        
        // Definir ícone baseado no tipo de sala
        let icon = "door-open";
        switch(sala.tipo) {
            case "lab": icon = "laptop"; break;
            case "auditorio": icon = "theater-masks"; break;
        }
        
        // Definir classe de status
        let statusClass = "";
        switch(sala.status) {
            case "disponivel": statusClass = "tipo-aula"; break;
            case "ocupada": statusClass = "tipo-lab"; break;
            case "manutencao": statusClass = "tipo-auditorio"; break;
        }
        
        card.innerHTML = `
            <div class="sala-header">
                <div class="sala-icon">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="sala-info">
                    <h3>${sala.nome}</h3>
                    <p>${sala.localizacao}</p>
                </div>
            </div>
            <div class="sala-details">
                <div class="sala-detail">
                    <span class="detail-label">Tipo</span>
                    <span class="detail-value">
                        <span class="sala-tipo ${statusClass}">${sala.tipo.toUpperCase()}</span>
                    </span>
                </div>
                <div class="sala-detail">
                    <span class="detail-label">Capacidade</span>
                    <span class="detail-value">${sala.capacidade} lugares</span>
                </div>
                <div class="sala-detail">
                    <span class="detail-label">Recursos</span>
                    <span class="detail-value">${sala.recursos.join(", ")}</span>
                </div>
            </div>
            <div class="sala-actions">
                <button class="btn-edit" onclick="editSala(${sala.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" onclick="deleteSala(${sala.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        
        return card;
    }
    
    // Função para buscar salas
    function searchSalas(query) {
        const filteredSalas = salas.filter(sala => 
            sala.nome.toLowerCase().includes(query.toLowerCase()) ||
            sala.localizacao.toLowerCase().includes(query.toLowerCase()) ||
            sala.tipo.toLowerCase().includes(query.toLowerCase())
        );
        
        renderSalas(filteredSalas);
    }
    
    // Event Listeners
    searchInput.addEventListener("input", (e) => {
        searchSalas(e.target.value);
    });
    
    addSalaBtn.addEventListener("click", () => {
        // Implementar lógica para adicionar nova sala
        console.log("Adicionar nova sala");
    });
    
    // Funções globais para edição e exclusão
    window.editSala = function(id) {
        // Implementar lógica para editar sala
        console.log("Editar sala:", id);
    };
    
    window.deleteSala = function(id) {
        // Implementar lógica para excluir sala
        console.log("Excluir sala:", id);
    };
    
    // Inicializar a página
    renderSalas();
    
    // Atualizar acessos recentes
    updateRecentAccess('salas');
});

// Variáveis globais
let currentFloor = 0;
let selectedRoom = null;

async function loadFloorMap(floor) {
    currentFloor = floor;
    try {
        const response = await fetch(`mapas/andar-${floor}.svg`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o mapa do ${floor}º andar`);
        }
        
        const svgContent = await response.text();
        const mapContent = document.getElementById('map-content');
        mapContent.innerHTML = svgContent;
        
        // Adiciona eventos de clique nas salas
        const rooms = mapContent.querySelectorAll('.room');
        rooms.forEach(room => {
            room.addEventListener('click', () => selectRoomOnMap(room));
        });
        
        console.log(`Mapa do ${floor}º andar carregado`);
    } catch (error) {
        console.error('Erro ao carregar mapa:', error);
    }
}

function selectRoomOnMap(roomElement) {
    if (!roomElement) return;
    
    // Remove seleção anterior
    const previousSelected = document.querySelector('.room.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    
    // Seleciona nova sala
    roomElement.classList.add('selected');
    selectedRoom = roomElement;
    
    // Obtém e exibe detalhes da sala
    const roomId = roomElement.getAttribute('data-room-id');
    const roomDetails = getRoomDetails(roomId);
    
    if (!roomDetails) {
        console.error('Detalhes da sala não encontrados');
        return;
    }

    // Atualiza o painel de informações
    updateRoomInfoPanel(roomDetails);
}

// Atualiza a função saveMapChanges
function saveMapChanges() {
    const selectedRoom = document.querySelector('.room.selected');
    if (!selectedRoom) {
        console.error('Por favor, selecione uma sala primeiro');
        return;
    }

    // Aqui você adicionaria a lógica para salvar as alterações
    console.log('Alterações salvas com sucesso!');
}

function updateRoomInfoPanel(roomDetails) {
    const infoPanel = document.getElementById('room-info-panel');
    if (!infoPanel) return;
    
    infoPanel.innerHTML = `
        <h3>${roomDetails.name}</h3>
        <p><strong>Tipo:</strong> ${roomDetails.type}</p>
        <p><strong>Capacidade:</strong> ${roomDetails.capacity}</p>
        <p><strong>Status:</strong> ${roomDetails.status}</p>
        <p><strong>Recursos:</strong></p>
        <ul>
            ${roomDetails.resources.map(resource => `<li>${resource}</li>`).join('')}
        </ul>
    `;
}

function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'disponível':
            return 'available';
        case 'ocupado':
            return 'occupied';
        case 'restrito':
            return 'restricted';
        default:
            return '';
    }
}

// Event listener para o botão de editar sala
document.getElementById('edit-room-btn').addEventListener('click', function() {
    const selectedRoom = document.querySelector('.room.selected');
    if (selectedRoom) {
        const roomId = selectedRoom.getAttribute('data-room-id');
        // Aqui você pode implementar a lógica para editar a sala
        console.log('Funcionalidade de edição em desenvolvimento');
    } else {
        console.error('Selecione uma sala para editar');
    }
});

// Funcionalidade da Sidebar
document.addEventListener('DOMContentLoaded', function() {
    const collapseBtn = document.querySelector('.collapse-btn');
    const container = document.querySelector('.container');
    
    if (collapseBtn) {
        collapseBtn.addEventListener('click', function() {
            container.classList.toggle('collapsed');
            // Atualiza o ícone do botão
            const icon = this.querySelector('i');
            if (container.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            }
        });
    }

    // Submenu toggle
    const submenuItems = document.querySelectorAll('.has-submenu');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('open');
        });
    });
}); 