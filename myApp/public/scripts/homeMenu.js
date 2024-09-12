
document.addEventListener("DOMContentLoaded", function () {  
  
  createRowCard("tamanho", "Pequeno");
  createRowCard("tamanho", "Médio");
  createRowCard("tamanho", "Grande");
  
});

function createRowCard(field, value) {
  const f = field;
  const v = value;
  fetch(`/api/dogs/query/${field}/${value}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error query");
    }
    return response.json();
  })
  .then((dog) => {
    dog.forEach((dogs) => {
        createCard(dogs, f, v);
    })
  })
  .catch((error) => {
    return console.log(error);
  });
}

function createCard(dog, field, value) {
  const content = document.querySelector(".content");

  // If my side row head is empty, create it
  if(document.querySelector(".sideRowHead-" + field + value) === null) {
    const sideHead = document.createElement("div");
    sideHead.classList.add("sideRowHead-" + field + value , "sideRow");
    sideHead.innerText = "Cahorros que possuem " + field + " " + value.toLowerCase();
    content.appendChild(sideHead)
  }

  // If my side row is empty, create it
  if(document.querySelector(".sideRow-" + field + value) === null) {
    const sideCards = document.createElement("div");
    sideCards.classList.add("sideRow-" + field + value , "sideRow");
    content.appendChild(sideCards)
  }
  const sideRow = document.querySelector(".sideRow-" + field + value)

  const card = document.createElement("div");
  card.classList.add("card");
  sideRow.appendChild(card);

  const cardImg = document.createElement("img");
  cardImg.classList.add("card-img")
  cardImg.src = dog.image;
  card.appendChild(cardImg);

  const cardName = document.createElement("div");
  cardName.innerText = dog.nome;
  cardName.classList.add("card-name");
  card.appendChild(cardName);
}
