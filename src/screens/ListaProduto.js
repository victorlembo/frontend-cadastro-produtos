import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'


import { List, withTheme, Avatar } from 'react-native-paper'
import Api from '../resources/Api'

function ListaProduto({ data, navigation, theme }) {
  const { colors } = theme

  async function confirmaExclusaoRegistro() {
    if (Platform.OS === 'web') {
      if (confirm('Deseja mesmo excluir este produto?') === true) { await excluirProduto(data) }
    } else {
      Alert.alert('Atenção!', 'Deseja mesmo excluir este produto?', [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await excluirProduto(data)
          },
        },
      ])
    }
  }

  const excluirProduto = async (dadosProduto) => {
    let excluir = await Api.removeProduto(dadosProduto._id)
    if (excluir.hasOwnProperty('errors')) {
      Platform.OS === 'web' ? alert(`‼️Erro: ${excluir.errors[0].msg}`) : Alert.alert("‼️Erro", excluir.errors[0].msg)
    } else if (excluir.hasOwnProperty('acknowledged')) {
      Platform.OS === 'web' ? alert(`✅Tudo OK: Registro excluído com sucesso `) : Alert.alert("✅Tudo OK", 'Registro excluído com sucesso')
      navigation.navigate('Inicio')
    }
  }

  const alteraProduto = async (dadosProduto) => {
    navigation.navigate('Produto', { produto: dadosProduto })
  }

  function botaoLadoDireito() {
    return (
      <View>
        <TouchableOpacity
          style={styles.buttonExcluir}
          onPress={confirmaExclusaoRegistro}
        >
          <Avatar.Icon size={48} icon="delete" style={{ backgroundColor: colors.background }} />
       
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={botaoLadoDireito}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => alteraProduto(data)}
      >

        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background, borderRadius: 20 }}>
          <List.Item
            title={data.nome_produto}
            description={`${data.descricao_produto}`}
            descriptionStyle={[styles.descricao]}
            right={ botaoLadoDireito } 
            left={props => <Avatar.Text label={data.codigo_produto} />}
          />

        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    height: 100,
    borderRadius: 8,
    marginBottom: 2,
    marginHorizontal: 8,
   
  },
  buttonExcluir: {
    
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
   
  },
  descricao: {
    paddingBottom: 16,

  }
})

export default withTheme(ListaProduto)