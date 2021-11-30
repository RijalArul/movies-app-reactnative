import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native'

const {width} = Dimensions.get('screen')

const setWidth = w => (width / 100) * w

function CardGenres ({genreName, active, onPress}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: active ? '#057DFE' : '#FFFFFF',
        color: active ? '#FFFFFF' : '#057DFE',
      }}
      activeOpacity={0.5}
      onPress={() => onPress(genreName)}>
      <Text
        style={{...styles.genreText, color: active ? '#FFFFFF' : '#057DFE'}}>
        {genreName}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    elevation: 3,
    marginVertical: 2,
    width: setWidth(25),
  },
  genreText: {
    color: '#057DFE',
    fontSize: 11,
  },
})

export default CardGenres
