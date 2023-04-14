const apiUrl = 'http://localhost:3000/toys';
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById('toy-collection');
const createToyCard = (toy) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const name = document.createElement('h2');
  name.textContent = toy.name;

  const image = document.createElement('img');
  image.classList.add('toy-avatar');
  image.src = toy.image;

  const likes = document.createElement('p');
  likes.textContent = `${toy.likes} likes`;

  const likeButton = document.createElement('button');
  likeButton.classList.add('like-btn');
  likeButton.id = toy.id;
  likeButton.textContent = 'Like ❤️';

  card.append(name, image, likes, likeButton);
  return card;
};

const renderToys = (toys) => {
  toys.forEach((toy) => {
    const card = createToyCard(toy);
    toyCollection.appendChild(card);
  });
};

const toggleToyForm = () => {
  toyFormContainer.style.display = (toyFormContainer.style.display === 'none') ? 'block' : 'none';
};

const init = () => {
  addBtn.addEventListener("click", toggleToyForm);
  fetch(apiUrl)
    .then(response => response.json())
    .then(renderToys)
    .catch(error => console.error(error));
};

init();
