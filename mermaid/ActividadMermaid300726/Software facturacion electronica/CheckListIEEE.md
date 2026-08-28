# LISTA DE CHEQUEO DE ACTIVIDADES DEL PROYECTO "Tecnologías del Futuro S.A.S"

## FASE 1: INICIO Y PLANIFICACIÓN

- [ ] **1.1. Kickoff del proyecto** – Reunión inicial con el equipo de desarrollo y el cliente para presentar el equipo, definir canales de comunicación y establecer expectativas.
- [ ] **1.2. Definición de objetivos y alcance** – Taller con el cliente para definir los objetivos del proyecto, el alcance detallado y los límites del sistema.
- [ ] **1.3. Estudio de viabilidad técnica** – Análisis de tecnologías, infraestructura y recursos necesarios (servidores en la nube, base de datos, integración con DIAN).
- [ ] **1.4. Planificación detallada del proyecto** – Elaboración del cronograma detallado, asignación de recursos y estimación de tiempos y costos.
- [ ] **1.5. Firma del acta de inicio del proyecto** – Aprobación formal del plan de proyecto y compromiso del cliente.

## FASE 2: ELICITACIÓN Y ANÁLISIS DE REQUISITOS

- [ ] **2.1. Entrevistas con stakeholders** – Realización de entrevistas con el Gerente General, Administrador de Inventario, Vendedor Líder y personal de bodega para identificar necesidades y expectativas.
- [ ] **2.2. Aplicación de cuestionarios** – Aplicación de los 120 cuestionarios de elicitación al equipo contable y operativo para recopilar requisitos funcionales y no funcionales.
- [ ] **2.3. Análisis de documentación existente** – Revisión de procedimientos internos, manuales de usuario y flujos de trabajo actuales (en Excel y papel).
- [ ] **2.4. Identificación de requisitos funcionales** – Documentación y categorización de requisitos funcionales del sistema (gestión de inventarios, ventas, clientes, proveedores, facturación electrónica, reportes, seguridad).
- [ ] **2.5. Identificación de requisitos no funcionales** – Documentación de requisitos de rendimiento, disponibilidad, seguridad, usabilidad y mantenibilidad.
- [ ] **2.6. Priorización de requisitos (MoSCoW)** – Clasificación de requisitos según prioridad (Must have, Should have, Could have, Won't have) con el cliente.

## FASE 3: ESPECIFICACIÓN Y DISEÑO

- [ ] **3.1. Redacción de la Especificación de Requisitos (ERS)** – Elaboración del documento ERS completo según formato IEEE 830, incluyendo introducción, descripción general, requisitos específicos y validación.
- [ ] **3.2. Definición de casos de uso** – Creación de los 15 casos de uso del sistema (login, registro de usuarios, recuperación de credenciales, cambio periódico de contraseña, registro de productos, actualización de stock, consulta de inventario, registro de ventas, anulación de ventas, gestión de clientes, gestión de proveedores, generación de reportes).
- [ ] **3.3. Creación de diagramas de clases** – Diseño del modelo de datos estático, incluyendo entidades, atributos, métodos y relaciones entre clases.
- [ ] **3.4. Definición de criterios de aceptación** – Establecimiento de criterios medibles para cada requisito funcional (ej. "El sistema calcula el costo promedio ponderado correctamente para 10 casos de prueba").
- [ ] **3.5. Revisión y validación del documento ERS** – Presentación del documento ERS al cliente para revisión y ajustes.
- [ ] **3.6. Aprobación formal del documento ERS** – Firma de aprobación del documento ERS por parte del cliente.

## FASE 4: PROTOTIPADO Y VALIDACIÓN

- [ ] **4.1. Construcción de prototipos de baja fidelidad** – Creación de wireframes para definir la estructura y flujo de las pantallas críticas (registro de ventas, registro de productos, dashboard).
- [ ] **4.2. Validación de prototipos con usuarios** – Presentación de wireframes al equipo contable y operativo para validación de flujos y usabilidad.
- [ ] **4.3. Construcción de prototipos de alta fidelidad** – Creación de prototipos interactivos con colores, tipografía y datos reales (Figma o Balsamiq).
- [ ] **4.4. Validación final de prototipos** – Prueba de prototipos con el Contador Jefe, Administrador de Inventario y Gerente General.
- [ ] **4.5. Aprobación de prototipos** – Aprobación formal de los prototipos para iniciar el desarrollo.

## FASE 5: IMPLEMENTACIÓN Y DESARROLLO

- [ ] **5.1. Configuración del entorno de desarrollo** – Configuración de repositorios, entornos de desarrollo y pruebas, y herramientas de CI/CD.
- [ ] **5.2. Desarrollo del módulo de seguridad y autenticación** – Implementación de autenticación (usuario/contraseña), recuperación de credenciales, cambio periódico de contraseña, bloqueo de cuentas, roles y permisos.
- [ ] **5.3. Desarrollo del módulo de gestión de usuarios y roles** – Creación de CRUD de usuarios, asignación de roles y permisos granulares.
- [ ] **5.4. Desarrollo del módulo de auditoría** – Implementación de bitácora de eventos (logs inmutables) con registro de quién, cuándo, IP y acción.
- [ ] **5.5. Desarrollo del módulo de inventarios y productos** – Implementación de registro de productos, categorías, proveedores, control de stock (con costo promedio ponderado), movimientos de inventario y consultas con filtros.
- [ ] **5.6. Desarrollo del módulo de gestión de proveedores** – Implementación de CRUD de proveedores, calificación y evaluación de desempeño.
- [ ] **5.7. Desarrollo del módulo de compras** – Implementación de órdenes de compra, recepción de mercancía y actualización automática de stock.
- [ ] **5.8. Desarrollo del módulo de gestión de clientes** – Implementación de CRUD de clientes, condiciones de pago, límite de crédito y descuentos especiales.
- [ ] **5.9. Desarrollo del módulo de ventas** – Implementación de registro de ventas, aplicación de descuentos, cálculo de impuestos, selección de método de pago y generación de comprobante.
- [ ] **5.10. Desarrollo del módulo de facturación electrónica** – Implementación de generación de XML, firma digital, envío a DIAN, recepción de CUFE, generación de PDF con código QR y gestión de contingencia (cola de documentos).
- [ ] **5.11. Desarrollo del módulo de notas de crédito y anulación** – Implementación de anulación de ventas y generación de notas crédito con reversión de stock y cartera.
- [ ] **5.12. Desarrollo del módulo de reportes** – Implementación de reportes de inventario, ventas y clientes/proveedores, con filtros y exportación a Excel, PDF y CSV.
- [ ] **5.13. Desarrollo del dashboard con KPIs** – Implementación de dashboard ejecutivo con indicadores clave (ventas del día, stock bajo, clientes frecuentes, valor de inventario).
- [ ] **5.14. Desarrollo de la integración con DIAN** – Configuración de endpoints, certificados digitales y manejo de respuestas de la DIAN.
- [ ] **5.15. Desarrollo del módulo de envío de correos** – Implementación de notificaciones y reportes programados por correo electrónico.
- [ ] **5.16. Desarrollo del módulo de importación de datos** – Implementación de carga de saldos iniciales, productos y clientes desde archivos Excel/CSV.
- [ ] **5.17. Desarrollo de la interfaz de usuario (frontend)** – Implementación de todas las pantallas y formularios según los prototipos aprobados.
- [ ] **5.18. Desarrollo del backend (API REST)** – Implementación de todos los endpoints para la lógica de negocio, validaciones y persistencia de datos.
- [ ] **5.19. Configuración de base de datos** – Creación del esquema de base de datos (tablas, relaciones, índices) y migraciones.

## FASE 6: PRUEBAS Y CALIDAD

- [ ] **6.1. Pruebas unitarias (backend)** – Ejecución de pruebas unitarias para cada módulo del backend (cobertura mínima del 80%).
- [ ] **6.2. Pruebas de integración (backend)** – Pruebas de integración entre módulos (inventario-ventas, ventas-facturación, compras-inventario) y con servicios externos (DIAN, correo).
- [ ] **6.3. Pruebas de integración con DIAN en Sandbox** – Pruebas exhaustivas de envío y recepción de facturas en el entorno de habilitación de la DIAN, incluyendo casos de rechazo y contingencia.
- [ ] **6.4. Pruebas funcionales** – Ejecución de casos de prueba funcionales (CP-001 a CP-010) que cubran todos los requisitos funcionales críticos (registro de productos, ventas, facturación, anulación, reportes).
- [ ] **6.5. Pruebas de usabilidad** – Pruebas con usuarios reales (vendedores y bodegueros) para validar la intuitividad y eficiencia de la interfaz.
- [ ] **6.6. Pruebas de rendimiento y carga** – Pruebas de rendimiento con 600 facturas/hora y carga con 20 usuarios concurrentes para simular temporada alta.
- [ ] **6.7. Pruebas de seguridad** – Pruebas de penetración, validación de cifrado AES-256 y TLS 1.3, bloqueo de intentos fallidos y auditoría de logs.
- [ ] **6.8. Pruebas de recuperación ante desastres** – Pruebas de restauración de copias de seguridad y recuperación en caso de caída del sistema.
- [ ] **6.9. Pruebas de aceptación de usuario (UAT)** – Ejecución de un "script" de 20 casos de negocio reales con el Gerente General y Administrador de Inventario para validar el sistema completo.
- [ ] **6.10. Corrección de defectos** – Gestión y resolución de defectos reportados durante las pruebas (priorización según criticidad).

## FASE 7: DESPLIEGUE Y CAPACITACIÓN

- [ ] **7.1. Configuración del entorno de producción** – Preparación del entorno en la nube (AWS/Azure) con todos los servicios necesarios (servidor web, base de datos, almacenamiento).
- [ ] **7.2. Migración de datos iniciales** – Carga de productos, clientes, proveedores y saldos iniciales desde los archivos Excel proporcionados por el cliente.
- [ ] **7.3. Configuración del certificado de firma digital** – Instalación del certificado .p12/.pfx para la autenticación con la DIAN y configuración de alertas de vencimiento.
- [ ] **7.4. Despliegue del sistema en producción** – Despliegue de la aplicación web, configuración de variables de entorno y verificación de funcionamiento.
- [ ] **7.5. GO LIVE y puesta en producción** – Activación del sistema para uso real y cierre del período de pruebas paralelas con SIIGO (o sistema antiguo).
- [ ] **7.6. Capacitación al equipo contable y operativo** – Sesiones prácticas de 2 semanas, simulando un mes de operación completo (ventas, inventario, reportes).
- [ ] **7.7. Capacitación al equipo de TI interno** – Transferencia de conocimiento para soporte de primer nivel y mantenimiento básico.
- [ ] **7.8. Generación de manuales de usuario y técnicos** – Elaboración de manuales de usuario (PDF) y manuales técnicos de arquitectura y despliegue.

## FASE 8: CIERRE Y SEGUIMIENTO

- [ ] **8.1. Período de pruebas paralelas (30 días hábiles)** – Operación en paralelo con el sistema antiguo (SIIGO) por 30 días hábiles, verificando consistencia de datos y rendimiento.
- [ ] **8.2. Informe de pruebas paralelas** – Elaboración de informe detallado de comparación de resultados entre el sistema nuevo y el antiguo.
- [ ] **8.3. Firma de conformidad y acta de cierre** – Firma del acta de conformidad por el cliente, liberando el pago final (20% restante).
- [ ] **8.4. Entrega de código fuente y documentación** – Depósito del código fuente completo, manuales y scripts en el repositorio corporativo del cliente.
- [ ] **8.5. Configuración del sistema de soporte (ticket system)** – Implementación del sistema de tickets (Zendesk o similar) para la gestión de solicitudes de soporte.
- [ ] **8.6. Definición de backlog de mejoras (fase 2)** – Recopilación de propuestas de mejora y nuevas funcionalidades para fases futuras.
- [ ] **8.7. Reunión de cierre del proyecto** – Reunión final con el cliente para presentar los resultados del proyecto y recoger feedback.
- [ ] **8.8. Inicio del período de soporte y mantenimiento** – Activar el soporte de 12 meses incluido, con respuesta < 4 horas para incidentes críticos y < 24 horas para incidentes menores.