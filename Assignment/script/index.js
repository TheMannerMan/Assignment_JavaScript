//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict'; 
import musicService from'./music-group-service.js';

(async () => {

    //Initialize the API service
    const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);


    //Declare variables used
    let currentPage = 0;    //Used to fetch the current from thw web api
    let nrOfPages;          //Used to display the total amount of pages fetched from the API
    let searchInput = null; //Variable to hold a specific searchword


    // Selecting DOM elements
    const listOfArtist = document.querySelector("#artistList");
    const currentPageLbl = document.querySelector("#currentPage");
    const pNrOfBands = document.querySelector("#displayNrOfBands");
    const searchForm = document.querySelector("#searchForm");
    const searchHits = document.querySelector("#searchHits");
    const prevBtn = document.querySelector("#prevBtn");
    const nextBtn = document.querySelector("#nextBtn");

    
    // Handle input in the search form
    searchForm.addEventListener("submit", async event => {
        event.preventDefault();

        //Create the key/value pairs used in the form
        const formData = new FormData(searchForm);

        // Get the searchword fom the the form
        searchInput = formData.get("searchWord");
        
        //Set current page to 0 before rendering the search result based on the search word 
        currentPage = 0; 
        renderList();

    })

    //Handle click on the prev button in the paginator
    prevBtn.addEventListener("click", prevClick);
    async function prevClick(event) {
        if(currentPage > 0){
            currentPage--;
            renderList();
        }
    }

    //Handle click on the next button in the paginator
    nextBtn.addEventListener("click", nextClick);
    async function nextClick(event) {
        if(currentPage < (nrOfPages-1)){ //nrOfPages doesn't start at index 0. Reason for -1
            currentPage++;
        renderList();
        }
    }

    //Get the nr of bands and display on the website.
    let data = await _service.readMusicGroupsAsync(currentPage);
    pNrOfBands.innerText = `The database now contains ${data.dbItemsCount} music groups`

    // Render the initial default list on the website
    renderList();

    // Funtion used to render a list of musicgroups
    async function  renderList(){

        //Fetch data from API
        data = await _service.readMusicGroupsAsync(currentPage, true, searchInput, 10);

        // Set the number of totalt pages fetched from the API
        nrOfPages = Math.ceil(data.dbItemsCount/data.pageSize);

        renderCurrentPage();
        
        // Clear the list before displaying new items
        while(listOfArtist.firstChild){
            listOfArtist.removeChild(listOfArtist.firstChild);
        }

        // Add items to the list
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
        
        //Display matches if a search has been done
        displaySearchMatches();

    }

    // Function that updates the current page in paginator
    async function renderCurrentPage(){
        currentPageLbl.innerText = `${currentPage+1} / ${nrOfPages}`
    }

    //Function used to display the number of matches in a search.
    async function displaySearchMatches(){
        
        // If search word is entered. Display the amount of hits.
        if (searchInput != null && searchInput.trim() != ""){
            searchHits.style.display = "block";
            searchHits.innerText = `Found ${data.dbItemsCount} music groups including the word ${searchInput}`;
        }

        // If no search word is entered. Remove the paragraph.
        else if (searchInput != null && searchInput.trim() == ""){
            searchHits.style.display = "none";
        }
    }


})();
