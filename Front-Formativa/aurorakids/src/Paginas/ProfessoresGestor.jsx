import axios from 'axios';//FAZ A REQUISIÇÃO DA API
import React, { useState, useEffect } from 'react';
//usesate guarda valores e useeffect roda as coisas automatico como a mudanca de um dado sem recarregar a pagina
import estilos from './DisciplinasGestor.module.css'; //estilização css
import { BarraPg } from '../Componentes/BarraPg'; //cabeçalho da pagina
import { Footer } from '../Componentes/Footer'; //footer da pagina
import { Link } from 'react-router-dom'; //permite criar link para navegação
import more from '../assets/more.svg'; //icone de adicionar (adicionar professor)
import edit from '../assets/edit.svg'; //icone de editar (editar professor)
import dell from '../assets/dell.svg'; //icone de deletar (deletar professor)

export function ProfessoresGestor() {
  //armazena os professores
  const [professores, setProfessores] = useState([]);
  //controla o carregamento
  const [loading, setLoading] = useState(true);
  //armazena os erros
  const [erro, setErro] = useState(null);

  useEffect(() => {
    //carrega os prof quando abre a pagina
    fetchProfessores();
  }, []);
//busca os prof no backend
  function fetchProfessores() {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    setErro(null);

    axios
      .get('http://127.0.0.1:8000/api/usuario/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //filtra os usuarios do tipo p = professor
        const profs = response.data.filter((user) => user.tipo === 'P');
        setProfessores(profs);
        setLoading(false);
      })
      .catch((error) => {
        // se der errado: 
        console.error('Erro ao buscar professores:', error);
        setErro('Erro ao carregar os professores.');
        setLoading(false);
      });
  }
//funcao para excluir o professor
  function excluirProfessor(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este professor?'
      //tratativa de erro
    );
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    axios
      .delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Professor excluído com sucesso!');
        // Atualiza lista
        setProfessores((prev) => prev.filter((prof) => prof.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao excluir professor:', error);
        alert('Erro ao excluir professor.');
        //se der errado
      });
  }
//retornado na tela do usuario
  return (
    <>
      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          <h3 className={estilos.title}>Professores Cadastrados</h3>

          <div className={estilos.topoAcoes}>
            <Link to="/professorescadastro" className={estilos.botaoAdicionar}>
              <img className={estilos.iconeAdd} src={more} alt="Adicionar professor" />
            </Link>
          </div>

          {loading && <p>Carregando professores...</p>}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          {!loading && !erro && (
            <table className={estilos.tabeladados}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Username</th>
                  <th>NI</th>
                  <th>Telefone</th>
                  <th>Data Nascimento</th>
                  <th>Data Contratação</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {professores.map((prof) => (
                  <tr key={prof.id}>
                    <td>{prof.id}</td>
                    <td>{`${prof.first_name} ${prof.last_name}`}</td>
                    <td>{prof.username}</td>
                    <td>{prof.ni}</td>
                    <td>{prof.telefone || '—'}</td>
                    <td>{prof.data_nascimento}</td>
                    <td>{prof.data_contratacao}</td>
                    <td>
                      <Link
                        to={`/editarprofessor/${prof.id}`}
                        title="Editar professor"
                        className={estilos.botaoAdicionar}>
                        <img className={estilos.icone} src={edit} alt="Editar" />
                      </Link>
                      <button
                        className={estilos.botaoExcluir}
                        onClick={() => excluirProfessor(prof.id)}
                        title="Excluir professor">
                        <img className={estilos.icone} src={dell} alt="Excluir" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
