import * as React from 'react';
import { usePluginStore } from '../../.';

const Test = (props: any) => {
  const pluginStore: any = usePluginStore();
  console.log(pluginStore);
  pluginStore.executeFunction('test', 1, 2);
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
    </>
  );
};

export default Test;
