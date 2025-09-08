document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío real del formulario

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const successMessage = document.getElementById("successMessage");

  // Validación simple
  if (nombre === "" || email === "" || mensaje === "") {
    successMessage.textContent = "Por favor completa todos los campos.";
    successMessage.style.color = "red";
    return;
  }

  // Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    successMessage.textContent = "Por favor ingresa un email válido.";
    successMessage.style.color = "red";
    return;
  }

  // Si todo está bien
  successMessage.textContent = "✅ ¡Tu mensaje se envió con éxito!";
  successMessage.style.color = "green";

  // Limpia el formulario
  document.getElementById("contactForm").reset();
});