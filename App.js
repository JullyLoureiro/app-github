import React, { Component } from 'react'
import Router from './src/navigation/Route'

export default class App extends Component {
  componentDidMount(){
    console.disableYellowBox = true // Oculta Warning na tela do app 😉
  }

  render() {
    return(
        <Router />
    )
  }
}