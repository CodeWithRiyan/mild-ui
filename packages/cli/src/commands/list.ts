import chalk from 'chalk';

export function listComponents(): void {
  console.log(chalk.bold('Available components:'));
  console.log(chalk.green('- button'));
  console.log();
  console.log(chalk.bold('Coming soon:'));
  console.log('- input');
  console.log('- checkbox');
  console.log('- radio');
  console.log('- select');
}