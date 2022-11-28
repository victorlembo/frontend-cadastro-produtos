import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native'
import { Text, withTheme, List, FAB, ActivityIndicator, IconButton, Avatar } from 'react-native-paper'
import Header from '../components/Header'
import ListaProduto from './ListaProduto'
import Api from '../resources/Api'

function ListaProdutos({ navigation, theme }) {
    const [produtos, setProdutos] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const { colors } = theme
    
    useEffect(()=> {
            getProdutos()
    }, [])

    const getProdutos = async() => {
        setCarregando(true)
        let retorno = await Api.getProdutos()
        retorno.ok === 0 ? Alert.alert('Erro!', 'Não foi possível obter a lista!') :
            setProdutos(retorno)
        setCarregando(false)
    }
    const onRefresh = React.useCallback(async() => {
        setRefreshing(true)
        try{
            await getProdutos()
        } catch (error){
            console.error(error)
        }
        setRefreshing(false)
    }, [refreshing])

    return ( 
        <>
    <View style={{backgroundColor: colors.surface, flex: 1}}>
        <Header titulo="Produtos" subtitulo="Relação de Produtos" 
                voltar={true} navigation={navigation}
        />
        {carregando && 
        <ActivityIndicator animating={true} size="large" color={colors.primary} />}
        <List.Subheader>
            <Avatar.Icon size={24} icon="refresh" /> Para atualizar os dados
        </List.Subheader>
        {produtos.length === 0 && !carregando
        ? (
            <View>
                <Text style={{fontSize: 20, marginLeft: 16}}>
                Ainda não há nenhum produto de serviço cadastrado.
                </Text>
            </View>    
        )
        : (
            <FlatList
             data={produtos}
             keyExtractor={item => item._id.toString()}
             refreshControl={
             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
             renderItem={({item}) => (
                 <ListaProduto data={item} navigation={navigation} />
             )}
           />  
        )
        }
        <FAB
            style={styles.fab}
            icon='plus'
            label=''
            onPress={()=> navigation.navigate('Produto')}
        />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    /*fab - float action button  */
    fab: {
         position: 'absolute',
         margin: 16,
         right: 4, 
         bottom: 8
    }
})

export default withTheme(ListaProdutos)