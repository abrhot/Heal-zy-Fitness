const wrapper = document.querySelector('.wrapper')
const registerLink = document.querySelector('.register-link')
const loginLink = document.querySelector('.login-link')

registerLink.onclick = () => {
    wrapper.classList.add('active')
}

loginLink.onclick = () => {
    wrapper.classList.remove('active')
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('button');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'md:hidden fixed top-16 left-0 w-full bg-gray-900 py-4 px-4 hidden';
    mobileMenu.innerHTML = `
        <a href="#" class="block py-2 text-white hover:text-green-400">Home</a>
        <a href="#" class="block py-2 text-white hover:text-green-400">Profile Setup</a>
        <a href="#" class="block py-2 text-white hover:text-green-400">Track Management</a>
        <a href="#" class="block py-2 text-white hover:text-green-400">Contact</a>
        <a href="#" class="block py-2 text-white hover:text-green-400">Login / Signup</a>
    `;
    document.body.appendChild(mobileMenu);

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            weight: document.getElementById('weight').value,
            height: document.getElementById('height').value,
            bloodType: document.getElementById('bloodType').value,
            fitnessGoal: document.getElementById('fitnessGoal').value,
            healthConditions: document.getElementById('healthConditions').value
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Store form data in localStorage
        localStorage.setItem('userData', JSON.stringify(formData));
        
        // Redirect to plan selection page
        window.location.href = 'plan selection.html';
    });
    
    function validateForm(data) {
        // Basic validation
        if (!data.fullName || data.fullName.trim() === '') {
            alert('Please enter your full name');
            return false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        if (!data.password || data.password.length < 6) {
            alert('Password must be at least 6 characters long');
            return false;
        }
        
        if (!data.age || data.age < 13 || data.age > 100) {
            alert('Please enter a valid age between 13 and 100');
            return false;
        }
        
        if (!data.gender) {
            alert('Please select your gender');
            return false;
        }
        
        if (!data.weight || data.weight < 20 || data.weight > 300) {
            alert('Please enter a valid weight between 20kg and 300kg');
            return false;
        }
        
        if (!data.height || data.height < 100 || data.height > 250) {
            alert('Please enter a valid height between 100cm and 250cm');
            return false;
        }
        
        if (!data.bloodType) {
            alert('Please select your blood type');
            return false;
        }
        
        if (!data.fitnessGoal) {
            alert('Please select your fitness goal');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});