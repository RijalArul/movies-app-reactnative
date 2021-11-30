import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  Button,
} from 'react-native'
import CastMovie from '../components/CastMovie'
import {API_KEY, Movie, MovieApi} from '../services/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'

function MovieScreen ({route}) {
  const {movieId} = route.params
  const [movie, setMovie] = useState([])
  const [casts, setCasts] = useState([])
  useEffect(() => {
    async function fetchMovie () {
      const response = await MovieApi.get(`/${movieId}?api_key=${API_KEY}`)

      const {data} = response
      setMovie(data)
    }

    async function fetchMovieCasts () {
      const response = await MovieApi.get(
        `/${movieId}/credits?api_key=${API_KEY}`,
      )

      const {cast} = await response.data
      setCasts(cast)
    }

    fetchMovie()
    fetchMovieCasts()
  }, [])
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          style={styles.moviePosterImage}
          resizeMode='cover'
          source={{uri: Movie.w500Image(movie.poster_path)}}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.movieTitle}>{movie.original_title}</Text>
          <Text style={styles.movieOverview}>{movie.overview}</Text>
          <View>
            <FlatList
              data={casts}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => <CastMovie castMovie={item} />}
            />
            <CastMovie />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  moviePosterImageContainer: {
    height: 435,
    position: 'absolute',
    top: 0,
    elevation: 8,
  },
  moviePosterImage: {
    height: 400,
    width: 370,
  },
  descriptionContainer: {
    marginVertical: 10,
    marginLeft: 15,
  },
  movieTitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieOverview: {
    marginBottom: 20,
  },
})

export default MovieScreen
