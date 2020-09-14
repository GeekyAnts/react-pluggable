import * as React from 'react';
import { usePluginStore } from '../../.';

const Test = (props: any) => {
  const pluginStore: any = usePluginStore();
  console.log(pluginStore);
  pluginStore.executeFunction('test', 1, 2);
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
