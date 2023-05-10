const API_KEY= "f45c3ce208659ebe636bfd047fe22a25";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const APILINK = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;
// Creating DOM elements
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");


function returnMovies(url) {
    fetch(url)
      .then(res => res.json())
      .then(function(data) {
        console.log(data);
        data.results.forEach(element => {
     
         //we also need to set the html attributes we defined while creating the html.
         const div_card = document.createElement('div');
         const div_row = document.createElement('div');
         const div_column = document.createElement('div');
         const image = document.createElement('img');
         const title = document.createElement('h3');

         // Here I will set the attributes so Css can read them
         div_card.setAttribute('class', 'card');
         div_row.setAttribute('class', 'row');
         div_column.setAttribute('class', 'column');
         image.setAttribute('class', 'thumbnail');
         image.setAttribute('id', 'image');
         title.setAttribute('id', 'title');

         // Associating elements form the API to our new HTML elements.
  
         title.innerHTML = `${element.title}`;
         console.log(`${element.title}`);
         image.src = `${IMG_PATH}${element.poster_path}`;

         // Placing new html elements inside other html elements, for example divs inside divs

         div_card.appendChild(image);
         div_card.appendChild(title);
         div_column.appendChild(div_card);
         div_row.appendChild(div_column);

         main.appendChild(div_row);

        });
      })
      .catch(error => console.error(error));
  }
  

  
  returnMovies(APILINK);
  


//This arrow function clears the search form so each time we dearch a movie,
//then form is replaced to empty text

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCH_API + searchItem);
      search.value = "";
  }
});
