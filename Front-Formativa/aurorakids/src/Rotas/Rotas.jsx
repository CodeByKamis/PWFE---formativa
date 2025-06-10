import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../Paginas/Inicial';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';
import { DisciplinasGestor } from '../Paginas/DisciplinasGestor';
import { DisciplinaCadastrar } from '../Paginas/DisciplinaCadastrar';
import { DisciplinaEditar } from '../Paginas/DisciplinaEditar';
import { ProfessoresGestor } from '../Paginas/ProfessoresGestor';
import { ProfessoresCadastrar } from '../Paginas/ProfessoresCadastrar';
import { Home } from '../Paginas/Home';
import { FaleConosco } from '../Paginas/FaleConosco';
export function Rotas(){
    return(
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='/inicial' element={<Inicial/>}/>
                <Route path='/inicial/profdisciplina' element={<DisciplinasProfessor/>}/>
                <Route path='/inicial/disciplina' element={<DisciplinasGestor/>}/>
                <Route path='adicionardisciplina' element={<DisciplinaCadastrar/>}/>
                <Route path='editardisciplina' element={<DisciplinaEditar/>}/>
                <Route path='professores' element={<ProfessoresGestor/>}/>
                <Route path='professorescadastro' element={<ProfessoresCadastrar/>}/>
                <Route path='faleconosco' element={<FaleConosco/>}/>
            </Routes>    
    )
    
}