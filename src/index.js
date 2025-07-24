let limit = 20;

function renderGifs(data) {

  setTimeout(() => {// Simula un retraso para mostrar los GIFs
    if(data.length > 0) {
      controls.style.display = 'flex';// Muestra los controles si hay resultados
    }else {
      controls.style.display = 'none';
    }       
    }, 3000);    
  
    const section = document.querySelector('.contenedor-gif');
    section.innerHTML = ''; // Limpia la sección antes de renderizar nuevos GIFs
    
    data.forEach(gif => {// Crea un div para cada GIF
      const div = document.createElement('div');
      div.classList.add('contenedor-elementos');
      
      const img = document.createElement('img');
      img.classList.add('gif');
      img.src = gif.images.fixed_height.url;// Asigna la URL del GIF a la imagen
      img.atl = gif.title || 'GIF';

      div.appendChild(img);
      section.appendChild(div);
      console.log(data);   
    })
}

async function search(query) {
  const endpointSeach = `https://api.giphy.com/v1/gifs/search?api_key=${API_Key}&q=${query}&limit=${limit}`;

  try {
    const res = await fetch(endpointSeach);
    const dataRes = await res.json(); 
    const dataTotal = await dataRes.data;
    renderGifs(dataTotal);
  }
  catch (error){
    console.log(error);    
  }    
}

async function trending() {
  const endpointTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${API_Key}&limit=${limit}`;

  try {
    const res = await fetch(endpointTrending);
    const dataTrend = await res.json();
    console.log(dataTrend);
    const dataTotal = await dataTrend.data;
    renderGifs(dataTotal);

  } catch (error) {
    console.log(error);    
  }
}

async function fetchPage ({query = '',  page = 0 }) {// Función para obtener una página específica de resultados 
  const offset = page * limit;// Calcula el offset basado en la página actual y el límite de resultados por página agarra el valor de la página actual y lo multiplica por el límite de resultados por página
  console.log('offset', offset);
  const baseUrl = query // Verifica si la busqueda es sobre tendencias o una búsqueda específica si el valor ingresado en el input es una cadena vacía entonces se considera que se está buscando GIFs de tendencia de lo contrario se considera que se está buscando GIFs específicos entoncves el valor de la variable baseUrl se asigna a la URL de la API de Giphy para buscar GIFs de tendencia o para buscar GIFs específicos según la consulta ingresada en el input
  ? `https://api.giphy.com/v1/gifs/search?api_key=${API_Key}&q=${query}&limit=${limit}&offset=${offset}`
  : `https://api.giphy.com/v1/gifs/trending?api_key=${API_Key}&limit=${limit}&offset=${offset}`;

  try {
    const res = await fetch(baseUrl);
    const dataPage = await res.json();
    const dataTotal = await dataPage.data;
    renderGifs(dataTotal);


  } catch (error) {
    console.error('Error al cargar los GIFs:', error);
  }
}