import React, { Component } from 'react'
import { View } from 'react-native'
import FBSDK, {LoginManager} from 'react-native-fbsdk'
const { LoginButton } = FBSDK

export default class FBLogin extends Component {
  constructor (props) {
    super(props)
    this.onLoginFinished = this.onLoginFinished.bind(this)
  }

  onLoginFinished (error, result) {
    console.log(result)
    if (error) {
      console.log(error)
      alert("Login failed with error: " + error);
    } else if (result.isCancelled) {
      alert("Login was cancelled");
    } else {
      alert("Login was successful with permissions: ")
    }
  }


  render () {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <LoginButton
          readPermissions={["public_profile"]}
          onLoginFinished={this.onLoginFinished}
          onLogoutFinished={() => alert("User logged out")}
        />
      </View>
    )
  }
}