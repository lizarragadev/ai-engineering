const requiredMajorVersion = 18;
const currentVersion = process.version;
const majorVersion = parseInt(currentVersion.slice(1).split('.')[0], 10);

console.log(`✓ Node.js version: ${currentVersion}`);

if (majorVersion >= requiredMajorVersion) {
  console.log(`✓ Node.js version ${majorVersion} meets the requirement (>= ${requiredMajorVersion})`);
  process.exit(0);
} else {
  console.error(`✗ Node.js version ${majorVersion} does not meet the requirement (>= ${requiredMajorVersion})`);
  console.error(`  Please upgrade to Node.js ${requiredMajorVersion} or higher`);
  process.exit(1);
}
