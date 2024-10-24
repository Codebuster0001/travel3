import { cardDiscover } from './data.js';

// Toggle the navigation menu
document.querySelector('.nav_hambuger').addEventListener('click', () => {
  document.querySelector('.nav_links').classList.toggle('active');
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.querySelector('.btn_previous');
  const nextButton = document.querySelector('.btn_next');
  const carouselInner = document.querySelector('.carousel_inner');
  const cards = document.querySelectorAll('.card');
  let currentIndex = 0;

  const totalCards = cards.length;

  // Function to show a specific card based on index
  const showCard = (index) => {
    const cardWidth = cards[0]?.offsetWidth || 0; // Handle potential undefined error
    const offset = -index * cardWidth;
    carouselInner.style.transform = `translateX(${offset}px)`;
    updateButtons();
  };

  // Function to update button states based on the current index
  const updateButtons = () => {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalCards - 1;
  };

  // Event listener for the previous button
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      showCard(currentIndex);
    }
  });

  // Event listener for the next button
  nextButton.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
      currentIndex += 1;
      showCard(currentIndex);
    }
  });

  // Update card display on window resize
  window.addEventListener('resize', () => {
    showCard(currentIndex);
  });

  // Initial card display
  showCard(currentIndex);
});

// Load more posts functionality
document.addEventListener('DOMContentLoaded', () => {
  const loadMoreBtn = document.getElementById('loadMore');
  const mainContent = document.querySelector('.main-content');

  loadMoreBtn.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
      const newPost = document.createElement('div');
      newPost.classList.add('post');
      newPost.innerHTML = `
        <h2>New Travel Post</h2>
        <p>Share your new travel experiences and tips here.</p>
      `;
      mainContent.insertBefore(newPost, loadMoreBtn);
    }
  });
});

// Contact form functionality
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const modal = document.getElementById('thankYouModal');
  const closeModalButton = document.getElementsByClassName('close')[0];

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      modal.style.display = 'block'; // Show the modal
      contactForm.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });

  // Close modal on click
  closeModalButton.onclick = () => {
    modal.style.display = 'none';
  };

  // Close modal on outside click
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});

// Create and display cards
// Create and display cards
const cardContainer = document.getElementById('card-container');

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
};

const createCards = () => {
  const fragment = document.createDocumentFragment();
  
  // Shuffle the cardDiscover array
  const shuffledCards = [...cardDiscover]; // Create a copy of the array
  shuffleArray(shuffledCards); // Shuffle the copied array

  // Select the first 4 cards
  const cardsToDisplay = shuffledCards.slice(0, 4);

  // Create card elements for the selected cards
  cardsToDisplay.forEach(({ card: { image, content } }) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    
    

    cardElement.innerHTML = `
      <div class="card_image">
        <img src="${image.src}" alt="${image.alt}">
      </div>
      <div class="card_content">
        <h1 class="sub_card_heading">${content.heading}</h1>
        <p class="sub_card_para">${content.paragraph}</p>
        <a href="${content.link}" class="read_more" target="_blank">Read More</a> <!-- Add Read More link -->
      </div>
    `;

    // Append card to the fragment
    fragment.appendChild(cardElement);
  });

  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    cardContainer.appendChild(fragment);
  });
};

// Call the function to create cards on page load
document.addEventListener('DOMContentLoaded', createCards);
