import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAirportsAction } from "../../../redux/actions/getAirportsAction";
import { sendFlightInfoAction } from "../../../redux/actions/sendFlightInfoAction";
import { IAppState } from "../../../redux/configureStore";
import FlightsTable from "./FlightsTable";

export default function SearchFlightContainer() {
  const dispatch = useDispatch();

  // state do aeroporto de origem
  const [airportFrom, setAirportFrom] = useState();
  function handleChangeAirportFrom(event) {
    setAirportFrom(event.target.value);
  }

  //state do aeroporto de destino
  const [airportTo, setAirportTo] = useState();
  function handleChangeAirportTo(event) {
    setAirportTo(event.target.value);
  }

  //state da data do voo
  const [date, setDate] = useState();
  function handleChangeDate(event) {
    setDate(event.target.value);
  }

  //state que renderiza tabela de voos
  const [isVisible, setIsVisible] = useState(false);
  function handleFLightsTableIsVisible() {
    setIsVisible(true);
  }

  //validacao dos inputs
  function validateForm() {
    if (airportFrom === undefined) return false;
    if (airportTo === undefined) return false;
    if (date === undefined) return false;

    return true;
  }

  // função dispara a action e recebe os aeroportos
  // valida e renderiza a tabela de voos
  function handleClick() {
    dispatch(sendFlightInfoAction(airportFrom, airportTo, date));
    if (validateForm()) {
      handleFLightsTableIsVisible();
    }
  }

  // acessando o estado do reducer que retorna a lista de aeroportos
  // usaremos esse estado mais de uma vez
  const airportsState = useSelector((state: IAppState) => {
    return state.airports;
  });
  const airportsList = airportsState.airports;

  //ao carregar a página, realizamos o get na API e recebemos os aeroportos
  useEffect(() => {
    const getAirports = getAirportsAction();
    dispatch(getAirports);
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="search-flight-bar-container">
          <h2>Encontre as melhores condições para viajar!</h2>
          <div className="form-seach-flight-bar">
            <div className="airport-select-row">
              <label
                htmlFor="airports-list-from"
                className="airport-from-label airport-select-label"
              >
                Origem:
              </label>
              <div className="select-airport-container">
                <i className="fas fa-plane-departure search-bar-icon"></i>
                <select
                  // captura o aeroporto e altera o estado
                  onChange={handleChangeAirportFrom}
                  id="airports-list-from"
                  name="airports-list-from"
                  className="select-airports-list"
                >
                  <option className="single-option" value="">
                    Selecione o aeroporto de origem
                  </option>
                  {/* carrega o select com a lista de aeroportos */}
                  {airportsList.map(airport => {
                    return (
                      <option
                        className="single-option"
                        key={airport.nome}
                        value={airport.aeroporto}
                      >
                        {airport.nome}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="airport-select-row">
              <label
                htmlFor="airports-list-to"
                className="airport-select-label"
              >
                Destino:
              </label>
              <div className="select-airport-container">
                <i className="fas fa-plane-arrival search-bar-icon"></i>
                <select
                  onChange={handleChangeAirportTo}
                  id="airports-list-to"
                  name="airports-list-to"
                  className="select-airports-list"
                >
                  <option value="">Selecione o aeroporto de destino</option>
                  {/* carrega o select com a lista de aeroportos */}
                  {airportsList.map(airport => {
                    return (
                      <option key={airport.nome} value={airport.aeroporto}>
                        {airport.nome}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="airport-select-row">
              <label className="airport-select-label">Data:</label>
              <div className="select-airport-container">
                <i className="fas fa-calendar-alt search-bar-icon"></i>
                <input
                  title="Escolha uma data entre 10/02/2019 e 18/02/2019"
                  min="2019-02-10"
                  max="2019-02-18"
                  type="date"
                  className="date-input"
                  onChange={handleChangeDate}
                />
              </div>
            </div>
            <button className="btn-send" onClick={handleClick}>
              Enviar
            </button>
          </div>
        </div>
      </div>
      {/* só renderiza depois do clique */}
      <div>{isVisible ? <FlightsTable /> : undefined}</div>
    </>
  );
}
