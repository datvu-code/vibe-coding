import React, { useState } from 'react';
import {
  Card, Alert, Row, Col, Input, Select, Button, DatePicker, Table, Empty, Checkbox, Space, Typography
} from 'antd';
import { InfoCircleOutlined, ExportOutlined, ReloadOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ReconciliationView = () => {
  const [scopeTab, setScopeTab] = useState('150days');
  const [detailTab, setDetailTab] = useState('pending');
  const [platform, setPlatform] = useState('tiktok');
  const [shop, setShop] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const scopeTabs = [
    { key: '150days', label: 'Trong vòng 150 ngày' },
    { key: 'history', label: 'Lịch sử' }
  ];

  const detailTabs = [
    { key: 'pending', label: 'Chờ quyết toán', count: 20 },
    { key: 'reconciled', label: 'Đã quyết toán', count: 0 }
  ];

  const summary = [
    { label: 'Chờ quyết toán', value: '4,430,000₫', sub: 'Tổng cộng', color: '#FF4D4F', icon: '🕐' },
    { label: 'Đã quyết toán', value: '0₫', sub: 'Tháng này', color: '#52C41A', icon: '✓' },
    { label: 'Bất thường', value: '0₫', sub: 'Tổng tiền lệch', color: '#FF4D4F', icon: '⚠' }
  ];

  const columns = [
    { title: 'Mã đơn hàng', dataIndex: 'orderCode', key: 'orderCode', width: 140, render: (t, r) => <><Checkbox /> {t}</> },
    { title: 'Gian hàng', dataIndex: 'shop', key: 'shop', width: 120 },
    { title: 'Số tiền quyết toán ước tính', dataIndex: 'estimate', key: 'estimate', width: 160, align: 'right' },
    { title: 'Giá gốc', dataIndex: 'originalPrice', key: 'originalPrice', width: 100, align: 'right' },
    { title: 'Trợ giá sản phẩm', dataIndex: 'productSupport', key: 'productSupport', width: 120, align: 'right' },
    { title: 'Chi phí quà tặng', dataIndex: 'giftCost', key: 'giftCost', width: 110, align: 'right' },
    { title: 'Mã giảm giá', dataIndex: 'voucher', key: 'voucher', width: 100, align: 'right' },
    { title: 'Người bán hoàn xu', dataIndex: 'coinRefund', key: 'coinRefund', width: 120, align: 'right' },
    { title: 'Người bán hỗ trợ vận chuyển', dataIndex: 'shippingSupport', key: 'shippingSupport', width: 160, align: 'right' },
    { title: 'Phí cố định', dataIndex: 'fixedFee', key: 'fixedFee', width: 90, align: 'right' },
    { title: 'Phí thanh toán', dataIndex: 'paymentFee', key: 'paymentFee', width: 110, align: 'right' },
    { title: 'Phí hạ', dataIndex: 'reductionFee', key: 'reductionFee', width: 80, align: 'right' }
  ];

  const dataSource = [];
  const total = 0;

  return (
    <div>
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
        {/* Nền tảng đối soát + Sàn + Gian hàng */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 12]}>
            <Col span={24}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>Nền tảng đối soát</Text>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Text type="secondary" style={{ fontSize: 12 }}>SÀN THƯƠNG MẠI ĐIỆN TỬ</Text>
                {['Tiktok', 'Lazada', 'Shopee', 'TIKI'].map(p => (
                  <Button
                    key={p}
                    type={platform === p.toLowerCase() ? 'primary' : 'default'}
                    style={platform === p.toLowerCase() ? { background: '#EF5941', borderColor: '#EF5941' } : {}}
                    onClick={() => setPlatform(p.toLowerCase())}
                  >
                    {p}
                  </Button>
                ))}
                <Text type="secondary" style={{ fontSize: 12, marginLeft: 8 }}>THỦ CÔNG</Text>
                <Input placeholder="Thủ công" style={{ width: 120 }} />
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Sàn</Text>
              <Select value={platform} onChange={setPlatform} style={{ width: '100%' }}>
                <Option value="tiktok">Tiktok</Option>
                <Option value="lazada">Lazada</Option>
                <Option value="shopee">Shopee</Option>
                <Option value="tiki">TIKI</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Gian hàng</Text>
              <Space>
                <Button type={shop === 'all' ? 'primary' : 'default'} onClick={() => setShop('all')} style={shop === 'all' ? { background: '#EF5941', borderColor: '#EF5941' } : {}}>Tất cả</Button>
                <Button type={shop === 'baybyyy' ? 'primary' : 'default'} onClick={() => setShop('baybyyy')} style={shop === 'baybyyy' ? { background: '#EF5941', borderColor: '#EF5941' } : {}}>Baybyyy Shop</Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Summary */}
        <div style={{ display: 'flex', padding: '16px', gap: 24, borderBottom: '1px solid #F0F0F0', flexWrap: 'wrap' }}>
          {summary.map((s, i) => (
            <div key={i} style={{ flex: 1, minWidth: 140, borderRight: i < summary.length - 1 ? '1px solid #F0F0F0' : 'none', paddingRight: 24 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>{s.label}</Text>
              <div style={{ fontSize: 18, fontWeight: 600, color: s.color, marginTop: 4 }}>{s.value}</div>
              <Text type="secondary" style={{ fontSize: 12 }}>{s.sub}</Text>
            </div>
          ))}
        </div>

        {/* Chi tiết */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Text strong style={{ fontSize: 14 }}>Chi tiết</Text>
        </div>

        {/* Detail tabs */}
        <div style={{ display: 'flex', gap: 21, padding: '12px 16px', borderBottom: '1px solid #F0F0F0' }}>
          {detailTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setDetailTab(tab.key)}
              style={{
                border: 'none',
                borderBottom: detailTab === tab.key ? '1.74px solid #EF5941' : 'none',
                background: 'transparent',
                padding: '10px 0',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: detailTab === tab.key ? 600 : 400,
                color: detailTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Table filters + actions */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 12]} align="middle">
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Thời gian đơn hàng hoàn thành</Text>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Mã đơn hàng</Text>
              <Input placeholder="Tìm đơn hàng" prefix={<span style={{ color: '#999' }}>▼</span>} allowClear />
            </Col>
            <Col xs={24} md={4}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Quá hạn</Text>
              <Select defaultValue="all" style={{ width: '100%' }}>
                <Option value="all">Tất cả</Option>
              </Select>
            </Col>
            <Col xs={24} md={6} style={{ textAlign: 'right' }}>
              <Space>
                <Button type="primary" icon={<ExportOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941' }}>Xuất file</Button>
                <Button icon={<ReloadOutlined />} />
              </Space>
            </Col>
          </Row>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
            <Text>Đã chọn: 0</Text>
            <Button>Tải lại</Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="orderCode"
          pagination={false}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" /> }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}><Text strong>Tổng cộng</Text></Table.Summary.Cell>
                {columns.slice(2).map((c, i) => <Table.Summary.Cell key={i} index={i + 2} align="right">0₫</Table.Summary.Cell>)}
              </Table.Summary.Row>
            </Table.Summary>
          )}
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

export default ReconciliationView;
