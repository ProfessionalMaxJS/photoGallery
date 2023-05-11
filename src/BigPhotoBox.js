
function BigPhotoBox({image}){

    console.log(image)

    return(
        <>
        <img src={image.src.large} alt={`${image.alt} by ${image.photographer}`}></img>
        </>
    )
}

export default BigPhotoBox;
