import { baseURL, options } from "./config.js"

async function requestInitial() {
    try {
        const [popularData, recsData] = await Promise.all([
            requestPopular(),
            requestRecs()
        ])
        
        console.log(popularData, 1);
        console.log(recsData, 2);
    }
    catch (err) {

    }
}

async function requestPopular() {
    const res = await fetch(`${baseURL}/movie/now_playing?language=en-US&page=1'`, options);
    return await res.json();
}

async function requestRecs() {
    const res = await fetch(`${baseURL}/movie/popular?language=en-US&page=1`, options);
    return await res.json();
}

async function requestSearch() {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=the-wrecking-crew&include_adult=false&language=en-US&page=1`, options);
    const data = await res.json();
    console.log(data);
    
}

requestInitial();
requestSearch()