import React, { Component } from 'react'
import { View } from 'react-native'
import FBLogin from "./components/FBLogin"

export default class App extends Component {

  render () {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <FBLogin />
      </View>
    )
  }
}
