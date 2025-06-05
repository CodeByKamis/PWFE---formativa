import axios from 'axios';
import React,{useState, useEffect} from 'react';
import estilos from './VisualizarG.module.css';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';
import more from '../assets/more.svg';
import edit from '../assets/edit.svg';
import dell from '../assets/dell.svg';

export function DisciplinasGestor(){
    const[disciplinas, setDisciplinas] = useState([]);
    const[professores, setProfessores] = useState([]);
    useEffect(()=> {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/disciplina/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        //se der certo (200) quero popular a minha variavel disciplina com os dados de gestor da API
        .then(response =>{
            setDisciplinas(response.data);
        })
        //se der ruim quero que exiba a mensagem de erro
        .catch(error =>{
            console.error("Erro", error);
        });
        //busca professores
        axios.get('http://127.0.0.1:8000/api/usuario/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response =>{
            const professorporId ={}
            response.data.array.forEach(prof => {
                professorporId[prof.id] = `${prof.first_name} ${prof.last_name}`;
            });
            setProfessores(professorporId);
        })
        .catch(error =>{
            console.error("Erro o buscar o professor", error); //se der ruim tem que vir mensagem de erro
        });

    },[])
    return(
        <>
            <BarraPg/>
            <main className={estilos.containerM}>
                <div className={estilos.container}>
                    <h3 className={estilos.title}>DISCIPLINAS</h3>
                    <div className={estilos.topoAcoes}>
                        <img className={estilos.iconeAdd} src={more} alt='Adicionar disciplina' />
                    </div>
                    <div className={estilos.tabelaWrapper}>
                        <table className={estilos.tabeladados}>
                            <thead>
                                <tr className={estilos.cabecalho}>
                                    <th>Nome</th>
                                    <th>Curso</th>
                                    <th>Carga Horária</th>
                                    <th>Descrição</th>
                                    <th>Professor</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disciplinas.map(disciplina =>(
                                    <tr key={disciplina.id}>
                                        <td>{disciplina.nome}</td>
                                        <td>{disciplina.curso}</td>
                                        <td>{disciplina.descricao}</td>
                                        <td>{disciplina.carga_horaria}</td>
                                        <td>{professores[disciplina.professor]}</td>
                                        <td>
                                            <img className={estilos.icone} src={edit} alt="Editar disciplina" />
                                            <img className={estilos.icone} src={dell} alt="Excluir disciplina" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
             <Footer/>
        </>
    );
}