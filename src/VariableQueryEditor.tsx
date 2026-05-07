import React from 'react';
import type { QueryEditorProps } from '@grafana/data';
import type { DataQuery } from '@grafana/schema';
import { TextArea } from '@grafana/ui';

import type { DataSource } from './datasource';
import type { SplunkDataSourceOptions, SplunkQuery } from './types';

export type SplunkVariableQuery = DataQuery &
  Partial<SplunkQuery> & {
    query?: string;
    [key: string]: unknown;
  };

type VariableQueryProps = QueryEditorProps<DataSource, SplunkQuery, SplunkDataSourceOptions, SplunkVariableQuery>;

const normalizeVariableQuery = (query: SplunkVariableQuery): SplunkVariableQuery => {
  const queryText =
    typeof query.queryText === 'string' ? query.queryText : typeof query.query === 'string' ? query.query : '';

  return {
    ...query,
    queryText,
    query: queryText,
  };
};

export const VariableQueryEditor = ({ onChange, onRunQuery, query }: VariableQueryProps) => {
  const normalizedQuery = normalizeVariableQuery(query);

  const saveQuery = () => {
    onRunQuery();
  };

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const queryText = event.currentTarget.value;
    onChange({
      ...normalizedQuery,
      queryText,
      query: queryText,
    });
  };

  return (
    <div className="gf-form">
      <TextArea name="queryText" onBlur={saveQuery} onChange={handleChange} value={normalizedQuery.queryText ?? ''} />
    </div>
  );
};
