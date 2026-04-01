const startBtn = document.getElementById("startBtn");
const landingPage = document.getElementById("landingPage");
const letterPage = document.getElementById("letterPage");

if (startBtn && landingPage && letterPage) {
  startBtn.addEventListener("click", () => {
    landingPage.classList.add("is-hidden");
    letterPage.classList.remove("is-hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function toggleContent(contentId, button) {
  const content = document.getElementById(contentId);
  if (!content) return;

  const isOpen = content.classList.contains("open");
  const plus = button ? button.querySelector(".toggle-plus") : null;

  if (isOpen) {
    content.classList.remove("open");
    content.style.maxHeight = null;

    if (button) {
      button.setAttribute("aria-expanded", "false");
    }

    if (plus) {
      plus.textContent = "+";
    }
  } else {
    content.classList.add("open");
    content.style.maxHeight = content.scrollHeight + "px";

    if (button) {
      button.setAttribute("aria-expanded", "true");
    }

    if (plus) {
      plus.textContent = "–";
    }
  }
}