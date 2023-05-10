function PhotoBox({image, setBigPictureID }){
    
    const handleBigPictureID = (e) =>{
        setBigPictureID(image.id)
    }

    return(
        <img style={{cursor: "pointer"}} onClick={handleBigPictureID}  src={image.src.small} alt={image.alt || image.photographer}></img>
    )
}

export default PhotoBox