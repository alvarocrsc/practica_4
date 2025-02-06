fetch("https://jsonblob.com/api/jsonBlob/1326548898923339776")
    .then(res => res.json())
    .then(products => {
        const result = products.products
        result.forEach(product => {
            console.log(product)
            
        })
    })

document.addEventListener("DOMContentLoaded", () => {
    const carrito = new Carrito()

    
}) 