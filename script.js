
//Add click event handler for search-box

document.getElementById("search-input").addEventListener('submit', start);
function start(e) {
    resetField();

    let searchInput = document.getElementById("search-box").value;

    fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
        .then(response => response.json())
        .then(data => {
                displaySong(data);               
        })
    e.preventDefault();
}

// Display song list start

function displaySong(allData) {
    let data = allData.data;
   
    let list = [];
    for (let i = 0; i < 10; i++) {
        const item = {
            title: data[i].title,

            albumTitle: data[i].album.title,

            artistName: data[i].artist.name,   
        }

        list.push(item);
    }
    
// Display Song Result
    
    let display = document.getElementById("show-result");
    display.innerHTML = "";
    document.querySelector('.single-result').style.display = "block";
    for (let i = 0; i < list.length; i++) {
        let { title, albumTitle, artistName } = list[i];
        
        display.innerHTML +=
           
        `<div class="col-md-6 mb-3 result b-5">
                <h3 class="lyrics-name"><span id="title">${title}</span></h3>
                <p class="author lead">Artist : <span id="artistName">${artistName}</span></p>
                <p class="author lead">Album : <span id="albumTitle">${albumTitle}</span></p>
            </div>
            <div class ="col-md-6  text-md-right text-center">
                <a href="#/" onclick="getLyrics('${title}','${artistName}')" class="btn btn-success ">Get Lyrics</a>
            </div> `  
                 
    } 
}


// call song lyrics Api

const getLyrics = (title, artistName) => {
   
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)

        .then(res => res.json())

        .then(data =>  displayLyrics(data, title, artistName))
}

const displayLyrics = (data, title, artistName) => {
    document.querySelector('.single-result').style.display = "none";
  
    document.getElementById("get-title").innerText = title;

    document.getElementById("get-artist").innerText ='-' + ' ' + artistName;

     document.getElementById("get-lyrics").innerText = data.lyrics;
 
}

// reset data

const resetField = () => {
    document.getElementById("get-title").innerText = "";
    document.getElementById("get-artist").innerText = "";
    document.getElementById("get-lyrics").innerText = "";
   
}
console.log(resetField);