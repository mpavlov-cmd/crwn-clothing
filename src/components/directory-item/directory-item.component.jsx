import './directory-item.styles'
import {BackgroundImage, DirectoryItemBodyContainer, DirectoryItemContainer} from "./directory-item.styles";
import {useNavigate} from "react-router-dom";

const DirectoryItem = (props) => {

    const {id, title, imageUrl, route} = props.category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer
            className="directory-item-container"
            id={`category-${id}`}
            onClick={onNavigateHandler}
        >
            <BackgroundImage
                className='background-image'
                // Passing data to the css-in-js as a prop
                imageUrl={imageUrl}
                // // Style prop takes an object where key-value pairs are css
                // style={{
                //     backgroundImage: `url(${imageUrl})`
                // }}
            ></BackgroundImage>
            <DirectoryItemBodyContainer className="directory-item-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryItemBodyContainer>
        </DirectoryItemContainer>
    )

}

export default DirectoryItem;