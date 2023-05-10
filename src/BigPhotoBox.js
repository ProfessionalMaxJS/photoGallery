
function BigPhotoBox({image}){

    return(
        <>
        <img src={image.src.large} alt={image.alt || image.photographer}></img>
        </>
    )
}

export default BigPhotoBox;