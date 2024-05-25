import { useState } from 'react';
import './App.css';
import { assignTimesToGroups } from './functions';
import deleteIcon from '../../public/icons8-отмена.svg';
import deleteResult from '../../public/icons8-чистить.png';

interface Res {
  nameGroup: string;
  time: string[];
}

function App() {
  const [groupNames, setGroupNames] = useState<string[]>(['']);
  const [result, setResult] = useState<Res[]>([]);

  const handleInputChange = (index: number, event: any) => {
    const newGroupNames = [...groupNames];
    newGroupNames[index] = event.target.value;
    setGroupNames(newGroupNames);
  };

  const handleButtonClick = () => {
    const names = groupNames.filter((el) => el !== '');
    const output = assignTimesToGroups(groupNames);
    setResult(output);
  };

  const handleRemoveResult = () => {
    setResult([]);
    setGroupNames(['']);
  };

  const handleAddInput = () => {
    setGroupNames([...groupNames, '']);
  };

  const handleDeleteInput = (index: number) => {
    const newGroupNames = groupNames.filter((_, i) => i !== index);
    setGroupNames(newGroupNames);
  };

  return (
    <div>
      <h1>Владик с тебя пиво</h1>
      <button type="button" onClick={handleAddInput}>
        Добавить еще группу
      </button>
      <div className="block-result">
        <div
          style={
            groupNames.length > 1
              ? { display: 'flex', flexDirection: 'column' }
              : { display: 'flex' }
          }
        >
          {groupNames.map((groupName, index) => (
            <div
              key={index}
              style={
                groupNames.length > 1
                  ? { display: 'flex', alignItems: 'center', width: '100%' }
                  : { display: 'flex' }
              }
            >
              <input
                type="text"
                value={groupName}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Введите название группы"
              />

              {groupNames.length > 1 ? (
                <button
                  type="button"
                  onClick={() => handleDeleteInput(index)}
                  style={{ background: 'none', border: 'none' }}
                >
                  <img
                    src={deleteIcon}
                    alt="Удалить"
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
              ) : undefined}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="button-result"
          onClick={handleButtonClick}
        >
          Рассчитать
        </button>
      </div>

      <div>
        {result.length > 0 && (
          <div>
            <div className="block-result">
              <h2>Результаты</h2>
              <button
                type="button"
                onClick={handleRemoveResult}
                style={{ marginLeft: '10px' }}
              >
                <img
                  src={deleteResult}
                  alt="Очистить"
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th colSpan={result[0].time.length}>Время</th>
                </tr>
              </thead>
              <tbody>
                {result.map((group, index) => (
                  <tr key={`${group.nameGroup}-${index}`}>
                    <td>{group.nameGroup}</td>
                    <td>
                      {group.time.map((item, index) => (
                        <span key={index} className="span-table">
                          {item}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
