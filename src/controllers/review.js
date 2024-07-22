import asyncHandler from "express-async-handler";

export default CgetPlaceReview = asyncHandler(async (req, res) => {
    res.json({result : true});
})

