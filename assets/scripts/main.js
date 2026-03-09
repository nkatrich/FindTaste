import { requestSearch, requestDetails } from "./api.js";
import { idForURL } from "./render.js";

const wishMovies = [];
const favoriteMovies = [];

const app = document.querySelector(".app");
const searchMovies = document.querySelector('.search-movies');
const listOfSuggested = document.querySelector('.div-list-of-suggested');

window.location.hash = "#home";

function renderHome() {
  window.location.hash = "#home";
  app.innerHTML = `
    <section class="home">
        <section class="recs-slider">
            <div class="container-recs">
                <article class="random-recom">
                    <figure class="card-random-recom">
                        <img src="" alt="preview of movie">
                        <figcaption>
                            <h2 class="title-of-recom"></h2>
                            <h3 class="date-of-recom"></h3>
                            <span class="rate-of-recom"><span class="visual-rate-of-recom"></span><span class="percentage-of-rate-of-recom"></span></span>
                        </figcaption>
                    </figure>
                </article>
            </div>
        </section>
        <section class="list-movies">
            <div class="container-list-movies">
                <div class="div-title-recomindations-list"><h2 class="title-recomindations-list">Recommendations</h2></div>
                    <div class="cards-of-recs-list">
                        <article class="random-recom-card">
                            <figure class="card-random-recom">
                                <img src="" alt="preview of movie">
                                <figcaption>
                                    <h2 class="title-of-recom"></h2>
                                    <h3 class="date-of-recom"></h3>
                                    <span class="rate-of-recom"><span class="visual-rate-of-recom"></span><span class="percentage-of-rate-of-recom"></span></span>
                                </figcaption>
                            </figure>
                        </article>
                    </div>
                <div class="observer"></div>
            </div>
        </section>
    </section>
  `;
}

function renderMovie(idForURL) {
  window.location.hash = `#movie/${idForURL}`;
  app.innerHTML = `
    <section class="details">
                <div class="container-details">
                    <article class="movie-details" data-id-details="${idForURL}">
                        <div class="div-img-of-movie">
                            <img class="img-of-movie" alt="Image of current movie" width="300" height="300">
                        </div>
                        <div class="movie-desc">
                            <div class="div-title-of-movie-desc"><h2 class="title-of-movie-desc"></h2></div>
                            <div class="div-bsc-info-movie-desc"><span class="time-info-movie-desc"></span><span class="date-info-movie-desc"></span></div>
                            <div class="div-genre-of-movie-desc"><p class="genre-of-movie-desc"></p></div>
                            <div class="div-rate-of-movie-desc"><div class="div-bar-and-perc"><span class="visual-rate-of-recom"></div></span><div class="percentage-of-rate-of-recom"></div></div>
                            <div class="div-review-about-movie">
                                <h3 class="title-review-details">Overview</h3>
                                <p class="review-details"></p>
                            </div>
                            <div class="div-save-movie">
                                <button class="add-favorite" type="button"><img src="./assets/icons/UI-front/like.svg" alt="Like icon"></button>
                                <button class="add-wishlist" type="button"><img src="./assets/icons/UI-front/tv.svg" alt="TV icon"></button>
                            </div>
                            <div class="div-watch-trailer">
                                <iframe class="trailer" src="" frameborder="0" ></iframe>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
  `;
  requestDetails(idForURL);
  document.querySelector('.add-favorite').addEventListener('click', () => {
    const titleOfMovieDesc = document.querySelector('.title-of-movie-desc').textContent;
    const date = document.querySelector('.date-info-movie-desc').textContent;
    const img = document.querySelector('.img-of-movie').src;
    const movieDetails = document.querySelector('.movie-details');
    const id = movieDetails.dataset.idDetails;
    console.log(titleOfMovieDesc);
    
    const data = {
        titleOfMovieDesc,
        date,
        img,
        id
    }
    favoriteMovies.push(data);
    localStorage.setItem('favoritesMovies', JSON.stringify(favoriteMovies));
    
  });
  document.querySelector('.add-wishlist').addEventListener('click', () => {
    const titleOfMovieDesc = document.querySelector('.title-of-movie-desc').textContent;
    const date = document.querySelector('.date-info-movie-desc').textContent;
    const img = document.querySelector('.img-of-movie').src;
    const movieDetails = document.querySelector('.movie-details');
    const id = movieDetails.dataset.idDetails;
    console.log(titleOfMovieDesc);
    
    const data = {
        titleOfMovieDesc,
        date,
        img,
        id
    }
    wishMovies.push(data);
    localStorage.setItem('wishlistMovies', JSON.stringify(wishMovies));
  });
}
window.location.hash = "#wishlist";
function renderWishlist() {
  window.location.hash = "#wishlist";
  app.innerHTML = `
    <section class="wishlist">
                <div class="title-wishlist"><h2>Wishlist</h2></div>
                <div class="container-of-wishlist">
                    <article class="movie-wishlist">
                        <a class="card-wishlist">
                            <figure class="card-movie-wishlist">
                                <img class="img-preview-wishlist" src="" alt="preview of movie">
                                <figcaption>
                                    <h2 class="title-of-movie-wishlist"></h2>
                                    <h3 class="date-of-movie-wishlist"></h3>
                                    <p class="review-movie-wishlist"></p>
                                </figcaption>
                            </figure>
                        </a>
                        <div class="del-card">
                            <button class="btn-del-card" type="button"><img src="./assets/icons/UI-front/cross.svg" alt="Cross shows action to delete"></button>
                        </div>
                    </article>
                </div>
                <div class="title-favorite"><h2>Favorite</h2></div>
                <div class="container-of-favorite">
                    <article class="movie-favorite">
                        <a class="card-favorite">
                            <figure class="card-movie-favorite">
                                <img class="img-preview-favorite" src="" alt="preview of movie">
                                <figcaption>
                                    <h2 class="title-of-movie-favorite"></h2>
                                    <h3 class="date-of-movie-favorite"></h3>
                                    <p class="review-movie-favorite"></p>
                                </figcaption>
                            </figure>
                        </a>
                        <div class="del-card">
                            <button class="btn-del-card" type="button"><img src="./assets/icons/UI-front/cross.svg" alt="Cross shows action to delete"></button>
                        </div>
                    </article>
                </div>
            </section>
  `;

document.querySelector('.card-wishlist').addEventListener('click', () => {
    const movies = JSON.parse(localStorage.getItem('wishlistMovies')) || [];
    // direct to details !
});

document.querySelector('.card-favorite').addEventListener('click', () => {

});
  
}

function renderAuthority() {
  window.location.hash = "authority";
  app.innerHTML = `
    <section class="about-API">
                <article>
                    <img src="./assets/images/bg-api/tmdb.webp" alt="The logotype of 'The Movie DataBase'(TMDB)" width="300" height="300">
                    <p class="p-about-api">In the 'FindTaste', we use third-party API, name is <a href="https://www.themoviedb.org/" target="_blank">'The Movie DataBase'(TMDB)</a></p>
                    <p class="p-about-developer">As well, follow me in GitHub and Telegram channel:</p>
                    <div class="socials-media">
                        <a href="https://github.com/nkatrich" target="_blank"><img src="./assets/icons/socials-media/GitHub.svg" alt="GitHub Logotype" width="70" height="70"></a>
                        <a href="https://t.me/DevLogNikita" target="_blank"><img src="./assets/icons/socials-media/Telegram.svg" alt="Telegram Logotype" width="70" height="70"></a>
                    </div>
                </article>
            </section>
  `;
}

function router() {
  const hash = window.location.hash;

  if (hash === "#home") {
    renderHome()
  } else if (hash.startsWith("#movie/")) {
    renderMovie(idForURL);
  } else if (hash === "#wishlist") {
    renderWishlist();
  } else if (hash === "#authority") {
    renderAuthority();
  }
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);

searchMovies.addEventListener('input', debounce(e => {
    if (e.target.value.length === 0) {
        listOfSuggested.classList.remove('shown');
    } else {
        listOfSuggested.classList.add('shown');
        requestSearch(e.target.value.trim());
    }
}, 700));

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

// listOfSuggested.classList.add('shown');
// requestSearch('the wrecking crew')