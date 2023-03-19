import { name, internet, datatype, commerce } from 'faker';
import { Comments, Comment } from '../../../types/const/const';

export const makeFakeUserComments = (): Comments => {
  const comments: Comments = new Array(datatype.number(5))
    .map((): Comment =>
      ({
        comment: commerce.productDescription(),
        date: datatype.datetime().toString(),
        id: datatype.number(30),
        rating: datatype.number(5),
        user: {
          avatarUrl: internet.avatar(),
          id: datatype.number(30),
          isPro: datatype.boolean(),
          name: name.firstName()
        }
      })
    );

  return comments;
};
