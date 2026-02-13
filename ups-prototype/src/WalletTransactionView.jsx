import React, { useState } from 'react';
import {
  Card, Row, Col, Input, Select, Button, DatePicker, Table, Empty, Typography, Checkbox
} from 'antd';
import { ExportOutlined, ReloadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const WalletTransactionView = () => {
  const [scopeTab, setScopeTab] = useState('150days');
  const [contentTab, setContentTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const scopeTabs = [
    { key: '150days', label: 'Trong vòng 150 ngày' },
    { key: 'history', label: 'Lịch sử' }
  ];

  const contentTabs = [
    { key: 'all', label: 'Tất cả', count: 0 },
    { key: 'in', label: 'Tiền vào', count: 0 },
    { key: 'out', label: 'Tiền ra', count: 0 }
  ];

  const columns = [
    { title: 'Mã đơn hàng', dataIndex: 'orderCode', key: 'orderCode', width: 140, render: (t, r) => <><Checkbox /> {t}</> },
    { title: 'Số chứng từ', dataIndex: 'voucher', key: 'voucher', width: 120 },
    { title: 'Số tiền', dataIndex: 'amount', key: 'amount', width: 120, align: 'right' },
    { title: 'Ngày giao dịch', dataIndex: 'date', key: 'date', width: 120 },
    { title: 'Loại giao dịch', dataIndex: 'type', key: 'type', width: 140 },
    { title: 'Dòng tiền', dataIndex: 'flow', key: 'flow', width: 100 },
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
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>Tổng tiền vào ví</Text>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#52C41A' }}>0 ₫</div>
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>Tổng tiền ra ví</Text>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#FF4D4F' }}>0 ₫</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 12]}>
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Ngày phát sinh giao dịch</Text>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Sàn</Text>
              <Select placeholder="Sàn" style={{ width: '100%' }} allowClear />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Gian hàng</Text>
              <Select placeholder="Gian hàng" style={{ width: '100%' }} allowClear />
            </Col>
          </Row>
          <Row gutter={[16, 12]} style={{ marginTop: 12 }}>
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Mã đơn hàng</Text>
              <Input placeholder="Tìm đơn hàng" allowClear style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Loại giao dịch</Text>
              <Select placeholder="Loại giao dịch" style={{ width: '100%' }} allowClear />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Thông tin kèm giao dịch</Text>
              <Select placeholder="Thông tin" style={{ width: '100%' }} allowClear />
            </Col>
          </Row>
          <Row gutter={[16, 12]} style={{ marginTop: 12 }}>
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Trạng thái đẩy sang phần mềm kế toán</Text>
              <Select placeholder="Trạng thái" style={{ width: '100%' }} allowClear />
            </Col>
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Trạng thái đẩy dữ liệu chứng từ bán hàng gốc</Text>
              <Select placeholder="Trạng thái" style={{ width: '100%' }} allowClear />
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<ExportOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941' }}>Xuất dữ liệu</Button>
              <Button icon={<ReloadOutlined />} style={{ marginLeft: 8 }} />
            </Col>
          </Row>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button>Đẩy dữ liệu lên PMKT</Button>
            <Text>Đã chọn: 0/1000</Text>
          </div>
          <div style={{ marginTop: 8, color: '#52C41A', fontSize: 13 }}>
            <CheckCircleOutlined /> Tất cả giao dịch được cập nhật
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>Dữ liệu thống kê từ ngày – trở về trước</Text>
        </div>

        {/* Content tabs */}
        <div style={{ display: 'flex', gap: 21, padding: '12px 16px', borderBottom: '1px solid #F0F0F0' }}>
          {contentTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setContentTab(tab.key)}
              style={{
                border: 'none',
                borderBottom: contentTab === tab.key ? '1.74px solid #EF5941' : 'none',
                background: 'transparent',
                padding: '10px 0',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: contentTab === tab.key ? 600 : 400,
                color: contentTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div style={{ padding: '8px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Text strong>Tổng số tiền: 0₫</Text>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có bản ghi nào" /> }}
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

export default WalletTransactionView;
