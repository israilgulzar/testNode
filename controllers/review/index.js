
const ReviewModel = require("../../models/reviewModel/review")
const { pageMaker, makeRespObj } = require("../../AppUtils/")

const reviewSubmit = async (userInputs) => {
    try {
        const { userId, productId, ...reviewData } = userInputs

        const existingReview = await ReviewModel.fetchOneReview(
            userId,
            productId
        )

        if (existingReview) {
            return makeRespObj({
                status_code: 400,
                message:
                    "You have already submitted a review for this product.",
            })
        }

        const reviewResult = await ReviewModel.createReview({
            userData: userId,
            productData: productId,
            ...reviewData,
        })

        if (reviewResult) {
            return makeRespObj({
                status_code: 201,
                message:
                    "Your review has been submitted successfully. Thank you!",
                data: reviewResult,
            })
        } else {
            return makeRespObj({
                status_code: 500,
                message:
                    "Failed to submit your review. Please try again later.",
            })
        }
    } catch (error) {
        console.error("<---reviewSubmit--->", error)
        return makeRespObj({
            status_code: 500,
            message:
                "An error occurred while submitting your review. Please try again later.",
        })
    }
}

const getReviewData = async (userInputs) => {
    try {
        const { productId } = userInputs

        const reviewData = await ReviewModel.fetchReviewData(productId)

        if (reviewData && reviewData.length === 0) {
            return makeRespObj({
                status_code: 201,
                message: "No reviews found",
                data: {
                    reviews: [],
                    averageRating: 0,
                },
            })
        } else {
            const totalRatings = reviewData.reduce(
                (sum, review) => sum + review.rating,
                0
            )
            let averageRating = totalRatings / reviewData.length
            return makeRespObj({
                status_code: 201,
                message: "Data found successfully.",
                data: {
                    reviews: reviewData,
                    averageRating: averageRating,
                },
            })
        }
    } catch (error) {
        console.error("<---getData--->", error)
        return makeRespObj({
            status_code: 500,
            message: "Data retrieval failed.",
            error: error,
        })
    }
}

const updateReview = async (userInputs) => {
    try {
        const { reviewId, userId, productId, ...review } = userInputs

        const existingReview = await ReviewModel.fetchReviewById(reviewId)

        if (!existingReview) {
            return makeRespObj({
                status_code: 404,
                message: "Review not found",
            })
        }

        if (existingReview.userData._id.toString() !== userId) {
            return makeRespObj({
                status_code: 403,
                message: "You are not authorized to update this review",
            })
        }

        const updatedReview = await ReviewModel.updateReview(reviewId, {
            ...review,
        })

        if (updatedReview) {
            return makeRespObj({
                status_code: 200,
                message: "Review updated successfully",
                data: updatedReview,
            })
        } else {
            return makeRespObj({
                status_code: 500,
                message: "Failed to update review",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getReviewById = async (userInputs) => {
    try {
        const { reviewId } = userInputs
        const getReviewData = await ReviewModel.fetchReviewById(reviewId)

        if (getReviewData) {
            return makeRespObj({
                status_code: 200,
                message: "Data get successful",
                data: getReviewData,
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Data fetch failed !",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const deleteReview = async (userInputs) => {
    try {
        const { reviewId } = userInputs

        const deleteReview = await ReviewModel.deleteReview(reviewId)

        if (deleteReview) {
            return makeRespObj({
                status_code: 200,
                message: "Review deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete Review",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

// const likeReview = async (userInputs,) => {
//     try {
//         const { reviewId , userId} = userInputs

//         const review = await ReviewModel.fetchReviewById(reviewId)

//         if (!review) {
//             return makeRespObj({
//                 message: "Review not found",
//             })
//         }

//         const update = ReviewModel.updateReview(reviewId, {
//             likes : 1
//         })

//         return makeRespObj({
//             message: "Review liked successfully",
//         })
//     } catch (error) {
//         console.log(error)
//         return makeRespObj({
//             status_code: 500,
//             catchErr: error,
//         })
//     }
// }

const likeReview = async (userInputs) => {
    try {
        const { reviewId, userId } = userInputs;

        // Fetch the review document
        const review = await ReviewModel.fetchReviewById(reviewId);

        if (!review) {
            return makeRespObj({
                message: "Review not found",
            });
        }

        // Ensure the 'likes' field is an array
        if (!Array.isArray(review.likes)) {
            return makeRespObj({
                status_code: 500,
                message: "Invalid 'likes' field in the review document",
            });
        }

        // Check if the user has already liked the review
        if (review.likes.includes(userId)) {
            return makeRespObj({
                message: "You have already liked this review",
            });
        }

        // Add the user's ID to the 'likes' array
        review.likes.push(userId);

        // Update the review document with the modified 'likes' array
        const updatedReview = await ReviewModel.updateReview(reviewId, {
            likes: review.likes,
        });

        if (!updatedReview) {
            return makeRespObj({
                status_code: 500,
                message: "Failed to update the review",
            });
        }

        return makeRespObj({
            message: "Review liked successfully",
        });
    } catch (error) {
        console.error(error);
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        });
    }
};



module.exports = {
    reviewSubmit,
    getReviewData,
    updateReview,
    deleteReview,
    getReviewById,
    likeReview,
}
