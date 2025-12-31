import { useState, useEffect } from 'react';
import {
  Layout, Menu, Card, Statistic, Progress, Tabs, Segmented, Timeline, Tag, 
  Drawer, Modal, Popover, Tooltip, Button, List, Collapse, DatePicker, 
  Badge, Avatar, Dropdown, Row, Col, Empty, Input, Form, Select, Space,
  Radio, message, Switch, Divider, Alert, Checkbox
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
  TagsOutlined, InfoCircleOutlined, ThunderboltOutlined
} from '@ant-design/icons';
import { Line, Column, Pie, Area } from '@ant-design/charts';
import dayjs from 'dayjs';
import logoSvg from './assets/logo-dark.svg';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
    title: 'Hiệu suất cơ bản',
    icon: <RiseOutlined />,
    questions: [
      'Kênh nào tạo ra GMV cao nhất?',
      'Xu hướng đơn hàng 7 ngày qua?',
      'AOV có thay đổi đáng kể không?',
      'Thời điểm nào có traffic cao nhất?'
    ]
  },
  {
    key: 'traffic',
    title: 'Lưu lượng & Thu hút người dùng',
    icon: <ThunderboltOutlined />,
    questions: [
      'Nguồn traffic nào hiệu quả nhất?',
      'Tỷ lệ bounce rate có bất thường?',
      'Campaign nào mang lại ROAS cao nhất?',
      'Chi phí per order thay đổi như thế nào?'
    ]
  },
  {
    key: 'ecommerce',
    title: 'Hiệu suất thương mại điện tử',
    icon: <ShoppingOutlined />,
    questions: [
      'Conversion rate có giảm không?',
      'Giỏ hàng bị bỏ ở bước nào?',
      'Sản phẩm nào bán chạy nhất?',
      'Có SKU nào cần điều chỉnh giá?'
    ]
  },
  {
    key: 'customer',
    title: 'Hành vi khách hàng',
    icon: <UserOutlined />,
    questions: [
      'Khách hàng mới vs khách hàng cũ?',
      'Tỷ lệ khách hàng quay lại?',
      'Giá trị lifetime của khách hàng?',
      'Phân khúc khách hàng nào tiềm năng?'
    ]
  },
  {
    key: 'technology',
    title: 'Công nghệ',
    icon: <SettingOutlined />,
    questions: [
      'Hiệu suất trang web như thế nào?',
      'Thiết bị nào được dùng nhiều nhất?',
      'Có lỗi hệ thống nào cần khắc phục?',
      'Tốc độ tải trang có ảnh hưởng conversion?'
    ]
  }
];

const mockInsights = [
  {
    id: 1,
    title: 'GMV tăng mạnh từ TikTok Shop',
    description: 'Kênh TikTok Shop tăng trưởng 22.5% so với tuần trước, chủ yếu từ các sản phẩm thời trang nữ. Đây là cơ hội tốt để tăng ngân sách quảng cáo cho kênh này.',
    value: '+22.5%',
    badge: 'new',
    category: 'performance',
    priority: 'high',
    read: false
  },
  {
    id: 2,
    title: 'Conversion Rate giảm trên Shopee',
    description: 'CR giảm từ 3.3% xuống 2.8% trong 7 ngày, có thể do giá cạnh tranh hoặc review sản phẩm. Cần kiểm tra đối thủ và chất lượng listing.',
    value: '-15.2%',
    badge: 'alert',
    category: 'ecommerce',
    priority: 'high',
    read: false
  },
  {
    id: 3,
    title: 'ROAS của campaign "Flash Sale" đạt 6.2x',
    description: 'Campaign Flash Sale cuối tuần đạt ROAS cao nhất trong tháng, nên nhân rộng chiến lược này cho các sản phẩm tương tự.',
    value: '6.2x',
    badge: 'opportunity',
    category: 'traffic',
    priority: 'medium',
    read: false
  },
  {
    id: 4,
    title: 'Khách hàng mới tăng 28% trong tuần',
    description: 'Lượng khách hàng mới tăng đột biến do chiến dịch viral trên TikTok. Cần có chiến lược nurture để giữ chân khách hàng này.',
    value: '+28%',
    badge: 'new',
    category: 'customer',
    priority: 'medium',
    read: false
  }
];

// ========== WIDGET LIBRARY ==========
const availableWidgets = [
  { 
    id: 'kpi-summary', 
    name: 'Tổng quan KPI', 
    description: 'Hiển thị các chỉ số hiệu suất chính: GMV, Orders, AOV, ROAS',
    category: 'Báo cáo kết quả', 
    defaultSize: 'large',
    icon: <BarChartOutlined />
  },
  { 
    id: 'progress-goals', 
    name: 'Tiến độ mục tiêu', 
    description: 'Theo dõi tiến độ đạt được các mục tiêu kinh doanh',
    category: 'Báo cáo tiến độ', 
    defaultSize: 'medium',
    icon: <RiseOutlined />
  },
  { 
    id: 'alerts-risks', 
    name: 'Cảnh báo & Rủi ro', 
    description: 'Các cảnh báo và rủi ro vận hành cần xử lý',
    category: 'Cảnh báo & Rủi ro', 
    defaultSize: 'large',
    icon: <WarningOutlined />
  },
  { 
    id: 'trend-chart', 
    name: 'Biểu đồ xu hướng', 
    description: 'Xu hướng doanh thu và đơn hàng theo thời gian',
    category: 'Phân tích', 
    defaultSize: 'large',
    icon: <LineChartOutlined />
  },
  { 
    id: 'channel-performance', 
    name: 'Hiệu suất theo kênh', 
    description: 'So sánh hiệu suất các kênh bán hàng',
    category: 'Phân tích', 
    defaultSize: 'large',
    icon: <ShoppingOutlined />
  },
  { 
    id: 'order-status', 
    name: 'Trạng thái đơn hàng', 
    description: 'Phân bổ đơn hàng theo trạng thái',
    category: 'Vận hành', 
    defaultSize: 'medium',
    icon: <ShoppingOutlined />
  },
  { 
    id: 'inventory-warnings', 
    name: 'Cảnh báo tồn kho', 
    description: 'Các SKU sắp hết hàng cần nhập thêm',
    category: 'Vận hành', 
    defaultSize: 'medium',
    icon: <InboxOutlined />
  },
  { 
    id: 'recent-activity', 
    name: 'Hoạt động gần đây', 
    description: 'Timeline các hoạt động mới nhất',
    category: 'Giám sát', 
    defaultSize: 'medium',
    icon: <SyncOutlined />
  }
];

const defaultPresets = {
  growth: ['kpi-summary', 'trend-chart', 'channel-performance', 'progress-goals'],
  ops: ['alerts-risks', 'order-status', 'inventory-warnings', 'recent-activity'],
  management: ['kpi-summary', 'channel-performance', 'progress-goals', 'trend-chart']
};

// ========== SORTABLE WIDGET ITEM ==========
const SortableWidgetItem = ({ widget, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    marginBottom: 12
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        size="small"
        style={{ 
          borderLeft: '4px solid #1890ff',
          background: '#fafafa'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <DragOutlined style={{ fontSize: 18, color: '#8c8c8c' }} />
            <div style={{ fontSize: 20, color: '#1890ff' }}>{widget.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{widget.name}</div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>{widget.description}</div>
              <div style={{ marginTop: 6 }}>
                <Tag>{widget.category}</Tag>
                <Tag color="blue">{widget.defaultSize}</Tag>
              </div>
            </div>
          </div>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={(e) => {
              e.stopPropagation();
              onRemove(widget.id);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

// ========== COMPONENTS ==========

// KPI Summary Widget
const KPISummaryWidget = ({ onAnnotationClick, onInsightsClick }) => {
  const [selectedMetric, setSelectedMetric] = useState('GMV');
  const mockData = generateMockData(7);
  
  const metrics = [
    { key: 'GMV', label: 'GMV', value: '₫2.4B', delta: '+12.5%', trend: 'up' },
    { key: 'orders', label: 'Số đơn', value: '1,247', delta: '+8.2%', trend: 'up' },
    { key: 'AOV', label: 'AOV', value: '₫1,925k', delta: '+4.1%', trend: 'up' },
    { key: 'ROAS', label: 'ROAS', value: '4.2x', delta: '-5.1%', trend: 'down' },
    { key: 'adCost', label: 'Chi phí Ads', value: '₫580M', delta: '+15.3%', trend: 'up' }
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
    annotations: [
      {
        type: 'line',
        start: ['22/11', 'min'],
        end: ['22/11', 'max'],
        style: {
          stroke: '#ff4d4f',
          lineDash: [4, 4],
        },
        text: {
          content: 'Flash Sale',
          position: 'top',
          style: {
            fill: '#ff4d4f',
            fontSize: 12,
          },
        },
      },
    ],
  };
  
  return (
    <Card 
      title={<span style={{ fontSize: 16, fontWeight: 600 }}>Báo cáo kết quả</span>}
      extra={
        <Space>
          <Tooltip title="Loại biểu đồ"><Button size="small" icon={<LineChartOutlined />} /></Tooltip>
          <Tooltip title="Chia sẻ"><Button size="small" icon={<ShareAltOutlined />} /></Tooltip>
          <Tooltip title="Xuất dữ liệu"><Button size="small" icon={<DownloadOutlined />} /></Tooltip>
          <Tooltip title="Ghi chú"><Button size="small" icon={<CommentOutlined />} onClick={onAnnotationClick} /></Tooltip>
          <Tooltip title="Gợi ý phân tích"><Button size="small" icon={<BulbOutlined />} onClick={onInsightsClick} /></Tooltip>
        </Space>
      }
    >
      <Tabs 
        items={metrics.map(m => ({
          key: m.key,
          label: (
            <div style={{ textAlign: 'center', padding: '4px 8px' }}>
              <div style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{m.value}</div>
              <div style={{ 
                fontSize: 12, 
                fontWeight: 600,
                color: m.trend === 'up' ? '#52c41a' : '#ff4d4f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4
              }}>
                {m.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} 
                <span>{m.delta}</span>
              </div>
            </div>
          )
        }))}
        onChange={setSelectedMetric}
      />
      <div style={{ marginTop: 20, height: 280 }}>
        <Line {...config} />
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: '#8c8c8c', textAlign: 'center' }}>
        vs hôm trước • Dữ liệu cập nhật 10 phút trước
      </div>
    </Card>
  );
};

// Progress Goals Widget
const ProgressGoalsWidget = () => {
  const goals = [
    { name: 'GMV tháng này', current: 72, target: 100, unit: '₫72B / ₫100B', color: '#1890ff', status: 'active' },
    { name: 'Số đơn hàng', current: 85, target: 100, unit: '8,520 / 10,000 đơn', color: '#52c41a', status: 'active' },
    { name: 'Ngân sách Ads đã dùng', current: 68, target: 100, unit: '₫6.8B / ₫10B', color: '#faad14', status: 'normal' }
  ];
  
  return (
    <Card title={<span style={{ fontSize: 16, fontWeight: 600 }}>Báo cáo tiến độ</span>}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {goals.map((goal, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{goal.name}</span>
              <span style={{ color: '#8c8c8c', fontSize: 13 }}>{goal.unit}</span>
            </div>
            <Progress 
              percent={goal.current} 
              strokeColor={goal.color}
              status={goal.current >= 90 ? 'success' : goal.status}
              strokeWidth={10}
            />
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              {goal.current >= 90 ? '✓ Gần đạt mục tiêu!' : goal.current >= 70 ? 'Đang đi đúng hướng' : 'Cần tăng tốc'}
            </div>
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
      count: 14,
      action: 'Nhập hàng ngay'
    },
    { 
      title: 'Tỷ lệ hủy đơn tăng cao', 
      description: 'Tăng 2.3% so với hôm trước (từ 6.2% → 8.5%)',
      severity: 'warning',
      count: null,
      action: 'Kiểm tra nguyên nhân'
    },
    { 
      title: 'Traffic giảm mạnh', 
      description: 'Lượt truy cập giảm 14.7% so với hôm trước',
      severity: 'warning',
      count: null,
      action: 'Xem chi tiết'
    },
    { 
      title: 'Chi phí Ads tăng đột biến', 
      description: 'Tăng 15.3% nhưng ROAS giảm 5.1%',
      severity: 'error',
      count: null,
      action: 'Tối ưu campaign'
    }
  ];
  
  return (
    <Card title={<span style={{ fontSize: 16, fontWeight: 600 }}>Cảnh báo & Rủi ro</span>}>
      <List
        dataSource={alerts}
        renderItem={(item) => (
          <List.Item
            style={{
              borderLeft: `4px solid ${item.severity === 'error' ? '#ff4d4f' : '#faad14'}`,
              paddingLeft: 16,
              marginBottom: 12,
              background: item.severity === 'error' ? '#fff2f0' : '#fffbe6',
              borderRadius: 4
            }}
          >
            <List.Item.Meta
              avatar={
                <Badge 
                  count={item.count || 0} 
                  showZero={false}
                  style={{ backgroundColor: item.severity === 'error' ? '#ff4d4f' : '#faad14' }}
                >
                  {item.severity === 'error' ? 
                    <WarningOutlined style={{ fontSize: 28, color: '#ff4d4f' }} /> :
                    <WarningOutlined style={{ fontSize: 28, color: '#faad14' }} />
                  }
                </Badge>
              }
              title={<span style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</span>}
              description={
                <div>
                  <div style={{ marginBottom: 8, color: '#595959' }}>{item.description}</div>
                  <Button type="primary" size="small" danger={item.severity === 'error'}>
                    {item.action} →
                  </Button>
                </div>
              }
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
    { date: d.date, type: 'GMV (tỷ đồng)', value: d.GMV / 1000000000 },
    { date: d.date, type: 'Số đơn hàng', value: d.orders }
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
      title={<span style={{ fontSize: 16, fontWeight: 600 }}>Biểu đồ xu hướng</span>}
      extra={
        <Space>
          <Radio.Group value={dateRange} onChange={e => setDateRange(e.target.value)} size="small">
            <Radio.Button value={7}>7 ngày</Radio.Button>
            <Radio.Button value={30}>30 ngày</Radio.Button>
            <Radio.Button value={90}>90 ngày</Radio.Button>
          </Radio.Group>
          <Tooltip title="Ghi chú"><Button size="small" icon={<CommentOutlined />} onClick={onAnnotationClick} /></Tooltip>
          <Tooltip title="Gợi ý"><Button size="small" icon={<BulbOutlined />} onClick={onInsightsClick} /></Tooltip>
        </Space>
      }
    >
      <div style={{ height: 320 }}>
        <Line {...config} />
      </div>
    </Card>
  );
};

// Channel Performance Widget
const ChannelPerformanceWidget = () => {
  return (
    <Card title={<span style={{ fontSize: 16, fontWeight: 600 }}>Hiệu suất theo kênh</span>}>
      <Row gutter={[16, 16]}>
        {channelData.map((channel, idx) => (
          <Col xs={24} sm={12} lg={6} key={idx}>
            <Card 
              size="small"
              bordered={false}
              style={{ 
                background: channel.health === 'good' ? '#f6ffed' : '#fff7e6',
                borderLeft: `4px solid ${channel.health === 'good' ? '#52c41a' : '#faad14'}`,
                height: '100%'
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>{channel.channel}</div>
              <Statistic 
                value={channel.GMV} 
                valueStyle={{ fontSize: 24, fontWeight: 700, color: '#262626' }} 
                prefix="GMV:"
                suffix=""
              />
              <div style={{ marginTop: 12 }}>
                <div style={{ color: '#595959', fontSize: 13, marginBottom: 6 }}>
                  {channel.orders} đơn hàng
                </div>
                <Tag 
                  color={channel.growth.startsWith('+') ? 'success' : 'error'} 
                  style={{ fontSize: 13, padding: '2px 8px' }}
                >
                  {channel.growth} vs tuần trước
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
      style: { fontSize: 14, textAlign: 'center', fill: '#fff', fontWeight: 'bold' }
    },
    legend: { position: 'right' },
    statistic: {
      title: {
        content: 'Tổng đơn',
      },
      content: {
        content: orderStatusData.reduce((sum, d) => sum + d.count, 0).toString(),
      },
    },
  };
  
  return (
    <Card title={<span style={{ fontSize: 16, fontWeight: 600 }}>Trạng thái đơn hàng</span>}>
      <div style={{ height: 320 }}>
        <Pie {...config} />
      </div>
    </Card>
  );
};

// Inventory Warnings Widget
const InventoryWarningsWidget = () => {
  return (
    <Card title={<span style={{ fontSize: 16, fontWeight: 600 }}>Cảnh báo tồn kho</span>}>
      <List
        dataSource={inventoryWarnings}
        renderItem={(item) => (
          <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
            <List.Item.Meta
              avatar={
                <Badge 
                  status={item.status === 'critical' ? 'error' : 'warning'} 
                  dot
                  style={{ fontSize: 16 }}
                />
              }
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>{item.sku} - {item.name}</span>
                  <Tag color={item.status === 'critical' ? 'error' : 'warning'}>
                    {item.status === 'critical' ? 'Khẩn cấp' : 'Cảnh báo'}
                  </Tag>
                </div>
              }
              description={
                <div>
                  <Progress 
                    percent={(item.stock / item.threshold) * 100} 
                    size="small"
                    strokeColor={item.status === 'critical' ? '#ff4d4f' : '#faad14'}
                    showInfo={false}
                  />
                  <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 6 }}>
                    Còn lại: <strong>{item.stock}</strong> / Ngưỡng: {item.threshold} đơn vị
                  </div>
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
    <Card title={<span style={{ fontSize: 16, fontWeight: 600 }}>Hoạt động gần đây</span>}>
      <Timeline
        items={recentActivities.map(activity => ({
          color: activity.status === 'success' ? 'green' : 
                 activity.status === 'warning' ? 'orange' :
                 activity.status === 'error' ? 'red' : 'blue',
          children: (
            <div>
              <div style={{ fontWeight: 500, marginBottom: 4 }}>{activity.message}</div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>{activity.time}</div>
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

// Enhanced Customization Modal with Drag & Drop
const CustomizationModal = ({ visible, onClose, activeWidgets, onSave }) => {
  const [widgets, setWidgets] = useState([]);
  const [availableWidgetsList] = useState(availableWidgets);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  useEffect(() => {
    if (visible) {
      const widgetObjects = activeWidgets
        .map(id => availableWidgets.find(w => w.id === id))
        .filter(Boolean);
      setWidgets(widgetObjects);
    }
  }, [visible, activeWidgets]);
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  
  const handleAddWidget = (widgetId) => {
    const widget = availableWidgetsList.find(w => w.id === widgetId);
    if (widget && !widgets.find(w => w.id === widgetId)) {
      setWidgets([...widgets, widget]);
      message.success(`Đã thêm "${widget.name}"`);
    }
  };
  
  const handleRemoveWidget = (widgetId) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
    message.info('Đã xóa widget');
  };
  
  const handleSave = () => {
    onSave(widgets.map(w => w.id));
    message.success('Đã lưu cấu hình trang chủ!');
    onClose();
  };
  
  const handleReset = () => {
    Modal.confirm({
      title: 'Đặt lại về mặc định?',
      content: 'Điều này sẽ xóa tất cả tùy chỉnh của bạn.',
      okText: 'Đặt lại',
      cancelText: 'Hủy',
      onOk: () => {
        const defaultWidgets = defaultPresets.growth
          .map(id => availableWidgets.find(w => w.id === id))
          .filter(Boolean);
        setWidgets(defaultWidgets);
        message.success('Đã đặt lại về cấu hình mặc định');
      }
    });
  };
  
  return (
    <Modal
      title={
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Tùy chỉnh trang chủ</div>
          <div style={{ fontSize: 13, color: '#8c8c8c', fontWeight: 400, marginTop: 4 }}>
            Kéo thả để sắp xếp lại thứ tự widget
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="reset" onClick={handleReset}>
          Đặt lại mặc định
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Lưu cấu hình
        </Button>
      ]}
    >
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Active Widgets - Sortable */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            fontSize: 15, 
            fontWeight: 600, 
            marginBottom: 12,
            padding: '8px 12px',
            background: '#f0f0f0',
            borderRadius: 4
          }}>
            Widget đang hiển thị ({widgets.length})
          </div>
          
          {widgets.length === 0 ? (
            <Empty 
              description="Chưa có widget nào. Thêm từ danh sách bên phải →"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={widgets.map(w => w.id)}
                strategy={verticalListSortingStrategy}
              >
                {widgets.map((widget) => (
                  <SortableWidgetItem
                    key={widget.id}
                    widget={widget}
                    onRemove={handleRemoveWidget}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
        
        {/* Available Widgets */}
        <div style={{ width: 280, borderLeft: '1px solid #f0f0f0', paddingLeft: 24 }}>
          <div style={{ 
            fontSize: 15, 
            fontWeight: 600, 
            marginBottom: 12,
            padding: '8px 12px',
            background: '#f0f0f0',
            borderRadius: 4
          }}>
            Thêm widget
          </div>
          
          <Space direction="vertical" style={{ width: '100%' }} size="small">
            {availableWidgetsList
              .filter(w => !widgets.find(aw => aw.id === w.id))
              .map(widget => (
                <Button
                  key={widget.id}
                  block
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => handleAddWidget(widget.id)}
                  style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}
                >
                  <div style={{ fontSize: 13 }}>{widget.name}</div>
                </Button>
              ))
            }
          </Space>
        </div>
      </div>
    </Modal>
  );
};

// Enhanced Annotation Panel
const AnnotationPanel = ({ visible, onClose, dateRange }) => {
  const [annotations, setAnnotations] = useState([
    {
      id: 1,
      date: '20/11/2025',
      title: 'Flash Sale Campaign',
      description: 'Khuyến mãi lớn giảm giá 50% toàn bộ sản phẩm thời trang',
      tags: ['Chiến dịch', 'Khuyến mãi']
    }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingAnnotation, setEditingAnnotation] = useState(null);
  const [form] = Form.useForm();
  
  const handleCreate = (values) => {
    if (editingAnnotation) {
      // Update existing
      setAnnotations(annotations.map(a => 
        a.id === editingAnnotation.id 
          ? { ...a, ...values, date: values.date.format('DD/MM/YYYY') }
          : a
      ));
      message.success('Đã cập nhật ghi chú');
      setEditingAnnotation(null);
    } else {
      // Create new
      const newAnnotation = {
        id: Date.now(),
        date: values.date.format('DD/MM/YYYY'),
        title: values.title,
        description: values.description,
        tags: values.tags || []
      };
      setAnnotations([...annotations, newAnnotation]);
      message.success('Đã tạo ghi chú mới');
    }
    
    setIsCreating(false);
    form.resetFields();
  };
  
  const handleEdit = (annotation) => {
    setEditingAnnotation(annotation);
    setIsCreating(true);
    form.setFieldsValue({
      title: annotation.title,
      description: annotation.description,
      tags: annotation.tags,
      date: dayjs(annotation.date, 'DD/MM/YYYY')
    });
  };
  
  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xóa ghi chú này?',
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setAnnotations(annotations.filter(a => a.id !== id));
        message.success('Đã xóa ghi chú');
      }
    });
  };
  
  const handleCancel = () => {
    setIsCreating(false);
    setEditingAnnotation(null);
    form.resetFields();
  };
  
  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              <CommentOutlined style={{ marginRight: 8 }} />
              Trình xem ghi chú
            </div>
            <div style={{ fontSize: 12, fontWeight: 400, color: '#8c8c8c', marginTop: 4 }}>
              {annotations.length} ghi chú trong khoảng thời gian này
            </div>
          </div>
        </div>
      }
      placement="right"
      width={450}
      onClose={onClose}
      open={visible}
      extra={
        <Tooltip title="Cài đặt">
          <Button size="small" icon={<SettingOutlined />} />
        </Tooltip>
      }
    >
      {annotations.length === 0 && !isCreating ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>
                Không có ghi chú nào trong khoảng thời gian hiện tại
              </div>
              <div style={{ fontSize: 13, color: '#8c8c8c' }}>
                Nhấn nút bên dưới để tạo ghi chú mới
              </div>
            </div>
          }
        />
      ) : (
        !isCreating && (
          <List
            dataSource={annotations}
            renderItem={(item) => (
              <List.Item
                style={{
                  borderLeft: '3px solid #1890ff',
                  paddingLeft: 12,
                  marginBottom: 12,
                  background: '#fafafa'
                }}
                actions={[
                  <Button 
                    type="link" 
                    size="small" 
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(item)}
                  >
                    Sửa
                  </Button>,
                  <Button 
                    type="link" 
                    size="small" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => handleDelete(item.id)}
                  >
                    Xóa
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<CalendarOutlined style={{ fontSize: 20, color: '#1890ff' }} />}
                  title={
                    <div>
                      <Tag color="blue" icon={<CalendarOutlined />}>{item.date}</Tag>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</span>
                    </div>
                  }
                  description={
                    <div>
                      <div style={{ marginBottom: 8, marginTop: 6 }}>{item.description}</div>
                      <div>
                        {item.tags.map(tag => (
                          <Tag key={tag} icon={<TagsOutlined />} style={{ marginRight: 4 }}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )
      )}
      
      {isCreating && (
        <Card 
          title={editingAnnotation ? 'Chỉnh sửa ghi chú' : 'Tạo ghi chú mới'} 
          style={{ marginTop: annotations.length > 0 ? 16 : 0 }}
        >
          <Form form={form} layout="vertical" onFinish={handleCreate}>
            <Form.Item 
              name="date" 
              label="Ngày" 
              rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
              initialValue={dayjs()}
            >
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item 
              name="title" 
              label="Tiêu đề" 
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
            >
              <Input placeholder="Ví dụ: Flash Sale Campaign" />
            </Form.Item>
            <Form.Item name="description" label="Mô tả chi tiết">
              <TextArea rows={3} placeholder="Mô tả chi tiết về sự kiện hoặc thay đổi này" />
            </Form.Item>
            <Form.Item name="tags" label="Tags">
              <Select mode="tags" placeholder="Thêm tags để phân loại">
                <Select.Option value="Chiến dịch">Chiến dịch</Select.Option>
                <Select.Option value="Khuyến mãi">Khuyến mãi</Select.Option>
                <Select.Option value="Hết hàng">Hết hàng</Select.Option>
                <Select.Option value="Sự cố hệ thống">Sự cố hệ thống</Select.Option>
                <Select.Option value="Cập nhật">Cập nhật</Select.Option>
              </Select>
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                {editingAnnotation ? 'Cập nhật' : 'Lưu ghi chú'}
              </Button>
              <Button onClick={handleCancel}>Hủy</Button>
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
            block
            size="large"
          >
            Tạo ghi chú mới
          </Button>
        )}
      </div>
    </Drawer>
  );
};

// Enhanced Insights Panel
const InsightsPanel = ({ visible, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState(['performance']);
  const [insights, setInsights] = useState(mockInsights);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleMarkAsRead = (insightId) => {
    setInsights(insights.map(i => 
      i.id === insightId ? { ...i, read: true } : i
    ));
    message.success('Đã đánh dấu đã đọc');
  };
  
  const filteredInsights = insights.filter(insight => 
    !searchQuery || 
    insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const unreadCount = insights.filter(i => !i.read).length;
  
  return (
    <Drawer
      title={
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BulbOutlined style={{ color: '#faad14' }} />
            Gợi ý phân tích
            {unreadCount > 0 && (
              <Badge count={unreadCount} style={{ marginLeft: 4 }} />
            )}
          </div>
          <div style={{ fontSize: 12, fontWeight: 400, color: '#8c8c8c', marginTop: 4 }}>
            Hỏi Trợ lý Phân tích về dữ liệu của bạn
          </div>
        </div>
      }
      placement="right"
      width={500}
      onClose={onClose}
      open={visible}
    >
      <Input.Search 
        placeholder="Tìm kiếm hoặc đặt câu hỏi..." 
        style={{ marginBottom: 20 }}
        size="large"
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        allowClear
      />
      
      <div style={{ marginBottom: 24 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 12 
        }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>
            Gợi ý nổi bật
          </span>
          <Button 
            type="link" 
            size="small"
            onClick={() => setInsights(insights.map(i => ({ ...i, read: true })))}
          >
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
        
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {filteredInsights.filter(i => !i.read).map(insight => (
            <Card 
              key={insight.id} 
              size="small"
              style={{ 
                borderLeft: insight.badge === 'alert' ? '4px solid #ff4d4f' : 
                           insight.badge === 'opportunity' ? '4px solid #52c41a' : '4px solid #1890ff',
                background: '#fafafa'
              }}
              actions={[
                <Button 
                  type="link" 
                  size="small"
                  onClick={() => handleMarkAsRead(insight.id)}
                >
                  Đánh dấu đã đọc
                </Button>,
                <Button type="link" size="small">
                  Xem chi tiết →
                </Button>
              ]}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{insight.title}</span>
                  {insight.badge === 'new' && <Tag color="blue">Mới</Tag>}
                  {insight.badge === 'alert' && <Tag color="red">Cảnh báo</Tag>}
                  {insight.badge === 'opportunity' && <Tag color="green">Cơ hội</Tag>}
                </div>
                <div style={{ fontSize: 13, color: '#595959', marginBottom: 10, lineHeight: 1.6 }}>
                  {insight.description}
                </div>
                <div style={{ 
                  fontSize: 24, 
                  fontWeight: 700, 
                  color: insight.badge === 'alert' ? '#ff4d4f' : '#1890ff'
                }}>
                  {insight.value}
                </div>
              </div>
            </Card>
          ))}
        </Space>
      </div>
      
      <Divider>Danh mục câu hỏi</Divider>
      
      <Collapse 
        activeKey={expandedCategory} 
        onChange={setExpandedCategory}
        ghost
        items={insightCategories.map(category => ({
          key: category.key,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
              {category.icon}
              {category.title}
            </div>
          ),
          children: (
            <List
              size="small"
              dataSource={category.questions}
              renderItem={(question, index) => (
                <List.Item 
                  style={{ cursor: 'pointer', padding: '8px 0' }}
                  onClick={() => message.info(`Đang phân tích: ${question}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: 8, width: '100%' }}>
                    <BulbOutlined style={{ color: '#faad14', marginTop: 2 }} />
                    <span style={{ flex: 1, fontSize: 13 }}>{question}</span>
                  </div>
                </List.Item>
              )}
            />
          )
        }))}
      />
      
      <Alert
        message="Mẹo sử dụng"
        description="Bạn có thể đặt câu hỏi tự do trong ô tìm kiếm ở trên. Trợ lý phân tích sẽ trả lời dựa trên dữ liệu của bạn."
        type="info"
        showIcon
        icon={<InfoCircleOutlined />}
        style={{ marginTop: 20 }}
      />
    </Drawer>
  );
};

// Main Dashboard Component
const DashboardEnhanced = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewpoint, setViewpoint] = useState('Growth');
  const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState(() => {
    const saved = localStorage.getItem('customWidgets');
    return saved ? JSON.parse(saved) : defaultPresets.growth;
  });
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
  
  const handleSaveCustomization = (widgetIds) => {
    setActiveWidgets(widgetIds);
    localStorage.setItem('customWidgets', JSON.stringify(widgetIds));
  };
  
  const handleOpenInsights = () => {
    setAnnotationVisible(false);
    setInsightsVisible(true);
  };
  
  const handleOpenAnnotations = () => {
    setInsightsVisible(false);
    setAnnotationVisible(true);
  };
  
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
          <RangePicker 
            value={dateRange}
            onChange={setDateRange}
            size="middle"
            style={{ minWidth: 280 }}
          />
          <Dropdown overlay={notificationMenu} trigger={['click']}>
            <Badge count={3} size="small">
              <Button type="text" icon={<BellOutlined style={{ fontSize: 18 }} />} />
            </Badge>
          </Dropdown>
          <Button type="text" icon={<SettingOutlined style={{ fontSize: 18 }} />} />
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar style={{ backgroundColor: '#1890ff' }}>
                <UserOutlined />
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
          width={220}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            items={menuItems}
            style={{ borderRight: 0, marginTop: 8 }}
          />
        </Sider>
        
        {/* Main Content */}
        <Layout style={{ padding: '24px', background: '#f5f5f5' }}>
          <Content>
            {/* Page Header */}
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: '#262626' }}>
                Trang chủ
              </h1>
              <p style={{ color: '#8c8c8c', fontSize: 14, marginBottom: 20 }}>
                Tổng quan hiệu suất và cảnh báo vận hành
              </p>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <Segmented
                  options={[
                    { label: 'Growth', value: 'Growth', icon: <RiseOutlined /> },
                    { label: 'Account/Ops', value: 'Account/Ops', icon: <SettingOutlined /> },
                    { label: 'Management', value: 'Management', icon: <UserOutlined /> }
                  ]}
                  value={viewpoint}
                  onChange={handleViewpointChange}
                  size="large"
                />
                
                <Button 
                  icon={<EditOutlined />}
                  onClick={() => setCustomizeModalVisible(true)}
                  size="large"
                >
                  Tùy chỉnh trang chủ
                </Button>
                
                <Button 
                  icon={<EyeOutlined />}
                  size="large"
                  type="default"
                >
                  Xem lại mặc định
                </Button>
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
                >
                  <WidgetRenderer 
                    widgetId={widgetId} 
                    onAnnotationClick={handleOpenAnnotations}
                    onInsightsClick={handleOpenInsights}
                  />
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Layout>
      
      {/* Customization Modal with Drag & Drop */}
      <CustomizationModal
        visible={customizeModalVisible}
        onClose={() => setCustomizeModalVisible(false)}
        activeWidgets={activeWidgets}
        onSave={handleSaveCustomization}
      />
      
      {/* Enhanced Annotation Panel */}
      <AnnotationPanel
        visible={annotationVisible}
        onClose={() => setAnnotationVisible(false)}
        dateRange={dateRange}
      />
      
      {/* Enhanced Insights Panel */}
      <InsightsPanel
        visible={insightsVisible}
        onClose={() => setInsightsVisible(false)}
      />
    </Layout>
  );
};

export default DashboardEnhanced;


























