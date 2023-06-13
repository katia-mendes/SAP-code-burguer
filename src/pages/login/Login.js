import React, { useState } from 'react';
import Input from '../../components/Input';
import ButtonMain from '../../components/ButtonMain';
import ImgLogo from '../../components/ImgLogo';
import { useNavigate } from 'react-router-dom';

import './Login.css';


export const Login = () => {

    const [inputEmail, setInputEmail] = useState('');
    const [inputSenha, setInputSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //preencher os parametros de email/senha
    function preencherEmail(event){
      setInputEmail(event.target.value); // Atualiza o estado com o valor do input
    }

    function preencherSenha(event){
      setInputSenha(event.target.value); // Atualiza o estado com o valor do input
    }

    //função chamada ao submter o formulário
    const formLoginSubmit = (event) => {
        //interrompe  resto da ação "submit" que iria recarregar a página
        //ação necessaria pois o login será feito por chamada de API
        event.preventDefault();

        //pegar os parametros de email/senha
        const bodyJson={
          "email": inputEmail,
          "password": inputSenha
        }
        //chmar a api
        return fetch('https://code-burguer-api.vercel.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyJson)
        })
          .then((response) => response.json())
          .then((data) => {
            // Faça algo com a resposta da API
            // Para salvar o token:
            if(data && data.accessToken){
              console.log(data.accessToken)
              //se com sucesso: guardar o token
              localStorage.setItem('accessToken', data.accessToken);
              navigate('Pedidos');
            }
            else{
              setError(data)
            }
          })
          .catch((error) => {
            setError(error)
          });
        // se com falha: retornar erro

    }

    return (
        <div className='login-container'>
          <div className='grid-container'>
            <h1 className="title">codeBurger</h1>
            <ImgLogo />

            <form onSubmit={formLoginSubmit}>
              <h2>Login</h2>
              <Input
                type='email'
                placeholder='Seu e-mail'
                required
                onChange={preencherEmail}
              />
      
              <Input
                type='password'
                placeholder='Sua senha'
                required
                onChange={preencherSenha}
              />

              <div>
                {error && <p>{error}</p>}
              </div>

              <ButtonMain label="Login"/>

            </form>
          </div>   
        </div>
      );
}