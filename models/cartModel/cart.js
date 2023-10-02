
const cartSchema = require("./schema")

const createCart = async (insertData) => {
    const cart = new cartSchema(insertData)

    const cartResult = await cart
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })

    return cartResult
}

const fetchCartList = (userId) => {
    return cartSchema
        .findOne({ userData: userId })
        .populate({
            path: "cartItems.productData",
            select: [
                "name",
                "description",
                "shortDescription",
                "thumbnailImage",
            ],
        })
        .populate({
            path: "cartItems.productPrices.variantPriceData",
            select: ["variantData", "price", "discounts"],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
            },
        })
        .lean()
        .then((cartData) => {
            return cartData
        })
        .catch((err) => {
            console.error("Error fetching cart data:", err)
            throw err
        })
}

const filterCartData = (userId, productId) => {
    return cartSchema
        .findOne({ "cartItems._id": productId, userData: userId })
        .then((cartData) => {
            return cartData
        })
        .catch((error) => {
            console.error("Error in filterCartData:", error)
            return null
        })
}

const findUser = (userId) => {
    return cartSchema
        .findOne({ userData: userId })
        .then((cartData) => {
            return cartData
        })
        .catch((error) => {
            console.error("Error in findUser:", error)
            return null
        })
}

const removeCartData = async (cartId, updateData) => {
    const cartData = cartSchema
        .deleteOne({ _id: cartId }, updateData)
        .then((model) => {
            return true
        })
        .catch((err) => {
            return null
        })

    return cartData
}

const fetchCart = async (cartId) => {
    const cartData = cartSchema
        .find({ _id: cartId })
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
            return null
        })

    return cartData
}

const findOneCart = (cartId) => {
    return cartSchema
        .findOne({ _id: cartId })
        .then((cartData) => {
            return cartData
        })
        .catch((error) => {
            console.error("Error in findOneCart:", error)
            return null
        })
}

module.exports = {
    createCart,
    fetchCartList,
    filterCartData,
    findUser,
    removeCartData,
    findOneCart,
    fetchCart,
}
