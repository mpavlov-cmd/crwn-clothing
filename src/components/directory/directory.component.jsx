import './directory.styles.scss'
import DirectoryItem from "../category-item/directory-item.component";

const Directory = ({categories}) => {

    return (
        <div className="directory-container">
            {
                categories.map((category) => {
                    return (
                        <DirectoryItem category={category} key={category.id}/>
                    )
                })
            }
        </div>
    )
}

export default Directory;