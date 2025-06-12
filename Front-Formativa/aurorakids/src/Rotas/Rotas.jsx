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
import { ProfessoresEditar } from '../Paginas/ProfessoresEditar';
import { AgendarVisita } from '../Paginas/AgendarVisita';
import { GerenciarGestores } from '../Paginas/GerenciarGestores';
import { GestorEditar } from '../Paginas/GestoresEditar';
import { GestoresCadastrar } from '../Paginas/GestoresCadastrar';
import { ReservasGestor } from '../Paginas/ReservasGestor';
import { SalasGestores } from '../Paginas/SalasGestores';
import { SalasEditar } from '../Paginas/SalasEditar';
import { SalasCadastrar } from '../Paginas/SalasCadastrar';
export function Rotas(){
    return(
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='inicial' element={<Inicial/>}/>

                <Route path='/inicial/profdisciplina' element={<DisciplinasProfessor/>}/>

                <Route path='/inicial/disciplina' element={<DisciplinasGestor/>}/>
                <Route path='adicionardisciplina' element={<DisciplinaCadastrar/>}/>
                <Route path="/editardisciplina/:id" element={<DisciplinaEditar/>}/>

                <Route path='professores' element={<ProfessoresGestor/>}/>
                <Route path='professorescadastro' element={<ProfessoresCadastrar/>}/>
                <Route path="/editarprofessor/:id" element={<ProfessoresEditar/>}/>

                <Route path='faleconosco' element={<FaleConosco/>}/>
                <Route path='agendarvisita' element={<AgendarVisita/>}/>

                <Route path='gestores' element={<GerenciarGestores/>}/>
                <Route path="/editargestores/:id" element={<GestorEditar/>}/>
                <Route path='cadastrargestores' element={<GestoresCadastrar/>}/>

                <Route path='salas' element={<SalasGestores/>}/>
                <Route path="/editarsalas/:id" element={<SalasEditar/>}/>
                <Route path='criarsalas' element={<SalasCadastrar/>}/>

                <Route path='reservasgestor' element={<ReservasGestor/>}/>
            </Routes>    
    )
    
}