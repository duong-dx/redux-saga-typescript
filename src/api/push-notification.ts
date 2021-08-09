import axiosClient from "./axiosClient";

const PushNotification = {
    pushEndPointDevice: (accessToken: string, data: any) => {
        const url: string = `/push`
        return axiosClient.post(url, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    },

    testNotification: (accessToken: string) => {
        return axiosClient.get('/push', {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    },

    addDeviceToken: (deviceToke: string, accessToken: string) => {
        return axiosClient.post('/update-device-token ', {device_token: deviceToke}, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    },

    sendNotification: (title: string, body: string, accessToken: string) => {
        return axiosClient.post('/send-notifications ', {title: title, body: body}, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    }
}

export default PushNotification