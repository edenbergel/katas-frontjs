import { Link } from "react-router-dom";
import { CartState } from "../../Context/Context";

function Cart() {
  const { state, dispatch } = CartState()
  let cartStorage = JSON.parse(localStorage.getItem("cart"))

  return (
    <div className="row">
      { state.cart.length !== 0 || cartStorage === null || cartStorage.length !== 0 ?

        cartStorage.length === 0 ?

            state.cart.map( item => 
              <div key={item.id} className="col col-6 col-sm-4 col-md-4 col-lg-3 card rounded-0 px-0">
                
                <Link to={ `/beer/${item.id}` } className="h-100 d-flex flex-column justify-content-between text-black">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="fs-6 mb-0">{ item.name }</h5>
                    <p className="card-text">{ item.volume.value } { item.volume.unit }</p>
                  </div>

                  { item.image_url !== undefined ?
                      item.image_url.indexOf("keg") !== -1 ?
                        <img src="https://images.punkapi.com/v2/18.png" alt={ item.tagline } className="m-auto w-25 h-75"/>
                        :  <img src={ item.image_url} alt={ item.tagline } className="m-auto w-25 h-75"/>
                    :
                    <img src="https://images.punkapi.com/v2/18.png" alt={ item.tagline } className="m-auto w-25 h-75"/>
                  }
                </Link>

                <div className="mb-4">
                  <button onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: item,
                    })
                  }} type="button" className="btn btn-outline-dark">Remove from cart</button>
                </div>
              </div>)
            
          :

            cartStorage.map( (item, index) => 
              <div key={item.id} className="col col-6 col-sm-4 col-md-4 col-lg-3 card rounded-0 px-0">
                
                <Link to={ `/beer/${item.id}` } className="h-100 d-flex flex-column justify-content-between text-black">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="fs-6 mb-0">{ item.name }</h5>
                    <p className="card-text">{ item.volume.value } { item.volume.unit }</p>
                  </div>

                  { item.image_url !== null ?
                      item.image_url.indexOf("keg") !== -1 ?
                        <img src="https://images.punkapi.com/v2/18.png" alt={ item.tagline } className="m-auto w-25 h-75"/>
                        :  <img src={ item.image_url} alt={ item.tagline } className="m-auto w-25 h-75"/>
                    :
                    <img src="https://images.punkapi.com/v2/18.png" alt={ item.tagline } className="m-auto w-25 h-75"/>
                  }
                </Link>

                <div className="mb-4">
                  <button onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: item,
                    })
                    cartStorage.splice(index, 1)
                    localStorage.setItem("cart", JSON.stringify(cartStorage))
                  }} type="button" className="btn btn-outline-dark">Remove from cart</button>
                </div>
              </div>
            )
        : <h5 className="mt-5">Empty Cart</h5>
      }
    </div>
  );
}

export default Cart;