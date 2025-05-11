#!/usr/bin/env node
// packages/cli/src/index.ts

import { program } from 'commander';
import { addCommand } from './commands/add';
import { initCommand } from './commands/init';
import { listCommand } from './commands/list';
import { logger } from './utils/logger';

// Show mild-ui ASCII art banner
const showBanner = () => {
  console.log(`
  ┌─────────────────────────────────────┐
  │                                     │
  │    ┌┬┐┬┬  ┌┬┐   ┬ ┬┬               │
  │    │││││   ││   │ ││               │
  │    ┴ ┴┴┴─┘─┴┘   └─┘┴─┘             │
  │                                     │
  │    UI Components, mild not wild     │
  │                                     │
  └─────────────────────────────────────┘
  `);
};

const run = async () => {
  try {
    showBanner();

    program
      .name('mild-ui')
      .description('UI component library with a focus on simplicity and customizability')
      .version('0.1.0');

    // Register commands
    addCommand(program);
    initCommand(program);
    listCommand(program);

    program.parse();
  } catch (error) {
    logger.error('An unexpected error occurred:', error);
    process.exit(1);
  }
};

run();