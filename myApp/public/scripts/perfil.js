
document.addEventListener("DOMContentLoaded", function () {
  fetch(`/perfil/getUser`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errr");
      }
      return response.json();
    })
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      displayError(error.message);
    });
});