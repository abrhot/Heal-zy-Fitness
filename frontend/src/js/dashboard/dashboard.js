function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = document.getElementById('preview');
        preview.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

document.getElementById('profileSetupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerText;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Saving...';

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Profile updated successfully!');
        window.location.href = '/dashboard.html';
    } catch (error) {
        alert('Error updating profile. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerText = originalText;
    }
});
