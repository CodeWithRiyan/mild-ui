// packages/core/scripts/debug-components.js
const fs = require('fs').promises;
const path = require('path');

async function debugComponents() {
  console.log('🔍 Debug: Component Detection\n');
  
  const coreDir = path.join(__dirname, '..');
  console.log('📁 Core directory:', coreDir);
  
  const srcDir = path.join(coreDir, 'src');
  console.log('📁 Source directory:', srcDir);
  
  // Check if src exists
  try {
    const srcStat = await fs.stat(srcDir);
    console.log('✅ src directory exists');
    
    const srcContents = await fs.readdir(srcDir);
    console.log('📂 src directory contents:', srcContents);
  } catch (error) {
    console.log('❌ src directory does not exist');
    console.log('💡 Expected structure: packages/core/src/components/');
    return;
  }
  
  const componentsDir = path.join(srcDir, 'components');
  console.log('📁 Components directory:', componentsDir);
  
  // Check if components exists
  try {
    const componentsStat = await fs.stat(componentsDir);
    console.log('✅ components directory exists');
    
    const componentsContents = await fs.readdir(componentsDir);
    console.log('📂 components directory contents:', componentsContents);
    
    // Check each component directory
    for (const item of componentsContents) {
      const itemPath = path.join(componentsDir, item);
      try {
        const itemStat = await fs.stat(itemPath);
        if (itemStat.isDirectory()) {
          console.log(`\n📁 Component: ${item}`);
          const componentFiles = await fs.readdir(itemPath);
          console.log(`   Files:`, componentFiles);
          
          // Check for key files
          const hasTypes = componentFiles.some(f => f.endsWith('.types.ts'));
          const hasStyles = componentFiles.some(f => f.endsWith('.styles.ts'));
          const hasCore = componentFiles.some(f => f.endsWith('.core.ts'));
          const hasIndex = componentFiles.includes('index.ts');
          
          console.log(`   ✨ Analysis:`, {
            hasTypes,
            hasStyles, 
            hasCore,
            hasIndex
          });
        }
      } catch (error) {
        console.log(`   ⚠️ Could not analyze ${item}:`, error.message);
      }
    }
  } catch (error) {
    console.log('❌ components directory does not exist');
    console.log('💡 Create it with: mkdir -p packages/core/src/components');
    return;
  }
  
  // Check SASS structure
  const sassDir = path.join(srcDir, 'sass');
  console.log(`\n🎨 Checking SASS structure:`, sassDir);
  
  try {
    const sassStat = await fs.stat(sassDir);
    console.log('✅ sass directory exists');
    
    const sassContents = await fs.readdir(sassDir);
    console.log('📂 sass directory contents:', sassContents);
    
    // Check tokens
    const tokensDir = path.join(sassDir, 'tokens');
    try {
      const tokenFiles = await fs.readdir(tokensDir);
      console.log('🎯 Design token files:', tokenFiles.filter(f => f.endsWith('.scss')));
    } catch (error) {
      console.log('⚠️ No tokens directory found');
    }
    
    // Check components sass
    const sassComponentsDir = path.join(sassDir, 'components');
    try {
      const sassComponentFiles = await fs.readdir(sassComponentsDir);
      console.log('🎨 Component SASS files:', sassComponentFiles.filter(f => f.endsWith('.scss')));
    } catch (error) {
      console.log('⚠️ No sass components directory found');
    }
  } catch (error) {
    console.log('❌ sass directory does not exist');
  }
  
  console.log('\n🎯 Recommendations:');
  console.log('1. Create components with this structure:');
  console.log('   packages/core/src/components/Button/');
  console.log('   ├── Button.types.ts');
  console.log('   ├── Button.styles.ts'); 
  console.log('   ├── Button.core.ts');
  console.log('   └── index.ts');
  console.log('');
  console.log('2. Or use existing components from your codebase');
  console.log('3. SASS files go in: packages/core/src/sass/');
}

if (require.main === module) {
  debugComponents().catch(console.error);
}