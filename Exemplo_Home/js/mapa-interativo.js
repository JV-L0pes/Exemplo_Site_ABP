// Variáveis globais
let currentFloor = 0;
let selectedRoom = null;
let roomsData = {};

// Carrega o mapa inicial quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    loadFloorMap(0);

    // Adiciona evento para o seletor de andar
    const floorSelector = document.getElementById('floor-selector');
    if (floorSelector) {
        floorSelector.addEventListener('change', (e) => {
            loadFloorMap(e.target.value);
        });
    }

    // Fecha os modais quando clicar fora deles
    window.addEventListener('click', (event) => {
        const editModal = document.getElementById('room-edit-modal');
        if (event.target === editModal) {
            closeRoomEditModal();
        }
    });

    // Funcionalidade da Sidebar
    const collapseBtn = document.getElementById('collapse-btn');
    const container = document.querySelector('.container');
    
    if (collapseBtn) {
        collapseBtn.addEventListener('click', function() {
            container.classList.toggle('collapsed');
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
});

async function loadFloorMap(floor) {
    currentFloor = floor;
    let displayName;

    switch(floor) {
        case '0':
            displayName = 'Térreo';
            break;
        case '1':
            displayName = '1º andar';
            break;
        case '2':
            displayName = '2º andar';
            break;
        default:
            floor = '0';
            displayName = 'Térreo';
    }

    try {
        const response = await fetch(`mapas/andar-${floor}.svg`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o mapa do ${displayName}`);
        }
        
        const svgContent = await response.text();
        const mapContent = document.getElementById('map-content');
        if (!mapContent) {
            throw new Error('Elemento map-content não encontrado');
        }
        
        mapContent.innerHTML = svgContent;
        
        // Adiciona eventos de clique nas salas
        const rooms = mapContent.querySelectorAll(`
            .room, 
            [class*="sala"], 
            [class*="laboratorio"],
            [class*="LABORATÓRIO"],
            [class*="Laboratório"],
            [class*="biblioteca"],
            [class*="BIBLIOTECA"],
            [class*="Biblioteca"]
        `);
        
        console.log(`Encontradas ${rooms.length} salas para adicionar eventos`);
        
        rooms.forEach(room => {
            // Mantém o data-room-id original
            const roomId = room.getAttribute('data-room-id');
            
            // Adiciona cursor pointer se não tiver
            room.style.cursor = 'pointer';
            
            // Adiciona evento de clique único que seleciona e abre o modal
            room.addEventListener('click', () => {
                console.log('Sala clicada:', room);
                selectRoomOnMap(room);
                openRoomEditModal(roomId);
            });
            
            // Adiciona classe room se não tiver
            if (!room.classList.contains('room')) {
                room.classList.add('room');
            }
        });
        
        showToast(`Mapa do ${displayName} carregado`, 'success');
    } catch (error) {
        console.error('Erro ao carregar mapa:', error);
        showToast(error.message, 'error');
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
        showToast('Detalhes da sala não encontrados', 'error');
        return;
    }
    
    // Atualiza o modal com as informações
    document.getElementById('modal-room-name').textContent = roomDetails.name;
    document.getElementById('modal-room-disciplina').textContent = roomDetails.disciplina || '-';
    document.getElementById('modal-room-docente').textContent = roomDetails.docente || '-';
    document.getElementById('modal-room-curso').textContent = roomDetails.curso || '-';
    document.getElementById('modal-room-nivel').textContent = roomDetails.nivel || '-';
    document.getElementById('modal-room-status').textContent = roomDetails.status;
    document.getElementById('modal-room-status').className = `status-badge status-${roomDetails.status.toLowerCase()}`;
}

function openRoomEditModal(roomId) {
    const modal = document.getElementById('room-edit-modal');
    if (!modal) return;
    
    const details = getRoomDetails(roomId);
    if (!details) {
        showToast('Erro ao carregar detalhes da sala', 'error');
        return;
    }
    
    // Preenche o formulário com os dados da sala
    document.getElementById('edit-room-name').value = details.name || '';
    document.getElementById('edit-room-type').value = 'sala-de-aula'; // valor padrão
    document.getElementById('edit-room-capacity').value = '40'; // valor padrão
    document.getElementById('edit-room-status').value = details.status ? details.status.toLowerCase() : 'disponivel';
    document.getElementById('edit-room-professor').value = details.docente || '';
    document.getElementById('edit-room-turma').value = details.curso || '';
    document.getElementById('edit-room-turno').value = '';
    document.getElementById('edit-room-materia').value = details.disciplina || '';
    
    // Exibe o modal
    modal.classList.add('show');
}

function closeRoomEditModal() {
    const modal = document.getElementById('room-edit-modal');
    if (!modal) return;
    
    modal.classList.remove('show');
}

function saveRoomDetails(event) {
    event.preventDefault();
    try {
        // Implementar a lógica de salvamento aqui
        showToast('Alterações salvas com sucesso!', 'success');
        closeRoomEditModal();
    } catch (error) {
        showToast('Erro ao salvar alterações', 'error');
    }
}

// Sistema de Notificações Toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 5000);
    }, 5000);
}

// Dados Mock para Teste
function getRoomDetails(roomId) {
    const mockData = {
        // Térreo (andar-0.svg)
        'lab-info-01': {
            name: 'Laboratório de Informática 01',
            disciplina: 'Desenvolvimento Web',
            docente: 'Prof. João Silva',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Disponível'
        },
        'lab-info-02': {
            name: 'Laboratório de Informática 02',
            disciplina: 'Banco de Dados',
            docente: 'Profa. Maria Santos',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'lab-info-03': {
            name: 'Laboratório de Informática 03',
            disciplina: 'Programação Mobile',
            docente: 'Prof. Carlos Oliveira',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Disponível'
        },
        'lab-info-04': {
            name: 'Laboratório de Informática 04',
            disciplina: 'Inteligência Artificial',
            docente: 'Prof. Roberto Santos',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'lab-info-05': {
            name: 'Laboratório de Informática 05',
            disciplina: 'Redes de Computadores',
            docente: 'Profa. Ana Lima',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Disponível'
        },
        'lab-info-06': {
            name: 'Laboratório de Informática 06',
            disciplina: 'Segurança da Informação',
            docente: 'Prof. Pedro Costa',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Manutenção'
        },
        'biblioteca': {
            name: 'Biblioteca',
            disciplina: 'Área de Estudos',
            docente: '-',
            curso: 'Todos os Cursos',
            nivel: 'Todos os Níveis',
            status: 'Disponível'
        },
        'secretaria': {
            name: 'Secretaria Acadêmica',
            disciplina: 'Administrativo',
            docente: '-',
            curso: 'Todos os Cursos',
            nivel: 'Administrativo',
            status: 'Disponível'
        },
        'coordenacao': {
            name: 'Coordenação',
            disciplina: 'Administrativo',
            docente: '-',
            curso: 'Todos os Cursos',
            nivel: 'Administrativo',
            status: 'Disponível'
        },

        // Primeiro Andar (andar-1.svg)
        'sala-101': {
            name: 'Sala 101',
            disciplina: 'Cálculo',
            docente: 'Prof. Ricardo Alves',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-102': {
            name: 'Sala 102',
            disciplina: 'Inglês Técnico',
            docente: 'Profa. Sarah Johnson',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Disponível'
        },
        'sala-103': {
            name: 'Sala 103',
            disciplina: 'Gestão de Projetos',
            docente: 'Prof. Marcos Paulo',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'lab-hardware': {
            name: 'Laboratório de Hardware',
            disciplina: 'Arquitetura de Computadores',
            docente: 'Prof. Fernando Silva',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Disponível'
        },
        'lab-redes': {
            name: 'Laboratório de Redes',
            disciplina: 'Infraestrutura e Redes',
            docente: 'Profa. Carla Santos',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-professores': {
            name: 'Sala dos Professores',
            disciplina: 'Área dos Docentes',
            docente: '-',
            curso: 'Todos os Cursos',
            nivel: 'Docentes',
            status: 'Disponível'
        },

        // Segundo Andar (andar-2.svg)
        'sala-201': {
            name: 'Sala 201',
            disciplina: 'Engenharia de Software',
            docente: 'Prof. Lucas Mendes',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-202': {
            name: 'Sala 202',
            disciplina: 'Matemática Discreta',
            docente: 'Profa. Patricia Lima',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Disponível'
        },
        'sala-203': {
            name: 'Sala 203',
            disciplina: 'Sistemas Operacionais',
            docente: 'Prof. Gabriel Costa',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'auditorio': {
            name: 'Auditório',
            disciplina: 'Eventos e Palestras',
            docente: '-',
            curso: 'Todos os Cursos',
            nivel: 'Todos os Níveis',
            status: 'Disponível'
        },
        'lab-inovacao': {
            name: 'Laboratório de Inovação',
            disciplina: 'Projetos Interdisciplinares',
            docente: 'Prof. André Santos',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Disponível'
        }
    };
    
    return mockData[roomId] || {
        name: roomId ? roomId.replace(/-/g, ' ').toUpperCase() : 'Sala Desconhecida',
        disciplina: '-',
        docente: '-',
        curso: '-',
        nivel: '-',
        status: 'Disponível'
    };
}

// Configuração dos eventos
function configurarEventos() {
    const floorButton = document.getElementById('floorButton');
    const floorDropdown = document.getElementById('floorDropdown');
    
    // Toggle do dropdown
    floorButton.addEventListener('click', () => {
        floorDropdown.classList.toggle('show');
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!floorButton.contains(e.target) && !floorDropdown.contains(e.target)) {
            floorDropdown.classList.remove('show');
        }
    });

    // Eventos dos itens do dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const andar = e.target.dataset.floor;
            const texto = e.target.textContent;
            
            // Atualiza o texto do botão
            floorButton.innerHTML = `${texto}<i class="fas fa-chevron-down"></i>`;
            
            // Fecha o dropdown
            floorDropdown.classList.remove('show');
            
            // Carrega o mapa do andar selecionado
            carregarMapa(andar);
        });
    });

    // Evento do botão exportar
    document.querySelector('.btn-export').addEventListener('click', exportarCSV);
}

// Atualiza a visualização de uma sala específica
function updateRoomVisual(roomId) {
    const room = document.querySelector(`[data-room-id="${roomId}"]`);
    if (!room) return;

    const details = getRoomDetails(roomId);
    
    // Remove classes antigas de status
    room.classList.remove('disponivel', 'ocupada', 'manutencao', 'reservada', 'restrita');
    
    // Adiciona nova classe de status
    room.classList.add(details.status);
}

// Atualiza a visualização de todas as salas
function updateAllRoomsVisual() {
    const rooms = document.querySelectorAll('.room');
    rooms.forEach(room => {
        updateRoomVisual(room.dataset.roomId);
    });
}

// Função para exportar dados para CSV
function exportarCSV() {
    // Aqui você implementará a lógica para exportar os dados das salas
    const csv = gerarCSV();
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'salas.csv';
    link.click();
    
    showToast('Dados exportados com sucesso!', 'success');
}

// Função auxiliar para gerar CSV
function gerarCSV() {
    // Aqui você implementará a lógica para gerar o conteúdo do CSV
    const headers = ['Nome', 'Tipo', 'Capacidade', 'Professor', 'Recursos'];
    const rows = []; // Aqui você adicionará os dados das salas
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

// Função auxiliar para obter informações da sala
function obterInformacoesSala(salaId) {
    // Aqui você implementará a lógica para buscar os dados da sala no backend
    // Por enquanto, retornamos dados de exemplo
    return {
        id: salaId,
        nome: 'Sala ' + salaId,
        tipo: 'laboratorio',
        capacidade: 30,
        professor: 'Prof. Silva',
        recursos: ['projetor', 'computadores'],
        ocupada: false
    };
} 