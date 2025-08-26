const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');
const stars = document.querySelectorAll('.star');
const clearBtn = document.getElementById('clearFeedbacks');
let selectedRating = 0;

// Star rating hover and click functionality
stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value);
        updateStars(selectedRating);
    });
    star.addEventListener('mouseover', () => {
        updateStars(parseInt(star.dataset.value));
    });
    star.addEventListener('mouseout', () => {
        updateStars(selectedRating);
    });
});

function updateStars(rating) {
    stars.forEach(star => {
        star.classList.toggle('selected', parseInt(star.dataset.value) <= rating);
    });
}

// LocalStorage functions
function getFeedbacks() {
    const feedbacks = localStorage.getItem('feedbacks');
    return feedbacks ? JSON.parse(feedbacks) : [];
}

function saveFeedbacks(feedbacks) {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}

// Display feedbacks
function displayFeedbacks() {
    feedbackList.innerHTML = '';
    const feedbacks = getFeedbacks();
    feedbacks.reverse().forEach(fb => {
        const li = document.createElement('li');
        li.innerHTML = `
      <strong>${fb.name}</strong> (${fb.email}) says:<br>
      ${fb.message}<br>
      Rating: ${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}
    `;
        feedbackList.appendChild(li);
    });
}

// Load feedbacks on page load
displayFeedbacks();

// Form submission
feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    if (name && email && feedback && selectedRating > 0) {
        const feedbacks = getFeedbacks();
        feedbacks.push({ name, email, message: feedback, rating: selectedRating });
        saveFeedbacks(feedbacks);
        displayFeedbacks();
        feedbackForm.reset();
        selectedRating = 0;
        updateStars(0);
    } else {
        alert("Please fill all fields and select a rating!");
    }
});

// Clear all feedbacks
clearBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all feedbacks?")) {
        localStorage.removeItem('feedbacks');
        displayFeedbacks();
    }
});
