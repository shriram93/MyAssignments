// Intializing variables
let movieRepo = [];
let numOfMovies = 0;

// Intialize movie and favorites sliders
function intializeSlider() {
  var elem = document.querySelector('.movies-carousel');
  var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true
  });
  var elem = document.querySelector('.favorites-carousel');
  var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: false
  });
  var $fav_carousel = $('.favorites-carousel').flickity({
    initialIndex: 1
  });
  var cellElements = $fav_carousel.flickity('getCellElements');
  if (cellElements.length === 0) {
    $('.favorites-carousel').hide();
    $('.no-favorites-banner').show();
  }
  // Get movie list from database
  getMovieList();
  // Get favorites list from database
  getFavoritesList();
}

// Function to query movie list from database
function getMovieList() {
  dataRequest("movies");
}

// Function to query fa vorites list from database
function getFavoritesList() {
  dataRequest("favorites");
}

// Main function to query details from database
function dataRequest(sectionName) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', `http://localhost:3000/${sectionName}`);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      const resposne = JSON.parse(httpRequest.responseText);
      resposne.forEach(function(item) {
        createMovieCard(sectionName, item);
      });
    }
  }
  httpRequest.send();
}

//To create bootstrap card for each entry
function createMovieCard(sectionName, movieItem) {
  let $carouselSection = $(`.${sectionName}-carousel`).flickity();
  let movieOverview = movieItem.overview;
  if (typeof(movieOverview) === "string") {
    if (movieOverview.length > 110) {
      movieOverview = movieOverview.substring(0, 115) + "...";
    }
  }
  let buttonContent = '';
  if (sectionName === "movies") {
    movieRepo[numOfMovies] = movieItem;
    numOfMovies++;
    buttonContent = `<a href="#" id="${movieItem.id}" class="btn btn-primary"><span class="icon"><i class="fas fa-plus"></i></span>Add to favorites</a>`;
  } else {
    $('.favorites-carousel').show();
    $('.no-favorites-banner').hide();
    buttonContent = `<a href="#" id="${movieItem.id}" class="btn btn-danger"><span class="icon"><i class="fas fa-minus"></i></span>Remove from favorites</a>`;
  }
  const cardContent = `
  <div class="card carousel-cell movie-card" style="width: 18rem;" >
    <img class="card-img-top" src="./images/${movieItem.poster}" height="350px" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${movieItem.title}</h5>
      <p class="card-text">${movieOverview}</p>
    </div>
    <div class="card-footer">
      ${buttonContent}
    </div>
  </div>`
  let $cellElems = $(cardContent);
  $carouselSection.flickity('append', $cellElems);
}

//Function to add the boostrap card and also add entry in favorites database
function addToFavorites(movieId, event) {
  event.preventDefault();
  let alreadyFav = 0;
  var $fav_carousel = $('.favorites-carousel').flickity({
    initialIndex: 1
  });
  var cellElements = $fav_carousel.flickity('getCellElements');
  cellElements.forEach(function(cell) {
    if (cell.childNodes[5].childNodes[1].attributes[1].nodeValue === movieId) {
      alreadyFav = 1;
      $.notify("Already added to favorites", {
        type: "info",
        icon: "exclamation"
      });
      console.log("Already added to favorites");
    }
  });
  if (!alreadyFav) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://localhost:3000/favorites');
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        createMovieCard("favorites", movieRepo[movieId]);
        $.notify("Added to favorites!", {
          type: "success",
          icon: "check"
        });
        $('.favorites-carousel').show();
        $('.no-favorites-banner').hide();
        $fav_carousel.flickity('reloadCells');
      }
    }
    httpRequest.send(JSON.stringify(movieRepo[movieId]));
  }
}

//Function to remove the boostrap card and also remove entry from favorites database
function removeFromFavorites(movieId, event) {
  event.preventDefault();
  var $fav_carousel = $('.favorites-carousel').flickity({
    initialIndex: 1
  });
  var cellElements = $fav_carousel.flickity('getCellElements');
  cellElements.forEach(function(cell) {
    if (cell.childNodes[5].childNodes[1].attributes[1].nodeValue === movieId) {
      $fav_carousel.flickity('remove', cell);
      const httpRequest = new XMLHttpRequest();
      httpRequest.open('DELETE', `http://localhost:3000/favorites/${movieId}`);
      httpRequest.send();
    }
  });
  $fav_carousel.flickity('reloadCells');
  cellElements = $fav_carousel.flickity('getCellElements');
  if (cellElements.length === 0) {
    $('.favorites-carousel').hide();
    $('.no-favorites-banner').show();
  }
}

//Starting point
intializeSlider();

//Event listner for add to favorites button
$(document).on('click', '.movies .btn', function(event) {
  addToFavorites(this.id, event);
});

//Event listner for remove from favorites button
$(document).on('click', '.favorites .btn', function(event) {
  removeFromFavorites(this.id, event);
});
