import React from 'react';
import { Col, Row, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faSun, faTint } from '@fortawesome/free-solid-svg-icons';
import "./InfoCards.scss"

const InfoCards = ({ temperature, humidity, light }) => {
  return (
    <Row gutter={20} className='list-card'>
      <Col span={8}>
        <Card bordered={false} className='card-item temperature'>
          <div>Nhiệt độ: {temperature}°C</div> {/* Hiển thị nhiệt độ */}
          <div className='icon'>
            <FontAwesomeIcon icon={faTemperatureHigh} /> 
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default InfoCards;
