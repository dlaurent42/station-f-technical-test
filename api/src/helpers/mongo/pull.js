export default (Model, field, array) => (
  new Promise((resolve, reject) => (
    Model.updateMany(
      {},
      { $pull: { [field]: { $in: array } } },
      { multi: true, new: true },
      (error, documents) => {
        if (error) reject(error);
        else resolve(documents);
      },
    )
  ))
);
