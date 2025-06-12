import estilos from './AgendarVisita.module.css';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { Footer } from '../Componentes/Footer';

export function AgendarVisita() {
  // Função chamada ao enviar o formulário
  function handleSubmit(event) {
    event.preventDefault(); // impede o comportamento padrão de enviar o form e recarregar a página
    alert('Formulário enviado com sucesso!');
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
            name="nome"
          />

          <label className={estilos.nomeCampo}>Número de Telefone</label>
          <input
            type="tel"
            className={estilos.inputField}
            placeholder="(XX) XXXXX-XXXX"
            name="telefone"
          />

          <label className={estilos.nomeCampo}>Email</label>
          <input
            type="email"
            className={estilos.inputField}
            placeholder="Escreva aqui"
            name="email"
          />

          <label className={estilos.nomeCampo}>Data de Visita</label>
          <input
            type="date"
            className={estilos.inputField}
            name="data"
          />

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

      <Footer />
    </>
  );
}
