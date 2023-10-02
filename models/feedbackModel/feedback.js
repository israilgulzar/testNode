
const Feedback = require("./schema")

const createFeedback = (insertData) => {
    const feedback = new Feedback(insertData)

    return feedback
        .save()
        .then((feedbackResult) => {
            return feedbackResult
        })
        .catch((error) => {
            return null
        })
}

const fetchFeedbackData = (search, start, limit) => {
    let searchFilter = {}

    if (search !== "") {
        const ratingValue = parseInt(search)

        if (!isNaN(ratingValue)) {
            searchFilter.rating = ratingValue
        }
    }

    return Feedback.find(searchFilter)
        .populate({
            path: "userData",
            select: ["name", "email"],
        })
        .populate({
            path: "productData",
            select: ["name"],
        })
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((feedbackData) => {
            return feedbackData
        })
        .catch((error) => {
            return null
        })
}

const feedbackCount = (search) => {
    let searchFilter = {}

    if (search !== "") {
        const ratingValue = parseInt(search)

        if (!isNaN(ratingValue)) {
            searchFilter.rating = ratingValue
        }
    }

    return Feedback.countDocuments(searchFilter)
        .then((count) => {
            return count
        })
        .catch((error) => {
            return null
        })
}

const updateFeedback = (feedbackId, updateData) => {
    return Feedback.updateOne({ _id: feedbackId }, updateData)
        .then((model) => {
            return true
        })
        .catch((err) => {
            return false
        })
}

const fetchFeedbackById = (feedbackId) => {
    return Feedback.findOne({
        _id: feedbackId,
    })
        .populate({
            path: "userData",
            select: ["name", "email"],
        })
        .populate({
            path: "productData",
            select: ["name"],
        })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
}

const deleteFeedback = (feedbackId) => {
    return Feedback.deleteOne({ _id: feedbackId })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
}

module.exports = {
    createFeedback,
    fetchFeedbackData,
    updateFeedback,
    fetchFeedbackById,
    deleteFeedback,
    feedbackCount,
}
