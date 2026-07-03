# FitConnect - Fitness Trainer Booking Website

FitConnect is a fully responsive frontend web application for a fitness trainer booking platform. Users can browse certified trainers, view their schedules and specialties, select available slots to book sessions, and filter workout plans by difficulty level.

## Features

- **Sticky Navigation Bar**: Smooth scrolling navigation with mobile responsive hamburger menu toggle and active page scroll highlighting.
- **Interactive Trainer Cards**: Clean layout featuring specialty description, rating, online availability badges, and interactive "View Schedule" button.
- **Interactive Booking Modal**: Custom-styled booking modal with form controls, active date selection limitation (minimum is today's date), selectable visual time slots, and full client-side validation.
- **Workout Plan Filter**: Dynamically rendered popular workout plans, with instant filtering using "All", "Beginner", and "Advanced" categories.
- **Responsive Layout**: Mobile-first design implementing fluid styling transitions for mobile, tablet, and desktop screens.

## Project Structure

```text
fitness-trainer-website/
├── index.html
├── styles/
│   ├── main.css
│   └── utilities.css
├── scripts/
│   └── app.js
├── images/
│   ├── hero-bg.jpg
│   ├── trainer1-6.jpg
│   └── workout1-4.jpg
└── README.md
```

## How to Run

1. Clone or download the repository files.
2. Open `index.html` directly in any modern web browser.
3. Alternatively, host the root folder using a local development server (e.g., Live Server extension in VS Code, or python server):
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`.
