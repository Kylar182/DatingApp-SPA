import { Photo } from './Photo';
import { Gender } from './Gender.enum';
import { Country } from './Country.enum';

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
  country: Country;
  interests?: string;
  introduction?: string;
  lookingFor?: Gender;
  photos?: Photo[];
}
