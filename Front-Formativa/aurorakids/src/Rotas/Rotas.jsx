import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../Paginas/Inicial';
import { Menu } from '../Componentes/Menu';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor'
import { DisciplinasGestor } from '../Paginas/DisciplinasGestor'

export function Rotas(){
    return(
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/inicial' element={<Inicial/>}/>
                <Route path='/inicial/profdisciplina' element={<DisciplinasProfessor/>}/>
                <Route path='/inicial/disciplina' element={<DisciplinasGestor/>}/>

            </Routes>    
    )
    
}