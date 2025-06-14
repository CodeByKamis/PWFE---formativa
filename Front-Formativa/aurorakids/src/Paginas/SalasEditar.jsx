import { useForm } from 'react-hook-form'; //faz formulario
import { z } from 'zod'; //valida tudo o que a gente digita
import { zodResolver } from '@hookform/resolvers/zod'; //junta o zod e o react-hook-form
import axios from 'axios'; //faz requisição na api
import estilos from './DisciplinaEditar.module.css'; //estilização css
import { useEffect } from 'react'; //useeffect roda as coisas automatico como a mudanca de um dado sem recarregar a pagina
import { useParams, useNavigate } from 'react-router-dom';//pega o que vem da url e serve para navegar o usuario para outra tela
import { BarraPg } from '../Componentes/BarraPg'; //cabecalho da pagina
import { Footer } from '../Componentes/Footer'; //footer da pagina
//configurando o tipo e a permissão minima e máxima de entrada de dados
const schemaSala = z.object({
  nome: z.string()
    .min(1, 'Informe ao menos um caractere')
    .max(100, 'Informe até 100 caracteres'),

  capacidade: z.number({
      invalid_type_error: 'Informe a capacidade corretamente'
    })
    .int('Deve ser um número inteiro')
    .min(1, 'Capacidade mínima é 1')
    .max(500, 'Capacidade máxima é 500'),

  descricao: z.string()
    .max(300, 'Informe até 300 caracteres')
    .optional()
});
//iniciando funcao
export function SalasEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schemaSala)
  });
//carregar as informacoes da sala quando abrir a tela
  useEffect(() => {
    async function carregarSala() {
      try {
        const token = localStorage.getItem('access_token');
        //as informacoes vao vir da url que está na api via id da sala em questao
        const response = await axios.get(`http://127.0.0.1:8000/api/sala/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        reset(response.data);
      } catch (error) {
        //caso dê erro
        console.error("Erro ao carregar sala", error);
        alert("Erro ao carregar dados da sala.");
      }
    }
    //cahamdno funcao
    carregarSala();
  }, [id, reset]);
//funcao para enviar as edicoes feitas
  async function enviarDadosFormulario(data) {
    try {
      //faz put na api para salvar a edicao
      const token = localStorage.getItem('access_token');
      await axios.put(`http://127.0.0.1:8000/api/sala/${id}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      //se der certo
      alert('Sala editada com sucesso!');
      navigate('/salas');
    } catch (error) {
      //caso dê erro
      console.error('Erro ao editar sala', error);
      alert('Erro ao editar sala');
    }
  }
//é o que é exibido na tela do usuario
  return (
    <>
      <BarraPg/>

      <div className={estilos.conteiner}>
        <form className={estilos.loginForm} onSubmit={handleSubmit(enviarDadosFormulario)}>
          <h2 className={estilos.titulo}>Editar Sala</h2>

          <label className={estilos.nomeCampo}>Nome da Sala</label>
          <input
            className={estilos.inputField}
            {...register('nome')}
            placeholder="Nome da sala"/>
          {errors.nome && 
          <p className={estilos.error}>
            {errors.nome.message}
          </p>}

          <label className={estilos.nomeCampo}>Capacidade</label>
          <input
            type="number"
            className={estilos.inputField}
            {...register('capacidade', { valueAsNumber: true })}
            placeholder="Capacidade"/>
          {errors.capacidade && 
          <p className={estilos.error}>
            {errors.capacidade.message}
          </p>}

          <div className={estilos.icones}>
            <button className={estilos.submitButton} type="submit">
              Editar
            </button>
          </div>
        </form>
      </div>
      <Footer/>
      
    </>
  );
}
