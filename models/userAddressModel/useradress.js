
const UserAddressSchema = require("./schema")

const createUserAddress = async (insertData) => {
    const userAddress = new UserAddressSchema(insertData)

    const userAddressResult = await userAddress
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })

    return userAddressResult
}

const fetchUserAddressData = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    address: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return UserAddressSchema.find(query)
        .populate({
            path: "userData",
            select: ["name", "email", "phone", "countryCode"],
        })

        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((userAddressData) => {
            return userAddressData
        })
        .catch((error) => {
            return null
        })
}

const updateUserAddress = async (userAddressId, updateData) => {
    const updateUserAddressData = UserAddressSchema.updateOne(
        { _id: userAddressId },
        updateData
    )
        .then((model) => {
            return true
        })
        .catch((err) => {
            return false
        })

    return updateUserAddressData
}

const fetchUserAddressById = async (userAddressId) => {
    const userAddressData = await UserAddressSchema.findOne({
        _id: userAddressId,
    }).populate({
        path: "userData",
        select: ["name", "email", "phone", "countryCode"],
    })

        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return userAddressData
}

const deleteUserAddress = async (userAddressId) => {
    const userAddressResult = await UserAddressSchema
        .deleteOne({ _id: userAddressId })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return userAddressResult
}

module.exports = {
    fetchUserAddressById,
    updateUserAddress,
    fetchUserAddressData,
    createUserAddress,
    deleteUserAddress,
}
