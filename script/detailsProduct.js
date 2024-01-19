const urlPure = "https://striveschool-api.herokuapp.com/api/product/";

const nome = document.getElementById("nome");
const descrizione = document.getElementById("descrizione");
const categoria = document.getElementById("categoria");
const prezzo = document.getElementById("prezzo");
const immagine = document.getElementById("immagine");
const tastoReset = document.getElementById("resetForm");

const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);
const prodottoId = addressBarContent.get("prodottoId");
console.log(prodottoId);

fetch(urlPure + "/" + prodottoId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2IyNDE4N2U1YzAwMTgxNGM2MTAiLCJpYXQiOjE3MDU2NTUwNzYsImV4cCI6MTcwNjg2NDY3Nn0.DAUolkwmj3ItqDWk4r4VCv-cumrqp6XfJ9JAeamxjQI",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nella chiamata");
    }
  })
  .then((prodottoInQuestione) => {
    console.log(prodottoInQuestione);
    nome.innerHTML = `${prodottoInQuestione.name}`;
    descrizione.innerHTML = `${prodottoInQuestione.description}`;
    categoria.innerHTML = `Categoria: ${prodottoInQuestione.brand}`;
    prezzo.innerHTML = `€${prodottoInQuestione.price}`;
    immagine.src = `${prodottoInQuestione.imageUrl}`;

    // TASTO DELETE
    const tastoCancellaProdotto = document.getElementById("cancellaProdotto");
    tastoCancellaProdotto.addEventListener("click", function () {
      fetch(urlPure + "/" + prodottoId, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2IyNDE4N2U1YzAwMTgxNGM2MTAiLCJpYXQiOjE3MDU2NTUwNzYsImV4cCI6MTcwNjg2NDY3Nn0.DAUolkwmj3ItqDWk4r4VCv-cumrqp6XfJ9JAeamxjQI",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Prodotto cancellato correttamente!");
            location.assign("./shop.html");
          } else {
            alert(
              "Attenzione errore nella cancellazione! Contattare il servizio tecnico"
            );
            throw new Error("errore nella cancellazione");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // TASTO MODIFICA
    document
      .getElementById("tastoModifica")
      .setAttribute(
        "href",
        "./backoffice.html?prodottoId=" + prodottoInQuestione._id
      );
  })
  .catch((err) => {
    console.log(err);
  });

const pulisci = function () {
  nome.innerText = "";
  descrizione.innerText = "";
  categoria.innerText = "";
  prezzo.innerText = "";
  immagine.innerText = "";
};
