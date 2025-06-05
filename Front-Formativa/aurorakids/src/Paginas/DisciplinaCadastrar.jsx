import { useForm } from 'react-hook-form';
import { z } from 'zod'; //valida tudo o que a gente digita
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect }from 'react';
import { object } from 'zod/v4';
import { schema } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';

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
            .max(3, 'A carga horária é de até 999h'),

    descricao: z.string()
        .min(1, 'Informe uma descricao')
        .max(255, 'Informe uma descricao'),
    
    professor: z.number(
        {invalid_type_error: 'Adicione um professor'})
            .min(1, 'Selecioone um professor')
    
});

export function DisciplinaCadastrar(){
    const [professores, setProfessores] = useState([]);

    const{
        register,
        handleSubmit,
        formState:{ errors},
    } = useForm({
        resolver: zodResolver(schemaDisciplinas)
    });

    useEffect(()=>{
        async function buscarProfessores() {
            try{
                const token = localStorage.getItem('access_token');
                const response= await axios.get('http://127.0.0.1:8000/api/usuario',{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
                });
                    setProfessores(response.data);
            
            }catch(error){
                console.error("erro", error);
            }
        }
        buscarProfessores();
    },[]);
    
    async function obterDadosFormulario(data) {
        console.log("dados do formulario", data);

        try{
            const token = localStorage.getItem(`access_token`);
            const response  = await axios.post(
                'http://127.0.0.1:8000/api/disciplina/', 
                data,{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Disciplina cadastrada com sucesso!")
            reset();
        }catch(error){
            console.error("erro", error)
            alert("Erro ao cadastrar disciplina")
        }
        
    }





}