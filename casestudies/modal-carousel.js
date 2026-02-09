document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('mediaModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const mediaContainer = document.getElementById('mediaContainer');
  const openLinks = document.querySelectorAll('.more-link');

  const mediaItems = [
    { type: 'image', src: 'img/orange/DashboardOpen.jpg', alt: 'Dashboard Open' },
    { type: 'image', src: 'img/orange/DashboardCollapsed.jpg', alt: 'Dashboard Collapsed' },
    { type: 'image', src: 'img/orange/Onboarding.jpg', alt: 'Onboarding' },
    { type: 'video', src: 'videos/demo.mp4', alt: 'Demo Video' }
  ];

  let current = 0;
  let focusableEls = [];
  let lastFocused = null;

  function populateMedia() {
    mediaContainer.innerHTML = '';
    mediaItems.forEach((item, i) => {
      if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        if (i === 0) img.classList.add('active');
        mediaContainer.appendChild(img);
      } else if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        video.alt = item.alt;
        if (i === 0) video.classList.add('active');
        mediaContainer.appendChild(video);
      }
    });
  }

  function updateMedia() {
    const children = [...mediaContainer.children];
    children.forEach((el, i) => {
      el.classList.toggle('active', i === current);
    });
  }

  function openModal(e) {
    e.preventDefault();
    lastFocused = document.activeElement;
    modal.removeAttribute('hidden');
    populateMedia();
    updateMedia();
    trapFocus();
  }

  function closeModal() {
    modal.setAttribute('hidden', true);
    if (lastFocused) lastFocused.focus();
  }

  function prevMedia() {
    current = (current - 1 + mediaItems.length) % mediaItems.length;
    updateMedia();
  }

  function nextMedia() {
    current = (current + 1) % mediaItems.length;
    updateMedia();
  }

  function trapFocus() {
    focusableEls = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    modal.focus();
  }

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab') {
      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', prevMedia);
  nextBtn.addEventListener('click', nextMedia);

  openLinks.forEach(link => {
    link.addEventListener('click', openModal);
  });
});