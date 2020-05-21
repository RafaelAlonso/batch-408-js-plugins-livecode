// nome da nossa garagem
const garage = 'unaconsulta'
// url da api da nossa garagem
const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`;

// Função para adicionar um carro ao HTML
const addCarToHTML = (car) => {
  // pegue as infos do carro
  const brand = car.brand;
  const model = car.model;
  const plate = car.plate;
  const owner = car.owner;

  // crie um HTML com essas infos
  const carHtml = `
    <div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/${brand} ${model}" />
      </div>
      <div class="car-info">
        <h4>${brand} ${model}</h4>
        <p><strong>Owner:</strong> ${owner}</p>
        <p><strong>Plate:</strong> ${plate}</p>
      </div>
    </div>
  `;

  // Pegue a lista onde adicionaremos o html
  const list = document.querySelector('.cars-list');

  // adicione o html à lista
  list.insertAdjacentHTML('beforeend', carHtml);
};

// Função para adicionar uma array de carros no HTML
const addManyCars = (cars) => {
  // pegue cada carro da array e execute a função addCarToHTML
  cars.forEach(addCarToHTML)
};

// função para fazer a requisição à api para pegar os carros da garagem
const fetchCars = () => {
  fetch(url)                          // requisição GET à api
  .then(response => response.json())  // transforma a resposta em JSON
  .then(addManyCars)                  // envia os dados para addManyCars
};

// função para fazer a requisição à api para adicionar um carro à garagem
const addCar = (event) => {
  // impessa o form de recarregar a página
  event.preventDefault();

  // Pegue as informações dentro dos inputs do formulário
  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value;
  const owner = document.getElementById('owner').value;
  const plate = document.getElementById('plate').value;

  // Coloque as informações num JSON
  const infos = {
    "brand": brand,
    "model": model,
    "owner": owner,
    "plate": plate
  }

  // Defina os parâmetros para a requisição ser feita corretamente
  const params = {
    method: 'POST',                                   // é uma requisição POST
    headers: { 'Content-Type': 'application/json' },  // headers definidos
    body: JSON.stringify(infos)                       // monte uma String com o JSON das infos e coloque no body
  };

  fetch(url, params)                                  // requisição POST à api
  .then(response => response.json())                  // transforma a resposta em JSON
  .then((data) => {                                   // pega os dados recebidos e...
    // adicione o carro recém-criado no HTML
    addCarToHTML(data);

    // limpe o formulário
    document.getElementById('new-car').reset();

    // foque novamente no primeiro input do formulário
    document.getElementById('brand').focus();
  })
};

// exporte apenas as funções que serão utilizadas fora desse arquivo
export { fetchCars, addCar };
