import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {orange900} from 'material-ui/styles/colors';
import {Link} from 'react-router-dom';

const Startbutton = () => (
  <div>

    <Link to={{ pathname: '/Demo' }}> <RaisedButton label="Start Demo"  backgroundColor={orange900} /> </Link>  
 
  </div>
);

export default Startbutton;