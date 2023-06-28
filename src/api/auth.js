export function login(email,password){
  //chamando a API
    return fetch('https://burger-queen-api-mock-38om.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email , password})
      })
        .then((response) => response.json())
}
//https://sap-code-burguer.vercel.app/cadastrar-pedido