(async () => {
  console.log('Checking environment dependencies...\n');

  const requiredPackages = ['typescript', 'ts-node', 'openai'];
  let allInstalled = true;

  for (const pkg of requiredPackages) {
    try {
      await import(pkg);
      console.log(`✓ ${pkg} is installed`);
    } catch (error) {
      console.error(`✗ ${pkg} is NOT installed`);
      allInstalled = false;
    }
  }

  if (allInstalled) {
    console.log('\n✓ All required dependencies are installed');
    process.exit(0);
  } else {
    console.error('\n✗ Some dependencies are missing. Run: npm install');
    process.exit(1);
  }
})();
