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
      data: doc
    })
  } catch (error) {
    console.log('Error writing data', error);
    res.status(400).end();
  }
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
