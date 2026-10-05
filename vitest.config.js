// vitest.config.js
// `node` environment: the suites read source files and the built dist/ — none
// needs a DOM, and jsdom isn't a dependency (it previously blocked collection).
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
});
