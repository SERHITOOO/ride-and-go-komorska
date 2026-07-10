const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("#lead-form");
const statusNode = document.querySelector("[data-form-status]");

menuButton?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") || false;
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

function getFormValue(data, key) {
  return String(data.get(key) || "").trim();
}

function buildLeadMessage(values) {
  return [
    "Cześć Ride&Go,",
    "",
    "Chcę zapytać o wynajem roweru e-bike dla kuriera.",
    "",
    `Imię: ${values.name}`,
    `Telefon: ${values.phone}`,
    `Platforma: ${values.platform}`,
    `Plan: ${values.plan}`,
    `Start: ${values.start || "do ustalenia"}`,
    `Wiadomość: ${values.message || "brak"}`,
    "",
    "Proszę o kontakt i dostępny termin odbioru na Komorskiej."
  ].join("\n");
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    if (statusNode) {
      statusNode.textContent = "Uzupełnij wymagane pola: imię, telefon, platformę i typ najmu.";
    }
    return;
  }

  const data = new FormData(form);
  const values = {
    name: getFormValue(data, "name"),
    phone: getFormValue(data, "phone"),
    platform: getFormValue(data, "platform"),
    plan: getFormValue(data, "plan"),
    start: getFormValue(data, "start"),
    message: getFormValue(data, "message")
  };

  const body = buildLeadMessage(values);
  const subject = `Ride&Go - zgłoszenie: ${values.name}`;
  const mailto = `mailto:kontakt@ridego.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  try {
    await navigator.clipboard?.writeText(body);
  } catch {
    // Clipboard access is optional; mailto remains the main path.
  }

  if (statusNode) {
    statusNode.textContent = "Gotowe. Otwieram pocztę z przygotowanym zgłoszeniem. Treść próbowałem też skopiować do schowka.";
  }

  window.location.href = mailto;
});
