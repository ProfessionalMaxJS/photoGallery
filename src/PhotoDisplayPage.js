import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { createClient } from 'pexels'
import './CSS/PhotoDisplayPage.css'
import PhotoBox from './PhotoBox';
import BigPhotoBox from './BigPhotoBox';

function PhotoDisplayPage(props) {

  const [photoArray, setPhotoArray] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [nextPageAvail, setNextPageAvail] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [query, setQuery] = useState("")
  const [bigPictureID, setBigPictureID] = useState(0)
  const [bigPicture, setBigPicture] = useState({})
  const [sParams, setSParams] = useSearchParams()
  const pexelsApiKey = process.env.REACT_APP_API_KEY;
  const client = createClient(pexelsApiKey)

  useEffect(() => {
    sParams.get('query') && setQuery(sParams.get('query')) 
    sParams.get('pageNum') && setPageNum(Number(sParams.get('pageNum')))
  }, [])

  useEffect(() => {
    if(query){
      setSParams({query, pageNum})
      client.photos.search({ query, page: pageNum, per_page: 10 }).then(photos => {
        photos.next_page ? setNextPageAvail(true) : setNextPageAvail(false)
        setPhotoArray([...photos.photos])
      })
    } else {
      client.photos.curated({ per_page: 10, page: pageNum }).then(photos => {
        photos.next_page ? setNextPageAvail(true) : setNextPageAvail(false)
        setPhotoArray([...photos.photos])
      })        
      pageNum > 1 && setSParams({pageNum})
    }
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
        {bigPicture.hasOwnProperty('src') && <BigPhotoBox image={bigPicture} />}
      <div className='photo-display-page' >
        {pageNum > 1 && <button className='photo-display-page'  onClick={prevPage}> &lt; </button>}
        {photoArray.map(ph => <PhotoBox key={ph.id} image={ph} setBigPictureID={setBigPictureID} />)}
        {nextPageAvail && <button className='photo-display-page' onClick={nextPage}> &gt; </button>}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input placeholder='elloGuvnah!' value={searchTerm} onChange={handleSearch} />
          <button disabled={searchTerm ? false : true}>SUBMIT!</button>
        </form>
        <button onClick={handleRandos} >Randos, please</button>
      </div>
    </>
  )
}

export default PhotoDisplayPage;
