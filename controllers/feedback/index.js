
const FeedbackModel = require("../../models/feedbackModel/feedback")
const { pageMaker, makeRespObj } = require("../../AppUtils/")

const applyFeedback = async (userInputs) => {
    try {
        const { userId, productId, ...feedback } = userInputs

        const createFeedbackResult = await FeedbackModel.createFeedback({
            userData: userId,
            productData: productId,
            ...feedback,
        })

        if (createFeedbackResult) {
            return makeRespObj({
                status_code: 201,
                message: "Feedback applied successfully.",
                data: createFeedbackResult,
            })
        } else {
            return makeRespObj({
                status_code: 500,
                message: "Failed to apply feedback. ",
            })
        }
    } catch (error) {
        console.error(error)
        return makeRespObj({
            status_code: 500,
            message: "Failed to apply feedback. An error occurred.",
        })
    }
}

const getfeedbackData = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const getFeedbackData = await FeedbackModel.fetchFeedbackData(
            search,
            page,
            perPage
        )

        const feedbackCountResult = await  FeedbackModel.feedbackCount(search);
        if (getFeedbackData !== null && feedbackCountResult !== null) {
          return makeRespObj({
              status_code: 200,
              message: "Data found successfully",
              data: {
                  feedbackData: getFeedbackData,
                  totalCount: feedbackCountResult,
              },
          });
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found in database",
                data: {
                  feedbackData: [],
                  totalCount :  0
                }
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const updatefeedback = async (userInputs) => {
    try {
        const { feedbackId, userId, productId, ...feedback } = userInputs

        const feedbackToUpdate = await FeedbackModel.fetchFeedbackById(feedbackId)

        if (!feedbackToUpdate) {
            return makeRespObj({
                status_code: 404,
                message: "Feedback not found",
            })
        }

        if (feedbackToUpdate.userData.toString() !== userId) {
            return makeRespObj({
                status_code: 403,
                message: "You are not authorized to update this feedback",
            })
        }

        const updatedfeedback = await FeedbackModel.updateFeedback(feedbackId, {
            userData: userId,
            productData: productId,
            ...feedback,
        })

        if (updatedfeedback) {
            return makeRespObj({
                status_code: 200,
                message: "Feedback updated successfully",
                data: updatedfeedback,
            })
        } else {
            return makeRespObj({
                status_code: 500,
                message: "Failed to update feedback",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}


const getfeedbackById = async (userInputs) => {
    try {
        const { feedbackId } = userInputs
        const getfeedbackData = await FeedbackModel.fetchFeedbackById(
            feedbackId
        )
        if (getfeedbackData) {
            return makeRespObj({
                status_code: 200,
                message: "Data get successful",
                data: getfeedbackData,
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Data not found!",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const deletefeedback = async (userInputs) => {
    try {
        const { feedbackId } = userInputs

        const deletefeedback = await FeedbackModel.deleteFeedback(feedbackId)

        if (deletefeedback) {
            return makeRespObj({
                status_code: 200,
                message: "feedback deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete feedback",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}



module.exports = {
    applyFeedback,
    getfeedbackData,
    updatefeedback,
    getfeedbackById,
    deletefeedback,
}
