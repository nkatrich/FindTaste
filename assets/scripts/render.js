import { imgURL } from "./config.js";

export let idForURL = 0;

export function convertToUIRecs(data) {
    console.log(data);

    console.log(data.results[0].title);
    console.log(data.results[0].release_date);
    console.log(Math.round(data.results[0].vote_average * 10));
    
    const titleMovie = data.results[0].title;
    const dateMovie = data.results[0].release_date;
    const rateMovie = Math.round(data.results[0].vote_average * 10);
}

export function convertToUIDetails(data) {
    console.log(data, 'det');
    
    
}

export function convertToUISearch(data) {
    const amountResults = data.results.length;

    const titles = [];
    const imgs = [];
    const dates = [];
    const idsMovies = [];
    for (let i = 0; i < data.results.length; i++) {
        titles.push(data.results[i].title);
        imgs.push(data.results[i].poster_path);
        dates.push(data.results[i].release_date);
        idsMovies.push(data.results[i].id);
    }

    return { amountResults, titles, imgs, dates, idsMovies };
}

export function convertToUITrailer(data) {
    let key;

    for (let i in data.results) {
        if (data.results[i].official === true) {
            key = data.results[i].key;
        }
    }
    return { key };
}

export function renderRecs(data) {

}

export function renderDetails(data) {
    
    
}

export function renderSearch(data) {
    const listOfSuggested = document.querySelector('.list-of-suggested');
    listOfSuggested.innerHTML = '';
    if (data.amountResults) {
        for (let i = 0; i < data.amountResults; i++) {     
            const item = document.createElement('a');
            const texts = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('h2');
            const date = document.createElement('h3');

            item.className = 'item-list-suggested';
            texts.className = 'item-list-suggested-txt';
            
            img.src = `${imgURL}${data.imgs[i]}`;
            img.setAttribute('alt', `preview movie`);
            img.setAttribute('onerror', `this.onerror=null; this.src='./assets/icons/UI-front/err-load.svg';`);
            title.textContent = data.titles[i];
            date.textContent = data.dates[i];
            item.setAttribute('href', `#movie/${data.idsMovies[i]}`);
            item.setAttribute('data-id', `${data.idsMovies[i]}`);

            item.appendChild(img);
            texts.appendChild(title);
            texts.appendChild(date);
            item.appendChild(texts);
            listOfSuggested.appendChild(item)

            listOfSuggested.addEventListener('click', (e) => {
                const movie = e.target.closest('.item-list-suggested');

                if (find) {
                    idForURL = movie.dataset.id;
                    const listOfSuggested = document.querySelector('.div-list-of-suggested');
                    listOfSuggested.classList.remove('shown');
                }
            })
        }
    } else {
        const divNotFound = document.createElement('div');
        const notFound = document.createElement('h2');
        divNotFound.className = 'div-if-result-not-found';
        notFound.textContent = 'Results not found';
        notFound.className = 'if-result-not-found';
        divNotFound.appendChild(notFound);
        listOfSuggested.appendChild(divNotFound);
        return;
    }
}

export function renderTrailer(data) {
    const trailer = document.querySelector('.trailer');
    console.log(data.key);
    
    trailer.src = `https://www.youtube.com/embed/${data.key}`;
}