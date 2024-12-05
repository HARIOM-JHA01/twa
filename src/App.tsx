import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [country, setCountry] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Telegram Web App
    WebApp.ready();

    // Fetch country using IP geolocation API
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.country_name) {
          setCountry(data.country_name);
        } else {
          setError('Could not determine your country.');
        }
      })
      .catch(() => {
        setError('Failed to fetch country information.');
      });

    // Fetch Telegram user data
    const initDataUnsafe = WebApp.initDataUnsafe;
    setUserData({
      firstName: initDataUnsafe?.user?.first_name || 'Unknown',
      lastName: initDataUnsafe?.user?.last_name || '',
      username: initDataUnsafe?.user?.username || 'Unknown',
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Telegram WebApp</h1>
      <div>
        <p><strong>User Info:</strong></p>
        <p>First Name: {userData.firstName}</p>
        <p>Last Name: {userData.lastName}</p>
        <p>Username: {userData.username}</p>
        <p>Country: {country || 'Fetching...'}</p>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default App;
