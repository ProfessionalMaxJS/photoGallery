import './App.css';
import { useState, useEffect } from 'react'
import { createClient } from 'pexels'
import { pexelsApiKey } from './apiKeys';
import PhotoBox from './PhotoBox';
import BigPhotoBox from './BigPhotoBox';

function App() {

  const [photoArray, setPhotoArray] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [nextPageAvail, setNextPageAvail] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [query, setQuery] = useState("")
  const [bigPictureID, setBigPictureID] = useState(0)
  const [bigPicture, setBigPicture] = useState({})

  const client = createClient(pexelsApiKey)
  useEffect(() => {
    query ? 
    client.photos.search({ query, page: pageNum, per_page: 10 }).then(photos => {
      photos.next_page ? setNextPageAvail(true) : setNextPageAvail(false)
      photos.photos.map(pA => setPhotoArray([...photos.photos]))
      console.log(photos)
      })
    : 
      client.photos.curated({ per_page: 10, page: pageNum }).then(photos => {
        photos.next_page ? setNextPageAvail(true) : setNextPageAvail(false)
        setPhotoArray([...photos.photos])
        console.log(photos)
      }) 
  }, [pageNum, query]);
    
  const nextPage = () => {
    setPageNum(pageNum => pageNum+1)
  }
  const prevPage = () => {
    setPageNum(pageNum => pageNum-1)
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setPageNum(pageNum => pageNum=1)
    setQuery(searchTerm)
    setSearchTerm("")
  }
  const handleRandos = () => {
    setQuery("")
    setSearchTerm("")
    setPageNum(Math.floor(Math.random()*800))
  }

  useEffect(()=>{
      setBigPicture({...photoArray.find(ph => ph.id === bigPictureID)})
  }, [bigPictureID])

  return(
    <>
        {Object.keys(bigPicture).length && <BigPhotoBox image={bigPicture} />}
      <div style={{justifyContent: "center"}}>
        {photoArray.map(ph => <PhotoBox key={ph.id} image={ph} setBigPictureID={setBigPictureID} />)}
      </div>
      <div>
        {pageNum > 1 && <button onClick={prevPage}>Previous Photo Set</button>}
        {nextPageAvail && <button onClick={nextPage}>Next Photo Set</button>}
        <form onSubmit={handleSubmit}>
          <input placeholder='elloGuvnah!' value={searchTerm} onChange={handleSearch} />
          <button disabled={searchTerm ? false : true}>SUBMIT!</button>
        </form>
        <button onClick={handleRandos} >Randos, please</button>
      </div>
    </>
  )
}

export default App;
