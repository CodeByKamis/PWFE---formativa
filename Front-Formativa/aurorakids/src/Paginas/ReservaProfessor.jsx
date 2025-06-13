import axios from 'axios';
import React, { useState, useEffect } from 'react';
import estilos from './DisciplinasProfessor.module.css';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';

export function ReservaProfessor() {
  const [reservas, setReservas] = useState([]);
  const [salas, setSalas] = useState({});
  const [disciplinas, setDisciplinas] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // Buscar salas e montar mapa id->nome
    axios.get('http://127.0.0.1:8000/api/salas/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const salasNome = {};
      res.data.forEach(sala => {
        salasNome[sala.id] = sala.nome;
      });
      setSalas(salasNome);
    })
    .catch(err => console.error('Erro ao buscar salas', err));

    // Buscar disciplinas e montar mapa id->nome
    axios.get('http://127.0.0.1:8000/api/disciplinas/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const disciplinasMap = {};
      res.data.forEach(disc => {
        disciplinasMap[disc.id] = disc.nome;
      });
      setDisciplinas(disciplinasMap);
    })
    .catch(err => console.error('Erro ao buscar disciplinas', err));

    // Buscar reservas
    axios.get('http://127.0.0.1:8000/api/professor/reservas/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setReservas(res.data);
    })
    .catch(err => console.error('Erro ao buscar reservas', err));
  }, []);

  return (
    <>
      <BarraPg />
      <div className={estilos.containerCard}>
        <h2 className={estilos.tituloCard}>Minhas Reservas</h2>∆
        <div className={estilos.listaCard}>
        {reservas.map(reserva => (
        <div key={reserva.id} className={estilos.card}>
          <h3 className={estilos.nome}>Sala: {salas[reserva.sala_reservada] || 'Carregando...'}</h3>
          <p><strong>Disciplina: </strong>{disciplinas[reserva.disciplina] || 'Carregando...'}</p>
          <p><strong>Período: </strong>{reserva.periodo}</p>
          <p><strong>Data Início: </strong>{reserva.data_inicio}</p>
          <p><strong>Data Término: </strong>{reserva.data_termino}</p>
        </div>
      ))}
              </div>
      </div>
      <Footer />
    </>
  );
}
