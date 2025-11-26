import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

// ========== MOCK DATA ==========
const KPI_OVERVIEW = {
  left: [
    { title: 'GMV ngày hôm qua (D-1)', value: '₫2.4B', delta: '+12.5%', trend: 'up', metric: 'GMV nhà bán' },
    { title: 'Số đơn ngày hôm qua', value: '1,247', delta: '+8.2%', trend: 'up', metric: 'Số đơn hàng' },
    { 
      title: 'GMV theo kênh', 
      value: '₫2.4B',
      breakdown: [
        { channel: 'Shopee', value: '₫1.2B', percent: '50%' },
        { channel: 'TikTok', value: '₫800M', percent: '33%' },
        { channel: 'Website', value: '₫400M', percent: '17%' }
      ],
      delta: '+10.3%',
      trend: 'up',
      metric: 'GMV nhà bán'
    },
    { title: 'AOV', value: '₫1,925k', delta: '+4.1%', trend: 'up', metric: 'AOV' }
  ],
  right: [
    { title: 'ROAS tổng (D-1)', value: '4.2x', delta: '-5.1%', trend: 'down', metric: 'ROAS' },
    { 
      title: 'Chi phí Ads hôm qua', 
      value: '₫580M', 
      delta: '+15.3%', 
      trend: 'up',
      metric: 'Chi phí thúc đẩy + Chi phí tiếp thị liên kết + Chi phí affiliate shop ads + Chi phí dịch vụ hiển thị'
    },
    { 
      title: 'SLA ngày hôm qua', 
      value: '94.2%',
      breakdown: [
        { warehouse: 'Kho Hà Nội', value: '96.5%' },
        { warehouse: 'Kho HCM', value: '92.8%' },
        { warehouse: 'Kho Đà Nẵng', value: '93.1%' }
      ],
      delta: '-2.1%',
      trend: 'down',
      metric: 'SLA lấy hàng + SLA giao hàng'
    },
    { title: '% đơn lỗi hôm qua', value: '3.2%', delta: '+0.8%', trend: 'up', metric: 'Tỷ lệ đơn lỗi' }
  ]
};

const ALERTS_ORDER = [
  {
    title: 'Tỷ lệ hủy tăng cao',
    metric: 'Tỷ lệ đơn hủy',
    value: '8.5%',
    delta: '+2.3%',
    trend: 'up',
    description: 'Tăng so với hôm trước (6.2%)'
  },
  {
    title: 'Tỷ lệ hoàn tăng',
    metric: 'Tỷ lệ đơn hoàn',
    value: '5.2%',
    delta: '+1.1%',
    trend: 'up',
    description: 'Tăng so với hôm trước (4.1%)'
  },
  {
    title: 'Đơn lỗi theo sàn tăng',
    metric: 'Số lượng đơn lỗi theo sàn',
    value: '42 đơn',
    delta: '+12 đơn',
    trend: 'up',
    description: 'Shopee: 25, TikTok: 12, Website: 5'
  }
];

const ALERTS_PRODUCT = [
  {
    title: 'Lượt truy cập gian hàng giảm',
    metric: 'Lượt truy cập',
    value: '12,450',
    delta: '-2,150 (-14.7%)',
    trend: 'down',
    description: 'Giảm mạnh so với hôm trước'
  },
  {
    title: 'Lượt nhấp vào sản phẩm giảm',
    metric: 'Lượt nhấp vào sản phẩm',
    value: '8,320',
    delta: '-1,230 (-12.9%)',
    trend: 'down',
    description: 'Tỷ lệ CTR giảm'
  },
  {
    title: 'Tỷ lệ chuyển đổi CR giảm',
    metric: 'Tỉ lệ chuyển đổi CR',
    value: '2.8%',
    delta: '-0.5% (-15.2%)',
    trend: 'down',
    description: 'Giảm từ 3.3% xuống 2.8%'
  },
  {
    title: 'AOV giảm nhẹ',
    metric: 'AOV',
    value: '₫1,925k',
    delta: '-₫45k (-2.3%)',
    trend: 'down',
    description: 'Cần theo dõi'
  }
];

const ALERTS_INVENTORY = [
  {
    title: 'SKU sắp hết hàng',
    metric: 'Cảnh báo hết hàng',
    value: '14 SKU',
    skus: ['SKU-045', 'SKU-078', 'SKU-123', 'SKU-200'],
    description: 'Tồn khả dụng < 50 đơn vị'
  },
  {
    title: 'Tồn lệch giữa UpS & sàn',
    metric: 'Tồn lệch',
    value: '8 SKU',
    skus: ['SKU-012', 'SKU-034', 'SKU-056'],
    description: 'Chênh lệch > 10% giữa hệ thống'
  },
  {
    title: 'Tồn khả dụng thấp cho campaign',
    metric: 'Số lượng tồn khả dụng',
    value: '3 SKU',
    skus: ['SKU-089', 'SKU-145'],
    description: 'Không đủ cho chiến dịch sắp tới'
  }
];

const ANALYTICS_TABS = [
  { key: 'sales', label: 'Bán hàng' },
  { key: 'product', label: 'Sản phẩm' },
  { key: 'ads', label: 'Ads & Marketing' },
  { key: 'orders', label: 'Đơn hàng' },
  { key: 'sla', label: 'SLA' },
  { key: 'inventory', label: 'Tồn kho' },
  { key: 'customer', label: 'Khách hàng' },
  { key: 'pricing', label: 'Giá & Khuyến mãi' }
];

// Chart data generators
const generateTrendData = (baseValue, trend) => {
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const values = days.map((_, i) => {
    const variation = trend === 'up' ? Math.random() * 0.1 + 0.05 : -(Math.random() * 0.1 + 0.05);
    return baseValue * (1 + variation * (i + 1));
  });
  return { labels: days, values };
};

// ========== COMPONENTS ==========
const KpiCard = ({ title, value, delta, trend, metric, breakdown }) => {
  const trendColor = trend === 'up' ? 'text-emerald-600' : 'text-rose-500';
  const trendIcon = trend === 'up' ? '↑' : '↓';
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">{title}</div>
          <div className="text-2xl font-semibold text-slate-900 mb-2">{value}</div>
          <div className={`text-sm font-medium flex items-center gap-1 ${trendColor}`}>
            <span>{trendIcon}</span>
            <span>{delta}</span>
          </div>
        </div>
        <div className="h-12 w-20 rounded bg-slate-100 flex items-center justify-center text-xs text-slate-400">
          Chart
        </div>
      </div>
      {breakdown && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-500 mb-2">Chi tiết:</div>
          {breakdown.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">{item.channel || item.warehouse}</span>
              <span className="font-medium text-slate-900">{item.value}</span>
              {item.percent && <span className="text-slate-500">({item.percent})</span>}
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 text-xs text-slate-400">Metric: {metric}</div>
    </div>
  );
};

const AlertCard = ({ title, metric, value, delta, trend, description, skus }) => {
  const trendColor = trend === 'up' ? 'text-rose-500' : 'text-amber-500';
  const trendIcon = trend === 'up' ? '↑' : '↓';
  
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="font-semibold text-slate-900 mb-1">{title}</div>
          <div className="text-xs text-slate-500 mb-2">Metric: {metric}</div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-lg font-semibold text-slate-900">{value}</span>
            {delta && (
              <span className={`text-sm font-medium flex items-center gap-1 ${trendColor}`}>
                <span>{trendIcon}</span>
                <span>{delta}</span>
              </span>
            )}
          </div>
          {description && <div className="text-sm text-slate-600">{description}</div>}
          {skus && (
            <div className="mt-2 flex flex-wrap gap-1">
              {skus.map((sku, idx) => (
                <span key={idx} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700">
                  {sku}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <button className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700">
        Xem chi tiết →
      </button>
    </div>
  );
};

const AlertGroup = ({ title, alerts }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
    <div className="space-y-3">
      {alerts.map((alert, idx) => (
        <AlertCard key={idx} {...alert} />
      ))}
    </div>
  </div>
);

const SalesChart = () => {
  const data = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        label: 'GMV nhà bán',
        data: [2.1, 2.3, 2.2, 2.4, 2.5, 2.3, 2.4],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'NMV nhà bán',
        data: [1.8, 2.0, 1.9, 2.1, 2.2, 2.0, 2.1],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Xu hướng GMV & NMV</h3>
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false, height: 300 }} />
    </div>
  );
};

const ProductChart = () => {
  const data = {
    labels: ['SKU-001', 'SKU-002', 'SKU-003', 'SKU-004', 'SKU-005'],
    datasets: [{
      label: 'Lượt nhấp sản phẩm',
      data: [1250, 980, 750, 620, 480],
      backgroundColor: 'rgba(59, 130, 246, 0.6)'
    }]
  };
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Top sản phẩm theo lượt nhấp</h3>
      <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

const AdsChart = () => {
  const data = {
    labels: ['Chi phí thúc đẩy net', 'Chi phí tiếp thị liên kết', 'Chi phí affiliate shop ads', 'Chi phí dịch vụ hiển thị'],
    datasets: [{
      data: [350, 120, 80, 30],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ]
    }]
  };
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Phân bổ Chi phí Ads</h3>
      <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

const OrdersChart = () => {
  const data = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        label: 'Tỷ lệ hủy',
        data: [6.2, 6.5, 7.1, 7.8, 8.2, 8.5, 8.5],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      },
      {
        label: 'Tỷ lệ hoàn',
        data: [4.1, 4.3, 4.5, 4.8, 5.0, 5.2, 5.2],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4
      }
    ]
  };
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Tỷ lệ Hủy & Hoàn</h3>
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

const SLAChart = () => {
  const data = {
    labels: ['Kho Hà Nội', 'Kho HCM', 'Kho Đà Nẵng'],
    datasets: [
      {
        label: 'SLA lấy hàng',
        data: [96.5, 92.8, 93.1],
        backgroundColor: 'rgba(59, 130, 246, 0.6)'
      },
      {
        label: 'SLA giao hàng',
        data: [94.2, 91.5, 92.0],
        backgroundColor: 'rgba(16, 185, 129, 0.6)'
      }
    ]
  };
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">SLA theo Kho</h3>
      <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

const InventoryChart = () => {
  const data = {
    labels: ['Tồn khả dụng', 'Tồn dự kiến CTKM', 'Tồn lệch'],
    datasets: [{
      data: [12450, 8500, 320],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ]
    }]
  };
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Tổng quan Tồn kho</h3>
      <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

const CustomerChart = () => {
  const data = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        label: 'Người mua mới',
        data: [450, 520, 480, 550, 580, 620, 650],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Người mua hiện tại',
        data: [320, 350, 340, 380, 400, 420, 440],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Người mua Mới vs Hiện tại</h3>
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

const AnalyticsContent = ({ activeTab }) => {
  const renderContent = () => {
    switch(activeTab) {
      case 'sales':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">GMV nhà bán</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">₫2.4B</div>
                <div className="text-sm text-emerald-600">+12.5% vs D-1</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">NMV nhà bán</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">₫2.1B</div>
                <div className="text-sm text-emerald-600">+11.2% vs D-1</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Số đơn hàng</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">1,247</div>
                <div className="text-sm text-emerald-600">+8.2% vs D-1</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tỉ lệ chuyển đổi CR</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">2.8%</div>
                <div className="text-sm text-rose-500">-0.5% vs D-1</div>
              </div>
            </div>
            <SalesChart />
          </div>
        );
      case 'product':
        return (
          <div className="space-y-6">
            <ProductChart />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tỷ lệ CTR</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">3.2%</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tỷ lệ CVR</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">2.8%</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Top sản phẩm</h3>
                <div className="text-sm text-slate-600">SKU-001, SKU-002, SKU-003</div>
              </div>
            </div>
          </div>
        );
      case 'ads':
        return (
          <div className="space-y-6">
            <AdsChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">% Chi phí thúc đẩy net/NMV</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">16.7%</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tổng chi phí thúc đẩy net</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">₫350M</div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <OrdersChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tỷ lệ đơn hủy</h3>
                <div className="text-3xl font-bold text-rose-500 mb-2">8.5%</div>
                <div className="text-sm text-rose-500">+2.3% vs D-1</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tỷ lệ đơn hoàn</h3>
                <div className="text-3xl font-bold text-amber-500 mb-2">5.2%</div>
                <div className="text-sm text-amber-500">+1.1% vs D-1</div>
              </div>
            </div>
          </div>
        );
      case 'sla':
        return (
          <div className="space-y-6">
            <SLAChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">SLA lấy hàng</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">94.2%</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">SLA giao hàng</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">92.6%</div>
              </div>
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div className="space-y-6">
            <InventoryChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Số lượng tồn khả dụng</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">12,450</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tồn dự kiến cho CTKM</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">8,500</div>
              </div>
            </div>
          </div>
        );
      case 'customer':
        return (
          <div className="space-y-6">
            <CustomerChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Người mua mới</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">650</div>
                <div className="text-sm text-emerald-600">+12.5% vs D-1</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Người mua hiện tại</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">440</div>
                <div className="text-sm text-emerald-600">+8.2% vs D-1</div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Nội dung đang được phát triển...</div>;
    }
  };
  
  return <div>{renderContent()}</div>;
};

// ========== MAIN COMPONENTS ==========
const Homepage = () => (
  <div className="space-y-8">
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Trang chủ</h1>
      <p className="text-slate-600">Tổng quan hiệu suất và cảnh báo vận hành</p>
    </header>

    {/* 1.1. Group "Tổng quan" */}
    <section>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Tổng quan</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột trái / Block trên */}
        <div className="space-y-4">
          {KPI_OVERVIEW.left.map((kpi, idx) => (
            <KpiCard key={idx} {...kpi} />
          ))}
        </div>
        
        {/* Cột phải / Block dưới */}
        <div className="space-y-4">
          {KPI_OVERVIEW.right.map((kpi, idx) => (
            <KpiCard key={idx} {...kpi} />
          ))}
        </div>
      </div>
    </section>

    {/* 1.2. Group "Alerts & Risks (Vận hành)" */}
    <section>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Alerts & Risks (Vận hành)</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AlertGroup title="Đơn hàng" alerts={ALERTS_ORDER} />
        <AlertGroup title="Sản phẩm" alerts={ALERTS_PRODUCT} />
        <AlertGroup title="Tồn kho" alerts={ALERTS_INVENTORY} />
      </div>
    </section>
  </div>
);

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('sales');
  
  return (
    <div className="space-y-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Phân tích</h1>
        <p className="text-slate-600">Deep-dive vào các domain chuyên sâu</p>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          {ANALYTICS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnalyticsContent activeTab={activeTab} />
    </div>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('homepage');
  
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                UpS
              </div>
              <div>
                <h1 className="font-bold text-slate-900">UpS Dashboard</h1>
                <p className="text-xs text-slate-500">Omnichannel Ecommerce Operations</p>
              </div>
            </div>
            <nav className="flex gap-2">
              <button
                onClick={() => setCurrentScreen('homepage')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentScreen === 'homepage'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => setCurrentScreen('analytics')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentScreen === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Phân tích
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentScreen === 'homepage' ? <Homepage /> : <Analytics />}
      </main>
    </div>
  );
};

export default App;


