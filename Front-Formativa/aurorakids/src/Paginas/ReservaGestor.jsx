import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import estilos from './DisciplinasGestor.module.css'; 
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';
import more from '../assets/more.svg';
import edit from '../assets/edit.svg';
import dell from '../assets/dell.svg';

export function ReservaGestor() {
  const [reservas, setReservas] = useState([]);
  const [professores, setProfessores] = useState({});
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // Buscar reservas com a sala já aninhada (supondo que a API já retorna)
    const buscarReservas = axios.get('http://127.0.0.1:8000/api/reservas/', {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Buscar professores
    const buscarProfessores = axios.get('http://127.0.0.1:8000/api/usuario/', {
      headers: { Authorization: `Bearer ${token}` }
    });

    Promise.all([buscarReservas, buscarProfessores])
      .then(([resReservas, resProfessores]) => {
        setReservas(resReservas.data);

        const profObj = {};
        resProfessores.data.forEach(user => {
          if (user.tipo === 'P') {
            profObj[user.id] = `${user.first_name} ${user.last_name}`;
          }
        });
        setProfessores(profObj);

        setErro(null);
      })
      .catch(err => {
        console.error("Erro ao carregar dados:", err);
        setErro("Erro ao carregar as reservas.");
      })
      .finally(() => setLoading(false));
  }, []);

  // function excluirReserva(id) {
  //   if (!window.confirm("Tem certeza que deseja excluir esta reserva?")) return;

  //   const token = localStorage.getItem('access_token');

  //   axios.delete(`http://127.0.0.1:8000/api/reserva/${id}/`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(() => {
  //       alert("Reserva excluída com sucesso!");
  //       setReservas(prev => prev.filter(res => res.id !== id));
  //     })
  //     .catch(err => {
  //       console.error("Erro ao excluir reserva", err);
  //       alert("Erro ao excluir reserva.");
  //     });
  // }

  function excluirReserva(id) {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta disciplina?');
        if (!confirmar) return;

        const token = localStorage.getItem('access_token');

        axios.delete(`http://127.0.0.1:8000/api/reservas/${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => {
            setReservas(prev => prev.filter(d => d.id !== id));
            alert("Disciplina excluída com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao excluir disciplina", error);
            alert("Erro ao excluir disciplina.");
        });
    }

  return (
    <>
      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          <h3 className={estilos.title}>Reservas de Sala</h3>

          <div className={estilos.topoAcoes}>
            <Link to="/cadastrarreserva" className={estilos.botaoAdicionar}>
              <img className={estilos.iconeAdd} src={more} alt="Adicionar reserva" />
            </Link>
          </div>

          {loading && <p>Carregando reservas...</p>}
          {erro && <p className={estilos.error}>{erro}</p>}

          {!loading && !erro && reservas.length === 0 && (
            <p>Nenhuma reserva encontrada.</p>
          )}

          {!loading && !erro && reservas.length > 0 && (
            <table className={estilos.tabeladados}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Professor</th>
                  <th>Sala</th>
                  <th>Período</th>
                  <th>Início</th>
                  <th>Término</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(reserva => (
                  <tr key={reserva.id}>
                    <td>{reserva.id}</td>
                    <td>{professores[reserva.professor] || '—'}</td>
                    {/* Aqui puxando o nome da sala direto do objeto reserva.sala_reservada.nome */}
                    <td>{reserva.sala_reservada_detail?.nome || '—'}</td>
                    <td>{reserva.periodo}</td>
                    <td>{reserva.data_inicio}</td>
                    <td>{reserva.data_termino}</td>
                    <td>
                      <Link
                        to={`/editarreserva/${reserva.id}`}
                        className={estilos.botaoAdicionar}
                        title="Editar reserva"
                      >
                        <img className={estilos.icone} src={edit} alt="Editar" />
                      </Link>
                      <button className={estilos.botaoExcluir} onClick={() => excluirReserva(reserva.id)} title="Excluir">
                        <img className={estilos.icone} src={dell} alt="Excluir disciplina" />
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
