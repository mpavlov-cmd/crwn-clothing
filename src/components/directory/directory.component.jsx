import './directory.styles'
import DirectoryItem from "../directory-item/directory-item.component";
import {DirectoryContainer} from "./directory.styles";

const Directory = ({categories}) => {

    return (
        <DirectoryContainer className="directory-container">
            {
                categories.map((category) => {
                    return (
                        <DirectoryItem category={category} key={category.id}/>
                    )
                })
            }
        </DirectoryContainer>
    )
}

export default Directory;
