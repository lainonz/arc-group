const galleryImages = [
  "https://picsum.photos/400",
  "https://picsum.photos/500",
  "https://picsum.photos/600",
  "https://picsum.photos/700",
  "https://picsum.photos/800",
  "https://picsum.photos/900",
  "https://picsum.photos/1000",
];

const galleryContainer = document.getElementById("gallery-container");

// Function to create gallery items
function createGalleryItems() {
  galleryImages.forEach((image) => {
    const galleryItem = document.createElement("div");
    galleryItem.className =
      "min-w-[300px] h-64 bg-[#06060a] rounded-xl overflow-hidden group";
    galleryItem.innerHTML = `
          <img src="${image}" alt="Gallery Image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      `;
    galleryContainer.appendChild(galleryItem);
  });
}

// Create the initial gallery items
createGalleryItems();

// Clone the items and add them again to create the infinite effect
const cloneItems = () => {
  const items = galleryContainer.querySelectorAll("div");
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    galleryContainer.appendChild(clone);
  });
};

// Clone the items
cloneItems();

// Add draggable scroll functionality
let isDown = false;
let startX;
let scrollLeft;

galleryContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  galleryContainer.style.animationPlayState = "paused";
  galleryContainer.style.cursor = "grabbing";
  startX = e.pageX - galleryContainer.offsetLeft;
  scrollLeft = galleryContainer.scrollLeft;
});

galleryContainer.addEventListener("mouseleave", () => {
  isDown = false;
  galleryContainer.style.cursor = "grab";
  if (!galleryContainer.matches(":hover")) {
    galleryContainer.style.animationPlayState = "running";
  }
});

galleryContainer.addEventListener("mouseup", () => {
  isDown = false;
  galleryContainer.style.cursor = "grab";
});

galleryContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - galleryContainer.offsetLeft;
  const walk = (x - startX) * 2; // Adjust scroll speed
  galleryContainer.scrollLeft = scrollLeft - walk;
});

// Additional hover listener to pause animation
galleryContainer.addEventListener("mouseenter", () => {
  galleryContainer.style.animationPlayState = "paused";
  galleryContainer.style.cursor = "grab";
});
