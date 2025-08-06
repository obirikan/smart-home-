import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const DetailsPage = () => {
    const { id } = useLocalSearchParams()
    console.log({id})
  return (
    <View>
      <Text>DetailsPage</Text>
    </View>
  )
}

export default DetailsPage

const styles = StyleSheet.create({})