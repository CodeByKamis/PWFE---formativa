import estilos from './Menu.module.css';
import ambienteimg from '../assets/ambiente.png';
import disciplinaimg from '../assets/disciplina.png';
import gestoresimg from '../assets/gestores.png';
import professoresimg from '../assets/professores.png';
import { Link } from 'react-router-dom';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';



export function Menu(){
    const tipo = localStorage.getItem('tipo');
    const linkDiscplina = tipo === 'P'? 'profdisciplina' : 'disciplina'; //esses '' tem que ser igual o das rotas

    return(
        <div className={estilos.container}>
            <table className={estilos.menutable}>
                <tbody>
                    <tr> {/*linhas*/}
                        <td className={estilos.menutd}> {/*celular/colunas dentro das linhas*/}
                            <Link to={linkDiscplina}>
                                <img src={disciplinaimg} alt="É um ícone que representa as disciplinas" />
                                <label alt='Disciplinas do professor'>Disciplinas</label> {/*cuidado onde coloca o alt, ele deve ser colocado no loal correto*/}
                            </Link>
                        </td>
                        <td className={estilos.menutd}>
                            <Link to=''>
                                <img src={ambienteimg} alt="É um ícone que representa o ambiente" />
                                <label>Ambientes</label>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className={estilos.menutd}>
                            <Link to='/professores'>
                                <img src={professoresimg} alt="É um ícone que representa os professores" />
                                <label>Professores</label>
                            </Link>
                        
                        </td>
                        <td className={estilos.menutd}>
                            <img src={gestoresimg} alt="É um ícone que representa os gestores" />
                            <label>Gestores</label>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}