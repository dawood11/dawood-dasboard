import './App.css';

import React, { useState } from 'react';
import { signInWithGoogle, signOutFirebase } from './Firebase';

import DeviceList from './DeviceList';
import { authTuyaApi } from './TuyaApi';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [autenticationBtn, setAuthenticationBtn] = useState<string>("Login");
  const [tuyaDevices, setTuyaDevices] = useState<any>(null);

  const handleAuthenticateBtn = async () => {
    if (user === null) {
      const authenticated = await signInWithGoogle();
      if (authenticated) {
        setUser(authenticated.displayName);
        setAuthenticationBtn("Logout");
      }
    } else {
      await signOutFirebase();
      setUser(null);
      setAuthenticationBtn("Login");
    }
  };

  const handleTuyaBtn = async () => {
    const tuyaData = await authTuyaApi();
    if (tuyaData.payload.devices !== null) {
      setTuyaDevices(tuyaData.payload.devices);
    }
  };

  return (
    <div className="App">
      TEST2333 - {user}
      <button onClick={handleAuthenticateBtn}>{autenticationBtn}</button>
      {
        user
          ? <div>
            <h1>get Tuya</h1>
            <button onClick={handleTuyaBtn}>get Tuya data</button>

            <h3>Switcher</h3>
            <ul>
              {
                tuyaDevices === null
                  ? null
                  : tuyaDevices.map((device: any) => (
                    device.dev_type === "switch"
                      ? <DeviceList key={device.id} device={device} />
                      : null
                  ))
              }
            </ul>

            <h3>Scener</h3>
            <ul>
              {
                tuyaDevices === null
                  ? null
                  : tuyaDevices.map((device: any) => (
                    device.dev_type === "scene"
                      ? <DeviceList key={device.id} device={device} />
                      : null
                  ))
              }
            </ul>
          </div>
          : null
      }
    </div>
  );
}

export default App;
