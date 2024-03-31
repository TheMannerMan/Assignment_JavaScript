'use strict';
import musicService from'./music-group-service.js';

const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);

(async () => {

    let url = new URL(window.location);
    let params = url.searchParams;
    let id = params.get("id"); 
    
    console.log(id);
    console.log(params.has("id")); 
    console.log(params.has("fakeid")); 

const data = await _service.readMusicGroupAsync(id, false);

console.log("Hello");

const groupName = document.querySelector("#groupName");
const groupGenre = document.querySelector("#genre");
const groupEst = document.querySelector("#established")
const artistList = document.querySelector("#artistList");
const albumList = document.querySelector("#albumList");

groupName.innerText = data.name;
groupGenre.innerText = data.strGenre;
groupEst.innerText = data.establishedYear;

while(artistList.firstChild){
    artistList.removeChild(artistList.firstChild);
}

for (const artist of data.artists) {
    
    const div = document.createElement("div");
    div.classList.add("col-md-12", "themed-grid-col");
    div.innerText = `${artist.firstName} ${artist.lastName}`;
    artistList.appendChild(div);
}

for (const album of data.albums){
    const div = document.createElement("div");
    div.classList.add("row", "mb-2", "text-center");
    
    const divAlbumName = document.createElement("div");
    divAlbumName.classList.add("col-md-10", "themed-grid-col");
    divAlbumName.innerText = album.name;

    const divYearRelease = document.createElement("div");
    divYearRelease.classList.add("col-md-2", "themed-grid-col");
    divYearRelease.innerText = album.releaseYear;

    div.appendChild(divAlbumName);
    div.appendChild(divYearRelease);

    albumList.appendChild(div);

}

// const _list = document.getElementById('query-params');
// for (const q of params) {
//     const li = document.createElement('li');
//     li.innerText = `param: ${q[0]} - value: ${q[1]}`;

//     _list.appendChild(li);
// }

})();