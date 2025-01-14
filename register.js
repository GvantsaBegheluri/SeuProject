const form = document.querySelector('.registration-form');
const emailInput = document.getElementById('email');

form.addEventListener('submit', function(event) {
    const email = emailInput.value;

    if (!validateEmail(email)) {
        event.preventDefault(); // Prevent form submission
        alert('ელ.ფოსტა არ არის ვალიდური. გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა.');
    }
});

function validateEmail(email) {
    const atIndex = email.indexOf('@');

    // Check if @ exists and is not the first character
    if (atIndex < 1) {
        return false;
    }

    const dotIndex = email.indexOf('.', atIndex);

    // Check if . exists after @ and has at least 2 characters after it
    if (dotIndex <= atIndex + 1 || dotIndex >= email.length - 2) {
        return false;
    }

    return true;
}