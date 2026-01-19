$(document).ready(function () {
    // Crea una variable saldo (para uso futuro, ej: extraer desde BD)
    let saldo = 100000;
    // Llena el elemento de saldo con el saldo actual
    $('#saldo').text("$" + saldo.toLocaleString('es-CL'));

    // Crea variable nombre, para uso futuro (ej: extraer desde BD)
    let nombre = "Admin";
    // Llena el elemento de nombre con el nombre actual
    $('#nombre').text(nombre);


    // Procesa el envío del formulario de login en login.html

    $('#formLogin').submit(function (e) {

        //evita el envío automático del formulario
        e.preventDefault();

        //Lee valores desde los inputs
        let email = $('#email').val();
        let password = $('#password').val();
        // Verificar las credenciales
        if (email === 'admin@gmail.com' && password === 'admin') {
            // Credenciales válidas, redirigir a menu.html
            alert('Login OK. Redirigiendo.');
            window.location.href = 'menu.html';
        } else {
            // Credenciales inválidas, mostrar mensaje de error
            alert('Usuario o contraseña invalido. Inténtalo de nuevo.');
        }
    });

    // Procesa el envío del formulario de depósito en deposit.html

    $('#formDeposito').submit(function (e) {

        //evita el envío automático del formulario
        e.preventDefault();

        //Lee valores desde los inputs
        let montoDeposito = parseInt($('#montoDeposito').val());

        if (!isNaN(montoDeposito) && montoDeposito > 0) {
            saldo += montoDeposito;
            $('#saldo').text("$" + saldo);
            $('#montoDeposito').val('');
            alert('Se ha depositado $' + montoDeposito + ' en su cuenta.');
        } else {
            alert('Monto invalido. Por favor ingrese un número positivo.');
        }

    });

    // Procesa el envío del formulario de envío de dinero en sendmoney.html
    $('#formEnviarDinero').submit(function (e) {

        //evita el envío automático del formulario
        e.preventDefault();

        //Lee valores desde los inputs
        let montoEnvio = parseInt($('#montoEnvio').val());

        if (!isNaN(montoEnvio) && montoEnvio > 0) {
            if ($('#listaContactos option:selected').text() != "") {
                if (montoEnvio > saldo) {
                    alert('Saldo insuficiente para realizar el envío.');
                    return;
                }
                else {
                    saldo -= montoEnvio;
                    $('#saldo').text("$" + saldo);
                    $('#montoEnvio').val('');
                    alert('Se ha enviado $' + montoEnvio + ' a ' + $('#listaContactos option:selected').text());
                }

            }
            else {
                alert('Por favor seleccione un contacto válido.');
            }

        } else {
            alert('Monto invalido. Por favor ingrese un número positivo.');
        }

    });

    //Funcionalidad que llena la lista de contactos en sendmoney.html
    //Se define como variable para futuros usos (ej. extraer desde BD)
    let contactos = [
        { nombre: 'Juan Perez', Cuenta: '1234567', banco: 'Banco A' },
        { nombre: 'Maria Lopez', Cuenta: '7654321', banco: 'Banco B' },
        { nombre: 'Carlos Rodriguez', Cuenta: '9876543', banco: 'Banco C' },
        { nombre: 'Ana Martinez', Cuenta: '3456789', banco: 'Banco D' },
    ];
    let html = '';
    let listaContactos = $('#listaContactos');

    $.each(contactos, function (index, contacto) {
        html += '<option value="' + (index + 1) + '">' + contacto.nombre + ' | Cuenta: ' + contacto.Cuenta + ' | Banco: ' + contacto.banco + '</option>';
    });
    listaContactos.append(html);


    // Procesa el envío del formulario de agregar contacto en sendmoney.html
    $('#formAgregaContacto').submit(function (e) {

        //evita el envío automático del formulario
        e.preventDefault();

        //Lee valores desde los inputs
        let nombre = $('#contactoNombre').val();
        let cuenta = $('#contactoCuenta').val();
        let banco = $('#contactoBanco').val();
        let opciones = $('#listaContactos option').length;

        if (nombre && cuenta && banco) {
            opciones++
            $('#listaContactos').append('<option value="' + opciones + '">' + nombre + ' | Cuenta: ' + cuenta + ' | Banco: ' + banco + '</option>');
            $('#listaContactos').attr('size', opciones);
            alert('Contacto agregado: ' + nombre + ' | Cuenta: ' + cuenta + ' | Banco: ' + banco);
            $('#formAgregaContacto')[0].reset();
        } else {
            alert('Por favor complete todos los campos.');
        }

    });

    // Filtra la lista de contactos (reemplaza a autocompletar) en sendmoney.html
    $("#buscaContacto").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#listaContactos option").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


    //Funcionalidad que llena la tabla de movimientos en transactions.html
    // Se define como variable para futuros usos (ej. extraer desde BD)
    let movimientos = [
        { fecha: '2024-06-01', tipo: 'Depósito', nombre: 'Juan Perez', monto: 50000 },
        { fecha: '2024-06-03', tipo: 'Envío', nombre: 'Maria Lopez', monto: 20000 },
        { fecha: '2024-06-05', tipo: 'Depósito', nombre: 'Carlos Rodriguez', monto: 75000 },
        { fecha: '2024-06-07', tipo: 'Envío', nombre: 'Ana Martinez', monto: 15000 },
    ];

    let tablaMovimientos = $('#tablaMovimientos');
    html = '';

    $.each(movimientos, function (index, movimiento) {
        html += '<tr>';
        html += '<td>' + movimiento.fecha + '</td>';
        html += '<td>' + movimiento.tipo + '</td>';
        html += '<td>' + movimiento.nombre + '</td>';
        html += '<td>' + movimiento.monto + '</td>';
        html += '</tr>';
    });

    tablaMovimientos.append(html);

});