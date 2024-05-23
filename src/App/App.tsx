import { useState } from 'react'
import './App.css'
import { assignTimesToGroups } from './functions';

function App() {
  const [groupName, setGroupName] = useState('');
  const [result, setResult] = useState<any>({});

  const handleInputChange = (event: any) => {
    setGroupName(event.target.value);
  };

  const handleButtonClick = () => {
    const output = assignTimesToGroups([groupName]);
    setResult(output);
  };

  return (
    <div>
      <h1>Assign Times to Groups</h1>
      <input
        type="text"
        value={groupName}
        onChange={handleInputChange}
        placeholder="Введите название группы"
      />
      <button onClick={handleButtonClick}>Рассчитать</button>
      <div>
        {Object.keys(result).length > 0 && (
          <div>
            <h2>Результаты для группы: {Object.keys(result)[0]}</h2>
            <ul>
              {result[Object.keys(result)[0]].map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
