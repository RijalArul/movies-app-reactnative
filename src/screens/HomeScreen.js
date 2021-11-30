import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {ScrollView, View, Text} from 'react-native'
import CardGenres from '../components/CardGenres'
import ItemSeparator from '../components/ItemSeparator'
import MovieCard from '../components/MovieCard'
import {API_KEY, DiscoverMovieApi, GenreApi, MovieApi} from '../services/Api'

function HomeScreen ({navigation}) {
  const [genreActive, setGenreActive] = useState('All')
  const [genres, setGenres] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])

  useEffect(() => {
    async function fetchUpcomingMovies () {
      const response = await MovieApi.get(
        `/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
      )
      const {results} = await response.data
      const sortDate = results.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date)
      })
      setUpcomingMovies(sortDate)
    }

    async function fetchGenres () {
      const response = await GenreApi.get(
        `/movie/list?api_key=${API_KEY}&language=en-US`,
      )
      const {genres} = await response.data
      setGenres(genres)
    }
    fetchUpcomingMovies()
    fetchGenres()
  }, [])

  async function clickGenre (id) {
    let filterGenres = selectedGenres.filter(el => el === id)

    if (filterGenres.length > 0) {
      let filter = selectedGenres.filter(el => el !== id)
      setSelectedGenres(filter)
    } else {
      setSelectedGenres([...selectedGenres, id])
    }

    const response = await DiscoverMovieApi.get(
      `?api_key=${API_KEY}&language=en-US&with_genres=${selectedGenres}`,
    )

    const {results} = response.data

    setUpcomingMovies(results)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Movie</Text>
        <Text style={styles.headerSubTitle}>View All</Text>
      </View>
      <View>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({item, index}) => (
            <CardGenres
              genreName={item.name}
              active={
                item.name === genreActive
                  ? setGenreActive(true)
                  : setGenreActive(false)
              }
              onPress={() => clickGenre(item.id)}
            />
          )}
        />
      </View>
      <View>
        <FlatList
          data={upcomingMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          onPress={() => clickMovie(item.id)}
          renderItem={({item}) => (
            <MovieCard
              upcomingMovie={item}
              size={0.9}
              navigation={navigation}
            />
          )}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
  },
  headerSubTitle: {
    fontSize: 15,
    color: '#057DFE',
  },
})
export default HomeScreen
