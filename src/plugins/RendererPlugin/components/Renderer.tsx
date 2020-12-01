import React, { useEffect } from 'react';
import useForceUpdate from '../../../hooks/useForceUpdate';
import { usePluginStore } from '../../../hooks/usePluginStore';
import ComponentUpdatedEvent from '../events/ComponentUpdatedEvent';

export const Renderer: React.SFC<{
  placement: string;
}> = ({ placement }) => {
  const pluginStore = usePluginStore();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const eventListener = (event: ComponentUpdatedEvent) => {
      if (event.position === placement) {
        forceUpdate();
      }
    };
    pluginStore.addEventListener('Renderer.componentUpdated', eventListener);

    return () => {
      pluginStore.removeEventListener(
        'Renderer.componentUpdated',
        eventListener
      );
    };
  }, [pluginStore]);

  let components = pluginStore.executeFunction(
    'Renderer.getComponentsInPosition',
    placement
  );

  return (
    <>
      {components.map((Component: any, index: number) => (
        <Component key={index} />
      ))}
    </>
  );
};
