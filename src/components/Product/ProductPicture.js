import React, { useEffect, useState } from "react"
import pictureApi from "../../api/pictureApi"
import img from "../../source/errorImg.jpg"

function ProductPicture({ id }) {

    const [picture, setPicture] = useState(img)

    useEffect(() => {
        async function fetchImage(){
            try{
                const response = await  pictureApi.getByProductId(id);
                setPicture(response.data.pictureUrl)

            } catch (e){
                console.log(e.message)
                setPicture(img)
            }
        }
        fetchImage();
        
        // pictureApi.getByProductId(id)
        //     .then(res => setPicture(res.data))
    }, [id])


    return (
        <img
            alt="example"
            src={picture}
            loading="lazy"

        />
    )
}


export default ProductPicture