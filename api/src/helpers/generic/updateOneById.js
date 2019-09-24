export default (Model, id, data) => (
  new Promise((resolve, reject) => (
    Model.findByIdAndUpdate({ _id: id }, data, { new: true }, (error, document) => {
      if (error) reject(error);
      else resolve(document);
    })
  ))
);
