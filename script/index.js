document.addEventListener("DOMContentLoaded", () => {
  // Menu Toggle
  const iconToggle = document.querySelector(".toogle_icon");
  const navbarMenu = document.querySelector(".menu");

  iconToggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
  });

  // Close Menu when link is clicked
  const menuLinks = document.querySelectorAll(".menu_link");
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", () => {
      navbarMenu.classList.remove("active");
    });
  });

  // Header Background Change on Scroll
  function scrollHeader() {
    const header = document.getElementById("header");
    window.scrollY >= 20 ? header.classList.add("active") : header.classList.remove("active");
  }

  window.addEventListener("scroll", scrollHeader);

  // Typed.js Initialization
  const typed = document.querySelector(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  // Scroll Animation for Active Menu Link
  const sections = document.querySelectorAll("section[id]");
  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 50;
      const sectionId = section.getAttribute("id");

      const menuLink = document.querySelector(`.menu a[href="#${sectionId}"]`);
      if (menuLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          menuLink.classList.add("active-link");
        } else {
          menuLink.classList.remove("active-link");
        }
      }
    });
  }

  window.addEventListener("scroll", scrollActive);
  scrollActive(); // Call scrollActive on page load

  // Resume Tab Highlight on Scroll
  const pages = document.querySelectorAll('.page');
  function resumeActive() {
    const scrollY = window.pageYOffset;

    pages.forEach((page) => {
      const sectionHeight = page.offsetHeight;
      const sectionTop = page.offsetTop;
      const id = page.getAttribute('id');

      const resumeTab = document.querySelector(`.resume_tabs a[href="#${id}"]`);
      if (resumeTab) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          resumeTab.classList.add('current');
        } else {
          resumeTab.classList.remove('current');
        }
      }
    });
  }

  window.addEventListener('scroll', resumeActive);
  resumeActive(); // Call resumeActive on page load
});

// Send Email and Telegram Message
function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const phone = document.getElementById("phone").value;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "portfolio@1732002.xyz",
    Password: "3153FD3430B4F56B2D392734447BCCCDE3D1",
    To: "arpitvashi2002@gmail.com",
    From: "portfolio@1732002.xyz",
    Subject: `Message from ${name}`,
    Body: message,
  }).then(() => {
    alert("Message sent successfully!");
    document.getElementById("contactForm").reset();
    sendTelegramMessage(name, email, message, phone);
  });
}

function sendTelegramMessage(name, email, message, phone) {
  const botToken = '6939207431:AAHJR5AhnWscHFmrqRl7SPz_MnRmsvMpfCc';
  const chatId = '625795241';

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const text = `NEW REQUEST \nName:${name} \nEmail:(${email}):\nMessage:\n${message}\nPhone:\n${phone}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert('Message sent successfully!');
      document.getElementById('contactForm').reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to send message. Please try again later.');
    });
}
