import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import 'bulma/css/bulma.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
