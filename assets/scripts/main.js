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
  `;

  const btn = document.querySelector("button")
  btn.addEventListener("click", () => {
    window.location.hash = "#movie/550"
  })
}

function renderMovie(id) {
  app.innerHTML = `
    <h1>Movie ID: ${id}</h1>
    <a href="#home">Back</a>
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
    renderMovie(id)
  }
}

window.addEventListener("load", router)
window.addEventListener("hashchange", router)