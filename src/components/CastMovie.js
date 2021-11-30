import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native'
import {Movie} from '../services/Api'

function CastMovie ({castMovie}) {
  console.log()
  return (
    <View style={styles.castContainer}>
      <Image
        style={styles.castImage}
        source={{
          uri: Movie.w500Image(castMovie?.profile_path),
        }}
      />
      <View style={styles.castDesc}>
        <Text style={styles.castCharacter}>{castMovie?.character}</Text>
        <Text style={styles.castName}>{castMovie?.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  castImage: {
    height: 110,
    width: 100,
    marginBottom: 10,
  },
  castDesc: {
    marginLeft: 20,
    flex: 1,
  },
  castCharacter: {
    marginLeft: 10,
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  castName: {
    marginLeft: 10,
    fontSize: 16,
    marginTop: 10,
  },
  castContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
})
export default CastMovie
