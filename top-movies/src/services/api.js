import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=en-US',
});

export default api;