'use strict';
import musicService from'./music-group-service.js';

const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);

(async () => {

    // Parsing URL parameters to retrieve the "id"
    let url = new URL(window.location);
    let params = url.searchParams;
    let id = params.get("id"); 

    //Fetch data from API 
    const data = await _service.readMusicGroupAsync(id, false);

    
    // Selecting DOM elements
    const groupName = document.querySelector("#groupName");
    const groupGenre = document.querySelector("#genre");
    const groupEst = document.querySelector("#established")
    const artistList = document.querySelector("#artistList");
    const albumList = document.querySelector("#albumList");

    //Display information from the fetched data
    groupName.innerText = data.name;
    groupGenre.innerText = data.strGenre;
    groupEst.innerText = data.establishedYear;

    // Remove elements from list before adding new ones.
    while(artistList.firstChild){
        artistList.removeChild(artistList.firstChild);
    }

    // Add elements to the list displaying artist
    for (const artist of data.artists) {
        
        const div = document.createElement("div");
        div.classList.add("col-md-12", "themed-grid-col");
        div.innerText = `${artist.firstName} ${artist.lastName}`;
        artistList.appendChild(div);
    }

    // Add elements to the list displaying albums
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

})();