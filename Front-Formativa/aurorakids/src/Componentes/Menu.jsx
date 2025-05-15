import estilos from './Menu.module.css';
import ambienteimg from '../assets/ambiente.png';
import disciplinaimg from '../assets/disciplina.png';
import gestoresimg from '../assets/gestores.png';
import professoresimg from '../assets/professores.png';




export function Menu(){
    return(
        <div className={estilos.container}>
            <table className={estilos.menutable}>
                <tbody>
                    <tr> {/*linhas*/}
                        <td className={estilos.menutd}> {/*celular/colunas dentro das linhas*/}
                            <img src={disciplinaimg} alt="É um ícone que representa as disciplinas" />
                            <label alt='Disciplinas do professor'>Disciplinas</label> {/*cuidado onde coloca o alt, ele deve ser colocado no loal correto*/}
                        </td>
                        <td className={estilos.menutd}>
                            <img src={ambienteimg} alt="É um ícone que representa o ambiente" />
                            <label>Ambientes</label>
                        </td>
                    </tr>
                    <tr>
                        <td className={estilos.menutd}>
                            <img src={professoresimg} alt="É um ícone que representa os professores" />
                            <label>Professores</label>
                        
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