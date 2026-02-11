/**
 * @type {Record<string, string | (filenames: string[]) => string | string[] | Promise<string | string[]>}
 */
export default {
  '*.{js,cjs,mjs,ts,cts,mts,tsx,jsx}': ['eslint --fix'],
  '*': (files) => [
    `cspell lint --no-progress --no-summary --no-must-find-files ${files.join(' ')}`,
    // Spell check file names
    `sh -c 'echo "${files.join('\n')}" | cspell --show-context stdin'`,
    `prettier --write --ignore-unknown ${files.join(' ')}`,
    `secretlint ${files.join(' ')}`,
  ],
};
