import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PhoneCodeSelector } from '../.';

const App = () => {
  return (
    <div>
      <PhoneCodeSelector defaultValue="" onChange={() => {}} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
