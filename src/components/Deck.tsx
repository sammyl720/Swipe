import React, { useEffect, useRef } from 'react'
import { 
  StyleSheet,
  Animated,
  Text,
  useWindowDimensions,
  View,
PanResponder } from 'react-native'
import { card } from '../../data'
import { Gesture } from '../types/gesture.ts'

interface props {
  data: card[],
  renderCard: React.FC<card>
}

const Deck = ({ data, renderCard}: props) => {
  const position = new Animated.ValueXY()
  const SCREEN_WIDTH = useWindowDimensions().width
  const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
  const panResponder = useRef(PanResponder.create({
    // called any time user touches screen
    // if function return true the pan responder will track the gesture
    onStartShouldSetPanResponder: (event) => true,

    // called whenever user drags their finger on the screen
    // args: event, gesture (has info on type of gesture ie: speed, direction)
    onPanResponderMove: (event, gesture: Gesture ) => {
      // console.log(gesture)
      position.setValue({ x: gesture.dx, y: gesture.dy })
    },

    // called when user releases their finger from screen
    onPanResponderRelease: (event, gesture: Gesture) => {
    if(gesture.dx > SWIPE_THRESHOLD){
      console.log('Swipe right')
    } else if (gesture.dx < - SWIPE_THRESHOLD) {
      console.log('Swipe Left')
    } else {
      resetPosition()
    }
    }
  })).current

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0}
    }).start()
  }
  const getCardsStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }
  const renderCards = () => {
    return data.map((item: card, index) => {
      if (index === 0) {
        return (
          <Animated.View key={item.id}
          style={getCardsStyle()} {...panResponder.panHandlers}
          >
            { renderCard(item)}
          </Animated.View>
        )
      }
      return renderCard(item)
    })
  } 
  return (
    <View>
      { renderCards() }
    </View>
  )
}

export default Deck

const styles = StyleSheet.create({})
