import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/api";
import { CartState } from "../../Context/Context";

function BeerDetails() {
  const [beerDetails, setBeerDetails] = useState([])
  const [openIngredient, setOpenIngredient] = useState(false)
  const [openTips, setOpenTips] = useState(false)

  const params = useParams();

  const { state, dispatch } = CartState()
  let cartStorage = JSON.parse(localStorage.getItem("cart"))

  useEffect(() => {
    api.get(`/${params.id}`)
    .then( res => {
      setBeerDetails(res.data[0])
    })
    .catch( error => console.log(error))  
  },[params.id])

  return (
    <div className="BeerDetails my-5 w-75 m-auto">
      {
        beerDetails ?
          <div key={beerDetails.id} className="row row-cols-1 row-cols-sm-1 row-cols-md-2 justify-content-center flex-wrap">
            <div className="col">
              <img src={ beerDetails.image_url} alt={ beerDetails.tagline } style={{ width: 25 + '%'}} className="h-75" />
            </div>

            <div className={`col text-start ${(openTips || openIngredient) ? 'slideDown-animation': ''}`}>
              <h2>{ beerDetails.name }</h2>
              { beerDetails.volume && <p className="fst-italic text-danger"> { beerDetails.volume.value } { beerDetails.volume.unit }</p> }

              <p>{ beerDetails.description}</p>

              {
                state.cart.some(item => item.id === beerDetails.id) ? 
                  <button onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: beerDetails,
                    })
                    cartStorage.splice(cartStorage.indexOf(beerDetails.id, 1))
                    localStorage.setItem("cart", JSON.stringify(cartStorage))
                    
                  }} type="button" className="btn btn-outline-dark">Remove from cart</button>
                  :
                  <button onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: beerDetails,
                    })
                    localStorage.setItem("cart", JSON.stringify([...state.cart, {
                      id: beerDetails.id,
                      name: beerDetails.name,
                      image_url: beerDetails.image_url,
                      volume: {
                        value: beerDetails.volume.value,
                        unit: beerDetails.volume.unit
                      }
                    }]))
                  }} type="button" className="btn btn-outline-dark">Add to Cart</button>
              }

              {
                beerDetails.ingredients &&
                  <>
                    <h6 className="mt-5 mb-3" onClick={() => setOpenIngredient(!openIngredient)}>Ingredients
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>
                    </h6>

                    <div className="slideDown">
                    {
                      openIngredient &&
                      <>
                        <div className="border-top border-warning py-2">
                          <p className="fst-italic">MALT</p>
                          <div className="d-flex flex-wrap">
                            {
                              beerDetails.ingredients.malt.map((maltItem, index) =>
                                <span key={index} className="me-3 fw-lighter">{maltItem.name}</span>
                              )
                            } 
                          </div>
                        </div>

                        <div className="border-top border-warning py-2">
                          <p className="fst-italic">HOPS</p>
                          <div className="d-flex flex-wrap">
                            {
                              beerDetails.ingredients.hops.map((hopsItem, index) =>
                                <span key={index} className="me-3 fw-lighter">{hopsItem.name}</span>
                              )
                            } 
                          </div>
                        </div>

                        <div className="border-top border-warning py-2">
                          <p className="fst-italic">YEAST</p>
                          <span className="fw-lighter">{beerDetails.ingredients.yeast}</span>
                        </div>
                      </>
                    }
                    </div>
                  </>
              }

              <h6 className="mt-2" onClick={() => setOpenTips(!openTips)}>Brewers Tips
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </h6>

              <div className="slideDown">
                { openTips && <p className="fw-lighter">{ beerDetails.brewers_tips}</p> }
              </div>
            </div>
          </div>

        : <h5 className="mt-5">Loading...</h5>
      }
     
    </div>
  );
}

export default BeerDetails;