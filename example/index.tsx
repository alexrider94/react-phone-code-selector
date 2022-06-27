import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PhoneCodeSelector } from '../.';
import styled from 'styled-components';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <PhoneCodeSelector defaultValue="" onChange={() => {}} />
      <CustomSelector defaultValue="" onChange={() => {}} />
    </div>
  );
};

const CustomSelector = styled(PhoneCodeSelector)`
  width: 300px;
  border-radius: 15px;
  background-color: violet;

  .selector-option {
    background-color: red;
  }

  .selector-option-item {
    &:hover {
      background-color: aqua;
    }
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
