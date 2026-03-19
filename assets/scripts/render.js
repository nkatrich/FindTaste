import { imgURL, smallImgURL } from "./config.js";

export let idForURL = 0;

export function setIdForURL(newValue) {
    idForURL = newValue;
}

export let timerRecs;

export function convertToUITop(data) {
    const lowAmount = [];
    
    for (let i = 0; i < 5; i++) {
        const imgMovie = `${smallImgURL}${data.results[i].poster_path}`;
        const titleMovie = data.results[i].title;
        const dateMovie = makeDate(data.results[i].release_date);
        const rateMovie = Math.round(data.results[i].vote_average * 10);
        const id = data.results[i].id;
        const readyData = {
            imgMovie,
            titleMovie,
            dateMovie,
            rateMovie,
            id
        }
        lowAmount.push(readyData);
    }
    return { lowAmount };
}

export function convertToUIRecs(data) {
    const amountResults = data.results.length;

    const titles = [];
    const imgs = [];
    const dates = [];
    const rates = [];
    const idsMovies = [];
    
    for (let i = 0; i < data.results.length; i++) {
        titles.push(data.results[i].title);
        const imgMovie = `${smallImgURL}${data.results[i].poster_path}`;
        imgs.push(imgMovie);
        const date = makeDate(data.results[i].release_date);
        dates.push(date);
        rates.push(Math.round(data.results[i].vote_average * 10));
        idsMovies.push(data.results[i].id);
    }

    return { data, amountResults, titles, imgs, dates, rates, idsMovies };
}

export function convertToUIDetails(data) {
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

export function renderTop(data) {
    const randomRecom = document.querySelector('.random-recom');
    const imgRandomRecom = document.querySelector('.img-random-recom');
    const titleOfRecom = document.querySelector('.title-of-recom');
    const dateOfRecom = document.querySelector('.date-of-recom');
    const percentageOfRateOfRecom = document.querySelector('.percentage-of-rate-of-recom');

    let i = 0;

    function updateRecsTop() {
        const movie = data.lowAmount[i];
        setTimeout(() => {
            imgRandomRecom.classList.remove('an');
            titleOfRecom.classList.remove('an');
            dateOfRecom.classList.remove('an');
        }, 5100);
        
        randomRecom.setAttribute('href', `#movie/${movie.id}`);
        randomRecom.setAttribute('data-id', `${movie.id}`);
        imgRandomRecom.src = movie.imgMovie;
        titleOfRecom.textContent = movie.titleMovie;
        dateOfRecom.textContent = movie.dateMovie;
        percentageOfRateOfRecom.textContent = movie.rateMovie !== 0 ? movie.rateMovie + '%' : 'NR';
        const visualRateOfRecom = document.querySelector(`.visual-rate-of-recom`);
        makeRate(movie.rateMovie, visualRateOfRecom);

        void imgRandomRecom.offsetWidth;
        void titleOfRecom.offsetWidth; 
        void dateOfRecom.offsetWidth; 
        imgRandomRecom.classList.add('an');
        titleOfRecom.classList.add('an');
        dateOfRecom.classList.add('an');

        i = (i + 1) % 5; 
    }

    timerRecs = setInterval(updateRecsTop, 6500);
    updateRecsTop();
    randomRecom.addEventListener('click', () => {
        idForURL = randomRecom.dataset.id;
    });
}

export function renderRecs(data) {
    const cardsOfRecsList = document.querySelector('.cards-of-recs-list');
    cardsOfRecsList.innerHTML = '';
    const rates = data.rates;

    for (let i = 0; i < 20; i++) {
        cardsOfRecsList.innerHTML += `
            <a class="card-recom">
                <img class="card-img-of-recom" alt="preview of movie">
                <h2 class="card-title-of-recom"></h2>
                <h3 class="card-date-of-recom"></h3>
                <div class="div-rate-of-movie-desc"><div class="div-bar-and-perc"><span class="card-visual-rate-of-recom"></div></span><div class="percentage-of-rate-of-recom"></div></div>
            </a>
        `;
        const a = document.querySelectorAll('.card-recom');
        const img = document.querySelectorAll('.card-img-of-recom');
        const h2 = document.querySelectorAll('.card-title-of-recom');
        const h3 = document.querySelectorAll('.card-date-of-recom');
        const cardVisualRateOfRecom = document.querySelectorAll('.card-visual-rate-of-recom');
        const cardPercentageOfRateOfRecom = document.querySelectorAll('.percentage-of-rate-of-recom');

        a[i].href = `#movie/${data.idsMovies[i]}`;
        a[i].dataset.id = data.idsMovies[i];
        img[i].src = data.imgs[i];
        img[i].setAttribute('onerror', `this.onerror=null; this.src='./assets/icons/UI-front/err-load.svg';`);
        h2[i].textContent = data.titles[i];
        h3[i].textContent = data.dates[i];
        cardPercentageOfRateOfRecom[i + 1].textContent = data.rates[i] + '%';
        if (data.rates[i] >= 70) {
            cardVisualRateOfRecom[i].style.backgroundColor = 'rgb(12, 200, 12)';
            cardVisualRateOfRecom[i].style.transform = `translateX(${data.rates[i]}%)`;
        } else if (data.rates[i] >= 40) {
            cardVisualRateOfRecom[i].style.backgroundColor = '#E7E127';
            cardVisualRateOfRecom[i].style.transform = `translateX(${data.rates[i]}%)`;
        } else {
           cardVisualRateOfRecom[i].style.backgroundColor = 'rgb(203, 36, 36)';
           cardVisualRateOfRecom[i].style.transform = `translateX(${data.rates[i]}%)`;
        }
    }
}

export function renderDetails(data) {
    clearInterval(timerRecs);

    const containerDetails = document.querySelector('.container-details');
    const imgOfMovie = document.querySelector('.img-of-movie');
    const titleOfMovieDesc = document.querySelector('.title-of-movie-desc');
    const timeInfoMovieDesc = document.querySelector('.time-info-movie-desc');
    const dateInfoMovieDesc = document.querySelector('.date-info-movie-desc');
    const genreOfMovieDesc = document.querySelector('.genre-of-movie-desc');
    const percentageOfRateOfRecom = document.querySelector('.percentage-of-rate-of-recom');
    const reviewDetails = document.querySelector('.review-details');

    containerDetails.style.backgroundImage = `url(${imgURL}${data.bgImg})`;
    imgOfMovie.src = `${smallImgURL}${data.imgMovie}`;
    imgOfMovie.setAttribute('onerror', `this.onerror=null; this.src='./assets/icons/UI-front/err-load.svg';`);
    titleOfMovieDesc.textContent = data.title;
    timeInfoMovieDesc.textContent = `${data.hours} h ${data.minutes} m`;
    dateInfoMovieDesc.textContent = data.date;
    genreOfMovieDesc.textContent = data.genres;
    percentageOfRateOfRecom.textContent = `${data.rating}% Of Rating`;
    const visualRateOfRecom = document.querySelector(`.visual-rate-of-recom`);
    makeRate(data.rating, visualRateOfRecom);
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
        }
        listOfSuggested.addEventListener('click', (e) => {
            const movie = e.target.closest('.item-list-suggested');

            if (movie) {
                const listOfSuggested = document.querySelector('.div-list-of-suggested');
                listOfSuggested.classList.remove('shown');
            }
        });
        
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
    
    let monthName;
    const year = dividedDate[0];
    const day = dividedDate[2];
    
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

    dividedDate.splice(0, 1, monthName);
    dividedDate.splice(1, 0, day);
    dividedDate.splice(2, 0, year);
    dividedDate.splice(3, 2);
    const date = dividedDate.join(' ');
    return date;
}

function makeRate(data, tag) {
    if (data >= 70) {
        tag.style.backgroundColor = 'rgb(12, 200, 12)';
        tag.style.transform = `translateX(${data}%)`;
    } else if (data >= 40) {
        tag.style.backgroundColor = '#E7E127';
        tag.style.transform = `translateX(${data}%)`;
    } else {
        tag.style.backgroundColor = 'rgb(203, 36, 36)';
        tag.style.transform = `translateX(${data}%)`;
    }
}