import { useState, useCallback } from 'react';
import { SavedProtocol, ProtocolPatch, UniverseCheckpoint } from '../types';

export const useUniverseStorage = () => {
  const [protocols, setProtocolsState] = useState<SavedProtocol[]>(() => {
    const saved = localStorage.getItem('qcos_protocols');
    return saved ? JSON.parse(saved) : [];
  });

  const [patches, setPatchesState] = useState<ProtocolPatch[]>(() => {
    const saved = localStorage.getItem('qcos_patches');
    return saved ? JSON.parse(saved) : [];
  });

  const [checkpoints, setCheckpointsState] = useState<UniverseCheckpoint[]>(() => {
    const saved = localStorage.getItem('qcos_checkpoints');
    return saved ? JSON.parse(saved) : [];
  });

  const saveProtocol = useCallback((protocol: SavedProtocol) => {
    setProtocolsState(prev => {
      const next = [...prev, protocol];
      localStorage.setItem('qcos_protocols', JSON.stringify(next));
      return next;
    });
  }, []);

  const getProtocols = useCallback(() => {
    return protocols;
  }, [protocols]);

  const savePatch = useCallback((patch: ProtocolPatch) => {
    setPatchesState(prev => {
      const next = [...prev, patch];
      localStorage.setItem('qcos_patches', JSON.stringify(next));
      return next;
    });
  }, []);

  const getPatches = useCallback(() => {
    return patches;
  }, [patches]);

  const saveCheckpoint = useCallback((checkpoint: UniverseCheckpoint) => {
    setCheckpointsState(prev => {
      const next = [...prev, checkpoint];
      localStorage.setItem('qcos_checkpoints', JSON.stringify(next));
      return next;
    });
  }, []);

  const getCheckpoints = useCallback(() => {
    return checkpoints;
  }, [checkpoints]);

  return {
    protocols,
    patches,
    checkpoints,
    saveProtocol,
    getProtocols,
    savePatch,
    getPatches,
    saveCheckpoint,
    getCheckpoints
  };
};
