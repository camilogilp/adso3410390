# INFORMACIÓN DE CATALOGACIÓN

| PROYECTO    | Sistema de inventario, ventas y reportes - Tecnologías del Futuro S.A.S.    |
|---|---|
| AUTOR(ES)    | Juan Camilo Gil Pérez  |
| VERSION    | 1    |
| ESTADO DE DESARROLLO    | En proceso    |

---

# DEFINICIÓN DEL CASO DE USO

## CASO DE USO 1

| CÓDIGO    | SEG-LOGIN-001    |
|---|---|
| NOMBRE    | Login del sistema    |
| OBJETIVO    | Validar la identidad del usuario mediante credenciales (usuario y contraseña) para permitir el acceso al sistema de inventario |
| DESCRIPCIÓN    | El usuario ingresa su nombre de usuario y contraseña en la pantalla de inicio. El sistema valida las credenciales contra la base de datos, verifica que la cuenta esté activa y no haya expirado, y concede acceso si todo es correcto. En caso de error, se informa al usuario y se registra el intento fallido para fines de seguridad |
| ACTORES    | Usuario (todos los roles), Sistema    |
| CONDICIONES NECESARIAS | El usuario debe tener una cuenta registrada en el sistema. La cuenta debe estar activa y no bloqueada. La conexión a la base de datos debe estar disponible |
| ESCENARIO PRINCIPAL    | 1. El usuario ingresa a la página de login del sistema.<br>2. El sistema muestra el formulario con los campos: usuario, contraseña, opción "Recordar contraseña" y botón "Ingresar".<br>3. El usuario digita su nombre de usuario y contraseña.<br>4. El usuario hace clic en el botón "Ingresar".<br>5. El sistema valida que los campos no estén vacíos.<br>6. El sistema consulta la base de datos para verificar que el usuario exista y la contraseña coincida (hash).<br>7. El sistema verifica que la cuenta esté activa (estado = ACTIVO) y que la fecha de vigencia no haya expirado.<br>8. El sistema crea una sesión segura (token JWT o similar) y registra el acceso en el log de auditoría.<br>9. El sistema redirige al usuario al dashboard principal según su rol. |
| ESCENARIO ALTERNATIVO    | • El usuario no recuerda su contraseña (se redirige al caso de uso "Recuperar contraseña")<br>• El usuario no recuerda su nombre de usuario (se redirige al caso de uso "Recuperar nombre de usuario")<br>• El usuario marca la opción "Recordar contraseña" para que el sistema guarde la sesión por más tiempo<br>• El usuario intenta iniciar sesión desde un dispositivo o ubicación no autorizada (se solicita verificación adicional) |
| ESCENARIOS DE ESCEPCION    | • El usuario no existe en la base de datos (mensaje: "Usuario o contraseña incorrectos")<br>• La contraseña ingresada no coincide con el hash almacenado (mensaje genérico: "Usuario o contraseña incorrectos")<br>• La cuenta del usuario está bloqueada por múltiples intentos fallidos (mensaje: "Cuenta bloqueada, contacte al administrador")<br>• La cuenta del usuario ha expirado (mensaje: "Su cuenta ha expirado, contacte al administrador")<br>• El usuario no tiene permisos para acceder al sistema (mensaje: "Acceso denegado")<br>• La base de datos no responde (mensaje: "Error de conexión, intente más tarde")<br>• Se supera el límite de intentos fallidos (5 intentos) y se bloquea la cuenta temporalmente |
| CONDICIÓN DE ÉXITO    | El usuario logra ingresar al sistema y visualiza el dashboard correspondiente a su rol, con todas las funcionalidades autorizadas |
| CUESTIONES A RESOLVER    | Implementación de hash seguro (bcrypt/Argon2), manejo de sesiones con JWT y expiración, registro de intentos fallidos para análisis de seguridad, política de bloqueo de cuentas (número de intentos y tiempo de desbloqueo), integración con LDAP/Active Directory si se requiere, manejo de autenticación de dos factores (2FA) en el futuro |

---

## CASO DE USO 2

| CÓDIGO    | SEG-REGISTRO-001    |
|---|---|
| NOMBRE    | Registrar usuario en el sistema    |
| OBJETIVO    | Crear una nueva cuenta de usuario con credenciales y rol asignado para acceder al sistema de inventario |
| DESCRIPCIÓN    | El sistema permite a un administrador (o al propio usuario, si se habilita el auto-registro) ingresar los datos personales, el nombre de usuario, contraseña, rol y otros atributos para crear una nueva cuenta. Se valida que el nombre de usuario y el correo electrónico sean únicos, se aplican políticas de seguridad a la contraseña y se notifica al usuario la creación de su cuenta |
| ACTORES    | Administrador del sistema (principal), Usuario (auto-registro si está habilitado) |
| CONDICIONES NECESARIAS | El usuario que crea la cuenta debe tener permisos de administración (o el auto-registro debe estar habilitado). El sistema debe contar con un mecanismo de validación de correo electrónico |
| ESCENARIO PRINCIPAL    | 1. El administrador accede al módulo de administración de usuarios y selecciona "Crear usuario".<br>2. El sistema muestra el formulario de registro con los campos: nombre completo, identificación, correo electrónico, nombre de usuario, contraseña, confirmación de contraseña, rol y estado (activo/inactivo).<br>3. El administrador diligenciar los datos del nuevo usuario.<br>4. El sistema valida que el nombre de usuario y el correo electrónico no estén duplicados.<br>5. El sistema verifica que la contraseña cumpla con la política de seguridad (longitud mínima, caracteres especiales, mayúsculas, etc.).<br>6. El administrador asigna el rol correspondiente (Administrador, Vendedor, Bodeguero, Auditor, etc.).<br>7. El administrador hace clic en "Guardar".<br>8. El sistema crea el registro en la base de datos y envía un correo electrónico al nuevo usuario con sus credenciales y un enlace para activar la cuenta (si es necesario).<br>9. El sistema confirma la creación de la cuenta. |
| ESCENARIO ALTERNATIVO    | • El administrador decide enviar una invitación al usuario en lugar de establecer la contraseña directamente<br>• El administrador activa la opción "Usuario debe cambiar contraseña al primer inicio"<br>• El administrador asigna fechas de vigencia de la cuenta (inicio y fin)<br>• El administrador asigna permisos personalizados más allá del rol base |
| ESCENARIOS DE ESCEPCION    | • El nombre de usuario ya existe (mensaje: "El nombre de usuario ya está en uso")<br>• El correo electrónico ya está registrado en otra cuenta (mensaje: "El correo ya está registrado")<br>• La contraseña no cumple con la política de seguridad (mensaje indicando los requisitos faltantes)<br>• El rol asignado no existe en el sistema (mensaje: "Rol inválido")<br>• El correo de notificación no puede ser enviado (se registra el error y se informa al administrador)<br>• El administrador no tiene permisos para crear usuarios |
| CONDICIÓN DE ÉXITO    | La cuenta de usuario queda registrada exitosamente en el sistema, el usuario puede iniciar sesión (si está activo) y se le notifica la creación |
| CUESTIONES A RESOLVER    | Políticas de contraseñas (complejidad, caducidad, historial de contraseñas), flujo de activación por correo electrónico, manejo de roles y permisos granulares, integración con directorio LDAP, registro de auditoría de creación de usuarios, posibilidad de auto-registro con aprobación del administrador |

---

## CASO DE USO 3

| CÓDIGO    | SEG-RECUPERAR-CLAVE-001    |
|---|---|
| NOMBRE    | Recuperar contraseña olvidada    |
| OBJETIVO    | Permitir a un usuario que ha olvidado su contraseña restablecerla mediante un proceso seguro, sin necesidad de contactar al administrador |
| DESCRIPCIÓN    | El usuario solicita el restablecimiento de su contraseña proporcionando su nombre de usuario o correo electrónico. El sistema envía un enlace temporal (token) a su correo registrado. El usuario hace clic en el enlace, accede a un formulario seguro y establece una nueva contraseña. Se validan políticas de seguridad y se registra el cambio |
| ACTORES    | Usuario (no autenticado), Sistema de correo electrónico (externo) |
| CONDICIONES NECESARIAS | El usuario debe tener una cuenta registrada con un correo electrónico válido. El sistema debe contar con un servicio de envío de correos electrónicos configurado |
| ESCENARIO PRINCIPAL    | 1. El usuario accede a la página de login y hace clic en "¿Olvidó su contraseña?".<br>2. El sistema muestra un formulario solicitando el nombre de usuario o correo electrónico registrado.<br>3. El usuario ingresa su nombre de usuario o correo.<br>4. El sistema verifica que el dato corresponda a una cuenta activa.<br>5. El sistema genera un token único (hash) con fecha de expiración (ej. 30 minutos).<br>6. El sistema envía un correo al usuario con un enlace que contiene el token (ej. /reset-password?token=...).<br>7. El usuario hace clic en el enlace del correo.<br>8. El sistema valida que el token no haya expirado y corresponda a una cuenta válida.<br>9. El sistema muestra un formulario para ingresar y confirmar la nueva contraseña.<br>10. El usuario ingresa la nueva contraseña y la confirma.<br>11. El sistema valida que la nueva contraseña cumpla con la política de seguridad.<br>12. El sistema actualiza la contraseña en la base de datos (hash), invalida el token y registra el cambio en el historial.<br>13. El sistema confirma que la contraseña ha sido restablecida exitosamente y redirige al login. |
| ESCENARIO ALTERNATIVO    | • El usuario ingresa un nombre de usuario que no existe (mensaje: "No se encontró una cuenta con ese usuario")<br>• El usuario no tiene correo asociado (se solicita contactar al administrador)<br>• El usuario no recibe el correo (puede solicitar reenvío después de un tiempo)<br>• El usuario solicita el restablecimiento a través de preguntas de seguridad (alternativa) |
| ESCENARIOS DE ESCEPCION    | • El token ha expirado (mensaje: "El enlace ha expirado, solicite uno nuevo")<br>• El token no es válido (mensaje: "Enlace inválido")<br>• La nueva contraseña no cumple con la política de seguridad (mensaje indicando los requisitos)<br>• El usuario intenta usar una contraseña que ya ha usado anteriormente (si hay historial, se rechaza)<br>• El correo de restablecimiento no puede ser enviado (se registra el error y se informa al usuario) |
| CONDICIÓN DE ÉXITO    | La contraseña del usuario es restablecida exitosamente y puede iniciar sesión con la nueva contraseña |
| CUESTIONES A RESOLVER    | Generación de tokens seguros con expiración, política de historial de contraseñas (no repetir las últimas N), protección contra ataques de fuerza bruta en el formulario de recuperación, registro de intentos fallidos para monitoreo de seguridad, integración con preguntas de seguridad como alternativa, notificación al usuario sobre el cambio (correo de confirmación) |

---

## CASO DE USO 4

| CÓDIGO    | SEG-RECUPERAR-USUARIO-001    |
|---|---|
| NOMBRE    | Recuperar nombre de usuario olvidado    |
| OBJETIVO    | Permitir a un usuario que ha olvidado su nombre de usuario recuperarlo mediante su correo electrónico registrado |
| DESCRIPCIÓN    | El usuario ingresa su correo electrónico registrado en el sistema. El sistema verifica que el correo corresponda a una cuenta activa y envía un correo con el nombre de usuario o una lista de posibles usuarios asociados (si hay más de uno) |
| ACTORES    | Usuario (no autenticado), Sistema de correo electrónico (externo) |
| CONDICIONES NECESARIAS | El usuario debe tener una cuenta registrada con un correo electrónico válido. El sistema debe contar con un servicio de envío de correos electrónicos configurado |
| ESCENARIO PRINCIPAL    | 1. El usuario accede a la página de login y hace clic en "¿Olvidó su usuario?".<br>2. El sistema muestra un formulario solicitando el correo electrónico registrado.<br>3. El usuario ingresa su correo electrónico.<br>4. El sistema verifica que el correo corresponda a una o más cuentas activas.<br>5. El sistema envía un correo al usuario con los nombres de usuario asociados a ese correo (si hay múltiples, los lista).<br>6. El correo también puede incluir instrucciones para restablecer la contraseña si lo requiere.<br>7. El sistema muestra un mensaje de confirmación: "Se ha enviado la información a su correo electrónico". |
| ESCENARIO ALTERNATIVO    | • El correo no corresponde a ninguna cuenta (mensaje: "No se encontró una cuenta con ese correo")<br>• El usuario tiene múltiples cuentas asociadas al mismo correo (se envían todos los usuarios)<br>• El usuario no recibe el correo (puede solicitar reenvío) |
| ESCENARIOS DE ESCEPCION    | • El correo de recuperación no puede ser enviado (se registra el error y se informa al usuario)<br>• El usuario intenta recuperar su usuario de una cuenta inactiva (se notifica que la cuenta no está activa)<br>• El sistema no permite envío masivo de usuarios por seguridad (se envía solo el primero, o se solicita más información) |
| CONDICIÓN DE ÉXITO    | El usuario recibe en su correo el nombre de usuario (o los nombres) que le permiten iniciar sesión en el sistema |
| CUESTIONES A RESOLVER    | Privacidad: no revelar si el correo está registrado (mensaje genérico para evitar enumeración de usuarios), manejo de múltiples cuentas con el mismo correo, registro de intentos de recuperación de usuario para auditoría, política de límite de intentos por IP |

---

## CASO DE USO 5

| CÓDIGO    | SEG-CAMBIAR-CLAVE-001    |
|---|---|
| NOMBRE    | Cambiar contraseña de manera periódica por seguridad informática    |
| OBJETIVO    | Obligar a los usuarios a cambiar su contraseña cada cierto período (ej. 90 días) para cumplir con políticas de seguridad, así como permitir cambios voluntarios en cualquier momento |
| DESCRIPCIÓN    | El sistema monitorea la fecha del último cambio de contraseña de cada usuario. Cuando se acerca o supera el período máximo establecido (ej. 90 días), se notifica al usuario y se le exige cambiar la contraseña antes de continuar. El usuario también puede cambiar su contraseña voluntariamente desde el perfil. Se aplican políticas de complejidad y se evita la reutilización de contraseñas anteriores |
| ACTORES    | Usuario autenticado, Administrador del sistema (para configurar políticas) |
| CONDICIONES NECESARIAS | El usuario debe estar autenticado en el sistema. La política de cambio periódico debe estar configurada (días de vigencia, historial de contraseñas, requisitos de complejidad) |
| ESCENARIO PRINCIPAL (Cambio obligatorio por vencimiento) | 1. El usuario intenta iniciar sesión o acceder a una funcionalidad del sistema.<br>2. El sistema verifica la fecha del último cambio de contraseña.<br>3. Si han pasado más de X días (ej. 90) desde el último cambio, el sistema bloquea el acceso y muestra un mensaje: "Su contraseña ha expirado. Debe cambiarla para continuar."<br>4. El sistema redirige al usuario al formulario de cambio de contraseña.<br>5. El usuario ingresa su contraseña actual, la nueva contraseña y la confirmación.<br>6. El sistema valida que la contraseña actual sea correcta.<br>7. El sistema valida que la nueva contraseña cumpla con la política de seguridad (longitud, caracteres, etc.).<br>8. El sistema verifica que la nueva contraseña no esté en el historial de las últimas N contraseñas (ej. 5).<br>9. El sistema actualiza la contraseña, registra la fecha del cambio y guarda el historial.<br>10. El sistema confirma el cambio y permite continuar con la sesión. |
| ESCENARIO ALTERNATIVO (Cambio voluntario) | 1. El usuario autenticado accede a su perfil y selecciona "Cambiar contraseña".<br>2. El sistema muestra el formulario de cambio de contraseña.<br>3. El usuario ingresa su contraseña actual, nueva contraseña y confirmación.<br>4. El sistema realiza las mismas validaciones (actual correcta, complejidad, historial).<br>5. El sistema actualiza la contraseña y confirma el cambio. |
| ESCENARIOS DE ESCEPCION    | • La contraseña actual ingresada no coincide con la almacenada (mensaje: "Contraseña actual incorrecta")<br>• La nueva contraseña no cumple con los requisitos de complejidad (mensaje detallado)<br>• La nueva contraseña ya fue utilizada anteriormente (mensaje: "No puede usar una contraseña que haya usado antes")<br>• El usuario ingresa la misma contraseña que la actual (mensaje: "La nueva contraseña debe ser diferente")<br>• El usuario no recuerda su contraseña actual (se redirige a recuperación)<br>• La cuenta del usuario está bloqueada o inactiva (no permite cambio)<br>• El sistema no puede actualizar la contraseña por error de base de datos |
| CONDICIÓN DE ÉXITO    | La contraseña del usuario se actualiza correctamente, se registra la fecha de cambio y se aplica la nueva política de seguridad, permitiendo al usuario continuar con sus operaciones |
| CUESTIONES A RESOLVER    | Configuración de período de vigencia (días), política de historial de contraseñas (número a recordar), notificaciones de vencimiento anticipado (ej. 7 días antes), bloqueo de acceso si no se cambia después de la expiración, integración con directorio activo si se usa, registro de cambios en el log de auditoría para cumplimiento normativo |

---

## CASO DE USO 6

| CÓDIGO    | INV-REGISTRAR-001    |
|---|---|
| NOMBRE    | Registrar producto    |
| OBJETIVO    | Ingresar un nuevo producto al catálogo de inventario con sus características, costos y proveedores asociados |
| DESCRIPCIÓN    | El sistema permite a un usuario autorizado registrar un producto en el inventario, incluyendo código interno, nombre, categoría, precio de compra, precio de venta, impuestos (IVA), stock inicial, ubicación en bodega, y opcionalmente imágenes y documentos asociados. También se pueden vincular múltiples proveedores para el producto |
| ACTORES    | Administrador de inventario, Auxiliar de bodega (con permisos) |
| CONDICIONES NECESARIAS | El usuario debe estar autenticado y tener permisos de escritura en el módulo de inventarios. Los proveedores deben estar previamente registrados (si se vinculan) |
| ESCENARIO PRINCIPAL    | 1. El usuario accede al módulo de inventarios y selecciona "Registrar producto".<br>2. El sistema muestra el formulario de registro con los campos: código (sugerido automático o manual), nombre, descripción, categoría, unidad de medida, precio de compra, precio de venta, impuesto (IVA 0%, 5%, 19%, exento), stock inicial, ubicación en bodega (pasillo, estante), y proveedores (selección múltiple).<br>3. El usuario completa los campos obligatorios (código, nombre, categoría, precios, stock inicial).<br>4. El usuario opcionalmente agrega imágenes, documentos o notas.<br>5. El usuario hace clic en "Guardar".<br>6. El sistema valida que el código no esté duplicado.<br>7. El sistema valida que los precios sean mayores que cero y que el stock inicial sea un número entero no negativo.<br>8. El sistema almacena el producto en la base de datos y genera el registro.<br>9. El sistema confirma el registro exitoso y muestra el producto creado. |
| ESCENARIO ALTERNATIVO    | • El usuario no ingresa código y el sistema lo genera automáticamente (secuencial o basado en categoría)<br>• El usuario vincula uno o más proveedores al producto (previamente registrados)<br>• El usuario registra un producto con impuesto exento<br>• El usuario desea registrar un producto con múltiples variantes (talla, color, etc.) – se requiere sub-caso de uso |
| ESCENARIOS DE ESCEPCION    | • El código del producto ya existe en el sistema (mensaje: "Código ya registrado")<br>• El usuario omite campos obligatorios (mensaje: "Complete los campos requeridos")<br>• El stock inicial ingresado es negativo (mensaje: "Stock no válido")<br>• El proveedor seleccionado no existe o está inactivo<br>• El usuario no tiene permisos para registrar productos<br>• La conexión a la base de datos falla |
| CONDICIÓN DE ÉXITO    | El producto queda registrado en el catálogo de inventario, disponible para transacciones de compra, venta y ajustes |
| CUESTIONES A RESOLVER    | Generación automática de códigos (correlativo, por categoría), manejo de múltiples proveedores y precios por proveedor, control de impuestos según categoría, registro de unidades de medida y conversiones, soporte para productos con variantes (talla, color, etc.), validación de precios de compra vs venta (margen mínimo) |

---

## CASO DE USO 7

| CÓDIGO    | INV-ACTUALIZAR-STOCK-001    |
|---|---|
| NOMBRE    | Actualizar stock de producto    |
| OBJETIVO    | Modificar la cantidad disponible de un producto en el inventario, ya sea por compra, venta, devolución o ajuste físico |
| DESCRIPCIÓN    | El sistema permite aumentar o disminuir el stock de un producto existente. Se debe seleccionar el tipo de movimiento (compra, venta, devolución, ajuste por merma, etc.), registrar la cantidad, y opcionalmente el costo unitario o motivo. El sistema actualiza el stock y registra el movimiento en el historial con fecha, responsable y datos del documento asociado (factura, nota de ajuste, etc.) |
| ACTORES    | Auxiliar de bodega, Administrador de inventario |
| CONDICIONES NECESARIAS | El producto debe estar registrado. El usuario debe tener permisos de escritura en el módulo de inventarios. Se debe contar con la información del documento que soporta el movimiento (factura de compra, nota de venta, etc.) |
| ESCENARIO PRINCIPAL    | 1. El usuario busca el producto en el módulo de inventarios.<br>2. El usuario selecciona el producto y elige "Actualizar stock".<br>3. El sistema muestra el formulario con: producto, stock actual, tipo de movimiento (compra, venta, devolución, ajuste), cantidad, costo unitario (si es compra), referencia del documento (factura, nota), motivo (opcional).<br>4. El usuario selecciona el tipo de movimiento y ingresa la cantidad (positiva para ingresos, negativa para salidas).<br>5. El usuario ingresa la referencia del documento (ej. número de factura).<br>6. El usuario hace clic en "Confirmar".<br>7. El sistema valida que la cantidad sea válida (si es salida, que no supere el stock disponible).<br>8. El sistema actualiza el stock en la base de datos.<br>9. El sistema registra el movimiento en el historial con la fecha y responsable.<br>10. El sistema confirma la actualización y muestra el nuevo stock. |
| ESCENARIO ALTERNATIVO    | • El usuario realiza una compra que ingresa stock y actualiza el costo promedio ponderado<br>• El usuario realiza un ajuste por merma (stock negativo) justificando el motivo (robo, daño, caducidad)<br>• El usuario revierte un movimiento anterior (anulación de compra o venta) que afecta el stock<br>• El usuario programa un movimiento futuro (por ejemplo, una compra pendiente de recepción) |
| ESCENARIOS DE ESCEPCION    | • La cantidad solicitada para salida supera el stock disponible (mensaje: "Stock insuficiente")<br>• El producto no existe (mensaje: "Producto no encontrado")<br>• El tipo de movimiento no es válido (mensaje: "Tipo de movimiento inválido")<br>• La referencia del documento ya fue utilizada para otro movimiento (duplicado)<br>• El usuario no tiene permisos para actualizar stock<br>• La base de datos no responde |
| CONDICIÓN DE ÉXITO    | El stock del producto se actualiza correctamente, el movimiento queda registrado en el historial y el sistema refleja el nuevo nivel de inventario |
| CUESTIONES A RESOLVER    | Cálculo del costo promedio ponderado al ingresar compras, control de lotes y fechas de vencimiento, integración con los módulos de compras y ventas para actualización automática, políticas de ajuste (máximo permitido sin aprobación), auditoría completa de movimientos para trazabilidad |

---

## CASO DE USO 8

| CÓDIGO    | INV-CONSULTAR-001    |
|---|---|
| NOMBRE    | Consultar inventario    |
| OBJETIVO    | Visualizar el listado de productos disponibles con sus existencias, costos y valores totales |
| DESCRIPCIÓN    | El sistema permite al usuario buscar, filtrar y ordenar el inventario actual, mostrando para cada producto: código, nombre, categoría, stock disponible, precio de compra, precio de venta, valor total de inventario (stock * costo promedio), y estado (stock bajo, normal, sobrestock). También se puede acceder al historial de movimientos de un producto específico |
| ACTORES    | Administrador de inventario, Vendedor, Gerente, Auditor |
| CONDICIONES NECESARIAS | El usuario debe estar autenticado en el sistema. El usuario debe tener permisos de lectura en el módulo de inventarios (puede variar según rol: vendedor ve solo precios de venta, gerente ve costos) |
| ESCENARIO PRINCIPAL    | 1. El usuario ingresa al módulo de inventarios y selecciona "Consultar inventario".<br>2. El sistema muestra una tabla con todos los productos registrados, incluyendo columnas: código, nombre, categoría, stock disponible, costo unitario, precio de venta, valor total (stock * costo).<br>3. El usuario aplica filtros (categoría, rango de stock, rango de precios, búsqueda por nombre o código).<br>4. El sistema actualiza la lista según los filtros aplicados.<br>5. El usuario puede ordenar la lista por cualquier columna (ascendente/descendente).<br>6. El usuario selecciona un producto para ver su detalle completo (incluyendo historial de movimientos, proveedores, imágenes, etc.).<br>7. El usuario puede exportar la consulta a Excel o PDF (si tiene permisos). |
| ESCENARIO ALTERNATIVO    | • El usuario consulta solo productos con stock bajo (para reabastecimiento)<br>• El usuario consulta el valor total del inventario (resumen por categoría)<br>• El usuario visualiza el historial de movimientos de un producto específico<br>• El usuario consulta productos con fechas de vencimiento próximas (si aplica) |
| ESCENARIOS DE ESCEPCION    | • No se encuentran productos con los filtros aplicados (mensaje: "No hay productos que coincidan con los filtros")<br> • El sistema no responde debido a alta carga de datos (se sugiere paginación)<br>• La sesión del usuario expira durante la consulta (se redirige a login)<br>• El usuario no tiene permisos para ver costos (se oculta la columna de costo) |
| CONDICIÓN DE ÉXITO    | El usuario visualiza correctamente el estado actual del inventario con toda la información que necesita para tomar decisiones de compra, venta o ajuste |
| CUESTIONES A RESOLVER    | Paginación y rendimiento para grandes volúmenes de datos, filtros dinámicos, permisos granulares por columna, exportación a formatos Excel y PDF, integración con reportes avanzados, actualización en tiempo real (si se usan sockets o polling) |

---

## CASO DE USO 9

| CÓDIGO    | VEN-REGISTRAR-001    |
|---|---|
| NOMBRE    | Registrar venta    |
| OBJETIVO    | Procesar una transacción de venta de uno o varios productos a un cliente, actualizando el stock y generando el comprobante de venta |
| DESCRIPCIÓN    | El sistema permite al usuario crear una orden de venta, seleccionar los productos a vender, aplicar descuentos, calcular impuestos, registrar el cliente y seleccionar el método de pago. Finalizada la venta, se descuenta el stock de los productos, se genera el comprobante (ticket o factura) y se registra el movimiento contable (cuentas por cobrar o ingreso) |
| ACTORES    | Vendedor, Cajero (con permisos) |
| CONDICIONES NECESARIAS | El usuario debe estar autenticado con permisos de venta. Los productos deben tener stock disponible. El cliente debe estar registrado o se puede crear durante la venta. La conexión a la base de datos debe estar activa |
| ESCENARIO PRINCIPAL    | 1. El usuario accede al módulo de ventas y selecciona "Nueva venta".<br>2. El sistema muestra la pantalla de venta con un carrito vacío.<br>3. El usuario busca los productos por código o nombre y los agrega al carrito.<br>4. El usuario ingresa la cantidad deseada para cada producto.<br>5. El usuario puede modificar el precio unitario si tiene autorización (descuentos).<br>6. El usuario selecciona o registra al cliente (búsqueda por identificación o nombre).<br>7. El sistema calcula el subtotal, aplica descuentos (porcentaje o valor fijo) y agrega impuestos (IVA) según producto.<br>8. El usuario selecciona el método de pago (efectivo, tarjeta, transferencia, crédito).<br>9. El usuario confirma la venta.<br>10. El sistema descuenta el stock de los productos (si no hay stock suficiente, se bloquea).<br>11. El sistema genera un comprobante de venta (ticket o factura).<br>12. El sistema registra la venta en el historial y actualiza los saldos contables (cartera si es a crédito).<br>13. El sistema muestra el comprobante y permite imprimir o enviar por correo. |
| ESCENARIO ALTERNATIVO    | • El cliente no está registrado: se redirige a un formulario rápido de registro<br>• Se aplica un descuento manual autorizado (por porcentaje o monto fijo)<br>• Se combinan varios métodos de pago (ej. 50% efectivo, 50% tarjeta)<br>• Se requiere factura electrónica (se activa flujo de facturación)<br>• El vendedor agrega un producto que no tiene stock suficiente (se sugiere cantidad disponible y se puede pedir al cliente que elija otra cantidad) |
| ESCENARIOS DE ESCEPCION    | • El stock no es suficiente para la cantidad solicitada (mensaje: "Stock insuficiente para [producto], disponible: X")<br>• El cliente no existe y no se puede crear por falta de datos<br>• El método de pago no es válido (tarjeta rechazada)<br>• El precio de venta es menor al costo (si está configurada una regla de margen mínimo)<br>• El usuario no tiene permisos para realizar ventas<br>• La conexión a la base de datos falla durante la confirmación (se debe poder reanudar o deshacer) |
| CONDICIÓN DE ÉXITO    | La venta se completa exitosamente, el stock se actualiza, se genera el comprobante y los datos quedan registrados para reportes y contabilidad |
| CUESTIONES A RESOLVER    | Control de stock concurrente (evitar sobreventa), integración con facturación electrónica, manejo de descuentos y promociones, formas de pago (efectivo, crédito, tarjeta, transferencia), políticas de crédito para clientes (límite y plazos), generación de comprobantes en diferentes formatos (ticket, factura, nota de venta) |

---

## CASO DE USO 10

| CÓDIGO    | VEN-ANULAR-001    |
|---|---|
| NOMBRE    | Anular venta    |
| OBJETIVO    | Cancelar una venta previamente registrada por error, devolución de productos o incumplimiento, restaurando el stock y generando los ajustes contables necesarios (nota crédito) |
| DESCRIPCIÓN    | El sistema permite a un usuario autorizado anular una venta, siempre que no haya sido facturada electrónicamente (o si lo fue, se debe generar nota crédito electrónica). Se invierte el movimiento de stock, se registra la anulación en el historial, y se genera la documentación de soporte (nota crédito o comprobante de anulación). Si la venta tenía cobros asociados, se gestiona la devolución del dinero según el método de pago |
| ACTORES    | Administrador, Vendedor autorizado (con permisos) |
| CONDICIONES NECESARIAS | La venta debe estar registrada y no debe haber sido previamente anulada. El usuario debe tener permisos de anulación. La venta no debe estar en período de cierre contable (bloqueo) |
| ESCENARIO PRINCIPAL    | 1. El usuario busca la venta en el módulo de ventas (por número de venta, cliente, fecha).<br>2. El usuario selecciona la venta y elige "Anular venta".<br>3. El sistema muestra un formulario solicitando el motivo de la anulación (obligatorio).<br>4. El usuario ingresa el motivo y confirma la anulación.<br>5. El sistema valida que la venta sea anulable (no anulada previamente, no en proceso de cierre).<br>6. El sistema genera una nota crédito (si aplica) o un comprobante de anulación.<br>7. El sistema aumenta el stock de los productos devueltos (restaura las cantidades).<br>8. El sistema registra la anulación en el historial de movimientos de inventario y en el historial de ventas.<br>9. El sistema revierte los asientos contables (si está integrado).<br>10. El sistema confirma la anulación y muestra el comprobante de anulación. |
| ESCENARIO ALTERNATIVO    | • La venta ya fue facturada electrónicamente: se debe generar nota crédito electrónica y enviar a la DIAN<br>• La venta tenía pagos parciales: se debe gestionar la devolución del monto pagado según método de pago (efectivo, tarjeta, etc.)<br>• La venta está en período de cierre contable: se necesita autorización especial (flujo de aprobación)<br>• El usuario anula solo parte de los productos (devolución parcial) – se requiere un sub-caso |
| ESCENARIOS DE ESCEPCION    | • La venta no existe (mensaje: "Venta no encontrada")<br>• La venta ya fue anulada (mensaje: "La venta ya fue anulada previamente")<br>• El usuario no tiene permisos para anular ventas (mensaje: "Permisos insuficientes")<br>• El motivo de anulación no es válido (se exige un motivo claro)<br>• La nota crédito electrónica falla (se registra el error y se notifica al administrador)<br>• El stock no se puede restaurar porque hubo otros movimientos intermedios (se requiere ajuste manual) |
| CONDICIÓN DE ÉXITO    | La venta queda anulada, el stock se restaura, se genera la documentación de soporte y los datos contables quedan corregidos |
| CUESTIONES A RESOLVER    | Políticas de tiempo límite para anulaciones (ej. solo ventas del día), integración con facturación electrónica para notas crédito, manejo de devoluciones parciales, control de permisos y autorizaciones según el monto o antigüedad de la venta, trazabilidad completa de anulaciones para auditoría |

---

## CASO DE USO 11

| CÓDIGO    | CLI-REGISTRAR-001    |
|---|---|
| NOMBRE    | Registrar cliente    |
| OBJETIVO    | Ingresar los datos de un nuevo cliente en el sistema para gestionar su historial de compras, facturación y cartera |
| DESCRIPCIÓN    | El sistema permite almacenar la información fiscal y comercial del cliente (tipo de identificación, número, razón social, nombre, dirección, teléfono, correo, régimen fiscal, condiciones de pago, límite de crédito, descuentos especiales). Se valida la unicidad de la identificación y se notifica al usuario al finalizar |
| ACTORES    | Vendedor, Administrador, Auxiliar administrativo |
| CONDICIONES NECESARIAS | El usuario debe estar autenticado y tener permisos de escritura en el módulo de clientes |
| ESCENARIO PRINCIPAL    | 1. El usuario accede al módulo de clientes y selecciona "Registrar cliente".<br>2. El sistema muestra el formulario de registro con los campos: tipo de identificación (Cédula, NIT, CE, Pasaporte), número de identificación, razón social (opcional), nombre completo, nombre comercial, dirección, teléfono, correo electrónico, régimen fiscal (Persona Natural, Persona Jurídica, Gran Contribuyente), condiciones de pago (Contado, Crédito 30 días, etc.), límite de crédito, descuento por defecto (porcentaje), y observaciones.<br>3. El usuario diligenciar los campos obligatorios (identificación, nombre, teléfono, correo).<br>4. El usuario hace clic en "Guardar".<br>5. El sistema valida que el número de identificación no esté duplicado.<br>6. El sistema valida que el correo tenga formato válido.<br>7. El sistema almacena el cliente y le asigna un código interno (automático).<br>8. El sistema confirma el registro exitoso. |
| ESCENARIO ALTERNATIVO    | • La identificación ya existe (el sistema sugiere consultar al cliente existente)<br>• El usuario no ingresa correo (se permite, pero se advierte que es necesario para facturación electrónica)<br>• El usuario asigna un descuento especial solo para ese cliente<br>• El usuario carga una imagen del documento de identidad adjunto |
| ESCENARIOS DE ESCEPCION    | • El número de identificación no cumple con el formato (ej. NIT sin dígito de verificación)<br>• El correo electrónico ya está registrado para otro cliente (se valida)<br>• El usuario no tiene permisos para crear clientes<br>• La base de datos no responde durante el guardado |
| CONDICIÓN DE ÉXITO    | El cliente queda registrado en el sistema y puede ser seleccionado en las transacciones de venta y facturación |
| CUESTIONES A RESOLVER    | Verificación contra listas de terceros (DIAN), manejo de personas naturales y jurídicas, integración con facturación electrónica, gestión de direcciones múltiples, historial de cambios de datos del cliente, políticas de crédito y límite de endeudamiento |

---

## CASO DE USO 12

| CÓDIGO    | CLI-CONSULTAR-001    |
|---|---|
| NOMBRE    | Consultar cliente    |
| OBJETIVO    | Visualizar la información de un cliente específico, su historial de compras y su estado de cuenta (cartera) |
| DESCRIPCIÓN    | El sistema permite buscar clientes por identificación, nombre o correo, mostrando una lista de resultados. Al seleccionar uno, se muestra una ficha completa con datos personales, condiciones comerciales, resumen de compras (últimas ventas, monto total), saldo pendiente (cuentas por cobrar) y contactos asociados |
| ACTORES    | Vendedor, Cajero, Administrador, Contador |
| CONDICIONES NECESARIAS | El usuario debe estar autenticado en el sistema. El usuario debe tener permisos de lectura en el módulo de clientes |
| ESCENARIO PRINCIPAL    | 1. El usuario accede al módulo de clientes y selecciona "Consultar cliente".<br>2. El usuario ingresa el criterio de búsqueda (identificación, nombre, correo o parte de ellos).<br>3. El sistema muestra una lista de clientes que coinciden con el criterio.<br>4. El usuario selecciona un cliente de la lista.<br>5. El sistema muestra la ficha del cliente con: datos personales, condiciones de pago, límite de crédito, descuento asignado, historial de compras (fecha, productos, montos), saldo pendiente (cuentas por cobrar), y contactos.<br>6. El usuario puede navegar a las ventas del cliente o a la gestión de cartera. |
| ESCENARIO ALTERNATIVO    | • No se encuentran clientes con el criterio (se muestra mensaje y se permite reiniciar la búsqueda)<br>• El usuario desea ver el historial de compras detallado (con filtros por fecha)<br>• El usuario desea exportar la lista de clientes a Excel<br>• El usuario desea imprimir la ficha del cliente |
| ESCENARIOS DE ESCEPCION    | • El sistema no responde debido a gran volumen de datos (se sugiere paginación)<br>• La sesión del usuario expira durante la consulta<br>• El usuario no tiene permisos para ver datos de cartera (si aplica) |
| CONDICIÓN DE ÉXITO    | El usuario visualiza la información solicitada del cliente y puede tomar decisiones comerciales (ventas, cobranza, ajustes de crédito) |
| CUESTIONES A RESOLVER    | Búsqueda con caracteres especiales (tildes, eñe), paginación y ordenamiento, rendimiento en bases de datos con muchos clientes, integración con módulo de cartera para mostrar saldo actualizado, permisos por roles para ver información financiera (costos, límite de crédito) |

---

## CASO DE USO 13

| CÓDIGO    | PROV-REGISTRAR-001    |
|---|---|
| NOMBRE    | Registrar proveedor    |
| OBJETIVO    | Ingresar los datos de un nuevo proveedor en el sistema para gestionar compras, pedidos y cuentas por pagar |
| DESCRIPCIÓN    | El sistema permite almacenar la información fiscal y comercial del proveedor: identificación (NIT), razón social, nombre comercial, contacto principal, teléfono, correo, dirección, condiciones de pago (Contado, 30 días, etc.), calificación inicial (A, B, C), y categoría (nacional, internacional). Se valida la unicidad de la identificación y se registra en el catálogo de proveedores |
| ACTORES    | Administrador, Auxiliar de compras |
| CONDICIONES NECESARIAS | El usuario debe estar autenticado y tener permisos de escritura en el módulo de proveedores |
| ESCENARIO PRINCIPAL    | 1. El usuario accede al módulo de proveedores y selecciona "Registrar proveedor".<br>2. El sistema muestra el formulario de registro con los campos: tipo de identificación (NIT, CE), número de identificación, razón social, nombre comercial, contacto (nombre, teléfono, correo), dirección, condiciones de pago, calificación, categoría (nacional/internacional), observaciones.<br>3. El usuario diligenciar los campos obligatorios (identificación, razón social, contacto).<br>4. El usuario hace clic en "Guardar".<br>5. El sistema valida que el número de identificación no esté duplicado.<br>6. El sistema valida el formato del correo y teléfono.<br>7. El sistema almacena el proveedor y le asigna un código interno.<br>8. El sistema confirma el registro exitoso. |
| ESCENARIO ALTERNATIVO    | • El usuario ingresa un proveedor con múltiples contactos (sección de contactos adicionales)<br>• El usuario adjunta documentos legales (RUT, cédula, certificado bancario)<br>• El usuario asigna condiciones de pago diferentes según el tipo de compra<br>• El usuario califica al proveedor con base en experiencias previas |
| ESCENARIOS DE ESCEPCION    | • La identificación del proveedor ya existe (mensaje: "Proveedor ya registrado")<br>• El correo electrónico no tiene formato válido<br>• El usuario no tiene permisos para registrar proveedores<br>• La base de datos no responde durante el guardado |
| CONDICIÓN DE ÉXITO    | El proveedor queda registrado en el sistema y puede ser seleccionado en las órdenes de compra y cuentas por pagar |
| CUESTIONES A RESOLVER    | Validación de NIT contra listas de terceros (DIAN), manejo de proveedores del exterior, historial de calificaciones, gestión de documentos adjuntos, integración con módulo de compras para evaluar desempeño |

---

## CASO DE USO 14

| CÓDIGO    | PROV-CONSULTAR-001    |
|---|---|
| NOMBRE    | Consultar proveedor    |
| OBJETIVO    | Visualizar la información de un proveedor específico, su historial de compras y el estado de cuentas por pagar |
| DESCRIPCIÓN    | El sistema permite buscar proveedores por identificación o razón social, mostrando una lista de resultados. Al seleccionar uno, se muestra una ficha con datos fiscales, condiciones de pago, historial de compras (últimas órdenes, montos), saldo pendiente (cuentas por pagar) y calificaciones |
| ACTORES    | Administrador, Auxiliar de compras, Contador |
| CONDICIONES NECESARIAS | El usuario debe estar autenticado y tener permisos de lectura en el módulo de proveedores |
| ESCENARIO PRINCIPAL    | 1. El usuario accede al módulo de proveedores y selecciona "Consultar proveedor".<br>2. El usuario ingresa el criterio de búsqueda (identificación, razón social o parte de ella).<br>3. El sistema muestra una lista de proveedores que coinciden.<br>4. El usuario selecciona un proveedor.<br>5. El sistema muestra la ficha del proveedor con: datos generales, condiciones de pago, calificación, historial de compras (órdenes de compra), saldo pendiente (cuentas por pagar), y contactos.<br>6. El usuario puede navegar a las órdenes de compra asociadas al proveedor. |
| ESCENARIO ALTERNATIVO    | • No se encuentran proveedores (se muestra mensaje)<br>• El usuario consulta el historial de compras por rangos de fechas<br>• El usuario exporta la lista de proveedores a Excel<br>• El usuario imprime la ficha del proveedor |
| ESCENARIOS DE ESCEPCION    | • El sistema no responde debido a gran volumen de datos (paginación)<br>• La sesión del usuario expira durante la consulta<br>• El usuario no tiene permisos para ver saldos (si aplica) |
| CONDICIÓN DE ÉXITO    | El usuario visualiza la información solicitada del proveedor y puede tomar decisiones de compra o pago |
| CUESTIONES A RESOLVER    | Búsqueda avanzada, paginación, integración con el módulo de compras para mostrar historial, permisos por rol para ver información financiera, manejo de calificaciones y evaluación de proveedores |

---

## CASO DE USO 15

| CÓDIGO    | REP-INVENTARIO-001    |
|---|---|
| NOMBRE    | Generar reporte de inventario    |
| OBJETIVO    | Elaborar un informe detallado del estado del inventario, incluyendo cantidades, costos y valores totales, para la toma de decisiones gerenciales |
| DESCRIPCIÓN    | El sistema permite generar un reporte en formato PDF o Excel que contiene el listado de todos los productos (o filtrados por categoría, bodega, rango de stock) con su stock disponible, costo promedio unitario, precio de venta, valor total del inventario (stock * costo), y productos con stock crítico (bajo mínimo). También puede incluir gráficos de resumen y KPIs como rotación de inventario |
| ACTORES    | Gerente, Administrador de inventario, Auditor |
| CONDICIONES NECESARIAS | El usuario debe tener acceso al módulo de reportes. La información de inventario debe estar actualizada |
| ESCENARIO PRINCIPAL    | 1. El usuario accede al módulo de reportes y selecciona "Reporte de inventario".<br>2. El usuario configura los filtros: categoría de producto, rango de stock, bodega, fecha de corte.<br>3. El usuario hace clic en "Generar".<br>4. El sistema consulta la base de datos con los parámetros seleccionados.<br>5. El sistema construye el reporte con tablas y gráficos de resumen (valor total por categoría, distribución de stock).<br>6. El usuario previsualiza el reporte.<br>7. El usuario selecciona el formato de exportación (PDF, Excel).<br>8. El sistema descarga el archivo generado. |
| ESCENARIO ALTERNATIVO    | • El usuario incluye solo productos con stock bajo (para reabastecimiento)<br>• El usuario programa el reporte para que se envíe automáticamente por correo cada mes<br>• El usuario genera el reporte por bodega específica<br>• El usuario incluye productos con movimientos en un período determinado |
| ESCENARIOS DE ESCEPCION    | • No hay datos para los filtros seleccionados (se muestra mensaje)<br>• El tiempo de generación supera el límite permitido (se muestra barra de progreso)<br>• El usuario no tiene permisos para ver costos (se generan sin columna de costo) |
| CONDICIÓN DE ÉXITO    | El reporte de inventario se genera correctamente y es entregado al usuario en el formato solicitado, permitiendo análisis de gestión de stock |
| CUESTIONES A RESOLVER    | Optimización de consultas para grandes volúmenes de datos, formatos de exportación (Excel con fórmulas, PDF con gráficos), definición de KPIs (rotación, días de inventario), personalización de reportes según rol (gerente ve todo, administrador ve costos, etc.) |

---

## CASO DE USO 16

| CÓDIGO    | REP-VENTAS-001    |
|---|---|
| NOMBRE    | Generar reporte de ventas    |
| OBJETIVO    | Elaborar un informe que consolide las ventas realizadas en un período específico, con análisis por producto, cliente, vendedor y categoría |
| DESCRIPCIÓN    | El sistema permite generar un reporte de ventas con filtros por rango de fechas, vendedor, cliente, categoría de producto, y método de pago. El reporte incluye total de ventas, cantidad de productos vendidos, ingresos por categoría, productos más vendidos, clientes frecuentes, y tendencias (comparativa con períodos anteriores). Se puede exportar a Excel o PDF |
| ACTORES    | Gerente, Administrador, Contador |
| CONDICIONES NECESARIAS | El usuario debe tener acceso al módulo de reportes. Las transacciones de venta deben estar registradas en el sistema |
| ESCENARIO PRINCIPAL    | 1. El usuario accede al módulo de reportes y selecciona "Reporte de ventas".<br>2. El usuario configura los filtros: rango de fechas, vendedor, cliente, categoría de producto, método de pago.<br>3. El usuario hace clic en "Generar".<br>4. El sistema procesa los datos de ventas en el período seleccionado.<br>5. El sistema muestra el reporte con totales, tendencias y gráficos (ventas por día, por categoría).<br>6. El usuario puede aplicar filtros adicionales o agrupar por diferentes dimensiones.<br>7. El usuario exporta el reporte a Excel o PDF. |
| ESCENARIO ALTERNATIVO    | • El usuario solicita comparativa mes a mes (variación porcentual)<br>• El usuario solicita informe de ventas por vendedor (comisiones)<br>• El usuario solicita informe de ventas por cliente (top 10 clientes)<br>• El usuario programa el reporte para envío automático |
| ESCENARIOS DE ESCEPCION    | • No hay ventas en el período seleccionado (se muestra mensaje)<br>• El volumen de datos es excesivo y se recomienda ajustar el rango<br>• El usuario no tiene permisos para ver datos financieros detallados (costos, márgenes) |
| CONDICIÓN DE ÉXITO    | El reporte de ventas se genera correctamente, permitiendo al gerente tomar decisiones estratégicas basadas en los datos de ventas |
| CUESTIONES A RESOLVER    | Cálculo de comisiones por vendedor, integración con datos de costos para calcular márgenes, formatos de exportación con gráficos interactivos, análisis de tendencias (mes a mes, año a año), manejo de grandes volúmenes de datos con agregaciones precalculadas |