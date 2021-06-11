const apiUri = 'https://collectionapi.metmuseum.org/public/collection/v1';
const objectsUri = `${apiUri}/objects`;
const searchUri = `${apiUri}/search`;

const search = async (button) => {
  const keywordInput = document.getElementById('keyword');
  const keyword = keywordInput.value;
  
   // get size
  let minWidth = "";
  if (button) { 
    minWidth = button.value;
    maxWidth = parseInt(button.value)+ parseInt("100") ;
  } 

  console.log(minWidth,maxWidth)
  const uri = `${searchUri}?hasImages=true&q=${encodeURIComponent(keyword)}`;
  console.log(uri);
  const json = await getData(uri);
  console.log(json);
  document.getElementById('SearchResults').textContent = "Search results";
  //document.getElementById('count').textContent = `${json['total']} items found`;

  const ids = json['objectIDs'];

  const list = document.getElementById('objects');
  list.innerHTML = '';
  for (let id of ids) {
    const item = document.createElement('li');
    item.className = 'object';
    item.innerHTML = `<div class="id">${id}</div>
    <div><strong class="title"></strong></div>
    <div><strong class="artistDisplayName"></strong></div>
    <div><strong class="dimensions"></strong></div>
    <a href="#" class="image-link"><img alt="" src="../photos/loader.gif" class="thumbnail">`;
    list.appendChild(item);
  }

  let i = 0;
  for (let id of ids) {
    const object = document.querySelectorAll(`.object`)[i];
    const objectUri = `${objectsUri}/${id}`;
    const objectJson = await getData(objectUri);
    console.log(objectJson);

    object.querySelector(`.id`).textContent = '';
    object.querySelector(`.title`).textContent = objectJson['title'].substr(0, 20);
    object.querySelector(`.artistDisplayName`).textContent = objectJson['artistDisplayName'].substr(0, 20);
    object.querySelector(`.dimensions`).textContent = objectJson['dimensions'];

    const a = object.querySelector(`.image-link`);
    a.href = `../detail/detail.html?id=${id}`;
    const img = object.querySelector(`img`);
    img.src = objectJson['primaryImageSmall'];

    let width = 0;
    if (objectJson.measurements && objectJson.measurements.length > 0) {
      width = objectJson.measurements[0].elementMeasurements.Width;
    }
    if (width < minWidth || width > maxWidth) {
      object.classList.add('off');
    }
    if (width ==undefined) {
      object.classList.add('off');
    }

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
