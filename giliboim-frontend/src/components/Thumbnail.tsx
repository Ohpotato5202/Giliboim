import { url } from "inspector";


const Thumbnail = (props: {changeName : string}) => {
    
    const imageUrl = "http://localhost:8085/api/static/images/posts";

    return (
    <>  
        <div className="post-thumbnail" style={props.changeName != null ?
                { backgroundImage: `url(${imageUrl}/${props.changeName})` } :
                { backgroundImage: `url(${imageUrl}/giliboim-logo.png)` }}>
        </div>
    </>   
    )
}

export default Thumbnail;