
console.log("AAAA")
function checkUserExists() {
  // searchN é o parametro passado na url
  const checkU = document.querySelector(".user").value
  //const checkP = params.get("pass");

  console.log("A")

  fetch(`/login/getUser/${checkU}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User não encontrado");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      return true
    })
    .catch((error) => {
      //displayError(error.message);
      return false
    });
  
}

document.querySelector(".button").addEventListener("click", () => {
  checkUserExists();
})
                                          
document.querySelector(".flogin").addEventListener("submit", (event) => {
  const check = checkUserExists()

  if (check){
    return console.log("User exists");
  }
  console.log("a");
});
