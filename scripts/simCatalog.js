// Ivocação da Função getData
getData();

async function getData() {
  // Requisição dos dados no arquivo simData.json
  let response = await fetch("simData.json");
  let simData = await response.json();

  let simsCatalog = document.querySelector("#simulations");

  for (const sim in simData) {
    if (simData.hasOwnProperty(sim)) {
      const element = simData[sim];

      let clickablePlaceholder = document.createElement("a");
      clickablePlaceholder.setAttribute("href", element.path);

      let card = document.createElement("div");
      card.setAttribute("class", "card");
      AttributeContent([
        card,
        element.name,
        element.thumbnail,
        element.description,
      ]);
      clickablePlaceholder.appendChild(card);
      simsCatalog.appendChild(clickablePlaceholder);
    }
  }
}

function AttributeContent([baseElement, title, thumbnail, descript]) {
  // cria o título do card e atribui o título
  let cardTitle = document.createElement("h3");
  cardTitle.innerText = title;
  // cria a thumbnail do card e atribui as devidas classes
  let cardImage = document.createElement("img");
  cardImage.setAttribute("class", "card__image");
  cardImage.setAttribute("src", thumbnail);
  // cria a descrição do card e atribui a descrição
  let cardDescription = document.createElement("p");
  cardDescription.innerText = descript;

  // Adiciona todo o conteúdo ao card
  baseElement.appendChild(cardTitle);
  baseElement.appendChild(cardImage);
  baseElement.appendChild(cardDescription);
}
