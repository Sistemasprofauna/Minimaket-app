import { helpHttp } from "../helpers/helpHttp"
import { apiUrl } from "../helpers/config"

const getUsers = async () => {
    var url = apiUrl + 'users'

    helpHttp().get(url).then(res => {
        if (!res.err) {
            if (res === 'Error') {
                return []
            } else {
                return res
            }
        } else {
            return res
        }
    })
}

export {
    getUsers
}