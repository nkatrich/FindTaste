export function convertToUI(data) {
    console.log(data);

    console.log(data.results[0].title);
    console.log(data.results[0].release_date);
    console.log(Math.round(data.results[0].vote_average * 10));
    
    const titleMovie = data.results[0].title;
    const dateMovie = data.results[0].release_date;
    const rateMovie = Math.round(data.results[0].vote_average * 10);
}