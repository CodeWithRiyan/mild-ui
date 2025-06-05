// packages/core/scripts/watch-docs.js
const chokidar = require('chokidar');
const { spawn } = require('child_process');

console.log('👀 Watching for documentation changes...');

const watcher = chokidar.watch([
  'src/**/*.ts',
  'src/**/*.scss',
  'README.md'
], {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

let buildTimeout;

function rebuildDocs() {
  clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    console.log('🔄 Rebuilding documentation...');
    
    const buildProcess = spawn('pnpm', ['docs:build'], {
      stdio: 'inherit'
    });
    
    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Documentation updated');
      } else {
        console.log('❌ Documentation build failed');
      }
    });
  }, 300);
}

watcher
  .on('add', rebuildDocs)
  .on('change', rebuildDocs)
  .on('unlink', rebuildDocs);

console.log('📝 Auto-generating docs at http://localhost:8080');
spawn('pnpm', ['docs:serve'], { stdio: 'inherit' });