import React, { useState } from 'react';
import {
  Card, Row, Col, Select, DatePicker, Button, Table, Empty, Typography
} from 'antd';
import { InfoCircleOutlined, ExportOutlined, CopyOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const OperationalReportView = () => {
  const [mainTab, setMainTab] = useState('overview');
  const [breakdownTab, setBreakdownTab] = useState('platform');
  const [leftTableTab, setLeftTableTab] = useState('revenue');
  const [rightTableTab, setRightTableTab] = useState('revenue');

  const mainTabs = [
    { key: 'overview', label: 'Tổng quan' },
    { key: 'products', label: 'Sản phẩm' },
    { key: 'buyers', label: 'Người mua' },
    { key: 'sla', label: 'Báo cáo SLA' }
  ];

  const breakdownTabs = [
    { key: 'platform', label: 'Tỷ lệ theo sàn' },
    { key: 'store', label: 'Tỷ lệ theo gian hàng' },
    { key: 'brand', label: 'Tỷ lệ theo nhãn hàng' }
  ];

  const kpiCards = [
    { title: 'GMV sàn', value: '0đ', borderColor: '#FF4D4F' },
    { title: 'GMV nhà bán', value: '0', borderColor: '#d9d9d9' },
    { title: 'NMV (Doanh số hiệu quả)', value: '0', borderColor: '#d9d9d9' },
    { title: 'Đơn hàng', value: '0', borderColor: '#52C41A' },
    { title: 'Đơn hàng hiệu quả', value: '0', borderColor: '#d9d9d9' }
  ];

  const platformLegend = ['Tiktok', 'Lazada', 'Shopee', 'Khác', 'Tiki', 'Haravan', 'Facebook', 'Upbase'];

  const leftTableCols = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60 },
    { title: 'Sản phẩm', dataIndex: 'product', key: 'product' },
    { title: 'Gian hàng', dataIndex: 'store', key: 'store', width: 120 },
    { title: 'Doanh số hiệu quả', dataIndex: 'revenue', key: 'revenue', width: 140, align: 'right' }
  ];
  const rightTableCols = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60 },
    { title: 'Sản phẩm', dataIndex: 'product', key: 'product' },
    { title: 'Doanh số hiệu quả', dataIndex: 'revenue', key: 'revenue', width: 140, align: 'right' }
  ];

  return (
    <div>
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, border: '1px solid #F0F0F0' }}>
        {/* Main tabs */}
        <div style={{ display: 'flex', gap: 21, padding: '12px 16px', borderBottom: '1px solid #F0F0F0' }}>
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

        {/* Filters */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 12]} align="middle">
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Thời gian</Text>
              <RangePicker showTime style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={4}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Sàn</Text>
              <Select defaultValue="all" style={{ width: '100%' }}><Option value="all">Tất cả</Option></Select>
            </Col>
            <Col xs={24} md={4}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Gian hàng</Text>
              <Select defaultValue="all" style={{ width: '100%' }}><Option value="all">Tất cả</Option></Select>
            </Col>
            <Col xs={24} md={4}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Nguồn phát sinh</Text>
              <Select defaultValue="all" style={{ width: '100%' }}><Option value="all">Tất cả</Option></Select>
            </Col>
            <Col xs={24} md={4}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Loại so sánh</Text>
              <Select defaultValue="prev" style={{ width: '100%' }}><Option value="prev">So với kì trước</Option></Select>
            </Col>
            <Col xs={24} md={2} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<ExportOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941' }}>Xuất file</Button>
            </Col>
          </Row>
        </div>

        {/* KPI cards */}
        <div style={{ padding: '16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 16]}>
            {kpiCards.map((kpi, i) => (
              <Col xs={24} sm={12} md={8} lg={4} key={i}>
                <div style={{
                  border: `1px solid ${kpi.borderColor}`,
                  borderRadius: 8,
                  padding: 12,
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                    <Text style={{ fontSize: 13 }}>{kpi.title}</Text>
                    <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{kpi.value}</div>
                  <Text type="secondary" style={{ fontSize: 12 }}>So với kì trước -</Text>
                  <CopyOutlined style={{ position: 'absolute', top: 8, right: 8, color: '#999', fontSize: 12 }} />
                </div>
              </Col>
            ))}
          </Row>
          <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>Đã chọn 2/4</Text>
        </div>

        {/* Chart placeholder */}
        <div style={{ padding: 16, borderBottom: '1px solid #F0F0F0', minHeight: 280, background: '#FAFAFA' }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            <span style={{ display: 'inline-block', width: 12, height: 12, background: '#FF4D4F', borderRadius: 2 }} /> GMV sàn
            <span style={{ display: 'inline-block', width: 12, height: 12, background: '#52C41A', borderRadius: 2 }} /> Đơn hàng
          </div>
          <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid #F0F0F0', borderRadius: 8 }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Biểu đồ theo thời gian" />
          </div>
        </div>

        {/* Breakdown section */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0' }}>
          {breakdownTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setBreakdownTab(tab.key)}
              style={{
                border: 'none',
                borderBottom: breakdownTab === tab.key ? '1.74px solid #EF5941' : 'none',
                background: 'transparent',
                padding: '8px 12px 8px 0',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: breakdownTab === tab.key ? 600 : 400,
                color: breakdownTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)',
                marginRight: 16
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ padding: 16, borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {platformLegend.map((p, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: `hsl(${(i * 45) % 360}, 70%, 50%)` }} />
                {p}
              </span>
            ))}
          </div>
          <Row gutter={[16, 16]}>
            {[1, 2, 3].map(i => (
              <Col span={8} key={i}>
                <div style={{ height: 120, background: '#fff', border: '1px solid #F0F0F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có thông tin tỷ lệ" style={{ margin: 0 }} />
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Two tables */}
        <div style={{ padding: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Card size="small" title="Top sản phẩm theo hàng hóa sàn" style={{ flex: 1, minWidth: 280 }}>
            <div style={{ marginBottom: 8 }}>
              <button onClick={() => setLeftTableTab('revenue')} style={{ marginRight: 8, border: 'none', background: leftTableTab === 'revenue' ? '#f0f0f0' : 'transparent', padding: '4px 8px', borderRadius: 4 }}>Theo doanh số</button>
              <button onClick={() => setLeftTableTab('count')} style={{ border: 'none', background: leftTableTab === 'count' ? '#f0f0f0' : 'transparent', padding: '4px 8px', borderRadius: 4 }}>Theo số sản phẩm</button>
            </div>
            <Table columns={leftTableCols} dataSource={[]} pagination={false} size="small" locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có sản phẩm" /> }} />
          </Card>
          <Card size="small" title="Top sản phẩm theo hàng hóa kho" style={{ flex: 1, minWidth: 280 }}>
            <div style={{ marginBottom: 8 }}>
              <button onClick={() => setRightTableTab('revenue')} style={{ marginRight: 8, border: 'none', background: rightTableTab === 'revenue' ? '#f0f0f0' : 'transparent', padding: '4px 8px', borderRadius: 4 }}>Theo doanh số</button>
              <button onClick={() => setRightTableTab('count')} style={{ border: 'none', background: rightTableTab === 'count' ? '#f0f0f0' : 'transparent', padding: '4px 8px', borderRadius: 4 }}>Theo số sản phẩm</button>
            </div>
            <Table columns={rightTableCols} dataSource={[]} pagination={false} size="small" locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có sản phẩm" /> }} />
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default OperationalReportView;
