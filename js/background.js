const images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img"); // js에서 html element 사용

bgImage.src = `img/${chosenImage}`;
bgImage.classList.add("bgImage");
document.body.prepend(bgImage);
