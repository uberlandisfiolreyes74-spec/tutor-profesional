// ================================
// Tutor Personal IA – Lógica Base
// ================================

// Estado global simple
let xp = Number(localStorage.getItem("xp")) || 0;

// Inicializar gráficos cuando cargue la página
window.addEventListener("load", () => {
  actualizarXP();
});

// ================================
// XP y Gamificación
// ================================
function sumarXP(cantidad) {
  xp += cantidad;
  localStorage.setItem("xp", xp);
  actualizarXP();
}

function actualizarXP() {
  const cards = document.querySelectorAll(".card p");
  if (cards.length > 0) {
    cards[0].textContent = Math.min(100, xp) + "%";
  }
}

// ================================
// Simulación de Tutor IA (base)
// ================================
function tutorRespuesta(texto) {
  sumarXP(5);
  alert(
    "Tutor IA:\n\n" +
    texto +
    "\n\n¿Deseas hacer un quiz para reforzar lo aprendido?"
  );
}

// ================================
// Quiz simple (fase 1)
// ================================
function iniciarQuiz() {
  const respuesta = prompt(
    "Quiz rápido:\n¿Cuál es el objetivo principal de un tutor educativo?\n\nA) Evaluar\nB) Enseñar\nC) Castigar"
  );

  if (!respuesta) return;

  if (respuesta.toUpperCase() === "B") {
    alert("Correcto. Enseñar es el objetivo principal.");
    sumarXP(50);
  } else {
    alert("Incorrecto. La respuesta correcta es B.");
    sumarXP(20);
  }
}

// ================================
// Eventos demo
// ================================
document.addEventListener("click", (e) => {
  if (e.target.matches(".card")) {
    tutorRespuesta(
      "Un tutor personal guía el aprendizaje de forma progresiva, clara y adaptada al estudiante."
    );
  }
});// ================================
// Chat Tutor IA (simulado)
// ================================
function enviarMensaje() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const texto = input.value.trim();

  if (!texto) return;

  // Mensaje usuario
  const userMsg = document.createElement("p");
  userMsg.innerHTML = "<strong>Tú:</strong> " + texto;
  chatBox.appendChild(userMsg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Suma XP al enviar
  sumarXP(10);

  // Respuesta simulada del tutor
  setTimeout(() => {
    const tutorMsg = document.createElement("p");
    tutorMsg.innerHTML =
      "<strong>Tutor:</strong> Buena pregunta. Vamos paso a paso. " +
      "¿Quieres que te lo explique con un ejemplo o prefieres un quiz?";
    chatBox.appendChild(tutorMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 600);
}
