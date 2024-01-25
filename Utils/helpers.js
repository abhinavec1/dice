import axios from "axios"

const HELPERS = {
    request: (config) => {
        return axios
            .request(config)
            .then((response) => {
                return response
            })
            .catch((err) => {
                throw err
            })
    },
    sortData: (data, key, order) => {
        const sortedData = data.slice()

        sortedData.sort((a, b) => {
            const aValue = a[key]
            const bValue = b[key]

            if (typeof aValue === 'string') {
                return aValue.localeCompare(bValue)
            } else if (key === "updated_at" || key === "create_at") {
                return new Date(a) - new Date(b)
            } else {
                return aValue - bValue
            }
        });

        if (order === 'desc') {
            sortedData.reverse()
        }
        return sortedData
    },
}

export default HELPERS