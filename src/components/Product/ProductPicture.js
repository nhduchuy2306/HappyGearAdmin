import React, {useEffect, useState} from "react"
import pictureApi from "../../api/pictureApi"

function ProductPicture({id}) {

    const [picture , setPicture] = useState()

    useEffect(() =>{
        pictureApi.getByProductId(id)
            .then(res => setPicture(res.data))
    },[])

    console.log(picture)
    return (
        <img
            alt="example"
            src={picture?.pictureUrl}
        />
    )
}


export default ProductPicture