import { App } from '@app/App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@app/index.scss';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw 'Root element not found!';
}
