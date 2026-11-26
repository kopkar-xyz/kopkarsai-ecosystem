import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(rootDir, 'dist');

const APPS = [
  {
    dir: 'apps/web-gateway',
    targetSubdir: '',
    base: '/',
    env: {
      VITE_KOPKARSAI_SYSTEM_URL: process.env.VITE_KOPKARSAI_SYSTEM_URL || '/kopkar/',
      VITE_KOPKARSAI_MARKETPLACE_URL: process.env.VITE_KOPKARSAI_MARKETPLACE_URL || '/marketplace/',
    },
  },
  {
    dir: 'apps/web-kopkar',
    targetSubdir: 'kopkar',
    base: '/kopkar/',
    env: {
      VITE_GATEWAY_URL: process.env.VITE_GATEWAY_URL ?? '',
    },
  },
  {
    dir: 'apps/web-marketplace',
    targetSubdir: 'marketplace',
    base: '/marketplace/',
    env: {},
  },
];

function runPnpm(args, extraEnv = {}) {
  const result = spawnSync(`pnpm ${args.join(' ')}`, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, ...extraEnv },
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const app of APPS) {
  console.log(`\n=== Building ${app.dir} (base=${app.base}) ===`);
  runPnpm(['--dir', app.dir, 'exec', 'tsc', '-b'], app.env);
  runPnpm(['--dir', app.dir, 'exec', 'vite', 'build', `--base=${app.base}`], app.env);

  const srcDist = path.join(rootDir, app.dir, 'dist');
  const destDir = app.targetSubdir ? path.join(outputDir, app.targetSubdir) : outputDir;
  fs.mkdirSync(destDir, { recursive: true });
  fs.cpSync(srcDist, destDir, { recursive: true });
}

console.log(`\nVercel bundle ready at ${outputDir}`);
