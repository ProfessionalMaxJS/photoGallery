import './App.css';
import { useState, useEffect } from 'react'
import { createClient } from 'pexels'
import { pexelsApiKey } from './apiKeys';
import PhotoBox from './PhotoBox';

function App() {

  const [photoArray, setPhotoArray] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const client = createClient(pexelsApiKey)
  useEffect(() => {
    // const query = 'food'
    client.photos.curated({ per_page: 10, page: pageNum }).then(photos => {
      console.log(photos)
      setPhotoArray([...photos.photos])
    }) //photos.map(pA => setPhotoArray([...photoArray, photoArray.push(pA)])))
  }, [pageNum]);
    
  const nextPage = () => {
    setPageNum(pageNum => pageNum+1)
  }
  const prevPage = () => {
    setPageNum(pageNum => pageNum-1)
  }


  
  return(
    <>
      {photoArray.map(ph => <PhotoBox key={ph.id} image={ph} />)}
      <div>
      {pageNum > 1 && <button onClick={prevPage}>Previous 10 Photos</button>}
      <button onClick={nextPage}>Next 10 Photos</button>
      <input placeholder='elloGuvnah!'></input>
      </div>
    </>
  )
}

export default App;
