document.addEventListener('DOMContentLoaded', function() {
    const flashMessage = document.querySelector('.flash-message');
    if (flashMessage) {
        setTimeout(() => {
            flashMessage.style.opacity = 0;
            setTimeout(() => {
                flashMessage.style.display = 'none';
            }, 500); // Match this with the transition time
        }, 5000); // Display for 5 seconds
    }
});