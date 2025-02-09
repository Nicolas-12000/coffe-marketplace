# Coffee Marketplace ☕

**Coffee Marketplace** es una plataforma de comercio electrónico (eCommerce) diseñada para la compra y venta de café. Los usuarios pueden publicar sus productos (cafés) y otros usuarios pueden comprarlos. La plataforma incluye un sistema de recomendaciones basado en las preferencias del usuario, como el perfil de sabor (agrio, dulce, etc.), acidez, cuerpo y más.

---

## Características principales 🌟

- **Publicación de productos:** Los usuarios pueden publicar sus cafés con detalles como nombre, descripción, precio, stock, origen, nivel de tostado, tipo de grano, método de procesamiento, atributos (acidez, cuerpo, dulzura, etc.) y más.
- **Recomendaciones personalizadas:** Un sistema de recomendaciones sugiere cafés basados en las preferencias del usuario.
- **Autenticación y autorización:** Los usuarios pueden registrarse, iniciar sesión y gestionar sus productos.
- **Documentación de la API:** La API está documentada con Swagger para facilitar su uso y pruebas.
- **Escalabilidad:** La arquitectura está diseñada para ser escalable, con soporte para microservicios y bases de datos distribuidas.

---

## Tecnologías utilizadas 🛠️

- **Frontend:** React.js (pendiente de implementación).
- **Backend:** Node.js con Express.js.
- **Base de datos:** PostgreSQL (datos relacionales) y MongoDB (caché).
- **Autenticación:** JWT (JSON Web Tokens).
- **Documentación:** Swagger.
- **Pruebas:** Jest (pruebas unitarias y de integración).
- **IA para recomendaciones:** Pendiente de implementación (posible integración con AWS Personalize o Azure Cognitive Services).
- **Hosting:** Azure o AWS (pendiente de implementación).

---

## Estructura del proyecto 📂
coffe-marketplace/
├── src/
│ ├── api/
│ │ ├── controllers/ # Controladores para manejar las solicitudes HTTP
│ │ ├── middlewares/ # Middlewares para autenticación y manejo de errores
│ │ └── routes/ # Rutas de la API
│ ├── core/
│ │ ├── entities/ # Entidades del dominio (Coffee, User, Order)
│ │ ├── interfaces/ # Interfaces para repositorios y casos de uso
│ │ └── useCases/ # Lógica de negocio (casos de uso)
│ ├── infrastructure/
│ │ ├── ai/ # Integración con IA para recomendaciones
│ │ ├── database/ # Configuración y modelos de bases de datos
│ │ ├── repositories/ # Implementación de repositorios
│ │ └── server/ # Configuración del servidor
│ └── server.ts # Punto de entrada de la aplicación
├── jest.config.js # Configuración de Jest para pruebas
├── package.json # Dependencias y scripts del proyecto
├── tsconfig.json # Configuración de TypeScript
└── typedoc.json # Configuración de TypeDoc para documentación

---

## Requisitos previos 📋

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- **Node.js** (v16 o superior)
- **npm** o **yarn** (gestores de paquetes)
- **PostgreSQL** (base de datos relacional)
- **MongoDB** (base de datos para caché)
- **TypeScript** (opcional, ya que está incluido en las dependencias)

---

## Configuración ⚙️

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Nicolas-12000/coffe-marketplace.git
   cd coffe-marketplace
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/coffee_marketplace
   MONGO_URI=mongodb://localhost:27017/coffee_cache
   JWT_SECRET=tu_clave_secreta_jwt
   PORT=3000
   ```

4. **Inicia la base de datos:**
   - Asegúrate de que PostgreSQL y MongoDB estén en ejecución.
   - Ejecuta las migraciones de TypeORM:
   ```bash
   npm run typeorm migration:run
   ```

## Ejecución 🚀

### Modo desarrollo:
```bash
npm run dev
```
Esto iniciará el servidor en modo desarrollo con ts-node-dev.

### Modo producción:
```bash
npm run build
npm start
```
Esto compilará el proyecto con TypeScript y lo ejecutará en modo producción.

### Pruebas:
```bash
npm test
```
Esto ejecutará las pruebas unitarias y de integración con Jest.

## Documentación de la API 📄

La API está documentada con Swagger. Una vez que el servidor esté en ejecución, puedes acceder a la documentación en:
```
http://localhost:3000/api-docs
```

## Contribución 🤝

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu contribución:
   ```bash
   git checkout -b mi-contribucion
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Envía un pull request a la rama main.

## Licencia 📜

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

## Contacto 📧

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- **Nombre:** Nicolás Alejandro
- **Email:** nicolasg12000@gmail.com
- **GitHub:** Nicolas-12000

¡Gracias por visitar Coffee Marketplace! ☕✨