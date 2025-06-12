import axios from 'axios';
import React, { useState, useEffect } from 'react';
import estilos from './DisciplinasGestor.module.css';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';

export function ReservaProfessor() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarReservas();
  }, []);

  function buscarReservas() {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token);
    setLoading(true);
    setErro(null);

    axios
      .get('http://127.0.0.1:8000/api/professor/reservas/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('Resposta da API:', response.data);
        setReservas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar reservas:', error.response || error.message || error);
        setErro('Erro ao carregar as reservas.');
        setLoading(false);
      });
  }

  return (
    <>
      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          <h3 className={estilos.title}>Minhas Reservas</h3>

          {loading && <p>Carregando reservas...</p>}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          {!loading && !erro && (
            <div>
              <pre>{JSON.stringify(reservas, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
