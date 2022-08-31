import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';

function PageNotFound(): JSX.Element {
  return (
    <section className="game__screen" style={{marginTop: 'auto', marginLeft: 'auto', paddingLeft: '58px', paddingRight: '58px'}}>
      <div style={{padding: '19px 16px 0'}}>
        <Logo />
      </div>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Root}>Go to home</Link>
    </section>
  );
}

export default PageNotFound;
