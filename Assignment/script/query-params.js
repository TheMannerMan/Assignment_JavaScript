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
groupName.innerText = data.name;


// const _list = document.getElementById('query-params');
// for (const q of params) {
//     const li = document.createElement('li');
//     li.innerText = `param: ${q[0]} - value: ${q[1]}`;

//     _list.appendChild(li);
// }

})();