
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Layout = () => {
  return (
    <>
      <div className="container">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Layout;