export default (Model, filters = {}) => (
  new Promise((resolve, reject) => (
    Model.find(filters, (error, documents) => {
      if (error) reject(error);
      else resolve(documents);
    })
  ))
);
