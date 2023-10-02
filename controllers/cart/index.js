
const CartModel = require("../../models/cartModel/cart")
const { makeRespObj } = require("../../AppUtils/")

// const addCart = async (userInputs) => {
//     try {
//         const { userId, ...cartItems } = userInputs

//         const newCart = await CartModel.createCart({
//             userData: userId,
//             ...cartItems,
//         })

//         console.log("newCart", newCart)

//         if (newCart) {
//             return makeRespObj({
//                 status_code: 201,
//                 message: "Product added to the cart.",
//                 data: newCart,
//             })
//         } else {
//             return makeRespObj({
//                 status_code: 400,
//                 message: "Failed to add the product to the cart.",
//                 data: newCart,
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         return makeRespObj({
//             status_code: 500,
//             message: "Internal server error.",
//             catchErr: error,
//         })
//     }
// }

const addCart = async (userInputs) => {
    try {
        const { userId, ...cartItems } = userInputs

        const existingCart = await CartModel.findUser(userId)

        if (existingCart) {
            for (const cartItem of cartItems.cartItems) {
                const existingCartItem = existingCart.cartItems.find(
                    (item) =>
                        item.productData.toString() === cartItem.productData
                )

                if (existingCartItem) {
                    existingCartItem.productPrices.forEach((price) => {
                        const newPrice = cartItem.productPrices.find(
                            (newPrice) =>
                                newPrice.variantPriceData ===
                                price.variantPriceData
                        )

                        if (newPrice) {
                            price.quantity += newPrice.quantity
                        }
                    })
                } else {
                    existingCart.cartItems.push(cartItem)
                }
            }

            const updatedCart = await existingCart.save()

            return makeRespObj({
                status_code: 200,
                message: "Cart updated successfully.",
                data: updatedCart,
            })
        } else {
            const newCart = await CartModel.createCart({
                userData: userId,
                ...cartItems,
            })

            console.log("newCart", newCart)

            if (newCart) {
                return makeRespObj({
                    status_code: 201,
                    message: "Product added to the cart.",
                    data: newCart,
                })
            } else {
                return makeRespObj({
                    status_code: 400,
                    message: "Failed to add the product to the cart.",
                    data: newCart,
                })
            }
        }
    } catch (error) {
        console.log(error)
        return makeRespObj({
            status_code: 500,
            message: "Internal server error.",
            catchErr: error,
        })
    }
}


const getCartData = async (userInputs) => {
    try {
        const { userId } = userInputs

        const cartList = await CartModel.fetchCartList(userId)

        if (cartList) {
            const cartItems = cartList.cartItems

            let total = 0
            for (const cartItem of cartItems) {
                for (const productPrice of cartItem.productPrices) {

                    const variantPriceData = productPrice?.variantPriceData
                    const price = variantPriceData?.price
                    const quantity = productPrice.quantity

                    const itemTotal = price * quantity
                    total += itemTotal
                }
            }

            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: {
                    cartId: cartList._id,
                    cartItems: cartList.cartItems,
                    total: total,
                },
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Data not found",
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

const removeCartData = async (userInputs) => {
    try {
        const { cartId } = userInputs
        const removeCartData = await CartModel.removeCartData(cartId)

        if (removeCartData) {
            return makeRespObj({
                status_code: 200,
                message: "cart removed successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to remove cart",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const incrementItemQuantity = async (userInputs) => {
    try {
        const { cartId, productId, itemPriceId } = userInputs

        const cart = await CartModel.findOneCart(cartId)

        if (!cart) {
            return makeRespObj({
                status_code: 409,
                message: "Cart Not Found",
            })
        }

        const cartItem = cart.cartItems.find(
            (item) => item.productData.toString() === productId
        )

        if (!cartItem) {
            return makeRespObj({
                status_code: 404,
                message: "Product Not Found in Cart",
            })
        }
        const itemToIncrementIndex = cartItem.productPrices.findIndex(
            (item) => item._id.toString() === itemPriceId.toString()
        )

        if (itemToIncrementIndex === -1) {
            return makeRespObj({
                status_code: 404,
                message: "Item Not Found in Product Prices",
            })
        }

        cartItem.productPrices[itemToIncrementIndex].quantity += 1

        await cart.save()

        return makeRespObj({
            status_code: 200,
            message: "Item quantity incremented successfully",
        })
    } catch (err) {
        console.error("Error in incrementItemQuantity:", err)
        return makeRespObj({
            status_code: 500,
            message: "Internal Server Error",
        })
    }
}

const decrementItemQuantity = async (userInputs) => {
    try {
        const { cartId, productId, itemPriceId } = userInputs

        const cart = await CartModel.findOneCart(cartId)

        if (!cart) {
            return makeRespObj({
                status_code: 409,
                message: "Cart Not Found",
            })
        }

        const cartItem = cart.cartItems.find(
            (item) => item.productData.toString() === productId
        )

        if (!cartItem) {
            return makeRespObj({
                status_code: 404,
                message: "Product Not Found in Cart",
            })
        }

        const itemToDecrementIndex = cartItem.productPrices.findIndex(
            (item) => item._id.toString() === itemPriceId.toString()
        )

        if (itemToDecrementIndex === -1) {
            return makeRespObj({
                status_code: 404,
                message: "Item Not Found in Product Prices",
            })
        }

        if (cartItem.productPrices[itemToDecrementIndex].quantity > 1) {
            cartItem.productPrices[itemToDecrementIndex].quantity -= 1
        } else {
            cartItem.productPrices.splice(itemToDecrementIndex, 1)
        }

        await cart.save()

        return makeRespObj({
            status_code: 200,
            message: "Item quantity decremented successfully",
        })
    } catch (err) {
        console.error("Error in decrementItemQuantity:", err)
        return makeRespObj({
            status_code: 500,
            message: "Internal Server Error",
        })
    }
}

const removeCartItem = async (userInputs) => {
    const { cartId, productId, itemPriceId } = userInputs

    try {
        const cart = await CartModel.findOneCart(cartId)

        if (!cart) {
            return makeRespObj({
                status_code: 409,
                message: "Cart Not Found",
            })
        }

        const cartItem = cart.cartItems.find(
            (item) => item.productData.toString() === productId
        )

        console.log("productId:", productId)
        console.log("cart.cartItems:", cart.cartItems)

        if (!cartItem) {
            return makeRespObj({
                status_code: 404,
                message: "Product Not Found in Cart",
            })
        }

        const itemIndexToRemove = cartItem.productPrices.findIndex(
            (item) => item._id.toString() === itemPriceId
        )

        if (itemIndexToRemove === -1) {
            return makeRespObj({
                status_code: 404,
                message: "Item Not Found in Product Prices",
            })
        }

        cartItem.productPrices.splice(itemIndexToRemove, 1)

        await cart.save()

        return makeRespObj({
            status_code: 200,
            message: "Item Successfully Removed",
        })
    } catch (error) {
        console.error("Error removing cart item:", error)
        return makeRespObj({
            status_code: 500,
            message: "Internal Server Error",
        })
    }
}

module.exports = {
    addCart,
    getCartData,
    removeCartData,
    removeCartItem,
    incrementItemQuantity,
    decrementItemQuantity,
}
