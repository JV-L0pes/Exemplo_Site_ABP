export async function getDocentes() {
  try {
      console.log('Iniciando requisição GET para docentes...');
      let response = await fetch('https://errorsquad-server.onrender.com/admin/1/docente', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ikpvw6NvIFNpbHZhIiwiaWF0IjoxNzQ2NzA5MDk3LCJleHAiOjE3NDY3MTI2OTd9.Go8xmpeIt_TUZaMBTVGl6VnLX3zSrftlXkytBn4mO3o'
          },
      });

      console.log('Status da resposta:', response.status);
      
      if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro na resposta:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      let result = await response.json();
      console.log('Resposta recebida:', result);
      console.log('Estrutura dos dados:', JSON.stringify(result.data, null, 2));

      if (result === 'Token inválido.'){
          console.error('Token inválido');
          return null;
      }

      let data = result.data;
      return data;
  } catch (error) {
      console.error('Erro detalhado:', error);
      return null;
  }
}

export async function createDocente(docente) {
  try {
      let response = await fetch('https://errorsquad-server.onrender.com/admin/1/docente', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ikpvw6NvIFNpbHZhIiwiaWF0IjoxNzQ2NzA5MDk3LCJleHAiOjE3NDY3MTI2OTd9.Go8xmpeIt_TUZaMBTVGl6VnLX3zSrftlXkytBn4mO3o'
          },
          body: JSON.stringify(docente)
      });

      let result = await response.json();
      return result;
  } catch (error) {
      console.error('Erro:', error);
      return null;
  }
}

export async function updateDocente(docente) {
  try {
      let response = await fetch(`https://errorsquad-server.onrender.com/admin/1/docente/${docente.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ikpvw6NvIFNpbHZhIiwiaWF0IjoxNzQ2NzA5MDk3LCJleHAiOjE3NDY3MTI2OTd9.Go8xmpeIt_TUZaMBTVGl6VnLX3zSrftlXkytBn4mO3o'
          },
          body: JSON.stringify(docente)
      });

      let result = await response.json();
      return result;
  } catch (error) {
      console.error('Erro:', error);
      return null;
  }
}

export async function deleteDocente(id) {
  try {
      let response = await fetch(`https://errorsquad-server.onrender.com/admin/1/docente/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ikpvw6NvIFNpbHZhIiwiaWF0IjoxNzQ2NzA5MDk3LCJleHAiOjE3NDY3MTI2OTd9.Go8xmpeIt_TUZaMBTVGl6VnLX3zSrftlXkytBn4mO3o'
          }
      });

      let result = await response.json();
      return result;
  } catch (error) {
      console.error('Erro:', error);
      return null;
  }
} 
