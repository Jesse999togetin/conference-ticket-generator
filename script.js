// 1. Grab UI Element Anchors from the Form Container
const ticketForm = document.querySelector('form');
const formContainer = document.getElementById('form-container');
const ticketContainer = document.getElementById('ticket-container');
const errorMessage = document.getElementById("email-error"); // Matched to your updated HTML ID

// 2. Grab UI Element Anchors from the Visual Ticket Card
const ticketUserName = document.getElementById('ticket-user-name');
const ticketUserEmail = document.getElementById('ticket-user-email');
const ticketName = document.getElementById('ticket-name');
const ticketGithub = document.getElementById('ticket-github');

// 3. Grab UI Element Anchors for Avatar Handling
const uploadZone = document.getElementById('upload-zone');
const avatarInput = document.getElementById('avatar-input');
const avatarError = document.getElementById('avatar-error');
const ticketAvatar = document.getElementById('ticket-avatar');

// Global state variable holding the image source path
let uploadedAvatarUrl = "";

// --- SECTION A: NATIVE UPLOAD DROPZONE EMULATION ---
uploadZone.addEventListener('click', function() {
  avatarInput.click();
});

avatarInput.addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;

  // Validate File Size (500KB Max)
  const maxSizeInBytes = 500 * 1024;
  if (file.size > maxSizeInBytes) {
    avatarError.textContent = "❌ File is too large! Maximum allowed size is 500KB.";
    avatarError.className = "form-text text-danger small mt-1";
    this.value = "";
    return;
  }

  // Validate Image Type Spec
  const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    avatarError.textContent = "❌ Invalid format! Please upload an SVG, PNG, or JPG graphic.";
    avatarError.className = "form-text text-danger small mt-1";
    this.value = "";
    return;
  }

  // Success Confirmation Feedback Loop
  avatarError.innerHTML = `<span><img src="assets/images/icon-info.svg" alt=""></span> File accepted successfully!`;
  avatarError.className = "form-text text-success small mt-1";

  // Stream binary file data into a localized text string link
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedAvatarUrl = e.target.result;
  };
  reader.readAsDataURL(file);
});


// --- SECTION B: FORM SUBMISSION & DATA INTERACTION ENGINE ---
ticketForm.addEventListener('submit', function (event) {
  // Prevent browser from refreshing page
  event.preventDefault();

  // 1. Gather current values right at click submission timestamp
  const inputName = document.getElementById('fullName').value;
  const inputEmail = document.getElementById('emailAddress').value;
  const inputGithub = document.getElementById('githubUser').value;

  // 2. THE SECURITY GATEKEEPER: Run form validation checks first!
  if (!inputEmail.includes("@") || !inputEmail.includes(".com")) {
    errorMessage.classList.remove("d-none"); // Project error text element block
    return; // 🛑 HALT EXECUTION: Do not change data, do not switch screens!
  } else {
    errorMessage.classList.add("d-none"); // Clear error if resolution path satisfied
  }

  // 3. DATA PERSISTENCE MAPPING: If it passes, map inputs to the ticket view elements
  ticketUserName.textContent = inputName;       
  ticketName.textContent = inputName;           
  ticketUserEmail.textContent = inputEmail;     
  
  // Format avatar file upload placeholder values securely 
  if (uploadedAvatarUrl !== "") {
    ticketAvatar.src = uploadedAvatarUrl;
  } else {
    ticketAvatar.src = "assets/images/image-avatar.jpg";
  }

  // Format GitHub string values securely
  if (inputGithub.startsWith('@')) {
    ticketGithub.textContent = inputGithub;
  } else {
    ticketGithub.textContent = `@${inputGithub}`;
  }

  // 4. THE VISUAL TRANSITION: Smooth screen layout swap
  formContainer.classList.add('d-none');           
  ticketContainer.classList.remove('d-none');      
  window.scrollTo({ top: 0, behavior: 'smooth' });
});