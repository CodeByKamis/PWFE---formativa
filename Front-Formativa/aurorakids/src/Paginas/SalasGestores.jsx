import axios from 'axios'; //faz requisição na api
import React, { useState, useEffect } from 'react';
//usesate guarda valores e useeffect roda as coisas automatico como a mudanca de um dado sem recarregar a pagina
import estilos from './SalasGestores.module.css'; // reutilizando o css
import { BarraPg } from '../Componentes/BarraPg'; //chamando componente cabecalho
import { Footer } from '../Componentes/Footer'; //chamando componente footer
import { Link } from 'react-router-dom'; //para conseguir utilizar link para navegacao
import more from '../assets/more.svg'; //icone de adicionar (adicionar sala)
import edit from '../assets/edit.svg'; //icone de editar (editar sala)
import dell from '../assets/dell.svg'; //icone de excluir (excluir sala)

export function SalasGestores() {
  //guarda as salas
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    //chama as salas
    axios.get('http://127.0.0.1:8000/api/sala/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setSalas(response.data);
    })
    //se der errado
    .catch(error => {
      console.error("Erro ao buscar salas", error);
      alert("Erro ao carregar salas. Verifique se você tem permissão.");
    });
  }, []);
//funcao para excluir a sala
  function excluirSala(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta sala?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');
    //pega a sala na api pelo id
    axios.delete(`http://127.0.0.1:8000/api/sala/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    //se der certo
    .then(() => {
      setSalas(prev => prev.filter(s => s.id !== id));
      alert("Sala excluída com sucesso!");
    })
    //se der errado
    .catch(error => {
      console.error("Erro ao excluir sala", error);
      alert("Erro ao excluir sala.");
    });
  }
//retornando na tela para o usuario ver
  return (
    <>
      <BarraPg />
      <main className={estilos.containerM}>
        <div className={estilos.container}>
          <h3 className={estilos.title}>SALAS</h3>
          <div className={estilos.topoAcoes}>
            <Link to="/criarsalas" className={estilos.botaoAdicionar}>
              <img className={estilos.iconeAdd} src={more} alt='Adicionar sala' />
            </Link>
          </div>
          <div className={estilos.tabelaWrapper}>
            <table className={estilos.tabeladados}>
              <thead>
                <tr className={estilos.cabecalho}>
                  <th>Nome</th>
                  <th>Capacidade</th>
                  <th className={estilos.acao_cabecalho}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {salas.map(sala => (
                  <tr key={sala.id}>
                    <td>{sala.nome}</td>
                    <td>{sala.capacidade}</td>
                    <td>
                      <Link to={`/editarsalas/${sala.id}`} className={estilos.botaoAdicionar}>
                        <img className={estilos.icone} src={edit} alt="Editar sala" />
                      </Link>
                      <button className={estilos.botaoExcluir} onClick={() => excluirSala(sala.id)} title="Excluir">
                        <img className={estilos.icone} src={dell} alt="Excluir sala" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
