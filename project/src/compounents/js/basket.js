let basket = {
    items: [],
    container: null,
    containerItems: null,
    shown: false,
    url: 'https://raw.githubusercontent.com/IShproGA/static/master/JSON/catalog.json',
    _getData(url) {
        return fetch(url)
            .then(dataFromGit => dataFromGit.json())
    },
    init() {
        this.container = document.querySelector('#basket');
        this.containerItems = document.querySelector('#basket-items');
        this._getData(this.url)
            .then(basket => {
                this.items = basket;
            })
            .then(() => {
                this._render();
                this._handleEvents();
            })
    },
    _render() {
        let html = '';
        this.items.forEach(us => {
            html += `
                        <div class="basketGood">
                            <img class="basketFoto" src="${us.img}" alt=""> 
                            <div class="basketClothesBrand">
                                <div class="basketTextBrand">
                                    ${us.brand}
                                </div>
                                <div class="basketPrice">
                                    $${us.price}
                                     X ${us.amount}
                                </div>
                            </div>
                            <div class="remoov">
                                <button class="remuve" id="remuve" name="remuve"
                                data-id="${us._id}">
                                X
                                </button>
                            </div>
                        </div>
                    `
        })
        this.container.innerHTML = html;
    },
    _handleEvents() {
        document.querySelector('#basket-toggler').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
            this.shown = !this.shown;
        })
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'remuve') {
                this._remove(ev.target.dataset.id);
            }
        })
    },
    addToCart(item) {
        let find = this.items.find(el => el._id == item._id);
        if (find) {
            find.amount++;
        } else {
            this.items.push(item);
        }
        this._render();
    },
    _remove(id) {
        let find = this.items.find(el => el._id == id);
        if (find.amount > 1) {
            find.amount--;
        } else {
            this.items.splice(this.items.indexOf(find), 1);
        }
        this._render();
    }
}
basket.init();