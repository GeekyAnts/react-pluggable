import React from 'react';
import { usePluginStore } from '../../../hooks/usePluginStore';

export const Renderer: React.SFC<{
  placement: string;
}> = ({ placement }) => {
  const pluginStore = usePluginStore();

  let components = pluginStore.executeFunction(
    'RendererPlugin.getComponentsInPosition',
    placement
  );

  return (
    <>
      {components.map((Component: any) => (
        <Component />
      ))}
    </>
  );
};
