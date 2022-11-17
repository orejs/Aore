import { execSync } from 'child_process';

async function main() {
  const env = process.env.VERCEL_ENV || 'development';
  console.log('SECRET', process.env.SECRET);

  if (env !== 'development') {
    execSync('max build', { stdio: 'inherit' });
    return;
  }
}

main();
