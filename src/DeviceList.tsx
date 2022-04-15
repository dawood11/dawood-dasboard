import React, { useState } from 'react';

import { triggerDevice } from './TuyaApi';

interface Props {
    device: any;
}
const DeviceList = ({ device }: Props): JSX.Element => {
    const [deviceState, setDeviceState] = useState<boolean>(device.data.state);
    
    const handleTriggerBtn = async () => {
        const newState = await triggerDevice(device.id, deviceState)
        await setDeviceState(newState);
    };
    
    return (
        <li id={device.id}>
            {device.name},
            {
                device.data.online === true
                    ? deviceState === true
                        ? <span style={{ color: 'green' }}>På</span>
                        : <span style={{ color: 'red' }}>Av</span>
                    : <span style={{ color: 'red' }}>Offline</span>
            }
            <button
                id={device.id + "-btn"}
                onClick={handleTriggerBtn}
            >
                Trigger
            </button>
        </li>
    );
};

export default DeviceList;
