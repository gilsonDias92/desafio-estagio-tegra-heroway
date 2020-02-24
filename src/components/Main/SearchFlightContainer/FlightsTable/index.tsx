import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { IAppState } from "../../../../redux/configureStore";
import Loading from "./Loading";

export default function FlightsTable() {

  // estado que guarda os voos depois do POST
  const flightsState = useSelector((state: IAppState) => {
    return state.flights;
  });
  const flightsList = flightsState.flights;

  // se realizar uma busca vazia = true
  const isEmpty = flightsState.isEmpty;

  // const [orderByMoney, setOrderByMoney] = useState(flightsList);
  // const sortByValue = (value) => {
  //   const sorted  = flightsList.sort((min, max) => {
  //     return max.value - min.value;
  //   });
  //   setOrderByMoney(sorted);
  // }

  // utlizando novamente a lista de aeroportos para mostrar o nome na tela
  const airportsState = useSelector((state: IAppState) => {
    return state.airports;
  });
  const airportsList = airportsState.airports;

  // função para calcular a diferença entre duas datas
  function getDateDifference(date1, date2) {
    return moment.utc(moment(date1).diff(moment(date2))).format("HH:mm") + "h";
  }
  // função para formatar o valor total
  function formatMoney(value: Number) {
    return `R$ ${value.toFixed(2)}`;
  }
  // função que compara a sigla dos aeroportos e retorna o nome na tabela de voos
  function getAirportName(shortName) {
    for (let i = 0; i < airportsList.length; i++) {
      if (shortName === airportsList[i].aeroporto) {
        return airportsList[i].nome;
      }
    }
  }

  return (
    <div className="flights-table-main-container">
      {/* se estiver carregando mostra um símbolo de loading */}
      {flightsState.isFetching ? (
        <Loading />
          
        // !isEmpty garante que retorne dados apenas se realmente houver dados 
      ) : !isEmpty ? (
        <table className="flights-table">
          <caption className="table-title">
            <h2>
              <i className="fas fa-search"></i> Resultados da Busca
            </h2>
          </caption>
          <thead>
            <tr className="table-row-title">
              <td className="table-column-title">
                <i className="fas fa-calendar-alt icon-table-flights"></i>
                Data
              </td>
              <td className="table-column-title">
                <i className="fas fa-plane-departure icon-table-flights"></i>
                Aeroporto de Origem
              </td>
              <td className="table-column-title">
                <i className="fas fa-plane-arrival icon-table-flights"></i>
                Aeroporto de Destino
              </td>
              <td className="table-column-title">
                <i className="fas fa-dollar-sign icon-table-flights"></i>
                Valor
              </td>
              <td className="table-column-title">
                <i className="fas fa-clock icon-table-flights"></i>
                Saída
              </td>
              <td className="table-column-title">
                <i className="far fa-clock icon-table-flights"></i>
                Chegada
              </td>
              <td className="table-column-title">
                <i className="fas fa-history icon-table-flights"></i>
                Horas
              </td>
              {/* <td className="table-column-title">Total de Horas</td> */}
            </tr>
          </thead>
          <tbody>
            {/* percorremos o array e mostramos em cada linha da tabela, 
            um voo e suas informações */}
            {flightsList.map((flight, i) => {
              return (
                <tr className="table-row" key={i}>
                  <td className="table-column">
                    {moment(flight.date).format("DD/MM/YYYY")}
                  </td>

                  <td className="table-column table-column-airport">
                    {getAirportName(flight.origem)}
                  </td>

                  <td className="table-column table-column-airport">
                    {getAirportName(flight.destino)}
                  </td>
                  <td className="table-column">
                    {formatMoney(
                      // percorre o array e soma todos os valores
                      // caso seja necessário, do contrário retorna o único valor
                      flight.voos.reduce((acc, item) => {
                        return acc + item.valor;
                      }, 0.0)
                    )}
                  </td>
                  <td className="table-column">
                    {moment(
                      flight.voos[0].data_saida + " " + flight.voos[0].saida
                    ).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td className="table-column">
                    {/* testando se o voo faz escala e pegando as datas para 
                      calcular o total de horas */ }
                    {flight.voos.lenght > 1
                      ? moment(
                          flight.voos[flight.voos.length - 1].data_saida +
                            " " +
                            flight.voos[flight.voos.length - 1].saida
                        ).format("DD/MM/YYYY HH:mm")
                      : moment(
                          flight.voos[0].data_saida +
                            " " +
                            flight.voos[0].chegada
                        ).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td className="table-column">
                    {/* testando se o voo faz escala e pegando as datas para 
                      calcular o total de horas */ }
                    {flight.voos.lenght > 1
                      ? getDateDifference(
                          flight.voos[flight.voos.length - 1].data_saida +
                            " " +
                            flight.voos[flight.voos.length - 1].saida,
                          flight.voos[0].data_saida + " " + flight.voos[0].saida
                        )
                      : getDateDifference(
                          flight.voos[0].data_saida +
                            " " +
                            flight.voos[0].chegada,
                          flight.voos[0].data_saida + " " + flight.voos[0].saida
                        )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : 
      //renderiza se a busca não retorna dados
      (
        <div className="warning-flights-table">
          <h1 className="warning-flights-title">
            Não há voos disponíveis nesta data! :/
          </h1>
          <span>
            Mas não desista da sua tão sonhada viagem, consulte uma outra data.
          </span>
        </div>
      )}
    </div>
  );
}