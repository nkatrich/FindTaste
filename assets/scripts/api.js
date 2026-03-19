import { baseURL, options } from "./config.js";
import { convertToUITop, convertToUIRecs, convertToUIDetails, convertToUISearch, convertToUITrailer, renderTop, renderSearch, renderDetails, renderRecs, renderTrailer } from "./render.js";
import { skeletonCard} from "./main.js";

export const stateLoading = {
    page: 1,
    maxPage: 500,
};

// loaders vars

export async function requestTop() {
    try {
        const recsData = await fetch(`${baseURL}/movie/popular?language=en-US&page=1`, options);
        if (!recsData.ok) {
            showErr();
        }
        const readyData = await recsData.json();
        console.log(readyData);
        
        const validData = convertToUITop(readyData);
        renderTop(validData);
    } catch (err) {
        showErr();
        console.error(err);
    }
}

export async function requestRecs(addOrRem, id) {
    try {
        if (stateLoading.page <= stateLoading.maxPage) {
            if (addOrRem) {
                skeletonCard.classList.add('an');
                const recsData = await fetch(`${baseURL}/movie/popular?language=en-US&page=${String(id)}`, options);
                if (!recsData.ok) {
                    showErr();
                }
                const readyData = await recsData.json();
                const validData = convertToUIRecs(readyData);
                removeLoader();
                renderRecs(validData);
            } else {
                skeletonCard.classList.add('an');
                const recsData = await fetch(`${baseURL}/movie/popular?language=en-US&page=${String(id)}`, options);
                if (!recsData.ok) {
                    showErr();
                }
                const readyData = await recsData.json();
                const validData = convertToUIRecs(readyData);
                removeLoader();
                renderRecs(validData);
            }
        } else {
            return;
        }
    } catch (err) {
        showErr();
        console.error(err)
    }
}

export async function requestDetails(id) {
    try {
        skeletonCard.classList.add('an');
        const detailsData = await fetch(`${baseURL}/movie/${id}`, options);
        if (!detailsData.ok) {
            showErr();
        }
        const readyData = await detailsData.json();
        const validData = convertToUIDetails(readyData);
        skeletonCard.classList.remove('an');
        renderDetails(validData);
        requestTrailer(id);
    } catch (err) {
        showErr();
        console.error(err);
    }
}

export async function requestSearch(query) {
    try {
        const searchData = await fetch(`${baseURL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
        if (!searchData.ok) {
            showErr();
        }
        const readyData = await searchData.json();
        const validData = convertToUISearch(readyData);
        renderSearch(validData);
    } catch (err) {
        showErr();
        console.error(err);
    }
}

export async function requestTrailer(id) {
    try {
        const trailerData = await fetch(`${baseURL}/movie/${id}/videos`, options);
        if (!trailerData.ok) {
            showErr();
        }
        const readyData = await trailerData.json();
        const validData = convertToUITrailer(readyData);
        renderTrailer(validData);
    } catch (err) {
        showErr();
        console.error(err);
    }
}

const showErr = () => {
    const errorPlate = document.querySelector('.div-error');
    errorPlate.classList.add('active');
    setTimeout(() => {
        errorPlate.classList.remove('active');
    }, 9000);
}

const removeLoader = () => {
    setTimeout(() => {
        skeletonCard.classList.remove('an');
    }, 700);
}