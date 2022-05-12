import { Link } from "react-router-dom";
import { CartState } from "../../Context/Context";

function BeerListItem({beer}) {
  const { state, dispatch } = CartState()
  let cartStorage = JSON.parse(localStorage.getItem("cart"))

  return (
    <div className="col col-6 col-sm-4 col-md-4 col-lg-3 card rounded-0 px-0">
      <Link to={ `beer/${beer.id}` } className="h-100 d-flex flex-column justify-content-between text-black">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="fs-6 mb-0">{ beer.name } </h5>
          <p className="card-text">{ beer.volume.value } { beer.volume.unit }</p>
        </div>

        { beer.image_url !== null ?
            beer.image_url.indexOf("keg") !== -1 ?
              <img src="https://images.punkapi.com/v2/18.png" alt={ beer.tagline } className="m-auto w-25 h-75"/>
              :  <img src={ beer.image_url} alt={ beer.tagline } className="m-auto w-25 h-75"/>
          :
          <img src="https://images.punkapi.com/v2/18.png" alt={ beer.tagline } className="m-auto w-25 h-75"/>
        }
       
      </Link>

      <div className="mb-4">
        {
          state.cart.some(item => item.id === beer.id) ? 
            <button onClick={() => {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: beer,
              })
              cartStorage.splice(cartStorage.indexOf(beer.id, 1))
              localStorage.setItem("cart", JSON.stringify(cartStorage))
            }} type="button" className="btn btn-outline-dark">Remove from cart</button>
            :
            <button onClick={() => {
              localStorage.setItem("cart", JSON.stringify([...state.cart, {
                id: beer.id,
                name: beer.name,
                image_url: beer.image_url,
                volume: {
                  value: beer.volume.value,
                  unit: beer.volume.unit
                }
              }]))

              dispatch({
                type: "ADD_TO_CART",
                payload: beer,
              })
            }} type="button" className="btn btn-outline-dark">Add to cart</button>
        }
      </div>
    </div>
  );
}

export default BeerListItem;
