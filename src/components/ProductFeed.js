import Product from "./Product";

    function ProductFeed({ products }) {
        return (
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52  mx-auto">{/*md:-mt-52 product div changes on med screens*/ }
                
                
                {products.slice(0,4).map((product) => ( // Get the product object
                    <Product
                        key={product.id} // Use product.id as the key
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        category={product.category}
                        image={product.image}
                    />
                ))}

                <img className="md:col-span-full"
                src="https://links.papareact.com/dyz"
                />
                <div className="md:col-span-2">
                {products.slice(4,5).map((product) => ( // Get the product object
                    <Product
                        key={product.id} // Use product.id as the key
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        category={product.category}
                        image={product.image}
                    />
                ))}
                </div>
                {products.slice(5, products.length).map((product) => ( // Get the product object
                    <Product
                        key={product.id} // Use product.id as the key
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        category={product.category}
                        image={product.image}
                    />
                ))}
            </div>
            
        );
    }

    export default ProductFeed;

/*
//key={id}
            id={id}
            title={title}
            description={description}
            category={category}
            image={image}
*/