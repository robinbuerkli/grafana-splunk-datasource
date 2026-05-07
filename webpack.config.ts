import type { Configuration } from 'webpack';

import grafanaConfig, { type Env } from './.config/webpack/webpack.config';

const config = async (env: Env): Promise<Configuration> => {
  const baseConfig = await grafanaConfig(env);
  const externals = Array.isArray(baseConfig.externals)
    ? baseConfig.externals
    : baseConfig.externals
      ? [baseConfig.externals]
      : [];

  return {
    ...baseConfig,
    externals: [...externals, 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  };
};

export default config;
