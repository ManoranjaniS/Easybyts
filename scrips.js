// Form submission handler for the Contact Section
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting normally
  
    // Get values from form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Basic validation to check if all fields are filled
    if (name === '' || email === '' || message === '') {
      alert('Please fill in all fields.');
    } else {
      alert('Message sent successfully!');
      document.getElementById('contact-form').reset(); // Reset the form after submission
    }
  });
  
  // Skill bar animation (on scroll)
  const skillBars = document.querySelectorAll('.skill-bar');
  
  const animateSkills = () => {
    skillBars.forEach(bar => {
      const skillPosition = bar.getBoundingClientRect().top;
      const skillInView = window.innerHeight - skillPosition;
  
      if (skillInView > 150) {
        bar.style.width = bar.getAttribute("data-skill-level");
        bar.classList.add("animate-width");
      }
    });
  };
  
  // Trigger animation when scrolling
  window.addEventListener('scroll', animateSkills);
  
  // Initialize animation on page load
  window.onload = animateSkills;
  