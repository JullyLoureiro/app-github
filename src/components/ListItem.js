import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Divider } from 'react-native-elements'
import { cinza } from '../paleta/colors'

export default class Listitem extends React.Component{
  constructor(props){
    super(props)
    
  }
  render() {
    const {item} = this.props
    return (
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detalhes', {item: item})}>
            <View style={styles.container}>
                <View style={styles.viewRepo}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text ellipsizeMode={'tail'} numberOfLines={2} style={styles.description}>{item.description ? item.description : 'Não informado'}</Text>
                </View>
                <View>
                    <MaterialIcons name="keyboard-arrow-right" size={32} color={cinza} />
                </View>
            </View>
            <Divider style={{ backgroundColor: cinza }} />
        </TouchableOpacity>
     
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between'
  },
  title: {
      fontSize: 22,
      padding: 5,
      paddingBottom: 5,
  },
  description: {
      textAlign: 'justify',
      paddingTop:10,
      paddingLeft: 5,
      color: cinza,
  },
  viewRepo: {
    maxWidth: '90%'
  }
});
