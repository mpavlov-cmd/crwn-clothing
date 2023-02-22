import './category-item.styles.scss'

const CategoryItem = (props) => {

    const {id, title, imageUrl} = props.category;

    return (
        <div className="category-container" id={`category-${id}`}>
            <div
                className='background-image'
                // Style prop takes an object where key-value pairs are css
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            ></div>
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )

}

export default CategoryItem;