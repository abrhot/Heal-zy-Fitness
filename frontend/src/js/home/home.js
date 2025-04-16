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