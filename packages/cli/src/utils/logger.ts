// packages/cli/src/utils/logger.ts
import chalk from 'chalk';

/**
 * Simple logger utility for the CLI
 */
export const logger = {
  /**
   * Log an informational message
   */
  info: (message: string, ...args: any[]) => {
    console.log(chalk.blue('ℹ'), message, ...args);
  },

  /**
   * Log a success message
   */
  success: (message: string, ...args: any[]) => {
    console.log(chalk.green('✓'), message, ...args);
  },

  /**
   * Log a warning message
   */
  warn: (message: string, ...args: any[]) => {
    console.log(chalk.yellow('⚠'), message, ...args);
  },

  /**
   * Log an error message
   */
  error: (message: string, ...args: any[]) => {
    console.error(chalk.red('✗'), message, ...args);
  },

  /**
   * Log a debug message (only when DEBUG=true)
   */
  debug: (message: string, ...args: any[]) => {
    if (process.env.DEBUG) {
      console.log(chalk.gray('⚙'), message, ...args);
    }
  },

  /**
   * Start a loading spinner
   */
  spinner: (message: string) => {
    const ora = require('ora');
    return ora(message).start();
  },
};