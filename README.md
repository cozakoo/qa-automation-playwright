# Proyecto QA Automation – Playwright

![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Playwright Tests](https://github.com/cozakoo/qa-automation-playwright/actions/workflows/playwright.yml/badge.svg)
![Codecov Coverage](https://codecov.io/gh/cozakoo/qa-automation-playwright/branch/main/graph/badge.svg?token=${{ secrets.CODECOV_TOKEN }})
![License](https://img.shields.io/badge/license-ISC-blue)

## Índice
- [Qué testea el proyecto](#qué-testea-el-proyecto)
- [Stack tecnológico](#stack-tecnológico)
- [Qué flujos están automatizados](#qué-flujos-están-automatizados)
  - [Login de usuario](#login-de-usuario)
- [Cómo correr los tests](#cómo-correr-los-tests)
- [Utilidades útiles de Playwright](#utilidades-útiles-de-playwright)
- [Qué aprendí con este proyecto](#qué-aprendí-con-este-proyecto)
- [Próximos pasos](#próximos-pasos)


## Qué testea el proyecto
Este proyecto automatiza flujos críticos de una aplicación web desarrollada con Django, utilizando Playwright y TypeScript como stack principal de QA Automation.

Actualmente el foco está puesto en **la validación del proceso de login**, tanto en escenarios positivos como negativos.

## Stack tecnológico

- Playwright
- TypeScript
- Node.js
- Faker (para generación de datos)
- dotenv (manejo de variables de entorno)

## Qué flujos están automatizados

### Login de usuario

- Login válido con credenciales correctas
- Login inválido con credenciales incorrectas
- Validación de mensajes de error
- Uso de Page Object Model (LoginPage)
- Manejo de datos dinámicos (CUIL/CUIT generados)

> 🔄 El proyecto está preparado para seguir creciendo y sumar nuevos flujos funcionales.

## Cómo correr los tests

```bash
#Ejecutar un test específico:
npx playwright test ./tests/e2e/login/login-invalid.spec.ts 

#Ejecutar tests en modo headed:
npx playwright test --headed

#Ejecutar con trazas habilitadas:
npx playwright test --headed --trace on

#Abrir el reporte HTML:
npx playwright show-report

#Ejecutar en modo UI:
npx playwright test --ui
```

## Utilidades útiles de Playwright

Generar código automáticamente:
```bash
npx playwright codegen
```

## Qué aprendí con este proyecto
- Automatización E2E con Playwright y TypeScript
- Uso de Page Object Model
- Manejo de variables de entorno con dotenv
- Generación de datos dinámicos (CUIL / CUIT)
- Manejo de waits y sincronización
- Uso de trace viewer para debugging
- Buenas prácticas de QA Automation aplicadas a un proyecto real

## Próximos pasos
- Agregar login por API y reutilizar sesión (storageState)
- Incorporar más flujos funcionales
- Integrar ejecución en CI/CD
- Reportes y screenshots automáticos en fallos
