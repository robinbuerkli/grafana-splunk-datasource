import type { Monaco, monacoTypes } from '@grafana/ui';

import { splLanguage } from './splMonarch';

export const SPL_LANGUAGE_ID = 'spl';
export const SPL_THEME_ID = 'spl-splunk-theme';

let isSplLanguageRegistered = false;
let isSplThemeRegistered = false;

export const registerSplunkLanguage = (monacoInstance: Monaco) => {
  if (!isSplLanguageRegistered) {
    if (!monacoInstance.languages.getLanguages().some(lang => lang.id === SPL_LANGUAGE_ID)) {
      monacoInstance.languages.register({ id: SPL_LANGUAGE_ID });
    }

    monacoInstance.languages.setMonarchTokensProvider(
      SPL_LANGUAGE_ID,
      splLanguage as unknown as monacoTypes.languages.IMonarchLanguage
    );
    isSplLanguageRegistered = true;
  }

  if (!isSplThemeRegistered) {
    monacoInstance.editor.defineTheme(SPL_THEME_ID, {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword.spl-command', foreground: '789EFF' },
        { token: 'predefined.spl-agg', foreground: 'D97ED9' },
        { token: 'predefined.spl-function', foreground: 'D97ED9' },
        { token: 'identifier.spl-field-name', foreground: '95D640' },
        { token: 'keyword.spl-clause', foreground: 'F7A45B' },
        { token: 'operator', foreground: 'FFFFFF' },
        { token: 'operator.logical', foreground: 'FFFF00' },
        { token: 'string', foreground: 'CCCCCC' },
        { token: 'number', foreground: 'ADD8E6' },
        { token: 'delimiter', foreground: 'FFFFFF' },
        { token: '@brackets', foreground: 'FFFFFF' },
        { token: 'identifier', foreground: 'CCCCCC' },
        { token: 'comment', foreground: 'AAAAAA' },
        { token: 'white', foreground: 'CCCCCC' },
      ],
      colors: {
        'editor.background': '#2b3033',
      },
    });
    isSplThemeRegistered = true;
  }

  monacoInstance.editor.setTheme(SPL_THEME_ID);
};
