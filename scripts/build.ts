import { execSync } from 'child_process';

async function main() {
  const env = process.env.VERCEL_ENV || 'development';
  if (env !== 'development') {
    execSync('max build', { stdio: 'inherit' });
    return;
  }
}

main();
