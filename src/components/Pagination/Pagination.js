import { useLocation } from "react-router-dom";

function Pagination({totalCount, pageSize, paginateParams, currentParamsArray}) {
  
  const location = useLocation()
  const pages = Math.ceil(totalCount / pageSize )

  const onNext = () => {
    
    if (currentParamsArray.page === undefined) {
      paginateParams(2)
      window.scrollTo(0, 0)
    }
    else if (Number(currentParamsArray.page) < pages) {
      paginateParams(Number(currentParamsArray.page) + 1)
      window.scrollTo(0, 0)
    }
  }

  const onPrevious = () => {

    if (currentParamsArray.page === undefined) {
      paginateParams(1)
      window.scrollTo(0, 0)
    }
    else if (Number(currentParamsArray.page) !== 1) {
      paginateParams(Number(currentParamsArray.page) - 1)
      window.scrollTo(0, 0)
    }
    
  }

  const changePage = (event) => {
    paginateParams(event.target.innerHTML)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <nav className="w-75 m-auto">
        <ul className="pagination m-auto w-50 py-5 justify-content-between">
          <li className="page-item me-2">
            <button className={`btn ${(Number(currentParamsArray.page) === 1 || currentParamsArray.page === undefined) ? 'border-secondary text-secondary' : 'btn-dark'}`} onClick={onPrevious}>Previous</button>
          </li>

          {
            [...Array(pages)].map((page, index) => 
              location.search !== '' ?
                <li 
                  key={index} 
                  className="page-item page__number"
                  onClick={changePage}
                >
                  <button className={`btn ${(index + 1 === Number(currentParamsArray.page) || currentParamsArray === undefined) ? 'btn-dark' : 'btn-outline-dark'}`} >{index + 1}</button>
                </li>
              : 
              
                <li 
                  key={index} 
                  className="page-item page__number"
                  onClick={changePage}
                >
                  <button className={`btn ${index === 0 ? 'btn-dark' : 'btn-outline-dark'}`}>{index + 1}</button>
                </li>
            )
          }

          <li className="page-item ms-2">
            <button className={`btn ${Number(currentParamsArray.page) === pages ? 'border-secondary text-secondary' : 'btn-dark'}`} onClick={onNext}>Next</button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination;