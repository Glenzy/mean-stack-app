//get:id
export const getOne = model => async (req, res) => {
  console.log('Get one from db called');
  res.status(200).json({
    message: "Get one from db called"
  });
}
//get
export const getMany = model => async (req, res) => {
  //console.log('Get many from db called', req.body);
  try {
    const posts = await model
      .find()
      .lean()
      .exec()
    //console.log('docs', posts);
    res.status(200).json({
      posts
    });
  } catch (error) {
    console.log('Error getting data', error);
    res.status(400).end();
  }
}
//post
export const createOne = model => async (req, res) => {
  console.log('Create one on db called', req.body);
  try {
    const doc = await model.create({
      ...req.body
    })
    res.status(201).json({
      data: doc,
      id: doc._id
    })
  } catch (error) {
    console.log('Error writing data', error);
    res.status(400).end();
  }
}

export const updateOne = model => async (req, res) => {
  console.log('Update one on db called');
  const id = req.params.id;
  await model.updateOne({
    ...req.body
  }, (error, result) => {
    if (error) {
      console.log('Error Updating data', error);
      res.status(400).end();
    }
    if (result) {
      res.status(200).json({
        message: "Update one on db called"
      });
    }
  });
}

export const removeOne = model => async (req, res) => {
  console.log('Remove one on db called');
  const id = req.params.id;
  await model.deleteOne({
    _id: id
  }, (error, result) => {
    if (error) {
      console.log('Error deleting data', error);
      res.status(400).end();
    }
    if (result) {
      res.status(200).json({
        message: "Remove one on db called"
      });
    }
  });
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
