class Product {
    #sku
    #price
    #title
    #units
    
    constructor({SKU, price, title, units = 0}) {
        this.#sku = SKU
        this.#price = price
        this.#title = title
        this.#units = units
    }

    getSku() {
        return this.#sku
    }

    getPrice() {
        return this.#price
    }

    getTitle() {
        return this.#title
    }

    getUnits() {
        return this.#units
    }

    increaseUnits() {
        this.#units++
    }

    decreaseUnits() {
        this.#units--
    }

    setUnits(units) {
        this.#units = units
    }
}