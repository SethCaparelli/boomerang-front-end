import React, { Component } from 'react'
import { View } from 'react-native'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'

class GoogleLogin extends Component {

    _signIn = () => {
        GoogleSignin.configure({
            iosClientId: "548154382698-4qos7rodk1p9s0jjhqugn5d0vrgo0l62.apps.googleusercontent.com"
          })
          .then(() => {
            GoogleSignin.signIn()
                .then((user) => {
                    console.log(user);
                })
                .catch((err) => {
                    console.log('WRONG SIGNIN', err);
                })
                .done();
          });
    }

    render() {
        return (
            <View>
                <GoogleSigninButton
                    style={{width: 48, height: 48}}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}/>
                }
            </View>
        )
    }
}

export default GoogleLogin