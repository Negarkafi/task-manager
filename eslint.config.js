import { init } from '@fullstacksjs/eslint-config';
import reactRefresh from 'eslint-plugin-react-refresh';

export default init(
  {
    esm: true,
    typescript: {
      projects: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'],
    },
    strict: true,
  },
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'tailwindcss/no-custom-classname': 'off',
    },
  },
);
