// ================================
// Tutor Personal IA – Lógica Base
// ================================

// ================================
// Estado global persistente
// ================================
let xp = Number(localStorage.getItem("xp")) || 0;
let nivelActual = null;

// ================================
// Sistema de niveles y recompensas
// ================================
const niveles = [
  { nivel: 1, nombre: "Iniciado", xp: 0 },
  { nivel: 2, nombre: "Aprendiz", xp: 100 },
  { nivel: 3, nombre: "Competente", xp: 300 },
  { nivel: 4, nombre: "Avanzado", xp: 600 },
  { nivel: 5, nombre: "Mentor", xp: 1000 }
];

const recompensas = {
  2: "Has desbloqueado nuevos quizzes.",
  3: "Modo ejemplo avanzado disponible.",
  4: "Retos especiales activados.",
  5: "Modo mentor desbloqueado."
};

// ================================
// Inicialización
// ================================
window.addEventListener("load", () => {
  nivelActual = obtenerNivelActual(xp);
  actualizarXP();
});

// ================================
// Utilidades de progreso
// ================================
function obtenerNivelActual(xp) {
  return [...niveles].reverse().find(n => xp >= n.xp);
}

function sumarXP(cantidad) {
  xp += cantidad;
  localStorage.setItem("xp", xp);

  const nuevoNivel = obtenerNivelActual(xp);

  if (!nivelActual || nuevoNivel.nivel > nivelActual.nivel) {
    nivelActual = nuevoNivel;
    notificarNivel(nuevoNivel);
  }

  actualizarXP();
}

function actualizarXP() {
  const nivel = obtenerNivelActual(xp);
  const siguiente = niveles.find(n => n.nivel === nivel.nivel + 1);

  let porcentaje = 100;
  if (siguiente) {
    const rango = siguiente.xp - nivel.xp;
    const progreso = xp - nivel.xp;
    porcentaje = Math.min(100, Math.floor((progreso / rango) * 100));
  }

  const cards = document.querySelectorAll(".card p");
  if (cards.length > 0) {
    cards[0].textContent = porcentaje + "%";
  }
}

function notificarNivel(nivel) {
  let mensaje = `Has alcanzado el nivel ${nivel.nivel}: ${nivel.nombre}`;

  if (recompensas[nivel.nivel]) {
    mensaje += `\n\nRecompensa:\n${recompensas[nivel.nivel]}`;
  }

  alert(mensaje);
}

// ================================
// Tutor IA simulado
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
// Eventos demo (tarjetas)
// ================================
document.addEventListener("click", (e) => {
  if (e.target.matches(".card")) {
    tutorRespuesta(
      "Un tutor personal guía el aprendizaje de forma progresiva, clara y adaptada al estudiante."
    );
  }
});

// ================================
// Chat Tutor IA (simulado)
// ================================
function enviarMensaje() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  if (!input || !chatBox) return;

  const texto = input.value.trim();
  if (!texto) return;

  // Mensaje usuario
  const userMsg = document.createElement("p");
  userMsg.innerHTML = "<strong>Tú:</strong> " + texto;
  chatBox.appendChild(userMsg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // XP por interacción
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
