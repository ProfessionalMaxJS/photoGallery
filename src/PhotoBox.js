function PhotoBox({image, setBigPictureID }){
    
    const handleBigPictureID = (e) =>{
        setBigPictureID(image.id)
    }

    return(
        <img style={{cursor: "pointer"}} src={image.src.small} alt={`${image.alt} by ${image.photographer}`} onClick={handleBigPictureID}></img>
    )
}

export default PhotoBox