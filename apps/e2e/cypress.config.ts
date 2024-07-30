import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run kreservations:serve:development',
        production: 'nx run kreservations:serve:production',
      },
      ciWebServerCommand: 'nx run kreservations:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
