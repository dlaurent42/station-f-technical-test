export default (Model, id) => (
  new Promise((resolve, reject) => (
    Model.findByIdAndDelete(id, (error, document) => {
      if (error) reject(error);
      else resolve(document);
    })
  ))
);
