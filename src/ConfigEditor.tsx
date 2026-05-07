import React from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import {
  AdvancedHttpSettings,
  Auth,
  ConfigSection,
  ConnectionSettings,
  convertLegacyAuthProps,
} from '@grafana/plugin-ui';

import { SplunkDataSourceOptions } from './types';

type Props = DataSourcePluginOptionsEditorProps<SplunkDataSourceOptions>;

export const ConfigEditor = ({ options, onOptionsChange }: Props) => (
  <>
    {ConnectionSettings({ config: options, onChange: onOptionsChange }) as React.ReactElement}
    <Auth {...convertLegacyAuthProps({ config: options, onChange: onOptionsChange })} />
    <ConfigSection title="Advanced settings" isCollapsible isInitiallyOpen={false}>
      {AdvancedHttpSettings({ config: options, onChange: onOptionsChange }) as React.ReactElement}
    </ConfigSection>
  </>
);
