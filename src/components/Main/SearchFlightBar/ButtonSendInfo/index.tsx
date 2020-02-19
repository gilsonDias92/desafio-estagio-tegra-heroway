import React from 'react';
import * as ReactRedux from 'react-redux';

import { IFlight } from '../../../../redux/reducers/flights';

interface IProps {
  flight: IFlight;
}

export default function() {
  const dispatch = ReactRedux.useDispatch();

  function getFlightInfo() {


  }


  return <button className="btn-send" >Enviar</button>;
}