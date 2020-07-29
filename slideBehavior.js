// Atribui à variavies correnspondentes a lista de slides e um indice de slides

let slideList = document.querySelectorAll('.slides__image');
let SlideIndex = 0;

// Mostra o primeiro slide
showSlide(SlideIndex);

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
    element.style.display = 'none';
  });
  // Mostra o slide atual
  slide.style.display = 'block';
}
