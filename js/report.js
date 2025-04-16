function validateForm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    
    document.querySelectorAll("input, textarea").forEach(element => {
        element.classList.remove("invalid");
    });
    
    if (name === "" || name.length < 2) {
        alert("Please enter a valid name (minimum 2 characters)");
        document.getElementById("name").classList.add("invalid");
        document.getElementById("name").focus();
        return false;
    }
    
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number");
        document.getElementById("phone").classList.add("invalid");
        document.getElementById("phone").focus();
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        document.getElementById("email").classList.add("invalid");
        document.getElementById("email").focus();
        return false;
    }
    
    if (message === "" || message.length < 10) {
        alert("Please enter a message (minimum 10 characters)");
        document.getElementById("message").classList.add("invalid");
        document.getElementById("message").focus();
        return false;
    }

    const fileInput = document.getElementById("img");
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (!file.type.match("image.*")) {
            alert("Please upload an image file only");
            return false;
        }
        const maxSize = 5 * 1024 * 1024; 
        if (file.size > maxSize) {
            alert("File size should be less than 5MB");
            return false;
        }
    }
    
    showModal();
    return false;
}

function showModal() {
    document.getElementById("confirmationModal").style.display = "block";
    document.body.style.overflow = "hidden"; 
}

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
    document.body.style.overflow = "auto"; 
    document.getElementById("contactForm").reset();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("email").addEventListener("blur", function() {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email !== "" && !emailRegex.test(email)) this.classList.add("invalid"); 
        else this.classList.remove("invalid");

    });
    
    document.getElementById("phone").addEventListener("blur", function() {
        const phone = this.value.trim();
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        
        if (phone !== "" && !phoneRegex.test(phone)) this.classList.add("invalid");
        else this.classList.remove("invalid");
    });

    window.onclick = function(event) {
        const modal = document.getElementById("confirmationModal");
        if (event.target === modal) closeModal();
    };
});