import React from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import {
  AdvancedHttpSettings,
  Auth,
  ConfigSection,
  ConnectionSettings,
  convertLegacyAuthProps,
} from '@grafana/plugin-ui';
import { Field, Input } from '@grafana/ui';

import { SplunkDataSourceOptions } from './types';

type Props = DataSourcePluginOptionsEditorProps<SplunkDataSourceOptions>;

export const ConfigEditor = ({ options, onOptionsChange }: Props) => {
  const onAppChange = (event: React.FormEvent<HTMLInputElement>) => {
    const jsonData = {
      ...options.jsonData,
      splunkApp: event.currentTarget.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  return (
    <>
      {ConnectionSettings({ config: options, onChange: onOptionsChange }) as React.ReactElement}
      <Auth {...convertLegacyAuthProps({ config: options, onChange: onOptionsChange })} />
      <ConfigSection title="Splunk Settings" isCollapsible isInitiallyOpen={true}>
        <Field label="Splunk App" description="The default Splunk app context under which queries will run. Defaults to services/ (no app context).">
          <Input
            value={options.jsonData.splunkApp ?? ''}
            onChange={onAppChange}
            placeholder="e.g. search"
            width={40}
          />
        </Field>
      </ConfigSection>
      <ConfigSection title="Advanced settings" isCollapsible isInitiallyOpen={false}>
        {AdvancedHttpSettings({ config: options, onChange: onOptionsChange }) as React.ReactElement}
      </ConfigSection>
    </>
  );
};
