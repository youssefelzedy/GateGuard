import { Document } from 'mongoose';

interface IGarage extends Document {
  garageName: string;
  location: string;
  currentOccupancy: number;
  active: boolean;
  gateStatus: 'Open' | 'Closed';
}

export default IGarage;
