import React, { useState } from 'react';
import { Table } from 'antd';
import fakeData from './fakeData';  // Import dữ liệu giả từ file fakeData.js

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id, // Sắp xếp theo ID
  },
  {
    title: 'Temperature',
    dataIndex: 'temperature',
    sorter: (a, b) => a.temperature - b.temperature, // Sắp xếp theo Nhiệt độ
    filters: [
      { text: '20°C - 25°C', value: '20-25' },
      { text: '25°C - 30°C', value: '25-30' },
    ],
    onFilter: (value, record) => {
      const temp = parseFloat(record.temperature);
      if (value === '20-25') return temp >= 20 && temp < 25;
      if (value === '25-30') return temp >= 25 && temp < 30;
      return true;
    },
  },
  {
    title: 'Humidity',
    dataIndex: 'humidity',
    sorter: (a, b) => a.humidity - b.humidity, // Sắp xếp theo Độ ẩm
    filters: [
      { text: '50% - 60%', value: '50-60' },
      { text: '60% - 70%', value: '60-70' },
    ],
    onFilter: (value, record) => {
      const humidity = parseFloat(record.humidity);
      if (value === '50-60') return humidity >= 50 && humidity < 60;
      if (value === '60-70') return humidity >= 60 && humidity < 70;
      return true;
    },
  },
  {
    title: 'Light',
    dataIndex: 'light',
    sorter: (a, b) => a.light - b.light, // Sắp xếp theo Ánh sáng
    filters: [
      { text: '0 - 50 lux', value: '0-50' },
      { text: '50 - 100 lux', value: '50-100' },
    ],
    onFilter: (value, record) => {
      const light = parseFloat(record.light);
      if (value === '0-50') return light >= 0 && light < 50;
      if (value === '50-100') return light >= 50 && light < 100;
      return true;
    },
  },
  {
    title: 'Time',
    dataIndex: 'time',
    sorter: (a, b) => new Date(a.time) - new Date(b.time),
    filters: [
      { text: 'Hôm nay', value: 'today' },
      { text: 'Hôm qua', value: 'yesterday' },
      { text: 'Tuần này', value: 'this_week' },
    ],
    onFilter: (value, record) => {
      const today = new Date();
      const recordDate = new Date(record.time);
      switch (value) {
        case 'today':
          return recordDate.toDateString() === today.toDateString();
        case 'yesterday':
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return recordDate.toDateString() === yesterday.toDateString();
        case 'this_week':
          const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
          return recordDate >= startOfWeek;
        default:
          return false;
      }
    },
  }
];

const TableSensors = () => {
  const [data, setData] = useState(fakeData);  // Sử dụng dữ liệu giả đã tạo
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,  // Số lượng bản ghi mỗi trang mặc định
      showSizeChanger: true, // Hiển thị tùy chọn chọn số lượng bản ghi mỗi trang
      pageSizeOptions: ['5', '10', '20', '50'], // Các tùy chọn số lượng bản ghi mỗi trang
      total: fakeData.length,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    const filteredData = fakeData
      .filter(item => {
        for (let key in filters) {
          if (filters[key] && filters[key].length > 0) {
            const filterFunc = columns.find(col => col.dataIndex === key).onFilter;
            if (!filters[key].some(val => filterFunc(val, item))) {
              return false;
            }
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (!sorter.order) {
          return 0;
        }
        const compareFunc = columns.find(col => col.dataIndex === sorter.field).sorter;
        const compareResult = compareFunc(a, b);
        return sorter.order === 'ascend' ? compareResult : -compareResult;
      });

    setTableParams({
      pagination: {
        ...pagination,
        total: filteredData.length,  // Cập nhật số lượng bản ghi sau khi lọc
      },
      filters,
      sorter,
    });

    setData(filteredData.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize));
  };

  return (
    <Table
      columns={columns}
      rowKey="id"
      dataSource={data}
      pagination={tableParams.pagination}
      onChange={handleTableChange}
      scroll={{ y: 400 }}
    />
  );
};

export default TableSensors;
