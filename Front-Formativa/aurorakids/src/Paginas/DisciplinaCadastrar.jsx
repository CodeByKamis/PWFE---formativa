import { useForm } from 'react-hook-form'; //criar formulario
import estilos from './DisciplinaCadastrar.module.css'; //estiliação css
import { z } from 'zod'; //valida tudo o que a gente digita
import { zodResolver } from '@hookform/resolvers/zod'; //conecta o zod e o react-hook-form
import axios from 'axios';//faz requisição na api
import { useState, useEffect }from 'react';
//usesate guarda valores e useeffect roda as coisas automatico como a mudanca de um dado sem recarregar a pagina
import { BarraPg } from '../Componentes/BarraPg'; //cabecalho da pagina
import { Footer } from '../Componentes/Footer'; //footer da pagina
import { useNavigate } from 'react-router-dom'; //para navegar entre outras paginas

//configurando a permissão minima e máxima de entrada de dados
const schemaDisciplinas = z.object({
    nome: z.string()
        .min(1, 'Informe o nome da disciplina')
        .max(255, 'Informe no máximo 255 caracteres'),

    curso: z.string()
        .min(1, 'Informe o nome do curso')
        .max(255, 'Informe no máximo 255 caracteres'),

    carga_horaria: z.number(
        {invalid_type_error: 'Informe uma carga horária'})
            .int("Digite um valor inteiro")
            .min(1, 'Informe o valor da carga horária')
            .max(260, 'A carga horária é de até 260 horas'),

    descricao: z.string()
        .min(1, 'Informe uma descricao')
        .max(255, 'Informe uma descricao'),
    
    professor: z.number(
        {invalid_type_error: 'Adicione um professor'})
            .min(1, 'Selecioone um professor')
    
});
//iniciando a função
export function DisciplinaCadastrar(){
    const navigate = useNavigate();

    const [professores, setProfessores] = useState([]);

    const{
        register,
        handleSubmit,
        formState:{ errors},
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplinas)
    });
// pegar autorização de acesso
    useEffect(()=>{
        async function buscarProfessores() {
            try{
                const token = localStorage.getItem('access_token');
                const response= await axios.get('http://127.0.0.1:8000/api/usuario/',{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
            //caso dê erro
            }catch(error){
                console.error("erro ao carregar professores", error);
            }
        }
        buscarProfessores(); //chamando a função
    },[]);
    //puxando os dados através do token de acesso e da url que está no backend
    async function obterDadosFormulario(data) {
        console.log("dados do formulario", data);

        try{
            const token = localStorage.getItem('access_token');
            const response  = await axios.post(
                'http://127.0.0.1:8000/api/disciplina/', 
                data,
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            //caso dê certo
            console.log('Disciplina cadastrada com sucesso', response.data);
            alert("Disciplina cadastrada com sucesso!");
            navigate('/inicial/disciplina');
        //caso dê errado
        }catch(error){
            console.error('Erro ao cadastrar disciplina', error);
            alert("Erro ao cadastrar disciplina");
        } 
    }
    //o que é retornado na tela do usuário
    return (
        <>
            {/* esse é o cabecalho */}
            <BarraPg/>
                <div className={estilos.conteiner}>
                {/* formulario de cadastro das disciplinas */}
                    <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                            <h2 className={estilos.titulo}>Cadastro de Disciplina</h2>
                            <label className ={estilos.nomeCampo}>Nome da Disciplina</label>
                            <input                        
                                className={estilos.inputField}
                                {...register('nome')} //é onde vai ficar registrado
                                placeholder="Materia" //é aquilo que fica mostrando para o usuario ver como que faz
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
                            placeholder="Descreva o curso com até 255 caracteres"
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
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            <Footer/>
        </>
    );
}