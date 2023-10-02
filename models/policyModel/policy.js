const PolicySchema = require("./schema")

const createPolicy = async (insertData) => {
    const policy = new PolicySchema(insertData)

    const policyResult = await policy
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            return false
        })

    return policyResult
}

const fetchPolicy = () => {
    return PolicySchema.findOne()
        .then((policyData) => {
            return policyData
        })
        .catch((error) => {
            return null
        })
}

const updatePolicy = (id, updateData) => {
    return PolicySchema.updateOne({ _id: id }, updateData)
        .then(() => true)
        .catch((error) => {
            console.error(error)
            return false
        })
}

module.exports = {
    createPolicy,
    fetchPolicy,
    updatePolicy,
}
