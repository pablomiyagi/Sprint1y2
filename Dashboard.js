const btnCalcular = document.getElementById("calcular");
const traficoInput = document.getElementById("trafico");
const contenidoSelect = document.getElementById("contenido");
const resultadoTrad = document.getElementById("resultado-trad");
const resultadoEco = document.getElementById("resultado-eco");

let chart;

// Factores aproximados de emisión (g CO₂ por visita)
const factores = {
  texto: 0.5,
  imagenes: 1.2,
  video: 3.0
};

btnCalcular.addEventListener("click", () => {
  const trafico = parseFloat(traficoInput.value);
  const tipo = contenidoSelect.value;

  if (isNaN(trafico) || trafico <= 0) {
    alert("Por favor, introduce un número válido de visitas.");
    return;
  }

  // Cálculos simulados
  const tradicional = trafico * factores[tipo];
  const eco = tradicional * 0.25; // 75% menos emisiones con EcoCloud

  // Mostrar resultados
  resultadoTrad.textContent = tradicional.toFixed(2);
  resultadoEco.textContent = eco.toFixed(2);

  // Actualizar gráfico
  actualizarGrafico(tradicional, eco);
});

function actualizarGrafico(tradicional, eco) {
  const ctx = document.getElementById("graficoCO2").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Servidor Tradicional", "EcoCloud"],
      datasets: [{
        label: "g CO₂ emitidos por día",
        data: [tradicional, eco],
        backgroundColor: ["#f44336", "#4CAF50"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Gramos de CO₂"
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      }
    }
  });
}
