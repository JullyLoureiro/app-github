import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import { api } from '../api/fetch'
import Loading from '../components/Loading'
import ListItem from '../components/ListItem'
import {turquesa} from '../paleta/colors'
import { Badge } from 'react-native-elements'
import CachedImage from '../components/CachedImage'

export default class RepoUser extends React.Component{
  constructor(props){
    super(props)

    this.state={
      user: null,
      showLoading: false,
      lista: []
    }
  }

  componentDidMount() {
      this.loadUser()
  }

  loadUser(){
    const { item, busca } = this.props.route.params.dados
    this.setState({user: item, showLoading: true}, ()=>{
      api.get(`users/${busca}/repos?sort=stars&direction=desc`)
      .then(dados=>this.setState({lista: dados, showLoading: false}))
      .catch(e=>{console.log(e)})
    })
  }

  componentDidUpdate(prevProps){
      if(prevProps.route.params.dados.item !== this.props.route.params.dados.item) this.loadUser()
  }

  render() {
    const {showLoading, user, lista} = this.state
    return (
      showLoading ? (
        <Loading />
      ) :(
        <View style={styles.container}>
        <FlatList 
          ListHeaderComponent={
            user &&
              <>
                  <CachedImage style={styles.image} source={{ uri:  user.avatar_url }}/>

                  <View style={styles.containerInfo}>
                    <Text style={styles.title}>{user.login}</Text>
                    <Text style={styles.info}>{user.bio} | {user.company}</Text>
                    <View style={styles.viewFollow}>
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Seguidores', {dados: {user: user.login, follow: 'followers', navigation: this.props.navigation}})}>
                        <Text style={styles.follow}>Seguidores:  {user.followers}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Seguindo', {dados:{user: user.login, follow: 'followers', navigation: this.props.navigation}})}>
                        <Text style={styles.follow}>Seguindo:  {user.following}</Text>
                      </TouchableOpacity>
                    </View>
                    {user.location && <Badge containerStyle={{position: 'absolute', right: 0}} badgeStyle={{backgroundColor: turquesa}} value={<Text style={{paddingLeft:20, paddingRight:20, color: '#fff'}}>{user.location}</Text>} />}
                    <Text style={styles.titleRepo}>Repositórios</Text>
                  </View>
              </>
            }
          data={lista} 
          renderItem={({ item }) => <ListItem navigation={this.props.navigation} item={item}/> } 
          keyExtractor={item => item.id.toString()}
        />
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title:{
    fontSize: 23,
    fontWeight: '800',
    padding: 2,
    marginTop: 10
  },
  viewFollow:{
    borderWidth: 1, 
    padding: 20, 
    borderRadius:5,
    borderColor: turquesa,
    marginTop: 20, 
    justifyContent: 'space-between', 
    flexDirection: 'row'
  },
  follow:{
    fontSize: 20,
    fontWeight: '800',
    padding: 2,
  },
  titleRepo: {
    marginTop: 30,
    fontSize: 23,
    fontWeight: '800',
    padding: 2,
  },
  containerInfo: {
    margin: 20,
  },
  image: {
    width: '100%',
    height: 350,
  },
  info: {
    padding: 2
  },
});
