const Tour = require('./../models/tourModel');

// 1-) ROUTES HANDLERS
// GET Tours:sending back to the client
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);

    // Build Query
    // 1a)Filtering
    const queryObject = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObject[el]);
    console.log(req.query, queryObject);

    // 1b) Advanced filtering
    let queryStr = JSON.stringify(queryObject);
    // g flag replace all accourance
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    //console.log(JSON.parse(queryStr));

    // writing query 1:
    let query = Tour.find(JSON.parse(queryStr));
    // writing query 2:
    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field Limitting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4)Pagination, 1-10 page 1, 11-20 page 2
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    // Execute Query
    const tours = await query;

    // Send Response
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// GET Single Tour
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id:req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

// POST
exports.createTour = async (req, res) => {
  try {
    //const newTour= new Tour({})
    //newTour.save()
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data set'
    });
  }
};

// PATCH
exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (updatedTour) {
      return res.status(201).json({
        status: 'success',
        data: {
          tour: updatedTour
        }
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data set'
    });
  }
};

// DELETE
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
};
