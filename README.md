🚀 Gestión de Propuestas y Pedidos - React App
	Esta es una aplicación de React estructurada para gestionar flujos de usuarios y administradores, incluyendo autenticación, visualización de propuestas, historial de pedidos y gestión de perfiles.


🛠️ Tecnologías principales
	React (Vite/CRA)
	React Router DOM (Gestión de rutas dinámicas)
	Context API (Manejo de estados globales para autenticación y datos básicos) 


📂 Estructura de Rutas
	La aplicación se divide en tres secciones principales:

🔓 Acceso Público
	/login: Pantalla de inicio de sesión.
	/altacliente: Formulario de registro o alta de nuevos clientes.


👤 Panel de Usuario (/user)
	Protegido por AuthProvider. Proporciona acceso a:
	Home: Dashboard principal del usuario.
	Propuestas: Detalle de propuestas específicas (/user/propuestas/:id).
	Historial: Listado de pedidos anteriores.
	Pedido: Detalle de un pedido específico.
	Perfil: Gestión de datos del usuario.


🔑 Panel de Administrador (/admin)
	Protegido por AuthProvider. Incluye funcionalidades de gestión:
	Home: Vista general de administración.
	Propuestas: Gestión de propuestas existentes y creación de Nuevas Propuestas.
	Historial: Seguimiento global de pedidos.
	Perfil: Configuración de la cuenta de administrador.


🏗️ Arquitectura de Contextos
	El proyecto utiliza un sistema de proveedores de contexto anidados:
	BasicProvider: Envuelve toda la aplicación para manejar datos transversales o configuraciones globales.
	AuthProvider: Envuelve específicamente las rutas de /user y /admin para gestionar la persistencia de la sesión y permisos de acceso.


🚀 Instalación y Uso
	Clonar el repositorio:
	git clone <url-del-repositorio>


	Instalar dependencias:
	npm install


	Ejecutar en desarrollo:
	npm run dev