const orderSchema = require("./schema")

const createOrder = async (insertData) => {
    const product = new orderSchema(insertData)

    const orderResult = await product
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })

    return orderResult
}

const updateOrder = async (order_id, updateData) => {
    const orderResult = orderSchema
        .updateOne({ _id: order_id }, updateData)
        .then((model) => {
            return true
        })
        .catch((err) => {
            return false
        })

    return orderResult
}

const fetchOrderById = async (order_id) => {
    const orderData = await orderSchema
        .findOne({ _id: order_id })

        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return orderData
}

// const fetchOrderData = (search, start, limit) => {
//     let searchFilter = []
//     if (search !== "") {
//         searchFilter.push({
//             $or: [
//                 {
//                     first_name: {
//                         $regex: ".*" + search + ".*",
//                         $options: "i",
//                     },
//                 },
//             ],
//         })
//     }
//     searchFilter.push({
//         is_deleted: false,
//     })
//     const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

//     return (
//         orderSchema
//             .find(query)
//             .populate({
//                 path: "product_id",
//                 match: { is_active: true, is_deleted: false },
//                 select: [
//                     "product_name",
//                     "price",
//                     "discount",
//                     "thumbnail_image",
//                     "description",
//                     "is_active",
//                     "is_deleted",
//                 ],
//             })
//             .populate({
//                 path: "user_id",
//                 select: ["first_name", "last_name"],
//             })

//             // .populate({
//             //     path: "payment_id",
//             //     select: "variant_name",
//             // })
//             .sort({ createdAt: -1 })
//             .skip(start)
//             .limit(limit)
//             .then((orderData) => {
//                 return orderData
//             })
//             .catch((error) => {
//                 return null
//             })
//     )
// }

const fetchOrderData = (search, start, limit, statusFlag) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    order_city: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
                {
                    order_address: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    if (statusFlag !== undefined && statusFlag !== 0) {
        searchFilter.push({
            status_flag: statusFlag,
        })
    }
    searchFilter.push({
        is_deleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return orderSchema
        .find(query)
        .populate({
            path: "product_id",
            match: { is_active: true, is_deleted: false },
            select: [
                "product_name",
                "price",
                "discount",
                "thumbnail_image",
                "description",
                "is_active",
                "is_deleted",
            ],
        })
        .populate({
            path: "user_id",
            select: ["first_name", "last_name"],
        })

        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((orderData) => {
            return orderData
        })
        .catch((error) => {
            return null
        })
}

module.exports = {
    createOrder,
    fetchOrderById,
    updateOrder,
    fetchOrderData,
}
