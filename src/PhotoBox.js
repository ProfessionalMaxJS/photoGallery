import './CSS/PhotoBox.css'

function PhotoBox({image, setBigPictureID }){
    
    const handleBigPictureID = () =>{
        setBigPictureID(image.id)
    }

    return(
        <img className="photo-box" src={image.src.small} alt={`${image.alt} by ${image.photographer}`} onClick={handleBigPictureID}></img>
    )
}

export default PhotoBox