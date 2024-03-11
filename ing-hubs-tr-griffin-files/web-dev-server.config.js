/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  appIndex: "index.html",
  nodeResolve: true,
  port: 4200,
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: true,
      },
    }),
  ],
  watch: true
};
