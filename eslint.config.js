import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort' // import 정렬 플러그인 추가 

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],

    // extends: 여러 규칙 세트를 불러와서 적용합니다. 
    extends: [
      js.configs.recommended, // JavaScript 기본 규칙
      tseslint.configs.recommended,   // TypeScript 기본 규칙
      reactHooks.configs['recommended-latest'], // React Hooks 규칙
      reactRefresh.configs.vite,  // React Refresh 규칙
    ],

    // languageOptions: ECMAScript 버전, 글로벌 객체 등 환경 설정
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    // plugins: 추가 ESLint 플러그인 설정
    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    // rules: ESLint 규칙 설정
    rules:{
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },

  },
])
