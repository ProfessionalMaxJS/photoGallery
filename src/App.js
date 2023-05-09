import './App.css';
import { useState, useEffect } from 'react'
import { createClient } from 'pexels'
import { pexelsApiKey } from './apiKeys';
import PhotoBox from './PhotoBox';

function App() {

  const [photoArray, setPhotoArray] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const client = createClient(pexelsApiKey)
  useEffect(() => {
    // const query = 'food'
    client.photos.curated({ per_page: 10, page: nextPage }).then(photos => {
      console.log(photos)
      setPhotoArray([...photos.photos])
    }) //photos.map(pA => setPhotoArray([...photoArray, photoArray.push(pA)])))
  }, [nextPage]);
    
  const updatePage = () =>{
    setNextPage(nextPage => nextPage+1)
  }
  
  return(
    <>
      {photoArray.map(ph => <PhotoBox key={ph.id} image={ph} />)}
      <button onClick={updatePage}>elloGuvnah</button>
    </>
  )
}

export default App;
