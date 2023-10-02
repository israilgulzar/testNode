const TagModel = require("../../models/tagModel/tag")
const { makeRespObj } = require("../../AppUtils")

const addTag = async (userInputs) => {
    try {
        const { tagName } = userInputs
        const tagIdArray = []

        for (const tagData of tagName) {
            try {
                const existingTag = await TagModel.filterTagData({
                    tagName: tagData,
                })

                if (!existingTag) {
                    const createdTag = await TagModel.createTag({
                        tagName: tagData,
                        isActive: true,
                    })

                    tagIdArray.push({
                        tagName: tagData,
                        id: createdTag._id,
                    })
                } else {
                    return makeRespObj({
                        status_code: 409,
                        message: `Tag already exists`,
                    })
                }
            } catch (error) {
                console.error("Error creating tag :: ", error)
                return makeRespObj({
                    status_code: 500,
                    message: "An unexpected error occurred while creating tags",
                    error: error,
                })
            }
        }
        return makeRespObj({
            status_code: 201,
            message: "Tag created successfully",
            data: tagIdArray,
        })
    } catch (error) {
        console.error("Unexpected error detected :: ", error)
        return makeRespObj({
            status_code: 500,
            message: "An unexpected error occurred",
            error: error,
        })
    }
}

const updateTag = async (userInputs, request) => {
    try {
        const { id, tagName } = userInputs

        const getFilterData = await TagModel.filterTagData({ tagName: tagName })

        if (getFilterData !== null && getFilterData._id.toString() !== id) {
            return makeRespObj({
                status_code: 409,
                message: "Failed to update tag",
                error: { tagName: "Tag name already exists." },
            })
        }

        const updateResult = await TagModel.updateTag(id, { tagName: tagName })

        if (updateResult) {
            return makeRespObj({
                status_code: 200,
                message: "Tag updated successfully",
            })
        } else {
            return makeRespObj({
                status_code: 403,
                message: "Failed to update the tag",
            })
        }
    } catch (error) {
        console.error("Unexpected error detected :: ", error)
        return makeRespObj({
            status_code: 500,
            message: "An unexpected error occurred",
            error: error,
        })
    }
}
const getTagDataById = async (userInputs) => {
    try {
        const { id } = userInputs

        const getTagData = await TagModel.fetchTagById(id)

        if (getTagData !== null) {
            return makeRespObj({
                status_code: 200,
                message: "Data get successfully",
                data: getTagData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
            })
        }
    } catch (error) {
        console.error("Unexpected error detected :: ", error)
        return makeRespObj({
            status_code: 500,
            message: "An unexpected error occurred",
            error: error,
        })
    }
}
const getTagsData = async (userInputs) => {
    try {
        const { search, startToken, endToken, status } = userInputs

        const perPage = parseInt(endToken) || 10
        let page = Math.max((parseInt(startToken) || 1) - 1, 0)
        if (page !== 0) {
            page = perPage * page
        }

        const getTagData = await TagModel.fetchTags(
            search,
            page,
            perPage,
            status
        )
        const recordCount = await TagModel.fetchTagsCount(search, status)

        if (getTagData !== null) {
            return makeRespObj({
                status_code: 200,
                message: "Data get successfully",
                data: { getTagData: getTagData, recordCount: recordCount },
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
                data: {
                    getTagData: [],
                    recordCount: 0,
                },
            })
        }
    } catch (error) {
        console.error("Unexpected error detected :: ", error)
        return makeRespObj({
            status_code: 500,
            message: "An unexpected error occurred",
            error: error,
        })
    }
}

const deleteTag = async (userInputs) => {
    try {
        const { id } = userInputs
        const updateTag = await TagModel.updateTag(id, {
            isDeleted: true,
        })
        if (updateTag) {
            return makeRespObj({
                status_code: 200,
                message: "Tag deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 403,
                message: "Failed to delete the tag",
            })
        }
    } catch (error) {
        console.error("Unexpected error detected :: ", error)
        return makeRespObj({
            status_code: 500,
            message: "An unexpected error occurred",
            error: error,
        })
    }
}
const changeTagStatus = async (userInputs) => {
    try {
        const { id, isActive } = userInputs
        const updateTag = await TagModel.updateTag(id, {
            isActive,
        })
        if (updateTag) {
            return makeRespObj({
                status_code: 200,
                message: "Tag status changed successfully",
            })
        } else {
            return makeRespObj({
                status_code: 403,
                message: "Failed to change tag status",
            })
        }
    } catch (error) {
        console.error("Unexpected error detected :: ", error)
        return makeRespObj({
            status_code: 500,
            message: "An unexpected error occurred",
            error: error,
        })
    }
}
const searchTag = async (userInputs) => {
    try {
        const { search } = userInputs
        const getTagData = await TagModel.searchTag(search)
        if (getTagData !== null) {
            return makeRespObj({
                status_code: 200,
                message: "Data get successfully",
                data: getTagData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
            })
        }
    } catch (error) {
        console.error("Unexpected error detected :: ", error)
        return makeRespObj({
            status_code: 500,
            message: "An unexpected error occurred",
            error: error,
        })
    }
}

module.exports = {
    addTag,
    getTagsData,
    updateTag,
    getTagDataById,
    deleteTag,
    changeTagStatus,
    searchTag,
}
