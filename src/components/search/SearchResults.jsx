import React from 'react';
import Product from '../products/Product';

function SearchResults(props){
    let results = props.searchedItems.map((item)=> {
        var itemProps = {
            ...item,
            key: item.id,
        }
        return <Product {...itemProps}/>
    })
    return (
        <>
         {results}
        </>
    )
}

export default SearchResults;