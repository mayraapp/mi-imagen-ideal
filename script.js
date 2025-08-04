// Mostrar y ocultar modales
function mostrarLogin() {
  document.getElementById("loginModal").style.display = "block";
}

function cerrarLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function mostrarRegistro() {
  document.getElementById("registroModal").style.display = "block";
}

function cerrarRegistro() {
  document.getElementById("registroModal").style.display = "none";
}

// Registro de usuario
function registrarUsuario() {
  const nombre = document.getElementById("nombreRegistro").value.trim();
  const email = document.getElementById("emailRegistro").value.trim();
  const pass = document.getElementById("passRegistro").value.trim();
  const msg = document.getElementById("registroMsg");

  if (nombre && email && pass) {
    const user = { nombre, email, pass };
    localStorage.setItem("usuario", JSON.stringify(user));
    msg.style.color = "green";
    msg.textContent = "¡Registrada con éxito!";
    setTimeout(() => cerrarRegistro(), 2000);
  } else {
    msg.style.color = "red";
    msg.textContent = "Completa todos los campos.";
  }
}

// Login
function iniciarSesion() {
  const usuarioInput = document.getElementById("usuario").value.trim();
  const passInput = document.getElementById("contrasena").value.trim();
  const msg = document.getElementById("loginMsg");
  const user = JSON.parse(localStorage.getItem("usuario"));

  if (user && usuarioInput === user.email && passInput === user.pass) {
    msg.style.color = "green";
    msg.textContent = `Bienvenida, ${user.nombre}`;
    setTimeout(() => cerrarLogin(), 2000);
  } else {
    msg.style.color = "red";
    msg.textContent = "Usuario o contraseña incorrectos.";
  }
}

// Guardar favorito
function guardarFavorito(nombre, imagen) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (!favoritos.some(fav => fav.nombre === nombre)) {
    favoritos.push({ nombre, imagen });
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
  } else {
    alert("Este peinado ya está en favoritos.");
  }
}

// Mostrar favoritos
function mostrarFavoritos() {
  const contenedor = document.getElementById("favoritosContainer");
  contenedor.innerHTML = "";
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if(favoritos.length === 0) {
    contenedor.innerHTML = "<p>No tienes peinados favoritos aún.</p>";
    return;
  }

  favoritos.forEach(fav => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${fav.imagen}" alt="${fav.nombre}">
      <p>${fav.nombre}</p>
    `;
    contenedor.appendChild(div);
  });
}

// Scroll suave a secciones
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Acordeón para los pasos de peinados
document.querySelectorAll('.peinado-paso h3').forEach(title => {
  title.addEventListener('click', () => {
    const ol = title.nextElementSibling;
    if (ol.style.display === 'block') {
      ol.style.display = 'none';
    } else {
      ol.style.display = 'block';
    }
  });
});

// Por defecto ocultamos todos los pasos al cargar
window.onload = () => {
  mostrarFavoritos();
  document.querySelectorAll('.peinado-paso ol').forEach(ol => {
    ol.style.display = 'none';
  });
};
