// Book Appointment Form Validation
const bookForm = document.querySelector(".book-form");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCdyb3Fa8F_2JZfhgHAcRDknMCy0onBgq4",
    authDomain: "mydoc-1aa7e.firebaseapp.com",
    projectId: "mydoc-1aa7e",
    storageBucket: "mydoc-1aa7e.appspot.com",
    messagingSenderId: "103320563639",
    appId: "1:103320563639:web:38fc2f12fa8ac945704232",
    measurementId: "G-DPHJMKERT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


bookForm.addEventListener("submit", (e) => {
  const name = document.querySelector("#patient-name");
  const email = document.querySelector("#patient-email");
  const phone = document.querySelector("#patient-phone");
  const date = document.querySelector("#appointment-date");
  const time = document.querySelector("#appointment-time");
  const doctor = document.querySelector("#doctor-name");
  let isValid = true;

  // Clear previous errors
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());

  // Validation checks
  if (!name.value.trim()) {
    showError(name, "Name is required.");
    isValid = false;
  }

  if (!email.value.trim() || !validateEmail(email.value.trim())) {
    showError(email, "Valid email is required.");
    isValid = false;
  }

  if (!phone.value.trim() || phone.value.length < 10) {
    showError(phone, "Valid phone number is required.");
    isValid = false;
  }

  if (!date.value.trim()) {
    showError(date, "Appointment date is required.");
    isValid = false;
  }

  if (!time.value.trim()) {
    showError(time, "Appointment time is required.");
    isValid = false;
  }

  if (!doctor.value.trim()) {
    showError(doctor, "Please select a doctor.");
    isValid = false;
  }

  if (!isValid) {
    e.preventDefault();
  }
});

// Helper function to show error messages
function showError(inputField, message) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-message");
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "0.9rem";
  errorDiv.textContent = message;
  inputField.parentElement.appendChild(errorDiv);
}

// Email validation function
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Fetch doctors nearby based on geolocation
function fetchDoctorsNearby() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Simulating API call (replace with actual backend endpoint)
      const doctors = [
        { name: "Dr. John Doe", specialization: "Cardiologist", location: "2 km away" },
        { name: "Dr. Jane Smith", specialization: "Dentist", location: "1.5 km away" },
        { name: "Dr. Emily Brown", specialization: "Orthopedic", location: "3 km away" },
      ];

      const doctorsList = document.getElementById("doctors-list");
      doctorsList.innerHTML = ""; // Clear any previous list

      doctors.forEach((doc) => {
        const card = document.createElement("div");
        card.className = "doctor-card";
        card.innerHTML = `
          <h3>${doc.name}</h3>
          <p>${doc.specialization}</p>
          <p>${doc.location}</p>
        `;
        doctorsList.appendChild(card);
      });
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Call the fetchDoctorsNearby function when the page loads
document.addEventListener("DOMContentLoaded", fetchDoctorsNearby);
