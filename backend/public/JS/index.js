document.addEventListener('DOMContentLoaded', async function() {
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


  const pizzas = await obtenerStock();
  console.log (pizzas);
 
  function updatePizzas() {
    const pizzaItems = document.querySelectorAll('.pizza');
    
    pizzaItems[0].querySelector('img').src = pizzas[currentIndex].picture;
    pizzaItems[0].querySelector('p strong').textContent = pizzas[currentIndex].producto;
    pizzaItems[0].querySelector('p:nth-of-type(2)').textContent = `Precio: ${pizzas[currentIndex].precio}`;
    
    pizzaItems[1].querySelector('img').src = pizzas[currentIndex + 1].picture;
    pizzaItems[1].querySelector('p strong').textContent = pizzas[currentIndex + 1].producto;
    pizzaItems[1].querySelector('p:nth-of-type(2)').textContent = `Precio: ${pizzas[currentIndex + 1].precio}`;
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

  updatePizzas();
});

