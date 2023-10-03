const ImageSliderModel = require("../../models/imageSliderModel/iamgeslider")
const { makeRespObj } = require("../../AppUtils")

const createImageSlider = async (userInputs) => {
    try {
        const { imageUrl, ...iamgeData } = userInputs

        const createImageSlider = await ImageSliderModel.createImageSlider({
            imageUrl,
            ...iamgeData,
        })

        if (createImageSlider) {
            return makeRespObj({
                status_code: 200,
                message: "imageSlider created successfully",
                data: createImageSlider,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "imageSlider created fail",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getImageSliderData = async () => {
    try {
        const imageSliderData = await ImageSliderModel.fetchImageSliderData()

        if (imageSliderData.length > 0) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: imageSliderData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getImageSliderDataCus = async () => {
    try {
        const imageSliderData = await ImageSliderModel.fetchImageSliderDataCus()

        if (imageSliderData.length > 0) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: imageSliderData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const updateimageSlider = async (userInputs) => {
    try {
        const { imageSliderId, ...updateData } = userInputs

        const updateImageSlider = await ImageSliderModel.updateImageSlider(
            imageSliderId,
            { ...updateData }
        )

        if (updateImageSlider) {
            return makeRespObj({
                status_code: 200,
                message: "imageSlider updated successfully",
                data: updateImageSlider,
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "failed to update imageSlider ",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const chnageImageSliderStatus = async (userInputs) => {
    try {
        const { imageSliderId, isActive } = userInputs

        const updateimageSlider = await ImageSliderModel.updateImageSlider(
            imageSliderId,
            {
                isActive,
            }
        )

        if (updateimageSlider) {
            return makeRespObj({
                status_code: 200,
                message: "imageSlider chnage Status successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "failed to chnage Status imageSlider ",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const deleteImageSlider = async (userInputs) => {
    try {
        const { imageSliderId } = userInputs

        const deleteImageSlider = await ImageSliderModel.deleteImageSlider(
            imageSliderId
        )

        if (deleteImageSlider) {
            return makeRespObj({
                status_code: 200,
                message: "imageSlider deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete imageSlider",
            })
        }
    } catch (error) {
        console.log(error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const changePosition = async (userInputs) => {
    try {
        const { imageSliderId } = userInputs

        if (imageSliderId.length > 0) {
            let indexcount = 1
            await Promise.all(
                await imageSliderId.map(async (element, key) => {
                    await ImageSliderModel.updateImageSlider(element, {
                        shortOrder: indexcount++,
                    })
                })
            )
        }

        return makeRespObj({
            status_code: 200,
            message: "imageSlider position updated successfully",
        })
    } catch (error) {
        console.error(error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

module.exports = {
    createImageSlider,
    getImageSliderData,
    getImageSliderDataCus,
    updateimageSlider,
    chnageImageSliderStatus,
    deleteImageSlider,
    changePosition
}
