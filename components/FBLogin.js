import React, { Component } from 'react'
import { View } from 'react-native'
import FBSDK, { AccessToken } from 'react-native-fbsdk'
const { LoginButton } = FBSDK

export default class FBLogin extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: {}
    }
  }

  initUser = (token) => {
    console.log("init")
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((user) => {
      this.setState({
        currentUser: user
      })
      fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(users => {
          for(let i = 0; i <= users.length; i++) {
            if(users[i].email === user.email) {
              this.setState({
                currentUser: users[i]
              })
            } else {
              fetch("http://localhost:3000/users", {
                method: "POST",
                body: JSON({user})
              })
              .then(response => console.log(response))
            }
          }
        })
        .catch(error => console.log(error))
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