const app = document.querySelector(".app")

function renderHome() {
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

  const btn = document.querySelector("button")
  btn.addEventListener("click", () => {
    window.location.hash = "#movie/550"
  })
}

function renderMovie() {
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

function router() {
  const hash = window.location.hash

  if (!hash || hash === "#home") {
    renderHome()
    return
  }

  if (hash.startsWith("#movie/")) {
    const id = hash.split("/")[1]
    renderMovie()
  }
}

window.addEventListener("load", router)
window.addEventListener("hashchange", router)