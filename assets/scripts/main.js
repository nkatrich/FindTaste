const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjY1MWNiZDgyYmJhNTM0YjNkN2U5N2Y2M2MzZWM1NyIsIm5iZiI6MTc3MTQzMzM5MC4yMDIsInN1YiI6IjY5OTVlZGFlNGZiZWRkMDc0NjFiMDZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sIddTmKy6pguB1ccLYrkX3Z_KKja-_7NrORj7QZritA'
  }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => console.log(res, 9))
  .catch(err => console.error(err));

const options2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjY1MWNiZDgyYmJhNTM0YjNkN2U5N2Y2M2MzZWM1NyIsIm5iZiI6MTc3MTQzMzM5MC4yMDIsInN1YiI6IjY5OTVlZGFlNGZiZWRkMDc0NjFiMDZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sIddTmKy6pguB1ccLYrkX3Z_KKja-_7NrORj7QZritA'
  }
};

fetch('https://api.themoviedb.org/3/movie/1419406?language=en-US', options2)
  .then(res => res.json())
  .then(res => console.log(res, 3))
  .catch(err => console.error(err));

const options3 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjY1MWNiZDgyYmJhNTM0YjNkN2U5N2Y2M2MzZWM1NyIsIm5iZiI6MTc3MTQzMzM5MC4yMDIsInN1YiI6IjY5OTVlZGFlNGZiZWRkMDc0NjFiMDZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sIddTmKy6pguB1ccLYrkX3Z_KKja-_7NrORj7QZritA'
  }
};

fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=mercy', options3)
  .then(res => res.json())
  .then(res => console.log(res, 5))
  .catch(err => console.error(err));