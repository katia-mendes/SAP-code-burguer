import { getItem } from "../../storage/local";

export function getProducts() {
    const token = getItem('accessToken');
    //chamando a API
      return fetch('https://burger-queen-api-mock-38om.vercel.app/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        })
          .then((response) => response.json())
}


  