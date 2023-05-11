function PhotoBox({image, setBigPictureID }){
    
    const handleBigPictureID = () =>{
        setBigPictureID(image.id)
    }

    return(
        <img style={{cursor: "pointer"}} src={image.src.small} alt={`${image.alt} by ${image.photographer}`} onClick={handleBigPictureID}></img>
    )
}

export default PhotoBox