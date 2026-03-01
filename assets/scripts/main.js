window.location.hash = "#home"
const app = document.getElementById("app")

function renderHome() {
  app.innerHTML = `
    <h1>Home</h1>
    <button data-id="550">Open Movie 550</button>
  `

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

  if (hash === "#home") {
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