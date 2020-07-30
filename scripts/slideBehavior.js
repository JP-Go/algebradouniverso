// Atribui à variavies correnspondentes a lista de slides e um indice de slides

let slideList = document.querySelectorAll(".slides__image");
let SlideIndex = 0;

// Mostra o primeiro slide
showSlide(SlideIndex);
setInterval(changeIndex, 3000, 1);
// Modifica o contador do slide por um fator number
function changeIndex(number) {
  if (number >= 0) {
    if (SlideIndex !== slideList.length - 1) {
      SlideIndex += number;
    } else {
      SlideIndex = 0;
    }
  } else {
    if (SlideIndex == 0) {
      SlideIndex = slideList.length - 1;
    } else {
      SlideIndex += number;
    }
  }
  showSlide(SlideIndex);
}
function showSlide(index) {
  index = SlideIndex;
  let slide = slideList[index];
  // Faz cada slide dessaparecer antes de carregar a página;
  slideList.forEach((element) => {
    element.style.display = "none";
  });
  // Mostra o slide atual
  slide.style.display = "block";
  // Mostra a legenda da imagem de acordo com o índice
  let legendas = {
    0: "Por do Sol no ártico",
    1: "Foto de longa exposição a noite em uma estrada de alguma cidade industrial",
    2: "Uma Biblioteca enorme e bem organizada",
  };
  document.getElementById("legenda").innerText = legendas[`${index}`];
}
