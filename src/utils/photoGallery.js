export function nextImageInProductGallery(image) {
    const productContainer = image.parentElement;
    const nextImage = image.nextElementSibling;
    if (nextImage) {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        nextImage.style.display = 'block';
        nextImage.style.animation = 'fadeIn 0.5s ease-in-out';
    } else {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        productContainer.firstElementChild.style.display = 'block';
        productContainer.firstElementChild.style.animation = 'fadeIn 0.5s ease-in-out';
    }
}

export function previousImageInProductGallery(image) {
    const productContainer = image.parentElement;
    const previousImage = image.previousElementSibling;
    if (previousImage) {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        previousImage.style.display = 'block';
        previousImage.style.animation = 'fadeIn 0.5s ease-in-out';
    } else {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        productContainer.lastElementChild.style.display = 'block';
        productContainer.lastElementChild.style.animation = 'fadeIn 0.5s ease-in-out';
    }
}