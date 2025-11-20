document.addEventListener('DOMContentLoaded', function () {

    const contactForm = document.getElementById('contactForm');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            e.stopPropagation();
            contactForm.classList.add('was-validated');
            return;
        }

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            product: document.getElementById('product').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML =
            '<span class="spinner-border spinner-border-sm" role="status"></span> Sending...';
        submitButton.disabled = true;

        setTimeout(function () {

            successAlert.style.display = 'block';
            errorAlert.style.display = 'none';

            contactForm.reset();
            contactForm.classList.remove('was-validated');

            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            sendWhatsAppNotification(formData);

            successAlert.scrollIntoView({ behavior: 'smooth' });

        }, 2000);
    });

 function sendWhatsAppNotification(formData) {
    // Nomor WhatsApp tujuan — wajib format internasional tanpa nol
    const phoneNumber = "6289516033586";

    const message = `New Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Product: ${formData.product}
Subject: ${formData.subject}
Message: ${formData.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    console.log("WhatsApp Notification URL:", whatsappURL);

    // Jika ingin membuka WhatsApp langsung (opsional):
    // window.open(whatsappURL, "_blank");
}
});
