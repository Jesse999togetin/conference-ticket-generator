# 🎟️ Conference Ticket Generator

A dynamic, fully responsive conference ticket generator interface built using **HTML5, CSS3 (Modular Architecture), Bootstrap 5, and Vanilla JavaScript**. This project features client-side state management, responsive background layouts, and real-time DOM updates.

## 🚀 Live Demo
*(We will paste your GitHub Pages link right here in the next step!)*

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** Bootstrap 5 (Responsive utility classes & layouts)
- **Styling:** Custom CSS3 utilizing a highly structured **Modular Architecture** layout hierarchy (Global -> Form Components -> Ticket Modules) for clean maintenance.
- **Interactivity:** Vanilla JavaScript (ES6+) focusing on DOM Manipulation and data persistence mapping.
- **Fonts & Typography:** Intercoded using the 'Inconsolata' typography scale from Google Fonts.

---

## ⚡ Key Engineered Features

### 1. The Invisible File Input Trigger Mechanism
To achieve a highly customized, sleek upload component UI, the native system file selector (`<input type="file">`) is programmatically hidden using responsive display utility classes. JavaScript anchors are mapped to intercept user click coordinates on a custom-designed dashed box element (`.upload-box`), invisibly transferring the selection trigger downstream to fire up the system file-explorer dialog window seamlessly:
```javascript
uploadZone.addEventListener('click', function() {
  avatarInput.click();
});