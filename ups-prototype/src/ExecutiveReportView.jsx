import React, { useState } from 'react';
import {
  Card, Row, Col, Select, Table, Empty, Typography
} from 'antd';

const { Text } = Typography;
const { Option } = Select;

const ExecutiveReportView = () => {
  const [mainTab, setMainTab] = useState('overview');

  const mainTabs = [
    { key: 'overview', label: 'Tổng quan' },
    { key: 'detail', label: 'Chi tiết báo cáo' },
    { key: 'config', label: 'Cấu hình báo cáo' }
  ];

  const kpiCards = [
    { title: 'Doanh thu thuần (NMV)', value: '0đ', borderColor: '#FF4D4F' },
    { title: 'Số đơn hàng hiệu quả', value: '0', borderColor: '#1677FF' },
    { title: 'Lượt truy cập gian hàng', value: '0', borderColor: '#52C41A' },
    { title: 'Tỉ lệ chuyển đổi (CR)', value: '0%', borderColor: '#722ED1' },
    { title: 'Giá trị trung bình 1 đơn hàng (AOV)', value: '0đ', borderColor: '#FF4D4F' }
  ];

  const revenueLegend = [
    { label: 'Doanh thu video', color: '#FF4D4F' },
    { label: 'Doanh thu livestream', color: '#1677FF' },
    { label: 'Doanh thu trang sản phẩm', color: '#FAAD14' },
    { label: 'Chi phí booking video aff', color: '#13C2C2' },
    { label: 'Chi phí booking self channel', color: '#FF4D4F' },
    { label: 'Chi phí ads', color: '#1677FF' },
    { label: 'Chi phí booking livestream aff', color: '#FAAD14' },
    { label: 'Chi phí livestream self channel', color: '#722ED1' },
    { label: 'Chi phí tiếp thị liên kết', color: '#FA8C16' },
    { label: 'Gói dịch vụ hiển thị', color: '#8C8C8C' },
    { label: 'Chi phí khác', color: '#52C41A' }
  ];

  const shopLegend = ['Shoptest1', 'Shoptest', 'Puka1', 'Hana', 'upbase1', "Puka's Shop", 'Baybyyy Shop'];

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
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Gian hàng</Text>
              <Select defaultValue="all" style={{ width: '100%' }}><Option value="all">Tất cả</Option></Select>
            </Col>
            <Col xs={24} md={4}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Năm</Text>
              <Select defaultValue="2026" style={{ width: '100%' }}><Option value="2026">2026</Option></Select>
            </Col>
            <Col xs={24} md={4}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Tháng</Text>
              <Select defaultValue="2" style={{ width: '100%' }}><Option value="2">Tháng 2</Option></Select>
            </Col>
            <Col xs={24} md={4}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Loại</Text>
              <Select defaultValue="week" style={{ width: '100%' }}><Option value="week">Tuần</Option></Select>
            </Col>
          </Row>
        </div>

        {/* KPI cards */}
        <div style={{ padding: '16px', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
          <Row gutter={[16, 16]}>
            {kpiCards.map((kpi, i) => (
              <Col xs={24} sm={12} md={8} lg={4} key={i}>
                <div style={{
                  border: `1px solid ${kpi.borderColor}`,
                  borderRadius: 8,
                  padding: 12,
                  position: 'relative'
                }}>
                  <Text style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>{kpi.title}</Text>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{kpi.value}</div>
                </div>
              </Col>
            ))}
          </Row>
          <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>Đã chọn 5/5</Text>
        </div>

        {/* Chart section 1 - Revenue/Cost */}
        <div style={{ padding: 16, borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
            {revenueLegend.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div style={{ height: 160, background: '#fff', border: '1px solid #F0F0F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có thông tin tỷ lệ doanh thu" style={{ margin: 0 }} />
              </div>
            </Col>
            <Col span={12}>
              <div style={{ height: 160, background: '#fff', border: '1px solid #F0F0F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có thông tin tỷ lệ doanh thu" style={{ margin: 0 }} />
              </div>
            </Col>
          </Row>
        </div>

        {/* Chart section 2 - By shop */}
        <div style={{ padding: 16, borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
            {shopLegend.map((s, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: `hsl(${(i * 51) % 360}, 70%, 50%)` }} />
                {s}
              </span>
            ))}
          </div>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div style={{ height: 140, background: '#fff', border: '1px solid #F0F0F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có thông tin tỷ lệ doanh thu thuần (nmv)" style={{ margin: 0 }} />
              </div>
            </Col>
            <Col span={8}>
              <div style={{ height: 140, background: '#fff', border: '1px solid #F0F0F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có thông tin tỷ lệ tổng chi phí thúc đẩy" style={{ margin: 0 }} />
              </div>
            </Col>
            <Col span={8}>
              <div style={{ height: 140, background: '#fff', border: '1px solid #F0F0F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có thông tin tỷ lệ đơn hàng hiệu quả" style={{ margin: 0 }} />
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default ExecutiveReportView;
