import estilos from './FaleConosco.module.css';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { Footer } from '../Componentes/Footer';
import { Link } from 'react-router-dom';
import criancas_sentadas from '../assets/criancas_sentadas.png';
import independentes from '../assets/independentes.png';
import tecnologia from '../assets/tecnologia.png';
import analitico from '../assets/analitico.png';
import aula_criancas from '../assets/aula_criancas.png';
export function FaleConosco(){
    return(
        <>
            <BarraNavegacao/>
            <main className={estilos.container}>
                <section className={estilos.apresentacao}>

                    <div className={estilos.apresentacao_text}>

                        <div className={estilos.titulo}>
                            <h2>FALE CONOSCO</h2>
                        </div>

                        <div className={estilos.texto}>

                            <address className={estilos.contato}>
                                <p className={estilos.contato_titulo}>TELEFONE:</p>
                                <p>(11) 99114-3852</p>
                            </address>

                            <address className={estilos.contato}>
                                <p className={estilos.contato_titulo}>EMAIL:</p>
                                <p>aurorakids@atendimento.com</p>
                            </address>
                            
                            <address className={estilos.contato}>
                                <p className={estilos.contato_titulo}>INSTAGRAM:</p>
                                <p>@aurorakids</p>
                            </address>

                            <address className={estilos.contato}>
                                <p className={estilos.contato_titulo}>ENDEREÇO:</p>
                                <p>Av. Dr. Dante Pazzanese, 295 - Vila Mariana, São Paulo - SP, 04012-180</p>
                            </address>
                        </div>

                    </div>
                    <img className={estilos.apresentacao_imagem} src={criancas_sentadas} alt="Crianças na sal de aula sentadas em suas mesas e sorrindo para a câmera" />
                </section>


                <section className={estilos.visita}>

                    <div className={estilos.visita_div}>
                        <h2>AGENDE UMA VISITA</h2>
                        <p className={estilos.text_visita}>Visite a Aurora Kids mais perto de você!</p>
                        <p className={estilos.text_visita_bold}>Garanta o prazer de aprender.</p>
                        <Link to="/agendarvisita">
                            <button className={estilos.botao}>Agendar Uma Visita</button>
                        </Link>
                    </div>
                    <img className={estilos.aula_img} src={aula_criancas} alt="Sala de aula com crianças tendo aula e de mão levantada" />

                </section>
            </main>
            <Footer/>
        
        </>
    )
}