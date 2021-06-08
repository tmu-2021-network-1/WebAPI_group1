const apiUri = 'https://collectionapi.metmuseum.org/public/collection/v1';
const objectsUri = `${apiUri}/objects`;
const searchUri = `${apiUri}/search`;

const search = async (button) => {
  const keywordInput = document.getElementById('keyword');
  const keyword = keywordInput.value;
  
  // get location
  let location = "";
  if (button) {
    location = button.value;
  }

  const uri = `${searchUri}?geoLocation=${location}&hasImages=true&q=${encodeURIComponent(keyword)}`;
  console.log(uri);
  const json = await getData(uri);
  console.log(json);
  document.getElementById('SearchResults').textContent = "Search results";
  document.getElementById('count').textContent = `${json['total']} items found`;

  const ids = json['objectIDs'];

  const list = document.getElementById('objects');
  list.innerHTML = '';
  for (let id of ids) {
    const item = document.createElement('li');
    item.className = 'object';
    item.innerHTML = `<div class="id">${id}</div>
    <div><strong class="title"></strong></div>
    <div><strong class="artistDisplayName"></strong></div>
    <div><strong class="country"></strong></div>
    <a href="#" class="image-link"><img alt="" src="../images/loading.gif" class="thumbnail">`;
    list.appendChild(item);
  }

  let i = 0;
  for (let id of ids) {
    const object = document.querySelectorAll(`.object`)[i];
    const objectUri = `${objectsUri}/${id}`;
    const objectJson = await getData(objectUri);
    console.log(objectJson);

    object.querySelector(`.id`).textContent = '';
    object.querySelector(`.title`).textContent = objectJson['title'];
    object.querySelector(`.artistDisplayName`).textContent = objectJson['artistDisplayName'];
    object.querySelector(`.country`).textContent = objectJson['country'];
    const a = object.querySelector(`.image-link`);
    a.href = `../detail/detail.html?id=${id}`;
    const img = object.querySelector(`img`);
    img.src = objectJson['primaryImageSmall'];

    i++;
  }

  return false;
}

const getData = async (uri) => {
  try {
    console.log(uri);
    const response = await fetch(uri);
    console.log(response);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  }
  catch (error) {
    console.log(error);
    return error;
  }
  return {};
}

const renderJson = (json) => {
  const div = document.createElement('div');
  div.textContent = JSON.stringify(json, "", 2);
  document.getElementById('result').appendChild(div);
}