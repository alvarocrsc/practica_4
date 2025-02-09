document.addEventListener("DOMContentLoaded", () => {
    const carrito = new Carrito()

    fetch("https://jsonblob.com/api/jsonBlob/1338238331900846080")
    .then(res => res.json())
    .then(data => {
        const products = data.products
        const currency = data.currency

        products.forEach(productData => {
            const product = new Product(productData)
            carrito.anadirAlCarrito(product)
        })

        const pintarTabla = (carrito) => {
            const tbody = document.querySelector('.products__table--body')
            tbody.innerHTML = ""

            carrito.products.forEach(product => {
                const fila = document.createElement("tr")
                fila.innerHTML = `
                <td class="products__table--column">
                    <h3>${product.getTitle()}</h3>
                    <p>Ref: ${product.getSku()}</p>
                </td>
                <td class="products__table--column products__table--buttons">
                    <button class="btn products__restar" data-sku="${product.getSku()}" data-action="restar">-</button>
                    <input type="number" class="products__table--quantity" data-sku="${product.getSku()}" value="${product.getUnits()}" min="0">
                    <button class="btn products__sumar" data-sku="${product.getSku()}" data-action="sumar">+</button>
                </td>
                <td class="products__table--column">
                    ${product.getPrice()}${currency}
                </td>
                <td class="products__table--total" data-sku="${product.getSku()}">
                    ${carrito.obtenerTotal(product).toFixed(2)}${currency}
                </td>
                `

                tbody.append(fila)
            })
        }

        const pintarTotal = (carrito) => {
            const tbody = document.querySelector(".total__summary--body")
            tbody.innerHTML = ""

            carrito.products.forEach(product => {
                if (product.getUnits() > 0) {
                    const fila = document.createElement("tr")
                    fila.innerHTML = `
                    <td>
                        <p>${product.getTitle()}</p>
                    </td>
                    <td class="total__summary--price-cell">
                        <p>${carrito.obtenerTotal(product).toFixed(2)}${currency}</p>
                    </td>
                    `
                    fila.classList.add("total__summary--row")
                    tbody.append(fila)
                }
            })
            
            const total = document.querySelector(".total__summary--price")
            total.textContent = carrito.obtenerTotalFinal().toFixed(2) + currency
        }

        document.querySelector('.products__table--body').addEventListener('click', (event) => {
            const sku = event.target.dataset.sku
            const action = event.target.dataset.action

            if (sku && action) {
                if (action === "sumar") {
                    carrito.sumarUnidades(sku)
                } else if (action === "restar") {
                    carrito.restarUnidades(sku)
                }
                actualizarVista()
            }
        })

        document.querySelector('.products__table--body').addEventListener('input', (event) => {
            if (event.target.classList.contains("products__table--quantity")) {
                const sku = event.target.dataset.sku
                const cantidadNueva = parseInt(event.target.value, 10)

                if (!isNaN(cantidadNueva) && cantidadNueva >= 0) {
                    carrito.actualizarUnidades(sku, cantidadNueva)
                    actualizarVista()
                }
            }
        })

        const actualizarVista = () => {
            pintarTabla(carrito)
            pintarTotal(carrito)
        }

        pintarTabla(carrito)
        pintarTotal(carrito)
    })
}) 