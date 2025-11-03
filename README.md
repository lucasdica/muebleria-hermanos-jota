# Mueblería Hermanos Jota

## 🧑‍💻 Integrantes
- Leandro Quiroga
- Lucas Agustin Di Catarina

---

## 📦 Descripción del Proyecto

**Mueblería Hermanos Jota** es una aplicación web desarrollada para la gestión de productos, ventas y clientes de una mueblería.  
El sistema está dividido en dos partes:
- **Backend:** **Node.js** y **Express**. [https://muebleria-hermanos-jota-mry8.onrender.com/api/productos]
- **Frontend:** **React**. [https://muebleria-hermanos-jota-psi.vercel.app/]

---

## ⚙️ Instalación y ejecución

### 🔹 Requisitos previos
- Node.js v18 o superior  
- npm (incluido con Node.js)
- Clonar el repositorio:
   ```bash
   git clone https://github.com/lucasdica/muebleria-hermanos-jota.git
---

### 🗂️Instalación del Backend
1. Navega a la carpeta `backend`:
    ```bash
    cd bakend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
---

### 🎨Frontend
1.  Navega a la carpeta del client:
    ```bash
    cd client 
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

### 2. Ejecución de los Servidores

Para iniciar la aplicación completa, debes arrancar ambos servidores por separado.

#### **Iniciar el Servidor (Backend)**

Desde la carpeta `backend`, tienes dos opciones:

| Comando | Uso |
| :--- | :--- |
| `npm start` | Inicia el servidor en modo **producción** (usando `node server.js`). |
| `npm run dev` | Inicia el servidor en modo **desarrollo** con **Nodemon** (el servidor se reiniciará automáticamente al detectar cambios). |

#### **Iniciar el Frontend**

Desde la carpeta `client`, sigue estos pasos:
|Comando | Uso |
| :-- | :-- |
|`npm run dev` | Inicia la aplicación en modo desarrollo (usualmente en http://localhost:5173).|
|`npm run build` | Crea una versión optimizada para producción.|
|`npm run preview` | Previsualiza el build generado antes de desplegarlo.|
