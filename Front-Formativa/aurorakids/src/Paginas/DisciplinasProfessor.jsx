import axios from 'axios'; //axios é o que permite que chamemos uma API :D SEJA BEST DELE ( PÁGINA HTTP(S) )
import React,{useState, useEffect} from 'react'; //state guarda o estado atual da variavel
//effect mostra isso em tela
import estilos from './DisciplinasProfessor.module.css';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';



export function DisciplinasProfessor(){
    //crio uma variavel disciplina que recebe os dados da API, e é controlada pelo state
    const[disciplinas, setDisciplina] =  useState([]);
    // (()=>{},[]) ()parametros, {}script, [] dependencias, aqui dentro mostro o que vou chamar
    useEffect(()=>{
        const token = localStorage.getItem('access_token')
        //é o que na url do back da API que eu quero consumir
        axios.get('http://127.0.0.1:8000/api/professor/disciplina',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        //se der certo
        .then(response =>{
            setDisciplina(response.data);
        })
        //se ser ruim
        .catch(error =>{
            console.error("Erro", error);
        });


        
    },[]);


    return(
        <>
            <BarraPg/>
            <div className={estilos.containerCard}>
                <h2 className={estilos.tituloCard}>Minhas Disciplinas</h2>
                <div className={estilos.listaCard}>
                    {disciplinas.map(disciplina=>(
                        <div className={estilos.card} key={disciplina.id}>
                            <h3 className={estilos.nome}>{disciplina.nome}</h3>
                            <p><strong>Curso: </strong>{disciplina.curso}</p>
                            <p><strong>Descrição: </strong>{disciplina.descricao}</p>
                            <p><strong>Carga Horária: </strong>{disciplina.carga_horaria}</p>
                        </div>
                    ))}

                </div>

            </div>
            <Footer/>
        </>
    );
}