import './directory-item.styles.scss'

const DirectoryItem = (props) => {

    const {id, title, imageUrl} = props.category;

    return (
        <div className="directory-item-container" id={`category-${id}`}>
            <div
                className='background-image'
                // Style prop takes an object where key-value pairs are css
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            ></div>
            <div className="directory-item-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )

}

export default DirectoryItem;