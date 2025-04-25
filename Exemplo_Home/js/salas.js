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
            room.addEventListener('dblclick', () => {
                const roomId = room.getAttribute('data-room-id');
                openRoomEditModal(roomId);
            });
        });
        
        showToast(`Mapa do ${floor}º andar carregado`, 'success');
    } catch (error) {
        console.error('Erro ao carregar mapa:', error);
        showToast(error.message, 'error');
    }
}

function selectRoomOnMap(roomElement) {
    // Remove a seleção anterior
    document.querySelectorAll('.room.selected').forEach(room => room.classList.remove('selected'));
    
    // Adiciona a seleção ao elemento atual
    roomElement.classList.add('selected');
    
    // Obtém os detalhes da sala
    const roomId = roomElement.getAttribute('data-room-id');
    const roomDetails = getRoomDetails(roomId);
    
    if (!roomDetails) {
        showToast('Detalhes da sala não encontrados', 'error');
        return;
    }

    // Atualiza o painel de informações da sala
    const roomInfoPanel = document.getElementById('room-info');
    roomInfoPanel.innerHTML = `
        <h3>${roomDetails.name}</h3>
        <p><strong>Tipo:</strong> ${roomDetails.type}</p>
        <p><strong>Capacidade:</strong> ${roomDetails.capacity}</p>
        <p><strong>Status:</strong> ${roomDetails.status}</p>
        <p><strong>Recursos:</strong></p>
        <ul>
            ${roomDetails.resources.map(resource => `<li>${resource}</li>`).join('')}
        </ul>
    `;
    
    showToast(`Sala ${roomDetails.name} selecionada`, 'info');
}

// Funções do Modal de Edição
function openRoomEditModal(roomId) {
    const modal = document.getElementById('room-edit-modal');
    const details = getRoomDetails(roomId);
    
    if (!details) {
        showToast('Erro ao carregar detalhes da sala', 'error');
        return;
    }
    
    // Preenche o formulário com os dados da sala
    document.getElementById('edit-room-name').value = details.name;
    document.getElementById('edit-room-type').value = details.type.toLowerCase();
    document.getElementById('edit-room-capacity').value = details.capacity.toString().replace(/[^0-9]/g, '');
    document.getElementById('edit-room-status').value = details.status.toLowerCase();
    document.getElementById('edit-room-professor').value = details.professor || '';
    document.getElementById('edit-room-turma').value = details.turma || '';
    document.getElementById('edit-room-turno').value = details.turno || '';
    document.getElementById('edit-room-materia').value = details.materia || '';
    
    // Marca os recursos
    const resourceCheckboxes = document.querySelectorAll('input[name="resources"]');
    resourceCheckboxes.forEach(checkbox => {
        checkbox.checked = details.resources.includes(checkbox.value);
    });
    
    document.getElementById('edit-room-observations').value = details.observations || '';
    
    // Exibe o modal
    modal.style.display = 'block';
    showToast('Modal de edição aberto', 'info');
}

function closeRoomEditModal() {
    const modal = document.getElementById('room-edit-modal');
    modal.style.display = 'none';
    showToast('Modal de edição fechado', 'info');
}

function saveRoomDetails(event) {
    event.preventDefault();
    // Implementar a lógica de salvamento aqui
    showToast('Alterações salvas com sucesso!', 'success');
    closeRoomEditModal();
}

// Função para criar e mostrar um toast
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <span class="toast-close">&times;</span>
    `;

    toastContainer.appendChild(toast);

    // Adiciona evento de clique para fechar o toast
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.animation = 'fadeOut 0.3s ease-in-out forwards';
        setTimeout(() => toast.remove(), 300);
    });

    // Remove o toast automaticamente após 5 segundos
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'fadeOut 0.3s ease-in-out forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

// Função para criar o container de toasts
function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Dados Mock para Teste
function getRoomDetails(roomId) {
    const mockData = {
        'lab-info-01': {
            name: 'Laboratório de Informática 01',
            type: 'Laboratório',
            capacity: '30 alunos',
            status: 'Disponível',
            resources: ['Computadores', 'Projetor', 'Ar Condicionado']
        },
        'sala-101': {
            name: 'Sala 101',
            type: 'Sala de Aula',
            capacity: '40 alunos',
            status: 'Ocupada',
            professor: 'Dr. Silva',
            turma: 'ADS 2º Semestre',
            resources: ['Projetor', 'Lousa Digital']
        }
        // Adicionar mais salas conforme necessário
    };
    
    return mockData[roomId] || null;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Fecha os modais quando clicar fora deles
    window.addEventListener('click', (event) => {
        const editModal = document.getElementById('room-edit-modal');
        if (event.target === editModal) {
            closeRoomEditModal();
        }
    });
});

// Função para mostrar mensagem de sucesso
function showSuccessToast(message) {
    showToast(message, 'success');
}

// Função para mostrar mensagem de erro
function showErrorToast(message) {
    showToast(message, 'error');
}

// Função para mostrar mensagem de aviso
function showWarningToast(message) {
    showToast(message, 'warning');
}

// Função para mostrar mensagem informativa
function showInfoToast(message) {
    showToast(message, 'info');
}

// Atualiza a função saveMapChanges para usar toasts
function saveMapChanges() {
    const selectedRoom = document.querySelector('.room.selected');
    if (!selectedRoom) {
        showToast('Por favor, selecione uma sala primeiro', 'error');
        return;
    }

    // Aqui você adicionaria a lógica para salvar as alterações
    showToast('Alterações salvas com sucesso!', 'success');
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

function openRoomModal(roomId) {
    const modal = document.getElementById('room-modal');
    const roomDetails = getRoomDetails(roomId);
    
    if (!roomDetails) {
        showToast('Detalhes da sala não encontrados', 'error');
        return;
    }

    // Atualiza o conteúdo do modal
    document.getElementById('room-name').textContent = roomDetails.name;
    document.getElementById('room-type').textContent = roomDetails.type;
    document.getElementById('room-capacity').textContent = roomDetails.capacity;
    
    const statusElement = document.getElementById('room-status');
    statusElement.textContent = roomDetails.status;
    statusElement.className = `status-badge ${getStatusClass(roomDetails.status)}`;

    // Atualiza a lista de recursos
    const resourcesList = document.getElementById('resources-list');
    resourcesList.innerHTML = '';
    if (roomDetails.resources && roomDetails.resources.length > 0) {
        roomDetails.resources.forEach(resource => {
            const resourceItem = document.createElement('div');
            resourceItem.className = 'resource-item';
            resourceItem.textContent = resource;
            resourcesList.appendChild(resourceItem);
        });
    } else {
        const noResources = document.createElement('div');
        noResources.className = 'resource-item';
        noResources.textContent = 'Nenhum recurso cadastrado';
        resourcesList.appendChild(noResources);
    }

    modal.style.display = 'block';
}

function closeRoomModal() {
    const modal = document.getElementById('room-modal');
    modal.style.display = 'none';
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Fecha o modal quando clicar no X
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeRoomModal);
    }

    // Fecha o modal quando clicar fora dele
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('room-modal');
        if (event.target === modal) {
            closeRoomModal();
        }
    });
});

// Event listener para o botão de editar sala
document.getElementById('edit-room-btn').addEventListener('click', function() {
    const selectedRoom = document.querySelector('.room.selected');
    if (selectedRoom) {
        const roomId = selectedRoom.getAttribute('data-room-id');
        // Aqui você pode implementar a lógica para editar a sala
        showToast('Funcionalidade de edição em desenvolvimento', 'info');
    } else {
        showToast('Selecione uma sala para editar', 'error');
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