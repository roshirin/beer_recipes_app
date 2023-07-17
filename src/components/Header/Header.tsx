import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => (
  <header className="block page-title">
    <div className="container">
      <Link to="/">
        <h1 className="title is-size-1 has-text-centered">Beer recipes</h1>
      </Link>
    </div>
  </header>
);
