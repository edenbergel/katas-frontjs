import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { CartState } from '../../Context/Context';

function Header(to) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname });
  let cartStorage = JSON.parse(localStorage.getItem("cart"))
  
  const { state } = CartState()

  return (
    <>
      <nav className="navbar border-bottom border-dark">
        <div className="container-fluid justify-content-center">
          <div className="d-block">
            <h1 className="navbar-brand fw-bold fs-2">BEERS</h1>
            
            <ul className="nav justify-content-center">
              <li className={`nav-item ${match.pathname === '/' ? 'active' : ''}`}>
                <Link to='/' className={`nav-link fs-6 me-5 ${match.pathname === '/' ? 'active' : ''}`}>
                  SHOP
                </Link>
              </li>

              <li className={`nav-item ${match.pathname === '/cart/' ? 'is-active' : ''}`}>
                <Link to='/cart' className={`nav-link fs-6 ms-5 position-relative ${window.location.href.indexOf('cart/') > -1 ? 'active' : ''}`}>
                  CART 
                  
                  { state.cart.length !== 0 || cartStorage !== null ?
                      cartStorage.length === 0 ?
                        <span className="position-absolute top-2 start-100 translate-middle px-2 bg-dark rounded-circle">
                          <span className="text-white">{state.cart.length}</span>
                        </span>
                        :
                        <span className="position-absolute top-2 start-100 translate-middle px-2 bg-dark rounded-circle">
                            <span className="text-white">{cartStorage.length}</span> 
                        </span>
                    : ""
                  }
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  ); 
}

export default Header;