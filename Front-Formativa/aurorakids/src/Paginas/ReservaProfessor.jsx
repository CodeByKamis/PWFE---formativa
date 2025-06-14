import axios from 'axios';//faz requisição na api
import React, { useState, useEffect } from 'react'; 
//usesate guarda valores e useeffect roda as coisas automatico como a mudanca de um dado sem recarregar a pagina
import estilos from './DisciplinasProfessor.module.css'; //estilização da pagina
import { BarraPg } from '../Componentes/BarraPg'; //cabeçalho da pagina
import { Footer } from '../Componentes/Footer'; //footer da pagina

export function ReservaProfessor() {
  //guarda as reservas
  const [reservas, setReservas] = useState([]);
  //guarda as salas
  const [salas, setSalas] = useState({});
  //guarda as disciplinas
  const [disciplinas, setDisciplinas] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    //busca as salas
    axios.get('http://127.0.0.1:8000/api/sala/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const salasNome = {};
      //cada sala vira um objeto com id
      res.data.forEach(sala => {
        salasNome[sala.id] = sala.nome;
      });
      setSalas(salasNome);
    })
    .catch(err => console.error('Erro ao buscar salas', err));

    // busca as disciplinas
    axios.get('http://127.0.0.1:8000/api/disciplina/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const disciplinasMap = {};
      //cada disciplina vira um objeto com id
      res.data.forEach(disc => {
        disciplinasMap[disc.id] = disc.nome;
      });
      setDisciplinas(disciplinasMap);
    })
    .catch(err => console.error('Erro ao buscar disciplinas', err));

    // busca as reservas do professor que está autenticado
    axios.get('http://127.0.0.1:8000/api/professor/reservas/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setReservas(res.data);
    })
    //caso ocorra algum erro
    .catch(err => console.error('Erro ao buscar reservas', err));
  }, []);
//retorna para a tela do usuario
  return (
    <>
      <BarraPg />
      <div className={estilos.containerCard}>
        <h2 className={estilos.tituloCard}>Minhas Reservas</h2>
        <div className={estilos.listaCard}>
          {reservas.map(reserva => (
            <div key={reserva.id} className={estilos.card}>
              <h3 className={estilos.nome}>Sala: {reserva.sala_reservada_detail?.nome}</h3>
              <p><strong>Disciplina: </strong>{disciplinas[reserva.disciplina]}</p>
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
