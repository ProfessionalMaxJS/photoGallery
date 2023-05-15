import './CSS/BigPhotoBox.css'

function BigPhotoBox({image}){

    return(
        <>
            <div className='big-photo-box'>          
                <a href={image.src.original} target="_blank" rel="noreferrer">
                    <img src={image.src.large} alt={`${image.alt} by ${image.photographer}`} />
                </a>
                <p>{`${image.alt} by`}&nbsp; 
                    <a href={image.photographer_url} target="_blank" rel="noreferrer"> 
                        {image.photographer} 
                    </a>
                </p>
            </div>
        </>
    )
}

export default BigPhotoBox;
