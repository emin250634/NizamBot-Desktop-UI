// src/App.jsx
import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';

export default function App() {
  const envPath = path.resolve(process.cwd(), '.env');

  const [envText, setEnvText] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    try {
      const data = fs.readFileSync(envPath, 'utf-8');
      setEnvText(data);
    } catch (err) {
      setStatus('Dosya okunamadı: ' + err.message);
    }
  }, []);

  const handleSave = () => {
    try {
      fs.writeFileSync(envPath, envText, 'utf-8');
      setStatus('✅ Kaydedildi.');
    } catch (err) {
      setStatus('❌ Kaydedilemedi: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h1>.env Editörü</h1>
      <textarea
        value={envText}
        onChange={(e) => setEnvText(e.target.value)}
        rows={15}
        cols={80}
        style={{ fontSize: 14, fontFamily: 'monospace' }}
      />
      <br />
      <button onClick={handleSave} style={{ marginTop: 10, padding: '10px 20px', fontWeight: 'bold' }}>
        Kaydet
      </button>
      <p>{status}</p>
    </div>
  );
}
