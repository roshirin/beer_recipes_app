import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => (
  <footer className="block page-footer">
    <div className="container page-footer__content">
      <Link to="/">
        <h3 className="title is-size-3">Beer recipes</h3>
      </Link>
      <span>©2023 - Beer app</span>
    </div>
  </footer>
);
