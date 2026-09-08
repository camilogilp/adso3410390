<div style="margin-top: 60px;"></div>
<p align="center"><b>ESPECIFICACIÓN DE REQUISITOS DE SOFTWARE</b></p>

<div style="margin-top: 60px;"></div>
<p align="center"><b>PROYECTO: SISTEMA CONTABLE Y DE FACTURACIÓN ELECTRÓNICA</b></p>

<div style="margin-top: 60px;"></div>
<p align="center"><b>VISIÓN CLARA S.A.S.</b></p>

<div style="margin-top: 60px;"></div>
<p align="center"><b>FICHA 3410390</b></p>

<div style="margin-top: 60px;"></div>
<p align="center"><b>JUAN CAMILO GIL PEREZ</b></p>

<div style="margin-top: 60px;"></div>
<p align="center"><b>JOSE GERMAN ESTRADA</b></p>

<div style="margin-top: 60px;"></div>
<p align="center"><b>SERVICIO NACIONAL DE APRENDIZAJE (SENA)</b></p>

<div style="margin-top: 60px;"></div>
<p align="center"><b>CENTRO DE PROCESOS INDUSTRIALES Y CONSTRUCCION</b></p>

<div style="margin-top: 60px;"></div>
<p align="center"><b>TECNOLOGIA EN ANALISIS Y DESARROLLO DE SOFTWARE</b></p>

<div style="margin-top: 60px;"></div>
<p align="center"><b>DIAGRAMAS DE FLUJO DE LOS CASOS DE USO</b></p>

<div style="margin-top: 6rem;"></div>

<hr>

##### FICHA DEL DOCUMENTO

| FECHA | REVISIÓN(ES) | AUTOR(ES) |
|-------|--------------|-----------|
| 20/06/2026 | V1.0 | Juan Camilo Gil Perez |

---

# DIAGRAMAS DE FLUJO DE CASOS DE USO

Este documento contiene los **16 diagramas de flujo** de los casos de uso definidos en la sección **4.1.1 Definición del caso de uso** de `IEEE.md`. Cada diagrama modela el **escenario principal** en Mermaid (`flowchart TD`), con la siguiente convención:

| Elemento | Significado |
|---|---|
| Rectángulo | Paso del flujo principal |
| Rombo (decisión) | Validación dentro del flujo principal |

---

## ÍNDICE DE CASOS DE USO

| # | Caso de uso | Código |
|---|---|---|
| 1 | Inicio de sesión en el sistema | LOGIN-001 |
| 2 | Registrar usuario en el sistema | REGISTRO-001 |
| 3 | Recuperar clave de usuario | RECCLA-001 |
| 4 | Recuperar nombre de usuario | RECUUS-001 |
| 5 | Cambiar contraseña de forma periódica | CAMC-001 |
| 6 | Registrar producto en inventario | REGPI-001 |
| 7 | Actualizar stock de producto | CTSI-001 |
| 8 | Consultar inventario | CONSULI-001 |
| 9 | Registrar venta en el sistema | REGISVEN-001 |
| 10 | Anular venta en el sistema | ANULAVEN-001 |
| 11 | Registrar cliente en el sistema | REGISCLI-001 |
| 12 | Consultar cliente en el sistema | CONSULCLI-001 |
| 13 | Registrar proveedor en el sistema | REGISPROV-001 |
| 14 | Consultar proveedor en el sistema | CONSULPROV-001 |
| 15 | Generar reporte de inventario | REPORTEINV-001 |
| 16 | Generar reporte de ventas | REPORTEVENTAS-001 |

---

## 1. INICIO DE SESIÓN EN EL SISTEMA

### CASO DE USO 1

| CÓDIGO | NOMBRE |
|---|---|
| LOGIN-001 | Login del sistema |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario ingresa a la página de login del sistema"]
    P1 --> P2["2. El sistema muestra el formulario: usuario, contraseña, 'Recordar contraseña' y botón 'Ingresar'"]
    P2 --> P3["3. El usuario digita su nombre de usuario y contraseña"]
    P3 --> P4["4. Clic en el botón 'Ingresar'"]
    P4 --> D1{5. ¿Los campos no están vacíos?}
    D1 -- No --> X([Fin del intento])
    D1 -- Sí --> P5["6. El sistema consulta la base de datos"]
    P5 --> D2{¿El usuario existe y la contraseña coincide con el hash?}
    D2 -- No --> X
    D2 -- Sí --> D3{¿La cuenta está ACTIVA y no ha expirado?}
    D3 -- No --> X
    D3 -- Sí --> P6["7. Crear sesión segura (token JWT) y registrar el acceso en el log de auditoría"]
    P6 --> P7["8. Redirigir al dashboard principal según su rol"]
    P7 --> F([Fin exitoso])
```

---
## 2. REGISTRAR USUARIO EN EL SISTEMA

### CASO DE USO 2

| CÓDIGO | NOMBRE |
|---|---|
| REGISTRO-001 | Registrar usuario en el sistema |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El administrador accede al módulo de administración de usuarios"]
    P1 --> P2["2. Selecciona 'Crear usuario'"]
    P2 --> P3["3. El sistema muestra el formulario: nombre completo, identificación, correo, usuario, contraseña, confirmación, rol y estado"]
    P3 --> P4["4. El administrador diligencia los datos del nuevo usuario"]
    P4 --> P5["5. Clic en 'Guardar'"]
    P5 --> D1{6. ¿El nombre de usuario y el correo no están duplicados?}
    D1 -- No --> X([Fin del registro])
    D1 -- Sí --> D2{7. ¿La contraseña cumple la política de seguridad?}
    D2 -- No --> X
    D2 -- Sí --> P6["8. Se asigna el rol correspondiente (Administrador, Vendedor, Bodeguero, Auditor, etc.)"]
    P6 --> P7["9. El sistema crea el registro y envía un correo con credenciales y enlace de activación"]
    P7 --> P8["10. El sistema confirma la creación de la cuenta"]
    P8 --> F([Fin exitoso])
```

---
## 3. RECUPERAR CLAVE DE USUARIO

### CASO DE USO 3

| CÓDIGO | NOMBRE |
|---|---|
| RECCLA-001 | Recuperar contraseña olvidada |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario accede al login y hace clic en '¿Olvidó su contraseña?'"]
    P1 --> P2["2. El sistema muestra un formulario solicitando el nombre de usuario o correo"]
    P2 --> P3["3. El usuario ingresa su nombre de usuario o correo"]
    P3 --> D1{4. ¿El dato corresponde a una cuenta activa?}
    D1 -- No --> X([Fin del restablecimiento])
    D1 -- Sí --> P4["5. El sistema genera un token único (hash) con fecha de expiración (30 minutos)"]
    P4 --> P5["6. El sistema envía un correo con el enlace /reset-password?token=..."]
    P5 --> P6["7. El usuario hace clic en el enlace del correo"]
    P6 --> D2{8. ¿El token es válido y no ha expirado?}
    D2 -- No --> X
    D2 -- Sí --> P7["9. El sistema muestra el formulario de nueva contraseña y confirmación"]
    P7 --> P8["10. El usuario ingresa la nueva contraseña y la confirma"]
    P8 --> D3{11. ¿La contraseña cumple la política de seguridad?}
    D3 -- No --> X
    D3 -- Sí --> P9["12. Actualizar la contraseña (hash), invalidar el token y registrar el cambio"]
    P9 --> P10["13. Confirmar que la contraseña fue restablecida y redirigir al login"]
    P10 --> F([Fin exitoso])
```

---
## 4. RECUPERAR USUARIO DEL SISTEMA

### CASO DE USO 4

| CÓDIGO | NOMBRE |
|---|---|
| RECUUS-001 | Recuperar nombre de usuario olvidado |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario accede al login y hace clic en '¿Olvidó su usuario?'"]
    P1 --> P2["2. El sistema muestra un formulario solicitando el correo electrónico registrado"]
    P2 --> P3["3. El usuario ingresa su correo electrónico"]
    P3 --> D1{4. ¿El correo corresponde a una o más cuentas activas?}
    D1 -- No --> X([Fin de la recuperación])
    D1 -- Sí --> P4["5. El sistema envía un correo con los nombres de usuario asociados a ese correo"]
    P4 --> P5["6. El correo puede incluir instrucciones para restablecer la contraseña si se requiere"]
    P5 --> P6["7. El sistema muestra: 'Se ha enviado la información a su correo electrónico'"]
    P6 --> F([Fin exitoso])
```

---
## 5. CAMBIAR CONTRASEÑA DE FORMA PERIÓDICA

### CASO DE USO 5

| CÓDIGO | NOMBRE |
|---|---|
| CAMC-001 | Cambiar contraseña de manera periódica por seguridad informática |

```mermaid
flowchart TD
    subgraph A["CAMBIO OBLIGATORIO POR VENCIMIENTO"]
        direction TB
        IA([Inicio]) --> A1["1. El usuario intenta iniciar sesión o acceder a una funcionalidad"]
        A1 --> A2["2. El sistema verifica la fecha del último cambio de contraseña"]
        A2 --> DA{3. ¿Han pasado más de 90 días desde el último cambio?}
        DA -- No --> FA([Fin: se permite el acceso])
        DA -- Sí --> A3["4. El sistema bloquea el acceso y muestra: 'Su contraseña ha expirado. Debe cambiarla para continuar'"]
        A3 --> A4["5. Redirige al formulario de cambio de contraseña"]
        A4 --> A5["6. El usuario ingresa contraseña actual, nueva y confirmación"]
        A5 --> D1{7. ¿La contraseña actual es correcta?}
        D1 -- No --> XA([Fin del cambio])
        D1 -- Sí --> D2{8. ¿La nueva cumple la política de seguridad y no está en el historial?}
        D2 -- No --> XA
        D2 -- Sí --> A6["9. Actualizar la contraseña, registrar la fecha del cambio y guardar el historial"]
        A6 --> A7["10. Confirmar el cambio y permitir continuar con la sesión"]
    end

    subgraph B["CAMBIO VOLUNTARIO"]
        direction TB
        IB([Inicio]) --> B1["1. El usuario autenticado accede a su perfil y selecciona 'Cambiar contraseña'"]
        B1 --> B2["2. El sistema muestra el formulario de cambio"]
        B2 --> B3["3. El usuario ingresa contraseña actual, nueva y confirmación"]
        B3 --> D1
        B3 --> D3{¿La contraseña actual es correcta y la nueva cumple la política?}
        D3 -- No --> XB([Fin del cambio])
        D3 -- Sí --> B4["4. Actualizar la contraseña y confirmar el cambio"]
    end
```

---
## 6. REGISTRAR PRODUCTO EN INVENTARIO

### CASO DE USO 6

| CÓDIGO | NOMBRE |
|---|---|
| REGPI-001 | Registrar producto |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario accede al módulo de inventarios y selecciona 'Registrar producto'"]
    P1 --> P2["2. El sistema muestra el formulario: código, nombre, descripción, categoría, unidad de medida, precios, impuesto, stock inicial, ubicación y proveedores"]
    P2 --> P3["3. El usuario completa los campos obligatorios (código, nombre, categoría, precios, stock inicial)"]
    P3 --> P4["4. Opcional: agrega imágenes, documentos o notas"]
    P4 --> P5["5. Clic en 'Guardar'"]
    P5 --> D1{6. ¿El código no está duplicado?}
    D1 -- No --> X([Fin del registro])
    D1 -- Sí --> D2{7. ¿Los precios son mayores que cero y el stock inicial es un entero no negativo?}
    D2 -- No --> X
    D2 -- Sí --> P6["8. El sistema almacena el producto y genera el registro"]
    P6 --> P7["9. Confirmar el registro exitoso y mostrar el producto creado"]
    P7 --> F([Fin exitoso])
```

---
## 7. ACTUALIZAR STOCK DE PRODUCTO

### CASO DE USO 7

| CÓDIGO | NOMBRE |
|---|---|
| CTSI-001 | Actualizar stock de producto |

```mermaid
flowchart TD
    classDef ok fill:#e2f4e2,stroke:#3a7,color:#164,stroke-width:2px
    classDef err fill:#ffe0e0,stroke:#c00,color:#700,stroke-width:2px
    classDef alt fill:#fff3d6,stroke:#c90,color:#754a00,stroke-width:2px

    subgraph PR["FLUJO PRINCIPAL"]
        direction TB
        I([Inicio]) --> P1["1. El usuario busca el producto en el módulo de inventarios"]
        P1 --> P2["2. Selecciona el producto y elige 'Actualizar stock'"]
        P2 --> P3["3. El sistema muestra el formulario:<br>producto, stock actual, tipo de movimiento, cantidad, costo unitario, referencia y motivo"]
        P3 --> P4["4. El usuario selecciona el tipo de movimiento (compra, venta, devolución, ajuste) y la cantidad"]
        P4 --> P5["5. Ingresa la referencia del documento (factura, nota)"]
        P5 --> P6["6. Clic en 'Confirmar'"]
        P6 --> D1{"7. ¿La cantidad es válida? (si es salida, ¿no supera el stock disponible?)"}
        D1 -- Sí --> P7["8. Actualizar el stock en la base de datos"]
        P7 --> P8["9. Registrar el movimiento en el historial con fecha y responsable"]
        P8 --> P9["10. Confirmar la actualización y mostrar el nuevo stock"]
        P9 --> F([Fin exitoso]):::ok
    end

    subgraph EX["EXCEPCIONES"]
        direction TB
        E1["ERROR: Stock insuficiente"]
        E2["ERROR: Producto no encontrado"]
        E3["ERROR: Tipo de movimiento inválido"]
        E4["ERROR: Referencia del documento duplicada"]
        E5["ERROR: Sin permisos para actualizar stock"]
        E6["ERROR: La base de datos no responde"]
    end

    subgraph AL["ALTERNATIVOS"]
        direction TB
        ALT1["Compra que ingresa stock y actualiza el costo promedio ponderado"]
        ALT2["Ajuste por merma (stock negativo) justificando motivo: robo, daño o caducidad"]
        ALT3["Reversión de un movimiento anterior (anulación de compra o venta)"]
        ALT4["Movimiento futuro programado (compra pendiente de recepción)"]
    end

    D1 -- No --> E1
    E1 --> XP([Fin del movimiento])
    E2 --> XP
    E3 --> XP
    E4 --> XP
    E5 --> XP
    E6 --> XP

    P3 -. "ALTERNATIVO" .-> ALT1
    P4 -. "ALTERNATIVO" .-> ALT2
    P4 -. "ALTERNATIVO" .-> ALT3
    P4 -. "ALTERNATIVO" .-> ALT4

    class F ok
    class E1,E2,E3,E4,E5,E6 err
    class ALT1,ALT2,ALT3,ALT4 alt
```

---
## 8. CONSULTAR INVENTARIO

### CASO DE USO 8

| CÓDIGO | NOMBRE |
|---|---|
| CONSULI-001 | Consultar inventario |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario ingresa al módulo de inventarios y selecciona 'Consultar inventario'"]
    P1 --> P2["2. El sistema muestra la tabla: código, nombre, categoría, stock, costo, precio de venta y valor total"]
    P2 --> P3["3. El usuario aplica filtros (categoría, rango de stock, rango de precios, búsqueda)"]
    P3 --> P4["4. El sistema actualiza la lista según los filtros aplicados"]
    P4 --> P5["5. El sistema permite ordenar por cualquier columna (ascendente/descendente)"]
    P5 --> P6["6. El usuario selecciona un producto para ver su detalle completo"]
    P6 --> P7["7. Opcional: exportar la consulta a Excel o PDF (si tiene permisos)"]
    P7 --> F([Fin exitoso])
```

---
## 9. REGISTRAR VENTA EN EL SISTEMA

### CASO DE USO 9

| CÓDIGO | NOMBRE |
|---|---|
| REGISVEN-001 | Registrar venta |

```mermaid
flowchart TD
    classDef ok fill:#e2f4e2,stroke:#3a7,color:#164,stroke-width:2px
    classDef err fill:#ffe0e0,stroke:#c00,color:#700,stroke-width:2px
    classDef alt fill:#fff3d6,stroke:#c90,color:#754a00,stroke-width:2px

    subgraph PR["FLUJO PRINCIPAL"]
        direction TB
        I([Inicio]) --> P1["1. El usuario accede al módulo de ventas y selecciona 'Nueva venta'"]
        P1 --> P2["2. El sistema muestra la pantalla de venta con carrito vacío"]
        P2 --> P3["3. El usuario busca productos por código o nombre y los agrega al carrito"]
        P3 --> P4["4. Ingresa la cantidad deseada para cada producto"]
        P4 --> D1{"5. ¿Desea modificar el precio unitario? (con autorización)"}
        D1 -- Sí --> P5["El usuario aplica el nuevo precio/descuento"]
        D1 -- No --> P6
        P5 --> P6["6. Selecciona o registra al cliente (búsqueda por identificación o nombre)"]
        P6 --> P7["7. El sistema calcula subtotal, descuentos e impuestos (IVA) por producto"]
        P7 --> P8["8. El usuario selecciona el método de pago (efectivo, tarjeta, transferencia, crédito)"]
        P8 --> P9["9. El usuario confirma la venta"]
        P9 --> D2{10. ¿Hay stock suficiente para todos los productos?}
        D2 -- Sí --> P10["11. Descontar el stock de los productos"]
        P10 --> P11["12. Generar el comprobante de venta (ticket o factura)"]
        P11 --> P12["13. Registrar la venta en el historial y actualizar los saldos contables"]
        P12 --> P13["14. Mostrar el comprobante y permitir imprimir o enviar por correo"]
        P13 --> F([Fin exitoso]):::ok
    end

    subgraph EX["EXCEPCIONES"]
        direction TB
        E1["ERROR: Stock insuficiente para el producto (se muestra la cantidad disponible)"]
        E2["ERROR: El cliente no existe y no se puede crear por falta de datos"]
        E3["ERROR: Método de pago no válido (tarjeta rechazada)"]
        E4["ERROR: El precio de venta es menor al costo (regla de margen mínimo)"]
        E5["ERROR: Sin permisos para realizar ventas"]
        E6["ERROR: Fallo de base de datos durante la confirmación (se puede reanudar o deshacer)"]
    end

    subgraph AL["ALTERNATIVOS"]
        direction TB
        ALT1["El cliente no está registrado: se redirige a un formulario rápido de registro"]
        ALT2["Se aplica un descuento manual autorizado (porcentaje o monto fijo)"]
        ALT3["Se combinan métodos de pago (50% efectivo, 50% tarjeta)"]
        ALT4["Se requiere factura electrónica: se activa el flujo de facturación con la DIAN"]
        ALT5["Stock insuficiente: se sugiere la cantidad disponible y se pide elegir otra cantidad"]
    end

    D2 -- No --> E1
    E1 --> XP([Fin de la venta])
    E2 --> XP
    E3 --> XP
    E4 --> XP
    E5 --> XP
    E6 --> XP

    P6 -. "ALTERNATIVO" .-> ALT1
    D1 -. "ALTERNATIVO" .-> ALT2
    P8 -. "ALTERNATIVO" .-> ALT3
    P11 -. "ALTERNATIVO" .-> ALT4
    D2 -. "ALTERNATIVO" .-> ALT5

    class F ok
    class E1,E2,E3,E4,E5,E6 err
    class ALT1,ALT2,ALT3,ALT4,ALT5 alt
```

---
## 10. ANULAR VENTA EN EL SISTEMA

### CASO DE USO 10

| CÓDIGO | NOMBRE |
|---|---|
| ANULAVEN-001 | Anular venta |

```mermaid
flowchart TD
    classDef ok fill:#e2f4e2,stroke:#3a7,color:#164,stroke-width:2px
    classDef err fill:#ffe0e0,stroke:#c00,color:#700,stroke-width:2px
    classDef alt fill:#fff3d6,stroke:#c90,color:#754a00,stroke-width:2px

    subgraph PR["FLUJO PRINCIPAL"]
        direction TB
        I([Inicio]) --> P1["1. El usuario busca la venta (por número, cliente o fecha)"]
        P1 --> P2["2. Selecciona la venta y elige 'Anular venta'"]
        P2 --> P3["3. El sistema muestra un formulario solicitando el motivo de la anulación (obligatorio)"]
        P3 --> P4["4. El usuario ingresa el motivo y confirma la anulación"]
        P4 --> D1{"5. ¿La venta es anulable? (no anulada y no en proceso de cierre)"}
        D1 -- Sí --> P5["6. Generar nota crédito (si aplica) o comprobante de anulación"]
        P5 --> P6["7. Aumentar el stock de los productos devueltos (restaurar cantidades)"]
        P6 --> P7["8. Registrar la anulación en el historial de movimientos y de ventas"]
        P7 --> P8["9. Revertir los asientos contables (si está integrado)"]
        P8 --> P9["10. Confirmar la anulación y mostrar el comprobante"]
        P9 --> F([Fin exitoso]):::ok
    end

    subgraph EX["EXCEPCIONES"]
        direction TB
        E1["ERROR: Venta no encontrada"]
        E2["ERROR: La venta ya fue anulada previamente"]
        E3["ERROR: Permisos insuficientes para anular ventas"]
        E4["ERROR: El motivo de anulación no es válido"]
        E5["Error en la nota crédito electrónica: se registra y se notifica al administrador"]
        E6["El stock no puede restaurarse por movimientos intermedios: se requiere ajuste manual"]
    end

    subgraph AL["ALTERNATIVOS"]
        direction TB
        ALT1["La venta ya fue facturada electrónicamente: generar nota crédito electrónica y enviar a la DIAN"]
        ALT2["La venta tenía pagos parciales: gestionar la devolución según el método de pago"]
        ALT3["La venta está en período de cierre contable: requiere autorización especial (flujo de aprobación)"]
        ALT4["Devolución parcial de productos: requiere un sub-caso de uso"]
    end

    D1 -- No --> ALT3
    E1 --> XP([Fin de la anulación])
    E2 --> XP
    E3 --> XP
    E4 --> XP
    E5 --> XP
    E6 --> XP

    P5 -. "ALTERNATIVO" .-> ALT1
    P8 -. "ALTERNATIVO" .-> ALT2
    P3 -. "ALTERNATIVO" .-> ALT4

    class F ok
    class E1,E2,E3,E4,E5,E6 err
    class ALT1,ALT2,ALT3,ALT4 alt
```

---
## 11. REGISTRAR CLIENTE EN EL SISTEMA

### CASO DE USO 11

| CÓDIGO | NOMBRE |
|---|---|
| REGISCLI-001 | Registrar cliente |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario accede al módulo de clientes y selecciona 'Registrar cliente'"]
    P1 --> P2["2. El sistema muestra el formulario: tipo y número de identificación, razón social, nombre, dirección, teléfono, correo, régimen, condiciones de pago, límite de crédito y descuento"]
    P2 --> P3["3. El usuario diligencia los campos obligatorios (identificación, nombre, teléfono, correo)"]
    P3 --> P4["4. Clic en 'Guardar'"]
    P4 --> D1{5. ¿El número de identificación no está duplicado?}
    D1 -- No --> X([Fin del registro])
    D1 -- Sí --> D2{6. ¿El correo tiene formato válido?}
    D2 -- No --> X
    D2 -- Sí --> P5["7. El sistema almacena el cliente y asigna un código interno automático"]
    P5 --> P6["8. Confirmar el registro exitoso"]
    P6 --> F([Fin exitoso])
```

---
## 12. CONSULTAR CLIENTE EN EL SISTEMA

### CASO DE USO 12

| CÓDIGO | NOMBRE |
|---|---|
| CONSULCLI-001 | Consultar cliente |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario accede al módulo de clientes y selecciona 'Consultar cliente'"]
    P1 --> P2["2. Ingresa el criterio de búsqueda (identificación, nombre, correo)"]
    P2 --> P3["3. El sistema muestra la lista de clientes que coinciden"]
    P3 --> P4["4. El usuario selecciona un cliente de la lista"]
    P4 --> P5["5. El sistema muestra la ficha: datos personales, condiciones de pago, límite de crédito, descuento, historial de compras, saldo pendiente y contactos"]
    P5 --> P6["6. El usuario navega a las ventas del cliente o a la gestión de cartera"]
    P6 --> F([Fin exitoso])
```

---
## 13. REGISTRAR PROVEEDOR EN EL SISTEMA

### CASO DE USO 13

| CÓDIGO | NOMBRE |
|---|---|
| REGISPROV-001 | Registrar proveedor |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario accede al módulo de proveedores y selecciona 'Registrar proveedor'"]
    P1 --> P2["2. El sistema muestra el formulario: tipo y número de identificación, razón social, nombre comercial, contacto, dirección, condiciones de pago, calificación y categoría"]
    P2 --> P3["3. El usuario diligencia los campos obligatorios (identificación, razón social, contacto)"]
    P3 --> P4["4. Clic en 'Guardar'"]
    P4 --> D1{5. ¿El número de identificación no está duplicado?}
    D1 -- No --> X([Fin del registro])
    D1 -- Sí --> D2{6. ¿El correo y el teléfono tienen formato válido?}
    D2 -- No --> X
    D2 -- Sí --> P5["7. El sistema almacena el proveedor y asigna un código interno"]
    P5 --> P6["8. Confirmar el registro exitoso"]
    P6 --> F([Fin exitoso])
```

---
## 14. CONSULTAR PROVEEDOR EN EL SISTEMA

### CASO DE USO 14

| CÓDIGO | NOMBRE |
|---|---|
| CONSULPROV-001 | Consultar proveedor |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario accede al módulo de proveedores y selecciona 'Consultar proveedor'"]
    P1 --> P2["2. Ingresa el criterio de búsqueda (identificación o razón social)"]
    P2 --> P3["3. El sistema muestra la lista de proveedores que coinciden"]
    P3 --> P4["4. El usuario selecciona un proveedor"]
    P4 --> P5["5. El sistema muestra la ficha: datos generales, condiciones de pago, calificación, historial de compras, saldo pendiente y contactos"]
    P5 --> P6["6. El usuario navega a las órdenes de compra asociadas"]
    P6 --> F([Fin exitoso])
```

---
## 15. GENERAR REPORTE DE INVENTARIO

### CASO DE USO 15

| CÓDIGO | NOMBRE |
|---|---|
| REPORTEINV-001 | Generar reporte de inventario |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario accede al módulo de reportes y selecciona 'Reporte de inventario'"]
    P1 --> P2["2. Configura los filtros: categoría, rango de stock, bodega y fecha de corte"]
    P2 --> P3["3. Clic en 'Generar'"]
    P3 --> P4["4. El sistema consulta la base de datos con los parámetros seleccionados"]
    P4 --> P5["5. Construye el reporte con tablas y gráficos de resumen (valor por categoría, distribución de stock)"]
    P5 --> P6["6. El usuario previsualiza el reporte"]
    P6 --> P7["7. Selecciona el formato de exportación (PDF, Excel)"]
    P7 --> P8["8. El sistema descarga el archivo generado"]
    P8 --> F([Fin exitoso])
```

---
## 16. GENERAR REPORTE DE VENTAS

### CASO DE USO 16

| CÓDIGO | NOMBRE |
|---|---|
| REPORTEVENTAS-001 | Generar reporte de ventas |

```mermaid
flowchart TD
    I([Inicio]) --> P1["1. El usuario accede al módulo de reportes y selecciona 'Reporte de ventas'"]
    P1 --> P2["2. Configura los filtros: rango de fechas, vendedor, cliente, categoría de producto y método de pago"]
    P2 --> P3["3. Clic en 'Generar'"]
    P3 --> P4["4. El sistema procesa los datos de ventas del período seleccionado"]
    P4 --> P5["5. Muestra el reporte con totales, tendencias y gráficos (ventas por día y por categoría)"]
    P5 --> P6["6. El usuario aplica filtros adicionales o agrupa por diferentes dimensiones"]
    P6 --> P7["7. Exporta el reporte a Excel o PDF"]
    P7 --> F([Fin exitoso])
```

---

## NOTA DE TRAZABILIDAD

Los flujos anteriores se derivan textualmente del campo **ESCENARIO PRINCIPAL** de cada caso de uso documentado en `IEEE.md` (sección 4.1.1, líneas 938-1278). Cada diagrama puede renderizarse en cualquier visor compatible con Mermaid 11.x (GitHub, Typora, o el `mermaid.min.js` incluido en el proyecto).