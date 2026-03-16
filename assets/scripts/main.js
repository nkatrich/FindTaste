import { requestSearch, requestDetails, requestTop } from "./api.js";
import { idForURL, setIdForURL } from "./render.js";

export const skeletonCard = document.querySelector('.skeleton-card');
skeletonCard.classList.add('an');
window.onload = () => {
    skeletonCard.classList.remove('an');
};

const wishlistMovies = JSON.parse(localStorage.getItem('wishlistMovies')) || [];
const favoritesMovies = JSON.parse(localStorage.getItem('favoritesMovies')) || [];

const app = document.querySelector(".app");
const searchMovies = document.querySelector('.search-movies');
const listOfSuggested = document.querySelector('.div-list-of-suggested');

function renderHome() {
  app.innerHTML = `
    <section class="home">
        <section class="recs-slider">
            <div class="container-recs">
                <a class="random-recom" href="#movie/" data-id="">
                    <figure class="card-random-recom">
                        <img class="img-random-recom" src="" alt="preview of movie" onerror="this.onerror=null; this.src='./assets/icons/UI-front/err-load.svg';">
                        <figcaption>
                            <h2 class="title-of-recom"></h2>
                            <h3 class="date-of-recom"></h3>
                            <div class="div-rate-of-movie-desc"><div class="div-bar-and-perc"><span class="visual-rate-of-recom"></div></span><div class="percentage-of-rate-of-recom"></div></div>
                        </figcaption>
                    </figure>
                </a>
            </div>
        </section>
        <section class="list-movies">
            <div class="container-list-movies">
                <div class="div-title-recomindations-list"><h2 class="title-recomindations-list">Recommendations</h2></div>
                    <div class="cards-of-recs-list"></div>
                <div class="observer"></div>
            </div>
        </section>
    </section>
  `;
  requestTop();
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
                                <iframe class="trailer" src="" frameborder="0"></iframe>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
  `;
  requestDetails(idForURL);
  document.querySelector('.add-favorite').style.transition = 'filter 0.5s ease';
  document.querySelector('.add-favorite').style.filter = 'brightness(1)';
  const index1 = favoritesMovies.findIndex(i => i.id === idForURL);
    if (index1 !== -1) {
        document.querySelector('.add-favorite').style.filter = 'brightness(0.4)';
    } else {
        document.querySelector('.add-favorite').addEventListener('click', () => {

        document.querySelector('.add-favorite').style.filter = 'brightness(0.4)';
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
        favoritesMovies.push(data);
        localStorage.setItem('favoritesMovies', JSON.stringify(favoritesMovies));
    });
    }
  
    document.querySelector('.add-wishlist').style.transition = 'filter 0.5s ease';
  document.querySelector('.add-wishlist').style.filter = 'brightness(1)';
  const index2 = wishlistMovies.findIndex(i => i.id === idForURL);
  if (index2 !== -1) {
        document.querySelector('.add-wishlist').style.filter = 'brightness(0.4)';
    } else {
        document.querySelector('.add-wishlist').addEventListener('click', () => {

        document.querySelector('.add-wishlist').style.filter = 'brightness(0.4)';
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
        wishlistMovies.push(data);
        localStorage.setItem('wishlistMovies', JSON.stringify(wishlistMovies));
    });
    }
}

function renderWishlist() {
  window.location.hash = "#wishlist";
  app.innerHTML = `
    <section class="wishlist">
        <div class="title-wishlist"><h2>Wishlist</h2></div>
        <div class="container-of-wishlist"></div>
        <div class="title-favorite"><h2>Favorite</h2></div>
        <div class="container-of-favorite"></div>
    </section>
  `;

const containerOfFavorite = document.querySelector('.container-of-favorite');
const containerOfWishlist = document.querySelector('.container-of-wishlist');

for (let i in favoritesMovies) {
    containerOfFavorite.innerHTML += `
        <article class="movie-favorite">
            <a class="card-favorite" href="#movie/${favoritesMovies[i].id}" data-id="${favoritesMovies[i].id}">
                <figure class="card-movie-favorite">
                    <div>
                        <img class="img-preview-favorite" src="${favoritesMovies[i].img}" alt="preview of movie">
                    </div>
                    <div class="div-decs-favorite-wishlist">
                        <figcaption>
                            <h2 class="title-of-movie-favorite">${favoritesMovies[i].titleOfMovieDesc}</h2>
                            <h3 class="date-of-movie-favorite">${favoritesMovies[i].date}</h3>
                        </figcaption>
                    </div>
                </figure>
            </a>
            <div class="del-card">
                <button class="btn-del-card" type="button" data-id="${favoritesMovies[i].id}"><img src="./assets/icons/UI-front/cross.svg" alt="Cross shows action to delete"></button>
            </div>
        </article>
    `;
}

for (let i in wishlistMovies) {
    containerOfWishlist.innerHTML += `
        <article class="movie-wishlist">
            <a class="card-wishlist" href="#movie/${wishlistMovies[i].id}" data-id="${wishlistMovies[i].id}">
                <figure class="card-movie-wishlist">
                    <div>
                        <img class="img-preview-wishlist" src="${wishlistMovies[i].img}" alt="preview of movie">
                    </div>
                    <div class="div-decs-wishlist-wishlist">
                        <figcaption>
                            <h2 class="title-of-movie-wishlist">${wishlistMovies[i].titleOfMovieDesc}</h2>
                            <h3 class="date-of-movie-wishlist">${wishlistMovies[i].date}</h3>
                        </figcaption>
                    </div>
                </figure>
            </a>
            <div class="del-card">
                <button class="btn-del-card" type="button" data-id="${wishlistMovies[i].id}"><img src="./assets/icons/UI-front/cross.svg" alt="Cross shows action to delete" ></button>
            </div>
        </article>
    `;
}
console.log(favoritesMovies);

containerOfFavorite.addEventListener('click', (e) => {
    const btnDelCard = e.target.closest('.btn-del-card');
    
    if (btnDelCard) {
        const btnDelCardId = btnDelCard.dataset.id;
        const movieFavorite = e.target.closest('.movie-favorite')

        if (btnDelCardId) {
            const index = favoritesMovies.findIndex(i => i.id === btnDelCardId);
            if (index !== -1) {
                favoritesMovies.splice(index, 1);
                movieFavorite.remove();
                localStorage.setItem('favoritesMovies', JSON.stringify(favoritesMovies));
            }
        }
        return;
    }

    const movie = e.target.closest('.card-favorite');
    if (movie) {
        setIdForURL(movie.dataset.id);
    }
});


containerOfWishlist.addEventListener('click', (e) => {
    const btnDelCard = e.target.closest('.btn-del-card');
    
    if (btnDelCard) {
        const btnDelCardId = btnDelCard.dataset.id;
        const movieWishlist= e.target.closest('.movie-wishlist')

        if (btnDelCardId) {
            const index = wishlistMovies.findIndex(i => i.id === btnDelCardId);
            if (index !== -1) {
                wishlistMovies.splice(index, 1);
                movieWishlist.remove();
                localStorage.setItem('wishlistMovies', JSON.stringify(wishlistMovies));
            }
        }
        return;
    }

    const movie = e.target.closest('.card-wishlist');
    if (movie) {
        setIdForURL(movie.dataset.id);
    }
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

  if (!hash) {
    renderHome();
  } else if (hash.startsWith("#movie/")) {
    const id = hash.split("/")[1];
    renderMovie(id);
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