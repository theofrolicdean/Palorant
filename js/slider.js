// Maps Slider
let items = document.querySelectorAll(".slider__item");
let next = document.querySelector(".slider__next");
let prev = document.querySelector(".slider__prev");
let thumbnails = document.querySelectorAll(".thumbnail__item");
let countItem = items.length;
let itemActive = 0;


next.onclick = function() {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) itemActive = 0;
    showSlider();
}

prev.onclick = function() {
    itemActive = itemActive - 1;
    if(itemActive < 0) itemActive = countItem - 1;
    showSlider();
}

let refreshInterval = setInterval(() => {
    next.click();
}, 5000)

function showSlider(){
    let itemActiveOld = document.querySelector(".slider__item.slider-active");
    let thumbnailActiveOld = document.querySelector(".thumbnail__item.slider-active");
    itemActiveOld.classList.remove("slider-active");
    thumbnailActiveOld.classList.remove("slider-active");

    items[itemActive].classList.add("slider-active");
    thumbnails[itemActive].classList.add("slider-active");
    setPositionThumbnail();
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

function setPositionThumbnail () {
    let thumbnailActive = document.querySelector(".thumbnail .item.slider-active");
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) 
        thumbnailActive.scrollIntoView({ behavior: "smooth", inline: "nearest" });
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        itemActive = index;
        showSlider();
    })
})
