import React, { useState, useEffect } from 'react';
import { Button, Input, Modal } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [queue, setQueue] = useState([]);
  const [processedItems, setProcessedItems] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const addToQueue = () => {
    if (inputText.trim() !== '') {
      setQueue((prevQueue) => [...prevQueue, inputText]);
      setInputText('');
    }
  };

  const pollQueue = () => {
    if (queue.length > 0) {
      const newItem = queue.shift();
      setQueue([...queue]);
      setProcessedItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const handleEndClick = () => {
    if (queue.length === 0) {
      showSuccessModal();
    } else {
      // Wait for the queue to be empty
      const intervalId = setInterval(() => {
        if (queue.length === 0) {
          clearInterval(intervalId);
          showSuccessModal();
        }
      }, 1000);
    }
  };

  const handleResetClick = () => {
    setQueue([]);
    setProcessedItems([]);
  };

  const showSuccessModal = () => {
    setSuccessModalVisible(true);
  };

  const handleModalOk = () => {
    setSuccessModalVisible(false);
  };

  useEffect(() => {
    const intervalId = setInterval(pollQueue, 10000);

    return () => clearInterval(intervalId);
  }, [queue]);

  return (
    <div className="App">
      {/* Header */}
      <header className="header">React Assignment Header</header>

      <div className='content'>
      <div className='left-section'>
       {/* Input component */}
       <div className="input-component">
           <Input
          placeholder="Input text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
           />
           <Button type="primary" onClick={addToQueue}>
          Add
          </Button>
        </div>

         {/* ///* View component */}
          <div className="view-component">
           <h2>Queue</h2>
           <ul>
              {queue.map((item, index) => (
                    <li key={index}>{item}</li>
                   ))}
            </ul>
          </div>
     </div>
  
     <div className='right-section'>
       {/* ///* Final component */}
        <div className="final-view-component">
        <h2>Processed Items</h2>
        <ul>
          {processedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    {/* ///* buttons component */}
      <div className="buttons">
        <Button type="primary" onClick={handleEndClick} className='button1'>
          End
        </Button>
        <Button type="danger" onClick={handleResetClick} className='button2'>
          Reset
        </Button>
      </div>
     </div>
      </div>
     
     

      {/* Success Modal */}
      <Modal
        title="Success"
        visible={successModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        All items processed successfully!
      </Modal>
    </div>
  );
};

export default App;
