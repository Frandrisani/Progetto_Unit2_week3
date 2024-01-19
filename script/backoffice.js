// INIZIO SCRIPT COLLEGATO ALLA PAGINA BACKOFFICE. LA PAGINA IN QUESTIONE
//AVRA' UNA TRIPLICE FUNZIONE: INSERIRE UN NUOVO PRODOTO (POST), MODIFICARE UN PRODOTTO GIA' INSERITO (POST), ELIMINARE UN PRODOTTO (DELETE)
//COME FACCIAMO A CAMBIARE LA FUNZIONE DEL FORM UTILIZZANDO SOLO E SOLTANTO UN FORM? IN BASE ALL'ID DEL PRODOTTO, MI SPIEGO:
//PIU' AVANTI VEDRETE COME IL MIO SCRIPT CONTROLLERA' L'URL DELLA PAGINA BACKOFFICE -> SE LA SUDDETTA PAGINA AVRA NEL SUO URL ANCHE L'ID DI UN PRODOTTO
//GIA' PRESENTE NEL DATABASE (URL + ID), ALLORA IL FORM SARA' PREDISPOSTO AD UNA MODIFICA O L'ELIMINAZIONE DEL PRODOTTO. SE, INVECE, L'URL NON PORESENTE ID DI NESSUN PRODOTTO ALLORA
// SIGNIFICA CHE IL FORM DOVRA' SICURAMENTE ESSERE UTILIZZATO PER UNA NUOVA AGGIUNTA DI PRODOTTO :)

// ---- Prendiamo i vari elementi del form dalla pagina backOffice

const nameInput = document.getElementById("nameInput");
const descriptionInput = document.getElementById("descrizioneInput");
const categoryInput = document.getElementById("categoriaInput");
const priceInput = document.getElementById("priceInput");
const imgInput = document.getElementById("imgInput");
const form = document.getElementById("formBackoffice");

// ---- qui inseriamo in una costante l'url dell'api, faccio questo perchè a seconda della situazione andremo ad aggiungerci o meno l'id di un prodotto
const urlPure = "https://striveschool-api.herokuapp.com/api/product/";

const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);
const prodottoId = addressBarContent.get("prodottoId");
console.log(prodottoId);

if (prodottoId) {
  const h2Form = document.getElementById("testoFormVariabile");
  h2Form.innerText = "Modifica il prodotto selezionato";
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
        throw new Error(
          "non sono riuscito a recuperare l'evento per ripopolare il form"
        );
      }
    })
    .then((singleProdotto) => {
      nameInput.value = singleProdotto.name;
      descriptionInput.value = singleProdotto.description;
      categoryInput.value = singleProdotto.brand;
      priceInput.value = singleProdotto.price;
      imgInput.value = singleProdotto.imageUrl;
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProdotto = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    brand: categoryInput.value,
    imageUrl: imgInput.value,
  };

  console.log(
    "ecco i dati raccolti dal form che sto per inviare:",
    newProdotto
  );

  let URLGiusto;
  let metodoDaUsare;

  if (prodottoId) {
    metodoDaUsare = "PUT";
    URLGiusto = urlPure + "/" + prodottoId;
  } else {
    metodoDaUsare = "POST";
    URLGiusto = urlPure;
  }

  fetch(URLGiusto, {
    method: metodoDaUsare,
    body: JSON.stringify(newProdotto),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2IyNDE4N2U1YzAwMTgxNGM2MTAiLCJpYXQiOjE3MDU2NTUwNzYsImV4cCI6MTcwNjg2NDY3Nn0.DAUolkwmj3ItqDWk4r4VCv-cumrqp6XfJ9JAeamxjQI",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        //-------- MESSAGGIO DI OK SALAVATAGGIO
        alert("Prodotto salvato correttamente!");

        // svuoto il form
        nameInput.value = "";
        descriptionInput.value = "";
        categoryInput.value = "";
        priceInput.value = "";
        imgInput.value = "";
      } else {
        alert("PROBLEMA NEL SALVATAGGIO!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

const pulisci = function () {
  nameInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  imgInput.value = "";
};
