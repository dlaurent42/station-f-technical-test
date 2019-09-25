export default (Model, filters = {}) => (
  new Promise((resolve, reject) => (
    Model.findOne(filters, (error, document) => {
      if (error) reject(error);
      else resolve(document);
    })
  ))
);
