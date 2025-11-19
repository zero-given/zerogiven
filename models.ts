import shoe1Url from '@/shoe1.glb?url';
import shoe3Url from '@/shoe3.glb?url';
import shoe4Url from '@/shoe4.glb?url';
import shoe5Url from '@/shoe5.glb?url';

export type ShoeModel = {
  id: string;
  label: string;
  url: string;
};

const shoeModels: ShoeModel[] = [
  { id: 'shoe1', label: 'SHOE 01', url: shoe1Url },
  { id: 'shoe3', label: 'SHOE 03', url: shoe3Url },
  { id: 'shoe4', label: 'SHOE 04', url: shoe4Url },
  { id: 'shoe5', label: 'SHOE 05', url: shoe5Url },
];

export default shoeModels;
