const creaCardProdotti = function (arrayOfProduct) {
  arrayOfProduct.forEach((prodotti) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-md-6", "col-lg-4");
    newCol.innerHTML = `
    <div class="card border border-white rounded-4" style="width: 18rem">
    <div class="rounded-3">
      <img src="${prodotti.imageUrl}" class="card-img-top" alt="Prodotto" />
    </div>
    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p class="card-text m-0 fs-3">${prodotti.name}</p>
          <p class="card-text m-0 fs-5">${prodotti.brand}</p>
        </div>
        <div>
          <p class="card-text fs-4">€${prodotti.price}</p>
        </div>
      </div>
      <a href="./detailsProduct.html?prodottoId=${prodotti._id}" class="btn btn-info text-white fw-bolder">More</a>
    </div>
  </div>
          `;
    const prodottiRow = document.getElementById("prodottiRow");
    prodottiRow.appendChild(newCol);
  });
};

const shop = function () {
  const spinner = document.getElementById("spinner");
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2IyNDE4N2U1YzAwMTgxNGM2MTAiLCJpYXQiOjE3MDU2NTUwNzYsImV4cCI6MTcwNjg2NDY3Nn0.DAUolkwmj3ItqDWk4r4VCv-cumrqp6XfJ9JAeamxjQI",
    },
  })
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        spinner.classList.add("d-none");
        return response.json();
      } else {
        throw new Error(
          "errore nella chiamata al server, contattare il servizio tecnico"
        );
      }
    })
    .then((data) => {
      console.log("Check dati dal server", data);
      creaCardProdotti(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

shop();
