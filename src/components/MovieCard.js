import {useNavigationContainerRef} from '@react-navigation/core'
import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native'
import {Movie} from '../services/Api'
function MovieCard ({upcomingMovie, size, navigation}) {
  function clickMovie (id) {
    navigation.navigate('movie', {
      movieId: id,
    })
  }
  return (
    <TouchableOpacity onPress={() => clickMovie(upcomingMovie.id)}>
      <ImageBackground
        style={{...styles.container, width: 230 * size, height: 340 * size}}
        imageStyle={{borderRadius: 12}}
        source={{
          uri: Movie.w500Image(upcomingMovie.poster_path),
        }}></ImageBackground>
      <View>
        <Text style={styles.movieTitle} numberOfLines={3}>
          {upcomingMovie.title}
        </Text>
        <View>
          <View>
            <Text>{upcomingMovie.vote_average}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 15,
  },
  movieTitle: {
    color: 'black',
    paddingVertical: 2,
    marginTop: 5,
    fontSize: 13,
    fontWeight: 'bold',
    width: 230,
  },
  tmdbRating: {
    marginRight: 5,
  },
})

export default MovieCard
