import { useState, useEffect } from 'react';
import {
  Layout, Menu, Card, Statistic, Progress, Tabs, Segmented, Timeline, Tag, 
  Drawer, Modal, Popover, Tooltip, Button, List, Collapse, DatePicker, 
  Badge, Avatar, Dropdown, Row, Col, Empty, Input, Form, Select, Space,
  Radio, message, Switch, Divider, Alert, Checkbox, Typography
} from 'antd';
import {
  HomeOutlined, BarChartOutlined, ShoppingOutlined, InboxOutlined, 
  CarOutlined, BellOutlined, SettingOutlined, UserOutlined, MenuFoldOutlined, 
  MenuUnfoldOutlined, PlusOutlined, EditOutlined, DeleteOutlined, 
  CommentOutlined, BulbOutlined, LineChartOutlined, ShareAltOutlined,
  DownloadOutlined, ArrowUpOutlined, ArrowDownOutlined, CloseOutlined,
  DragOutlined, SaveOutlined, AppstoreAddOutlined, EyeOutlined,
  RiseOutlined, FallOutlined, WarningOutlined, CheckCircleOutlined,
  SyncOutlined, StarOutlined, StarFilled, SearchOutlined, CalendarOutlined,
  TagsOutlined, InfoCircleOutlined, ThunderboltOutlined, ClockCircleOutlined,
  ExclamationCircleOutlined, FireOutlined, BookOutlined,
  RightOutlined, ShopOutlined
} from '@ant-design/icons';
import { Line, Column, Pie, Area } from '@ant-design/charts';
import dayjs from 'dayjs';
import logoSvg from './assets/logo-dark.svg';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

// ========== MOCK DATA ==========
const kpiOverview = {
  col1: [
    { 
      title: 'GMV ngày hôm qua', 
      value: '₫2.4B', 
      change: '+12.5%', 
      trend: 'up',
      subtext: 'vs hôm trước'
    },
    { 
      title: 'AOV', 
      value: '₫1,925', 
      change: '+3.8%', 
      trend: 'up',
      subtext: 'vs hôm trước'
    }
  ],
  col2: [
    { 
      title: 'Số đơn ngày hôm qua', 
      value: '1,247', 
      change: '+8.2%', 
      trend: 'up',
      subtext: 'vs hôm trước'
    },
    { 
      title: 'ROAS tổng ngày hôm qua', 
      value: '4.2x', 
      change: '-5.1%', 
      trend: 'down',
      subtext: 'vs hôm trước'
    }
  ],
  col3: [
    {
      title: 'GMV theo kênh',
      breakdown: [
        { label: 'Shopee', value: '₫1.2B' },
        { label: 'TikTok', value: '₫800M' },
        { label: 'Website', value: '₫400M' }
      ]
    },
    { 
      title: 'Chi phí Ads hôm qua', 
      value: '₫571M', 
      change: '+15.3%', 
      trend: 'up',
      subtext: 'vs hôm trước'
    }
  ]
};

const progressGoals = [
  { title: 'GMV tháng hiện tại vs mục tiêu', current: '₫45.2B', target: '₫50B', percent: 90.4, status: 'Hoàn thành' },
  { title: 'Số đơn tháng hiện tại vs mục tiêu', current: '23,450', target: '25,000', percent: 93.8, status: 'Hoàn thành' },
  { title: 'Ngân sách Ads đã dùng vs mục tiêu', current: '₫12.5B', target: '₫15B', percent: 83.3, status: 'Đã dùng' }
];

const alertsData = {
  errors: [
    { id: 1, title: 'SKU quá trọng sắp hết', count: 5, severity: 'high', metric: 'Đơn hàng' },
    { id: 2, title: 'Đơn bị lỗi', count: 8, severity: 'high', metric: 'Đơn hàng' },
    { id: 3, title: 'Tỷ lệ hủy tăng', count: 12.5, unit: '%', severity: 'high', metric: 'Sản phẩm' },
    { id: 4, title: 'CR hiện tại', count: 2.5, unit: '%', severity: 'high', metric: 'Sản phẩm' },
    { id: 5, title: 'SKU vượt phạm vi', count: 3, severity: 'high', metric: 'Tồn kho' }
  ],
  warnings: [
    { id: 6, title: 'SKU sắp hết hàng', count: 14, severity: 'medium', metric: 'Đơn hàng', desc: 'Sắp vượt' },
    { id: 7, title: 'Traffic giảm', count: 8, severity: 'medium', metric: 'Sản phẩm', desc: 'vs hôm trước' },
    { id: 8, title: 'Chi phí tăng', count: 15.3, unit: '%', severity: 'medium', metric: 'Tồn kho', desc: 'vs hôm trước' }
  ]
};

const recentActivity = [
  { time: '2 phút trước', title: 'Đơn hàng #ORD-12345 đã được giao', type: 'success' },
  { time: '16 phút trước', title: 'Cảnh báo: SKU-001 sắp hết hàng', type: 'warning' },
  { time: '1 giờ trước', title: 'Đơn hàng #ORD-12340 đã được giao', type: 'success' }
];

const upcomingEvents = [
  { 
    id: 1,
    type: 'event',
    tag: 'Sự kiện',
    title: 'Đảng kỷ niệm TikTok 2 năm',
    date: '12/11/2025',
    tagColor: 'blue'
  },
  { 
    id: 2,
    type: 'feature',
    tag: 'Tính năng',
    title: 'Ra mắt Automation Hub',
    date: '20/11/2025',
    tagColor: 'green'
  },
  { 
    id: 3,
    type: 'promo',
    tag: 'Khuyến mãi',
    title: 'Flash Sale cuối tuần',
    date: '25/11/2025',
    tagColor: 'orange'
  }
];

const blogPosts = [
  {
    id: 1,
    title: 'Case study: Tăng ROAS 32% với livestream',
    date: '3 ngày trước',
    category: 'Case Study'
  },
  {
    id: 2,
    title: 'Checklist chuẩn bị Flash Sale 12.12',
    date: '1 tuần trước',
    category: 'Hướng dẫn'
  },
  {
    id: 3,
    title: 'Ebook tối ưu phí lưu kho cho D2C',
    date: '2 tuần trước',
    category: 'Tài liệu'
  }
];

// Revenue trend data for 30 days
const revenueTrendData = [
  { date: '01/11', revenue: 85 },
  { date: '02/11', revenue: 92 },
  { date: '03/11', revenue: 78 },
  { date: '04/11', revenue: 95 },
  { date: '05/11', revenue: 110 },
  { date: '06/11', revenue: 102 },
  { date: '07/11', revenue: 88 },
  { date: '08/11', revenue: 115 },
  { date: '09/11', revenue: 125 },
  { date: '10/11', revenue: 118 },
  { date: '11/11', revenue: 240 }, // Flash Sale spike
  { date: '12/11', revenue: 135 },
  { date: '13/11', revenue: 122 },
  { date: '14/11', revenue: 108 },
  { date: '15/11', revenue: 98 },
  { date: '16/11', revenue: 105 },
  { date: '17/11', revenue: 112 },
  { date: '18/11', revenue: 120 },
  { date: '19/11', revenue: 115 },
  { date: '20/11', revenue: 128 },
  { date: '21/11', revenue: 135 },
  { date: '22/11', revenue: 142 },
  { date: '23/11', revenue: 138 },
  { date: '24/11', revenue: 145 },
  { date: '25/11', revenue: 152 },
  { date: '26/11', revenue: 148 },
  { date: '27/11', revenue: 155 },
  { date: '28/11', revenue: 162 },
  { date: '29/11', revenue: 158 },
  { date: '30/11', revenue: 170 }
];

const activityLog = [
  { time: '26/11/2025 10:21', user: 'UpS Bot', action: 'Tự động đồng đồng bộ ticket pending' },
  { time: '25/11/2025 08:58', user: 'Admin', action: 'Cập nhật nhãn sách giá cho Q4' },
  { time: '20/11/2025 21:34', user: 'System', action: 'Tạo mới dashboard "Flash Sale Pulse"' },
  { time: '19/11/2025 18:07', user: 'User', action: 'Lan Nguyen cập nhật quyền Inventory Analyst' }
];

// ========== COMPONENTS ==========

// KPI Overview Card
const KPICard = ({ title, value, change, trend, subtext, breakdown }) => (
  <Card 
    size="small" 
    style={{ 
      height: '100%', 
      borderRadius: 12,
      background: '#F7F7F7',
      border: '1px solid #E1E3E5',
      boxShadow: 'none'
    }}
    bodyStyle={{ padding: '16px' }}
  >
    {breakdown ? (
      <div>
        <div style={{ fontSize: 12, color: '#6D7175', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{title}</div>
        {breakdown.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 13, color: '#2b2b2b' }}>{item.label}:</Text>
            <Text strong style={{ fontSize: 13, color: '#2b2b2b' }}>{item.value}</Text>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <div style={{ fontSize: 12, color: '#6D7175', marginBottom: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          <Text style={{ fontSize: 24, fontWeight: 700, color: '#2b2b2b' }}>{value}</Text>
          {change && (
            <Text style={{ 
              fontSize: 13, 
              color: trend === 'up' ? '#008060' : '#D72C0D',
              fontWeight: 600
            }}>
              {trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {change}
            </Text>
          )}
        </div>
        {subtext && <Text style={{ fontSize: 11, color: '#6D7175' }}>{subtext}</Text>}
      </div>
    )}
  </Card>
);

// Alert Item Component - Shopify Style with AI touch
const AlertItem = ({ title, count, unit, severity, metric, desc }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 16px',
    borderRadius: 12,
    background: '#F7F7F7',
    border: '1px solid #E1E3E5',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    height: '100%',
    minHeight: '140px',
    position: 'relative',
    overflow: 'hidden'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = '#2b2b2b';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(43, 43, 43, 0.12), 0 0 20px rgba(43, 43, 43, 0.04)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = '#E1E3E5';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
  >
    <Text style={{ 
      fontSize: 12, 
      color: '#6D7175', 
      marginBottom: 12, 
      textAlign: 'center',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.3px'
    }}>
      {metric}
    </Text>
    <div style={{ 
      fontSize: 36, 
      fontWeight: 700, 
      color: '#2b2b2b',
      lineHeight: 1,
      marginBottom: 12,
      position: 'relative',
      zIndex: 1
    }}>
      {count}{unit || ''}
    </div>
    <Text style={{ 
      fontSize: 13, 
      textAlign: 'center', 
      fontWeight: 500,
      color: '#2b2b2b',
      marginBottom: desc ? 6 : 0,
      lineHeight: 1.5
    }}>
      {title}
    </Text>
    {desc && (
      <Text style={{ 
        fontSize: 11, 
        color: '#6D7175',
        textAlign: 'center',
        marginTop: 4
      }}>
        {desc}
      </Text>
    )}
  </div>
);

// Main Layout Component
const HomepageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewpoint, setViewpoint] = useState('Growth');
  const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'day'), dayjs()]);
  const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
  const [annotationDrawerVisible, setAnnotationDrawerVisible] = useState(false);
  const [insightsDrawerVisible, setInsightsDrawerVisible] = useState(false);
  const [annotations, setAnnotations] = useState([
    { id: 1, date: '2025-11-20', title: 'Flash Sale 11.11', description: 'GMV tăng đột biến do chạy flash sale', tags: ['marketing', 'sale'] },
    { id: 2, date: '2025-11-15', title: 'Thay đổi chiến lược ads', description: 'Chuyển từ CPM sang CPC', tags: ['ads'] },
    { id: 3, date: '2025-11-10', title: 'Ra mắt sản phẩm mới', description: 'SKU-NEW-001 đến SKU-NEW-010', tags: ['product'] }
  ]);
  const [newAnnotation, setNewAnnotation] = useState({ date: '', title: '', description: '', tags: '' });
  
  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Trang chủ' },
    { key: 'analytics', icon: <BarChartOutlined />, label: 'Phân tích' },
    { key: 'orders', icon: <ShoppingOutlined />, label: 'Đơn hàng' },
    { key: 'inventory', icon: <InboxOutlined />, label: 'Kho hàng' },
    { key: 'shipping', icon: <CarOutlined />, label: 'Vận chuyển' }
  ];
  
  const userMenu = (
    <Menu
      items={[
        { key: 'profile', label: 'Hồ sơ', icon: <UserOutlined /> },
        { key: 'settings', label: 'Cài đặt', icon: <SettingOutlined /> },
        { type: 'divider' },
        { key: 'logout', label: 'Đăng xuất' }
      ]}
    />
  );
  
  const notificationMenu = (
    <Menu
      items={[
        { key: '1', label: 'SKU-045 sắp hết hàng', icon: <WarningOutlined /> },
        { key: '2', label: 'Đơn hàng #12457 đã giao', icon: <CheckCircleOutlined /> },
        { key: '3', label: 'Tỷ lệ hủy đơn tăng cao', icon: <WarningOutlined /> }
      ]}
    />
  );
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />
          <img src={logoSvg} alt="UpS Logo" style={{ height: 36 }} />
          <div style={{ fontSize: 13, color: '#8c8c8c', marginLeft: 16 }}>
            Bảng điều khiển <span style={{ margin: '0 6px' }}>›</span> Trang chủ
          </div>
        </div>
        
        <Space size="middle">
          <Dropdown overlay={notificationMenu} trigger={['click']}>
            <Badge count={3} size="small">
              <Button type="text" icon={<BellOutlined style={{ fontSize: 18 }} />} />
            </Badge>
          </Dropdown>
          <Button type="text" icon={<SettingOutlined style={{ fontSize: 18 }} />} />
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar style={{ backgroundColor: '#1890ff' }} size="small">
                D
              </Avatar>
              <span style={{ fontWeight: 500 }}>Dat Vu</span>
            </div>
          </Dropdown>
        </Space>
      </Header>
      
      <Layout>
        {/* Sidebar */}
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}
          width={200}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            items={menuItems}
            style={{ borderRight: 0, marginTop: 8 }}
          />
        </Sider>
        
        {/* Main Content Area */}
        <Layout style={{ background: '#FAFBFB' }}>
          <Content style={{ padding: '24px' }}>
            {/* Page Header */}
            <div style={{ marginBottom: 20 }}>
              <Title level={2} style={{ marginBottom: 8, color: '#2b2b2b', fontWeight: 700 }}>Trang chủ</Title>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Segmented
                  options={[
                    { label: 'Growth', value: 'Growth', icon: <RiseOutlined /> },
                    { label: 'Account/Ops', value: 'Account/Ops', icon: <SettingOutlined /> },
                    { label: 'Management', value: 'Management', icon: <UserOutlined /> }
                  ]}
                  value={viewpoint}
                  onChange={setViewpoint}
                />
                
                <Space size="small">
                  <Tooltip title="Ghi chú & Annotation">
                    <Button 
                      icon={<CommentOutlined />}
                      onClick={() => setAnnotationDrawerVisible(true)}
                      style={{
                        borderRadius: 8,
                        fontWeight: 500
                      }}
                    >
                      Annotation
                    </Button>
                  </Tooltip>
                  <Tooltip title="Insights & Gợi ý phân tích">
                    <Button 
                      icon={<BulbOutlined />}
                      onClick={() => setInsightsDrawerVisible(true)}
                      style={{
                        borderRadius: 8,
                        fontWeight: 500,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span style={{ 
                        background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        AI Insights
                      </span>
                    </Button>
                  </Tooltip>
                </Space>
              </div>
            </div>
            
            <Row gutter={24}>
              {/* Left Main Column */}
              <Col xs={24} lg={17}>
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
                  {/* Báo cáo kết quả - Customizable */}
                  <Card 
                    title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Báo cáo kết quả</Text>}
                    extra={
                      <Button 
                        size="small" 
                        icon={<EditOutlined />}
                        onClick={() => setCustomizeModalVisible(true)}
                      >
                        Tùy chỉnh
                      </Button>
                    }
                    style={{ 
                      background: '#fff',
                      border: '1px solid #E1E3E5',
                      borderRadius: 16,
                      boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                    }}
                  >
                    <Row gutter={[12, 12]}>
                      <Col span={8}>
                        <Space direction="vertical" size={12} style={{ width: '100%' }}>
                          {kpiOverview.col1.map((kpi, idx) => (
                            <KPICard key={idx} {...kpi} />
                          ))}
                        </Space>
                      </Col>
                      <Col span={8}>
                        <Space direction="vertical" size={12} style={{ width: '100%' }}>
                          {kpiOverview.col2.map((kpi, idx) => (
                            <KPICard key={idx} {...kpi} />
                          ))}
                        </Space>
                      </Col>
                      <Col span={8}>
                        <Space direction="vertical" size={12} style={{ width: '100%' }}>
                          {kpiOverview.col3.map((kpi, idx) => (
                            <KPICard key={idx} {...kpi} />
                          ))}
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                  
                  {/* Báo cáo tiến độ - Customizable */}
                  <Card 
                    title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Báo cáo tiến độ</Text>}
                    extra={
                      <Button size="small" type="text" icon={<EditOutlined />}>
                        Tùy chỉnh
                      </Button>
                    }
                    style={{ 
                      background: '#fff',
                      border: '1px solid #E1E3E5',
                      borderRadius: 16,
                      boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                    }}
                  >
                    <Row gutter={[16, 16]}>
                      {progressGoals.map((goal, idx) => (
                        <Col xs={24} md={8} key={idx}>
                          <div>
                            <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 6 }}>
                              {goal.title}
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
                              {goal.current} / {goal.target}
                            </div>
                            <Progress 
                              percent={goal.percent} 
                              strokeColor="#2684FF"
                              strokeWidth={12}
                              format={() => `${goal.percent}% ${goal.status}`}
                            />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                  
                  {/* Alert & Risks - Customizable với 2 sections */}
                  <Card 
                    title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Alert & Risks</Text>}
                    extra={
                      <Space>
                        <Button size="small" type="text">Các mức ưu tiên khác</Button>
                        <Button size="small" type="text" icon={<EditOutlined />}>
                          Tùy chỉnh
                        </Button>
                      </Space>
                    }
                    style={{ 
                      background: '#fff',
                      border: '1px solid #E1E3E5',
                      borderRadius: 16,
                      boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                    }}
                  >
                    {/* Lỗi - Red Section - Minimal */}
                    <div style={{ marginBottom: 32 }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8,
                        marginBottom: 16,
                        paddingBottom: 12,
                        borderBottom: '1px solid #E1E3E5'
                      }}>
                        <ExclamationCircleOutlined style={{ fontSize: 16, color: '#D72C0D' }} />
                        <Text strong style={{ fontSize: 14, color: '#2b2b2b', letterSpacing: '0.2px' }}>
                          Lỗi
                        </Text>
                        <Tag 
                          color="error" 
                          style={{ 
                            marginLeft: 'auto',
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 600,
                            background: '#FEF3F2',
                            color: '#D72C0D',
                            border: '1px solid #FECDD6'
                          }}
                        >
                          {alertsData.errors.length}
                        </Tag>
                      </div>
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: 12
                      }}>
                        {alertsData.errors.map((alert) => (
                          <AlertItem key={alert.id} {...alert} />
                        ))}
                      </div>
                    </div>
                    
                    {/* Cảnh báo - Yellow Section - Minimal */}
                    <div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8,
                        marginBottom: 16,
                        paddingBottom: 12,
                        borderBottom: '1px solid #E1E3E5'
                      }}>
                        <WarningOutlined style={{ fontSize: 16, color: '#F49342' }} />
                        <Text strong style={{ fontSize: 14, color: '#2b2b2b', letterSpacing: '0.2px' }}>
                          Cảnh báo
                        </Text>
                        <Tag 
                          color="warning" 
                          style={{ 
                            marginLeft: 'auto',
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 600,
                            background: '#FFF8F1',
                            color: '#F49342',
                            border: '1px solid #FFE8D7'
                          }}
                        >
                          {alertsData.warnings.length}
                        </Tag>
                      </div>
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 12
                      }}>
                        {alertsData.warnings.map((alert) => (
                          <AlertItem key={alert.id} {...alert} />
                        ))}
                      </div>
                    </div>
                  </Card>
                  
                  {/* Xu hướng Doanh thu */}
                  <Card 
                    title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Xu hướng Doanh thu</Text>}
                    style={{ 
                      background: '#fff',
                      border: '1px solid #E1E3E5',
                      borderRadius: 16,
                      boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                    }}
                    extra={
                      <Radio.Group defaultValue={30} size="small">
                        <Radio.Button value={7}>7 ngày</Radio.Button>
                        <Radio.Button value={30}>30 ngày</Radio.Button>
                        <Radio.Button value={60}>60 ngày</Radio.Button>
                      </Radio.Group>
                    }
                  >
                    <Line
                      data={revenueTrendData}
                      xField="date"
                      yField="revenue"
                      height={300}
                      smooth={true}
                      color="#2b2b2b"
                      lineStyle={{
                        lineWidth: 2
                      }}
                      point={{
                        size: 4,
                        shape: 'circle',
                        style: {
                          fill: '#2b2b2b',
                          stroke: '#fff',
                          lineWidth: 2
                        }
                      }}
                      tooltip={{
                        formatter: (datum) => {
                          return { name: 'Doanh thu', value: `₫${datum.revenue}M` };
                        }
                      }}
                      yAxis={{
                        label: {
                          formatter: (v) => `₫${v}M`
                        },
                        grid: {
                          line: {
                            style: {
                              stroke: '#E1E3E5',
                              lineWidth: 1,
                              lineDash: [4, 4]
                            }
                          }
                        }
                      }}
                      xAxis={{
                        label: {
                          autoRotate: false,
                          style: {
                            fill: '#6D7175',
                            fontSize: 11
                          }
                        }
                      }}
                      areaStyle={{
                        fill: 'l(270) 0:#2b2b2b10 1:#2b2b2b00'
                      }}
                      annotations={[
                        {
                          type: 'text',
                          position: ['11/11', 240],
                          content: 'Flash Sale 11.11',
                          style: {
                            fill: '#2b2b2b',
                            fontSize: 11,
                            textAlign: 'center'
                          },
                          offsetY: -20
                        }
                      ]}
                    />
                  </Card>
                  
                  {/* Hoạt động gần đây */}
                  <Card 
                    title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Hoạt động gần đây</Text>}
                    style={{ 
                      background: '#fff',
                      border: '1px solid #E1E3E5',
                      borderRadius: 16,
                      boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                    }}
                    extra={<Button type="link" size="small">Xem tất cả →</Button>}
                  >
                    <Timeline
                      items={recentActivity.map(activity => ({
                        color: activity.type === 'success' ? 'green' : 'orange',
                        children: (
                          <div>
                            <Text style={{ fontSize: 13 }}>{activity.title}</Text>
                            <br />
                            <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{activity.time}</Text>
                          </div>
                        )
                      }))}
                    />
                  </Card>
                </Space>
              </Col>
              
              {/* Right Sidebar */}
              <Col xs={24} lg={7}>
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  {/* UpS Update / Có thể bạn quan tâm */}
                  <Card 
                    title={<Text strong style={{ fontSize: 14, color: '#2b2b2b' }}>UpS Update</Text>}
                    size="small"
                    extra={<Button type="link" size="small">Xem tất cả</Button>}
                    style={{ 
                      background: '#fff',
                      border: '1px solid #E1E3E5',
                      borderRadius: 12,
                      boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                    }}
                  >
                    <List
                      size="small"
                      dataSource={upcomingEvents}
                      renderItem={(item) => (
                        <List.Item style={{ padding: '8px 0' }}>
                          <List.Item.Meta
                            avatar={<Tag color={item.tagColor}>{item.tag}</Tag>}
                            title={<Text style={{ fontSize: 13 }}>{item.title}</Text>}
                            description={<Text style={{ fontSize: 11, color: '#8c8c8c' }}>{item.date}</Text>}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                  
                  {/* Có thể bạn quan tâm - Blog posts */}
                  <Card 
                    title={<Text strong style={{ fontSize: 14, color: '#2b2b2b' }}>Có thể bạn quan tâm</Text>}
                    size="small"
                    extra={<Button type="link" size="small">Tất cả</Button>}
                    style={{ 
                      background: '#fff',
                      border: '1px solid #E1E3E5',
                      borderRadius: 12,
                      boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                    }}
                  >
                    <List
                      size="small"
                      dataSource={blogPosts}
                      renderItem={(item) => (
                        <List.Item 
                          style={{ padding: '8px 0', cursor: 'pointer' }}
                          onClick={() => message.info('Đang mở bài viết...')}
                        >
                          <List.Item.Meta
                            avatar={<BookOutlined style={{ fontSize: 18, color: '#1890ff' }} />}
                            title={<Text style={{ fontSize: 13 }}>{item.title}</Text>}
                            description={
                              <Space>
                                <Tag style={{ fontSize: 10, padding: '0 4px' }}>{item.category}</Tag>
                                <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{item.date}</Text>
                              </Space>
                            }
                          />
                          <RightOutlined style={{ fontSize: 12, color: '#8c8c8c' }} />
                        </List.Item>
                      )}
                    />
                  </Card>
                  
                  {/* Nhật ký hoạt động */}
                  <Card 
                    title={<Text strong style={{ fontSize: 14, color: '#2b2b2b' }}>Nhật ký hoạt động</Text>}
                    size="small"
                    extra={<Button type="link" size="small">Xuất log</Button>}
                    style={{ 
                      background: '#fff',
                      border: '1px solid #E1E3E5',
                      borderRadius: 12,
                      boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                    }}
                  >
                    <List
                      size="small"
                      dataSource={activityLog}
                      renderItem={(item) => (
                        <List.Item style={{ padding: '8px 0', borderBottom: '1px dashed #f0f0f0' }}>
                          <List.Item.Meta
                            avatar={<ClockCircleOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />}
                            title={<Text style={{ fontSize: 12 }}>{item.action}</Text>}
                            description={
                              <div>
                                <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{item.user}</Text>
                                <br />
                                <Text style={{ fontSize: 10, color: '#bfbfbf' }}>{item.time}</Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Space>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
      
      {/* Customization Modal */}
      <Modal
        title="Tùy chỉnh các chỉ số"
        open={customizeModalVisible}
        onCancel={() => setCustomizeModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setCustomizeModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={() => {
            message.success('Đã lưu cấu hình!');
            setCustomizeModalVisible(false);
          }}>
            Lưu thay đổi
          </Button>
        ]}
        width={700}
      >
        <Alert
          message="Chỉ có thể tùy chỉnh 3 sections sau"
          description="Báo cáo kết quả, Báo cáo tiến độ, và Alert & Risks"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Card size="small">
            <Checkbox defaultChecked>Báo cáo kết quả (6 metrics)</Checkbox>
          </Card>
          <Card size="small">
            <Checkbox defaultChecked>Báo cáo tiến độ (3 progress bars)</Checkbox>
          </Card>
          <Card size="small">
            <Checkbox defaultChecked>Alert & Risks - Lỗi (5 alerts)</Checkbox>
          </Card>
          <Card size="small">
            <Checkbox defaultChecked>Alert & Risks - Cảnh báo (3 warnings)</Checkbox>
          </Card>
        </Space>
      </Modal>
      
      {/* Annotation Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Space>
              <CommentOutlined />
              <span>Ghi chú & Annotation</span>
            </Space>
            <Button 
              type="primary" 
              size="small"
              icon={<PlusOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: 'Tạo Annotation mới',
                  width: 600,
                  content: (
                    <Form layout="vertical" style={{ marginTop: 16 }}>
                      <Form.Item label="Ngày">
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item label="Tiêu đề">
                        <Input placeholder="Ví dụ: Flash Sale 11.11" />
                      </Form.Item>
                      <Form.Item label="Mô tả">
                        <TextArea rows={3} placeholder="Mô tả chi tiết về sự kiện..." />
                      </Form.Item>
                      <Form.Item label="Tags">
                        <Select mode="tags" placeholder="marketing, sale, product...">
                          <Select.Option value="marketing">Marketing</Select.Option>
                          <Select.Option value="sale">Sale</Select.Option>
                          <Select.Option value="product">Product</Select.Option>
                          <Select.Option value="ads">Ads</Select.Option>
                        </Select>
                      </Form.Item>
                    </Form>
                  ),
                  onOk: () => {
                    message.success('Đã tạo annotation mới!');
                  }
                });
              }}
            >
              Tạo mới
            </Button>
          </div>
        }
        placement="right"
        width={480}
        open={annotationDrawerVisible}
        onClose={() => setAnnotationDrawerVisible(false)}
      >
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Ghi chú các sự kiện quan trọng để theo dõi ảnh hưởng đến metrics
          </Text>
        </div>
        
        {annotations.length === 0 ? (
          <Empty 
            description="Chưa có annotation nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ marginTop: 60 }}
          >
            <Button type="primary" icon={<PlusOutlined />}>
              Tạo annotation đầu tiên
            </Button>
          </Empty>
        ) : (
          <Timeline
            items={annotations.map(ann => ({
              dot: <CalendarOutlined style={{ fontSize: 16 }} />,
              children: (
                <Card 
                  size="small" 
                  style={{ marginBottom: 12 }}
                  hoverable
                  actions={[
                    <Tooltip title="Chỉnh sửa" key="edit">
                      <EditOutlined />
                    </Tooltip>,
                    <Tooltip title="Xóa" key="delete">
                      <DeleteOutlined />
                    </Tooltip>
                  ]}
                >
                  <div style={{ marginBottom: 8 }}>
                    <Tag color="blue" icon={<CalendarOutlined />}>
                      {dayjs(ann.date).format('DD/MM/YYYY')}
                    </Tag>
                  </div>
                  <Title level={5} style={{ marginBottom: 8, marginTop: 0 }}>
                    {ann.title}
                  </Title>
                  <Paragraph 
                    type="secondary" 
                    style={{ fontSize: 13, marginBottom: 8 }}
                    ellipsis={{ rows: 2, expandable: true }}
                  >
                    {ann.description}
                  </Paragraph>
                  <div>
                    {ann.tags.map(tag => (
                      <Tag key={tag} style={{ marginRight: 4 }}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </Card>
              )
            }))}
          />
        )}
      </Drawer>
      
      {/* Insights Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BulbOutlined style={{ color: '#faad14' }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Insights & Gợi ý phân tích</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: '#8c8c8c' }}>
                Ask Analytics Intelligence
              </div>
            </div>
          </div>
        }
        placement="right"
        width={520}
        open={insightsDrawerVisible}
        onClose={() => setInsightsDrawerVisible(false)}
      >
        <div style={{ marginBottom: 24 }}>
          <Input.Search
            placeholder="Hỏi về dữ liệu của bạn..."
            size="large"
            prefix={<SearchOutlined />}
            onSearch={(value) => message.info(`Đang tìm kiếm: ${value}`)}
          />
        </div>
        
        {/* Contextual Insights */}
        <Card 
          size="small" 
          style={{ marginBottom: 16, borderLeft: '3px solid #1890ff', background: '#f0f5ff' }}
        >
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ThunderboltOutlined style={{ color: '#1890ff', fontSize: 18 }} />
              <Text strong style={{ color: '#1890ff' }}>Insight nổi bật</Text>
            </div>
            <Title level={5} style={{ margin: '8px 0' }}>
              GMV tăng 12.5% so với hôm trước
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 8 }}>
              Doanh thu từ TikTok Shop tăng mạnh nhờ chiến dịch livestream, đóng góp 
              <Text strong style={{ color: '#52c41a' }}> +₫300M </Text> 
              vào tổng GMV ngày hôm qua.
            </Paragraph>
            <Button type="link" size="small" style={{ padding: 0 }}>
              Xem chi tiết →
            </Button>
          </Space>
        </Card>
        
        <Divider orientation="left" style={{ fontSize: 13 }}>
          <Text type="secondary">Gợi ý câu hỏi</Text>
        </Divider>
        
        <Collapse
          defaultActiveKey={['1']}
          ghost
          items={[
            {
              key: '1',
              label: <Text strong>📊 Hiệu suất cơ bản</Text>,
              children: (
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → Kênh nào đang tăng trưởng nhanh nhất?
                  </Button>
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → Tại sao ROAS giảm 5.1%?
                  </Button>
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → SKU nào bán chạy nhất tuần này?
                  </Button>
                </Space>
              )
            },
            {
              key: '2',
              label: <Text strong>🎯 Traffic & Acquisition</Text>,
              children: (
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → Nguồn traffic nào hiệu quả nhất?
                  </Button>
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → Chi phí Ads tăng 15.3%, conversion có cải thiện?
                  </Button>
                </Space>
              )
            },
            {
              key: '3',
              label: <Text strong>🛒 Ecommerce Performance</Text>,
              children: (
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → Tỷ lệ hủy đơn cao ở kênh nào?
                  </Button>
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → AOV tăng 3.8%, do SKU nào đóng góp?
                  </Button>
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → So sánh hiệu suất Shopee vs TikTok
                  </Button>
                </Space>
              )
            },
            {
              key: '4',
              label: <Text strong>👥 Customer Behavior</Text>,
              children: (
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → Khách hàng mới vs khách quay lại?
                  </Button>
                  <Button type="text" style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}>
                    → Retention rate cải thiện thế nào?
                  </Button>
                </Space>
              )
            }
          ]}
        />
        
        <Divider />
        
        <Alert
          message="💡 Tips"
          description="Insights tự động cập nhật dựa trên date range và segments bạn chọn. Đánh dấu insights đã đọc để ẩn khỏi danh sách."
          type="info"
          showIcon
          closable
        />
      </Drawer>
    </Layout>
  );
};

export default HomepageLayout;

