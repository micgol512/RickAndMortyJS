const BASE_URL = `http://localhost:3000/characters/`;
let lastPage = "";
let accPage = 1;

async function loadCharacters() {
  const inputName = document.getElementById("input-name");
  const itemAmount = document.getElementById("item-amount");
  const charsWrapper = document.getElementById("character-wrapper");
  const statusRadio = document.querySelector("input:checked");
  const actualPage = document.getElementById("acc-page");
  const _page = `&_page=${accPage}`;
  const _status = `&status_like=${statusRadio.value}`;
  const _limit = `&_limit=${itemAmount.value}`;

  let _name = "";
  if (inputName.value !== "") {
    _name = `&name_like=${inputName.value}`;
  }

  try {
    const totalReq = await fetch(`${BASE_URL}?${_name}${_status}`);
    let _total = await totalReq.json();
    _total = _total.length ? _total.length : 1;
    lastPage = Math.ceil(_total / parseInt(itemAmount.value));
    if (accPage > lastPage) {
      accPage = lastPage;
      loadCharacters();
      return;
    }
  } catch (err) {
    console.error("ERROR: ", err);
  }
  try {
    const req = await fetch(`${BASE_URL}?${_name}${_status}${_limit}${_page}`);
    const characters = await req.json();
    actualPage.innerHTML = `${accPage} from ${lastPage}`;
    if (characters.length === 0) {
      charsWrapper.innerHTML = "No items to display";
      accPage = 1;
      lastPage = 1;
      return;
    }
    charsWrapper.innerHTML = "";
    characters.forEach(({ id, name, status, species, image }) => {
      const card = document.createElement("div");
      const img = document.createElement("img");
      const nameHeader = document.createElement("h4");
      const charInfo = document.createElement("div");
      const charStatus = document.createElement("span");
      const charSpecies = document.createElement("span");

      card.className = "card";
      img.src = image;
      img.alt = name;
      nameHeader.innerHTML = name;
      charInfo.className = "char-info";
      charStatus.innerHTML = `Status: ${status}`;
      charSpecies.innerHTML = `Species: ${species}`;

      charInfo.append(charStatus, charSpecies);
      card.append(img, nameHeader, charInfo, createDelBtn(id));
      charsWrapper.append(card);
    });
  } catch (err) {
    console.error("ERROR: ", err);
  }
}
async function addCharacter() {
  const addName = document.getElementById("add-name");
  const addImage = document.getElementById("add-image");
  const addStatus = document.querySelector("#add-form-wrapper input:checked");
  const addSpecies = document.getElementById("add-species");
  const defaultImage = `https://rickandmortyapi.com/api/character/avatar/19.jpeg`; // in description has been "3.jpeg" but this is better for me :)
  const body = {
    name: addName.value,
    image: addImage.value ? addImage.value : defaultImage,
    species: addSpecies.value ? addSpecies.value : "Unknown",
    status: `${addStatus.value.slice(0, 1).toUpperCase()}${addStatus.value
      .slice(1)
      .toLowerCase()}`,
  };
  try {
    await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("ERROR: ", err);
  }
}
async function deleteCharacter(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("ERROR: ", err);
  }
  loadCharacters();
}
function createDelBtn(id) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.innerHTML = "Delete";
  btn.addEventListener("click", function () {
    const userResponse = confirm("Are you sure?");
    if (userResponse) {
      deleteCharacter(id);
      alert("Operation succesfull.");
    } else {
      alert("Operation canceled.");
    }
  });
  return btn;
}
function nextPage() {
  if (accPage === lastPage) {
    return;
  }
  ++accPage;
  loadCharacters();
}
function prevPage() {
  if (accPage === 1) {
    return;
  }
  --accPage;
  loadCharacters();
}
function firstPage() {
  if (accPage === 1) {
    return;
  }
  accPage = 1;
  loadCharacters();
}
function lastsPage() {
  if (accPage === lastPage) {
    return;
  }
  accPage = lastPage;
  loadCharacters();
}

document.addEventListener("DOMContentLoaded", () => {
  loadCharacters();
  document.getElementById("input-name").addEventListener("input", () => {
    accPage = 1;
    loadCharacters();
  });
  document.getElementById("radio-alive").addEventListener("change", loadCharacters);
  document.getElementById("radio-dead").addEventListener("change", loadCharacters);
  document.getElementById("radio-unknown").addEventListener("change", loadCharacters);
  document.getElementById("first-page-btn").addEventListener("click", firstPage);
  document.getElementById("prev-page-btn").addEventListener("click", prevPage);
  document.getElementById("next-page-btn").addEventListener("click", nextPage);
  document.getElementById("last-page-btn").addEventListener("click", lastsPage);
  document.getElementById("item-amount").addEventListener("click", loadCharacters);
  document.getElementById("add-character").addEventListener("click", addCharacter);
});
