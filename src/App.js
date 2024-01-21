import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import Header from './components/common/Header';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import { FiltersProvider } from './contexts/filters/filtersContext';
import { UserProfileProvider } from './contexts/user/userProfileContext';

const App = () => {
  return (
    <>
      <UserProfileProvider>
        <CommonProvider>
          <FiltersProvider>
            <CartProvider>
              <Header />
              <RouterRoutes />
              <Footer />
              <BackTop />
            </CartProvider>
          </FiltersProvider>
        </CommonProvider>
      </UserProfileProvider>
    </>
  );
};

export default App;
