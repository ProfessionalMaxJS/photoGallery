function PhotoBox({image}){
    
    return(
        <img src={image.src.portrait} alt={image.photographer}></img>
    )
}

export default PhotoBox