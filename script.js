const startBtn = document.getElementById("startBtn");
const landingPage = document.querySelector(".landing-page");
const storyFlow = document.getElementById("storyFlow");

if (startBtn && landingPage && storyFlow) {
  startBtn.addEventListener("click", () => {
    landingPage.classList.add("is-hidden");
    storyFlow.classList.remove("is-hidden");

    const firstStep = document.getElementById("step-1");
    if (firstStep) {
      firstStep.classList.remove("is-hidden");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function openStep(panelId, button) {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  const isOpen = panel.classList.contains("open");
  const plus = button ? button.querySelector(".toggle-plus") : null;

  if (isOpen) {
    panel.classList.remove("open");
    panel.style.maxHeight = null;
    if (plus) plus.textContent = "+";
  } else {
    panel.classList.add("open");
    panel.style.maxHeight = panel.scrollHeight + "px";
    if (plus) plus.textContent = "–";
  }
}

function showNextStep(stepNumber, button) {
  const nextStep = document.getElementById(`step-${stepNumber}`);
  if (!nextStep) return;

  nextStep.classList.remove("is-hidden");

  if (button) {
    button.disabled = true;
    button.textContent = "hehe okay unlocked 💙";
    button.style.opacity = "0.7";
    button.style.cursor = "default";
  }

  setTimeout(() => {
    nextStep.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 120);
}
