import { readFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkAssetExists(assetPath, publicDir) {
  // Convert URL path to filesystem path
  // asset paths start with / (e.g., /proyectos/bob-hotel.svg)
  const relativePath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  const fullPath = join(publicDir, relativePath);
  return fullPath;
}

async function validateAssets() {
  log('\n╔═══════════════════════════════════════════════════════════╗', 'blue');
  log('║       VALIDACIÓN DE ASSETS — Acepta Bitcoin México        ║', 'blue');
  log('╚═══════════════════════════════════════════════════════════╝\n', 'blue');

  const publicDir = join(rootDir, 'public');
  const dataDir = join(rootDir, 'data');

  let totalAssets = 0;
  let missingAssets = 0;
  const missingList = [];

  // Process proyectos.json
  log('📂 Validando assets de proyectos...', 'bold');
  const proyectosPath = join(dataDir, 'proyectos.json');
  const proyectosRaw = await readFile(proyectosPath, 'utf-8');
  const proyectos = JSON.parse(proyectosRaw);

  for (const proyecto of proyectos) {
    const assets = [
      { path: proyecto.logo, type: 'logo' },
      ...(proyecto.imagen ? [{ path: proyecto.imagen, type: 'imagen' }] : [])
    ];

    for (const asset of assets) {
      totalAssets++;
      const fullPath = await checkAssetExists(asset.path, publicDir);
      try {
        const stats = await stat(fullPath);
        if (stats.isFile()) {
          log(`  ✅ ${asset.path}`, 'green');
        } else {
          log(`  ❌ ${asset.path} (no es un archivo)`, 'red');
          missingAssets++;
          missingList.push(asset.path);
        }
      } catch {
        log(`  ❌ ${asset.path} (faltante)`, 'red');
        missingAssets++;
        missingList.push(asset.path);
      }
    }
  }

  // Process proveedores.json
  log('\n📂 Validando assets de proveedores...', 'bold');
  const proveedoresPath = join(dataDir, 'proveedores.json');
  const proveedoresRaw = await readFile(proveedoresPath, 'utf-8');
  const proveedores = JSON.parse(proveedoresRaw);

  for (const proveedor of proveedores) {
    totalAssets++;
    const fullPath = await checkAssetExists(proveedor.logo, publicDir);
    try {
      const stats = await stat(fullPath);
      if (stats.isFile()) {
        log(`  ✅ ${proveedor.logo}`, 'green');
      } else {
        log(`  ❌ ${proveedor.logo} (no es un archivo)`, 'red');
        missingAssets++;
        missingList.push(proveedor.logo);
      }
    } catch {
      log(`  ❌ ${proveedor.logo} (faltante)`, 'red');
      missingAssets++;
      missingList.push(proveedor.logo);
    }
  }

  // Summary
  log('\n╔═══════════════════════════════════════════════════════════╗', 'blue');
  log('║                         RESUMEN                            ║', 'blue');
  log('╚═══════════════════════════════════════════════════════════╝', 'blue');

  log(`\n  Total de assets revisados: ${totalAssets}`, 'bold');
  log(`  ✅ Encontrados: ${totalAssets - missingAssets}`, 'green');
  log(`  ❌ Faltantes: ${missingAssets}`, missingAssets > 0 ? 'red' : 'green');

  if (missingList.length > 0) {
    log('\n  📋 Lista de archivos faltantes:', 'yellow');
    missingList.forEach(asset => {
      log(`    • ${asset}`, 'red');
    });
    log('\n  💡 Acción requerida: Agregar estos archivos a public/ o actualizar rutas en JSON', 'yellow');
  } else {
    log('\n  🎉 ¡Todos los assets están presentes!', 'green');
  }

  log('\n'); // newline

  // Exit with appropriate code
  process.exit(missingAssets > 0 ? 1 : 0);
}

validateAssets().catch(err => {
  console.error('Error durante validación:', err);
  process.exit(1);
});
