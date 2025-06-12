import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estilos from './DisciplinaEditar.module.css';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';

const schemaReserva = z.object({
  data_inicio: z.string().min(10, 'Data inválida'),
  data_termino: z.string().min(10, 'Data inválida'),
  periodo: z.enum(['M', 'T', 'Noite'], { errorMap: () => ({ message: 'Selecione um período' }) }),
  sala_reservada: z.string().min(1, 'Selecione uma sala'),
  professor: z.string().min(1, 'Selecione um professor'),
  disciplina: z.string().min(1, 'Selecione uma disciplina'),
});

export function ReservasEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaReserva),
  });

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    async function carregarReserva() {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/reservas/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        reset({
          ...data,
          professor: data.professor.toString(),
          sala_reservada: data.sala_reservada.toString(),
          disciplina: data.disciplina.toString(),
        });
      } catch (err) {
        alert('Erro ao carregar reserva.');
        console.error(err);
      }
    }

    carregarReserva();
  }, [id, reset, token]);

  const onSubmit = async (dados) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/reservas/${id}/`, dados, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Reserva editada com sucesso!');
      navigate('/reservas');
    } catch (err) {
      console.error(err);
      alert('Erro ao editar reserva.');
    }
  };

  // Carregando professores, salas e disciplinas para selects
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [resProfs, resSalas, resDisc] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/usuario/', { headers }),
          axios.get('http://127.0.0.1:8000/api/sala/', { headers }),
          axios.get('http://127.0.0.1:8000/api/disciplina/', { headers }),
        ]);
        setProfessores(resProfs.data.filter((u) => u.tipo === 'P'));
        setSalas(resSalas.data);
        setDisciplinas(resDisc.data);
      } catch (err) {
        console.error(err);
      }
    }

    carregarDados();
  }, [token]);

  return (
    <>
      <BarraPg />
      <div className={estilos.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={estilos.form}>
          <h2 className={estilos.titulo}>Editar Reserva</h2>

          <label>Data de Início</label>
          <input type="date" {...register('data_inicio')} />
          {errors.data_inicio && <span>{errors.data_inicio.message}</span>}

          <label>Data de Término</label>
          <input type="date" {...register('data_termino')} />
          {errors.data_termino && <span>{errors.data_termino.message}</span>}

          <label>Período</label>
          <select {...register('periodo')}>
            <option value="">Selecione</option>
            <option value="M">Manhã</option>
            <option value="T">Tarde</option>
            <option value="Noite">Noite</option>
          </select>
          {errors.periodo && <span>{errors.periodo.message}</span>}

          <label>Sala</label>
          <select {...register('sala_reservada')}>
            <option value="">Selecione uma sala</option>
            {salas.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome}
              </option>
            ))}
          </select>
          {errors.sala_reservada && <span>{errors.sala_reservada.message}</span>}

          <label>Professor</label>
          <select {...register('professor')}>
            <option value="">Selecione um professor</option>
            {professores.map((p) => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>
          {errors.professor && <span>{errors.professor.message}</span>}

          <label>Disciplina</label>
          <select {...register('disciplina')}>
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
          {errors.disciplina && <span>{errors.disciplina.message}</span>}

          <button type="submit" className={estilos.submitButton}>Salvar Alterações</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
