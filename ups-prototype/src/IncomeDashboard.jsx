import React, { useState } from 'react';
import { Card, Row, Col, Typography, Statistic, Tabs, Button, Space, Tag, Select, Dropdown, Menu } from 'antd';
import {
  EditOutlined, FullscreenOutlined, MoreOutlined, ArrowDownOutlined, ArrowUpOutlined, CloseOutlined
} from '@ant-design/icons';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';

const { Title, Text } = Typography;

const IncomeDashboard = () => {
  const [activeTab, setActiveTab] = useState('bao-cao-kinh-doanh');

  // Mock data based on image description
  const kpiData = {
    revenue: { value: 318.1, unit: 'M', change: -91.98, trend: 'down' },
    profit: { value: 243.1, unit: 'M', change: -91.72, trend: 'down' },
    totalCost: { value: 74.3, unit: 'M', change: -92.72, trend: 'down' },
    costToRevenueRatio: { value: 23.4, unit: '%', change: -1.53, trend: 'down' },
    profitToRevenueRatio: { value: 76.4, unit: '%', change: 0.46, trend: 'up' }
  };

  // Trend data for Revenue and Profit
  const trendData = [
    { month: '10/2025', revenue: 2.0, profit: 1.5 },
    { month: '11/2025', revenue: 2.8, profit: 2.2 },
    { month: '12/2025', revenue: 3.5, profit: 3.0 }
  ];

  // Cost and Profit Analysis data
  const costAnalysisData = [
    { name: 'Doanh thu (NMV)', value: 318.1, percentage: 100.0 },
    { name: 'Chi phí sản', value: 66.1, percentage: 20.78 },
    { name: 'ecom_fact_pnl.operating_expense', value: 0, percentage: 0.0 },
    { name: 'Chi phí MKT', value: 0, percentage: 0.0 },
    { name: 'Chi phí voucher', value: 0, percentage: 0.0 },
    { name: 'Chi phí UpBase', value: 0, percentage: 0.0 },
    { name: 'Chi phí khác', value: 0, percentage: 0.0 },
    { name: 'Lợi nhuận', value: 243.1, percentage: 76.41 }
  ];

  // Cost Ratio Trend data
  const costRatioData = [
    { month: '01/2026', productionCostRatio: 0.2, marketingCostRatio: 0.0, operatingCostRatio: 0.0, voucherCostRatio: 0.0 }
  ];

  // Channel Cost Structure data
  const channelCostData = [
    { channel: 'TikTok', productionCost: 70, marketingCost: 5, operatingCost: 2, voucherCost: 1 }
  ];

  // Channel Performance (bubble chart) data
  const channelPerformanceData = [
    { costToRevenue: 0.15, growthRate: -0.6, channel: 'TikTok', size: 200 }
  ];

  const actionMenu = (
    <Menu>
      <Menu.Item key="export">Xuất file</Menu.Item>
      <Menu.Item key="settings">Cài đặt</Menu.Item>
    </Menu>
  );

  const formatValue = (value, unit) => {
    if (unit === 'M') {
      return `${value.toFixed(1)}${unit}`;
    }
    return `${value.toFixed(2)}${unit}`;
  };

  return (
    <div style={{ padding: '24px', background: '#FAFAFA', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 16, fontSize: 24, fontWeight: 600 }}>
          Báo cáo Tổng quan Doanh thu và Chi phí Tháng (Income)
        </Title>
        
        {/* Navigation Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { key: 'bao-cao-kinh-doanh', label: 'Báo cáo kinh doanh kênh theo đơn hàng' },
            { key: 'shopee-1', label: 'Shopee' },
            { key: 'shopee-2', label: 'Shopee' },
            { key: 'bang-mau-3', label: 'Bảng mẫu 3' }
          ]}
          style={{ marginBottom: 16 }}
        />

        {/* Action Buttons and Filter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          {/* Filter */}
          <Tag
            closable
            onClose={() => {}}
            style={{
              fontSize: 14,
              padding: '4px 12px',
              borderRadius: 4,
              background: '#F0F0F0',
              border: '1px solid #D9D9D9'
            }}
          >
            L'Occitane VN
          </Tag>

          {/* Action Buttons */}
          <Space>
            <Button icon={<EditOutlined />}>Tuỳ chỉnh</Button>
            <Button icon={<FullscreenOutlined />}>Toàn màn hình</Button>
            <Dropdown overlay={actionMenu} trigger={['click']}>
              <Button icon={<MoreOutlined />}>Thao tác</Button>
            </Dropdown>
          </Space>
        </div>
      </div>

      {/* KPIs Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Doanh thu (NMV) Income"
              value={kpiData.revenue.value}
              suffix={kpiData.revenue.unit}
              valueStyle={{ fontSize: 24, fontWeight: 600 }}
            />
            <div style={{ marginTop: 8, fontSize: 14, color: kpiData.revenue.trend === 'down' ? '#ff4d4f' : '#52c41a' }}>
              {kpiData.revenue.trend === 'down' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
              {' '}
              {Math.abs(kpiData.revenue.change).toFixed(2)}%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Lợi nhuận (Income)"
              value={kpiData.profit.value}
              suffix={kpiData.profit.unit}
              valueStyle={{ fontSize: 24, fontWeight: 600 }}
            />
            <div style={{ marginTop: 8, fontSize: 14, color: kpiData.profit.trend === 'down' ? '#ff4d4f' : '#52c41a' }}>
              {kpiData.profit.trend === 'down' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
              {' '}
              {Math.abs(kpiData.profit.change).toFixed(2)}%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Tổng chi phí (Income)"
              value={kpiData.totalCost.value}
              suffix={kpiData.totalCost.unit}
              valueStyle={{ fontSize: 24, fontWeight: 600 }}
            />
            <div style={{ marginTop: 8, fontSize: 14, color: kpiData.totalCost.trend === 'down' ? '#ff4d4f' : '#52c41a' }}>
              {kpiData.totalCost.trend === 'down' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
              {' '}
              {Math.abs(kpiData.totalCost.change).toFixed(2)}%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Card>
            <Statistic
              title="Tỷ lệ chi phí trên doanh thu"
              value={kpiData.costToRevenueRatio.value}
              suffix={kpiData.costToRevenueRatio.unit}
              valueStyle={{ fontSize: 24, fontWeight: 600 }}
            />
            <div style={{ marginTop: 8, fontSize: 14, color: kpiData.costToRevenueRatio.trend === 'down' ? '#ff4d4f' : '#52c41a' }}>
              {kpiData.costToRevenueRatio.trend === 'down' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
              {' '}
              {Math.abs(kpiData.costToRevenueRatio.change).toFixed(2)}%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Card>
            <Statistic
              title="Tỷ lệ lợi nhuận trên doanh thu"
              value={kpiData.profitToRevenueRatio.value}
              suffix={kpiData.profitToRevenueRatio.unit}
              valueStyle={{ fontSize: 24, fontWeight: 600 }}
            />
            <div style={{ marginTop: 8, fontSize: 14, color: kpiData.profitToRevenueRatio.trend === 'up' ? '#52c41a' : '#ff4d4f' }}>
              {kpiData.profitToRevenueRatio.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              {' '}
              {Math.abs(kpiData.profitToRevenueRatio.change).toFixed(2)}%
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]}>
        {/* Revenue and Profit Trend */}
        <Col xs={24} lg={12}>
          <Card title="Xu hướng Doanh thu và Lợi nhuận">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}B`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Doanh thu (NMV)" stroke="#1890ff" fill="#1890ff" />
                <Line type="monotone" dataKey="profit" name="Lợi nhuận" stroke="#52c41a" fill="#52c41a" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Revenue Structure and Total Cost by Channel (Donut Chart) */}
        <Col xs={24} lg={12}>
          <Card title="Cơ cấu Doanh thu (Vòng tròn trong) và Tổng chi phí (Vòng tròn ngoài) theo Kênh">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[{ name: 'TikTok', value: 100 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#1890ff"
                  dataKey="value"
                >
                  <Cell key="tiktok" fill="#1890ff" />
                </Pie>
                <Pie
                  data={[{ name: 'TikTok', value: 100 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={100}
                  fill="#1890ff"
                  dataKey="value"
                >
                  <Cell key="tiktok-outer" fill="#1890ff" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Text strong>TikTok</Text>
            </div>
          </Card>
        </Col>

        {/* Channel Performance (Bubble Chart) */}
        <Col xs={24} lg={12}>
          <Card title="Hiệu quả của các Kênh theo Doanh thu, Tăng trưởng cùng kỳ và Tỷ lệ Tổng chi phí trên Doanh thu">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="costToRevenue"
                  name="Tỷ lệ Chi phí/Doanh thu"
                  domain={[0, 0.2]}
                  label={{ value: 'Tỷ lệ Chi phí/Doanh thu', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  type="number"
                  dataKey="growthRate"
                  name="Tăng trưởng"
                  domain={[-1.0, 0.0]}
                  label={{ value: 'Tăng trưởng', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div style={{ background: '#fff', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <p style={{ margin: 0 }}><strong>{data.channel}</strong></p>
                        <p style={{ margin: 0 }}>Tỷ lệ Chi phí/Doanh thu: {(data.costToRevenue * 100).toFixed(1)}%</p>
                        <p style={{ margin: 0 }}>Tăng trưởng: {(data.growthRate * 100).toFixed(1)}%</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Scatter name="Kênh" data={channelPerformanceData} fill="#1890ff">
                  {channelPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#1890ff" />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <Text strong>TikTok</Text>
            </div>
          </Card>
        </Col>

        {/* Cost and Profit Analysis */}
        <Col xs={24} lg={12}>
          <Card title="Phân tích Chi phí và Lợi nhuận">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => `${value}M`} />
                <Legend />
                <Bar dataKey="value" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Cost Ratio Trend */}
        <Col xs={24} lg={12}>
          <Card title="Xu hướng Tỷ lệ các chi phí trên Doanh thu">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costRatioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 0.2]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="productionCostRatio" stackId="a" fill="#1890ff" name="% Chi phí sàn" />
                <Bar dataKey="marketingCostRatio" stackId="a" fill="#52c41a" name="% Chi phí MKT" />
                <Bar dataKey="operatingCostRatio" stackId="a" fill="#faad14" name="% Chi phí vận hành" />
                <Bar dataKey="voucherCostRatio" stackId="a" fill="#f5222d" name="% Chi phí voucher" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Channel Cost Structure */}
        <Col xs={24} lg={12}>
          <Card title="Phân tích Cơ cấu Chi phí theo Kênh">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelCostData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}M`} />
                <Legend />
                <Bar dataKey="productionCost" stackId="a" fill="#1890ff" name="Chi phí sàn" />
                <Bar dataKey="marketingCost" stackId="a" fill="#52c41a" name="Chi phí MKT" />
                <Bar dataKey="operatingCost" stackId="a" fill="#faad14" name="Chi phí vận hành" />
                <Bar dataKey="voucherCost" stackId="a" fill="#f5222d" name="Chi phí voucher" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default IncomeDashboard;
