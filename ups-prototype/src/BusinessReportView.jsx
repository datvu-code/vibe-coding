import React, { useState } from 'react';
import {
  Card, Row, Col, Select, Input, Button, Table, Radio, Typography
} from 'antd';
import { InfoCircleOutlined, ExportOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;

const BusinessReportView = () => {
  const [mainTab, setMainTab] = useState('overview');
  const [timeType, setTimeType] = useState('order');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const mainTabs = [
    { key: 'overview', label: 'Tổng quan' },
    { key: 'by-platform', label: 'Theo sàn' }
  ];

  const reportRows = [
    { code: '01', name: 'Doanh thu bán hàng', info: true },
    { code: '02', name: 'Doanh thu hàng bán trả lại', info: false },
    { code: '03', name: 'Doanh thu thuần', info: false },
    { code: '04', name: 'Giá vốn hàng bán', info: false },
    { code: '05', name: 'Lợi nhuận gộp', info: false },
    { code: '06', name: 'Chi phí Sales&Marketing', info: true, expandable: true },
    { code: '07', name: 'Chi phí vận hành nội bộ', info: false },
    { code: '08', name: 'Lợi nhuận thuần', info: false },
    { code: '09', name: 'Chi phí khác', info: false },
    { code: '10', name: 'Tổng lợi nhuận kế toán trước thuế', info: false }
  ];

  const columns = [
    { title: 'Mã số', dataIndex: 'code', key: 'code', width: 60 },
    {
      title: 'Khoản mục',
      dataIndex: 'name',
      key: 'name',
      render: (name, row) => (
        <span>
          {row.expandable && '▶ '}
          {name}
          {row.info && <InfoCircleOutlined style={{ marginLeft: 4, color: '#999', fontSize: 12 }} />}
        </span>
      )
    },
    { title: 'Giá trị quyết toán tháng 02/2025', dataIndex: 'v1', key: 'v1', align: 'right', render: () => '0₫' },
    { title: 'Giá trị quyết toán tháng 12/2025', dataIndex: 'v2', key: 'v2', align: 'right', render: () => '0₫' },
    { title: 'Giá trị quyết toán tháng 01/2026', dataIndex: 'v3', key: 'v3', align: 'right', render: () => '0₫' },
    { title: 'Tăng trưởng 01/2026 vs 12/2025', dataIndex: 'growth', key: 'growth', align: 'right', render: () => <span style={{ color: '#52C41A' }}>▲0.00%</span> },
    { title: 'Giá trị ước tính tháng 02/2026', dataIndex: 'estimate', key: 'estimate', align: 'right', render: () => '0₫' },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note', width: 80 }
  ];

  const total = reportRows.length;

  return (
    <div>
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, border: '1px solid #F0F0F0' }}>
        {/* Tabs */}
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
              <Input placeholder="02/2026" suffix={<span style={{ cursor: 'pointer', color: '#999' }}>×</span>} style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={12}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 8 }} />
              <Radio.Group value={timeType} onChange={e => setTimeType(e.target.value)} style={{ border: '1px solid #F0F0F0', padding: '4px 8px', borderRadius: 6 }}>
                <Radio value="aggregate">Mốc thời gian tổng hợp</Radio>
                <Radio value="order">Theo thời gian đặt hàng</Radio>
                <Radio value="reconcile">Theo thời gian quyết toán</Radio>
              </Radio.Group>
            </Col>
            <Col xs={24} md={3}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Sàn</Text>
              <Select defaultValue="all" style={{ width: '100%' }}><Option value="all">Tất cả</Option></Select>
            </Col>
            <Col xs={24} md={3}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Gian hàng</Text>
              <Select defaultValue="all" style={{ width: '100%' }}><Option value="all">Tất cả</Option></Select>
            </Col>
            <Col xs={24} md={6}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Trạng thái đơn</Text>
              <Select defaultValue="completed" style={{ width: '100%' }}><Option value="completed">Hoàn thành</Option></Select>
            </Col>
            <Col xs={24} md={6} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<ExportOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941' }}>Xuất file</Button>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={reportRows}
          rowKey="code"
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

export default BusinessReportView;
