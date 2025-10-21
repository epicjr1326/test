const form = document.getElementById('expectForm');
const slides = document.querySelectorAll('.form-slide');

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
}

document.getElementById('next1').onclick = () => showSlide(1);
document.getElementById('next2').onclick = () => showSlide(2);
document.getElementById('prev1').onclick = () => showSlide(0);
document.getElementById('prev2').onclick = () => showSlide(1);

const WEBHOOK_URL = "https://n8n-service-docker-image.onrender.com/webhook/survey-before"; // <- PONER EXACTO

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // lee valores (asegúrate que los IDs existen)
  const data = {
    nombre: document.getElementById('nombre')?.value || '',
    edad: document.getElementById('edad')?.value || '',
    telefono: document.getElementById('telefono')?.value || '',
    email: document.getElementById('email')?.value || '',
    emocion: document.getElementById('emocion')?.value || '',
    expectativas: document.getElementById('expectativas')?.value || '',
    rol: document.getElementById('rol')?.value || '',
    interes: document.getElementById('interes')?.value || '',
  };

  console.log("📤 Enviando datos al webhook:", WEBHOOK_URL, data);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      // mode: 'cors' // opcional, por defecto fetch usa CORS
    });

    console.log("Respuesta fetch:", response, await response.text().catch(()=>'<no-body>'));

    if (response.ok) {
      document.getElementById('form-message').textContent = `🎉 ¡Gracias ${data.nombre}! Tu respuesta fue enviada exitosamente.`;
      form.reset();
      showSlide(0);
    } else {
      document.getElementById('form-message').textContent = `❌ Hubo un problema: ${response.status} ${response.statusText}`;
    }
  } catch (err) {
    console.error("⚠️ Error al enviar fetch:", err);
    document.getElementById('form-message').textContent = "⚠️ Error de conexión con el servidor. Revisa la consola.";
  }
});


