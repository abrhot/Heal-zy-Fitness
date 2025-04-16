// Search functionality
const searchInput = document.querySelector('.search-input');
const mealCards = document.querySelectorAll('.meal-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    mealCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('ul').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.textContent.toLowerCase();
        
        mealCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const cardType = card.getAttribute('data-type');
                if (cardType === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// View Details button functionality
const viewDetailsButtons = document.querySelectorAll('.view-details-button');

viewDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mealPlan = button.closest('.meal-card');
        const planTitle = mealPlan.querySelector('h3').textContent;
        
        // Here you can implement the logic to show more details
        // For example, open a modal or navigate to a detailed page
        console.log(`Viewing details for: ${planTitle}`);
    });
}); 