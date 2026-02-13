import React, { useState } from 'react';
import {
  Card, Row, Col, Select, DatePicker, Table, Typography
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const AutoReconciliationView = () => {
  const [primaryTab, setPrimaryTab] = useState('ecom');
  const [detailTab, setDetailTab] = useState('orders');
  const [resultFilter, setResultFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const primaryTabs = [
    { key: 'ecom', label: 'Đơn trên sàn TMĐT' },
    { key: 'manual', label: 'Đơn thủ công' },
    { key: 'pos', label: 'Đơn POS' },
    { key: 'website', label: 'Đơn Website' }
  ];

  const discrepancyLabels = [
    'Đơn hàng',
    'Xuất/Nhập kho',
    'Đơn bán hàng',
    'Trả lại hàng bán',
    'Đơn quyết toán',
    'Giao dịch về ví'
  ];

  const mockData = [
    { id: 1, date: '08/02/2026', runTime: '09/02/2026 07:15', shop: 'UpBeautyy', shopIcon: 'tiktok', platformOrders: 18, upsOrders: 18, success: true },
    { id: 2, date: '08/02/2026', runTime: '09/02/2026 07:15', shop: 'UpBeauty Store', shopIcon: 'store', platformOrders: 4, upsOrders: 4, success: true },
    { id: 3, date: '07/02/2026', runTime: '08/02/2026 07:15', shop: 'UpBeauty Store', shopIcon: 'store', platformOrders: 0, upsOrders: 0, success: true },
    { id: 4, date: '07/02/2026', runTime: '08/02/2026 07:15', shop: 'UpBeautyy', shopIcon: 'tiktok', platformOrders: 24, upsOrders: 24, success: true }
  ];
  const total = mockData.length;
  const pageData = mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    { title: 'Ngày đối soát dữ liệu', dataIndex: 'date', key: 'date', width: 140 },
    { title: 'Thời gian chạy đối soát', dataIndex: 'runTime', key: 'runTime', width: 160 },
    {
      title: 'Gian hàng đối soát',
      dataIndex: 'shop',
      key: 'shop',
      width: 180,
      render: (shop, row) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 24, height: 24, borderRadius: 4, background: row.shopIcon === 'tiktok' ? '#000' : '#f0f0f0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff' }}>
            {row.shopIcon === 'tiktok' ? 'TT' : '🛒'}
          </span>
          {shop}
        </span>
      )
    },
    {
      title: 'Đơn trên sàn TMĐT/Đơn trên UpS',
      key: 'ratio',
      width: 200,
      render: (_, row) => (
        <span>
          <span style={{ color: '#EF5941', fontWeight: 500 }}>{row.platformOrders}</span>
          <span style={{ color: '#52C41A' }}>/{row.upsOrders}</span>
        </span>
      )
    },
    {
      title: 'Kết quả đối soát',
      dataIndex: 'success',
      key: 'success',
      width: 140,
      render: (success) => success ? <CheckCircleOutlined style={{ color: '#52C41A', fontSize: 18 }} /> : '-'
    }
  ];

  return (
    <div>
      {/* Primary tabs - outside Card, no background */}
      <div style={{
        display: 'flex',
        gap: 21,
        padding: '12px 0',
        borderBottom: '1px solid #F0F0F0',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {primaryTabs.map(tab => {
          const isActive = primaryTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setPrimaryTab(tab.key)}
              style={{
                border: 'none',
                borderBottom: isActive ? '1.74px solid #EF5941' : 'none',
                background: 'transparent',
                padding: '10px 0',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <Card
        styles={{ body: { padding: 0 } }}
        style={{
          marginTop: 14,
          borderRadius: 8,
          backgroundColor: '#fff',
          border: '1px solid #F0F0F0'
        }}
      >
        {/* Filter Section (ProductLinkingView pattern) */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 16]} align="top">
            <Col xs={24} md={8}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Text style={{ fontSize: 14, lineHeight: '22px' }}>Thời gian</Text>
                <RangePicker style={{ width: '100%' }} />
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Text style={{ fontSize: 14, lineHeight: '22px' }}>Gian hàng</Text>
                <Select placeholder="Chọn gian hàng" style={{ width: '100%' }} allowClear showSearch />
              </div>
            </Col>
          </Row>
        </div>

        {/* Số lượng lệch */}
        <div style={{ padding: '16px', borderBottom: '1px solid #F0F0F0' }}>
          <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>Số lượng lệch</Text>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, alignItems: 'center' }}>
            {discrepancyLabels.map((label, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ width: 1, height: 32, background: '#F0F0F0', margin: '0 16px' }} />}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px 8px 0' }}>
                  <span style={{ fontSize: 20, fontWeight: 600, color: '#52C41A' }}>0</span>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF4D4F' }} title="Lệch" />
                  <Text style={{ fontSize: 13 }}>{label}</Text>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Secondary tabs (status-style, 14px) */}
        <div style={{
          display: 'flex',
          gap: 21,
          padding: '12px 16px',
          borderBottom: '1px solid #F0F0F0',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {discrepancyLabels.map((label, i) => {
            const key = ['orders', 'stock', 'sales', 'returns', 'settlement', 'wallet'][i];
            const isActive = detailTab === key;
            return (
              <button
                key={key}
                onClick={() => setDetailTab(key)}
                style={{
                  border: 'none',
                  borderBottom: isActive ? '1.74px solid #EF5941' : 'none',
                  background: 'transparent',
                  padding: '10px 0',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                  transition: 'all 0.2s'
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Kết quả đối soát filter */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Text style={{ fontSize: 14, marginRight: 8 }}>Kết quả đối soát</Text>
          <Select value={resultFilter} onChange={setResultFilter} style={{ minWidth: 160 }}>
            <Option value="all">Tất cả</Option>
            <Option value="success">Thành công</Option>
            <Option value="fail">Lỗi</Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={pageData}
          rowKey="id"
          pagination={false}
        />

        <div style={{ padding: '0 16px 14px' }}>
          <PaginationFooter
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            label="bản ghi"
          />
        </div>
      </Card>
    </div>
  );
};

export default AutoReconciliationView;
