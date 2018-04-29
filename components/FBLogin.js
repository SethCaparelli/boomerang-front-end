import React, { Component } from 'react'
import { View } from 'react-native'
import FBSDK, { AccessToken } from 'react-native-fbsdk'
const { LoginButton } = FBSDK

export default class FBLogin extends Component {

  initUser = (token) => {
    console.log("init")
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  render () {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <LoginButton
          readPermissions={["public_profile email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('login has error: ', result.error)
              } else if (result.isCancelled) {
                console.log('login is cancelled.')
              } else {
                AccessToken.getCurrentAccessToken()
                  .then((data) => {
                    const { accessToken } = data
                    this.initUser(accessToken)
                })
              }
            }
          }
        />
      </View>
    )
  }
}