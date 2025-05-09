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

// CARREGAR ANDAR
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

    // Aqui, pega svg do mapa correspondente. Poderia utilizar esses arquivos svg (renomeando eles e alterando aqui) para arquivo shtml contendo o conteúdo do mapa
    try {
        const response = await fetch(`mapas/andar-${floor}.html`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o mapa do ${displayName}`);
        }
        
        const svgContent = await response.text();
        const mapContent = document.getElementById('map-content');
        if (!mapContent) {
            throw new Error('Elemento map-content não encontrado');
        }
        
        mapContent.innerHTML = svgContent;
        
    //   Adiciona eventos de clique nas salas
         const rooms = mapContent.querySelectorAll(`.sala`);
                
         rooms.forEach(room => {
             // Mantém o data-room-id original
            const roomId = room.getAttribute('data-room-id');
            
             // Adiciona evento de clique único que seleciona a sala
             room.addEventListener('click', () => {
                 console.log('Sala clicada:', room);
                 selectRoomOnMap(room);
            });
         });
         
         updateAllRoomsVisual();
        
     } catch (error) {
        console.error('Erro ao carregar mapa:', error);
    }
}

function selectRoomOnMap(roomElement) {
    if (!roomElement) return "Sala não encontrada";
    
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
    
    // Atualiza o painel de informações
    updateRoomInfoPanel(roomDetails);
}

function updateRoomInfoPanel(roomDetails) {
    const popUp = document.querySelector('.pop-up');

    const nomeSala = popUp.querySelector('.pop-up-nome-sala').firstChild;
    const nomeCurso = popUp.querySelector('.pop-up-nome-sala').lastChild;
    const nomeProf = popUp.querySelector('.pop-up-nome-prof');
    const nomeMateria = popUp.querySelector('.pop-up-materia');
    const horario = popUp.querySelector('.pop-up-horario');
    const nivel = popUp.querySelector('.pop-up-nivel');

    const logo = popUp.querySelector('.pop-up-nome-sala');

    console.log({nomeSala, nomeCurso, nomeProf, nomeMateria, horario, nivel});
}


// Dados Mock para Teste
function getRoomDetails(roomId) {
    const mockData = {
        // Térreo (andar-0.html)
        'deposito': {
            name: 'Depósito',
            disciplina: '-',
            docente: '-',
            curso: '-',
            nivel: '-',
            status: 'Manutenção'
        },
        'copa-e-reunioes': {
            name: 'Copa e Sala de Reuniões',
            disciplina: '-',
            docente: '-',
            curso: '-',
            nivel: '-',
            status: 'Restrita'
        },
        'sec-administrativa': {
            name: 'Secretaria Admin',
            disciplina: '-',
            docente: '-',
            curso: '-',
            nivel: '-',
            status: 'Restrita'
        },
        'sec-academica': {
            name: 'Secretaria Acadêmica',
            disciplina: '-',
            docente: '-',
            curso: '-',
            nivel: '-',
            status: 'Restrita'
        },
        'admin': {
            name: 'Salas Administrativas',
            disciplina: '-',
            docente: '-',
            curso: '-',
            nivel: '-',
            status: 'Restrita'
        },
        'sala-02': {
            name: 'Laboratório de Desenho e Topografia',
            disciplina: 'Topografia',
            docente: 'Prof. João Silva',
            curso: 'Engenharia Civil',
            nivel: 'Superior',
            status: 'Disponível'
        },
        'sala-04': {
            name: 'Laboratório de Química Ambiental',
            disciplina: 'Química Ambiental',
            docente: 'Profa. Ana Souza',
            curso: 'Engenharia Ambiental',
            nivel: 'Superior',
            status: 'Disponível'
        },
        'sala-01': {
            name: 'Laboratório de Análises Ambientais',
            disciplina: 'Análises Ambientais',
            docente: 'Prof. Carlos Mendes',
            curso: 'Engenharia Ambiental',
            nivel: 'Superior',
            status: 'Disponível'
        },
        'sala-03': {
            name: 'Laboratório de Microbiologia Ambiental',
            disciplina: 'Microbiologia',
            docente: 'Profa. Maria Clara',
            curso: 'Engenharia Ambiental',
            nivel: 'Superior',
            status: 'Disponível'
        },
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
            curso: '-',
            nivel: '-',
            status: 'Disponível'
        },
        'secretaria': {
            name: 'Secretaria Acadêmica',
            disciplina: '-',
            docente: '-',
            curso: '-',
            nivel: '-',
            status: '-'
        },
        'coordenacao': {
            name: 'Coordenação',
            disciplina: '-',
            docente: '-',
            curso: '-',
            nivel: '-',
            status: '-'
        },

        // Primeiro Andar (andar-1.svg)
        'sala-101': {
            name: 'Sala de Aula',
            disciplina: 'Cálculo',
            docente: 'Prof. Ricardo Alves',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Manutenção'
        },
        'sala-102': {
            name: 'Sala de Aula',
            disciplina: 'Inglês Técnico',
            docente: 'Profa. Sarah Johnson',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Disponível'
        },
        'sala-103': {
            name: 'Sala de Aula',
            disciplina: 'Gestão de Projetos',
            docente: 'Prof. Marcos Paulo',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-104': {
            name: 'Sala de Aula',
            disciplina: 'Gestão de Projetos',
            docente: 'Prof. Marcos Paulo',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-105': {
            name: 'Sala de Aula',
            disciplina: 'Gestão de Projetos',
            docente: 'Prof. Marcos Paulo',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-106': {
            name: 'Sala de Aula',
            disciplina: 'Gestão de Projetos',
            docente: 'Prof. Marcos Paulo',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-107': {
            name: 'Sala de Aula',
            disciplina: 'Gestão de Projetos',
            docente: 'Prof. Marcos Paulo',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-108': {
            name: 'Sala de Aula',
            disciplina: 'Gestão de Projetos',
            docente: 'Prof. Marcos Paulo',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-110': {
            name: 'Sala Maker',
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
            curso: '-',
            nivel: 'Docentes',
            status: 'Disponível'
        },

        // Segundo Andar (andar-2.svg)
        'sala-201': {
            name: 'Sala de Áudio e Vídeo',
            disciplina: 'Engenharia de Software',
            docente: 'Prof. Lucas Mendes',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-202': {
            name: 'Sala de Aula',
            disciplina: 'Matemática Discreta',
            docente: 'Profa. Patricia Lima',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Disponível'
        },
        'sala-203': {
            name: 'Laboratório Univesp',
            disciplina: 'Sistemas Operacionais',
            docente: 'Prof. Gabriel Costa',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-204': {
            name: 'Sala de Aula',
            disciplina: 'Sistemas Operacionais',
            docente: 'Prof. Gabriel Costa',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-205': {
            name: 'Laboratório de Informática',
            disciplina: 'Sistemas Operacionais',
            docente: 'Prof. Gabriel Costa',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-206': {
            name: 'Sala de Aula',
            disciplina: 'Sistemas Operacionais',
            docente: 'Prof. Gabriel Costa',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-207': {
            name: 'Laboratório de Informática',
            disciplina: 'Sistemas Operacionais',
            docente: 'Prof. Gabriel Costa',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-208': {
            name: 'Laboratório de Biologia',
            disciplina: 'Sistemas Operacionais',
            docente: 'Prof. Gabriel Costa',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-209': {
            name: 'Laboratório de Informática',
            disciplina: 'Sistemas Operacionais',
            docente: 'Prof. Gabriel Costa',
            curso: 'Desenvolvimento de Software Multiplataforma',
            nivel: 'Superior Tecnológico',
            status: 'Ocupada'
        },
        'sala-210': {
            name: 'Sala de Áudio e Vídeo',
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
            curso: '-',
            nivel: '-',
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
        });
    });
}

// Atualiza a visualização de uma sala específica
function updateRoomVisual(roomId) {
    const room = document.querySelector(`[data-room-id="${roomId}"]`);
    if (!room) return "Sala não encontrada";

    const details = getRoomDetails(roomId);
    
    // Remove classes antigas de status
    room.querySelector(".status-badge").classList.remove('status-disponivel', 'status-ocupada', 'status-manutencao', 'status-reservada', 'status-restrita');
    
    // Formata status
    const statusFormat = details.status.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Adiciona nova classe de status
    room.querySelector(".status-badge").classList.add(`status-${statusFormat}`);
    room.querySelector(".status-badge").textContent = details.status;

    room.querySelector(".nome-sala").textContent = details.name;
}

// Atualiza a visualização de todas as salas
function updateAllRoomsVisual() {
    const rooms = document.querySelectorAll('.sala');
    rooms.forEach(room => {
        updateRoomVisual(room.dataset.roomId);
    });
}
