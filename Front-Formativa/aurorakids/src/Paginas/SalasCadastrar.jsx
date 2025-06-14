import { useForm } from 'react-hook-form'; //cria formulario
import { z } from 'zod'; //valida tudo o que é diigitado
import { zodResolver } from '@hookform/resolvers/zod'; //junta o zod e react-hook-form
import axios from 'axios'; //faz requisição na api
import estilos from './DisciplinaCadastrar.module.css'; //estilização css
import { useNavigate } from 'react-router-dom'; //navegação entre paginas
import { BarraPg } from '../Componentes/BarraPg'; //cabeçalho da pagina
import { Footer } from '../Componentes/Footer'; //footer da pagina
//configurando a permissão minima e máxima de entrada de dados
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
//iniciando uma funcao
export function SalasCadastrar() {
  //permite fazer navegacao entre telas
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schemaSala)
  });
//funcao para permitir cadastro
  async function enviarDadosFormulario(data) {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:8000/api/sala/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      //caso de certo
      alert('Sala cadastrada com sucesso!');
      navigate('/salas');
      //caso de errado
    } catch (error) {
      console.error('Erro ao cadastrar sala', error);
      alert('Erro ao cadastrar sala');
    }
  }
//retorna para a tela do usuario
  return (
    <>

      <BarraPg/>

      <div className={estilos.conteiner}>
        <form className={estilos.loginForm} onSubmit={handleSubmit(enviarDadosFormulario)}>
          <h2 className={estilos.titulo}>Cadastrar Sala</h2>

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
              Cadastrar
            </button>
          </div>
        </form>
      </div>

      <Footer/>

    </>
  );
}
