import * as React from 'react';
import { usePluginStore } from '../../src';

const Test = (props: any) => {
  const pluginStore: any = usePluginStore();
  let Renderer = pluginStore.executeFunction(
    'RendererPlugin.getRendererComponent'
  );
  return (
    <>
      <h1>Working</h1>{' '}
      <button
        onClick={() => {
          pluginStore.executeFunction('sendAlert');
        }}
      >
        Send Alert
      </button>
      <Renderer placement={'top'} />
    </>
  );
};

export default Test;
