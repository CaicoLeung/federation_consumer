import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 2000,
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'federation_consumer',
          remotes: {
            federation_provider:
              'federation_provider@http://localhost:3000/mf-manifest.json',
            federation_provider_vue3:
              'federation_provider_vue3@http://localhost:3001/mf-manifest.json',
          },
          shared: ['react', 'react-dom', 'vue', 'vue-router'],
        }),
      ],
    },
  },
});