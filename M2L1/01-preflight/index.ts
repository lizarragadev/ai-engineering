#!/usr/bin/env ts-node
import { execSync } from 'child_process';

function check(cmd: string) {
  try {
    const out = execSync(cmd, { stdio: 'pipe' }).toString().trim();
    console.log(`${cmd}: OK -> ${out.split('\n')[0]}`);
  } catch (err: any) {
    console.error(`${cmd}: ERROR -> ${err.message}`);
  }
}

console.log('Running preflight checks...');
check('git --version');
check('python --version');
check('pip show sentence-transformers || pip show openai');
console.log('Preflight complete. If any errors occurred, follow troubleshooting in README.');
