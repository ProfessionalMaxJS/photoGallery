
function BigPhotoBox({image}){

    return(
        <>
        <a href={image.src.original} target="_blank" rel="noreferrer">
        <img src={image.src.large} alt={`${image.alt} by ${image.photographer}`}></img>
        </a>
        </>
    )
}

export default BigPhotoBox;
