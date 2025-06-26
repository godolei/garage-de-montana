// filepath: garage-de-montana/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // Validación simple del formulario de contacto
    const form = document.querySelector('#contacto form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Validación básica
            const nombre = form.nombre.value.trim();
            const correo = form.correo.value.trim();
            const telefono = form.telefono.value.trim();
            const mensaje = form.mensaje.value.trim();
            let error = '';

            if (!nombre) error = 'Por favor, ingresa tu nombre.';
            else if (!correo || !/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(correo)) error = 'Correo electrónico inválido.';
            else if (!telefono || !/^\d{8,15}$/.test(telefono.replace(/\D/g, ''))) error = 'Teléfono inválido.';
            else if (!mensaje) error = 'Por favor, escribe tu mensaje.';

            if (error) {
                alert(error);
                return;
            }

            // Simulación de envío exitoso
            alert('¡Gracias por contactarnos! Te responderemos pronto.');
            form.reset();
        });
    }

    // Función para mostrar la fecha y hora actual en el pie de página
    function actualizarFechaHora() {
        const ahora = new Date();
        const opciones = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const fecha = ahora.toLocaleDateString('es-CL', opciones);
        const hora = ahora.toLocaleTimeString('es-CL', { hour12: false });
        document.getElementById('fecha-hora').textContent = `${fecha} - ${hora}`;
    }

    // Actualiza cada segundo
    setInterval(actualizarFechaHora, 1000);
    // Llama una vez al cargar
    actualizarFechaHora();

    // Scroll suave para los enlaces del menú
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// jQuery para modal y responsividad avanzada
$(function() {
  // Abrir modal agenda
  $('#btn-agenda-modal').on('click', function() {
    $('#modalAgenda').modal('show');
  });

  // Ajustar campos del modal en móviles
  function ajustarAgendaResponsive() {
    if ($(window).width() < 600) {
      $('#modalAgenda form input, #modalAgenda form select, #modalAgenda form button').css({
        'font-size': '1.15rem',
        'padding': '14px 10px'
      });
    } else {
      $('#modalAgenda form input, #modalAgenda form select, #modalAgenda form button').css({
        'font-size': '',
        'padding': ''
      });
    }
  }
  ajustarAgendaResponsive();
  $(window).on('resize', ajustarAgendaResponsive);

  // Validación y simulación de envío del formulario de agenda
  $('#form-agenda').on('submit', function(e) {
    e.preventDefault();
    let tipo = $('#agenda-tipo-servicio').val();
    let modelo = $('#agenda-modelo').val().trim();
    let km = $('#agenda-kilometraje').val();
    let anio = $('#agenda-anio').val();
    let nombre = $('#agenda-nombre').val().trim();
    let tel = $('#agenda-telefono').val().trim();

    if (!tipo || !modelo || !km || !anio || !nombre || !tel) {
      mostrarAlertaModal('Por favor, completa todos los campos.', 'danger');
      return;
    }
    if (anio < 1980 || anio > 2025) {
      mostrarAlertaModal('Año de fabricación inválido.', 'danger');
      return;
    }
    if (!/^\d{8,15}$/.test(tel.replace(/\D/g, ''))) {
      mostrarAlertaModal('Teléfono inválido.', 'danger');
      return;
    }
    mostrarAlertaModal('¡Reserva enviada! Te contactaremos para confirmar tu hora.', 'success');
    this.reset();
    setTimeout(() => $('#modalAgenda').modal('hide'), 2000);
  });

  // Mostrar alertas en el modal
  function mostrarAlertaModal(msg, tipo) {
    let alerta = $(`<div class="alert alert-${tipo} mt-2">${msg}</div>`);
    $('#modalAgenda .modal-body').prepend(alerta);
    setTimeout(() => alerta.fadeOut(400, function(){ $(this).remove(); }), 2500);
  }

  // Efecto visual: resaltar campos al enfocar
  $('#modalAgenda input, #modalAgenda select').on('focus', function() {
    $(this).css('box-shadow', '0 0 0 0.2rem #1a237e33');
  }).on('blur', function() {
    $(this).css('box-shadow', '');
  });

  // Efecto visual: animar botón al hacer hover en móviles
  $('#btn-agenda-modal').on('touchstart', function() {
    $(this).addClass('pulse');
  }).on('touchend', function() {
    $(this).removeClass('pulse');
  });
});