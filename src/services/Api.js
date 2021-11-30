// export const MovieApi = 'https://api.themoviedb.org/3'
import Axios from 'axios'
export const ImageApi = 'https://image.tmdb.org/t/p'

export const API_KEY = 'a313744a7d7e45b8839430fd92c40b2b'

export const MovieApi = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
})

export const DiscoverMovieApi = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/discover/movie',
})

export const GenreApi = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/genre',
})

export const Movie = {
  originalImage: imgPath => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: imgPath => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}
