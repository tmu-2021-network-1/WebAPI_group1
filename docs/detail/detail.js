const apiUri = 'https://collectionapi.metmuseum.org/public/collection/v1';
const objectsUri = `${apiUri}/objects`;
const searchUri = `${apiUri}/search`;

const params = new URLSearchParams(window.location.search);
 
const render = async () => {
  const id = params.get("id");
  const objectUri = `${objectsUri}/${id}`;
  const objectJson = await getData(objectUri);
  
  const objectDiv = document.getElementById('object');

  const imageLink = document.createElement('a');
  imageLink.href = objectJson.primaryImage;
  imageLink.innerHTML = `<center><img src="${objectJson.primaryImageSmall}"><br></center>`;
  objectDiv.appendChild(imageLink);

  const text = document.createElement('text');

  const title = objectJson.title;
  //const titletext = document.createElement('titletext');
  //titletext.innerText = `Title: ${title}`;
  //objectDiv.appendChild(titletext);

  const name = objectJson.artistDisplayName;
  const artistBeginDate　= objectJson.artistBeginDate;
  const artistEndDate　= objectJson.artistEndDate;
  const height = objectJson.measurements[0].elementMeasurements.Height;
  const width = objectJson.measurements[0].elementMeasurements.Width;
  const city = objectJson.city;
  const department = objectJson.department;
  const culture = objectJson.culture;
  const period = objectJson.period;
  const objectBeginDate = objectJson.objectBeginDate;
  const objectEndDate = objectJson.objectEndDate;
  const medium = objectJson.medium;
  const excavation = objectJson.excavation;
  const objectURL = objectJson.objectURL;
  const GalleryNumber = objectJson.GalleryNumber;
  
  text.innerHTML = 
  `
  <h1><br><a href= ${objectURL} target="_blank">${title}</a></h1>
  <br>Artist : ${name}(${artistBeginDate}-${artistEndDate})
  <br>Size : ${height} x ${width}cm
  <br>City : ${city}
  <br>Department : ${department}
  <br>Culture : ${culture}
  <br>Period : ${period}
  <br>Creation Year : ${objectBeginDate}
  <br>Completion Year : ${objectEndDate}
  <br>Medium : ${medium}
  <br>excavation : ${excavation}
  <br>GalleryNumber : ${GalleryNumber}
  <br>
  <br><small>( Press the title to jump to the URL to the object's page at metmuseum.org. If you are not registered, nothing will be written in the field. )</small>
  `;
  objectDiv.appendChild(text);

}


const getData = async (uri) => {
  try {
    console.log(uri);
    const response = await fetch(uri);
    console.log(response);
    if (response.ok) {
      const jsonResponse = await response.json();
			// renderJson(jsonResponse);
      return jsonResponse;
    }
  }
  catch (error) {
    console.log(error);
    return error;
  }
  return {};
}

render();

