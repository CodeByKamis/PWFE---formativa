import axios from 'axios';//faz requisição na api
import React, { useState, useEffect } from 'react';
//usesate guarda valores e useeffect roda as coisas automatico como a mudanca de um dado sem recarregar a pagina
import estilos from './DisciplinasGestor.module.css';//estilização css
import { BarraPg } from '../Componentes/BarraPg'; //cabeçalho
import { Footer } from '../Componentes/Footer'; //footer
import { Link } from 'react-router-dom'; // conseguir utilizar link para navegação 
import more from '../assets/more.svg'; //icone de adicionar (adicionar gestores)
import edit from '../assets/edit.svg'; //icone de editar (editar gestores)
import dell from '../assets/dell.svg'; //icone de deletar (deletar gestores)

//funcao
export function GerenciarGestores() {
  //receber os gestores
  const [gestores, setGestores] = useState([]);
  //controle o carragemtno da pagina
  const [loading, setLoading] = useState(true); 
   //guarda mensagens de erro
  const [erro, setErro] = useState(null);
  //pegar os dados da api apartir da utl e o token de acesso
  useEffect(() => {
    fetchGestores();
  }, []);
  //funcao para procurar gestores na api
  function fetchGestores() {
    const token = localStorage.getItem('access_token');
     //indica que está carregando
    setLoading(true);
    setErro(null); 

    axios
      .get('http://127.0.0.1:8000/api/usuario/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      //pega os usuarios tipo G = Gestores
      .then((response) => {
        const gests = response.data.filter((user) => user.tipo === 'G');
        setGestores(gests);
        setLoading(false);
      })
      //caso dê errado
      .catch((error) => { 
        console.error('Erro ao buscar gestores:', error);
        setErro('Erro ao carregar os gestores.');
        setLoading(false);
      });
  }
  //funcao para poder excluir algum usuario do tipo G = Gestor
  function excluirGestor(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este gestor?'
    );
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    axios
      .delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Gestor excluído com sucesso!');
        // Atualiza a lista corretamente
        setGestores((prev) => prev.filter((gest) => gest.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao excluir gestor:', error);
        alert('Erro ao excluir gestor.');
      });
  }
//retornando para a tela de usuario
  return (
    <>
    {/* cabecalho */}
      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          {/* titulo */}
          <h3 className={estilos.title}>Gestores Cadastrados</h3>
          {/* cadastrar gestor */}
          <div className={estilos.topoAcoes}>
            <Link to="/cadastrargestores" className={estilos.botaoAdicionar}>
              <img className={estilos.iconeAdd} src={more} alt="Adicionar gestor" />
            </Link>
          </div>
          {/* mais para tratativa de erro caso seja necessário por token expirado etc */}
          {loading && <p>Carregando gestores...</p>}
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
                {gestores.map((gest) => (
                  <tr key={gest.id}>
                    <td>{gest.id}</td>
                    <td>{`${gest.first_name} ${gest.last_name}`}</td>
                    <td>{gest.username}</td>
                    <td>{gest.ni}</td>
                    <td>{gest.telefone || '—'}</td>
                    <td>{gest.data_nascimento}</td>
                    <td>{gest.data_contratacao}</td>
                    <td>
                      <Link
                        to={`/editargestores/${gest.id}`}
                        title="Editar gestor"
                        className={estilos.botaoAdicionar}
                      >
                        <img className={estilos.icone} src={edit} alt="Editar" />
                      </Link>
                      <button
                        className={estilos.botaoExcluir}
                        onClick={() => excluirGestor(gest.id)}
                        title="Excluir gestor"
                      >
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
