export default (Model, data) => (
  new Promise((resolve, reject) => (
    Model.create(data, (error, document) => {
      if (error) reject(error);
      else resolve(document);
    })
  ))
);
