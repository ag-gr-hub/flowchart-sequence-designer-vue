# Contributing to @flowchart-sequence-designer/vue

Thank you for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/ag-gr-hub/flowchart-sequence-designer-vue.git
cd flowchart-sequence-designer-vue
npm install
npm run build
npm test
```

## Project Structure

- `src/` — Library source (Vue components + React bridge)
- `demo/` — Demo application (Vite + Vue 3)
- `dist/` — Built output (generated)

## Making Changes

1. Fork the repository and create a feature branch
2. Make your changes with tests
3. Run `npm run typecheck && npm test && npm run build`
4. Submit a pull request

## Code Style

- Use `<script setup lang="ts">` for Vue components
- Follow existing patterns in the codebase
- Run prettier before committing

## Reporting Issues

Please use GitHub Issues with a clear description and reproduction steps.
