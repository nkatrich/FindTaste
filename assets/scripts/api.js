import { baseURL, options } from "./config.js";
import { convertToUIRecs, convertToUIDetails, convertToUISearch } from "./render.js";

async function requestRecs() {
    try {
        const recsData = await fetch(`${baseURL}/movie/popular?language=en-US&page=1`, options);
        const readyData = await recsData.json();
        convertToUIRecs(readyData);
    } catch (err) {

    }
}

async function requestDetails() {
    try {
        const detailsData = await fetch(`${baseURL}/movie/1401778`, options);
        const readyData = await detailsData.json();
        convertToUIDetails(readyData);
    } catch (err) {
        
    }
}

async function requestSearch() {
    try {
        const searchData = await fetch(`${baseURL}/search/movie?query=the-wrecking-crew&include_adult=false&language=en-US&page=1`, options);
        if (!searchData.ok) {
            alert('Something wrong, try again later or reload page');
        }
        const readyData = await searchData.json();
        
        convertToUISearch(readyData);
    } catch (err) {
        
    }
}

requestRecs();
requestSearch();
requestDetails()