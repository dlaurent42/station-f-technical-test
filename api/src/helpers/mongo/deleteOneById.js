import { isEmpty } from '../../utils';

export default (Model, id) => (
  new Promise((resolve, reject) => (
    Model.findByIdAndDelete(id, (error, document) => {
      if (error) reject(error);
      else resolve(!isEmpty(document));
    })
  ))
);
