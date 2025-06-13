import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import estilos from './DisciplinasGestor.module.css'; // você pode renomear depois
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';
import more from '../assets/more.svg';
import edit from '../assets/edit.svg';
import dell from '../assets/dell.svg';

export function ReservaGestor() {
  const [reservas, setReservas] = useState([]);
  const [salas, setSalas] = useState({});
  const [professores, setProfessores] = useState({});
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // Reservas
    axios.get('http://127.0.0.1:8000/api/reserva/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setReservas(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar reservas:", err);
        setErro("Erro ao carregar as reservas.");
        setLoading(false);
      });

    // Salas
    axios.get('http://127.0.0.1:8000/api/sala/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const salasObj = {};
        res.data.forEach(sala => {
          salasObj[sala.id] = sala.nome;
        });
        setSalas(salasObj);
      })
      .catch(err => console.error("Erro ao buscar salas", err));

    // Professores
    axios.get('http://127.0.0.1:8000/api/usuario/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const profObj = {};
        res.data.forEach(user => {
          if (user.tipo === 'P') {
            profObj[user.id] = `${user.first_name} ${user.last_name}`;
          }
        });
        setProfessores(profObj);
      })
      .catch(err => console.error("Erro ao buscar professores", err));
  }, []);

  function excluirReserva(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta reserva?")) return;

    const token = localStorage.getItem('access_token');

    axios.delete(`http://127.0.0.1:8000/api/reserva/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert("Reserva excluída com sucesso!");
        setReservas(prev => prev.filter(res => res.id !== id));
      })
      .catch(err => {
        console.error("Erro ao excluir reserva", err);
        alert("Erro ao excluir reserva.");
      });
  }

  return (
    <>
      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          <h3 className={estilos.title}>Reservas de Sala</h3>

          <div className={estilos.topoAcoes}>
            <Link to="/adicionarreserva" className={estilos.botaoAdicionar}>
              <img className={estilos.iconeAdd} src={more} alt="Adicionar reserva" />
            </Link>
          </div>

          {loading && <p>Carregando reservas...</p>}
          {erro && <p>{erro}</p>}

          {!loading && !erro && (
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
                    <td>{professores[reserva.professor]}</td>
                    <td>{salas[reserva.sala_reservada]}</td>
                    <td>{reserva.periodo}</td>
                    <td>{reserva.data_inicio}</td>
                    <td>{reserva.data_termino}</td>
                    <td>
                      <Link
                        to={`/editarreserva/${reserva.id}`}
                        className={estilos.botaoAdicionar}>
                        <img className={estilos.icone} src={edit} alt="Editar" />
                      </Link>
                      <button
                        className={estilos.botaoExcluir}
                        onClick={() => excluirReserva(reserva.id)}
                        title="Excluir reserva">
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
