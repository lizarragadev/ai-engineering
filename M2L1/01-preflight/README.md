# Verificación de Configuración Previa

Esta carpeta contiene scripts para verificar que tu entorno de desarrollo está listo para la lección de incrustaciones y segmentación de texto.

## Prerrequisitos

- Node.js 18+ instalado (verificar con `node --version`)
- Gestor de paquetes `npm` o `yarn`
- Cliente Git (para clonar repositorios, opcional)

## Inicio Rápido

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar todas las verificaciones:
   ```bash
   npm run verify-all
   ```

O ejecutar verificaciones individuales:

```bash
npm run check-node    # Verificar versión de Node.js
npm run check-env     # Verificar instalación de dependencias
npm run check-api-key # Verificar clave API de OpenAI (opcional)
```

## Visión General de Scripts

### check-node-version.ts

Verifica que la versión de Node.js sea 18 o superior.

**Uso:**
```bash
ts-node check-node-version.ts
npm run check-node
```

### check-environment.ts

Comprueba que todas las dependencias requeridas estén instaladas:
- TypeScript y ts-node
- openai

También prueba que los módulos se pueden importar correctamente.

**Uso:**
```bash
ts-node check-environment.ts
npm run check-env
```

## Configuración de la Clave API de OpenAI

### macOS/Linux (bash/zsh):
```bash
export OPENAI_API_KEY=sk_xxx
```

### Windows (PowerShell):
```powershell
$env:OPENAI_API_KEY="sk_xxx"
```

### Windows (CMD):
```cmd
set OPENAI_API_KEY=sk_xxx
```

### Usando archivo .env (recomendado):

1. Instalar dotenv: `npm install dotenv`
2. Crear archivo `.env` en la raíz del proyecto:
   ```
   OPENAI_API_KEY=sk_xxx
   ```

## Resolución de Problemas

### ModuleNotFoundError

```bash
npm install
# o
npm install --legacy-peer-deps
```

### Errores de compilación de TypeScript

- Asegúrate de que `tsconfig.json` exista y esté correctamente configurado
- Usa `ts-node` para ejecución directa: `ts-node script.ts`

### Errores ESM vs CommonJS

- Este proyecto usa ESM (`"type": "module"` en `package.json`)
- Usa extensiones `.js` en las importaciones si es necesario

### Errores de permisos durante npm install

```bash
npm install --legacy-peer-deps
# o corregir permisos de npm
```

## Próximos Pasos

Una vez que todas las verificaciones pasen:
1. ✅ Versión de Node.js 18+ instalada
2. ✅ Dependencias instaladas e importables
3. ⚠️ Clave API de OpenAI configurada (opcional)

¡Estás listo para continuar con los videos de la lección!
