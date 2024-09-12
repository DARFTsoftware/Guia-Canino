
document.getElementById("searchForm").addEventListener("submit", function (event) {
    const searchTerm = document.getElementById("searchInput").value;
    if (!searchTerm) {
        event.preventDefault();
        return;
    }
    this.action = `compult?dog=${searchTerm}`;      
});

// Barra de Pesquisa
const inpp = document.getElementById("searchInput");
const resultss = document.getElementById("res");

// evento quando clica na barra de pesquisa (POGGERS!)
inpp.addEventListener("focusin", () => {
    resultss.style.display = "inline";
    resultss.style.marginTop = "3px";
    resultss.style.backgroundColor = "red";
});

// Script que desativa os pre set de pesquisa quando clicka fora da barra de pesquisa (POGGERS!!!)

inpp.addEventListener("focusout", (event) => {
    setTimeout(() => {
        document.getElementById("res").style.display = "none";
        inp.value = "";
    }, 150);
});

inpp.addEventListener("input", (e) => {
// Evento quando digita no search bar

// value é oq ta sendo digitado
let val = e.target.value;
let num = 0;

// Script pra primeira letra digitar ser maiscula, mesmo após o espaço (POGGERS!!!)
let element = e.target;
var words = element.value.split(" ");
element.value = words
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");

fetch(`/api/dogs/six/${val}`)
    .then((response) => {
        return response.json();
    })
    .then((dogs) => {
        resultss.innerHTML = "";
        dogs.forEach((dog) => {
            if(num === 6) return;
            const li = document.createElement("li");

            li.onclick = () => {
                console.log("A");
                window.location.href = `compult?dog=${dog.nome}`;
            };

            li.addEventListener("mouseover", () => {
                li.style.cursor = "pointer";
            });

            li.textContent = dog.nome;
            resultss.appendChild(li);
            li.id = 'resLi';
            num++
        });
        num = 0;
        if (dogs.length === 0) {
          const li = document.createElement('li');
          li.textContent = 'Nenhum resultado encontrado';
          resultss.appendChild(li)
          li.id = 'nn';
        }
    });

});