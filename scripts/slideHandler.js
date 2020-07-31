const url = "./scripts/hpdata.json";

async function slideData(url) {
  // cria duas listas para armazenar os diretórios das imagens e suas legendas
  let imgpaths = [];
  let captions = [];

  // faz um fetch à url indicada por seus dados e converte a resposta em JSON
  const response = await (await fetch(url)).json();

  // Coloca cada diretorio e legenda em suas listas
  response.forEach((element) => {
    imgpaths.push(element["imgPath"]);
    captions.push(element["caption"]);
  });

  // para cada elemento de imgpaths cria uma tag imagem,
  // atribui src e adiciona no container de slides
  imgpaths.forEach((element) => {
    let img = document.createElement("img");
    img.classList.add("slides__image");
    img.setAttribute("src", element);
    document
      .querySelector(".slides__container")
      .insertBefore(img, document.getElementById("prevBtn"));
  });

  // Atribui à variavies correnspondentes a lista de slides e um indice de slides
  let SlideIndex = 0;
  let slideList = document.querySelectorAll(".slides__image");
  // função changeCap: muda a legenda da imagem
  let changeCap = () => (captionPlaceholder.innerText = captions[SlideIndex]);
  let captionPlaceholder = document.getElementById("legenda");
  changeCap();
  // chama a função showSlide para mostrar o primeiro slide
  showSlide(SlideIndex);

  // muda o índice dos slides e a legenda a cada três segundos

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

  // Função showSlide
  function showSlide(index) {
    let slide = slideList[index];
    // Faz cada slide dessaparecer antes de carregar a página;
    slideList.forEach((element) => {
      element.style.display = "none";
    });
    // Mostra o slide atual
    slide.style.display = "block";
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    changeIndex(-1);
    changeCap();
  });
  document.getElementById("nextBtn").addEventListener("click", () => {
    changeIndex(1), changeCap();
  });
  setInterval(() => {
    changeIndex(1);
    changeCap();
  }, 3500);
}

slideData(url);
