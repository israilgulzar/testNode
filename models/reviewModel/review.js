
const Review = require("./schema")

const createReview = async (insertData) => {
    const review = new Review(insertData)

    const reviewResult = await review
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
            return null
        })

    return reviewResult
}

const fetchReviewData = (productId) => {
    return Review.find({
        productData: productId,
    })
        .populate({
            path: "userData",
            select: ["email"],
        })
        .populate({
            path: "productData",
            select: ["name"],
        })
        .then((ReviewData) => {
            return ReviewData
        })
        .catch((err) => {
            console.log(err)
            return null
        })
}

const updateReview = async (reviewId, updateData) => {
    const reviewResult = Review.updateOne({ _id: reviewId }, updateData)
        .then((model) => {
            return true
        })
        .catch((err) => {
            console.log(err)
            return false
        })

    return reviewResult
}

const fetchOneReview = async (userId, productId) => {
    const reviewData = await Review.findOne({
        userData: userId,
        productData: productId,
    })
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    return reviewData
}

const fetchReviewById = async (reviewId) => {
    const reviewData = await Review.findOne({
        _id: reviewId,
    })
        .populate({
            path: "userData",
            select: ["email"],
        })
        .populate({
            path: "productData",
            select: ["name"],
        })
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    return reviewData
}

const deleteReview = async (reviewId) => {
    const eviewResult = await Review.deleteOne({
        _id: reviewId,
    })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return eviewResult
}

module.exports = {
    createReview,
    fetchReviewData,
    updateReview,
    fetchReviewById,
    deleteReview,
    fetchOneReview
}
