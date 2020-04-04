import React from 'react';
import { StyleSheet, Text, View, Linking, ScrollView } from 'react-native'
import { Button} from 'react-native-elements'
import { turquesa, preto } from '../paleta/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import { api } from '../api/fetch'
import Loading from '../components/Loading'
import CachedImage from '../components/CachedImage'

export default class RepoDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      issuesClosed: 0, 
      issuesOpen: 0,
      showLoading: true
    }
  }

  componentDidMount() {
    const {item} = this.props.route.params
    api.get(`repos/${item.full_name}/issues?state=open`)
    .then(dados=>{this.setState({issuesOpen: dados.length}, ()=>{
        api.get(`repos/${item.full_name}/issues?state=closed`)
        .then(dados=>this.setState({showLoading:false, issuesClosed: dados.length}))
        .catch(e=>{console.log(e)})
      })
    })
    .catch(e=>{console.log(e)})
  }


  render() {
    const {item} = this.props.route.params
    const {showLoading} = this.state
    return (
      <ScrollView style={styles.scroll}>
        {/* LOADING */}
        <View style={{position: 'absolute', bottom: '50%', left: '50%'}}>
          {showLoading && <Loading />}
        </View>
        <View style={styles.container}>
          <View>
            {/* HEADER */}
            <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
              <CachedImage style={{width: 100, height:100, borderRadius: 50}} source={{ uri: item.owner.avatar_url }}/>
              <View style={{marginTop: -20}}>
                  <View>
                      <Text style={styles.mainTitle}>{item.name}</Text>
                  </View>
                  
                  <View style={styles.viewInfo}>
                      <Text>Issues: {this.state.issuesClosed} aberta(s) / </Text>
                      <Text>{this.state.issuesOpen} fechada(s)</Text>
                  </View>

                  <View style={styles.viewInfo}>
                      <Icon style={styles.icon} name="code-fork" size={20} color={preto} />
                      <Text style={styles.numberInfo}>{item.forks}</Text>

                      <Icon style={styles.icon} name="star" size={20} color={preto} />
                      <Text style={styles.numberInfo}>{item.stargazers_count}</Text>
                  </View>
                  
              </View>
            </View>

            {/* INFORMAÇÕES */}
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.description}>{item.description}</Text>

            <Text style={styles.title}>Linguagem</Text>
            <Text style={styles.description}>{item.language}</Text>

            <Text style={styles.title}>Data de Criação</Text>
            <Text style={styles.description}>{`Criado em: ${new Date(item.created_at).toLocaleDateString()}`}</Text>

          </View>

          {/* LINK */}
          <View>
            <Button buttonStyle={styles.button} color={'#fff'}  onPress={() => Linking.openURL(item.html_url)} title={'Abrir no GitHub'} />
          </View>
        
        </View>
      </ScrollView>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1, 
    backgroundColor:'#fff',
    justifyContent: 'space-between',
  },
  scroll:{
    flex: 1,
    height: '100%', 
    backgroundColor:'#fff'
  },  
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 30,
  },
  description:{
    marginTop: 10,
    fontSize: 17,
    textAlign: 'justify'
  },
  button: {
    backgroundColor: turquesa,
    marginTop: 30
  },
  icon: {
    marginLeft: 10
  }, 
  numberInfo: {
    padding: 4
  },
  viewInfo: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    padding: 2
  }
});
