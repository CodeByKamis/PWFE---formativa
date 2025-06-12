import axios from 'axios';
import React, { useState, useEffect } from 'react';
import estilos from './SalasGestores.module.css';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';
import { Link } from 'react-router-dom';
import more from '../assets/more.svg';
import edit from '../assets/edit.svg';
import dell from '../assets/dell.svg';

export function ReservasGestor() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://127.0.0.1:8000/api/reserva/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setReservas(response.data);
    })
    .catch(error => {
      console.error("Erro ao buscar reservas", error);
      alert("Erro ao carregar reservas. Verifique se você tem permissão.");
    });
  }, []);

  function excluirReserva(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    axios.delete(`http://127.0.0.1:8000/api/reserva/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      setReservas(prev => prev.filter(r => r.id !== id));
      alert("Reserva excluída com sucesso!");
    })
    .catch(error => {
      console.error("Erro ao excluir reserva", error);
      alert("Erro ao excluir reserva.");
    });
  }

  return (
    <>
      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          <h3 className={estilos.title}>RESERVAS</h3>
          <div className={estilos.topoAcoes}>
            <Link to="/adicionarreserva" className={estilos.botaoAdicionar}>
              <img className={estilos.iconeAdd} src={more} alt='Adicionar reserva' />
            </Link>
          </div>
          <div className={estilos.tabelaWrapper}>
            <table className={estilos.tabeladados}>
              <thead>
                <tr className={estilos.cabecalho}>
                  <th>Sala</th>
                  <th>Usuário</th>
                  <th>Início</th>
                  <th>Fim</th>
                  <th className={estilos.acao_cabecalho}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(reserva => (
                  <tr key={reserva.id}>
                    <td>{reserva.sala.nome}</td>
                    <td>{reserva.usuario.nome}</td>
                    <td>{new Date(reserva.data_inicio).toLocaleString()}</td>
                    <td>{new Date(reserva.data_fim).toLocaleString()}</td>
                    <td>
                      <Link to={`/editarreserva/${reserva.id}`} className={estilos.botaoAdicionar}>
                        <img className={estilos.icone} src={edit} alt="Editar reserva" />
                      </Link>
                      <button className={estilos.botaoExcluir} onClick={() => excluirReserva(reserva.id)} title="Excluir">
                        <img className={estilos.icone} src={dell} alt="Excluir reserva" />
                      </button>
                    </td>
                  </tr>
                ))}
                {reservas.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>Nenhuma reserva encontrada.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
