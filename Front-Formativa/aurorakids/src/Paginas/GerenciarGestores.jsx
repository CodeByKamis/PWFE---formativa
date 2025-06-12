import axios from 'axios';
import React, { useState, useEffect } from 'react';
import estilos from './DisciplinasGestor.module.css';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';
import { Link } from 'react-router-dom';
import more from '../assets/more.svg';
import edit from '../assets/edit.svg';
import dell from '../assets/dell.svg';

export function GerenciarGestores() {
  const [gestores, setGestores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchGestores();
  }, []);

  function fetchGestores() {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    setErro(null);

    axios
      .get('http://127.0.0.1:8000/api/usuario/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const gests = response.data.filter((user) => user.tipo === 'G');
        setGestores(gests);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar gestores:', error);
        setErro('Erro ao carregar os gestores.');
        setLoading(false);
      });
  }

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

  return (
    <>
      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          <h3 className={estilos.title}>Gestores Cadastrados</h3>

          <div className={estilos.topoAcoes}>
            <Link to="/cadastrargestores" className={estilos.botaoAdicionar}>
              <img className={estilos.iconeAdd} src={more} alt="Adicionar gestor" />
            </Link>
          </div>

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
