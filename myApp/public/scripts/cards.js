
document.addEventListener("DOMContentLoaded", function () {

  fetch(`/api/dogs/${searchTerm}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Cão não encontrad");
    }
    return response.json();
  })
  .then((dog) => {
    createColl(dog);
    setAlign()
    rowAlignInfinity()
  })
  .catch((error) => {
    displayError(error.message);
  });
  createSideScroll();
});
function crateSideScroll(dog, i) {
  let side = document.querySelectorAll(".sidescroll");

  let card = document.createElement("div")
  card.classList.add("card");

  side.appenChild(card);

  const img = document.createElement("img");
  img.id = "dogphoto-" + i;
  img.src = dog.image;
  imgCard.appendChild(img);

  const pName = document.createElement("p");
  pName.id = "nome-" + i;
  pName.innerHTML = dog.nome;
  imgCard.appendChild(pName);

  card.addEventListener("click", () => {
    window.location.href = `compult?dog=${dog.nome}`;
  })
}


