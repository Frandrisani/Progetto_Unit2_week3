const nameInput = document.getElementById("nameInput");
const descriptionInput = document.getElementById("descrizioneInput");
const categoryInput = document.getElementById("categoriaInput");
const priceInput = document.getElementById("priceInput");
const imgInput = document.getElementById("imgInput");
const form = document.getElementById("formBackoffice");

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
        alert("Prodotto salvato correttamente!");

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
