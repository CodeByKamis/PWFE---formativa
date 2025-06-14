import estilos from './AgendarVisita.module.css'; //estilização css
import { BarraNavegacao } from '../Componentes/BarraNavegacao'; //cabecalho
import { Footer } from '../Componentes/Footer';// footer da pagina
import { useNavigate } from 'react-router-dom'; //para navegar com outra tela

//tela de formulario ficticio para visitar a escola aurora kids
export function AgendarVisita() {
  const navigate = useNavigate();

  function handleSubmit(event) { event.preventDefault();
    alert('Formulário enviado com sucesso!');
    navigate('/');
  }

  return (
    <>
      <BarraNavegacao />
      <div className={estilos.container}>
        <div>
            <h2 className={estilos.titulo}>AGENDAR VISITA</h2>
            <p className={estilos.subtitulo}>Preencha o formulário para agendar uma visita</p>
        </div>
        
        <form onSubmit={handleSubmit} className={estilos.loginform}>
          <label className={estilos.nomeCampo}>Nome Completo</label>
          <input
            className={estilos.inputField}
            placeholder="Escreva aqui"
            name="nome"/>

          <label className={estilos.nomeCampo}>Número de Telefone</label>
          <input
            type="tel"
            className={estilos.inputField}
            placeholder="(XX) XXXXX-XXXX"
            name="telefone"/>

          <label className={estilos.nomeCampo}>Email</label>
          <input
            type="email"
            className={estilos.inputField}
            placeholder="Escreva aqui"
            name="email"/>

          <label className={estilos.nomeCampo}>Data da Visita</label>
          <input
            type="date"
            className={estilos.inputField}
            name="data"/>

          <div className={estilos.icones}>
              <button className={estilos.submitButton} type="submit">
                Agendar Visita
              </button>
          </div>

          <div className={estilos.obs}>
            <p>obs.: Não é necessário especificar o horário, pode vir o horário que preferir dentro da data espeficada</p>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
}
