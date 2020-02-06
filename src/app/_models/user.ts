import { Photo } from './Photo';
import { Gender } from './Gender';

export interface User {
  id: number;
  username: string;
  age: number;
  gender: Gender;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  stateProv: string;
  countryId: string;
  interests?: string;
  introduction?: string;
  lookingFor?: Gender;
  photos?: Photo[];
}
