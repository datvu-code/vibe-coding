import { useState, useEffect } from 'react';
import {
  Layout, Menu, Card, Statistic, Progress, Tabs, Segmented, Timeline, Tag, 
  Drawer, Modal, Popover, Tooltip, Button, List, Collapse, DatePicker, 
  Badge, Avatar, Dropdown, Row, Col, Empty, Input, Form, Select, Space,
  Radio, message, Switch
} from 'antd';
import {
  HomeOutlined, BarChartOutlined, ShoppingOutlined, InboxOutlined, 
  CarOutlined, BellOutlined, SettingOutlined, UserOutlined, MenuFoldOutlined, 
  MenuUnfoldOutlined, PlusOutlined, EditOutlined, DeleteOutlined, 
  CommentOutlined, BulbOutlined, LineChartOutlined, ShareAltOutlined,
  DownloadOutlined, ArrowUpOutlined, ArrowDownOutlined, CloseOutlined,
  DragOutlined, SaveOutlined, AppstoreAddOutlined, EyeOutlined,
  RiseOutlined, FallOutlined, WarningOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import { Line, Column, Pie, Area } from '@ant-design/charts';
import dayjs from 'dayjs';
import logoSvg from './assets/logo-dark.svg';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// ========== MOCK DATA ==========
const generateMockData = (days = 7) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    data.push({
      date: dayjs().subtract(days - i - 1, 'day').format('DD/MM'),
      GMV: Math.floor(2000000000 + Math.random() * 500000000),
      orders: Math.floor(1000 + Math.random() * 500),
      AOV: Math.floor(1800000 + Math.random() * 200000),
      ROAS: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      adCost: Math.floor(400000000 + Math.random() * 200000000),
      CR: parseFloat((2 + Math.random() * 2).toFixed(2))
    });
  }
  return data;
};

const channelData = [
  { channel: 'Shopee', GMV: '₫1.2B', orders: 645, health: 'good', growth: '+15.2%' },
  { channel: 'TikTok Shop', GMV: '₫800M', orders: 412, health: 'good', growth: '+22.5%' },
  { channel: 'Lazada', GMV: '₫280M', orders: 132, health: 'warning', growth: '-5.3%' },
  { channel: 'Website', GMV: '₫120M', orders: 58, health: 'good', growth: '+8.1%' }
];

const orderStatusData = [
  { status: 'Chờ xác nhận', count: 45, color: '#faad14' },
  { status: 'Đang chuẩn bị', count: 128, color: '#1890ff' },
  { status: 'Đang giao', count: 234, color: '#13c2c2' },
  { status: 'Đã giao', count: 856, color: '#52c41a' },
  { status: 'Đã hủy', count: 38, color: '#f5222d' },
  { status: 'Đã hoàn', count: 24, color: '#fa8c16' }
];

const inventoryWarnings = [
  { sku: 'SKU-045', name: 'Áo thun cổ tròn', stock: 12, threshold: 50, status: 'critical' },
  { sku: 'SKU-078', name: 'Quần jean slim fit', stock: 28, threshold: 50, status: 'warning' },
  { sku: 'SKU-123', name: 'Váy maxi hoa', stock: 35, threshold: 50, status: 'warning' },
  { sku: 'SKU-200', name: 'Giày sneaker trắng', stock: 8, threshold: 50, status: 'critical' }
];

const recentActivities = [
  { time: '10 phút trước', type: 'order', message: 'Đơn hàng #12457 đã được giao thành công', status: 'success' },
  { time: '25 phút trước', type: 'inventory', message: 'SKU-045 sắp hết hàng (còn 12 đơn vị)', status: 'warning' },
  { time: '1 giờ trước', type: 'campaign', message: 'Chiến dịch Flash Sale đã đạt 80% mục tiêu', status: 'info' },
  { time: '2 giờ trước', type: 'system', message: 'Đồng bộ tồn kho với Shopee thành công', status: 'success' },
  { time: '3 giờ trước', type: 'alert', message: 'Tỷ lệ hủy đơn tăng cao trên TikTok Shop', status: 'error' }
];

const insightCategories = [
  {
    key: 'performance',
    title: 'Basic Performance',
    questions: [
      'Kênh nào tạo ra GMV cao nhất?',
      'Xu hướng đơn hàng 7 ngày qua?',
      'AOV có thay đổi đáng kể không?',
      'Thời điểm nào có traffic cao nhất?'
    ]
  },
  {
    key: 'traffic',
    title: 'Traffic & Acquisition',
    questions: [
      'Nguồn traffic nào hiệu quả nhất?',
      'Tỷ lệ bounce rate có bất thường?',
      'Campaign nào mang lại ROAS cao nhất?',
      'Chi phí per order thay đổi như thế nào?'
    ]
  },
  {
    key: 'ecommerce',
    title: 'Ecommerce Performance',
    questions: [
      'Conversion rate có giảm không?',
      'Giỏ hàng bị bỏ ở bước nào?',
      'Sản phẩm nào bán chạy nhất?',
      'Có SKU nào cần điều chỉnh giá?'
    ]
  },
  {
    key: 'customer',
    title: 'Customer Behavior',
    questions: [
      'Khách hàng mới vs khách hàng cũ?',
      'Tỷ lệ khách hàng quay lại?',
      'Giá trị lifetime của khách hàng?',
      'Phân khúc khách hàng nào tiềm năng?'
    ]
  }
];

const mockInsights = [
  {
    id: 1,
    title: 'GMV tăng mạnh từ TikTok Shop',
    description: 'Kênh TikTok Shop tăng trưởng 22.5% so với tuần trước, chủ yếu từ các sản phẩm thời trang nữ.',
    value: '+22.5%',
    badge: 'new',
    category: 'performance'
  },
  {
    id: 2,
    title: 'Conversion Rate giảm trên Shopee',
    description: 'CR giảm từ 3.3% xuống 2.8% trong 7 ngày, có thể do giá cạnh tranh hoặc review sản phẩm.',
    value: '-15.2%',
    badge: 'alert',
    category: 'ecommerce'
  },
  {
    id: 3,
    title: 'ROAS của campaign "Flash Sale" đạt 6.2x',
    description: 'Campaign Flash Sale cuối tuần đạt ROAS cao nhất trong tháng, nên nhân rộng chiến lược này.',
    value: '6.2x',
    badge: 'opportunity',
    category: 'traffic'
  }
];

// ========== WIDGET LIBRARY ==========
const availableWidgets = [
  { id: 'kpi-summary', name: 'KPI Summary', category: 'core', defaultSize: 'L' },
  { id: 'progress-goals', name: 'Progress Toward Goals', category: 'core', defaultSize: 'M' },
  { id: 'alerts-risks', name: 'Alerts & Risks', category: 'core', defaultSize: 'L' },
  { id: 'trend-chart', name: 'Revenue/Orders Trend', category: 'charts', defaultSize: 'L' },
  { id: 'channel-performance', name: 'Performance by Channel', category: 'analytics', defaultSize: 'L' },
  { id: 'order-status', name: 'Order Status Overview', category: 'operations', defaultSize: 'M' },
  { id: 'inventory-warnings', name: 'Inventory Warnings', category: 'operations', defaultSize: 'M' },
  { id: 'recent-activity', name: 'Recent Activity Timeline', category: 'monitoring', defaultSize: 'M' }
];

const defaultPresets = {
  growth: ['kpi-summary', 'trend-chart', 'channel-performance', 'progress-goals'],
  ops: ['alerts-risks', 'order-status', 'inventory-warnings', 'recent-activity'],
  management: ['kpi-summary', 'channel-performance', 'progress-goals', 'trend-chart']
};

// ========== COMPONENTS ==========

// KPI Summary Widget (GA4-style Reports Snapshot)
const KPISummaryWidget = ({ onAnnotationClick, onInsightsClick }) => {
  const [selectedMetric, setSelectedMetric] = useState('GMV');
  const mockData = generateMockData(7);
  
  const metrics = [
    { key: 'GMV', label: 'GMV', value: '₫2.4B', delta: '+12.5%', trend: 'up' },
    { key: 'orders', label: 'Orders', value: '1,247', delta: '+8.2%', trend: 'up' },
    { key: 'AOV', label: 'AOV', value: '₫1,925k', delta: '+4.1%', trend: 'up' },
    { key: 'ROAS', label: 'ROAS', value: '4.2x', delta: '-5.1%', trend: 'down' },
    { key: 'adCost', label: 'Ad Cost', value: '₫580M', delta: '+15.3%', trend: 'up' }
  ];
  
  const chartData = mockData.map(d => ({
    date: d.date,
    value: selectedMetric === 'GMV' ? d.GMV / 1000000000 : 
           selectedMetric === 'orders' ? d.orders :
           selectedMetric === 'AOV' ? d.AOV / 1000000 :
           selectedMetric === 'ROAS' ? d.ROAS : d.adCost / 1000000000
  }));
  
  const config = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    smooth: true,
    color: '#1890ff',
    point: {
      size: 4,
      shape: 'circle'
    },
    tooltip: {
      showMarkers: true
    }
  };
  
  return (
    <Card 
      title={<span style={{ fontSize: 16, fontWeight: 600 }}>Báo cáo kết quả</span>}
      extra={
        <Space>
          <Tooltip title="Chart Type"><Button size="small" icon={<LineChartOutlined />} /></Tooltip>
          <Tooltip title="Share"><Button size="small" icon={<ShareAltOutlined />} /></Tooltip>
          <Tooltip title="Export"><Button size="small" icon={<DownloadOutlined />} /></Tooltip>
          <Tooltip title="Annotations"><Button size="small" icon={<CommentOutlined />} onClick={onAnnotationClick} /></Tooltip>
          <Tooltip title="Insights"><Button size="small" icon={<BulbOutlined />} onClick={onInsightsClick} /></Tooltip>
        </Space>
      }
    >
      <Tabs 
        items={metrics.map(m => ({
          key: m.key,
          label: (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>{m.label}</div>
              <div style={{ fontSize: 18, fontWeight: 600, margin: '4px 0' }}>{m.value}</div>
              <div style={{ fontSize: 12, color: m.trend === 'up' ? '#52c41a' : '#ff4d4f' }}>
                {m.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {m.delta}
              </div>
            </div>
          )
        }))}
        onChange={setSelectedMetric}
      />
      <div style={{ marginTop: 16, height: 250 }}>
        <Line {...config} />
      </div>
    </Card>
  );
};

// Progress Toward Goals Widget
const ProgressGoalsWidget = () => {
  const goals = [
    { name: 'GMV Monthly Target', current: 72, target: 100, unit: '₫72B / ₫100B', color: '#1890ff' },
    { name: 'Orders This Month', current: 85, target: 100, unit: '8,520 / 10,000', color: '#52c41a' },
    { name: 'Ad Budget Used', current: 68, target: 100, unit: '₫6.8B / ₫10B', color: '#faad14' }
  ];
  
  return (
    <Card title="Progress Toward Goals">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {goals.map((goal, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 500 }}>{goal.name}</span>
              <span style={{ color: '#8c8c8c' }}>{goal.unit}</span>
            </div>
            <Progress 
              percent={goal.current} 
              strokeColor={goal.color}
              status={goal.current >= 90 ? 'success' : 'active'}
            />
          </div>
        ))}
      </Space>
    </Card>
  );
};

// Alerts & Risks Widget
const AlertsRisksWidget = () => {
  const alerts = [
    { 
      title: 'SKU sắp hết hàng', 
      description: '14 SKU có tồn khả dụng < 50 đơn vị',
      severity: 'error',
      count: 14
    },
    { 
      title: 'Tỷ lệ hủy đơn tăng cao', 
      description: 'Tăng 2.3% so với hôm trước (từ 6.2% → 8.5%)',
      severity: 'warning',
      count: null
    },
    { 
      title: 'Traffic giảm mạnh', 
      description: 'Lượt truy cập giảm 14.7% so với hôm trước',
      severity: 'warning',
      count: null
    },
    { 
      title: 'Chi phí Ads tăng đột biến', 
      description: 'Tăng 15.3% nhưng ROAS giảm 5.1%',
      severity: 'error',
      count: null
    }
  ];
  
  return (
    <Card title="Alerts & Risks (Vận hành)">
      <List
        dataSource={alerts}
        renderItem={(item) => (
          <List.Item
            actions={[<Button type="link" size="small">Resolve now</Button>]}
          >
            <List.Item.Meta
              avatar={
                <Badge 
                  count={item.count || 0} 
                  showZero={false}
                  style={{ backgroundColor: item.severity === 'error' ? '#ff4d4f' : '#faad14' }}
                >
                  {item.severity === 'error' ? 
                    <WarningOutlined style={{ fontSize: 24, color: '#ff4d4f' }} /> :
                    <WarningOutlined style={{ fontSize: 24, color: '#faad14' }} />
                  }
                </Badge>
              }
              title={<span style={{ fontWeight: 500 }}>{item.title}</span>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

// Trend Chart Widget
const TrendChartWidget = ({ onAnnotationClick, onInsightsClick }) => {
  const [metrics, setMetrics] = useState(['GMV', 'orders']);
  const [dateRange, setDateRange] = useState(7);
  
  const mockData = generateMockData(dateRange);
  
  const chartData = mockData.flatMap(d => [
    { date: d.date, type: 'GMV', value: d.GMV / 1000000000 },
    { date: d.date, type: 'Orders', value: d.orders }
  ]);
  
  const config = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    legend: { position: 'top' }
  };
  
  return (
    <Card 
      title="Revenue/Orders Trend"
      extra={
        <Space>
          <Radio.Group value={dateRange} onChange={e => setDateRange(e.target.value)} size="small">
            <Radio.Button value={7}>7D</Radio.Button>
            <Radio.Button value={30}>30D</Radio.Button>
            <Radio.Button value={90}>90D</Radio.Button>
          </Radio.Group>
          <Tooltip title="Annotations"><Button size="small" icon={<CommentOutlined />} onClick={onAnnotationClick} /></Tooltip>
          <Tooltip title="Insights"><Button size="small" icon={<BulbOutlined />} onClick={onInsightsClick} /></Tooltip>
        </Space>
      }
    >
      <div style={{ height: 300 }}>
        <Line {...config} />
      </div>
    </Card>
  );
};

// Channel Performance Widget
const ChannelPerformanceWidget = () => {
  return (
    <Card title="Performance by Channel">
      <Row gutter={[16, 16]}>
        {channelData.map((channel, idx) => (
          <Col xs={24} sm={12} lg={6} key={idx}>
            <Card 
              size="small"
              bordered={false}
              style={{ 
                background: channel.health === 'good' ? '#f6ffed' : '#fff7e6',
                borderLeft: `4px solid ${channel.health === 'good' ? '#52c41a' : '#faad14'}`
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 8 }}>{channel.channel}</div>
              <Statistic value={channel.GMV} valueStyle={{ fontSize: 20 }} />
              <div style={{ marginTop: 8 }}>
                <div style={{ color: '#8c8c8c', fontSize: 12 }}>{channel.orders} orders</div>
                <Tag color={channel.growth.startsWith('+') ? 'green' : 'red'} style={{ marginTop: 4 }}>
                  {channel.growth}
                </Tag>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

// Order Status Widget
const OrderStatusWidget = () => {
  const chartData = orderStatusData.map(d => ({
    type: d.status,
    value: d.count
  }));
  
  const config = {
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: { fontSize: 14, textAlign: 'center' }
    },
    legend: { position: 'bottom' }
  };
  
  return (
    <Card title="Order Status Overview">
      <div style={{ height: 300 }}>
        <Pie {...config} />
      </div>
    </Card>
  );
};

// Inventory Warnings Widget
const InventoryWarningsWidget = () => {
  return (
    <Card title="Inventory Warnings">
      <List
        dataSource={inventoryWarnings}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Badge 
                  status={item.status === 'critical' ? 'error' : 'warning'} 
                />
              }
              title={<span>{item.sku} - {item.name}</span>}
              description={
                <div>
                  <Progress 
                    percent={(item.stock / item.threshold) * 100} 
                    size="small"
                    strokeColor={item.status === 'critical' ? '#ff4d4f' : '#faad14'}
                  />
                  <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                    Stock: {item.stock} / {item.threshold}
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

// Recent Activity Widget
const RecentActivityWidget = () => {
  return (
    <Card title="Recent Activity Timeline">
      <Timeline
        items={recentActivities.map(activity => ({
          color: activity.status === 'success' ? 'green' : 
                 activity.status === 'warning' ? 'orange' :
                 activity.status === 'error' ? 'red' : 'blue',
          children: (
            <div>
              <div style={{ fontWeight: 500 }}>{activity.message}</div>
              <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>{activity.time}</div>
            </div>
          )
        }))}
      />
    </Card>
  );
};

// Widget Renderer
const WidgetRenderer = ({ widgetId, onAnnotationClick, onInsightsClick }) => {
  switch (widgetId) {
    case 'kpi-summary':
      return <KPISummaryWidget onAnnotationClick={onAnnotationClick} onInsightsClick={onInsightsClick} />;
    case 'progress-goals':
      return <ProgressGoalsWidget />;
    case 'alerts-risks':
      return <AlertsRisksWidget />;
    case 'trend-chart':
      return <TrendChartWidget onAnnotationClick={onAnnotationClick} onInsightsClick={onInsightsClick} />;
    case 'channel-performance':
      return <ChannelPerformanceWidget />;
    case 'order-status':
      return <OrderStatusWidget />;
    case 'inventory-warnings':
      return <InventoryWarningsWidget />;
    case 'recent-activity':
      return <RecentActivityWidget />;
    default:
      return null;
  }
};

// Annotation Panel (GA4-style)
const AnnotationPanel = ({ visible, onClose, dateRange }) => {
  const [annotations, setAnnotations] = useState([
    {
      id: 1,
      date: '20/11/2025',
      title: 'Flash Sale Campaign',
      description: 'Khuyến mãi lớn giảm giá 50% toàn bộ sản phẩm thời trang',
      tags: ['Campaign', 'Promotion']
    }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [form] = Form.useForm();
  
  const handleCreate = (values) => {
    const newAnnotation = {
      id: Date.now(),
      date: values.date.format('DD/MM/YYYY'),
      title: values.title,
      description: values.description,
      tags: values.tags || []
    };
    setAnnotations([...annotations, newAnnotation]);
    setIsCreating(false);
    form.resetFields();
    message.success('Annotation created successfully');
  };
  
  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Delete annotation?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        setAnnotations(annotations.filter(a => a.id !== id));
        message.success('Annotation deleted');
      }
    });
  };
  
  return (
    <Drawer
      title="Annotations Viewer"
      placement="right"
      width={400}
      onClose={onClose}
      open={visible}
      extra={
        <Tooltip title="Settings">
          <Button size="small" icon={<SettingOutlined />} />
        </Tooltip>
      }
    >
      {annotations.length === 0 && !isCreating ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No annotations in current date range. Click the button below to create one."
        />
      ) : (
        <List
          dataSource={annotations}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="link" size="small" icon={<EditOutlined />} />,
                <Button 
                  type="link" 
                  size="small" 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => handleDelete(item.id)}
                />
              ]}
            >
              <List.Item.Meta
                title={
                  <div>
                    <Tag color="blue">{item.date}</Tag>
                    {item.title}
                  </div>
                }
                description={
                  <div>
                    <div style={{ marginBottom: 8 }}>{item.description}</div>
                    {item.tags.map(tag => <Tag key={tag} style={{ marginRight: 4 }}>{tag}</Tag>)}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
      
      {isCreating && (
        <Card title="Create Annotation" style={{ marginTop: 16 }}>
          <Form form={form} layout="vertical" onFinish={handleCreate}>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input placeholder="Enter annotation title" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea rows={3} placeholder="Enter description" />
            </Form.Item>
            <Form.Item name="tags" label="Tags">
              <Select mode="tags" placeholder="Add tags">
                <Select.Option value="Campaign">Campaign</Select.Option>
                <Select.Option value="Promotion">Promotion</Select.Option>
                <Select.Option value="Stockout">Stockout</Select.Option>
                <Select.Option value="System Issue">System Issue</Select.Option>
              </Select>
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Save</Button>
              <Button onClick={() => setIsCreating(false)}>Cancel</Button>
            </Space>
          </Form>
        </Card>
      )}
      
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        {!isCreating && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsCreating(true)}
          >
            Create annotation
          </Button>
        )}
      </div>
    </Drawer>
  );
};

// Insights Panel (GA4-style)
const InsightsPanel = ({ visible, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState(['performance']);
  
  return (
    <Drawer
      title={
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Insights</div>
          <div style={{ fontSize: 12, fontWeight: 400, color: '#8c8c8c', marginTop: 4 }}>
            Ask Analytics Intelligence
          </div>
        </div>
      }
      placement="right"
      width={450}
      onClose={onClose}
      open={visible}
    >
      <Input.Search 
        placeholder="Search insights or ask a question..." 
        style={{ marginBottom: 16 }}
        size="large"
      />
      
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Recent Insights</div>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {mockInsights.map(insight => (
            <Card 
              key={insight.id} 
              size="small"
              style={{ 
                borderLeft: insight.badge === 'alert' ? '4px solid #ff4d4f' : 
                           insight.badge === 'opportunity' ? '4px solid #52c41a' : '4px solid #1890ff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontWeight: 600 }}>{insight.title}</span>
                    {insight.badge === 'new' && <Tag color="blue">New</Tag>}
                    {insight.badge === 'alert' && <Tag color="red">Alert</Tag>}
                    {insight.badge === 'opportunity' && <Tag color="green">Opportunity</Tag>}
                  </div>
                  <div style={{ fontSize: 12, color: '#595959', marginBottom: 8 }}>
                    {insight.description}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#1890ff' }}>
                    {insight.value}
                  </div>
                </div>
              </div>
              <Button type="link" size="small" style={{ padding: 0, marginTop: 8 }}>
                View details →
              </Button>
            </Card>
          ))}
        </Space>
      </div>
      
      <Collapse 
        activeKey={expandedCategory} 
        onChange={setExpandedCategory}
        items={insightCategories.map(category => ({
          key: category.key,
          label: category.title,
          children: (
            <List
              size="small"
              dataSource={category.questions}
              renderItem={(question) => (
                <List.Item 
                  style={{ cursor: 'pointer' }}
                  onClick={() => message.info(`Analyzing: ${question}`)}
                >
                  <Button type="link" size="small" style={{ padding: 0 }}>
                    {question}
                  </Button>
                </List.Item>
              )}
            />
          )
        }))}
      />
    </Drawer>
  );
};

// Widget Library Drawer
const WidgetLibraryDrawer = ({ visible, onClose, activeWidgets, onToggleWidget }) => {
  return (
    <Drawer
      title="Widget Library"
      placement="right"
      width={500}
      onClose={onClose}
      open={visible}
    >
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 12 }}>
          Toggle widgets on/off and drag to reorder them on your homepage
        </div>
      </div>
      
      <List
        dataSource={availableWidgets}
        renderItem={(widget) => {
          const isActive = activeWidgets.includes(widget.id);
          return (
            <List.Item
              actions={[
                <Switch 
                  checked={isActive} 
                  onChange={() => onToggleWidget(widget.id)}
                />
              ]}
            >
              <List.Item.Meta
                avatar={<AppstoreAddOutlined style={{ fontSize: 24 }} />}
                title={widget.name}
                description={
                  <div>
                    <Tag>{widget.category}</Tag>
                    <Tag color="blue">{widget.defaultSize}</Tag>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    </Drawer>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewpoint, setViewpoint] = useState('Growth');
  const [customizeMode, setCustomizeMode] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState(defaultPresets.growth);
  const [widgetLibraryVisible, setWidgetLibraryVisible] = useState(false);
  const [annotationVisible, setAnnotationVisible] = useState(false);
  const [insightsVisible, setInsightsVisible] = useState(false);
  const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'day'), dayjs()]);
  
  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Trang chủ' },
    { key: 'analytics', icon: <BarChartOutlined />, label: 'Phân tích' },
    { key: 'orders', icon: <ShoppingOutlined />, label: 'Đơn hàng' },
    { key: 'inventory', icon: <InboxOutlined />, label: 'Kho hàng' },
    { key: 'shipping', icon: <CarOutlined />, label: 'Vận chuyển' }
  ];
  
  const handleViewpointChange = (value) => {
    setViewpoint(value);
    if (value === 'Growth') {
      setActiveWidgets(defaultPresets.growth);
    } else if (value === 'Account/Ops') {
      setActiveWidgets(defaultPresets.ops);
    } else if (value === 'Management') {
      setActiveWidgets(defaultPresets.management);
    }
  };
  
  const handleToggleWidget = (widgetId) => {
    if (activeWidgets.includes(widgetId)) {
      setActiveWidgets(activeWidgets.filter(id => id !== widgetId));
    } else {
      setActiveWidgets([...activeWidgets, widgetId]);
    }
  };
  
  const handleSaveCustomization = () => {
    localStorage.setItem('customWidgets', JSON.stringify(activeWidgets));
    setCustomizeMode(false);
    message.success('Homepage layout saved successfully!');
  };
  
  const userMenu = (
    <Menu
      items={[
        { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
        { key: 'settings', label: 'Settings', icon: <SettingOutlined /> },
        { type: 'divider' },
        { key: 'logout', label: 'Logout' }
      ]}
    />
  );
  
  const notificationMenu = (
    <Menu
      items={[
        { key: '1', label: 'SKU-045 sắp hết hàng' },
        { key: '2', label: 'Đơn hàng #12457 đã giao' },
        { key: '3', label: 'Tỷ lệ hủy đơn tăng cao' }
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
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16 }}
          />
          <img src={logoSvg} alt="UpS Logo" style={{ height: 40 }} />
          <div style={{ fontSize: 12, color: '#8c8c8c', marginLeft: 16 }}>
            Bảng điều khiển &gt; Trang chủ
          </div>
        </div>
        
        <Space size="middle">
          <RangePicker 
            value={dateRange}
            onChange={setDateRange}
            size="small"
          />
          <Dropdown overlay={notificationMenu} trigger={['click']}>
            <Badge count={3} size="small">
              <Button type="text" icon={<BellOutlined />} />
            </Badge>
          </Dropdown>
          <Button type="text" icon={<SettingOutlined />} />
          <Dropdown overlay={userMenu} trigger={['click']}>
            <Avatar style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}>
              <UserOutlined />
            </Avatar>
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
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            items={menuItems}
            style={{ borderRight: 0 }}
          />
        </Sider>
        
        {/* Main Content */}
        <Layout style={{ padding: '24px' }}>
          <Content>
            {/* Page Header */}
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Trang chủ</h1>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 16 }}>
                <Segmented
                  options={['Growth', 'Account/Ops', 'Management']}
                  value={viewpoint}
                  onChange={handleViewpointChange}
                />
                {customizeMode ? (
                  <Space>
                    <Button 
                      type="primary" 
                      icon={<SaveOutlined />}
                      onClick={handleSaveCustomization}
                    >
                      Save Layout
                    </Button>
                    <Button 
                      icon={<AppstoreAddOutlined />}
                      onClick={() => setWidgetLibraryVisible(true)}
                    >
                      Add Widgets
                    </Button>
                    <Button onClick={() => setCustomizeMode(false)}>
                      Cancel
                    </Button>
                  </Space>
                ) : (
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => setCustomizeMode(true)}
                  >
                    Customize Homepage
                  </Button>
                )}
              </div>
            </div>
            
            {/* Widgets Grid */}
            <Row gutter={[16, 16]}>
              {activeWidgets.map((widgetId, index) => (
                <Col 
                  xs={24} 
                  lg={widgetId === 'kpi-summary' || widgetId === 'trend-chart' || 
                      widgetId === 'channel-performance' || widgetId === 'alerts-risks' ? 24 : 12} 
                  key={widgetId}
                  style={{ position: 'relative' }}
                >
                  {customizeMode && (
                    <div style={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      zIndex: 10,
                      display: 'flex',
                      gap: 8
                    }}>
                      <Button 
                        size="small" 
                        icon={<DragOutlined />}
                        style={{ cursor: 'move' }}
                      />
                      <Button 
                        size="small" 
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleToggleWidget(widgetId)}
                      />
                    </div>
                  )}
                  <WidgetRenderer 
                    widgetId={widgetId} 
                    onAnnotationClick={() => setAnnotationVisible(true)}
                    onInsightsClick={() => setInsightsVisible(true)}
                  />
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Layout>
      
      {/* Annotation Panel */}
      <AnnotationPanel
        visible={annotationVisible}
        onClose={() => setAnnotationVisible(false)}
        dateRange={dateRange}
      />
      
      {/* Insights Panel */}
      <InsightsPanel
        visible={insightsVisible}
        onClose={() => setInsightsVisible(false)}
      />
      
      {/* Widget Library Drawer */}
      <WidgetLibraryDrawer
        visible={widgetLibraryVisible}
        onClose={() => setWidgetLibraryVisible(false)}
        activeWidgets={activeWidgets}
        onToggleWidget={handleToggleWidget}
      />
    </Layout>
  );
};

export default Dashboard;



