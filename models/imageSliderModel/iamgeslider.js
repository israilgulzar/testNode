const ImageSliderSchema = require("./schema")

const createImageSlider = async (insertData) => {
    const imageSlider = new ImageSliderSchema(insertData)

    const imageSliderResult = await imageSlider
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })

    return imageSliderResult
}

const fetchImageSliderData = () => {
    return ImageSliderSchema.find()
    .sort({ shortOrder: 1 })
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log(error)
            return null
        })
}

const fetchImageSliderDataCus = () => {
    return ImageSliderSchema.find({
        isActive:true
    })

        .sort({ shortOrder: 1 })

        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log(error)
            return null
        })
}

const updateImageSlider = async (imageSliderId, updateData) => {
    const imageSliderResult = ImageSliderSchema.updateOne(
        { _id: imageSliderId },
        updateData
    )
        .then((model) => {
            return true
        })
        .catch((err) => {
            console.log(err)
            return false
        })

    return imageSliderResult
}

const deleteImageSlider = async (imageSliderId) => {
    const imageSliderResult = await ImageSliderSchema.deleteOne({
        _id: imageSliderId,
    })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return imageSliderResult
}

module.exports = {
  createImageSlider,
  fetchImageSliderData,
  fetchImageSliderDataCus,
  updateImageSlider,
  deleteImageSlider
}
