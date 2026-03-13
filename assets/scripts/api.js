import { baseURL, options } from "./config.js";
import { convertToUITop, convertToUIRecs, convertToUIDetails, convertToUISearch, convertToUITrailer, renderTop, renderSearch, renderDetails, renderRecs, renderTrailer } from "./render.js";

const stateLoading = {
    page: 1,
    loading: false
};

export async function requestTop() {
    try {
        const recsData = await fetch(`${baseURL}/movie/popular?language=en-US&page=1`, options);
        const readyData = await recsData.json();
        const validData = convertToUITop(readyData);
        renderTop(validData);
    } catch (err) {
        
    }
}

async function requestRecs() {
    const maxPage = 75;
    try {
        if (stateLoading.page <= maxPage) {
            const recsData = await fetch(`${baseURL}/movie/popular?language=en-US&page=${stateLoading.page}`, options);
            const readyData = await recsData.json();
            const validData = convertToUIRecs(readyData);
            renderRecs(validData);
        } else {

        }
    } catch (err) {
        
    }
}

export async function requestDetails(id) {
    try {
        const detailsData = await fetch(`${baseURL}/movie/${id}`, options);
        const readyData = await detailsData.json();
        const validData = convertToUIDetails(readyData);
        renderDetails(validData);
        requestTrailer(id);
    } catch (err) {
        
    }
}

export async function requestSearch(query) {
    try {
        const searchData = await fetch(`${baseURL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
        if (!searchData.ok) {
            alert('Something wrong, try again later or reload page');
        }
        const readyData = await searchData.json();
        const validData = convertToUISearch(readyData);
        renderSearch(validData);
    } catch (err) {
        
    }
}

export async function requestTrailer(id) {
    try {
        const trailerData = await fetch(`${baseURL}/movie/${id}/videos`, options);
        const readyData = await trailerData.json();
        const validData = convertToUITrailer(readyData);
        renderTrailer(validData);
    } catch (err) {
        
    }
}

