/* eslint-disable */
/// <reference types='react-scripts' />

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        PUBLIC_URL: string

        REACT_APP_FIREBASE_KEY: string
        REACT_APP_FIREBASE_DOMAIN: string
        REACT_APP_FIREBASE_PROJECT_ID: string
        REACT_APP_FIREBASE_STORAGE_BUCKET: string
        REACT_APP_FIREBASE_SENDER_ID: string
        REACT_APP_FIREBASE_APP_ID: string

        REACT_APP_TUYAAPI_USERNAME: string
        REACT_APP_TUYAAPI_PASSWORD: string
        REACT_APP_TUYAAPI_COUNTRYCODE: string
        REACT_APP_TUYAAPI_BIZTYPE: string
        REACT_APP_TUYAAPI_FROM: string
    }
}