const BASE_URL = `http://localhost:3000/characters/`;
let lastPage = "";
let accPage = 1;

// pobranie z zewnetrzengo API danych
//BASE_URL = `https://rickandmortyapi.com/api/character`;
//LOCAL_URL =`http://localhost:3000/characters`
// async function patchToJS(object) {
//   const reqJS = await fetch(`${LOCAL_URL}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(object),
//   });
// }
// async function downloadData() {
//   try {
//     const reqApi = await fetch(`${BASE_URL}?page=2`);
//     const characterApi = await reqApi.json();
//     console.log(characterApi);
//     characterApi.results.forEach(({ id, name, image, species, status }) => {
//       const body = {
//         id,
//         name,
//         image,
//         species,
//         status: status === "unknown" ? "Unknown" : status,
//       };
//       patchToJS(body);
//       console.log(body);
//     });
//   } catch (err) {
//     console.error("ERROR:", err);
//   }
// }

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
      loadCharacters();
      return;
    }
    charsWrapper.innerHTML = "";
    characters.forEach(({ id, name, status, species, image }) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML += `
        <img src="${image}" alt="${name}"/>
        <h4>${name}</h4>
        <div class="char-info">
        <span>Status: ${status}</span>
        <span>Species: ${species}</span></div>`;
      card.append(createDelBtn(id));
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
  const defaultImage = `https://rickandmortyapi.com/api/character/avatar/19.jpeg`; // 3.jpeg w zadaniu było ale te wg mnie lepiej oddaje nieznaną postać
  const body = {
    name: addName.value,
    image: addImage.value ? addImage.value : defaultImage,
    species: addSpecies.value ? addSpecies.value : "Unknown",
    status: `${addStatus.value.slice(0, 1).toUpperCase()}${addStatus.value
      .slice(1)
      .toLowerCase()}`,
  };
  try {
    const req = await fetch(`${BASE_URL}`, {
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
  const btn = document.createElement("input");
  btn.type = "button";
  btn.value = "Delete";
  btn.addEventListener("click", function () {
    const userResponse = confirm("Are you sure?");
    if (userResponse) {
      deleteCharacter(id);
      alert("Operation succesfull.");
    } else {
      alert("Operation canceled.");
    }
  });
  window;
  // const btn = document.createElement("button");
  // btn.innerText = `Delete`;
  // btn.addEventListener("click", function () {
  //   deleteCharacter(id);
  // });
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

document.addEventListener("DOMContentLoaded", loadCharacters);
