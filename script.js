const startBtn = document.getElementById("startBtn");
const landingPage = document.getElementById("landingPage");
const storyFlow = document.getElementById("storyFlow");

if (startBtn && landingPage && storyFlow) {
  startBtn.addEventListener("click", () => {
    landingPage.classList.add("is-hidden");
    storyFlow.classList.remove("is-hidden");

    const firstStep = document.getElementById("step-1");
    if (firstStep) {
      firstStep.classList.remove("is-hidden");
      firstStep.classList.add("reveal");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function openStep(panelId, button) {
  const panel = document.getElementById(panelId);
  if (!panel || !button) return;

  const isOpen = panel.classList.contains("open");
  const plus = button.querySelector(".toggle-plus");

  if (isOpen) {
    panel.classList.remove("open");
    panel.style.maxHeight = null;
    button.setAttribute("aria-expanded", "false");
    if (plus) plus.textContent = "+";
  } else {
    panel.classList.add("open");
    panel.style.maxHeight = panel.scrollHeight + "px";
    button.setAttribute("aria-expanded", "true");
    if (plus) plus.textContent = "–";
  }
}

function showNextStep(stepNumber, button) {
  const nextStep = document.getElementById(`step-${stepNumber}`);
  if (!nextStep) return;

  nextStep.classList.remove("is-hidden");
  nextStep.classList.add("reveal");

  if (button) {
    button.disabled = true;
    button.textContent = "hehe okay unlocked 💙";
  }

  setTimeout(() => {
    nextStep.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 180);
}
