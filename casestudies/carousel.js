document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("modal-image");
  const openGalleryLinks = document.querySelectorAll(".open-gallery");
  const prevBtn = document.querySelector(".modal-prev");
  const nextBtn = document.querySelector(".modal-next");
  const closeBtn = document.querySelector(".modal-close");

  let images = [];
  let currentIndex = 0;

  openGalleryLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      images = JSON.parse(link.dataset.gallery);
      currentIndex = 0;
      showImage();
      modal.classList.add("show");
    });
  });

  function showImage() {
    modalImage.src = images[currentIndex];
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    modalImage.src = "";
  });

  document.addEventListener("keydown", e => {
    if (!modal.classList.contains("show")) return;
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "Escape") closeBtn.click();
  });
});