import React, { useEffect } from 'react';
import useForceUpdate from '../../../hooks/useForceUpdate';
import { usePluginStore } from '../../../hooks/usePluginStore';
import ComponentAddedEvent from '../events/ComponentAddedEvent';

export const Renderer: React.SFC<{
  placement: string;
}> = ({ placement }) => {
  const pluginStore = usePluginStore();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const eventListener = (event: ComponentAddedEvent) => {
      if (event.position === placement) {
        forceUpdate();
      }
    };
    pluginStore.addEventListener('Renderer.componentAdded', eventListener);

    return () => {
      pluginStore.removeEventListener('Renderer.componentAdded', eventListener);
    };
  }, [pluginStore]);

  let components = pluginStore.executeFunction(
    'Renderer.getComponentsInPosition',
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
