import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../Paginas/Inicial';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';
import { DisciplinasGestor } from '../Paginas/DisciplinasGestor';
import { DisciplinaCadastrar } from '../Paginas/DisciplinaCadastrar';

export function Rotas(){
    return(
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/inicial' element={<Inicial/>}/>
                <Route path='/inicial/profdisciplina' element={<DisciplinasProfessor/>}/>
                <Route path='/inicial/disciplina' element={<DisciplinasGestor/>}/>
                <Route path='/inicial/adicionardisciplina' element={<DisciplinaCadastrar/>}/>

            </Routes>    
    )
    
}