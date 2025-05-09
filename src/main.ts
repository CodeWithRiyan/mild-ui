// Import styles
import '@mild-ui/core/styles/base.css';

// Create an element to redirect to Storybook
const app = document.getElementById('app');
if (app) {
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f5f5f5; font-family: sans-serif;">
      <h1 style="margin-bottom: 2rem; font-size: 2rem; color: #333;">mild-ui</h1>
      <p style="margin-bottom: 2rem; font-size: 1.2rem; color: #666; text-align: center; max-width: 600px;">
        A modern, framework-agnostic UI component library with support for React.
      </p>
      <div>
        <a href="https://github.com/CodeWithRiyan/mild-ui" style="display: inline-block; padding: 0.75rem 1.5rem; background-color: #333; color: white; border-radius: 0.375rem; text-decoration: none; font-weight: 500;">
          GitHub Repository
        </a>
      </div>
    </div>
  `;
}
