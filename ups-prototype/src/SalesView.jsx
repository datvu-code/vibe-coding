import React, { useState } from 'react';
import {
  Card, Alert, Row, Col, Input, Select, Button, DatePicker, Table, Empty, Typography
} from 'antd';
import { InfoCircleOutlined, ExportOutlined, ReloadOutlined, FilterOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const SalesView = () => {
  const [mainTab, setMainTab] = useState('sales');
  const [scopeTab, setScopeTab] = useState('150days');
  const [statusTab, setStatusTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const mainTabs = [
    { key: 'sales', label: 'Bán hàng' },
    { key: 'returns', label: 'Trả lại hàng bán' }
  ];

  const scopeTabs = [
    { key: '150days', label: 'Trong vòng 150 ngày' },
    { key: 'history', label: 'Lịch sử' }
  ];

  const statusTabs = [
    { key: 'all', label: 'Tất cả', count: 0 },
    { key: 'no-invoice', label: 'Chưa xuất hóa đơn', count: 0 },
    { key: 'wait-code', label: 'Chờ cấp mã', count: 0 },
    { key: 'code-assigned', label: 'Đã cấp mã', count: 0 },
    { key: 'adjustment', label: 'Hoá đơn điều chỉnh', count: 0 },
    { key: 'replacement', label: 'Hoá đơn thay thế', count: 0 },
    { key: 'rejected', label: 'Hoá đơn bị từ chối', count: 0 },
    { key: 'cancelled', label: 'Đã hủy', count: 0 }
  ];

  const columns = [
    { title: 'Thông tin sản phẩm', dataIndex: 'product', key: 'product', width: 200 },
    { title: 'Tiền thanh toán', dataIndex: 'payment', key: 'payment', width: 120, align: 'right' },
    { title: 'Giá vốn', dataIndex: 'cost', key: 'cost', width: 100, align: 'right' },
    { title: 'Chiết khấu', dataIndex: 'discount', key: 'discount', width: 100, align: 'right' },
    { title: 'Thông tin đơn', dataIndex: 'orderInfo', key: 'orderInfo', width: 160 },
    { title: 'Trạng thái hoá đơn', dataIndex: 'invoiceStatus', key: 'invoiceStatus', width: 140 }
  ];

  const dataSource = [];
  const total = 0;

  return (
    <div>
      {/* Main tabs: Bán hàng | Trả lại hàng bán */}
      <div style={{ display: 'flex', gap: 21, marginBottom: 8 }}>
        {mainTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setMainTab(tab.key)}
            style={{
              border: 'none',
              borderBottom: mainTab === tab.key ? '1.74px solid #EF5941' : 'none',
              background: 'transparent',
              padding: '10px 0',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: mainTab === tab.key ? 600 : 400,
              color: mainTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Alert
        message="Các đơn hàng có thời gian hơn 150 ngày sẽ được chuyển vào Lịch sử và không thể xử lý được nữa."
        type="info"
        showIcon
        icon={<InfoCircleOutlined />}
        style={{ marginBottom: 14 }}
      />

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
        {/* Filters */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 12]}>
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Thời gian đặt hàng</Text>
              <RangePicker showTime style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Chọn sàn</Text>
              <Select placeholder="Chọn sàn" style={{ width: '100%' }} allowClear />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Chọn gian hàng</Text>
              <Select placeholder="Chọn gian hàng" style={{ width: '100%' }} allowClear />
            </Col>
            <Col xs={24} md={4} />
          </Row>
          <Row gutter={[16, 12]} style={{ marginTop: 12 }}>
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Số chứng từ</Text>
              <Input placeholder="Tìm chứng từ" prefix={<span style={{ color: '#999' }}>▼</span>} allowClear />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Chọn kho</Text>
              <Select placeholder="Chọn kho" style={{ width: '100%' }} allowClear />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }} />
              <Button icon={<FilterOutlined />}>Lọc đơn hàng nâng cao</Button>
            </Col>
          </Row>
          <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>
            Tổng tiền thanh toán: 0 đ &nbsp;|&nbsp; Tổng hoá đơn đã đẩy tự động hôm nay: 0
          </div>
        </div>

        {/* Action bar */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <Text>Đã chọn: 0/1000</Text>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button>Thao tác hàng loạt</Button>
            <Button type="primary" icon={<ExportOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941' }}>Xuất dữ liệu</Button>
            <Button icon={<ReloadOutlined />} />
          </div>
        </div>

        {/* Status tabs */}
        <div style={{ display: 'flex', gap: 21, padding: '12px 16px', borderBottom: '1px solid #F0F0F0', flexWrap: 'wrap' }}>
          {statusTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setStatusTab(tab.key)}
              style={{
                border: 'none',
                borderBottom: statusTab === tab.key ? '1.74px solid #EF5941' : 'none',
                background: 'transparent',
                padding: '10px 0',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: statusTab === tab.key ? 600 : 400,
                color: statusTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không tìm thấy đơn hàng phù hợp" /> }}
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

export default SalesView;
