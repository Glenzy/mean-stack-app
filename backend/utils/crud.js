//get:id
export const getOne = model => async (req, res) => {
  console.log('Get one from db called');
  res.status(200).json({
    message: "Get one from db called"
  });
}
//get
export const getMany = model => async (req, res) => {
  console.log('Get many from db called');
  res.status(200).json({
    message: "Get many from db called"
  });
}
//post
export const createOne = model => async (req, res) => {
  console.log('Create one on db called');
  res.status(200).json({
    message: "Create one on db called"
  });
}

export const updateOne = model => async (req, res) => {
  console.log('Update one on db called');
  res.status(200).json({
    message: "Update one on db called"
  });
}

export const removeOne = model => async (req, res) => {
  console.log('Remove one on db called');
  res.status(200).json({
    message: "Remove one on db called"
  });
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
