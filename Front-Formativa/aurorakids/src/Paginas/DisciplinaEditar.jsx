import { useForm } from 'react-hook-form'; //criar formulario
import { z } from 'zod'; //valida tudo o que a gente digita
import { zodResolver } from '@hookform/resolvers/zod'; //conecta o zod e o react-hook-form
import axios from 'axios'; //faz requisição na api
import estilos from './DisciplinaEditar.module.css'; //estilização css
import { useState, useEffect } from 'react'; 
//usesate guarda valores e useeffect roda as coisas automatico como a mudanca de um dado sem recarregar a pagina
import { useParams, useNavigate } from 'react-router-dom'; //useparams pega dados da url e o outro leva o usuario para outra pagina
import { BarraPg } from '../Componentes/BarraPg'; //cabecalho da pagina
import { Footer } from '../Componentes/Footer'; //footer da pagina

//configurando a permissão minima e máxima de entrada de dados
const schemaDisciplina = z.object({
    nome: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 255 caracteres'),

    curso: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 255 caracteres'),

    carga_horaria: z.number({
        invalid_type_error: 'Informe a cargahorária'})
        .int("Deve ser um número inteiro")
        .min(1, "A carga horária mínima é 1 hora")
        .max(260, "A carga horária máxima é 260 horas"),

    descricao: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(300, 'Informe até 300 caracteres'),

    professor: z.number({
        invalid_type_error: 'Selecione um professor'
            }).min(1, 'Selecione um professor')
});
//iniciando a função
export function DisciplinaEditar() {
 
    const [professores, setProfessores] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplina)
    });

 // pegar autorização de acesso
    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
                //Preenche o formulários com os dados do registro do ID
                 const resDisciplina = await axios.get(`http://127.0.0.1:8000/api/disciplina/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
 
                // Preenche o formulário
                reset(resDisciplina.data);
            //caso dê erro
            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }
        }
        buscarProfessores(); //chamando a função
    }, []);
    //puxando os dados através do token de acesso e da url que está no backend
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.put(
                //é puxado os dados daquela disciplina em especifico para preenchimento automatico na tela de edicao
                `http://127.0.0.1:8000/api/disciplina/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            //caso dê certo
            console.log('Disciplina editada com sucesso!', response.data);
            alert('Disciplina editada com sucesso!');
            navigate('/inicial/disciplina');
        //caso dê errado
        } catch (error) {
            console.error('Erro ao editar disciplina', error);
            alert("Erro ao editar disciplina");
        }
    }
 
    return (
        <>
            {/* esse é o cabecalho */}
            <BarraPg/>

            <div className={estilos.conteiner}>                 
                {/* formulário para editar as disciplinas */}
                <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                        <h2 className={estilos.titulo}>Editar a Disciplina</h2>
                        <label className ={estilos.nomeCampo} >Nome da Disciplina</label>
                        <input                        
                            className={estilos.inputField}
                            {...register('nome')}
                            placeholder="Materia"
                        />
                        {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
                
    
                        <label className ={estilos.nomeCampo}>Nome do curso</label>
                        <input
                            className={estilos.inputField}
                            {...register('curso')}
                            placeholder="Nome do curso"
                        />
                        {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
                
    
                        <label className ={estilos.nomeCampo}>Carga horária</label>
                        <input
                        type="number"
    
                            className={estilos.inputField}
                            {...register('carga_horaria', { valueAsNumber: true })}
                            placeholder="75"
                        />
                        {errors.carga_horaria &&
                        <p className={estilos.error}>
                            {errors.carga_horaria.message}
                        </p>}
                
    
                    <label className ={estilos.nomeCampo}>Descrição</label>
                    <textarea
                        className={estilos.inputField}
                        {...register('descricao')}
                        placeholder="Descreva o curso com até 2000 caracteres"
                        rows={5}
                        />
                        {errors.descricao && <p className={estilos.error}>{errors.descricao.message}</p>}
                
                        <label className ={estilos.nomeCampo}>Professor</label>
                        <select className={estilos.inputField}
                            {...register('professor', { valueAsNumber: true })}>
                            <option  value="">Selecione um professor</option>
                            {professores.map((prof) => (
                                <option className={estilos.inputField} key={prof.id} value={prof.id}>
                                    {prof.first_name} {prof.last_name}
                                </option>
                            ))}
                        </select>
                        {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
                
    
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