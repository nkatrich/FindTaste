import { baseURL, options } from "./config.js";
import { convertToUI } from "./render.js";

async function requestInitial() {
    try {
        const recsData = await fetch(`${baseURL}/movie/popular?language=en-US&page=1`, options);
        const readyData = await recsData.json();
        convertToUI(readyData);
    }
    catch (err) {

    }
}

async function requestSearch() {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=the-wrecking-crew&include_adult=false&language=en-US&page=1`, options);
    const data = await res.json();
}

requestInitial();
requestSearch();