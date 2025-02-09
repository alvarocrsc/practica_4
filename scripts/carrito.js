class Carrito {
    constructor(products = [], currency) {
        this.products = products
        this.currency = currency
    }

    anadirAlCarrito (product) {
        this.products.push(product)
    }

    actualizarUnidades(sku, unidades) {
        const product = this.products.find(product => product.getSku() === sku)
        if (product) {
            product.setUnits(unidades)
        }
    }

    sumarUnidades(sku) {
        const product = this.products.find(product => product.getSku() === sku)
        if (product) {
            product.increaseUnits()
        }
    }

    restarUnidades(sku) {
        const product = this.products.find(product => product.getSku() === sku)
        if (product && product.getUnits() > 0) {
            product.decreaseUnits()
        }
    }

    obtenerInformacionProducto(sku) {
        const product = this.products.find(product => product.getSku() === sku)
    
        if (product) {
            return {
                sku: product.getSku(),
                quantity: product.getUnits()
            }
        }
        return null
    }

    obtenerCarrito(currency) {
        const total = this.obtenerTotalFinal().toFixed(2);
        const products = this.products.map(product => ({
            sku: product.getSku(),
            title: product.getTitle(),
            price: product.getPrice(),
            quantity: product.getUnits()
        }))

        return {
            total: total,
            currency: currency,
            products: products
        }
    }

    obtenerTotal(product) {
        return product.getPrice() * product.getUnits()
    }

    obtenerTotalFinal() {
        return this.products.reduce((acc, product) => {
          return acc + this.obtenerTotal(product)
        }, 0)
    } 
}