import React, { useState } from 'react';
import {
  Card, Row, Col, Select, DatePicker, Button, Table, Empty, Typography
} from 'antd';
import { CloudDownloadOutlined, ExportOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const CoinManagementView = () => {
  const [scopeTab, setScopeTab] = useState('150days');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const scopeTabs = [
    { key: '150days', label: 'Trong vòng 150 ngày' },
    { key: 'history', label: 'Lịch sử' }
  ];

  const columns = [
    { title: 'Loại giao dịch', dataIndex: 'type', key: 'type', width: 160 },
    { title: 'Ngày giao dịch', dataIndex: 'date', key: 'date', width: 140 },
    { title: 'Xu của shop', dataIndex: 'coins', key: 'coins', width: 120, align: 'right' },
    { title: 'Hình thức', dataIndex: 'form', key: 'form', width: 120 },
    { title: 'Mô tả', dataIndex: 'desc', key: 'desc' }
  ];

  const dataSource = [];
  const total = 0;

  return (
    <div>
      {/* Scope tabs */}
      <div style={{ display: 'flex', gap: 21, marginBottom: 14 }}>
        {scopeTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setScopeTab(tab.key)}
            style={{
              border: 'none',
              borderBottom: scopeTab === tab.key ? '1.74px solid #EF5941' : 'none',
              background: 'transparent',
              padding: '10px 0',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: scopeTab === tab.key ? 600 : 400,
              color: scopeTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, border: '1px solid #F0F0F0' }}>
        {/* Summary */}
        <div style={{ display: 'flex', gap: 48, padding: '16px', borderBottom: '1px solid #F0F0F0', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 140, borderRight: '1px solid #F0F0F0', paddingRight: 24 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Tổng xu nhận</Text>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#52C41A' }}>0</div>
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Tổng xu chi</Text>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#FF4D4F' }}>0</div>
          </div>
        </div>
        <div style={{ padding: '0 16px 8px' }}>
          <Text type="secondary" style={{ fontSize: 12 }}>Tổng xu: 0</Text>
        </div>

        {/* Filters + actions */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 12]} align="middle">
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Ngày phát sinh giao dịch</Text>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Chọn gian hàng</Text>
              <Select placeholder="Chọn gian hàng" style={{ width: '100%' }} allowClear />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Loại giao dịch</Text>
              <Select placeholder="Loại giao dịch" style={{ width: '100%' }} allowClear />
            </Col>
            <Col xs={24} md={4} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <Button icon={<CloudDownloadOutlined />} style={{ color: '#EF5941', borderColor: '#EF5941' }}>Nhập dữ liệu</Button>
              <Text type="secondary" style={{ fontSize: 12 }}>Thời gian cập nhật gần nhất: <span style={{ color: '#52C41A' }}>05/02/2026 09:52</span></Text>
            </Col>
            <Col xs={24} md={4} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<ExportOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941' }}>Xuất dữ liệu</Button>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" /> }}
        />

        <div style={{ padding: '0 16px 14px' }}>
          <PaginationFooter
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            label="bản ghi"
            pageSizeOptions={[
              { value: 25, label: '25 bản ghi/trang' },
              { value: 50, label: '50 bản ghi/trang' },
              { value: 100, label: '100 bản ghi/trang' }
            ]}
          />
        </div>
      </Card>
    </div>
  );
};

export default CoinManagementView;
