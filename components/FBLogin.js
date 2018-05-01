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
    let signInUser = {}
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((fbUser) => {
      fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(users => {
          console.log(users)
          const userExists = users.find(user => {
            return fbUser.id == user.fbId
          })
            console.log(userExists)
            if(userExists) {
              this.setState({
                currentUser: userExists
              })
            } else {
              let newUser = {
                fbId: fbUser.id,
                name: fbUser.name,
                email: fbUser.email
              }
              fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
              })
              .then(response => response.json())
              .then(user => {
                this.setState({
                  currentUser: user
                })
              })
              .catch(error => console.log(error))
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