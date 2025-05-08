document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (posteriormente serão carregados da API)
    const horarios = [
        { inicio: '18:45', fim: '19:35' },
        { inicio: '19:35', fim: '20:25' },
        { inicio: '20:25', fim: '21:15' },
        { inicio: '21:25', fim: '22:15' },
        { inicio: '22:15', fim: '23:05' }
    ];

    // Disciplinas para DSM (1° nível)
    const disciplinasDSM = [
        { id: 1, nome: 'Algoritmos e Lógica de Programação', tipo: 'tecnicas', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 2, nome: 'Desenvolvimento Web I', tipo: 'desenvolvimento', professor: 'Prof. Dr. Arley Ferreira de Souza' },
        { id: 3, nome: 'Matemática para Computação', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 4, nome: 'Design Digital', tipo: 'estrutura', professor: 'Prof. Esp. André Olímpio' },
        { id: 5, nome: 'Engenharia de Software I', tipo: 'engenharia', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 6, nome: 'Sistemas Operacionais', tipo: 'bd', professor: 'Profa. Esp. Lucineide Nunes Pimenta' }
    ];

    // Disciplinas para DSM (2° nível)
    const disciplinasDSM2 = [
        { id: 7, nome: 'Programação Orientada a Objetos', tipo: 'tecnicas', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 8, nome: 'Desenvolvimento Web II', tipo: 'desenvolvimento', professor: 'Prof. Dr. Arley Ferreira de Souza' },
        { id: 9, nome: 'Banco de Dados', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 10, nome: 'Estrutura de Dados', tipo: 'estrutura', professor: 'Prof. Esp. André Olímpio' },
        { id: 11, nome: 'Engenharia de Software II', tipo: 'engenharia', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 12, nome: 'Redes de Computadores', tipo: 'bd', professor: 'Profa. Esp. Lucineide Nunes Pimenta' }
    ];

    // Disciplinas para DSM (3° nível)
    const disciplinasDSM3 = [
        { id: 13, nome: 'Desenvolvimento Mobile', tipo: 'tecnicas', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 14, nome: 'Programação Web Avançada', tipo: 'desenvolvimento', professor: 'Prof. Dr. Arley Ferreira de Souza' },
        { id: 15, nome: 'Inteligência Artificial', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 16, nome: 'Cloud Computing', tipo: 'estrutura', professor: 'Prof. Esp. André Olímpio' },
        { id: 17, nome: 'DevOps', tipo: 'engenharia', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 18, nome: 'Segurança da Informação', tipo: 'bd', professor: 'Profa. Esp. Lucineide Nunes Pimenta' }
    ];

    // Disciplinas para GEO (1° nível)
    const disciplinasGEO = [
        { id: 19, nome: 'Cartografia Básica', tipo: 'tecnicas', professor: 'Prof. Dr. João Silva' },
        { id: 20, nome: 'Geologia Introdutória', tipo: 'desenvolvimento', professor: 'Profa. Dra. Maria Santos' },
        { id: 21, nome: 'Matemática Aplicada', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 22, nome: 'Topografia I', tipo: 'estrutura', professor: 'Prof. Dr. Pedro Oliveira' },
        { id: 23, nome: 'Sensoriamento Remoto', tipo: 'engenharia', professor: 'Profa. Dra. Ana Costa' },
        { id: 24, nome: 'Sistemas de Inf. Geográfica', tipo: 'bd', professor: 'Prof. Dr. Carlos Mendes' }
    ];

    // Disciplinas para GEO (2° nível)
    const disciplinasGEO2 = [
        { id: 25, nome: 'Cartografia Digital', tipo: 'tecnicas', professor: 'Prof. Dr. João Silva' },
        { id: 26, nome: 'Geoprocessamento', tipo: 'desenvolvimento', professor: 'Profa. Dra. Maria Santos' },
        { id: 27, nome: 'Topografia II', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 28, nome: 'Geodésia', tipo: 'estrutura', professor: 'Prof. Dr. Pedro Oliveira' },
        { id: 29, nome: 'Fotogrametria', tipo: 'engenharia', professor: 'Profa. Dra. Ana Costa' },
        { id: 30, nome: 'SIG Avançado', tipo: 'bd', professor: 'Prof. Dr. Carlos Mendes' }
    ];

    // Disciplinas para GEO (3° nível)
    const disciplinasGEO3 = [
        { id: 31, nome: 'Geomática', tipo: 'tecnicas', professor: 'Prof. Dr. João Silva' },
        { id: 32, nome: 'Sensoriamento Remoto Avançado', tipo: 'desenvolvimento', professor: 'Profa. Dra. Maria Santos' },
        { id: 33, nome: 'Análise Espacial', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 34, nome: 'Geomarketing', tipo: 'estrutura', professor: 'Prof. Dr. Pedro Oliveira' },
        { id: 35, nome: 'Geoinformação', tipo: 'engenharia', professor: 'Profa. Dra. Ana Costa' },
        { id: 36, nome: 'Geotecnologias', tipo: 'bd', professor: 'Prof. Dr. Carlos Mendes' }
    ];

    // Disciplinas para MAR (1° nível)
    const disciplinasMAR = [
        { id: 37, nome: 'Introdução ao Meio Ambiente', tipo: 'tecnicas', professor: 'Prof. Dr. Roberto Lima' },
        { id: 38, nome: 'Climatologia Básica', tipo: 'desenvolvimento', professor: 'Profa. Dra. Juliana Martins' },
        { id: 39, nome: 'Matemática Aplicada', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 40, nome: 'Geologia Básica', tipo: 'estrutura', professor: 'Prof. Dr. Fernando Costa' },
        { id: 41, nome: 'Recursos Hídricos', tipo: 'engenharia', professor: 'Prof. Dr. Ricardo Santos' },
        { id: 42, nome: 'Sistemas Ambientais', tipo: 'bd', professor: 'Profa. Dra. Patricia Oliveira' }
    ];

    // Disciplinas para MAR (2° nível)
    const disciplinasMAR2 = [
        { id: 43, nome: 'Gestão de Recursos Hídricos', tipo: 'tecnicas', professor: 'Prof. Dr. Roberto Lima' },
        { id: 44, nome: 'Climatologia e Meteorologia', tipo: 'desenvolvimento', professor: 'Profa. Dra. Juliana Martins' },
        { id: 45, nome: 'Hidrologia Aplicada', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 46, nome: 'Geologia Ambiental', tipo: 'estrutura', professor: 'Prof. Dr. Fernando Costa' },
        { id: 47, nome: 'Saneamento Ambiental', tipo: 'engenharia', professor: 'Prof. Dr. Ricardo Santos' },
        { id: 48, nome: 'Legislação Ambiental', tipo: 'bd', professor: 'Profa. Dra. Patricia Oliveira' }
    ];

    // Disciplinas para MAR (3° nível)
    const disciplinasMAR3 = [
        { id: 49, nome: 'Gestão de Bacias Hidrográficas', tipo: 'tecnicas', professor: 'Prof. Dr. Roberto Lima' },
        { id: 50, nome: 'Recuperação de Áreas Degradadas', tipo: 'desenvolvimento', professor: 'Profa. Dra. Juliana Martins' },
        { id: 51, nome: 'Qualidade da Água', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 52, nome: 'Sistemas de Gestão Ambiental', tipo: 'estrutura', professor: 'Prof. Dr. Fernando Costa' },
        { id: 53, nome: 'Energias Renováveis', tipo: 'engenharia', professor: 'Prof. Dr. Ricardo Santos' },
        { id: 54, nome: 'Gestão de Resíduos', tipo: 'bd', professor: 'Profa. Dra. Patricia Oliveira' }
    ];

    const salas = [
        { id: 1, nome: 'Sala 101', tipo: 'sala' },
        { id: 2, nome: 'Lab 01', tipo: 'laboratorio' },
        { id: 3, nome: 'Lab 02', tipo: 'laboratorio' },
        { id: 4, nome: 'Sala 102', tipo: 'sala' },
        { id: 5, nome: 'Lab 03', tipo: 'laboratorio' },
        { id: 6, nome: 'Sala 103', tipo: 'sala' }
    ];

    // Grade de horários para DSM (1° nível)
    const aulasDSM = [
        { dia: 1, horario: 0, disciplina: disciplinasDSM[0] }, // Segunda, 18:45
        { dia: 1, horario: 1, disciplina: disciplinasDSM[0] }, // Segunda, 19:35
        { dia: 1, horario: 2, disciplina: disciplinasDSM[0] }, // Segunda, 20:25
        { dia: 1, horario: 3, disciplina: disciplinasDSM[3] }, // Segunda, 21:25
        { dia: 1, horario: 4, disciplina: disciplinasDSM[3] }, // Segunda, 22:15

        { dia: 2, horario: 0, disciplina: disciplinasDSM[1] }, // Terça
        { dia: 2, horario: 1, disciplina: disciplinasDSM[1] },
        { dia: 2, horario: 2, disciplina: disciplinasDSM[1] },
        { dia: 2, horario: 3, disciplina: disciplinasDSM[4] },
        { dia: 2, horario: 4, disciplina: disciplinasDSM[4] },

        { dia: 3, horario: 0, disciplina: disciplinasDSM[2] }, // Quarta
        { dia: 3, horario: 1, disciplina: disciplinasDSM[2] },
        { dia: 3, horario: 2, disciplina: disciplinasDSM[2] },
        { dia: 3, horario: 3, disciplina: disciplinasDSM[5] },
        { dia: 3, horario: 4, disciplina: disciplinasDSM[5] },

        { dia: 4, horario: 0, disciplina: disciplinasDSM[3] }, // Quinta
        { dia: 4, horario: 1, disciplina: disciplinasDSM[3] },
        { dia: 4, horario: 2, disciplina: disciplinasDSM[3] },
        { dia: 4, horario: 3, disciplina: disciplinasDSM[0] },
        { dia: 4, horario: 4, disciplina: disciplinasDSM[0] },

        { dia: 5, horario: 0, disciplina: disciplinasDSM[4] }, // Sexta
        { dia: 5, horario: 1, disciplina: disciplinasDSM[4] },
        { dia: 5, horario: 2, disciplina: disciplinasDSM[4] },
        { dia: 5, horario: 3, disciplina: disciplinasDSM[1] },
        { dia: 5, horario: 4, disciplina: disciplinasDSM[1] }
    ];

    // Grade de horários para DSM (2° nível)
    const aulasDSM2 = [
        { dia: 1, horario: 0, disciplina: disciplinasDSM2[0] },
        { dia: 1, horario: 1, disciplina: disciplinasDSM2[0] },
        { dia: 1, horario: 2, disciplina: disciplinasDSM2[0] },
        { dia: 1, horario: 3, disciplina: disciplinasDSM2[3] },
        { dia: 1, horario: 4, disciplina: disciplinasDSM2[3] },

        { dia: 2, horario: 0, disciplina: disciplinasDSM2[1] },
        { dia: 2, horario: 1, disciplina: disciplinasDSM2[1] },
        { dia: 2, horario: 2, disciplina: disciplinasDSM2[1] },
        { dia: 2, horario: 3, disciplina: disciplinasDSM2[4] },
        { dia: 2, horario: 4, disciplina: disciplinasDSM2[4] },

        { dia: 3, horario: 0, disciplina: disciplinasDSM2[2] },
        { dia: 3, horario: 1, disciplina: disciplinasDSM2[2] },
        { dia: 3, horario: 2, disciplina: disciplinasDSM2[2] },
        { dia: 3, horario: 3, disciplina: disciplinasDSM2[5] },
        { dia: 3, horario: 4, disciplina: disciplinasDSM2[5] },

        { dia: 4, horario: 0, disciplina: disciplinasDSM2[3] },
        { dia: 4, horario: 1, disciplina: disciplinasDSM2[3] },
        { dia: 4, horario: 2, disciplina: disciplinasDSM2[3] },
        { dia: 4, horario: 3, disciplina: disciplinasDSM2[0] },
        { dia: 4, horario: 4, disciplina: disciplinasDSM2[0] },

        { dia: 5, horario: 0, disciplina: disciplinasDSM2[4] },
        { dia: 5, horario: 1, disciplina: disciplinasDSM2[4] },
        { dia: 5, horario: 2, disciplina: disciplinasDSM2[4] },
        { dia: 5, horario: 3, disciplina: disciplinasDSM2[1] },
        { dia: 5, horario: 4, disciplina: disciplinasDSM2[1] }
    ];

    // Grade de horários para DSM (3° nível)
    const aulasDSM3 = [
        { dia: 1, horario: 0, disciplina: disciplinasDSM3[0] },
        { dia: 1, horario: 1, disciplina: disciplinasDSM3[0] },
        { dia: 1, horario: 2, disciplina: disciplinasDSM3[0] },
        { dia: 1, horario: 3, disciplina: disciplinasDSM3[3] },
        { dia: 1, horario: 4, disciplina: disciplinasDSM3[3] },

        { dia: 2, horario: 0, disciplina: disciplinasDSM3[1] },
        { dia: 2, horario: 1, disciplina: disciplinasDSM3[1] },
        { dia: 2, horario: 2, disciplina: disciplinasDSM3[1] },
        { dia: 2, horario: 3, disciplina: disciplinasDSM3[4] },
        { dia: 2, horario: 4, disciplina: disciplinasDSM3[4] },

        { dia: 3, horario: 0, disciplina: disciplinasDSM3[2] },
        { dia: 3, horario: 1, disciplina: disciplinasDSM3[2] },
        { dia: 3, horario: 2, disciplina: disciplinasDSM3[2] },
        { dia: 3, horario: 3, disciplina: disciplinasDSM3[5] },
        { dia: 3, horario: 4, disciplina: disciplinasDSM3[5] },

        { dia: 4, horario: 0, disciplina: disciplinasDSM3[3] },
        { dia: 4, horario: 1, disciplina: disciplinasDSM3[3] },
        { dia: 4, horario: 2, disciplina: disciplinasDSM3[3] },
        { dia: 4, horario: 3, disciplina: disciplinasDSM3[0] },
        { dia: 4, horario: 4, disciplina: disciplinasDSM3[0] },

        { dia: 5, horario: 0, disciplina: disciplinasDSM3[4] },
        { dia: 5, horario: 1, disciplina: disciplinasDSM3[4] },
        { dia: 5, horario: 2, disciplina: disciplinasDSM3[4] },
        { dia: 5, horario: 3, disciplina: disciplinasDSM3[1] },
        { dia: 5, horario: 4, disciplina: disciplinasDSM3[1] }
    ];

    // Grade de horários para GEO (1° nível)
    const aulasGEO = [
        { dia: 1, horario: 0, disciplina: disciplinasGEO[0] },
        { dia: 1, horario: 1, disciplina: disciplinasGEO[0] },
        { dia: 1, horario: 2, disciplina: disciplinasGEO[0] },
        { dia: 1, horario: 3, disciplina: disciplinasGEO[3] },
        { dia: 1, horario: 4, disciplina: disciplinasGEO[3] },

        { dia: 2, horario: 0, disciplina: disciplinasGEO[1] },
        { dia: 2, horario: 1, disciplina: disciplinasGEO[1] },
        { dia: 2, horario: 2, disciplina: disciplinasGEO[1] },
        { dia: 2, horario: 3, disciplina: disciplinasGEO[4] },
        { dia: 2, horario: 4, disciplina: disciplinasGEO[4] },

        { dia: 3, horario: 0, disciplina: disciplinasGEO[2] },
        { dia: 3, horario: 1, disciplina: disciplinasGEO[2] },
        { dia: 3, horario: 2, disciplina: disciplinasGEO[2] },
        { dia: 3, horario: 3, disciplina: disciplinasGEO[5] },
        { dia: 3, horario: 4, disciplina: disciplinasGEO[5] },

        { dia: 4, horario: 0, disciplina: disciplinasGEO[3] },
        { dia: 4, horario: 1, disciplina: disciplinasGEO[3] },
        { dia: 4, horario: 2, disciplina: disciplinasGEO[3] },
        { dia: 4, horario: 3, disciplina: disciplinasGEO[0] },
        { dia: 4, horario: 4, disciplina: disciplinasGEO[0] },

        { dia: 5, horario: 0, disciplina: disciplinasGEO[4] },
        { dia: 5, horario: 1, disciplina: disciplinasGEO[4] },
        { dia: 5, horario: 2, disciplina: disciplinasGEO[4] },
        { dia: 5, horario: 3, disciplina: disciplinasGEO[1] },
        { dia: 5, horario: 4, disciplina: disciplinasGEO[1] }
    ];

    // Grade de horários para GEO (2° nível)
    const aulasGEO2 = [
        { dia: 1, horario: 0, disciplina: disciplinasGEO2[0] },
        { dia: 1, horario: 1, disciplina: disciplinasGEO2[0] },
        { dia: 1, horario: 2, disciplina: disciplinasGEO2[0] },
        { dia: 1, horario: 3, disciplina: disciplinasGEO2[3] },
        { dia: 1, horario: 4, disciplina: disciplinasGEO2[3] },

        { dia: 2, horario: 0, disciplina: disciplinasGEO2[1] },
        { dia: 2, horario: 1, disciplina: disciplinasGEO2[1] },
        { dia: 2, horario: 2, disciplina: disciplinasGEO2[1] },
        { dia: 2, horario: 3, disciplina: disciplinasGEO2[4] },
        { dia: 2, horario: 4, disciplina: disciplinasGEO2[4] },

        { dia: 3, horario: 0, disciplina: disciplinasGEO2[2] },
        { dia: 3, horario: 1, disciplina: disciplinasGEO2[2] },
        { dia: 3, horario: 2, disciplina: disciplinasGEO2[2] },
        { dia: 3, horario: 3, disciplina: disciplinasGEO2[5] },
        { dia: 3, horario: 4, disciplina: disciplinasGEO2[5] },

        { dia: 4, horario: 0, disciplina: disciplinasGEO2[3] },
        { dia: 4, horario: 1, disciplina: disciplinasGEO2[3] },
        { dia: 4, horario: 2, disciplina: disciplinasGEO2[3] },
        { dia: 4, horario: 3, disciplina: disciplinasGEO2[0] },
        { dia: 4, horario: 4, disciplina: disciplinasGEO2[0] },

        { dia: 5, horario: 0, disciplina: disciplinasGEO2[4] },
        { dia: 5, horario: 1, disciplina: disciplinasGEO2[4] },
        { dia: 5, horario: 2, disciplina: disciplinasGEO2[4] },
        { dia: 5, horario: 3, disciplina: disciplinasGEO2[1] },
        { dia: 5, horario: 4, disciplina: disciplinasGEO2[1] }
    ];

    // Grade de horários para GEO (3° nível)
    const aulasGEO3 = [
        { dia: 1, horario: 0, disciplina: disciplinasGEO3[0] },
        { dia: 1, horario: 1, disciplina: disciplinasGEO3[0] },
        { dia: 1, horario: 2, disciplina: disciplinasGEO3[0] },
        { dia: 1, horario: 3, disciplina: disciplinasGEO3[3] },
        { dia: 1, horario: 4, disciplina: disciplinasGEO3[3] },

        { dia: 2, horario: 0, disciplina: disciplinasGEO3[1] },
        { dia: 2, horario: 1, disciplina: disciplinasGEO3[1] },
        { dia: 2, horario: 2, disciplina: disciplinasGEO3[1] },
        { dia: 2, horario: 3, disciplina: disciplinasGEO3[4] },
        { dia: 2, horario: 4, disciplina: disciplinasGEO3[4] },

        { dia: 3, horario: 0, disciplina: disciplinasGEO3[2] },
        { dia: 3, horario: 1, disciplina: disciplinasGEO3[2] },
        { dia: 3, horario: 2, disciplina: disciplinasGEO3[2] },
        { dia: 3, horario: 3, disciplina: disciplinasGEO3[5] },
        { dia: 3, horario: 4, disciplina: disciplinasGEO3[5] },

        { dia: 4, horario: 0, disciplina: disciplinasGEO3[3] },
        { dia: 4, horario: 1, disciplina: disciplinasGEO3[3] },
        { dia: 4, horario: 2, disciplina: disciplinasGEO3[3] },
        { dia: 4, horario: 3, disciplina: disciplinasGEO3[0] },
        { dia: 4, horario: 4, disciplina: disciplinasGEO3[0] },

        { dia: 5, horario: 0, disciplina: disciplinasGEO3[4] },
        { dia: 5, horario: 1, disciplina: disciplinasGEO3[4] },
        { dia: 5, horario: 2, disciplina: disciplinasGEO3[4] },
        { dia: 5, horario: 3, disciplina: disciplinasGEO3[1] },
        { dia: 5, horario: 4, disciplina: disciplinasGEO3[1] }
    ];

    // Grade de horários para MAR (1° nível)
    const aulasMAR = [
        { dia: 1, horario: 0, disciplina: disciplinasMAR[0] },
        { dia: 1, horario: 1, disciplina: disciplinasMAR[0] },
        { dia: 1, horario: 2, disciplina: disciplinasMAR[0] },
        { dia: 1, horario: 3, disciplina: disciplinasMAR[3] },
        { dia: 1, horario: 4, disciplina: disciplinasMAR[3] },

        { dia: 2, horario: 0, disciplina: disciplinasMAR[1] },
        { dia: 2, horario: 1, disciplina: disciplinasMAR[1] },
        { dia: 2, horario: 2, disciplina: disciplinasMAR[1] },
        { dia: 2, horario: 3, disciplina: disciplinasMAR[4] },
        { dia: 2, horario: 4, disciplina: disciplinasMAR[4] },

        { dia: 3, horario: 0, disciplina: disciplinasMAR[2] },
        { dia: 3, horario: 1, disciplina: disciplinasMAR[2] },
        { dia: 3, horario: 2, disciplina: disciplinasMAR[2] },
        { dia: 3, horario: 3, disciplina: disciplinasMAR[5] },
        { dia: 3, horario: 4, disciplina: disciplinasMAR[5] },

        { dia: 4, horario: 0, disciplina: disciplinasMAR[3] },
        { dia: 4, horario: 1, disciplina: disciplinasMAR[3] },
        { dia: 4, horario: 2, disciplina: disciplinasMAR[3] },
        { dia: 4, horario: 3, disciplina: disciplinasMAR[0] },
        { dia: 4, horario: 4, disciplina: disciplinasMAR[0] },

        { dia: 5, horario: 0, disciplina: disciplinasMAR[4] },
        { dia: 5, horario: 1, disciplina: disciplinasMAR[4] },
        { dia: 5, horario: 2, disciplina: disciplinasMAR[4] },
        { dia: 5, horario: 3, disciplina: disciplinasMAR[1] },
        { dia: 5, horario: 4, disciplina: disciplinasMAR[1] }
    ];

    // Grade de horários para MAR (2° nível)
    const aulasMAR2 = [
        { dia: 1, horario: 0, disciplina: disciplinasMAR2[0] },
        { dia: 1, horario: 1, disciplina: disciplinasMAR2[0] },
        { dia: 1, horario: 2, disciplina: disciplinasMAR2[0] },
        { dia: 1, horario: 3, disciplina: disciplinasMAR2[3] },
        { dia: 1, horario: 4, disciplina: disciplinasMAR2[3] },

        { dia: 2, horario: 0, disciplina: disciplinasMAR2[1] },
        { dia: 2, horario: 1, disciplina: disciplinasMAR2[1] },
        { dia: 2, horario: 2, disciplina: disciplinasMAR2[1] },
        { dia: 2, horario: 3, disciplina: disciplinasMAR2[4] },
        { dia: 2, horario: 4, disciplina: disciplinasMAR2[4] },

        { dia: 3, horario: 0, disciplina: disciplinasMAR2[2] },
        { dia: 3, horario: 1, disciplina: disciplinasMAR2[2] },
        { dia: 3, horario: 2, disciplina: disciplinasMAR2[2] },
        { dia: 3, horario: 3, disciplina: disciplinasMAR2[5] },
        { dia: 3, horario: 4, disciplina: disciplinasMAR2[5] },

        { dia: 4, horario: 0, disciplina: disciplinasMAR2[3] },
        { dia: 4, horario: 1, disciplina: disciplinasMAR2[3] },
        { dia: 4, horario: 2, disciplina: disciplinasMAR2[3] },
        { dia: 4, horario: 3, disciplina: disciplinasMAR2[0] },
        { dia: 4, horario: 4, disciplina: disciplinasMAR2[0] },

        { dia: 5, horario: 0, disciplina: disciplinasMAR2[4] },
        { dia: 5, horario: 1, disciplina: disciplinasMAR2[4] },
        { dia: 5, horario: 2, disciplina: disciplinasMAR2[4] },
        { dia: 5, horario: 3, disciplina: disciplinasMAR2[1] },
        { dia: 5, horario: 4, disciplina: disciplinasMAR2[1] }
    ];

    // Grade de horários para MAR (3° nível)
    const aulasMAR3 = [
        { dia: 1, horario: 0, disciplina: disciplinasMAR3[0] },
        { dia: 1, horario: 1, disciplina: disciplinasMAR3[0] },
        { dia: 1, horario: 2, disciplina: disciplinasMAR3[0] },
        { dia: 1, horario: 3, disciplina: disciplinasMAR3[3] },
        { dia: 1, horario: 4, disciplina: disciplinasMAR3[3] },

        { dia: 2, horario: 0, disciplina: disciplinasMAR3[1] },
        { dia: 2, horario: 1, disciplina: disciplinasMAR3[1] },
        { dia: 2, horario: 2, disciplina: disciplinasMAR3[1] },
        { dia: 2, horario: 3, disciplina: disciplinasMAR3[4] },
        { dia: 2, horario: 4, disciplina: disciplinasMAR3[4] },

        { dia: 3, horario: 0, disciplina: disciplinasMAR3[2] },
        { dia: 3, horario: 1, disciplina: disciplinasMAR3[2] },
        { dia: 3, horario: 2, disciplina: disciplinasMAR3[2] },
        { dia: 3, horario: 3, disciplina: disciplinasMAR3[5] },
        { dia: 3, horario: 4, disciplina: disciplinasMAR3[5] },

        { dia: 4, horario: 0, disciplina: disciplinasMAR3[3] },
        { dia: 4, horario: 1, disciplina: disciplinasMAR3[3] },
        { dia: 4, horario: 2, disciplina: disciplinasMAR3[3] },
        { dia: 4, horario: 3, disciplina: disciplinasMAR3[0] },
        { dia: 4, horario: 4, disciplina: disciplinasMAR3[0] },

        { dia: 5, horario: 0, disciplina: disciplinasMAR3[4] },
        { dia: 5, horario: 1, disciplina: disciplinasMAR3[4] },
        { dia: 5, horario: 2, disciplina: disciplinasMAR3[4] },
        { dia: 5, horario: 3, disciplina: disciplinasMAR3[1] },
        { dia: 5, horario: 4, disciplina: disciplinasMAR3[1] }
    ];

    // Mapa de cores dos professores (adicionado no início do arquivo, após as declarações das disciplinas)
    const coresProfessores = {
        'Prof. Esp. Henrique Duarte Borges Louro': 'tecnicas',
        'Prof. Dr. Arley Ferreira de Souza': 'desenvolvimento',
        'Prof. Dr. Fabrício Galende Marques de Carvalho': 'matematica',
        'Prof. Esp. André Olímpio': 'estrutura',
        'Profa. Esp. Lucineide Nunes Pimenta': 'bd',
        'Prof. Dr. João Silva': 'tecnicas',
        'Profa. Dra. Maria Santos': 'desenvolvimento',
        'Prof. Dr. Pedro Oliveira': 'estrutura',
        'Profa. Dra. Ana Costa': 'engenharia',
        'Prof. Dr. Carlos Mendes': 'bd',
        'Prof. Dr. Roberto Lima': 'tecnicas',
        'Profa. Dra. Juliana Martins': 'desenvolvimento',
        'Prof. Dr. Fernando Costa': 'estrutura',
        'Prof. Dr. Ricardo Santos': 'engenharia',
        'Profa. Dra. Patricia Oliveira': 'bd'
    };

    // Função para salvar localmente as alterações de professor
    function salvarAlteracoesLocalmente(disciplinaId, novoProfessor, novaCor) {
        const alteracoes = JSON.parse(localStorage.getItem('alteracoesProfessores') || '{}');
        alteracoes[disciplinaId] = {
            professor: novoProfessor,
            cor: novaCor,
            dataAlteracao: new Date().toISOString()
        };
        localStorage.setItem('alteracoesProfessores', JSON.stringify(alteracoes));
    }

    // Função para obter alterações locais
    function obterAlteracaoLocal(disciplinaId) {
        const alteracoes = JSON.parse(localStorage.getItem('alteracoesProfessores') || '{}');
        return alteracoes[disciplinaId];
    }

    // Preencher a tabela de horários
    const tbody = document.querySelector('.grade-table tbody');
    horarios.forEach((horario, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${horario.inicio} às ${horario.fim}</td>
            <td data-dia="1" data-horario="${index}"></td>
            <td data-dia="2" data-horario="${index}"></td>
            <td data-dia="3" data-horario="${index}"></td>
            <td data-dia="4" data-horario="${index}"></td>
            <td data-dia="5" data-horario="${index}"></td>
        `;
        tbody.appendChild(tr);
    });

    // Função para preencher a grade com as aulas do curso selecionado
    function preencherGrade(curso, nivel) {
        // Limpar a grade atual
        document.querySelectorAll('.grade-table td[data-dia]').forEach(cell => {
            cell.innerHTML = '';
        });

        // Selecionar as aulas do curso e nível apropriados
        let aulas;
        switch(curso) {
            case 'DSM':
                aulas = nivel === '1' ? aulasDSM : 
                       nivel === '2' ? aulasDSM2 : aulasDSM3;
                break;
            case 'GEO':
                aulas = nivel === '1' ? aulasGEO : 
                       nivel === '2' ? aulasGEO2 : aulasGEO3;
                break;
            case 'MAR':
                aulas = nivel === '1' ? aulasMAR : 
                       nivel === '2' ? aulasMAR2 : aulasMAR3;
                break;
            default:
                aulas = aulasDSM;
        }

        // Ao preencher a grade, verificar alterações locais
        aulas.forEach(aula => {
            const alteracao = obterAlteracaoLocal(aula.disciplina.id);
            if (alteracao) {
                aula.disciplina.professor = alteracao.professor;
                aula.disciplina.tipo = alteracao.cor;
            }

            const cell = tbody.rows[aula.horario].cells[aula.dia];
            cell.innerHTML = `
                <div class="aula-cell ${aula.disciplina.tipo}" 
                     data-aula='${JSON.stringify(aula)}'
                     draggable="true"
                     data-cell-id="${aula.dia}-${aula.horario}">
                    ${aula.disciplina.nome}<br>
                    <small>${aula.disciplina.professor}</small>
                </div>
            `;

            // Adicionar eventos de drag and drop
            const aulaCell = cell.querySelector('.aula-cell');
            aulaCell.addEventListener('dragstart', handleDragStart);
            aulaCell.addEventListener('dragend', handleDragEnd);
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('dragleave', handleDragLeave);
            cell.addEventListener('drop', handleDrop);

            // Manter o evento de clique para o modal
            cell.onclick = function(e) {
                if (!e.target.closest('.aula-cell').classList.contains('dragging')) {
                    mostrarDetalhesMateria(this);
                }
            };
        });

        // Atualizar a lista de docentes
        const docentesTable = document.querySelector('.docentes-table tbody');
        docentesTable.innerHTML = '';
        const professoresUnicos = [...new Set(aulas.map(a => a.disciplina.professor))];
        professoresUnicos.forEach(professor => {
            const disciplina = aulas.find(a => a.disciplina.professor === professor).disciplina;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="background-color: ${disciplina.tipo === 'tecnicas' ? '#e6ccff' : 
                                            disciplina.tipo === 'desenvolvimento' ? '#ffffcc' :
                                            disciplina.tipo === 'matematica' ? '#cce6ff' :
                                            disciplina.tipo === 'estrutura' ? '#e6f3ff' :
                                            disciplina.tipo === 'engenharia' ? '#ccffff' : '#ffcccc'}">${professor}</td>
            `;
            docentesTable.appendChild(tr);
        });
    }

    // Evento para mudança de curso e nível
    document.querySelectorAll('.grade-actions select').forEach(select => {
        select.addEventListener('change', function() {
            const curso = document.querySelector('.grade-actions select:first-child').value;
            const nivel = document.querySelector('.grade-actions select:nth-child(2)').value;
            preencherGrade(curso, nivel);
            console.log('Grade atualizada com sucesso!');
        });
    });

    // Preencher a grade inicial com DSM nível 1
    preencherGrade('DSM', '1');

    // Função para atualizar os selects
    function atualizarSelects(curso, nivel) {
        // Atualizar os selects com as disciplinas e professores do curso/nível atual
        atualizarSelectsDisciplinas(curso, nivel);
        atualizarSelectsProfessores(curso, nivel);
    }

    function atualizarSelectsDisciplinas(curso, nivel) {
        // Implementar lógica de atualização dos selects de disciplinas
    }

    function atualizarSelectsProfessores(curso, nivel) {
        // Implementar lógica de atualização dos selects de professores
    }

    // Variáveis globais para o modal
    window.materiaAtual = null;
    window.celulaAtual = null;

    // Variáveis globais para o drag and drop
    let draggedCell = null;
    let draggedCellData = null;

    // Função para iniciar o drag
    function handleDragStart(e) {
        draggedCell = this;
        draggedCellData = JSON.parse(this.dataset.aula);
        
        // Adicionar classe de dragging
        this.classList.add('dragging');
        
        // Definir dados do drag
        e.dataTransfer.setData('text/plain', this.dataset.cellId);
        e.dataTransfer.effectAllowed = 'move';
    }

    // Função para finalizar o drag
    function handleDragEnd(e) {
        // Remover classe de dragging
        this.classList.remove('dragging');
        
        // Limpar variáveis
        draggedCell = null;
        draggedCellData = null;
    }

    // Função para quando o elemento está sendo arrastado sobre uma célula
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        // Adicionar classe de drag-over
        this.classList.add('drag-over');
    }

    // Função para quando o elemento sai da célula
    function handleDragLeave(e) {
        // Remover classe de drag-over
        this.classList.remove('drag-over');
    }

    // Função para quando o elemento é solto
    function handleDrop(e) {
        e.preventDefault();
        
        // Remover classe de drag-over
        this.classList.remove('drag-over');
        
        // Se não houver célula sendo arrastada, retorna
        if (!draggedCell) return;

        // Pegar a célula de destino
        const targetCell = this;
        const sourceCell = draggedCell.parentElement;

        // Se a célula de destino for a mesma da origem, não faz nada
        if (targetCell === sourceCell) return;

        // Pegar os dados das células
        const sourceData = JSON.parse(draggedCell.dataset.aula);
        const targetData = targetCell.querySelector('.aula-cell') ? 
            JSON.parse(targetCell.querySelector('.aula-cell').dataset.aula) : null;

        // Se a célula de destino estiver vazia
        if (!targetData) {
            // Mover a célula arrastada para cá
            targetCell.appendChild(draggedCell);
            
            // Atualizar os dados da célula
            const [dia, horario] = targetCell.dataset.dia.split('-');
            sourceData.dia = parseInt(dia);
            sourceData.horario = parseInt(horario);
            draggedCell.dataset.aula = JSON.stringify(sourceData);
            
            // Registrar a troca
            registrarTrocaAula(sourceData);
        } else {
            // Trocar as células
            const targetCellContent = targetCell.querySelector('.aula-cell');
            
            // Atualizar os dados da célula de destino
            const [sourceDia, sourceHorario] = sourceCell.dataset.dia.split('-');
            targetData.dia = parseInt(sourceDia);
            targetData.horario = parseInt(sourceHorario);
            targetCellContent.dataset.aula = JSON.stringify(targetData);
            
            // Atualizar os dados da célula de origem
            const [targetDia, targetHorario] = targetCell.dataset.dia.split('-');
            sourceData.dia = parseInt(targetDia);
            sourceData.horario = parseInt(targetHorario);
            draggedCell.dataset.aula = JSON.stringify(sourceData);
            
            // Trocar as células fisicamente
            sourceCell.appendChild(targetCellContent);
            targetCell.appendChild(draggedCell);
            
            // Registrar as duas trocas
            registrarTrocaAula(sourceData);
            registrarTrocaAula(targetData);
        }
    }

    // Função para registrar a troca de aula (será implementada posteriormente com o backend)
    function registrarTrocaAula(aulaData) {
        // Aqui você implementará a lógica para salvar a troca no banco de dados
        console.log('Troca registrada:', {
            disciplina: aulaData.disciplina,
            dia: aulaData.dia,
            horario: aulaData.horario,
            timestamp: new Date().toISOString()
        });
        
        // Exemplo de como seria a chamada para a API
        /*
        fetch('/api/aulas/trocar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                disciplinaId: aulaData.disciplina.id,
                dia: aulaData.dia,
                horario: aulaData.horario
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Troca registrada com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao registrar troca:', error);
        });
        */
    }

    // Função para mostrar detalhes da matéria
    function mostrarDetalhesMateria(celula) {
        const aulaCell = celula.querySelector('.aula-cell');
        if (!aulaCell) return;

        try {
            const aula = JSON.parse(aulaCell.dataset.aula);
            const disciplina = aula.disciplina;
            celulaAtual = celula;
            
            // Pegar o horário específico desta célula
            const diaIndex = parseInt(celula.dataset.dia);
            const horarioIndex = parseInt(celula.dataset.horario);
            
            const dia = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'][diaIndex - 1];
            const horario = horarios[horarioIndex];
            
            materiaAtual = {
                id: disciplina.id,
                nome: disciplina.nome,
                professor: disciplina.professor,
                horarios: [{
                    dia: dia,
                    hora: `${horario.inicio} - ${horario.fim}`
                }],
                tipo: disciplina.tipo
            };
            
            abrirModal(materiaAtual);
        } catch (error) {
            console.error('Erro ao processar dados da matéria:', error);
        }
    }

    // Função para mostrar toast
    function showToast(message, type = 'success') {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✓' : '✕';
        
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
            <div class="toast-close">×</div>
        `;

        toastContainer.appendChild(toast);

        // Adicionar evento para fechar o toast
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        });

        // Remover toast automaticamente após 5 segundos
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'slideOut 0.3s ease-out forwards';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }
        }, 5000);
    }

    // Atualizar a função salvarAlteracoes
    function salvarAlteracoes(e) {
        e.preventDefault();
            
        const materiaId = document.getElementById('modalMateriaNome').value;
        const professor = document.getElementById('modalProfessorNome').value;
        const horariosNovos = Array.from(document.querySelectorAll('.horario-item')).map(item => ({
            dia: item.querySelector('.dia-select').value,
            hora: item.querySelector('.horario-select').value
        })).filter(h => h.dia && h.hora);

        // Validar se todos os campos necessários foram preenchidos
        if (!materiaId || !professor || horariosNovos.length === 0) {
            showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Atualizar os dados da matéria
        if (celulaAtual && materiaAtual) {
            const disciplinaSelecionada = obterDisciplinaPorId(materiaId);
            if (disciplinaSelecionada) {
                // Obter a cor associada ao novo professor
                const novaCor = coresProfessores[professor] || disciplinaSelecionada.tipo;
                
                // Salvar alteração localmente
                salvarAlteracoesLocalmente(materiaId, professor, novaCor);

                // Pegar os dados da aula atual
                const aulaAtual = JSON.parse(celulaAtual.querySelector('.aula-cell').dataset.aula);
                const horarioAtual = parseInt(celulaAtual.dataset.horario);
                const diaAtual = parseInt(celulaAtual.dataset.dia);

                console.log('Dados iniciais:', {
                    celulaAtual: {
                        dia: diaAtual,
                        horario: horarioAtual,
                        aula: aulaAtual
                    }
                });

                // Para cada horário selecionado
                horariosNovos.forEach(horarioNovo => {
                    // Converter dia texto para número (1-5)
                    const diaNumero = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].indexOf(horarioNovo.dia) + 1;
                    
                    // Encontrar o índice do horário baseado no horário selecionado
                    const [horaInicio] = horarioNovo.hora.split(' - ');
                    const horarioIndex = horarios.findIndex(h => h.inicio === horaInicio);

                    console.log('Dados do novo horário:', {
                        dia: horarioNovo.dia,
                        diaNumero: diaNumero,
                        horaInicio: horaInicio,
                        horarioIndex: horarioIndex
                    });

                    if (horarioIndex !== -1 && diaNumero !== -1) {
                        // Encontrar a célula de destino na grade
                        const tbody = document.querySelector('.grade-table tbody');
                        const celulaDestino = tbody.rows[horarioIndex].cells[diaNumero];

                        console.log('Célula de destino:', {
                            existe: !!celulaDestino,
                            dia: diaNumero,
                            horario: horarioIndex
                        });

                        // Se a célula de destino for diferente da célula atual
                        if (celulaDestino !== celulaAtual) {
                            // Verificar se a célula de destino já tem uma aula
                            const aulaDestino = celulaDestino.querySelector('.aula-cell');
                            
                            console.log('Aula de destino:', {
                                existe: !!aulaDestino,
                                dados: aulaDestino ? JSON.parse(aulaDestino.dataset.aula) : null
                            });

                            if (aulaDestino) {
                                // Realizar o swap
                                const dadosAulaDestino = JSON.parse(aulaDestino.dataset.aula);
                                
                                // Criar os novos elementos
                                const novaCelulaAtual = document.createElement('div');
                                novaCelulaAtual.className = `aula-cell ${dadosAulaDestino.disciplina.tipo}`;
                                novaCelulaAtual.setAttribute('data-aula', JSON.stringify({
                                    ...dadosAulaDestino,
                                    dia: diaAtual,
                                    horario: horarioAtual
                                }));
                                novaCelulaAtual.setAttribute('draggable', 'true');
                                novaCelulaAtual.setAttribute('data-cell-id', `${diaAtual}-${horarioAtual}`);
                                novaCelulaAtual.innerHTML = `
                                    ${dadosAulaDestino.disciplina.nome}<br>
                                    <small>${dadosAulaDestino.disciplina.professor}</small>
                                `;

                                const novaCelulaDestino = document.createElement('div');
                                novaCelulaDestino.className = `aula-cell ${novaCor}`;
                                novaCelulaDestino.setAttribute('data-aula', JSON.stringify({
                                    ...aulaAtual,
                                    dia: diaNumero,
                                    horario: horarioIndex,
                                    disciplina: {
                                        ...disciplinaSelecionada,
                                        professor: professor,
                                        tipo: novaCor
                                    }
                                }));
                                novaCelulaDestino.setAttribute('draggable', 'true');
                                novaCelulaDestino.setAttribute('data-cell-id', `${diaNumero}-${horarioIndex}`);
                                novaCelulaDestino.innerHTML = `
                                    ${disciplinaSelecionada.nome}<br>
                                    <small>${professor}</small>
                                `;

                                // Limpar e atualizar as células
                                celulaAtual.innerHTML = '';
                                celulaDestino.innerHTML = '';
                                celulaAtual.appendChild(novaCelulaAtual);
                                celulaDestino.appendChild(novaCelulaDestino);

                                // Adicionar eventos
                                [novaCelulaAtual, novaCelulaDestino].forEach(cell => {
                                    cell.addEventListener('dragstart', handleDragStart);
                                    cell.addEventListener('dragend', handleDragEnd);
                                });

                                [celulaAtual, celulaDestino].forEach(cell => {
                                    cell.addEventListener('dragover', handleDragOver);
                                    cell.addEventListener('dragleave', handleDragLeave);
                                    cell.addEventListener('drop', handleDrop);
                                    cell.onclick = function() {
                                        mostrarDetalhesMateria(this);
                                    };
                                });

                                // Registrar as trocas
                                registrarTrocaAula({
                                    ...dadosAulaDestino,
                                    dia: diaAtual,
                                    horario: horarioAtual
                                });
                                registrarTrocaAula({
                                    ...aulaAtual,
                                    dia: diaNumero,
                                    horario: horarioIndex,
                                    disciplina: {
                                        ...disciplinaSelecionada,
                                        professor: professor,
                                        tipo: novaCor
                                    }
                                });

                                console.log('Swap realizado:', {
                                    origem: {
                                        dia: diaAtual,
                                        horario: horarioAtual,
                                        aula: dadosAulaDestino
                                    },
                                    destino: {
                                        dia: diaNumero,
                                        horario: horarioIndex,
                                        aula: {
                                            ...aulaAtual,
                                            disciplina: {
                                                ...disciplinaSelecionada,
                                                professor: professor,
                                                tipo: novaCor
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                });

                // Atualizar a lista de docentes
                atualizarListaDocentes();

                // Mostrar mensagem de sucesso
                showToast('Alterações salvas com sucesso!');
                fecharModal();
            }
        }
    }

    // Função auxiliar para obter disciplina por ID
    function obterDisciplinaPorId(id) {
                const curso = document.querySelector('.grade-actions select:first-child').value;
                const nivel = document.querySelector('.grade-actions select:nth-child(2)').value;
        let disciplinas;
        
        switch(curso) {
            case 'DSM':
                disciplinas = nivel === '1' ? disciplinasDSM : 
                            nivel === '2' ? disciplinasDSM2 : disciplinasDSM3;
                break;
            case 'GEO':
                disciplinas = nivel === '1' ? disciplinasGEO : 
                            nivel === '2' ? disciplinasGEO2 : disciplinasGEO3;
                break;
            case 'MAR':
                disciplinas = nivel === '1' ? disciplinasMAR : 
                            nivel === '2' ? disciplinasMAR2 : disciplinasMAR3;
                break;
            default:
                disciplinas = disciplinasDSM;
        }
        
        return disciplinas.find(d => d.id === parseInt(id));
    }

    // Função para atualizar a lista de docentes
    function atualizarListaDocentes() {
        const curso = document.querySelector('.grade-actions select:first-child').value;
        const nivel = document.querySelector('.grade-actions select:nth-child(2)').value;
        preencherGrade(curso, nivel);
    }

    // Adicionar eventos aos botões do modal
    document.getElementById('editarMateriaForm').addEventListener('submit', salvarAlteracoes);

    // Função para fechar o modal (cancelar) - escopo global
    function fecharModal() {
        const modal = document.getElementById('materiaModal');
        modal.classList.remove('show');
        window.materiaAtual = null;
        window.celulaAtual = null;
    }

    // Eventos para fechar o modal
    document.querySelector('.close-modal').addEventListener('click', fecharModal);
    document.querySelector('#materiaModal .modal-footer .btn-secondary').addEventListener('click', function(e) {
        e.preventDefault();
        fecharModal();
    });

    // Fechar modal quando clicar fora
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('materiaModal');
        if (event.target == modal) {
            fecharModal();
        }
    });

    // Função para preencher os selects do modal
    function preencherSelectsModal() {
        const materiaSelect = document.getElementById('modalMateriaNome');
        const professorSelect = document.getElementById('modalProfessorNome');
                
        // Limpar os selects
        materiaSelect.innerHTML = '';
        professorSelect.innerHTML = '';

        // Pegar o curso e nível atual
                const curso = document.querySelector('.grade-actions select:first-child').value;
                const nivel = document.querySelector('.grade-actions select:nth-child(2)').value;
                
        // Pegar as disciplinas do curso/nível atual
        let disciplinas;
        switch(curso) {
            case 'DSM':
                disciplinas = nivel === '1' ? disciplinasDSM : 
                            nivel === '2' ? disciplinasDSM2 : disciplinasDSM3;
                break;
            case 'GEO':
                disciplinas = nivel === '1' ? disciplinasGEO : 
                            nivel === '2' ? disciplinasGEO2 : disciplinasGEO3;
                break;
            case 'MAR':
                disciplinas = nivel === '1' ? disciplinasMAR : 
                            nivel === '2' ? disciplinasMAR2 : disciplinasMAR3;
                break;
            default:
                disciplinas = disciplinasDSM;
        }

        // Preencher select de matérias
        disciplinas.forEach(disciplina => {
            const option = document.createElement('option');
            option.value = disciplina.id;
            option.textContent = disciplina.nome;
            materiaSelect.appendChild(option);
        });

        // Lista completa de professores (incluindo todos os professores disponíveis)
        const todosProfessores = [
            'Prof. Esp. Henrique Duarte Borges Louro',
            'Prof. Dr. Arley Ferreira de Souza',
            'Prof. Dr. Fabrício Galende Marques de Carvalho',
            'Prof. Esp. André Olímpio',
            'Profa. Esp. Lucineide Nunes Pimenta',
            'Prof. Dr. João Silva',
            'Profa. Dra. Maria Santos',
            'Prof. Dr. Pedro Oliveira',
            'Profa. Dra. Ana Costa',
            'Prof. Dr. Carlos Mendes',
            'Prof. Dr. Roberto Lima',
            'Profa. Dra. Juliana Martins',
            'Prof. Dr. Fernando Costa',
            'Prof. Dr. Ricardo Santos',
            'Profa. Dra. Patricia Oliveira'
        ];

        // Preencher select de professores com todos os professores disponíveis
        todosProfessores.forEach(professor => {
            const option = document.createElement('option');
            option.value = professor;
            option.textContent = professor;
            professorSelect.appendChild(option);
        });
    }

    // Função para criar um novo item de horário
    function criarHorarioItem(dia = '', hora = '') {
        const horarioItem = document.createElement('div');
        horarioItem.className = 'horario-item';
        horarioItem.innerHTML = `
            <div class="form-group">
                <label>Dia:</label>
                <select class="form-control dia-select">
                    <option value="">Selecione o dia</option>
                    <option value="Segunda" ${dia === 'Segunda' ? 'selected' : ''}>Segunda</option>
                    <option value="Terça" ${dia === 'Terça' ? 'selected' : ''}>Terça</option>
                    <option value="Quarta" ${dia === 'Quarta' ? 'selected' : ''}>Quarta</option>
                    <option value="Quinta" ${dia === 'Quinta' ? 'selected' : ''}>Quinta</option>
                    <option value="Sexta" ${dia === 'Sexta' ? 'selected' : ''}>Sexta</option>
                </select>
            </div>
            <div class="form-group">
                <label>Horário:</label>
                <select class="form-control horario-select">
                    <option value="">Selecione o horário</option>
                    ${horarios.map(h => `
                        <option value="${h.inicio} - ${h.fim}" ${hora === `${h.inicio} - ${h.fim}` ? 'selected' : ''}>
                            ${h.inicio} - ${h.fim}
                        </option>
                    `).join('')}
                </select>
            </div>
        `;
        return horarioItem;
            }

    // Função para abrir o modal
    function abrirModal(materia) {
        const modal = document.getElementById('materiaModal');
        const modalMateriaNome = document.getElementById('modalMateriaNome');
        const modalProfessorNome = document.getElementById('modalProfessorNome');
        const modalHorarios = document.getElementById('modalHorarios');

        // Preencher os selects
        preencherSelectsModal();

        // Selecionar a matéria e professor corretos
        modalMateriaNome.value = materia.id || '';
        modalProfessorNome.value = materia.professor || '';

        // Limpar os horários anteriores
        modalHorarios.innerHTML = '';

        // Adicionar os horários existentes
        if (materia.horarios && materia.horarios.length > 0) {
            materia.horarios.forEach(horario => {
                const horarioItem = criarHorarioItem(horario.dia, horario.hora);
                modalHorarios.appendChild(horarioItem);
        });
        } else {
            // Adicionar um horário vazio se não houver nenhum
            modalHorarios.appendChild(criarHorarioItem());
        }

        // Exibir o modal
        modal.classList.add('show');
    }

    // Eventos para os filtros
    document.querySelectorAll('.grade-actions select').forEach(select => {
        select.addEventListener('change', function() {
            // Aqui você implementaria a lógica para filtrar a grade
            console.log('Filtros aplicados com sucesso!');
        });
    });

    // Evento para exportação
    document.querySelector('.btn-primary').addEventListener('click', function() {
        // Aqui você implementaria a lógica para exportar a grade
        console.log('Grade exportada com sucesso!');
    });

    // Função para abrir o modal de horário
    function abrirModalHorario() {
        const modal = document.getElementById('materiaModal');
        const modalMateriaNome = document.getElementById('modalMateriaNome');
        const modalProfessorNome = document.getElementById('modalProfessorNome');
        const modalHorarios = document.getElementById('modalHorarios');

        // Limpar seleções anteriores
        modalMateriaNome.value = '';
        modalProfessorNome.value = '';
        modalHorarios.innerHTML = '';

        // Adicionar um horário vazio
        modalHorarios.appendChild(criarHorarioItem());

        // Preencher os selects com as opções disponíveis
        preencherSelectsModal();

        // Exibir o modal
        modal.classList.add('show');
    }

    // Evento para fechar o modal
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('materiaModal').classList.remove('show');
    });

    // Evento para salvar as alterações
    document.getElementById('editarMateriaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const materia = document.getElementById('modalMateriaNome').value;
        const professor = document.getElementById('modalProfessorNome').value;
        const horarios = Array.from(document.querySelectorAll('.horario-item')).map(item => ({
            dia: item.querySelector('.dia-select').value,
            hora: item.querySelector('.horario-select').value
        }));

        // Aqui você implementaria a lógica para salvar as alterações
        console.log('Matéria:', materia);
        console.log('Professor:', professor);
        console.log('Horários:', horarios);

        // Fechar o modal
        document.getElementById('materiaModal').classList.remove('show');
    });
}); 