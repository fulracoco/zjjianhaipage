import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { readFileSync } from 'node:fs';

const deploymentFiles = ['_headers', '_redirects', '404.html', 'robots.txt', 'sitemap.xml'];

const copyDeploymentFiles = {
  name: 'copy-deployment-files',
  apply: 'build',
  generateBundle() {
    for (const fileName of deploymentFiles) {
      this.emitFile({ type: 'asset', fileName, source: readFileSync(fileName) });
    }
  }
};

export default defineConfig({
  plugins: [vue(), copyDeploymentFiles]
});
