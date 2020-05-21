// importamos apenas as funções que queremos utilizar, vindo de 'garage.js'
import { fetchCars, addCar } from './garage';

fetchCars();

document.getElementById('brand').focus();         // foca no input com id="brand"
const form = document.getElementById('new-car');  // pega o form
form.addEventListener('submit', addCar);          // "Quando o form for submetido, adicione um carro"
