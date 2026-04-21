# Plan de mejora: Login (Seguridad + UX)

## Objetivo
Mejorar el sistema de login con alcance esencial, añadiendo JWT y mejorando la experiencia de usuario sin romper el comportamiento actual de validación compartida.

## Decisiones de alcance
- Alcance: esencial (iteración corta).
- Autenticación: añadir JWT en la respuesta de login.
- Idioma de la UX: catalán.
- Mantener las reglas actuales de validación fuerte de contraseña.

## Fases

### 1. Baseline y no-regresión
- Confirmar el comportamiento actual del flujo de login (frontend + backend).
- Congelar semántica de validación para evitar cambios involuntarios.

### 2. Backend: hardening mínimo + JWT
- Refactorizar `POST /login` para devolver token JWT en login exitoso.
- Mantener códigos de estado consistentes:
  - `400` para entrada inválida
  - `401` para credenciales incorrectas
  - `500` para error interno
- Mantener control robusto de errores y payloads malformados.
- Configurar secreto JWT por entorno (`process.env`) con fallback de desarrollo.

### 3. Frontend: flujo de autenticación
- Mantener validación previa al envío usando módulo compartido.
- Consumir respuesta con JWT y guardar token en `sessionStorage`.
- Preservar manejo de errores de red y servidor.

### 4. UX rápida (alto impacto)
- Unificar mensajes visibles en catalán.
- Añadir estado de envío (botón deshabilitado y feedback de carga).
- Mejorar claridad de mensajes de éxito/error.

### 5. Tests
- Ampliar pruebas de validación en módulo compartido.
- Añadir/actualizar pruebas del login backend para:
  - éxito con token
  - credenciales inválidas
  - entrada inválida
- Mantener pruebas existentes pasando sin regresiones.

### 6. Verificación final
- Ejecutar `npm run test`.
- Pruebas manuales:
  - campos vacíos
  - email inválido
  - contraseña débil
  - credenciales incorrectas
  - login válido
- Verificar que el token se recibe y se guarda correctamente.

## Archivos previstos
- `MPROPI-U3-AC2/backend/server.js`
- `MPROPI-U3-AC2/frontend/app.js`
- `MPROPI-U3-AC2/frontend/index.html`
- `MPROPI-U3-AC2/frontend/styles.css`
- `MPROPI-U3-AC2/shared/validation.js`
- `MPROPI-U3-AC2/login.test.js`
- `MPROPI-U3-AC2/package.json`

## Fuera de alcance (esta iteración)
- Registro de usuarios.
- Migración a base de datos.
- Refresh tokens.
- Modelo de roles/permisos.
- Rework completo de seguridad (rate limit, hashing histórico, etc.).
