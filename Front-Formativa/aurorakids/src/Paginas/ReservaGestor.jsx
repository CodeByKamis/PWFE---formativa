import React, { useEffect, useState } from 'react';
//usesate guarda valores e useeffect roda as coisas automatico como a mudanca de um dado sem recarregar a pagina
import axios from 'axios';//faz a requisição na api
import { Link } from 'react-router-dom'; //permite fazer a navegacao entre as paginas via link
import estilos from './DisciplinasGestor.module.css';  //estilização css
import { BarraPg } from '../Componentes/BarraPg'; //cabeçalho da pagina
import { Footer } from '../Componentes/Footer'; //footer da pagina
import more from '../assets/more.svg'; //icone de adicionar (adicionar reserva)
import edit from '../assets/edit.svg'; //icone de editar (editar reserva)
import dell from '../assets/dell.svg'; //icone de deletar (deletar reserva)

export function ReservaGestor() {
  //guarda as reservas
  const [reservas, setReservas] = useState([]);
  //guarda os professores
  const [professores, setProfessores] = useState({});
  const [loading, setLoading] = useState(true);
  //guarda os erros
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // chamar reservas com a sala já aninhada (supondo que a API já retorna)
    const buscarReservas = axios.get('http://127.0.0.1:8000/api/reservas/', {
      headers: { Authorization: `Bearer ${token}` }
    });

    // chamar professores
    const buscarProfessores = axios.get('http://127.0.0.1:8000/api/usuario/', {
      headers: { Authorization: `Bearer ${token}` }
    });

    Promise.all([buscarReservas, buscarProfessores])
      .then(([resReservas, resProfessores]) => {
        setReservas(resReservas.data);
        //filtra os professores P
        const profObj = {};
        resProfessores.data.forEach(user => {
          if (user.tipo === 'P') {
            profObj[user.id] = `${user.first_name} ${user.last_name}`;
          }
        });
        //Salva os professores no estado
        setProfessores(profObj);
        //serve para limpar os possiveis erros que podem vir anteriormente
        setErro(null);
      })
      //se der erro exibe as mensagens de erro
      .catch(err => {
        console.error("Erro ao carregar dados:", err);
        setErro("Erro ao carregar as reservas.");
      })
      .finally(() => setLoading(false));
  }, []);
//função para excluir reserva
  function excluirReserva(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    if (!confirmar) return;
  
    const token = localStorage.getItem('access_token');
  
    axios.delete(`http://127.0.0.1:8000/api/reservas/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => {
        //remove a reserva automaticamente
        setReservas(prev => prev.filter(res => res.id !== id));
        alert("Reserva excluída com sucesso!");
      })
      //se der erro manda essa mensagem de erro
      .catch(error => {
        console.error("Erro ao excluir reserva", error);
        alert("Erro ao excluir reserva.");
      });
  }
//retornando para a tela do usuario
  return (
    
    <>

      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          <h3 className={estilos.title}>Reservas de Sala</h3>

          <div className={estilos.topoAcoes}>
            <Link to="/cadastrarreserva" className={estilos.botaoAdicionar}>
              <img className={estilos.iconeAdd} src={more} alt="Adicionar reserva" />
            </Link>
          </div>

          {loading && <p>Carregando reservas...</p>}
          {erro && <p className={estilos.error}>{erro}</p>}

          {!loading && !erro && reservas.length === 0 && (
            <p>Nenhuma reserva encontrada.</p>
          )}

          {!loading && !erro && reservas.length > 0 && (
            <table className={estilos.tabeladados}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Professor</th>
                  <th>Sala</th>
                  <th>Período</th>
                  <th>Início</th>
                  <th>Término</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(reserva => (
                  <tr key={reserva.id}>
                    <td>{reserva.id}</td>
                    <td>{professores[reserva.professor]}</td>
                    <td>{reserva.sala_reservada_detail?.nome}</td>
                    <td>{reserva.periodo}</td>
                    <td>{reserva.data_inicio}</td>
                    <td>{reserva.data_termino}</td>
                    <td>
                      <Link to={`/editarreserva/${reserva.id}`}
                        className={estilos.botaoAdicionar}
                        title="Editar reserva">
                        <img className={estilos.icone} src={edit} alt="Editar" />
                      </Link>
                      <button className={estilos.botaoExcluir} onClick={() => excluirReserva(reserva.id)} title="Excluir">
                        <img className={estilos.icone} src={dell} alt="Excluir disciplina" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
