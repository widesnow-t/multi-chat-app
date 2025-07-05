import { useState, useEffect } from 'react';
import SearchPanel from './components/SearchPanel';
import { envConfig, validateEnvConfig, logEnvStatus } from './utils/envConfig';

function App() {
  const [layout, setLayout] = useState(2);
  const [envStatus, setEnvStatus] = useState(null);

  useEffect(() => {
    // Log environment status on startup
    logEnvStatus();
    
    // Validate environment configuration
    const validation = validateEnvConfig();
    setEnvStatus(validation);
    
    // Show warnings if any
    if (validation.warnings.length > 0) {
      console.warn('Environment configuration warnings:', validation.warnings);
    }
  }, []);

  const panels = Array.from({ length: layout }, (_, i) => (
    <SearchPanel 
      key={i} 
      panelId={i + 1} 
    />
  ));

  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  }[layout];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🔍 マルチ検索画面</h1>
        <div className="text-xs text-gray-500">
          {envConfig.appName} v{envConfig.appVersion} 
          {envConfig.devMode && <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded">DEV</span>}
        </div>
      </div>
      
      {envStatus && envStatus.warnings.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <div className="text-sm font-medium text-yellow-800">⚠️ 設定の警告</div>
          <ul className="text-xs text-yellow-700 mt-1">
            {envStatus.warnings.map((warning, index) => (
              <li key={index}>• {warning}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4">
        <label className="mr-2 font-semibold">レイアウト選択:</label>
        <select
          className="border rounded p-1"
          value={layout}
          onChange={(e) => setLayout(Number(e.target.value))}
        >
          <option value={2}>2画面</option>
          <option value={3}>3画面</option>
          <option value={6}>6画面</option>
        </select>
      </div>
      <div className={`grid gap-4 ${gridClass}`}>
        {panels}
      </div>
    </div>
  );
}

export default App;
