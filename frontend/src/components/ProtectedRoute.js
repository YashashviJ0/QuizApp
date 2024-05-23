import React, { useEffect } from 'react'
import { getUserInfo } from '../apicalls/users'
import { message } from 'antd'

function ProtectedRoute(childern) {
    try {
        const getUserData = async getUserInfo()
        if (Response.success) {
            message.success(response.message)
        }
        else {
            message.error(response.message)
        }
    }
    catch (error) {
        message.error(error.message)
    }

}
useEffect(() => {
    getUserData()
}, [])
return (
    <div>
        {childern}
    </div>
)


export default ProtectedRoute
