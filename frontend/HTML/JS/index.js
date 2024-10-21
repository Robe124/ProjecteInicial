document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("menuToggle").addEventListener("click", function() {
      const navList = document.getElementById("navList");
      const body = document.body;
    
      navList.classList.toggle("show");
    
      if (navList.classList.contains("show")) {
        body.classList.add("no-scroll");
      } else {
        body.classList.remove("no-scroll");
      }
  });

  let currentIndex = 0;
  const pizzas = [
    { name: "Pizza 1", price: "$10", image: "./img/PizzaVerduras.png" },
    { name: "Pizza 2", price: "$12", image: "./img/PizzaTrufa.png" },
    { name: "Pizza 3", price: "$15", image: "./img/PizzaProscuito.png" },
    { name: "Pizza 4", price: "$18", image: "./img/PizzaMargaritha.png" },
    { name: "Pizza 5", price: "$13", image: "./img/PizzaFungi.png" },
    { name: "Pizza 6", price: "$18", image: "./img/Pizza4Formatge.png" },
  ];

  function updatePizzas() {
    const pizzaItems = document.querySelectorAll('.pizza');
    
    pizzaItems[0].querySelector('img').src = pizzas[currentIndex].image;
    pizzaItems[0].querySelector('p strong').textContent = pizzas[currentIndex].name;
    pizzaItems[0].querySelector('p:nth-of-type(2)').textContent = `Precio: ${pizzas[currentIndex].price}`;
    
    pizzaItems[1].querySelector('img').src = pizzas[currentIndex + 1].image;
    pizzaItems[1].querySelector('p strong').textContent = pizzas[currentIndex + 1].name;
    pizzaItems[1].querySelector('p:nth-of-type(2)').textContent = `Precio: ${pizzas[currentIndex + 1].price}`;
  }

  document.querySelector('.left-arrow').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 2;
      updatePizzas();
    }
  });

  document.querySelector('.right-arrow').addEventListener('click', () => {
    if (currentIndex < pizzas.length - 2) {
      currentIndex += 2;
      updatePizzas();
    }
  });

  updatePizzas(); // Inicializar con las primeras pizzas
});


document.getElementById("scanQRButton").onclick = function() {
  window.location.href = "./scanQR.html";
};
