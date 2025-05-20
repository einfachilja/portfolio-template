/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show')
    })
  }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollDown = window.scrollY

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link')
    } else {
      sectionsClass.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

// /*===== SENDING E-MAIL WITH FORMSPREE =====*/
// function sendMail(event) {
//   event.preventDefault();
//   const data = new FormData(event.target);

//   fetch("https://formspree.io/f/xanoalvn", {
//     method: "POST",
//     body: new FormData(event.target),
//     headers: {
//       Accept: "application/json",
//     },
//   })
//     .then(() => {
//       window.location.href = "./index.html";
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

function sendMail(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch("https://formspree.io/f/xanoalvn", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then(() => {
      // Optional: Formular zurücksetzen
      event.target.reset();

      // Zeige Erfolgsmeldung an
      const successMsg = document.createElement("p");
      successMsg.textContent = "Message sent successfully";
      successMsg.style.fontWeight = "bold";
      successMsg.style.color = "#4070f4"; // gleiche Farbe wie Contact-Link
      successMsg.style.marginTop = "10px";
      successMsg.style.textAlign = "center";
      successMsg.style.opacity = "0";
      successMsg.style.transition = "opacity 1s ease";

      // Füge die Nachricht direkt unter "Contact" ein
      const contactSection = document.getElementById("contact");
      contactSection.appendChild(successMsg);

      // Smooth einblenden
      requestAnimationFrame(() => {
        successMsg.style.opacity = "1";
      });

      // Nachricht nach 5 Sekunden langsam ausblenden und entfernen
      setTimeout(() => {
        successMsg.style.transition = "opacity 1s ease";
        successMsg.style.opacity = "0";
        setTimeout(() => {
          successMsg.remove();
        }, 1000);
      }, 5000);
    })
}