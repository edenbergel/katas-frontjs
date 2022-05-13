const SearchBeer = ({handleChange}) => {
  return (
    <div className="search mx-auto border-bottom border-dark py-2 position-fixed start-0 end-0">
      <form className="d-flex position-relative w-50 m-auto">
          <input className="form-control rounded-0 border-bottom border-0 border-dark bg-transparent" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
          <span className="position-absolute top-50 end-0 translate-middle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg></span>
        </form>
    </div>
  )
} 

export default SearchBeer