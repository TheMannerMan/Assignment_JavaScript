//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict'; 
import musicService from'./music-group-service.js';

(async () => {

    console.log("Hello World!");

    //Initialize the service
    const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);

    //Read Database info async
    // let data = await _service.readInfoAsync();
    // console.log(data);

    let currentPage = 0;
    let nrOfPages;
    const listOfArtist = document.querySelector("#artistList");
    const currentPageLbl = document.querySelector("#currentPage");
    const pNrOfBands = document.querySelector("#displayNrOfBands");

    //Paginator buttons
    const prevBtn = document.querySelector("#prevBtn");
    const nextBtn = document.querySelector("#nextBtn");

    prevBtn.addEventListener("click", prevClick);
    async function prevClick(event) {
        if(currentPage > 0){
            currentPage--;
            renderAccounts();
        }
        
    }

    nextBtn.addEventListener("click", nextClick);
    async function nextClick(event) {
        if(currentPage < (nrOfPages-1)){ //nrOfPages doesn't start at index 0. Reason for -1
            currentPage++;
        renderAccounts();
        }
    }

    //Get the nr of bands and display on the website.
    let data = await _service.readMusicGroupsAsync(currentPage);
    pNrOfBands.innerText = `The database now contains ${data.dbItemsCount} music groups`



    renderAccounts();

    async function  renderAccounts(){
        data = await _service.readMusicGroupsAsync(currentPage);
        
        nrOfPages = Math.ceil(data.dbItemsCount/data.pageSize);
        console.log(nrOfPages);

        while(listOfArtist.firstChild){
            listOfArtist.removeChild(listOfArtist.firstChild);
        }

        for (const artist of data.pageItems){
            const div = document.createElement("div");
            div.classList.add('col-md-12', 'themed-grid-col');
            div.dataset.id = artist.musicGroupId;
            const a = document.createElement("a");
            a.innerText = artist.name;
            a.href = `./barbone_artist_info.html?id=${artist.musicGroupId}`;
            div.appendChild(a);
            listOfArtist.appendChild(div);
        }
        
        renderCurrentPage();
    }

    async function renderCurrentPage(){
        currentPageLbl.innerText = `${currentPage+1} / ${nrOfPages}`
    }


})();



