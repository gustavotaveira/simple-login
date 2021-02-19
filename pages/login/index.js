import styled from 'styled-components'
import styles from './login.module.css'
import Link from 'next/link'
import Axios from 'axios'
import { useState } from 'react'

const Title = styled.h1`
    font-family: sans-serif;
`

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const verifyUser = async event => {
        event.preventDefault();
        
        await Axios.get("https://602ece194410730017c51531.mockapi.io/api/v1/users")
        .then((response) => {
            let emailInformado = email;
            let senhaInformada = senha;
            let emailDaApi = response.data.email;
            let senhaDaApi = response.data.senha;
            let dadosDeAcessoValidos = emailInformado === emailDaApi && senhaInformada === senhaDaApi;
            
            if(dadosDeAcessoValidos){
                alert("Você foi logado com sucesso!")
            }else{
                alert("Login ou senha inválidos.")
            }
          });

    }

    return <>
            <div className={styles.row}>
                <div className={styles.column}>
                    <img src="/assets/img/woman_laptop.jpg" alt="Mulher trabalhando no laptop" className={styles.imagem}></img>
                </div>
                <div className={styles.column2}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.main_title}>Olá, seja bem-vindo!</h1>
                            <p className={styles.subtitle}> Para acessar a plataforma faça seu login.</p>
                        </div>
                        <form className={styles.form} onSubmit={verifyUser}>
                            <label for="email">E-mail</label><br />
                            <input id="email" name="email" onChange={(event) => setEmail(event.target.value)} className={styles.inputContainer} id="email" type="email" required/><br />

                            <label for="senha">Senha</label><br />
                            <input onChange={(event) => setSenha(event.target.value)} name="senha" id="senha" className={styles.inputContainer} type="password" required/><br />
                            <input id="botao_entrar" type="submit" className={styles.inputButton} value="Entrar"></input>
                        </form>
                        <p>Esqueceu o seu login ou sua senha?</p>
                        <p>Clique <Link href="#" ><a className={styles.links}>aqui</a></Link></p>
                    </div>
                </div>
            </div>
    </>
}