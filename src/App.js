import './App.css';
import { useState, useEffect } from 'react'
import { createClient } from 'pexels'
import { pexelsApiKey } from './apiKeys';
import PhotoBox from './PhotoBox';

function App() {

  const [photoArray, setPhotoArray] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [nextPageAvail, setNextPageAvail] = useState(false)
  const [query, setQuery] = useState("")
  const client = createClient(pexelsApiKey)
  useEffect(() => {
    query ? 
    client.photos.search({ query, page: pageNum, per_page: 10 }).then(photos => {
      photos.next_page ? setNextPageAvail(true) : setNextPageAvail(false)
      photos.photos.map(pA => setPhotoArray([...photos.photos]))
      console.log(query)
      console.log(photos)
      })
    : 
      client.photos.curated({ per_page: 10, page: pageNum }).then(photos => {
        photos.next_page ? setNextPageAvail(true) : setNextPageAvail(false)
        setPhotoArray([...photos.photos])
        console.log(photos)
      }) 
  }, [pageNum]);
    
  const nextPage = () => {
    setPageNum(pageNum => pageNum+1)
  }
  const prevPage = () => {
    setPageNum(pageNum => pageNum-1)
  }
  const handleSearch = (e) => {
    setQuery(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setPageNum(pageNum => pageNum=800)
    // setQuery("")
  }

  
  return(
    <>
      {photoArray.map(ph => <PhotoBox key={ph.id} image={ph} />)}
      <div>
      {pageNum > 1 && <button onClick={prevPage}>Previous 10 Photos</button>}
      {nextPageAvail && <button onClick={nextPage}>Next 10 Photos</button>}
      <form onSubmit={handleSubmit}>
      <input placeholder='elloGuvnah!' value={query} onChange={handleSearch} />
      <button disabled={query ? false : true}>SUBMIT!</button>
      </form >
      </div>
    </>
  )
}

export default App;
