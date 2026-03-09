import { imgURL, smallImgURL } from "./config.js";

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
    const bgImg = data.backdrop_path;
    const imgMovie = data.poster_path;
    const title = data.title;
    const unTime = data.runtime;
    const hours = Math.floor(unTime / 60);
    const minutes = unTime % 60;
    const unDate = data.release_date;
    const date = makeDate(unDate);
    const unGenres = data.genres;
    let splittedGenres = [];
    for (let i in unGenres) {
        splittedGenres.push(unGenres[i].name);
    }
    let genres = splittedGenres.join(', ');
    console.log(genres);
    
    const rating = Math.round(data.vote_average * 10);
    
    const overview = data.overview;
    
    return { bgImg, imgMovie, title, hours, minutes, date, genres, rating, overview};
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
        const date = makeDate(data.results[i].release_date);
        dates.push(date);
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
    const containerDetails = document.querySelector('.container-details');
    const imgOfMovie = document.querySelector('.img-of-movie');
    const titleOfMovieDesc = document.querySelector('.title-of-movie-desc');
    const timeInfoMovieDesc = document.querySelector('.time-info-movie-desc');
    const dateInfoMovieDesc = document.querySelector('.date-info-movie-desc');
    const genreOfMovieDesc = document.querySelector('.genre-of-movie-desc');
    const percentageOfRateOfRecom = document.querySelector('.percentage-of-rate-of-recom');
    const visualRateOfRecom = document.querySelector('.visual-rate-of-recom');
    const reviewDetails = document.querySelector('.review-details');

    containerDetails.style.backgroundImage = `url(${imgURL}${data.bgImg})`;
    imgOfMovie.src = `${smallImgURL}${data.imgMovie}`;
    imgOfMovie.setAttribute('onerror', `this.onerror=null; this.src='./assets/icons/UI-front/err-load.svg';`);
    titleOfMovieDesc.textContent = data.title;
    timeInfoMovieDesc.textContent = `${data.hours} h ${data.minutes} m`;
    dateInfoMovieDesc.textContent = data.date;
    genreOfMovieDesc.textContent = data.genres;
    percentageOfRateOfRecom.textContent = `${data.rating}% Of Rating`;
    if (data.rating >= 70) {
        visualRateOfRecom.style.backgroundColor = 'rgb(12, 200, 12)';
        visualRateOfRecom.style.transform = `translateX(${data.rating}%) scaleY(2)`;
    } else if (data.rating >= 40) {
        visualRateOfRecom.style.backgroundColor = '#E7E127';
        visualRateOfRecom.style.transform = `translateX(${data.rating}%) scaleY(2)`;
    } else {
        visualRateOfRecom.style.backgroundColor = 'rgb(203, 36, 36)';
        visualRateOfRecom.style.transform = `translateX(${data.rating}%) scaleY(2)`;
    }
    reviewDetails.textContent = data.overview;
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
            
            img.src = `${smallImgURL}${data.imgs[i]}`;
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
    trailer.src = `https://www.youtube.com/embed/${data.key}`;
}

// small converters(can be repeat for some parts code)

function makeDate(data) {
    const dividedDate = data.split('-');
    console.log(dividedDate);
    
    let monthName;
    
    switch (dividedDate[1]) {
        case '01': monthName = 'January'; break;
        case '02': monthName = 'Februrary'; break;
        case '03': monthName = 'March'; break;
        case '04': monthName = 'April'; break;
        case '05': monthName = 'May'; break;
        case '06': monthName = 'June'; break;
        case '07': monthName = 'July'; break;
        case '08': monthName = 'August'; break;
        case '09': monthName = 'September'; break;
        case '10': monthName = 'October'; break;
        case '11': monthName = 'November'; break;
        case '12': monthName = 'December'; break;
        default: monthName = "No Date"; break;
    }
    dividedDate.splice(1, 1);
    dividedDate.splice(2, 0, monthName);
    const date = dividedDate.join(' ');
    return date;
}