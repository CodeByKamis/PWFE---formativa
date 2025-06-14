import axios from 'axios'; //faz requisição na api
import React, { useState, useEffect } from 'react';
//usesate guarda valores e useeffect roda as coisas automatico como a mudanca de um dado sem recarregar a pagina
import estilos from './DisciplinasGestor.module.css'; //estilização css
import { BarraPg } from '../Componentes/BarraPg'; //cabecalho da pagina
import { Footer } from '../Componentes/Footer'; //footer da pagina
import { Link } from 'react-router-dom'; //permite utilizar link
import more from '../assets/more.svg'; //icone de adicionar (adcionar disciplina)
import edit from '../assets/edit.svg'; //icone de editar (editar disciplina)
import dell from '../assets/dell.svg'; //icone de deletar (deletar disciplina)

export function DisciplinasGestor(){
    const[disciplinas, setDisciplinas] = useState([]); //receber as disciplinas que a api entrega
    const[professores, setProfessores] = useState([]); //receber os professores que a api entrega
    
    //pegar os dados da api apartir da url e token de acesso
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
            //serve para transformar array de prof em objeto com id
            const professorporId ={};
            response.data.forEach(prof => {
                professorporId[prof.id] = `${prof.first_name} ${prof.last_name}`; //ou ${prof.username}
            });
            setProfessores(professorporId);
        })
        .catch(error =>{
            console.error("Erro o buscar o professor", error); //se der ruim tem que vir mensagem de erro
        });

    },[]);
    //função para excluir uma disciplina
    function excluirDisciplina(id) {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta disciplina?');
        if (!confirmar) return;

        const token = localStorage.getItem('access_token');

        axios.delete(`http://127.0.0.1:8000/api/disciplina/${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => {
            //atualiza a lista automaticamente
            setDisciplinas(prev => prev.filter(d => d.id !== id));
            alert("Disciplina excluída com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao excluir disciplina", error);
            alert("Erro ao excluir disciplina.");
        });
    }
    //retornando na tela do usuario
    return(
        <>
        {/* esse é o meu cabeçalho */}
            <BarraPg/>
            <main className={estilos.containerM}>
                <div className={estilos.container}>
                    <h3 className={estilos.title}>DISCIPLINAS</h3>
                    {/* adicionar nova disicplina */}
                    <div className={estilos.topoAcoes}>
                        <Link to="/adicionardisciplina" className={estilos.botaoAdicionar}>
                            <img className={estilos.iconeAdd} src={more} alt='Adicionar disciplina' />
                        </Link>
                    </div>
                    {/* tabela de exibir as disciplinas ja cadastradas */}
                    <div className={estilos.tabelaWrapper}>
                        <table className={estilos.tabeladados}>
                            <thead>
                                <tr className={estilos.cabecalho}>
                                    <th>Nome</th>
                                    <th>Curso</th>
                                    <th>Descrição</th>
                                    <th>Carga Horária</th>
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
                                            {/* editar disciplina */}
                                            <Link to={`/editardisciplina/${disciplina.id}`} className={estilos.botaoAdicionar}>
                                                <img className={estilos.icone} src={edit} alt="Editar disciplina" />
                                            </Link>
                                            {/* botão de deletar disciplina */}
                                            <button className={estilos.botaoExcluir} onClick={() => excluirDisciplina(disciplina.id)} title="Excluir">
                                                <img className={estilos.icone} src={dell} alt="Excluir disciplina" />
                                            </button>
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