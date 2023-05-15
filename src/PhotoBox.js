import './CSS/PhotoBox.css'

function PhotoBox({image, setBigPictureID, setArtistDetails }){
    
    const handleBigPictureID = () =>{
        setBigPictureID(image.id)
        setArtistDetails("")
    }

    const handleArtistDetails = () =>{
        setArtistDetails(`${image.alt} by ${image.photographer}`)
    }

    return(
        <>
            <img className="photo-box" src={image.src.small} alt={`${image.alt} by ${image.photographer}`} onClick={handleBigPictureID} onMouseEnter={handleArtistDetails} onMouseLeave={()=>setArtistDetails("")} />
                <p className='photo-box__photo-info' >{`${image.alt} by`}&nbsp; 
                    <a href={image.photographer_url} target="_blank" rel="noreferrer"> 
                        {image.photographer} 
                    </a>
                </p>
        </>
    )
}

export default PhotoBox