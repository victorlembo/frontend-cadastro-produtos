import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, Alert } from 'react-native'
import { withTheme, Caption, TextInput, FAB, Snackbar } from 'react-native-paper'
import Header from '../components/Header'
import Api from '../resources/Api'

function AdicionaProduto({ navigation, theme, route }) {
   const { colors } = theme
   const registroInicial = route.params ? route.params.produto
                                        : {codigo_produto: '',nome_produto: '',descricao_produto: '',valor_produto: '',categoria: ''}
   const [produto, setProduto] = useState(registroInicial)
   const [salvando, setSalvando] = useState(false)

   const salvarProduto = async(dadosProduto) => {
     setSalvando(true)  
     let salvar = dadosProduto.hasOwnProperty('_id')
                  ? await Api.alteraProduto(dadosProduto)   
                  : await Api.incluiProduto(dadosProduto)
     if(salvar.hasOwnProperty('errors')){
         Platform.OS === 'web' ? alert(`❗Erro: ${salvar.errors[0].msg}`)
                               : Alert.alert("❗Erro",salvar.errors[0].msg)
                               setSalvando(false)
     } else if (salvar.hasOwnProperty('acknowledged')){
        Platform.OS === 'web' ? alert(`✅Tudo Ok: Registro salvo com sucesso`)
                              : Alert.alert("✅Tudo Ok","Registro salvo com sucesso")
                              setSalvando(false)
                              navigation.navigate('Inicio')                       
     }             
     
   }

   return (
    <>
        <View style={{flex:1, paddingVertical: 0, paddingHorizontal: 0}}>
            <Header titulo="Cadastro de Produtos" 
                    voltar={true} navigation={navigation} />
                   {/* <Text style={{color: colors.text}}>
                             ${JSON.stringify(registroInicial)}
                       </Text> */ }
            <View style={{flex:1, backgroundColor: colors.surface, paddingHorizontal: 16,
            paddingVertical: 4}}>
                <Caption style={{fontSize:20, marginBottom: 16, marginTop:16 }}>
                    Cadastro de Produtos
                </Caption>
                <Text style={{color: colors.text, paddingLeft: 8}}>Código</Text>
                <TextInput
                     name="codigo_produto"
                     style={{margin: 8}}
                     keyboardType="number-pad"
                     placeholder='Código do Produto (somente números)'
                     maxLength={14}
                     value={produto.codigo_produto}
                     onChangeText={(text)=> setProduto({...produto, codigo_produto:text})}
                     />
                <Text style={{color: colors.text, paddingLeft: 8}}>Nome do Produto</Text>     
                <TextInput
                    name="nome_produto"
                    style={{margin:8}}     
                    keyboardType="default"
                    placeholder='Nome do Produto'
                    maxLength={100}
                    value={produto.nome_produto}
                    onChangeText={(text)=> setProduto({...produto, nome_produto: text})}
                    />
                <Text style={{color: colors.text, paddingLeft: 8}}>Descrição do produto</Text>     
                <TextInput
                    name="descricao_produto"
                    style={{margin:8}}     
                    keyboardType="default"
                    placeholder='Descrição do produto (opcional)'
                    maxLength={50}
                    value={produto.descricao_produto}
                    onChangeText={(text)=> setProduto({...produto, descricao_produto: text})}
                    /> 
                <Text style={{color: colors.text, paddingLeft: 8}}>Valor do Produto</Text>     
                <TextInput
                    name="valor_produto"
                    style={{margin:8}}     
                    keyboardType="number-pad"
                    placeholder='R$ (Digite apenas números)'
                    maxLength={7}
                    value={produto.valor_produto}
                    onChangeText={(text)=> setProduto({...produto, valor_produto: text})}
                    /> 
                <Text style={{color: colors.text, paddingLeft: 8}}>Categoria</Text>     
                <TextInput
                    name="categoria"
                    style={{margin:8}}     
                    keyboardType="default"
                    placeholder='(Digite apenas letras)'
                    maxLength={24}
                    value={produto.categoria}
                    onChangeText={(text)=> setProduto({...produto, 
                                                         categoria: text})}
                    />            
            </View>  
            <FAB style={styles.fab}
                 icon='content-save'
                 loading={salvando}
                 onPress={() => salvarProduto(produto)}         
             />    
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 4,
        bottom: 8
    }
})
export default withTheme(AdicionaProduto)