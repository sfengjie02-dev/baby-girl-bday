const startBtn = document.getElementById("startBtn");
const introPage = document.getElementById("introPage");
const letterPage = document.getElementById("letterPage");

if (startBtn && introPage && letterPage) {
  startBtn.addEventListener("click", () => {
    introPage.classList.remove("active-screen");
    introPage.classList.add("hidden-screen");

    letterPage.classList.remove("hidden-screen");
    letterPage.classList.add("active-screen");

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
  const icon = button ? button.querySelector(".toggle-icon") : null;

  if (isOpen) {
    content.classList.remove("open");
    content.style.maxHeight = null;
    if (button) button.setAttribute("aria-expanded", "false");
    if (icon) icon.textContent = "+";
  } else {
    content.classList.add("open");
    content.style.maxHeight = content.scrollHeight + "px";
    if (button) button.setAttribute("aria-expanded", "true");
    if (icon) icon.textContent = "–";
  }
}