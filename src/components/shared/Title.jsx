import React from "react";
import {Helmet} from "react-helmet-async"

const Title = ({title="Gossip" , description ="this is the Chat App called Gossip"}) => {
    return( 
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
    )
    
}

export default Title;