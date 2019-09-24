export default (Model, documents, options) => (
  new Promise((resolve, reject) => (
    Model.populate(documents, options, (error, populatedDocuments) => {
      if (error) reject(error);
      resolve(populatedDocuments);
    })
  ))
);
