const Tour = require('./../models/tourModel');

// exports.checkId = (req, res, next, val) => {
//   console.log(`Tour id is:${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };
exports.checkBodyData = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

// 1-) ROUTES HANDLERS
// GET Tours:sending back to the client
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime
    // results: tours.length,
    // data: {
    //   tours
    // }
  });
};

// GET Single Tour
exports.getTour = (req, res) => {
  const id = req.params.id * 1; // converting number
  // const requestedTour = tours.find(tour => tour.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     requestedTour
  //   }
  // });
};
// POST
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success'
    // data: {
    //   tour: newTour
    // }
  });
};
// PATCH
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here...>' }
  });
};

// DELETE
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};

// testing purpose, should be on the top
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
