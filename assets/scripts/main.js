const app = document.querySelector(".app")
window.location.hash = "#home"

function renderHome() {
  window.location.hash = "#home"
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
  `
}

function renderMovie() {
  window.location.hash = "#movie/"
  app.innerHTML = `
    <section class="details">
                <div class="container-details">
                    <article class="movie-details">
                        <div class="img-of-movie">
                            <img src="" alt="Image of current movie">
                        </div>
                        <div class="movie-desc">
                            <div class="div-title-of-movie-desc"><h2 class="title-of-movie-desc"></h2></div>
                            <div class="div-bsc-info-movie-desc"><span class="age-info-movie-desc"></span><span class="time-info-movie-desc"></span><span class="date-info-movie-desc"></span></div>
                            <div class="div-genre-of-movie-desc"></div>
                            <div class="div-rate-of-movie-desc"><span class="visual-rate-of-recom"></span><span class="percentage-of-rate-of-recom"></span></div>
                            <div class="div-review-about-movie">
                                <h3 class="title-review-details">Review</h3>
                                <p class="review-details"></p>
                            </div>
                            <div class="div-save-movie">
                                <button class="add-favorite" type="button"><img src="./assets/icons/UI-front/like.svg" alt="Like icon"></button>
                                <button class="add-wishlist" type="button"><img src="./assets/icons/UI-front/tv.svg" alt="TV icon"></button>
                            </div>
                            <div class="div-watch-trailer">
                                <a href="">Watch trailer</a>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
  `
}

function renderWishlist() {
  window.location.hash = "#wishlist"
  app.innerHTML = `
    <section class="wishlist">
                <div class="container-of-wishlist">
                    <article class="movie-wishlist">
                        <div class="card-wishlist">
                            <figure class="card-movie-wishlist">
                                <img src="" alt="preview of movie">
                                <figcaption>
                                    <h2 class="title-of-movie-wishlist"></h2>
                                    <h3 class="date-of-movie-wishlist"></h3>
                                    <p class="review-movie-wishlist"></p>
                                </figcaption>
                            </figure>
                        </div>
                        <div class="del-card">
                            <button class="btn-del-card" type="button"><img src="./assets/icons/UI-front/cross.svg" alt="Cross shows action to delete"></button>
                        </div>
                    </article>
                </div>
            </section>
  `
}

function renderAuthority() {
  window.location.hash = "authority"
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
  `
}

function router() {
  const hash = window.location.hash

  if (hash === "#home") {
    renderHome()
  } else if (hash.startsWith("#movie/")) {
    renderMovie()
  } else if (hash === "#wishlist") {
    renderWishlist()
  } else if (hash === "authority") {
    renderAuthority()
  }
}

window.addEventListener("load", router)
window.addEventListener("hashchange", router)