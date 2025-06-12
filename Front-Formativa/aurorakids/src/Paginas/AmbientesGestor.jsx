import axios from 'axios';
import React, { useState, useEffect } from 'react';
import estilos from './DisciplinasGestor.module.css';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';
import { Link } from 'react-router-dom';
import more from '../assets/more.svg';
import edit from '../assets/edit.svg';
import dell from '../assets/dell.svg';

export function AmbientesGestor() {
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchProfessores();
  }, []);

  function fetchAmbientes() {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    setErro(null);

    axios
      .get('http://127.0.0.1:8000/api/usuario/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const profs = response.data.filter((user) => user.tipo === 'P');
        setProfessores(profs);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar professores:', error);
        setErro('Erro ao carregar os professores.');
        setLoading(false);
      });
  }

  function excluirProfessor(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este professor?'
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
      });
  }

  return (
    <>
      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          <h3 className={estilos.title}>Ambientes Cadastrados</h3>

          <div className={estilos.topoAcoes}>
            <Link to="/ambientecadastrar" className={estilos.botaoAdicionar}>
              <img className={estilos.iconeAdd} src={more} alt="Adicionar Ambiente" />
            </Link>
          </div>

          {loading && <p>Carregando Ambientes...</p>}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          {!loading && !erro && (
            <table className={estilos.tabeladados}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>capacidade</th>
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
