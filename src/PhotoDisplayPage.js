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
  const [artistDetails, setArtistDetails] = useState("")
  const [sParams, setSParams] = useSearchParams()
  const pexelsApiKey = process.env.REACT_APP_API_KEY;
  const client = createClient(pexelsApiKey)

  /*First useEffect; has an empty dependency array.
    Only runs once, first thing, in case the user tries to navigate to a set of results working backwards from Search Params.*/
  useEffect(() => {
    sParams.get('query') && setQuery(sParams.get('query')) 
    sParams.get('pageNum') && setPageNum(Number(sParams.get('pageNum')))
  }, [])

  /*Second useEffect, state variables pageNum and query in dependency array.
    Should run whenever the two state variables are updated, but (despite the warnings) should NOT be updated to include client.photos or setSParams.
    Both are called within and would trigger infinite re-renders.*/
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
  const handleRandomPhotos = () => {
    setQuery("")
    setSearchTerm("")
    setPageNum(Math.floor(Math.random()*800))
  }

  /* Third useEffect, state variable bigPictureID in dependency array.
     Dependency Array Should not be updated to include state variable photoArray; said variable changes every time the user scrolls or searches.
     This setState call should ONLY run when the user selects a new photo they'd like to see enlarged, no matter where else they scroll afterward.*/
  useEffect(()=>{
      setBigPicture({...photoArray.find(ph => ph.id === bigPictureID)})
  }, [bigPictureID])

  return(
    <>
      <div className={bigPicture.hasOwnProperty('src') ? 'heading-hidden' : 'heading'} />
      <div className='title' >
        <p>
          <span>
            Phumble
          </span>
        <br />
          ~phind yourselph a photo~
          <br />~stay awhile~
        </p>
      </div>
      {bigPicture.hasOwnProperty('src') && <BigPhotoBox image={bigPicture} />}
      <div className='photo-display-wheel' >
        {pageNum > 1 && <button onClick={prevPage}> &lt; </button>}
        {
          photoArray.length 
          ?
            photoArray.map(ph => <PhotoBox key={ph.id} image={ph} setBigPictureID={setBigPictureID} setArtistDetails={setArtistDetails} />)
          :
            <div className='loader' />
        }
            {nextPageAvail && <button onClick={nextPage}> &gt; </button>}
      </div>
      <div className='artist-plaque' >
        {artistDetails}
      </div>
      <div className='photo-searchbar' >
        <form className='photo-searchbar__form' onSubmit={handleSubmit}>
          <input type='search' placeholder='Search for Photos by Subject' value={searchTerm} onChange={handleSearch} />
          <button disabled={searchTerm ? false : true}>Search</button>
        </form>
        <button className='photo-searchbar__random-button' onClick={handleRandomPhotos} >Show Me Ten Random Photos!</button>
      </div>
      <div className='the-credits'>
        <p>
          <span >
            The Credits <br />
          </span>
          Site designed & coded by&nbsp;
            <a href="https://github.com/ProfessionalMaxJS" target="_blank" rel="noreferrer" >
              Max Engel-Streich 
            </a>
          <br />
          Photos provided by&nbsp;
            <a href="https://www.pexels.com" target="_blank" rel="noreferrer">
              Pexels
            </a>
          <br />
          Iconography by&nbsp; 
            <a href="https://www.flaticon.com/free-icons/camera" target="_blank" rel="noreferrer">
              Freepik - Flaticon
            </a>
        </p>
      </div>
    </>
  )
}

export default PhotoDisplayPage;
