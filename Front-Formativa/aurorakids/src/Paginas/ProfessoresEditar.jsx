import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './DisciplinaEditar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BarraPg } from '../Componentes/BarraPg';
import { Footer } from '../Componentes/Footer';

const schemaProfessorEditar = z.object({
  first_name: z.string().min(1, 'Informe o primeiro nome').max(255),
  last_name: z.string().min(1, 'Informe o sobrenome').max(255),
  username: z.string().min(3, 'Informe o username').max(150),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres').optional(),
  ni: z.number({ invalid_type_error: 'NI deve ser um número' }).int('NI deve ser inteiro').positive('NI deve ser positivo'),
  telefone: z.string().max(20, 'Máximo 20 caracteres').optional(),
  data_nascimento: z.string().min(10, 'Informe a data de nascimento no formato YYYY-MM-DD'),
  data_contratacao: z.string().min(10, 'Informe a data de contratação no formato YYYY-MM-DD'),
});

export function ProfessoresEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schemaProfessorEditar)
  });

  useEffect(() => {
    async function buscarProfessor() {
      try {
        const token = localStorage.getItem('access_token');

        const resProfessores = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        reset(resProfessores.data);
      } catch (error) {
        console.error("Erro ao carregar professor(a)", error);
      }
    }

    if (id) {
      buscarProfessor();
    }
  }, [id, reset]);

  async function obterDadosFormulario(data) {
    try {
      const token = localStorage.getItem('access_token');

      const payload = {
        ...data,
        tipo: 'P',
        telefone: data.telefone || null
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/usuario/${id}/`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      alert('Professor(a) editado(a) com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao editar professor(a)', error);
      alert("Erro ao editar professor(a)");
    }
  }

  return (
    <>
      <BarraPg />
      <div className={estilos.conteiner}>
        <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
            <h2 className={estilos.titulo}>Editar Professor</h2>

            {/* Os campos continuam os mesmos, apenas alterando o botão e validações como mostrado acima */}

            <label className={estilos.nomeCampo}>Primeiro Nome</label>
            <input {...register('first_name')} className={estilos.inputField} placeholder="Primeiro nome" />
            {errors.first_name && <p className={estilos.error}>{errors.first_name.message}</p>}

            <label className={estilos.nomeCampo}>Sobrenome</label>
            <input
                className={estilos.inputField}
                {...register('last_name')}
                placeholder="Sobrenome"
            />
            {errors.last_name && <p className={estilos.error}>{errors.last_name.message}</p>}

            <label className={estilos.nomeCampo}>Nome de Usuário</label>
            <input
                className={estilos.inputField}
                {...register('username')}
                placeholder="Username"
            />
            {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

            <label className={estilos.nomeCampo}>Senha</label>
            <input
                type="password"
                className={estilos.inputField}
                {...register('password')}
                placeholder="Senha"
            />
            {errors.password && <p className={estilos.error}>{errors.password.message}</p>}

            <label className={estilos.nomeCampo}>NI</label>
            <input
                type="number"
                className={estilos.inputField}
                {...register('ni', { valueAsNumber: true })}
                placeholder="Número único"
            />
            {errors.ni && <p className={estilos.error}>{errors.ni.message}</p>}

            <label className={estilos.nomeCampo}>Telefone</label>
            <input
                type="tel"
                className={estilos.inputField}
                {...register('telefone')}
                placeholder="(XX) XXXXX-XXXX"
            />
            {errors.telefone && <p className={estilos.error}>{errors.telefone.message}</p>}

            <label className={estilos.nomeCampo}>Data de Nascimento</label>
            <input
                type="date"
                className={estilos.inputField}
                {...register('data_nascimento')}
            />
            {errors.data_nascimento && <p className={estilos.error}>{errors.data_nascimento.message}</p>}

            <label className={estilos.nomeCampo}>Data de Contratação</label>
            <input
                type="date"
                className={estilos.inputField}
                {...register('data_contratacao')}
            />
            {errors.data_contratacao && <p className={estilos.error}>{errors.data_contratacao.message}</p>}

            <div className={estilos.icones}>
                <button className={estilos.submitButton} type="submit">
                Editar Professor
                </button>
            </div>
        </form>
      </div>
      <Footer />
    </>
  );
}