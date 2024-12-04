// import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { Select } from 'antd';

// const { Option } = Select;

// const Chart = ({ data }) => {
//   const [selectedChart, setSelectedChart] = useState('all');

//   const handleChange = (value) => {
//     setSelectedChart(value);
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h3>Nhiệt độ, Độ ẩm, và Ánh sáng theo thời gian</h3>

//       {/* Dropdown menu to select the chart type */}
//       <Select defaultValue="all" style={{ width: 200, marginBottom: 20 }} onChange={handleChange}>
//         <Option value="all">Tất cả</Option>
//         <Option value="temperature">Biểu đồ Nhiệt độ</Option>
//         <Option value="humidity">Biểu đồ Độ ẩm</Option>
//         <Option value="light">Biểu đồ Ánh sáng</Option>
//       </Select>

//       <LineChart
//         width={800}
//         height={400}
//         data={data}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="timeConvert" />
//         <YAxis />
//         <Tooltip />
//         <Legend />

//         {/* Render lines conditionally based on the selected chart */}
//         {(selectedChart === 'all' || selectedChart === 'temperature') && (
//           <Line type="monotone" dataKey="temperature" stroke="#e4534f" activeDot={{ r: 8 }} />
//         )}
//         {(selectedChart === 'all' || selectedChart === 'humidity') && (
//           <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
//         )}
//         {(selectedChart === 'all' || selectedChart === 'light') && (
//           <Line type="monotone" dataKey="light" stroke="#ffc658" />
//         )}
//       </LineChart>
//     </div>
//   );
// };

// export default Chart;


import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from 'antd';

const { Option } = Select;

const Chart = ({ data }) => {
  const [selectedChart, setSelectedChart] = useState('all');

  const handleChange = (value) => {
    setSelectedChart(value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Dropdown menu to select the chart type */}
      <Select defaultValue="all" style={{ width: 400, marginBottom: 20, maginTop: 20 }} onChange={handleChange}>
        <Option value="all">Cam bien moi</Option>
      </Select>

      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timeConvert" />
        
        {/* Conditionally render YAxis for each chart type */}
        {(selectedChart === 'all' || selectedChart === 'temperature' || selectedChart === 'humidity') && (
          <YAxis />
        )}
        {selectedChart === 'light' && (
          <YAxis reversed /> // Trục y ngược để giá trị lớn (lux thấp) ở phía dưới, giá trị nhỏ (lux cao) ở phía trên
        )}
        
        <Tooltip />
        <Legend />

        {/* Render lines conditionally based on the selected chart */}
        {(selectedChart === 'all' || selectedChart === 'Cam bien moi') && (
          <Line type="monotone" dataKey="Cam bien moi" stroke="#e4534f" activeDot={{ r: 8 }} />
        )}
      </LineChart>
    </div>
  );
};

export default Chart;
