import { useForm } from 'react-hook-form';
import estilos from './DisciplinaCadastrar.module.css'; // reutilizando estilos
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';

const schemaReserva = z.object({
  professor: z.number({ invalid_type_error: 'Selecione um professor' }).min(1, 'Selecione um professor'),
  sala_reservada: z.number({ invalid_type_error: 'Selecione uma sala' }).min(1, 'Selecione uma sala'),
  disciplina: z.number({ invalid_type_error: 'Selecione uma disciplina' }).min(1, 'Selecione uma disciplina'),
  periodo: z.enum(['M', 'T', 'Noite'], { errorMap: () => ({ message: 'Selecione um período' }) }),
  data_inicio: z.string().min(1, 'Informe a data de início'),
  data_termino: z.string().min(1, 'Informe a data de término'),
});

export function ReservaCadastrar() {
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaReserva),
  });

  useEffect(() => {
    async function buscarDados() {
      try {
        const token = localStorage.getItem('access_token');
        
        // Buscar professores
        const resProfessores = await axios.get('http://127.0.0.1:8000/api/usuario/', {
          headers: { Authorization: `Bearer ${token}` },
          params: { tipo: 'P' }, // opcional se a API filtra, senão filtrar no front
        });
        setProfessores(resProfessores.data.filter(u => u.tipo === 'P'));

        // Buscar salas
        const resSalas = await axios.get('http://127.0.0.1:8000/api/sala/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSalas(resSalas.data);

        // Buscar disciplinas
        const resDisciplinas = await axios.get('http://127.0.0.1:8000/api/disciplina/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDisciplinas(resDisciplinas.data);

      } catch (error) {
        console.error('Erro ao buscar dados para cadastro', error);
      }
    }
    buscarDados();
  }, []);

  async function enviarFormulario(data) {
    try {
      const token = localStorage.getItem('access_token');

      // Ajustar dados para envio (API espera objeto ids)
      const payload = {
        professor: data.professor,
        sala_reservada: data.sala_reservada,
        disciplina: data.disciplina,
        periodo: data.periodo,
        data_inicio: data.data_inicio,
        data_termino: data.data_termino,
      };

      await axios.post('http://127.0.0.1:8000/api/reservas/', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Reserva cadastrada com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao cadastrar reserva', error);
      if (error.response?.data) {
        alert('Erro: ' + JSON.stringify(error.response.data));
      } else {
        alert('Erro ao cadastrar reserva');
      }
    }
  }

  return (
    <>
      <BarraPg />
      <div className={estilos.conteiner}>
        <form className={estilos.loginForm} onSubmit={handleSubmit(enviarFormulario)}>
          <h2 className={estilos.titulo}>Cadastro de Reserva</h2>

          <label className={estilos.nomeCampo}>Professor</label>
          <select className={estilos.inputField} {...register('professor', { valueAsNumber: true })}>
            <option value="">Selecione um professor</option>
            {professores.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.first_name} {prof.last_name}
              </option>
            ))}
          </select>
          {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}

          <label className={estilos.nomeCampo}>Sala</label>
          <select className={estilos.inputField} {...register('sala_reservada', { valueAsNumber: true })}>
            <option value="">Selecione uma sala</option>
            {salas.map((sala) => (
              <option key={sala.id} value={sala.id}>
                {sala.nome} (Capacidade: {sala.capacidade})
              </option>
            ))}
          </select>
          {errors.sala_reservada && <p className={estilos.error}>{errors.sala_reservada.message}</p>}

          <label className={estilos.nomeCampo}>Disciplina</label>
          <select className={estilos.inputField} {...register('disciplina', { valueAsNumber: true })}>
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((disc) => (
              <option key={disc.id} value={disc.id}>
                {disc.nome}
              </option>
            ))}
          </select>
          {errors.disciplina && <p className={estilos.error}>{errors.disciplina.message}</p>}

          <label className={estilos.nomeCampo}>Período</label>
          <select className={estilos.inputField} {...register('periodo')}>
            <option value="">Selecione um período</option>
            <option value="M">Manhã</option>
            <option value="T">Tarde</option>
            <option value="Noite">Noite</option>
          </select>
          {errors.periodo && <p className={estilos.error}>{errors.periodo.message}</p>}

          <label className={estilos.nomeCampo}>Data Início</label>
          <input type="date" className={estilos.inputField} {...register('data_inicio')} />
          {errors.data_inicio && <p className={estilos.error}>{errors.data_inicio.message}</p>}

          <label className={estilos.nomeCampo}>Data Término</label>
          <input type="date" className={estilos.inputField} {...register('data_termino')} />
          {errors.data_termino && <p className={estilos.error}>{errors.data_termino.message}</p>}

          <div className={estilos.icones}>
            <button className={estilos.submitButton} type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
