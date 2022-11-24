
const BASE_API = 'https://backend-cadastro-produtos.vercel.app/api'

export default {
    getProdutos: async () => {
        const req = await fetch(`${BASE_API}/produtos`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await req.json()
        return json
    },
    getProduto: async (id) => {
        const req = await fetch(`${BASE_API}/produtos/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await req.json()
        return json
    },
    incluiProduto: async (dadosProduto) => {
        console.log(dadosProduto)
        const req = await fetch(`${BASE_API}/produtos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosProduto)
        })
        const json = await req.json()
        return json
    },
    alteraProduto: async (dadosProduto) => {
        const req = await fetch(`${BASE_API}/produtos`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosProduto)
        })
        const json = await req.json()
        return json
    },
    removeProduto: async (idProduto) => {
        const req = await fetch(`${BASE_API}/produtos/${idProduto}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await req.json()
        return json
    }

}