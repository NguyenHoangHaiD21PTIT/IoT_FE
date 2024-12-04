import React, { useEffect, useState } from 'react';
import { Card, Switch, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './ControlPanel.scss';
import axios from 'axios';

const ControlPanel = ({ onChange }) => {
  const [led2On, setLed2On] = useState(false);
  const [led3On, setLed3On] = useState(false);
  const [loading, setLoading] = useState({
    led2: false,
    led3: false,
  });

  // Fetch initial states for LED2 and LED3
  const fetchInitialStatus = async () => {
    try {
      const response = await axios.get('http://26.247.153.202:8080/api/alldevice');
      const devices = response.data;

      devices.forEach(device => {
        if (device.name === 'LED2') setLed2On(device.status);
        if (device.name === 'LED3') setLed3On(device.status);
      });
    } catch (error) {
      console.error('Error fetching initial status:', error);
      message.error('Không thể tải trạng thái ban đầu. Vui lòng thử lại.');
    }
  };

  // Load initial status when component is mounted
  useEffect(() => {
    fetchInitialStatus();
  }, []);

  // Generic handler for toggling LEDs
  const handleLedChange = async (ledId, setLedState, ledName, checked) => {
    setLoading(prev => ({ ...prev, [ledName]: true }));
    try {
      await axios.get(`http://26.247.153.202:8080/api/led?id=${ledId}&action=${checked}`);
      setLedState(checked);
      onChange(checked);
      message.success(`${ledName} đã được ${checked ? 'bật' : 'tắt'} thành công.`);
    } catch (error) {
      console.error(`Error updating ${ledName} status:`, error);
      message.error(`Không thể ${checked ? 'bật' : 'tắt'} ${ledName}. Vui lòng thử lại.`);
    } finally {
      setLoading(prev => ({ ...prev, [ledName]: false }));
    }
  };

  return (
    <div className='listCard-button'>
      <Card bordered={false} className='card-button'>
        <div>
          <FontAwesomeIcon
            icon={faLightbulb}
            className={`icon ${led2On ? 'light-lit' : ''}`}
          /> LED2
        </div>
        <Switch
          checked={led2On}
          onChange={checked => handleLedChange(2, setLed2On, 'LED2', checked)}
          className='switch'
          loading={loading.led2}
        />
      </Card>

      <Card bordered={false} className='card-button'>
        <div>
          <FontAwesomeIcon
            icon={faLightbulb}
            className={`icon ${led3On ? 'light-lit' : ''}`}
          /> LED3
        </div>
        <Switch
          checked={led3On}
          onChange={checked => handleLedChange(3, setLed3On, 'LED3', checked)}
          className='switch'
          loading={loading.led3}
        />
      </Card>
    </div>
  );
};

export default ControlPanel;
