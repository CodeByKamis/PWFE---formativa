import axios from 'axios';
// o axios vai chamar o backend - é para fazer requisições http, sendo necessario consultar o backend
import { useForm } from 'react-hook-form';
// useform valida tudo o que o usuario enviou antes de levar para o backend
import { z } from 'zod';
// z = zod VAI FALR COMO VAMOS VALIDAR O FORMULARO DE PRENCHIMENTO
import { zodResolver } from '@hookform/resolvers/zod';
// ZODRESOLVER - Ele manda as mensagens de erro para a tela do usuario
import estilos from './Login.module.css';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { Footer } from '../Componentes/Footer';
import { useNavigate } from 'react-router-dom';

// vai validando as informações que vai receber do usuario



export function Login(){
    const navigate = useNavigate()
    const schemaLogin = z.object({
        username: z.string()
        .min (1, 'Informe o seu usuário corretamente')
        .max (255, 'Informe no máximo 255 caracteres'),

    password: z.string()
        .min(1, 'Informe a sua senha corretamente')
        .max(255, 'Informe no máximo 255 caracteres'),
        
});
    // é necessario consumir tudo o que for colocado dentro dos campos do formulario
    // esse const serve para registrar todas as info que são dadas pelo usuario p/ tentar resolver de acordo com o schemaLogin :)
    // Kamila não é muito dificil, vai dar bom
    const{
        register,
        handleSubmit,
        formState: {errors}
    }=useForm(
        {resolver: zodResolver(schemaLogin)}
    );
    async function ObterDados(data) {
        console.log(`Dados ${data}`)
        // ele serve para vermos o que esta sendo resgatado 
        // Essa função, do jeito que está, só imprime os dados no console. Ela está sendo usada como um logger de depuração – 
        // útil para verificar se os dados estão sendo recebidos corretamente.'''

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login/',{
                username: data.username,
                password: data.password
            });
            const {access, refresh, user} = response.data;
            // está gravando as informações de forma fisica os que eu recebo (esse de baixo aqui)
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            localStorage.setItem('tipo', user.tipo)
            localStorage.setItem('username', data.username)
            console.log(response.data)
            console.log("Login efetuado com sucesso")
            alert(`Seja bem-vindo(a) ${data.username}`)
            navigate('/inicial') //redireciona para a pagina login

            // colocar a porta de entrada
        }catch(error){
            console.error('Erro! Tente novamente.', error.response);
            alert("Dados Inválidos")
        }
    }

// assincrona: nn sei quanto tempo vai demorar para carregar (logiin.... logiin....)
// sincrona: vc sabe quanto tempo vai demorar para carregar (vai demorar 3 minutos)



    return(
        <>
            <BarraNavegacao/>
        
            <div className={estilos.container}>
                {/* form lido, relido e processado */}
                <form onSubmit={handleSubmit(ObterDados)} className={estilos.loginform}>

                    <h2 className={estilos.titulo}>Fazer login</h2>

                    <label className={estilos.label}>Usuário</label>
                    <input className={estilos.inputField}
                    // os 3 pontos serve para quebrar uma array ou algo assim - tenho um objeto e ele tem nome, duracao, ano, genero, o ... quebra isso em nome: tal; ano: tal;
                        {...register('username')}
                        placeholder='Escreva aqui'
                    />
                    {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

                    {/* && faz concatenização react com o uso de tags*/}



                    <label className={estilos.label}>Senha:</label>
                    <input className={estilos.inputField}
                        {...register('password')}
                        placeholder='Senha'
                        type="password"//serve para aparecer as bolinhas na senha
                    />
                    {errors.password && <p className={estilos.error}>{errors.password.message}</p>}

                    <button type='submit' className={estilos.submitButton}>Fazer Login</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}