var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
};

const slider = document.getElementById("rangeInput");
const value1 = document.getElementById("rangeOutput");
value1.textContent = slider.value;
slider.oninput = function () {
  value1.textContent = this.value;
};

const commission = document.getElementById("commissionInput");
const value2 = document.getElementById("commissionOutput");
value2.textContent = commission.value;
commission.oninput = function () {
  value2.textContent = this.value;
};

// corousel

const galleryContainer = document.querySelector(".gallery-container");
const galleryControlsContainer = document.querySelector(".gallery-controls");
const galleryControls = ["previous", "add", "next"];
const galleryItems = document.querySelectorAll(".gallery-item");

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Update css classes for gallery
  updateGallery() {
    this.carouselArray.forEach((el) => {
      el.classList.remove("gallery-item-1");
      el.classList.remove("gallery-item-2");
      el.classList.remove("gallery-item-3");
      el.classList.remove("gallery-item-4");
      el.classList.remove("gallery-item-5");
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {
    if (direction.className == "gallery-controls-previous") {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }

    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach((control) => {
      galleryControlsContainer.appendChild(
        document.createElement("button")
      ).className = `gallery-controls-${control}`;

      document.querySelector(`.gallery-controls-${control}`).innerText =
        control;
    });
  }

  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach((control) => {
      control.addEventListener("click", (e) => {
        e.preventDefault();

        if (control.className == "gallery-controls-add") {
          const newItem = document.createElement("img");
          const latestItem = this.carouselArray.length;
          const latestIndex =
            this.carouselArray.findIndex(
              (item) =>
                item.getAttribute("data-index") == this.carouselArray.length
            ) + 1;

          // Assign the necessary properties for new gallery item
          Object.assign(newItem, {
            className: "gallery-item",
            src: `http://fakeimg.pl/300/?text=${this.carouselArray.length + 1}`,
          });
          newItem.setAttribute("data-index", this.carouselArray.length + 1);

          // Then add it to the carouselArray and update the gallery
          this.carouselArray.splice(latestIndex, 0, newItem);
          document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
          this.updateGallery();
        } else {
          this.setCurrentState(control);
        }
      });
    });
  }
}

const exampleCarousel = new Carousel(
  galleryContainer,
  galleryItems,
  galleryControls
);

exampleCarousel.setControls();
// exampleCarousel.setNav();
exampleCarousel.useControls();
