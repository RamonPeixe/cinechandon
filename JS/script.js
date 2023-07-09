const container = document.querySelector(".container");
const poltronas = document.querySelectorAll(".fileira .poltrona:not(.vendido)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const filmeEscolhido = document.getElementById("filme");

populateUI();

let precoIngresso = +filmeEscolhido.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const poltronasSelecionadas = document.querySelectorAll(
    ".fileira .poltrona.selecionado"
  );

  const poltronasIndex = [...poltronasSelecionadas].map((poltrona) =>
    [...poltronas].indexOf(poltrona)
  );

  localStorage.setItem("poltronasSelecionadas", JSON.stringify(poltronasIndex));

  const poltronasSelecionadasCount = poltronasSelecionadas.length;

  count.innerText = poltronasSelecionadasCount;
  total.innerText = poltronasSelecionadasCount * precoIngresso;

  setMovieData(filmeEscolhido.selectedIndex, filmeEscolhido.value);
}

function populateUI() {
  const poltronasSelecionadas = JSON.parse(
    localStorage.getItem("poltronasSelecionadas")
  );

  if (poltronasSelecionadas !== null && poltronasSelecionadas.length > 0) {
    poltronas.forEach((poltrona, index) => {
      if (poltronasSelecionadas.indexOf(index) > -1) {
        console.log(poltrona.classList.add("selecionado"));
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    filmeEscolhido.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex);
  }
}
console.log(populateUI());
filmeEscolhido.addEventListener("change", (e) => {
  precoIngresso = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("poltrona") &&
    !e.target.classList.contains("vendido")
  ) {
    e.target.classList.toggle("selecionado");

    updateSelectedCount();
  }
});

updateSelectedCount();
