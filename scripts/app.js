// FitConnect Application Logic

// 1. Workout Data & Dynamic Rendering
const workoutPlans = [
  {
    title: 'Fat Loss Starter',
    difficulty: 'beginner',
    duration: '4 Weeks',
    frequency: '3 Days/Week',
    image: 'images/workout1.jpg',
    desc: 'A gentle introduction to cardio and light resistance exercises designed to burn fat and build stamina.'
  },
  {
    title: 'Full Body Sculpt',
    difficulty: 'beginner',
    duration: '6 Weeks',
    frequency: '3 Days/Week',
    image: 'images/workout2.jpg',
    desc: 'Tone your body and build functional strength using dumbbells and basic bodyweight movements.'
  },
  {
    title: 'Advanced Hypertrophy',
    difficulty: 'advanced',
    duration: '8 Weeks',
    frequency: '5 Days/Week',
    image: 'images/workout3.jpg',
    desc: 'High-volume muscle building routine for experienced lifters looking to maximize hypertrophy.'
  },
  {
    title: 'HIIT Conditioning',
    difficulty: 'advanced',
    duration: '4 Weeks',
    frequency: '4 Days/Week',
    image: 'images/workout4.jpg',
    desc: 'Intense metabolic conditioning workouts designed to push cardiorespiratory endurance limits.'
  }
];

function renderWorkouts(filter = 'all') {
  const container = document.querySelector('.workout-plans');
  if (!container) return;
  
  container.innerHTML = '';
  
  const filteredPlans = workoutPlans.filter(plan => {
    return filter === 'all' || plan.difficulty === filter;
  });
  
  filteredPlans.forEach(plan => {
    const card = document.createElement('div');
    card.className = `workout-card ${plan.difficulty}`;
    card.innerHTML = `
      <div class="workout-img">
        <img src="${plan.image}" alt="${plan.title}">
      </div>
      <div class="workout-info">
        <span class="difficulty-badge ${plan.difficulty}">${plan.difficulty}</span>
        <h3 style="margin-top: 0.5rem;">${plan.title}</h3>
        <p style="color: #4a5568; font-size: 0.9rem; margin-bottom: 1rem;">${plan.desc}</p>
        <div class="workout-details">
          <span>⏱ ${plan.duration}</span>
          <span>📅 ${plan.frequency}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// 2. Workout Filtering Event Listeners
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    renderWorkouts(filter);
  });
});

// 3. Hamburger Menu Control
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  
  // Close menu when a navigation item is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// 4. Sticky Header Navigation Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// 5. Booking Modal Logic
const bookingModal = document.getElementById('booking-modal');
const closeModalBtn = document.querySelector('.close-modal');
const sessionTrainerSelect = document.querySelector('.modal-content select');
const sessionDateInput = document.getElementById('session-date');
const timeSlotsContainer = document.querySelector('.time-slots');
const selectedTimeInput = document.querySelector('.modal-content input[type="hidden"]');
const bookingForm = document.querySelector('.modal-content form');

// Set minimum date for booking as today
if (sessionDateInput) {
  const today = new Date().toISOString().split('T')[0];
  sessionDateInput.min = today;
}

const openModal = (trainerName = '') => {
  if (!bookingModal) return;
  bookingModal.style.display = 'flex';
  
  if (trainerName && sessionTrainerSelect) {
    sessionTrainerSelect.value = trainerName;
  }
};

const closeModal = () => {
  if (!bookingModal) return;
  bookingModal.style.display = 'none';
  // Reset form and selected slot styles
  if (bookingForm) {
    bookingForm.reset();
  }
  if (timeSlotsContainer) {
    const activeSlots = timeSlotsContainer.querySelectorAll('.time-btn');
    activeSlots.forEach(btn => btn.classList.remove('selected'));
  }
  if (selectedTimeInput) {
    selectedTimeInput.value = '';
  }
};

// Hook view schedule buttons
document.body.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('book-btn')) {
    e.preventDefault();
    const trainerName = e.target.getAttribute('data-trainer') || '';
    openModal(trainerName);
  }
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside content area
if (bookingModal) {
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeModal();
    }
  });
}

// Header and Hero CTAs booking triggers
const navBookBtn = document.querySelector('.navbar .btn-primary');
const ctaFindTrainer = document.querySelector('.cta-buttons .btn-primary');
const ctaViewPlans = document.querySelector('.cta-buttons .btn-secondary');

if (navBookBtn) {
  navBookBtn.addEventListener('click', () => openModal());
}

if (ctaFindTrainer) {
  ctaFindTrainer.addEventListener('click', () => {
    document.getElementById('trainers').scrollIntoView({ behavior: 'smooth' });
  });
}

if (ctaViewPlans) {
  ctaViewPlans.addEventListener('click', () => {
    document.getElementById('workouts').scrollIntoView({ behavior: 'smooth' });
  });
}

// 6. Time Slot Buttons Event Handling
if (timeSlotsContainer) {
  timeSlotsContainer.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('time-btn')) {
      e.preventDefault();
      
      // Remove selection class from others
      const buttons = timeSlotsContainer.querySelectorAll('.time-btn');
      buttons.forEach(btn => btn.classList.remove('selected'));
      
      // Add selection to clicked
      e.target.classList.add('selected');
      
      // Set input value
      if (selectedTimeInput) {
        selectedTimeInput.value = e.target.getAttribute('data-time');
      }
    }
  });
}

// 7. Form Validation & Processing
function validateForm() {
  const trainer = sessionTrainerSelect.value;
  const date = sessionDateInput.value;
  const time = selectedTimeInput.value;
  
  if (!trainer) {
    alert('Please select a trainer.');
    return false;
  }
  
  if (!date) {
    alert('Please select a session date.');
    return false;
  }
  
  if (!time) {
    alert('Please select an available time slot.');
    return false;
  }
  
  return true;
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const trainerName = sessionTrainerSelect.value;
    const sessionDate = sessionDateInput.value;
    const sessionTime = selectedTimeInput.value;
    
    alert(`Booking Confirmed!\nTrainer: ${trainerName}\nDate: ${sessionDate}\nTime: ${sessionTime}\nWe will contact you shortly.`);
    closeModal();
  });
}

// Initial workouts render on load
document.addEventListener('DOMContentLoaded', () => {
  renderWorkouts('all');
});
