import React, { useState } from 'react';
import {
  Card, Row, Col, Select, DatePicker, Button, Table, Empty, Typography
} from 'antd';
import { InfoCircleOutlined, ExportOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const FulfillmentTrackingView = () => {
  const [mainTab, setMainTab] = useState('overview');

  const mainTabs = [
    { key: 'overview', label: 'Tổng quan' },
    { key: 'sla', label: 'Theo hạn SLA' },
    { key: 'express', label: 'Theo hạn Giao hàng nhanh' },
    { key: 'cbh', label: 'Theo hạn CBH' }
  ];

  const kpiCards = [
    { title: 'Đơn đẩy sang kho', value: '0', sub: '0%', sub2: '0/0', borderColor: '#91D5FF' },
    { title: 'Đơn hàng lỗi kho', value: '0', borderColor: '#FF4D4F' },
    { title: 'Đơn hàng lỗi sàn', value: '0', borderColor: '#FAAD14' },
    { title: 'Đơn chờ đóng gói', value: '0', borderColor: '#52C41A' },
    { title: 'Đơn quá hạn', value: '0', borderColor: '#FF4D4F' },
    { title: 'Đơn sắp hết hạn', value: '0', borderColor: '#FAAD14' },
    { title: 'Đơn chờ đóng gói', value: '0', borderColor: '#52C41A' },
    { title: 'Đơn chờ lấy hàng', value: '0', borderColor: '#52C41A' }
  ];

  const columns = [
    { title: 'Thông tin gian hàng', dataIndex: 'store', key: 'store', width: 160 },
    { title: 'Đơn đẩy sang kho', dataIndex: 'pushed', key: 'pushed', width: 120, align: 'right' },
    { title: 'Đơn quá hạn', dataIndex: 'overdue', key: 'overdue', width: 100, align: 'right' },
    { title: 'Đơn sắp hết hạn', dataIndex: 'nearDue', key: 'nearDue', width: 120, align: 'right' },
    { title: 'Đơn lỗi kho', dataIndex: 'whError', key: 'whError', width: 100, align: 'right' },
    { title: 'Đơn lỗi sàn', dataIndex: 'platformError', key: 'platformError', width: 100, align: 'right' },
    { title: 'Đơn chờ đóng gói', dataIndex: 'packing', key: 'packing', width: 120, align: 'right' },
    { title: 'Đơn chờ lấy hàng', dataIndex: 'pickup', key: 'pickup', width: 120, align: 'right' }
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
            <Col xs={24} md={6} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<ExportOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941' }}>Xuất file</Button>
            </Col>
          </Row>
        </div>

        {/* KPI cards - 2 rows of 4 */}
        <div style={{ padding: '16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 16]}>
            {kpiCards.map((kpi, i) => (
              <Col xs={24} sm={12} md={6} key={i}>
                <div style={{
                  border: `1px solid ${kpi.borderColor}`,
                  borderRadius: 8,
                  padding: 12,
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                    <Text style={{ fontSize: 13 }}>{kpi.title}</Text>
                    {kpi.sub !== undefined && <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{kpi.value}</div>
                  {kpi.sub !== undefined && <Text type="secondary" style={{ fontSize: 12 }}>{kpi.sub} {kpi.sub2}</Text>}
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Số liệu chi tiết */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Text strong style={{ fontSize: 14 }}>Số liệu chi tiết</Text>
        </div>
        <Table
          columns={columns}
          dataSource={[]}
          pagination={false}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Data" /> }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}><Text strong>Tổng (0 gian hàng)</Text></Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right"><><CheckCircleOutlined style={{ color: '#52C41A', marginRight: 4 }} />0/0</></Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">0</Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="right">0</Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right">0</Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="right">0</Table.Summary.Cell>
                <Table.Summary.Cell index={6} align="right">0</Table.Summary.Cell>
                <Table.Summary.Cell index={7} align="right">0</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default FulfillmentTrackingView;
