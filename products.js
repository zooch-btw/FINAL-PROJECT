/////////////////////////////////////////////////// --> PRODUCTS OAGE <-- ///////////////////////////////////////////////////////////
class imgZoom {
    src;
    scale;
    constructor(src, scale) {
        (this.src = src),
            (this.img = undefined),
            (this.bgSize = undefined),
            (this.zoom = undefined),
            (this.scale = scale);
        this.init();
    }
    init() {
        const self = this;
        this.img = `imgs/${window
            .getComputedStyle(this.src)
            .getPropertyValue("background")
            .match(/url\(["']?(.*?)["']?\)/)
            .at(-1)
            .split("/")
            .at(-1)}`;
        this.bgSize = window
            .getComputedStyle(this.src)
            .getPropertyValue("background-size")
            .split(" ");
        if (this.bgSize.length == 1) this.bgSize.push("auto");
        const lens = document.createElement("div");
        lens.classList.add("lens", "d-none");
        this.src.append(lens);
        this.zoom = {
            src: self.getInternal(".lens"),
            x: 0,
            y: 0,
            img: self.img,
            bgSize: self.bgSize,
            mouseCoords: {
                x: 0,
                y: 0,
            },
        };
        this.zoom = new Proxy(this.zoom, {
            set(tgt, prop, receiver) {
                let reflect = Reflect.set(tgt, prop, receiver);
                const scale = () => {
                    let construct = [];
                    tgt.bgSize.forEach((e) => {
                        if (Number.isFinite(+e.slice(0, e.length - 1)) == true)
                            construct.push(
                                `${Number(e.slice(0, e.length - 1)) * self.scale}%`
                            );
                        else construct.push(e);
                    });
                    return construct.join(" ");
                };
                const position = () => {
                    const factor = scale().split(" ");
                    for (let i = 0; i < factor.length; i++) {
                        let elem = factor[i].slice(0, factor[i].length - 1);
                        if (isNaN(Number(elem)) == true) factor[i] = 1;
                        else factor[i] = Number(elem);
                    }
                    const coords = {
                        x: tgt.mouseCoords.x + tgt.src.offsetWidth / 2,
                        y: tgt.mouseCoords.y + tgt.src.offsetHeight / 2,
                    };
                    let div = 100 * self.scale;
                    let x =
                        ((coords.x / self.src.offsetWidth) * 100) / (factor[0] / div) + "%";
                    let y =
                        ((coords.y / self.src.offsetHeight) * 100) / (factor[1] / div) +
                        "%";
                    return [x, y].join(" ");
                };
                tgt.src.setAttribute(
                    "style",
                    `top: ${tgt.y}px; left: ${tgt.x}px; background: url(${tgt.img
                    }); background-size: ${scale()}; background-origin: center; background-position: ${position()};`
                );
                return reflect;
            },
        });
        this.zoom.x = this.zoom.y = 0;
        this.src.addEventListener("mousemove", (event) => {
            const coords = {
                x:
                    event.clientX -
                    self.src.getBoundingClientRect().left -
                    self.zoom.src.offsetWidth / 2,
                y:
                    event.clientY -
                    self.src.getBoundingClientRect().top -
                    self.zoom.src.offsetHeight / 2,
            };
            self.zoom.mouseCoords.x = coords.x;
            self.zoom.mouseCoords.y = coords.y;
            self.zoom.x = self.inBounds(coords.x, self.src.offsetWidth);
            self.zoom.y = self.inBounds(coords.y, self.src.offsetHeight);
        });
        this.src.addEventListener("mouseenter", () => {
            self.zoom.src.classList.remove("d-none");
        });
        this.src.addEventListener("mouseleave", () => {
            self.zoom.src.classList.add("d-none");
        });
    }
    getInternal(arg) {
        return this.src.querySelector(arg);
    }
    inBounds(given, compare) {
        if (given + this.zoom.src.offsetWidth >= compare)
            return compare - this.zoom.src.offsetWidth;
        else if (given <= 0) return 0;
        else return given;
    }
}
class Product {
    name;
    price;
    details;
    rating;
    reviews;
    images;
    related;
    constructor(name, price, details, rating, reviews, images, related) {
        (this.name = name),
            (this.price = price),
            (this.details = details.split("/")),
            (this.rating = rating),
            (this.reviews = reviews.split("/")),
            (this.images = images.split("&")),
            (this.related = related.split("/")),
            (this.starSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`),
            (this.halfStarSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
  <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
</svg>`),
            (this.emptyStarSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>`);
        this.init();
    }
    init() {
        for (let i = 0; i < this.reviews.length; i++) {
            let r = this.reviews[i];
            if (!r.includes("  ")) continue;
            r = r.split("  ");
            r = [r[0], r.slice(1).join("")];
            this.reviews[i] = r;
        }
        let avg = 0;
        this.reviews.forEach((e) => (avg += Number(e[0])));
        avg = avg / this.reviews.length;
        this.rating = avg;
    }
    build(destination) {
        const column = create(
            "div",
            `${this.name}`,
            "col-12",
            "col-sm-6",
            "col-md-4",
            "col-xl-3"
        );
        const card = create("div", `${this.name}_card`, "product_card");
        let name = this.name;
        if (this.name.includes(" ")) name = this.name.split(" ")[1];
        let carousel = new autoCarousel(this.images);
        carousel = carousel.elem(this, name);
        card.append(carousel);
        let content = create("div", "", "content");
        let heading = create("p", "", "heading");
        heading.textContent = this.name;
        content.append(heading);
        let rating = create("div", "", "card-rating");
        let count = new Array(2).fill(0);
        if (this.rating > 0 && Number.isFinite(+this.rating) == true) {
            if (this.rating % 1 == 0) count[0] = this.rating;
            else {
                count[0] = Math.floor(this.rating);
                count[1] = this.rating - count[0];
            }
            for (let i = 0; i < count[0]; i++) {
                let star = create("span", "", "star", "full-star");
                star.insertAdjacentHTML("afterbegin", this.starSVG);
                rating.append(star);
            }
            if (count[1] != 0) {
                let halfStar = create("span", "", "star", "half-star");
                halfStar.insertAdjacentHTML("afterbegin", this.halfStarSVG);
                rating.append(halfStar);
            }
            for (let i = 0; i < 5 - Math.ceil(this.rating); i++) {
                let emptyStar = create("span", "", "star", "empty-star");
                emptyStar.insertAdjacentHTML("afterbegin", this.emptyStarSVG);
                rating.append(emptyStar);
            }
        }
        let reviewCount = create("span", "", "reviewCount");
        reviewCount.textContent = `Based on ${this.reviews.length} reviews`;
        rating.append(reviewCount);
        content.append(rating);
        let price = create("h2", "", "card-price");
        price.textContent = this.price;
        content.append(price);
        let seeMore = create("div", `${name}_seeMore`, "see-more");
        seeMore.textContent = "Click to see more";
        seeMore.addEventListener("click", () => {
            document.querySelector(`#grayBG${name}`).classList.remove("d-none");
            document.querySelector(`#container${name}`).classList.remove("d-none");
        });
        content.append(seeMore);
        card.append(content);
        column.append(card);
        destination.append(column);
        const carouselElement = document.getElementById(`carousel_${name}`);
        new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            ride: "carousel",
        });
    }
    buildInfo(destination) {
        const self = this;
        let name = this.name;
        if (this.name.includes(" ")) name = this.name.split(" ")[1];
        const bg = create("div", `grayBG${name}`, "grayBG", "d-none");
        bg.addEventListener("click", () => {
            document.querySelector(`#grayBG${name}`).classList.add("d-none");
            document.querySelector(`#container${name}`).classList.add("d-none");
        });
        const container = create(
            "div",
            `container${name}`,
            "info-container",
            "d-none"
        );
        const body = create("div", "", "info-body");
        container.append(body);
        destination.append(container);
        destination.append(bg);
        //
        const imgSection = create("div", "", "info-section", "info-img");
        const contentSection = create("div", "", "info-section", "info-content");
        body.append(imgSection);
        body.append(contentSection);
        //
        const logoImg = create("img", "", "info-logo");
        logoImg.src = "imgs/Alternate Logo 1.png";
        contentSection.append(logoImg);
        let rating = create("div", "", "card-rating");
        let count = new Array(2).fill(0);
        if (this.rating > 0 && Number.isFinite(+this.rating) == true) {
            if (this.rating % 1 == 0) count[0] = this.rating;
            else {
                count[0] = Math.floor(this.rating);
                count[1] = this.rating - count[0];
            }
            for (let i = 0; i < count[0]; i++) {
                let star = create("span", "", "star", "full-star");
                star.insertAdjacentHTML("afterbegin", this.starSVG);
                rating.append(star);
            }
            if (count[1] != 0) {
                let halfStar = create("span", "", "star", "half-star");
                halfStar.insertAdjacentHTML("afterbegin", this.halfStarSVG);
                rating.append(halfStar);
            }
            for (let i = 0; i < 5 - Math.ceil(this.rating); i++) {
                let emptyStar = create("span", "", "star", "empty-star");
                emptyStar.insertAdjacentHTML("afterbegin", this.emptyStarSVG);
                rating.append(emptyStar);
            }
        }
        let reviewCount = create("a", "", "reviewCount");
        reviewCount.href = `#${name}Reviews`;
        reviewCount.textContent = `Based on ${this.reviews.length} reviews`;
        rating.append(reviewCount);
        rating.setAttribute("data-bs-toggle", "tooltip");
        rating.setAttribute(
            "data-bs-title",
            `${Math.round(self.rating * 10) / 10} stars`
        );
        contentSection.append(rating);
        const h1 = create("h1", "", "info-heading");
        h1.textContent = this.name;
        contentSection.append(h1);
        contentSection.append(create("hr"));
        let X = create("span", "", "closeBtn");
        X.insertAdjacentHTML(
            "afterbegin",
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>`
        );
        X.addEventListener("click", () => {
            document.querySelector(`#grayBG${name}`).classList.add("d-none");
            document.querySelector(`#container${name}`).classList.add("d-none");
        });
        contentSection.append(X);
        //
        const detailsList = create("ul", "", "detailsList");
        const details = Array.from({ length: self.details.length }, (_, i) => {
            let elem = create("li", "", "info-details");
            elem.textContent = self.details[i];
            return elem;
        });
        details.forEach((e) => detailsList.append(e));
        contentSection.append(detailsList);
        const cartBtnContainer = create("div", "", "cartBtnContainer");
        const cartBtn = create("div", "", "info-cartBtn");
        cartBtnContainer.append(cartBtn);
        cartBtn.textContent = "Add to Cart";
        contentSection.append(cartBtnContainer);
        //
        const mainImg = {
            src: create("div", "", "info-mainImg"),
            _bg: undefined,
            zoom: undefined,
            get bg() {
                return this._bg;
            },
            set bg(arg) {
                this.src.setAttribute(
                    "style",
                    `background: url(${arg}); background-size: 125% 100%;`
                );
                this._bg = arg;
                this.zoom = new imgZoom(this.src, 4);
            },
        };
        imgSection.append(mainImg.src);
        mainImg.bg = this.images[0];
        const subImageDiv = create("div", "", "info-subImgs");
        imgSection.append(subImageDiv);
        for (let i = 1; i < this.images.length; i++) {
            let subImg = create("img", "", "subImg");
            subImg.src = this.images[i];
            subImg.setAttribute(
                "style",
                `width: ${100 / (this.images.length - 1)}%;`
            );
            subImg.addEventListener("click", () => {
                let temp = subImg.src;
                subImg.src = mainImg.bg;
                mainImg.bg = temp;
            });
            subImageDiv.append(subImg);
        }
        //
        contentSection.append(create("hr"));
        const alternate = create("div", "", "info-alternate");
        contentSection.append(alternate);
        contentSection.append(create("hr", `${name}Reviews`));
        const reviewContainer = create("ul", "", "reviewContainer");
        const reviews = Array.from({ length: self.reviews.length }, (_, i) => {
            const elem = create("li", "", "review");
            const stars = create("span", "", "reviewStars");
            let num = Number(self.reviews[i][0]);
            let [whole, part] = [num - (num % 1), num % 1];
            for (let i = 0; i < whole; i++) {
                let star = create("span", "", "info-star");
                star.insertAdjacentHTML("afterbegin", self.starSVG);
                stars.append(star);
            }
            if (part > 0) {
                const halfStar = create("span", "", "info-star");
                halfStar.insertAdjacentHTML("afterbegin", self.halfStarSVG);
                stars.append(star);
            }
            for (let q = 0; q < 5 - Math.ceil(self.reviews[i][0]); q++) {
                let emptyStar = create("span", "", "info-star");
                emptyStar.insertAdjacentHTML("afterbegin", self.emptyStarSVG);
                stars.append(emptyStar);
            }
            stars.setAttribute("data-bs-toggle", "tooltip");
            stars.setAttribute(
                "data-bs-title",
                `${Math.round(self.reviews[i][0] * 10) / 10} stars`
            );
            elem.append(stars);
            elem.append(`: ${self.reviews[i][1]}`);
            return elem;
        });
        reviews.forEach((r) => reviewContainer.append(r));
        contentSection.append(reviewContainer);
        //
        let altSet = PRODUCTS.list;
        let i1 = Math.floor(Math.random() * altSet.length);
        let i2 = Math.floor(Math.random() * altSet.length);
        while (i2 == i1) i2 = Math.floor(Math.random() * altSet.length);
        let i3 = Math.floor(Math.random() * altSet.length);
        while (i3 == i2 || i3 == i1) i3 = Math.floor(Math.random() * altSet.length);
        PRODUCTS.list[i1].build(alternate);
        PRODUCTS.list[i2].build(alternate);
        PRODUCTS.list[i3].build(alternate);
    }
}
class autoCarousel {
    imgs;
    constructor(imgs) {
        this.imgs = imgs;
    }
    elem(param, name) {
        const body = create(
            "div",
            `carousel_${name}`,
            "carousel",
            "slide",
            "carousel-fade"
        );
        body.setAttribute("data-bs-ride", "carousel");
        const inner = create("div", "", "carousel-inner");
        param.images.forEach((e, i) => {
            let item = create("div", "", "carousel-item");
            let img = create("img", "", "d-block", "w-100");
            img.src = e;
            if (i == 0) item.classList.add("active");
            item.append(img);
            inner.append(item);
        });
        body.append(inner);
        return body;
    }
}
const PRODUCTS = {
    list: [],
    results: [],
    init() {
        fetch("products.txt")
            .then((response) => response.text())
            .then((data) => {
                data.split("^").forEach((e) => {
                    this.list.push(new Product(...e.split("@")));
                });
                this.list.forEach((e) => {
                    e.init();
                    e.build(document.getElementById("cardRow"));
                });
                this.list.forEach((e) => e.buildInfo(document.body));
                const tooltipTriggerList = document.querySelectorAll(
                    '[data-bs-toggle="tooltip"]'
                );
                const tooltipList = [...tooltipTriggerList].map(
                    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
                );
            })
            .catch((error) => alert(error));
    },
};
const CART = {
    add(param) {
        console.log("added", param);
    },
};
function create(tag, id = "", ...classes) {
    let elem = document.createElement(tag);
    if (id) elem.id = id;
    if (classes.length > 0) elem.classList.add(...classes);
    return elem;
}
HTMLElement.prototype.add = function (...args) {
    args.forEach((e) => this.append(args));
    return this;
};
PRODUCTS.init();