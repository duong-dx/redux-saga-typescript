import { SubscriptionEndPoint } from "../constants";
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
    }
}

export default PushNotification