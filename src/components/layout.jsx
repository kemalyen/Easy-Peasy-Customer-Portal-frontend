
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Layout = () => {
  return (
    <>
      <div>
        <Header />
        <main role="main" className="
        max-w-screen-xl items-center justify-between mx-auto p-4">
          <Outlet />
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Layout;