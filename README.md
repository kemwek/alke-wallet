# Alke Wallet

Aplicación front-end estática de billetera digital (HTML/CSS/JS). 
En este README se documenta la estructura, instalación, uso y, en detalle, las funcionalidades de los scripts JavaScript y los estilos CSS incluidos en el proyecto.

## Contenido del repositorio

- HTML: index.html, login.html, menu.html, sendmoney.html, deposit.html, transactions.html
- js/: script.js
- css/: styles.css
- img/: imágenes y recursos estáticos


## Flujo de la aplicación (alto nivel)

- index.html — Página de inicio (sin loguear)
- login.html — inicio de sesión (credenciales de ejemplo -- email: admin@gmail.com / password: admin).
- menu.html  — Página inicial (logueado)
- deposit.html — Formulario para depositar dinero.
- sendmoney.html — Envío de dinero, gestión y búsqueda de contactos.
- transactions.html — Tabla de últimos movimientos.

## Características clave

- Se realizó un solo archivo tanto JS como CSS, esto para encapsular todo el código 
y facilitar el cambio a futuro (no se deben incluir más scripts u hojas de estilo, solo se deben modificar las actuales).
- Se dejaron todos los valores en variables, para incluir un uso futuro en BD.
- En enviar dinero se generó un formulario colapsable, para no entorpecer el UX.


## Funcionalidades del JavaScript

Todo el JS se ejecuta dentro de $(document).ready(...) y gestiona estado en memoria del cliente (sin persistencia).

**Inicialización**

Se inicializan algunas variables generales (se realizan como variables para usar en el futuro un sistema de BD)
saldo: let saldo = 100000 — mostrado en #saldo con formato toLocaleString('es-CL').
nombre: let nombre = "Admin" — mostrado en #nombre.

**Login (login.html)**

```Formulario: #formLogin
Campos: #email, #password
Comportamiento:
Evita envío por defecto.
Valida credenciales fijas (email: admin@gmail.com / password: admin)
Si válidas: alerta y redirección a menu.html.
Si inválidas: alerta de error.
```


**Depósito (deposit.html)**
```
Formulario: #formDeposito
Campo: #montoDeposito
Comportamiento:
Evita envío por defecto.
ParseInt del monto; valida > 0.
Si válido: suma a saldo, actualiza #saldo, limpia input y muestra alerta.
Si inválido: alerta.
```

**Envío de dinero (sendmoney.html)**
```
Enviar Dinero:

Formulario: #formEnviarDinero
Campos: #montoEnvio, #listaContactos (select)
Comportamiento:
Evita envío por defecto.
Valida monto (>0), que exista saldo y que se haya seleccionado contacto.
Si válido: resta monto de saldo, actualiza #saldo, limpia input y alerta con contacto.

Lista inicial en variable contactos (objetos con nombre, Cuenta, banco).
Población de #listaContactos con <option>Nombre | Cuenta: ... | Banco: ...</option>.

Agregar contacto:

Formulario #formAgregaContacto con #contactoNombre, #contactoCuenta, #contactoBanco.
Si todos los campos presentes: añade <option>, actualiza size del select, alerta confirmatoria y resetea el formulario.
Si faltan campos: alerta solicitando completar.

Búsqueda de contactos:

Input #buscaContacto (evento keyup): filtra las <option> de #listaContactos mostrando/ocultando según coincidencia (case-insensitive).
Se considera esta como mejor alternativa al autocompletar pedido.
```


**Movimientos / transacciones (transactions.html)**

```
Variable movimientos con ejemplos ({ fecha, tipo, nombre, monto }).
Población de #tablaMovimientos (tbody) con filas <tr><td>fecha</td><td>tipo</td><td>nombre</td><td>monto</td></tr>.
```


## Estilos CSS (resumen)
Diseño mobile-first con breakpoints para tablets y desktop. Paleta principal: fondo oscuro (#212529) y botones naranja (#fd7e14).

**Estilos básicos:**

Global
```
-body: padding 20px; background-color: #212529; min-height: 100vh; display:flex; flex-flow:column;
-main: flex-grow:1; padding-bottom:1rem;
-.container: max-width: 400px; margin: 0 auto;
-.btn: background-color: #fd7e14; color: white;
-.btn.activo: background-color: white; color: black;
-.nav: gap pequeño en móvil; mayor en otros dispositivos.
```


Componentes

```
Carrusel:
.carousel-caption h5: fondo blanco, texto negro; tamaño escalable.
.imagen-carousel: borde semi-transparente.

Formularios:
.form-select: font-size 0.85rem (ajustable en breakpoints).

Tabla de movimientos:
.tabla-movimientos: font-size 0.8rem (escala a 0.9/1rem en pantallas mayores).
.div-seccion, .tarjeta-saldo: anchos máximos ajustados por breakpoint.
```

Breakpoints

```
Tablet (768px–1023px): 
.container → max-width: 700px; .div-seccion 500px; ajustes de tipografías y gaps.
Desktop (>=1024px): 
.container → max-width: 1000px; .div-seccion 700px; mayores tamaños de fuente.
```




