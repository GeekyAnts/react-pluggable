import React from 'react';
import { PluginStore } from './PluginStore';
import PluginStoreContext from './PluginStoreContext';

export const PluginProvider: React.SFC<{
  pluginStore: PluginStore;
  children: any;
}> = ({ pluginStore, children }) => {
  const PluginStore = PluginStoreContext;
  return (
    <PluginStore.Provider value={pluginStore}>{children}</PluginStore.Provider>
  );
};
