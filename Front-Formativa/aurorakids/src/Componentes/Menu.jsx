import estilos from './Menu.module.css';
import ambienteimg from '../assets/ambiente.png';
import disciplinaimg from '../assets/disciplina.png';
import gestoresimg from '../assets/gestores.png';
import professoresimg from '../assets/professores.png';
import salas from '../assets/salas.png'
import { Link } from 'react-router-dom';

export function Menu(){
    const tipo = localStorage.getItem('tipo');
    const linkDiscplina = tipo === 'P'? 'profdisciplina' : 'disciplina';

    const linkReserva = tipo === 'P'? 'profreserva' : '/reservas';

    return(
        <div className={estilos.container}>
            <h2 className={estilos.titulo}>SEJAM BEM-VINDOS AO SISTEMA AURORA KIDS</h2>
            <div className={estilos.menuGrid}>
                <Link to={linkDiscplina} className={estilos.menuItem}>
                    <img src={disciplinaimg} alt="Ícone de disciplinas" />
                    <label>Disciplinas</label>
                </Link>
                <Link to={linkReserva} className={estilos.menuItem}>
                    <img src={ambienteimg} alt="Ícone de Reservas" />
                    <label>Reservas</label>
                </Link>
                <Link to='/salas' className={estilos.menuItem}>
                    <img src={salas} alt="Ícone de salas" />
                    <label>Salas</label>
                </Link>
                <Link to='/professores' className={estilos.menuItem}>
                    <img src={professoresimg} alt="Ícone de professores" />
                    <label>Professores</label>
                </Link>
                <Link to='/gestores' className={estilos.menuItem}>
                    <img src={gestoresimg} alt="Ícone de gestores" />
                    <label>Gestores</label>
                </Link>
            </div>
        </div>
    )
}
