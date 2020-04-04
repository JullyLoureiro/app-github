import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import { api } from '../api/fetch'
import Loading from '../components/Loading'
import {turquesa, cinza} from '../paleta/colors'
import CachedImage from '../components/CachedImage'
import { MaterialIcons } from '@expo/vector-icons'
import { Divider } from 'react-native-elements'

export default class RepoUser extends React.Component{
  constructor(props){
    super(props)

    this.state={
      lista: [], 
      showLoading: true
    }
  }

  componentDidMount(){
    const { user, follow  } = this.props.route.params.dados
    api.get(`users/${user}/${follow}`)
    .then(dados=>this.setState({lista: dados, showLoading: false}))
    .catch(e=>{console.log(e)})
  }

  loadUser(item, navigation){
    api.get(`users/${item.login}`)
    .then(dados=>navigation.navigate('Repositórios', {dados: {item: dados, busca: dados.login}}))
    .catch(e=>{console.log(e)})
  }

  render() {
    const {navigation} = this.props

    const Item = ({ item }) => {
        return (
          <TouchableOpacity style={styles.container} onPress={()=>this.loadUser(item, navigation)}>
            <View style={styles.viewItem}>
                <View style={styles.item}>
                    <CachedImage style={{width: 50, height:50, borderRadius: 25}} source={{ uri: item.avatar_url }}/>
                    <Text style={styles.user}>{item.login}</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={32} color={cinza} />
            </View>
            <Divider style={{ backgroundColor: cinza }} />
          </TouchableOpacity>
        )
    }

    const {lista, showLoading} = this.state
    return (
        <View style={styles.container}>
        {showLoading && <Loading />}
        <FlatList 
          data={lista} 
          renderItem={({ item }) => <Item item={item}/> } 
          keyExtractor={item => item.id.toString()}
        />
        </View>
            
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    padding: 20,
  },
  viewItem:{
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  user: {
      fontSize: 18,
      fontWeight: '700',
      alignSelf: 'center',
      paddingLeft: 20
  }
});
