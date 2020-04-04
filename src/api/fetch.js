const baseUrl = 'https://api.github.com/'

const _api = async (_url, _method, _body) => {
    const response = await fetch(baseUrl + _url, { 
        method: _method, 
        headers: {'Content-Type': 'application/json', 'Authorization': 'token e5c80ec19ee9aeccac0dc67f59214d9e6662aed9'},
        body: JSON.stringify(_body)
      })
    const json = await response.json()
    return json
}

export const api = {
    /**
     * Retorna uma Promisse de GET
     * @param {String} url Endereço do endpoint (Não inicie com "/" )
     * @param {JSON} body 
     */
    get: (url, body)=>_api(url,'GET',body)
}