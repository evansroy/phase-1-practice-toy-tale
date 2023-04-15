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


const toyForm = document.querySelector('.add-toy-form');

toyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = toyForm.querySelector('input[name="name"]');
  const imageInput = toyForm.querySelector('input[name="image"]');
  const name = nameInput.value;
  const image = imageInput.value;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name,
      image,
      likes: 0
    })
  })
    .then(response => response.json())
    .then(toy => {
      const card = createToyCard(toy);
      toyCollection.appendChild(card);
      toyForm.reset();
    })
    .catch(error => console.error(error));
});


toyCollection.addEventListener('click', (event) => {
  if (event.target.classList.contains('like-btn')) {
     event.preventDefault(); // prevent page from reloading
    const likeButton = event.target;
    const card = likeButton.closest('.card');
    const id = likeButton.id;
    const likes = card.querySelector('p').textContent.split(' ')[0];
    const newLikes = parseInt(likes) + 1;

    fetch(`${apiUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
      .then(response => response.json())
      .then(toy => {
        card.querySelector('p').textContent = `${newLikes} likes`;
      })
      .catch(error => console.error(error));
  }
});

