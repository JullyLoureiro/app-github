import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { turquesa,preto } from '../paleta/colors'
import Icon from 'react-native-vector-icons/AntDesign'
import { api } from '../api/fetch'
import Loading from '../components/Loading'

export default class Home extends React.Component{
  constructor(props){
    super(props)

    this.state = { 
       busca: '',
       showLoading: false
    }
  }

  searchUser() {
    const {busca} = this.state
    api.get(`users/${busca}`).then(dados=>{
      this.setState({showLoading: false}, ()=>{
        if(dados.message) Alert.alert('Atenção', dados.message, [{text: 'OK', onPress: () => {}}],{ cancelable: false })
        else this.props.navigation.navigate('Repositórios', {dados:{item: dados, busca: busca}})
      })
    }).catch(e=>{
        console.log(e)
    })
  }

  render() {
    const {showLoading} = this.state
    return (
      <View style={styles.container}>
        {showLoading && <Loading />}
        <Icon style={styles.icon} name="github" size={50} color={preto} />
        <Text style={styles.title}>Busca de Repositórios</Text>
        <Input inputStyle={styles.input} onChangeText={(text)=>{this.setState({busca: text})}} value={this.state.busca} placeholder='Nome do usuário' rightIcon={{ type: 'font-awesome', name: 'search' }} />
        <Button buttonStyle={styles.button} title="Buscar" onPress={()=>this.setState({showLoading: true}, ()=>this.searchUser())}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
      marginLeft: 10,
      marginRight:10,
      marginBottom: 30,
      fontSize: 24,
      fontWeight: '800'
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: turquesa,
    width: 320, 
  },
  input: {
    width: '100%',
    margin: 5,
  },
  icon: {
    margin: 10
  }
});
