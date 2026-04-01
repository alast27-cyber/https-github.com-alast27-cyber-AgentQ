import { DataSource } from '../types';

export const DATA_SOURCES: DataSource[] = [
  {
    id: 'src-1',
    name: 'Neural Lattice Alpha',
    type: 'SENSOR',
    reliability: 0.98,
    throughput: '1.2 PB/s',
    description: 'Primary neural lattice monitoring station.',
    status: 'ONLINE',
    entropySource: 'Quantum Vacuum Fluctuations',
    color: '#a855f7'
  },
  {
    id: 'src-2',
    name: 'Global Mesh Network',
    type: 'NETWORK',
    reliability: 0.95,
    throughput: '850 TB/s',
    description: 'Distributed cognitive relay network.',
    status: 'ONLINE',
    entropySource: 'Atmospheric Noise',
    color: '#06b6d4'
  }
];
