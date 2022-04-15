import { postRequest } from "../Service/Requests";

let key: string = '';
let devices: any = undefined;

const tuyaEnpoints = {
    authenticate: 'https://px1.tuyaus.com/homeassistant/auth.do',
    device: 'https://px1.tuyaeu.com/homeassistant/skill',
};

export const authTuyaApi = async () => {
    const authData = await postRequest(tuyaEnpoints.authenticate, {
        body: new URLSearchParams({
            userName: process.env.REACT_APP_TUYAAPI_USERNAME,
            password: process.env.REACT_APP_TUYAAPI_PASSWORD,
            countryCode: process.env.REACT_APP_TUYAAPI_COUNTRYCODE,
            bizType: process.env.REACT_APP_TUYAAPI_BIZTYPE,
            from: process.env.REACT_APP_TUYAAPI_FROM
        })
    }, false);

    if (authData.access_token !== undefined) {
        key = authData.access_token;
        localStorage.setItem("key", key);
        return await fetchDevices(key);
    } else {
        key = localStorage.getItem("key") as string;
        return await fetchDevices(key);
    }
};

const fetchDevices = async (access_token: string) => {
    devices = await postRequest(tuyaEnpoints.device, {
        body: {
            "header": {
                "name": "Discovery",
                "namespace": "discovery",
                "payloadVersion": 1
            },
            "payload": {
                "accessToken": access_token
            }
        }
    })

    if (devices.header.code !== 'FrequentlyInvoke' && devices.header.code !== 'DependentServiceUnavailable') {
        localStorage.setItem("devices", JSON.stringify(devices));
    } else {
        devices = JSON.parse(localStorage.getItem("devices") as string);
    }
    return devices;
};

export const triggerDevice = async (deviceID: string, dataState: boolean) => {
    const status = await postRequest(tuyaEnpoints.device, {
        body: {
            "header": {
                "name": "turnOnOff",
                "namespace": "control",
                "payloadVersion": 1
            },
            "payload": {
                "value": dataState === false ? 1 : 0,
                "accessToken": key,
                "devId": deviceID
            }
        }
    })

    if (status.header.code !== 'SUCCESS') {
        console.log('FAILED TRIGGER');
        return dataState;
    } else {
        const objIndex = devices.payload.devices.findIndex(((obj: any) => obj.id === deviceID));
        devices.payload.devices[objIndex].data.state = !dataState;
        localStorage.setItem("devices", JSON.stringify(devices));
    }
    return !dataState;
};