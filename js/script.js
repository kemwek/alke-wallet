$(document).ready(function(){
    // Crea una variable saldo (para uso futuro)
    let saldo=100000;
    // Llena el elemento de saldo con el saldo actual
    $('#saldo').text("$"+saldo.toFixed(2));

    $('#formLogin').submit(function(e) {

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

    $('#formDeposito').submit(function(e) {

        //evita el envío automático del formulario
        e.preventDefault();
    
        //Lee valores desde los inputs
        let montoDeposito = parseInt($('#montoDeposito').val());

        if (!isNaN(montoDeposito) && montoDeposito > 0) {
            saldo += montoDeposito;
            $('#saldo').text("$"+saldo);
            $('#montoDeposito').val('');
            alert('Se ha depositado $'+ montoDeposito +' en su cuenta.');
        } else {
            alert('Monto invalido. Por favor ingrese un número positivo.');
        }
       
    });


    $('#formEnviarDinero').submit(function(e) {

        //evita el envío automático del formulario
        e.preventDefault();
    
        //Lee valores desde los inputs
        let montoEnvio = parseInt($('#montoEnvio').val());

        if (!isNaN(montoEnvio) && montoEnvio > 0) {
            if($('#listaContactos option:selected').text() != "") {
                saldo -= montoEnvio;
                $('#saldo').text("$"+saldo);
                $('#montoEnvio').val('');
                alert('Se ha enviado $'+ montoEnvio +' a '+$('#listaContactos option:selected').text());
            }
            else {
                alert('Por favor seleccione un contacto válido.');
            }
            
        } else {
            alert('Monto invalido. Por favor ingrese un número positivo.');
        }
       
    });

        $('#formAgregaContacto').submit(function(e) {

        //evita el envío automático del formulario
        e.preventDefault();
    
        //Lee valores desde los inputs
        let nombre = $('#nombre').val();
        let cuenta = $('#cuenta').val();
        let banco = $('#banco').val();
        let opciones = $('#listaContactos option').length;

        if (nombre && cuenta && banco) {
            opciones++
            $('#listaContactos').append('<option value="' + opciones + '">' + nombre + ' | Cuenta: ' + cuenta + ' | Banco: ' + banco + '</option>');
            $('#listaContactos').attr('size', opciones);
            alert('Contacto agregado: '+ nombre + ' | Cuenta: ' + cuenta + ' | Banco: ' + banco);
            $('#formAgregaContacto')[0].reset();
        } else {
            alert('Por favor complete todos los campos.');
        }

       
        
       
    });


/*


if (document.getElementById("btnAgregaContacto")) {
let btnAgregaContacto=document.getElementById("btnAgregaContacto");
btnAgregaContacto.addEventListener("click",function() {
    let li=document.createElement("li");
    li.className="list-group-item";
    li.innerHTML= '<div class="contact-info"> <span class="contact-name">'+document.getElementById("nombre").value+'</span> <span class="contact-details">CBU:'+document.getElementById("cuenta").value+', Alias: '+document.getElementById("alias").value +', Banco: '+document.getElementById("banco").value +'</span>   </div> ';
    document.getElementById("contactList").prepend(li);
    
});
}*/

});