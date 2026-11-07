import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const authModal = document.getElementById("auth-modal");
const billingModal = document.getElementById("billing-modal");
const authStatus = document.getElementById("auth-status");
const googleButton = document.getElementById("google-signin");
const paymentLink = window.CLAIRCUT_PAYMENT_LINK || "";

function openModal(modal) {
  document.querySelectorAll(".modal.open").forEach(item => item.classList.remove("open"));
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(modal) {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("auth-open")?.addEventListener("click", () => openModal(authModal));
document.getElementById("subscribe-open")?.addEventListener("click", () => openModal(billingModal));
document.querySelectorAll("[data-close-modal]").forEach(button =>
  button.addEventListener("click", () => closeModal(button.closest(".modal")))
);
[authModal, billingModal].forEach(modal => modal.addEventListener("click", event => {
  if (event.target === modal) closeModal(modal);
}));

const checkout = document.getElementById("checkout-link");
if (paymentLink) {
  checkout.href = paymentLink;
  checkout.hidden = false;
  document.getElementById("billing-status").textContent =
    "Tu vas continuer vers la page de paiement sécurisée pour 8,99 € par mois.";
}

const config = window.CLAIRCUT_FIREBASE_CONFIG;
if (!config?.apiKey || !config?.appId) {
  googleButton.addEventListener("click", () => {
    authStatus.textContent =
      "Configuration nécessaire : ajoute l’application Web dans Firebase, active Google dans Authentication, puis renseigne firebase-config.js. Aucun paiement n’est demandé pour créer un compte.";
  });
} else {
  try {
    const app = initializeApp(config);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    googleButton.addEventListener("click", async () => {
      googleButton.disabled = true;
      authStatus.textContent = "Connexion à Google…";
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        authStatus.textContent = error.code === "auth/popup-closed-by-user"
          ? "La fenêtre de connexion a été fermée."
          : "La connexion Google n’a pas abouti. Vérifie que le fournisseur Google est activé dans Firebase.";
      } finally {
        googleButton.disabled = false;
      }
    });
    onAuthStateChanged(auth, user => {
      if (user) {
        authStatus.textContent = "Connecté avec " + (user.displayName || user.email) + ". Ton compte reste gratuit.";
        googleButton.textContent = "Connecté avec Google";
        googleButton.disabled = true;
      }
    });
  } catch {
    authStatus.textContent = "La configuration Firebase est incomplète. Aucun paiement n’est nécessaire pour créer un compte.";
  }
}

