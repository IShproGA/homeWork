let catalog = {
    url: 'https://raw.githubusercontent.com/IShproGA/static/master/JSON/catalog.json',
    items: [],
    container: null,
    myCart: [],
    getData(url) {
        fetch(url)
            .then(dataFromGit => dataFromGit.json())
            .then(dataNotJson => { this.items = dataNotJson })
    },
    init() {
        this.container = document.querySelector('#goodsBox');
        this.getData(this.url);
        setTimeout(() => {
            this._render();
        }, 300);
        this._handleEvents();
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
                                        data-brand="${us.brand}
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
                                    ${us.price}
                                </div>
                            </div>
                        </div>
                    
                    `
        })
        this.container.innerHTML = html;
    },
    _handleEvents() {
        this.container.addEventListener('click', this._addToCart.bind(this))
    },
    _addToCart(evt) {
        if (evt.target.name == 'addToCart') {
            this.myCart += [e.target.dataset.brand, e.target.dataset.price, e.target.dataset.img]
        }
    }
}
catalog.init();

