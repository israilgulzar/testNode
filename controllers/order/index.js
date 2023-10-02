
const orderModel = require("../../models/orderModel/order")
const { pageMaker, makeRespObj } = require("../../AppUtils/")

const createOrder = async (userInputs) => {
    try {
        const {
            user_id,
            product_id,
            payment_id,
            total_amount,
            order_address,
            order_city,
            order_pincode,
            order_country,
        } = userInputs
        const createOrder = await orderModel.createOrder({
            user_id,
            product_id,
            payment_id,
            total_amount,
            order_address,
            order_city,
            order_pincode,
            order_country,
        })
        return makeRespObj({
            status_code: 201,
            message: "order created successfully.",
            data: createOrder,
        })
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getOrderData = async (userInputs) => {
    try {
        const { search, startToken, endToken, status_flag } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const getOrderData = await orderModel.fetchOrderData(
            search,
            page,
            perPage,
            status_flag
        )

        if (getOrderData) {
            const formattedData = getOrderData.map((order) => {
                return {
                    _id: order._id,
                    productData: {
                        _id: order.product_id._id,
                        product_name: order.product_id.product_name,
                        price: order.product_id.price,
                        discount: order.product_id.discount,
                        description: order.product_id.description,
                        thumbnail_image: order.product_id.thumbnail_image,
                    },
                    userData: {
                        _id: order.user_id._id,
                        first_name: order.user_id.first_name,
                        last_name: order.user_id.last_name,
                    },
                    total_amount: order.total_amount,
                    order_address: order.order_address,
                    order_pincode: order.order_pincode,
                    order_city: order.order_city,
                    order_country: order.order_country,
                    status_flag: order.status_flag,
                }
            })
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: formattedData,
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "data not found",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getOrderById = async (userInputs) => {
    try {
        const { order_id } = userInputs

        const getOrderById = await orderModel.fetchOrderById(order_id)

        return getOrderById
            ? makeRespObj({
                  status_code: 200,
                  message: "Data get successful",
                  data: getOrderById,
              })
            : makeRespObj({
                  status_code: 400,
                  message: "Data fetch failed !",
              })
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const deleteOrder = async (userInputs) => {
    try {
        const { order_id } = userInputs
        const updateOrder = await orderModel.updateOrder(order_id, {
            is_deleted: true,
        })
        if (updateOrder) {
            return makeRespObj({
                status_code: 200,
                message: "Order deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete order",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const updateOrder = async (userInputs) => {
    try {
        const {
            order_id,
            product_id,
            payment_id,
            total_amount,
            order_address,
            order_city,
            order_pincode,
            order_country,
        } = userInputs

        const updateOrder = await orderModel.updateOrder(order_id, {
            product_id,
            payment_id,
            total_amount,
            order_address,
            order_city,
            order_pincode,
            order_country,
        })

        if (updateOrder) {
            return makeRespObj({
                status_code: 200,
                message: "Order updated successfully.",
                data: updateOrder,
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "failed to update Order ",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const updateStatusByUser = async (userInputs) => {
    try {
        //  6 complte , 7 cancle
        const { order_id, user_id, status_flag } = userInputs
        if (status_flag === 6) {
            const updateOrder = await orderModel.updateOrder(order_id, {
                status_flag,
                user_id,
            })
            if (updateOrder) {
                return makeRespObj({
                    status_code: 200,
                    message: "Order complte successfully.",
                })
            }
        } else if (status_flag === 7) {
            const updateOrder = await orderModel.updateOrder(order_id, {
                status_flag,
            })
            if (updateOrder) {
                return makeRespObj({
                    status_code: 200,
                    message: "Order cancle successfully.",
                })
            }
        } else {
            return makeRespObj({
                status_code: 401,
                message: "Invalid Status Flag",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const updateStatusByAdmin = async (userInputs) => {
    try {
        //  2 reject, 3 accept, 4 processing, 5 onGoing, 6 complte ,
        const { order_id, status_flag } = userInputs
        if (status_flag === 2) {
            const updateOrder = await orderModel.updateOrder(order_id, {
                status_flag,
            })
            if (updateOrder) {
                return makeRespObj({
                    status_code: 200,
                    message: "Order reject successfully.",
                })
            }
        } else if (status_flag === 3) {
            const updateOrder = await orderModel.updateOrder(order_id, {
                status_flag,
            })
            if (updateOrder) {
                return makeRespObj({
                    status_code: 200,
                    message: "Order accept successfully.",
                })
            }
        } else if (status_flag === 4) {
            const updateOrder = await orderModel.updateOrder(order_id, {
                status_flag,
            })
            if (updateOrder) {
                return makeRespObj({
                    status_code: 200,
                    message: "Order processing.",
                })
            }
        } else if (status_flag === 5) {
            const updateOrder = await orderModel.updateOrder(order_id, {
                status_flag,
            })
            if (updateOrder) {
                return makeRespObj({
                    status_code: 200,
                    message: "Order onGoing.",
                })
            }
        } else if (status_flag === 6) {
            const updateOrder = await orderModel.updateOrder(order_id, {
                status_flag,
            })
            if (updateOrder) {
                return makeRespObj({
                    status_code: 200,
                    message: "Order complte successfully.",
                })
            }
        } else if (status_flag === 7) {
            const updateOrder = await orderModel.updateOrder(order_id, {
                status_flag,
            })
            if (updateOrder) {
                return makeRespObj({
                    status_code: 200,
                    message: "Order cancle successfully.",
                })
            }
        } else {
            return makeRespObj({
                status_code: 401,
                message: "Invalid Status Flag",
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
    updateStatusByAdmin,
    updateStatusByUser,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrderData,
    createOrder,
}
