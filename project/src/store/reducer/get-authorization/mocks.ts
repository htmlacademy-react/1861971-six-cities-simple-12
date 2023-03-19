import { name, internet, datatype } from 'faker';
import { Authorization } from '../../../types/const/const';

export const makeFakeUserData = (): Authorization => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number({max: 30}),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
});
