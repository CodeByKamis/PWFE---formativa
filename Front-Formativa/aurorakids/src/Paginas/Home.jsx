import estilos from './Home.module.css'; //estilização css
import { BarraNavegacao } from '../Componentes/BarraNavegacao'; //cabeçalho da pagina
import { Footer } from '../Componentes/Footer'; //footer da pagina
import { Link } from 'react-router-dom'; //para conseguir utilizar link para navegação
import criancas_corredor from '../assets/criancas_corredor.png'; //imagem
import independentes from '../assets/independentes.png'; //imagem
import tecnologia from '../assets/tecnologia.png'; //imagem
import analitico from '../assets/analitico.png'; //imagem
import crianca_espaco from '../assets/crianca_espaco.png'; //imagem
import aula_criancas from '../assets/aula_criancas.png'; //imagem
export function Home(){
    //retornado na tela do usuario
    return(
        <>
        {/* esse cabecalho é exclusivo de usuario do tipo visitante (nem P e nem G) */}
            <BarraNavegacao/>
            <main className={estilos.container}>
                <section className={estilos.apresentacao}>

                    <div className={estilos.apresentacao_text}>

                        <div className={estilos.titulo}>
                            <h2>AURORA KIDS É</h2>
                            <h2>EDUCAÇÃO DE EXCELÊNCIA</h2>
                        </div>

                        <div className={estilos.texto}>
                            <p className={estilos.primeiro_texto}>Na Educação Infantil do Aurora Kids Etapa, buscamos despertar o interesse dos alunos 
                            pelo universo lúdico da aprendizagem, criando uma base sólida para o sucesso nos ciclos seguintes.</p>
                            <p>Por meio da metodologia de ensino em espiral crescente, comprovada por 
                            estudos neurocientíficos, proporcionamos uma experiência educativa completa, que abrange a alfabetização e o desenvolvimento integral das crianças, garantindo um começo de trajetória escolar cheio de conquistas.</p>
                        </div>

                    </div>
                    <img className={estilos.apresentacao_imagem} src={criancas_corredor} alt="Crianças com roupa de ballet, judô e uniformizados andando no corredor e sorrindo" />
                </section>

                <section className={estilos.diferencial}>
                    <h2 className={estilos.titulo_diferencial}>ALUNOS AURORA KIDS</h2>

                    <div className={estilos.imagens_diferencial}>
                        <img className={estilos.img_diferenciais} src={independentes} alt="Ajudamos os alunos a desenvolverem auto-confiança" />
                        <img className={estilos.img_diferenciais} src={tecnologia} alt="Ensinamos programação de forma lúdica a fim de contribuir com o desenvolvimento do pensamento lógico do aluno" />
                        <img className={estilos.img_diferenciais} src={analitico} alt="incentivamos os alunos a desenvolverem o pensamento crítico" />
                    </div>
                </section>

                <section className={estilos.diretrizes}>

                        <div className={estilos.titulo_img}>
                            <h2 className={estilos.titulo_diretrizes}>NOSSAS DIRETRIZES</h2>
                            <img className={estilos.img_espaco} src={crianca_espaco} alt="Menino sorrindo, usando capacete de astronauta feito de papelão e com um foguete de papel atrás dele" />
                        </div>
                    
                        <div className={estilos.texto_diretrizes}>
                            <p>A missão da Aurora Kids é oferecer uma educação infantil 
                                acolhedora e inovadora, centrada na criança, com ambientes seguros e estimulantes que despertam a curiosidade, incentivam a autonomia e cultivam, desde cedo, o prazer em aprender e explorar o mundo.</p>
                            
                        </div>

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