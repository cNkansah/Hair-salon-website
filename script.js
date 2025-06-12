// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    let menuBtn = document.querySelector('#menu-btn');
    let navbar = document.querySelector('.navbar');
    let closeBtn = document.querySelector('#close-navbar');

    menuBtn.addEventListener('click', function() {
        navbar.classList.add('active');
    });

    closeBtn.addEventListener('click', function() {
        navbar.classList.remove('active');
    });

    // Close menu when clicking on a nav link
    let navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        let header = document.querySelector('.header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });



    //phone number validation
    function validatePhoneNumber(phoneNumber){
    return /^(\+?\d{1,3}[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{4}$/.test(phoneNumber);
    }

    //special request word-count
    function countWords(text) {
  // Trim whitespace and split by space/newline/tab
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}


    // Form submission handler
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let clientName= document.getElementById("clientName").value;
            let clientEmail=document.getElementById("clientEmail").value;
            let clientPhone=  document.getElementById("clientPhone").value;

            const selectedService= document.querySelector('#serviceSelect');
            const selectedValue= selectedService.value;

            let SpecialRequest = document.getElementById("SpecRequest").value;
            let wordCount= countWords(SpecialRequest);

            if(wordCount>200){
                 alert("❌ Special Request must be 200 words or less. You have " + wordCount + " words.");
                 return; // stop submission 
            }

            

            console.log(
                "Client Name:" + clientName + '\n',
                 "Client email:" + clientEmail + '\n',
                 "clientPhone:" + clientPhone + '\n',
                 "selectedService:" + selectedValue + '\n',
                 "Special Request:" + SpecialRequest 
            );
            
           if (!validatePhoneNumber(clientPhone)) {
            alert("❌ Invalid phone number. Please enter a valid number.");
            return; // stop form submission
            }

            // Show a success message

            const modal= document.getElementById('confirmationModal');
            modal.style.display= 'block';

            //close modal by clicking
            document.querySelector('close-btn').onclick = function(){
             modal.style.display= 'none';
             bookingForm.reset();   
            }

            //close via background click
            window.onclick= function(e){
                if(e.target === modal){
                    modal.style.display= 'none';
                    bookingForm.reset();
                }
            }
            
        });
    }

    // Add animation classes to elements when they come into view
    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 150) {
                section.classList.add('revealed');
            }
        });
    }

    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
});