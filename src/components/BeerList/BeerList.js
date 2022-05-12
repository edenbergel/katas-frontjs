import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { api } from "../../config/api";
import Pagination from "../Pagination/Pagination";
import BeerListItem from "./BeerListItem";
import SearchBeer from "./SearchBeer";

function BeerList() {
  const [beers, setBeers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchField, setSearchField] = useState("");

  const currentParamsArray = Object.fromEntries([...searchParams]);

  const appendSearchParams = (obj) => {
    const sp = createSearchParams(searchParams);
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        sp.delete(key);
        value.forEach((v) => sp.append(key, v));
      } else if (value === undefined || value === '') {
        sp.delete(key);
      } else {
        sp.set(key, value);
      }
    });
    return sp;
  }

  const paginateParams = (page) => {
    setSearchParams(appendSearchParams({page}))
  };


  const filteredPersons = beers?.filter(
    beer => {
      return (
        beer.name.toLowerCase().includes(searchField.toLowerCase()) 
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    api.get(`?page=${ currentParamsArray.page === undefined ? 1 : Number(currentParamsArray.page) }`)
    .then( res => {
      setBeers(res.data)
    })
    .catch( error => console.log(error))  
  },[currentParamsArray.page])

  return (
    <section>
      <SearchBeer handleChange={handleChange} />
      {
        filteredPersons && filteredPersons.length ?
          <>
            <div className="row pb-5">
              { 
                filteredPersons.map(beer => 
                  <BeerListItem key={beer.id} beer={beer} />
                )
              }
            </div>  
            <Pagination
              totalCount={325}
              pageSize={25}
              paginateParams={paginateParams}
              currentParamsArray={currentParamsArray}
              searchParams={searchParams}
            />
          </>
          : <h5 className="mt-5">No Products</h5>
      }
    </section>
  );
}

export default BeerList;
