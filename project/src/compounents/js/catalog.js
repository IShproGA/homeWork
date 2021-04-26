let catalog = {
    url: 'https://raw.githubusercontent.com/IShproGA/static/master/JSON/catalog.json',
    items: [],
    container: null,
    basket: null,
    myCart: [],
    _getData(url) {
        return fetch(url)
            .then(dataFromGit => dataFromGit.json())
        // .then(dataNotJson => { this.items = dataNotJson })
    },
    init() {
        this.container = document.querySelector('#goodsBox');
        this.basket = basket;
        this._getData(this.url)
            .then(arr => {
                this.items = arr;
            })
            .then(() => {
                this._render();
                this._handleEvents();
            })
        // setTimeout(() => {
        //     this._render();
        // }, 300);

    },
    _render() {
        let html = '';
        this.items.forEach(us => {
            html += `
                        <div class="good">
                            <div class="wrapedImgToCart">
                                <div class="butonBuy">
                                    <button
                                        name="addToCart""
                                        data-id="${us._id}"
                                        data-brand="${us.brand}"
                                        data-src="${us.img}"
                                        data-price="${us.price}">
                                        <img src="../src/assets/icons/cart.png" alt="">
                                        Add to Cart
                                    </button>
                                </div>
                                <img class="fotoBuy" src="${us.img}" alt="">
                            </div>
                            <div class="clothesBrand">
                                <div class="textBrand">
                                    ${us.brand}
                                </div>
                                <div class="price">
                                    $${us.price}
                                </div>
                            </div>
                        </div>
                    
                    `
        })
        this.container.innerHTML = html;
    },
    _handleEvents() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'addToCart') {
                let dataset = ev.target.dataset;
                let item = {
                    _id: dataset.id,
                    brand: dataset.brand,
                    img: dataset.img,
                    price: +dataset.price,
                    amount: 1
                };
                this.basket.addToCart(item);
            }
        })
    }
}
catalog.init();

