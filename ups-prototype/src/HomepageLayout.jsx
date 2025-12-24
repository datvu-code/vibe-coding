import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Layout, Menu, Card, Statistic, Progress, Tabs, Timeline, Tag,
  Drawer, Modal, Popover, Tooltip, Button, List, Collapse, DatePicker,
  Badge, Avatar, Dropdown, Row, Col, Empty, Input, Form, Select, Space,
  Radio, message, Switch, Divider, Alert, Checkbox, Typography, Pagination
} from 'antd';
import {
  HomeOutlined, BarChartOutlined, ShoppingOutlined, InboxOutlined,
  CarOutlined, BellOutlined, SettingOutlined, UserOutlined, MenuFoldOutlined,
  MenuUnfoldOutlined, PlusOutlined, MinusOutlined, EditOutlined, DeleteOutlined,
  CaretRightOutlined, CaretDownOutlined,
  CommentOutlined, BulbOutlined, LineChartOutlined, ShareAltOutlined,
  DownloadOutlined, ArrowUpOutlined, ArrowDownOutlined, CloseOutlined,
  DragOutlined, SaveOutlined, AppstoreAddOutlined, EyeOutlined,
  RiseOutlined, FallOutlined, WarningOutlined, CheckCircleOutlined,
  SyncOutlined, StarOutlined, SearchOutlined, CalendarOutlined,
  TagsOutlined, InfoCircleOutlined, ThunderboltOutlined, ClockCircleOutlined,
  ExclamationCircleOutlined, FireOutlined, BookOutlined,
  ShopOutlined, ExportOutlined,
  ArrowsAltOutlined, LeftOutlined, EllipsisOutlined, LinkOutlined,
  RightOutlined, DownOutlined
} from '@ant-design/icons';
import { LineChart, Line as RechartLine, BarChart, Bar, PieChart, Pie as RechartPie, AreaChart, Area as RechartArea, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import dayjs from 'dayjs';
import { MdHome, MdShoppingBag, MdBarChart, MdInbox, MdSettings, MdAssignment } from 'react-icons/md';
import logoSvg from './assets/logo-dark.svg';
import { DndContext, closestCenter } from '@dnd-kit/core';
import OrderList from './OrderList';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createSnapModifier } from '@dnd-kit/modifiers';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

// ========== MOCK DATA ==========
// Mock data for different templates
const templateData = {
  'default': {
    kpiOverview: {
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
    },
    chartData: [
      { name: 'T2', value: 120 },
      { name: 'T3', value: 150 },
      { name: 'T4', value: 180 },
      { name: 'T5', value: 200 },
      { name: 'T6', value: 170 },
      { name: 'T7', value: 190 },
      { name: 'CN', value: 210 }
    ],
    pieData: [
      { name: 'Shopee', value: 50 },
      { name: 'TikTok', value: 30 },
      { name: 'Website', value: 20 }
    ]
  },
  'template-ceo': {
    kpiOverview: {
      col1: [
        {
          title: 'Tổng doanh thu tháng',
          value: '₫45.2B',
          change: '+18.5%',
          trend: 'up',
          subtext: 'vs tháng trước'
        },
        {
          title: 'Lợi nhuận ròng',
          value: '₫8.5B',
          change: '+22.3%',
          trend: 'up',
          subtext: 'vs tháng trước'
        }
      ],
      col2: [
        {
          title: 'Tổng số đơn tháng',
          value: '23,450',
          change: '+15.2%',
          trend: 'up',
          subtext: 'vs tháng trước'
        },
        {
          title: 'Tỷ suất lợi nhuận',
          value: '18.8%',
          change: '+2.1%',
          trend: 'up',
          subtext: 'vs tháng trước'
        }
      ],
      col3: [
        {
          title: 'Doanh thu theo kênh',
          breakdown: [
            { label: 'Shopee', value: '₫22.6B' },
            { label: 'TikTok', value: '₫15.1B' },
            { label: 'Website', value: '₫7.5B' }
          ]
        },
        {
          title: 'Chi phí vận hành',
          value: '₫12.8B',
          change: '+8.5%',
          trend: 'up',
          subtext: 'vs tháng trước'
        }
      ]
    },
    chartData: [
      { name: 'Tuần 1', value: 850 },
      { name: 'Tuần 2', value: 920 },
      { name: 'Tuần 3', value: 1100 },
      { name: 'Tuần 4', value: 1250 }
    ],
    pieData: [
      { name: 'Shopee', value: 50 },
      { name: 'TikTok', value: 33 },
      { name: 'Website', value: 17 }
    ]
  },
  'template-ecommerce-manager': {
    kpiOverview: {
      col1: [
        {
          title: 'GMV hôm nay',
          value: '₫2.8B',
          change: '+15.2%',
          trend: 'up',
          subtext: 'vs hôm qua'
        },
        {
          title: 'Conversion Rate',
          value: '3.2%',
          change: '+0.5%',
          trend: 'up',
          subtext: 'vs hôm qua'
        }
      ],
      col2: [
        {
          title: 'Số đơn hôm nay',
          value: '1,456',
          change: '+12.8%',
          trend: 'up',
          subtext: 'vs hôm qua'
        },
        {
          title: 'Cart Abandonment',
          value: '68.5%',
          change: '-2.3%',
          trend: 'down',
          subtext: 'vs hôm qua'
        }
      ],
      col3: [
        {
          title: 'Traffic theo nguồn',
          breakdown: [
            { label: 'Organic', value: '45%' },
            { label: 'Paid Ads', value: '35%' },
            { label: 'Direct', value: '20%' }
          ]
        },
        {
          title: 'Bounce Rate',
          value: '42.3%',
          change: '-1.8%',
          trend: 'down',
          subtext: 'vs hôm qua'
        }
      ]
    },
    chartData: [
      { name: 'T2', value: 280 },
      { name: 'T3', value: 320 },
      { name: 'T4', value: 290 },
      { name: 'T5', value: 350 },
      { name: 'T6', value: 380 },
      { name: 'T7', value: 420 },
      { name: 'CN', value: 450 }
    ],
    pieData: [
      { name: 'Organic', value: 45 },
      { name: 'Paid Ads', value: 35 },
      { name: 'Direct', value: 20 }
    ]
  },
  'template-media': {
    kpiOverview: {
      col1: [
        {
          title: 'Chi tiêu Media hôm nay',
          value: '₫850M',
          change: '+22.5%',
          trend: 'up',
          subtext: 'vs hôm qua'
        },
        {
          title: 'ROAS Media',
          value: '5.8x',
          change: '+0.8x',
          trend: 'up',
          subtext: 'vs hôm qua'
        }
      ],
      col2: [
        {
          title: 'Impressions',
          value: '2.5M',
          change: '+18.2%',
          trend: 'up',
          subtext: 'vs hôm qua'
        },
        {
          title: 'CTR',
          value: '2.8%',
          change: '+0.3%',
          trend: 'up',
          subtext: 'vs hôm qua'
        }
      ],
      col3: [
        {
          title: 'Chi tiêu theo platform',
          breakdown: [
            { label: 'Facebook', value: '₫350M' },
            { label: 'Google', value: '₫280M' },
            { label: 'TikTok', value: '₫220M' }
          ]
        },
        {
          title: 'CPC trung bình',
          value: '₫3,450',
          change: '-5.2%',
          trend: 'down',
          subtext: 'vs hôm qua'
        }
      ]
    },
    chartData: [
      { name: 'T2', value: 750 },
      { name: 'T3', value: 820 },
      { name: 'T4', value: 780 },
      { name: 'T5', value: 900 },
      { name: 'T6', value: 950 },
      { name: 'T7', value: 1000 },
      { name: 'CN', value: 1050 }
    ],
    pieData: [
      { name: 'Facebook', value: 41 },
      { name: 'Google', value: 33 },
      { name: 'TikTok', value: 26 }
    ]
  },
  'template-marketing': {
    kpiOverview: {
      col1: [
        {
          title: 'Marketing ROI',
          value: '4.5x',
          change: '+0.6x',
          trend: 'up',
          subtext: 'vs tháng trước'
        },
        {
          title: 'CAC',
          value: '₫125K',
          change: '-8.2%',
          trend: 'down',
          subtext: 'vs tháng trước'
        }
      ],
      col2: [
        {
          title: 'Lead Generated',
          value: '8,450',
          change: '+25.3%',
          trend: 'up',
          subtext: 'vs tháng trước'
        },
        {
          title: 'Email Open Rate',
          value: '28.5%',
          change: '+3.2%',
          trend: 'up',
          subtext: 'vs tháng trước'
        }
      ],
      col3: [
        {
          title: 'Traffic theo campaign',
          breakdown: [
            { label: 'Brand Campaign', value: '35%' },
            { label: 'Product Launch', value: '28%' },
            { label: 'Seasonal', value: '37%' }
          ]
        },
        {
          title: 'Social Engagement',
          value: '12.5K',
          change: '+18.5%',
          trend: 'up',
          subtext: 'vs tháng trước'
        }
      ]
    },
    chartData: [
      { name: 'Tuần 1', value: 420 },
      { name: 'Tuần 2', value: 480 },
      { name: 'Tuần 3', value: 520 },
      { name: 'Tuần 4', value: 580 }
    ],
    pieData: [
      { name: 'Brand Campaign', value: 35 },
      { name: 'Product Launch', value: 28 },
      { name: 'Seasonal', value: 37 }
    ]
  },
  'template-accounting': {
    kpiOverview: {
      col1: [
        {
          title: 'Doanh thu thuần',
          value: '₫42.8B',
          change: '+12.3%',
          trend: 'up',
          subtext: 'vs tháng trước'
        },
        {
          title: 'Chi phí hàng bán',
          value: '₫28.5B',
          change: '+8.5%',
          trend: 'up',
          subtext: 'vs tháng trước'
        }
      ],
      col2: [
        {
          title: 'Lợi nhuận gộp',
          value: '₫14.3B',
          change: '+20.1%',
          trend: 'up',
          subtext: 'vs tháng trước'
        },
        {
          title: 'Biên lợi nhuận',
          value: '33.4%',
          change: '+2.1%',
          trend: 'up',
          subtext: 'vs tháng trước'
        }
      ],
      col3: [
        {
          title: 'Chi phí theo loại',
          breakdown: [
            { label: 'Hàng hóa', value: '₫28.5B' },
            { label: 'Vận hành', value: '₫12.8B' },
            { label: 'Marketing', value: '₫8.2B' }
          ]
        },
        {
          title: 'Dòng tiền ròng',
          value: '₫9.8B',
          change: '+15.6%',
          trend: 'up',
          subtext: 'vs tháng trước'
        }
      ]
    },
    chartData: [
      { name: 'T1', value: 1200 },
      { name: 'T2', value: 1350 },
      { name: 'T3', value: 1280 },
      { name: 'T4', value: 1420 },
      { name: 'T5', value: 1500 },
      { name: 'T6', value: 1450 },
      { name: 'T7', value: 1600 }
    ],
    pieData: [
      { name: 'Hàng hóa', value: 58 },
      { name: 'Vận hành', value: 26 },
      { name: 'Marketing', value: 16 }
    ]
  }
};

// Default kpiOverview for backward compatibility
const kpiOverview = templateData['default'].kpiOverview;

const progressGoals = [
  { title: 'GMV tháng hiện tại vs mục tiêu', current: '₫45.2B', target: '₫50B', percent: 90.4, status: 'Hoàn thành' },
  { title: 'Số đơn tháng hiện tại vs mục tiêu', current: '23,450', target: '25,000', percent: 93.8, status: 'Hoàn thành' },
  { title: 'Ngân sách Ads đã dùng vs mục tiêu', current: '₫12.5B', target: '₫15B', percent: 83.3, status: 'Đã dùng' }
];

const alertsData = {
  errors: [
    { id: 1, title: 'SKU quá trọng sắp hết', value: '8', unit: 'SKU', severity: 'high', metric: 'Tồn kho' },
    { id: 2, title: 'Đơn bị lỗi', value: '8', unit: 'đơn', severity: 'high', metric: 'Đơn hàng' },
    { id: 3, title: '% Tỷ lệ hủy tăng', value: '12.5', unit: '%', severity: 'high', metric: 'Sản phẩm' },
    { id: 4, title: '% CR hiện tại', value: '2.5', unit: '%', severity: 'high', metric: 'Sản phẩm' },
    { id: 5, title: 'SKU vượt phạm vi', value: '3', unit: 'SKU', severity: 'high', metric: 'Tồn kho' }
  ],
  warnings: [
    { id: 6, title: 'SKU sắp hết hàng', value: '14', unit: 'SKU', severity: 'medium', metric: 'Tồn kho' },
    { id: 7, title: 'Traffic giảm', value: '8', unit: '%', severity: 'medium', metric: 'Sản phẩm' },
    { id: 8, title: 'Chi phí tăng', value: '15.3', unit: '%', severity: 'medium', metric: 'Tồn kho' }
  ]
};

// Guides for each alert
const alertGuides = {
  1: [ // SKU quá trọng sắp hết
    { id: 1, title: 'Hướng dẫn xử lý SKU quá trọng', category: 'Tồn kho', type: 'guide' },
    { id: 2, title: 'Case study: Tối ưu quản lý SKU quá trọng', category: 'Case Study', type: 'case-study' }
  ],
  2: [ // Đơn bị lỗi
    { id: 3, title: 'Cách khắc phục đơn hàng bị lỗi', category: 'Đơn hàng', type: 'guide' },
    { id: 4, title: 'Troubleshooting đơn hàng hệ thống', category: 'Đơn hàng', type: 'guide' }
  ],
  3: [ // Tỷ lệ hủy tăng
    { id: 5, title: 'Giảm tỷ lệ hủy đơn hiệu quả', category: 'Sản phẩm', type: 'case-study' },
    { id: 6, title: 'Phân tích nguyên nhân hủy đơn', category: 'Sản phẩm', type: 'guide' }
  ],
  4: [ // CR hiện tại
    { id: 7, title: 'Tối ưu Conversion Rate', category: 'Sản phẩm', type: 'guide' },
    { id: 8, title: 'Best practices cải thiện CR', category: 'Sản phẩm', type: 'case-study' }
  ],
  5: [ // SKU vượt phạm vi
    { id: 9, title: 'Quản lý SKU vượt phạm vi', category: 'Tồn kho', type: 'guide' }
  ],
  6: [ // SKU sắp hết hàng
    { id: 10, title: 'Cảnh báo và xử lý SKU sắp hết hàng', category: 'Đơn hàng', type: 'guide' },
    { id: 11, title: 'Tự động hóa cảnh báo tồn kho', category: 'Đơn hàng', type: 'guide' }
  ],
  7: [ // Traffic giảm
    { id: 12, title: 'Phân tích và cải thiện Traffic', category: 'Sản phẩm', type: 'case-study' },
    { id: 13, title: 'Chiến lược tăng Traffic hiệu quả', category: 'Sản phẩm', type: 'guide' }
  ],
  8: [ // Chi phí tăng
    { id: 14, title: 'Kiểm soát chi phí tồn kho', category: 'Tồn kho', type: 'guide' },
    { id: 15, title: 'Tối ưu chi phí vận hành', category: 'Tồn kho', type: 'case-study' }
  ]
};


const contentItems = {
  insights: [ // Case study & Blog
    {
      id: 1,
      title: 'Case study: Tăng ROAS 32% với livestream',
      date: '3 ngày trước',
      category: 'Case Study',
      icon: 'chart',
      color: '#52C41A'
    },
    {
      id: 2,
      title: 'Phân tích xu hướng mua sắm Q4/2025',
      date: '5 ngày trước',
      category: 'Blog',
      icon: 'bulb',
      color: '#1890FF'
    },
    {
      id: 3,
      title: 'Ebook tối ưu phí lưu kho cho D2C',
      date: '2 tuần trước',
      category: 'Tài liệu',
      icon: 'book',
      color: '#722ED1'
    }
  ],
  guides: [ // Guides & Tutorials
    {
      id: 4,
      title: 'Checklist chuẩn bị Flash Sale 12.12',
      date: '1 tuần trước',
      category: 'Hướng dẫn',
      icon: 'check',
      color: '#FA8C16'
    },
    {
      id: 5,
      title: 'Hướng dẫn thiết lập Automation Hub',
      date: '1 tuần trước',
      category: 'Tutorial',
      icon: 'play',
      color: '#13C2C2'
    },
    {
      id: 6,
      title: 'Cách sử dụng Analytics Intelligence',
      date: '2 tuần trước',
      category: 'Tutorial',
      icon: 'rocket',
      color: '#EB2F96'
    }
  ]
};

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


// ========== TEMPLATE & METRICS SYSTEM ==========

// All Available Metrics Pool
const allMetricsPool = [
  // Sales Domain
  { id: 'gmv-yesterday', name: 'GMV ngày hôm qua', domain: 'Sales', value: '₫2.4B', change: '+12.5%', trend: 'up', changePrevPeriod: '+8.3%', trendPrevPeriod: 'up' },
  { id: 'orders-yesterday', name: 'Số đơn ngày hôm qua', domain: 'Sales', value: '1,247', change: '+8.2%', trend: 'up', changePrevPeriod: '+5.7%', trendPrevPeriod: 'up' },
  { id: 'aov', name: 'AOV', domain: 'Sales', value: '₫1,925', change: '+3.8%', trend: 'up', changePrevPeriod: '+2.1%', trendPrevPeriod: 'up' },
  { id: 'revenue-net', name: 'Doanh thu thuần', domain: 'Sales', value: '₫2.1B', change: '+10.2%', trend: 'up', changePrevPeriod: '+7.5%', trendPrevPeriod: 'up' },
  {
    id: 'gmv-channel', name: 'GMV theo kênh', domain: 'Sales', breakdown: [
      { label: 'Shopee', value: '₫1.2B' },
      { label: 'TikTok', value: '₫800M' },
      { label: 'Website', value: '₫400M' }
    ]
  },

  // Ads Domain
  { id: 'roas', name: 'ROAS tổng ngày hôm qua', domain: 'Ads', value: '4.2x', change: '-5.1%', trend: 'down', changePrevPeriod: '-3.2%', trendPrevPeriod: 'down' },
  { id: 'ads-cost', name: 'Chi phí Ads hôm qua', domain: 'Ads', value: '₫571M', change: '+15.3%', trend: 'up', changePrevPeriod: '+12.8%', trendPrevPeriod: 'up' },
  { id: 'cpc', name: 'CPC trung bình', domain: 'Ads', value: '₫3,500', change: '-2.1%', trend: 'down', changePrevPeriod: '-1.5%', trendPrevPeriod: 'down' },
  { id: 'ctr', name: 'CTR', domain: 'Ads', value: '2.8%', change: '+0.5%', trend: 'up', changePrevPeriod: '+0.3%', trendPrevPeriod: 'up' },
  { id: 'ad-impression', name: 'Lượt hiển thị Ads', domain: 'Ads', value: '2.4M', change: '+18.3%', trend: 'up', changePrevPeriod: '+15.2%', trendPrevPeriod: 'up' },

  // Ops Domain
  { id: 'fulfillment-rate', name: 'Tỷ lệ hoàn thành đơn', domain: 'Ops', value: '94.5%', change: '+1.2%', trend: 'up', changePrevPeriod: '+0.8%', trendPrevPeriod: 'up' },
  { id: 'cancel-rate', name: 'Tỷ lệ hủy đơn', domain: 'Ops', value: '3.2%', change: '-0.5%', trend: 'down', changePrevPeriod: '-0.3%', trendPrevPeriod: 'down' },
  { id: 'return-rate', name: 'Tỷ lệ trả hàng', domain: 'Ops', value: '2.1%', change: '-0.3%', trend: 'down', changePrevPeriod: '-0.2%', trendPrevPeriod: 'down' },
  { id: 'avg-ship-time', name: 'Thời gian giao TB', domain: 'Ops', value: '2.8 ngày', change: '-0.2', trend: 'down', changePrevPeriod: '-0.1', trendPrevPeriod: 'down' },

  // Inventory Domain
  { id: 'stock-value', name: 'Giá trị tồn kho', domain: 'Inventory', value: '₫15.3B', change: '+5.2%', trend: 'up', changePrevPeriod: '+4.1%', trendPrevPeriod: 'up' },
  { id: 'sku-count', name: 'Số SKU', domain: 'Inventory', value: '1,234', change: '+12', trend: 'up', changePrevPeriod: '+8', trendPrevPeriod: 'up' },
  { id: 'turnover-rate', name: 'Vòng quay kho', domain: 'Inventory', value: '8.5x', change: '+0.3x', trend: 'up', changePrevPeriod: '+0.2x', trendPrevPeriod: 'up' },
  { id: 'out-of-stock', name: 'SKU hết hàng', domain: 'Inventory', value: '23', change: '+5', trend: 'up', changePrevPeriod: '+3', trendPrevPeriod: 'up' },

  // Accounting Domain
  { id: 'profit', name: 'Lợi nhuận', domain: 'Kế toán', value: '₫425M', change: '+8.7%', trend: 'up', changePrevPeriod: '+6.5%', trendPrevPeriod: 'up' },
  { id: 'margin', name: 'Margin', domain: 'Kế toán', value: '18.5%', change: '+1.2%', trend: 'up', changePrevPeriod: '+0.9%', trendPrevPeriod: 'up' },
  { id: 'cogs', name: 'Giá vốn hàng bán', domain: 'Kế toán', value: '₫1.8B', change: '+10.5%', trend: 'up', changePrevPeriod: '+8.2%', trendPrevPeriod: 'up' },

  // Customer Domain
  { id: 'new-customers', name: 'Khách hàng mới', domain: 'Customer', value: '347', change: '+12.3%', trend: 'up', changePrevPeriod: '+9.8%', trendPrevPeriod: 'up' },
  { id: 'repeat-rate', name: 'Tỷ lệ mua lại', domain: 'Customer', value: '28.5%', change: '+2.1%', trend: 'up', changePrevPeriod: '+1.5%', trendPrevPeriod: 'up' },
  { id: 'customer-ltv', name: 'LTV trung bình', domain: 'Customer', value: '₫4.2M', change: '+8.5%', trend: 'up', changePrevPeriod: '+6.2%', trendPrevPeriod: 'up' }
];

// Default Templates
const defaultTemplates = [
  {
    id: 'growth-default',
    name: 'Growth Default',
    isDefault: true,
    metrics: ['gmv-yesterday', 'orders-yesterday', 'aov', 'roas', 'gmv-channel', 'ads-cost']
  },
  {
    id: 'account-default',
    name: 'Account Default',
    isDefault: true,
    metrics: ['revenue-net', 'profit', 'margin', 'cogs', 'ads-cost', 'orders-yesterday']
  },
  {
    id: 'inventory-focus',
    name: 'Tập trung Kho hàng',
    isDefault: true,
    metrics: ['stock-value', 'sku-count', 'turnover-rate', 'out-of-stock', 'gmv-yesterday', 'orders-yesterday']
  },
  {
    id: 'ops-focus',
    name: 'Tập trung Ops',
    isDefault: true,
    metrics: ['fulfillment-rate', 'cancel-rate', 'return-rate', 'avg-ship-time', 'orders-yesterday', 'gmv-yesterday']
  }
];

const templatePreviewKeyMap = {
  'growth-default': 'default',
  'account-default': 'template-accounting',
  'inventory-focus': 'default',
  'ops-focus': 'default'
};

// ========== COMPONENTS ==========

// Vận hành Card - Wafer silicon patterns and CPU microchip architecture with skeleton grid lines and circuit paths
const VanHanhCard = () => {
  return (
    <Card
      style={{
        background: '#FFFFFF',
        border: '1px solid #E1E3E5',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: 0,
        transition: 'all 0.2s ease',
        minHeight: '280px'
      }}
      bodyStyle={{ padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: 0 }}
      hoverable
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Wafer Silicon Pattern with CPU Microchip Architecture Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background: '#FFFFFF',
        pointerEvents: 'none'
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.08 }}>
          <defs>
            <pattern id="waferSilicon1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#D0D0D0" strokeWidth="0.4" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="#D0D0D0" strokeWidth="0.4" />
              <circle cx="50" cy="50" r="27" fill="none" stroke="#D0D0D0" strokeWidth="0.4" />
              <circle cx="50" cy="50" r="18" fill="none" stroke="#D0D0D0" strokeWidth="0.4" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="#D0D0D0" strokeWidth="0.4" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="#D0D0D0" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waferSilicon1)" />

          <g transform="translate(15%, 25%)">
            <rect x="-70" y="-50" width="140" height="100" fill="none" stroke="#C0C0C0" strokeWidth="1" rx="4" />
            <path d="M -50 -35 L 50 -35 M -50 -20 L 50 -20 M -50 -5 L 50 -5 M -50 10 L 50 10 M -50 25 L 50 25"
              stroke="#D0D0D0" strokeWidth="0.5" />
            <path d="M -35 -50 L -35 50 M -10 -50 L -10 50 M 15 -50 L 15 50 M 40 -50 L 40 50"
              stroke="#D0D0D0" strokeWidth="0.5" />
            <path d="M -70 -30 L -50 -30 L -50 -20 L 50 -20 L 50 -10 L 70 -10"
              stroke="#B0B0B0" strokeWidth="0.6" fill="none" />
            <path d="M -70 10 L -50 10 L -50 20 L 50 20 L 50 30 L 70 30"
              stroke="#B0B0B0" strokeWidth="0.6" fill="none" />
          </g>
        </svg>
      </div>

      {/* Stacked Cards Visual Metaphor */}
      <div style={{
        position: 'relative',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        zIndex: 1,
        overflow: 'visible',
        flexShrink: 0
      }}>
        {/* Bottom card - peeking right */}
        <div style={{
          position: 'absolute',
          right: '20%',
          width: '60px',
          height: '80px',
          background: 'linear-gradient(135deg, #FFE0E6 0%, #FFB3C1 100%)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
          transform: 'rotate(-5deg)'
        }} />

        {/* Middle card - peeking left */}
        <div style={{
          position: 'absolute',
          left: '20%',
          width: '60px',
          height: '80px',
          background: 'linear-gradient(135deg, #FFF4E6 0%, #FFE0B2 100%)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 2,
          transform: 'rotate(5deg)'
        }} />

        {/* Top card - main placeholder */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '90px',
          background: '#FFFFFF',
          border: '2px dashed #D0D0D0',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <MdShoppingBag style={{ fontSize: 24, color: '#B0B0B0', marginBottom: '4px' }} />
          <div style={{
            width: '50px',
            height: '3px',
            background: '#E0E0E0',
            borderRadius: '2px',
            marginTop: '4px'
          }} />
        </div>
      </div>

      {/* Text Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#2b2b2b',
            margin: 0,
            marginBottom: '8px',
            lineHeight: 1.4
          }}>
            Vận hành
          </h3>
          <p style={{
            fontSize: 14,
            color: '#6D7175',
            margin: 0,
            marginBottom: '20px',
            lineHeight: 1.5
          }}>
            Quản lý đơn hàng và vận hành hệ thống
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
          <Button
            type="default"
            style={{
              background: '#FFFFFF',
              borderColor: '#D0D0D0',
              color: '#2b2b2b',
              borderRadius: '6px',
              height: '36px',
              padding: '0 16px',
              fontWeight: 500,
              fontSize: 14
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveNavItem('quan-ly-don-hang');
              setExpandedSubNav('van-hanh');
              setActiveModule('orders');
            }}
          >
            Quản lý đơn hàng
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Quản trị Card - Wafer pattern and CPU chip structure with geometric lines and skeleton circuits
const QuanTriCard = () => {
  return (
    <Card
      style={{
        background: '#FFFFFF',
        border: '1px solid #E1E3E5',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: 0,
        transition: 'all 0.2s ease',
        minHeight: '280px'
      }}
      bodyStyle={{ padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: 0 }}
      hoverable
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Wafer Pattern and CPU Chip Structure Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background: '#FFFFFF',
        pointerEvents: 'none'
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.08 }}>
          <defs>
            <pattern id="waferPattern2" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="35" fill="none" stroke="#D0D0D0" strokeWidth="0.4" />
              <circle cx="40" cy="40" r="28" fill="none" stroke="#D0D0D0" strokeWidth="0.4" />
              <circle cx="40" cy="40" r="21" fill="none" stroke="#D0D0D0" strokeWidth="0.4" />
              <circle cx="40" cy="40" r="14" fill="none" stroke="#D0D0D0" strokeWidth="0.4" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="#D0D0D0" strokeWidth="0.4" />
              <line x1="5" y1="40" x2="75" y2="40" stroke="#D0D0D0" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waferPattern2)" />

          <g transform="translate(20%, 30%)">
            <rect x="-60" y="-45" width="120" height="90" fill="none" stroke="#C0C0C0" strokeWidth="1" rx="3" />
            <path d="M -40 -30 L 40 -30 M -40 -15 L 40 -15 M -40 0 L 40 0 M -40 15 L 40 15 M -40 30 L 40 30"
              stroke="#D0D0D0" strokeWidth="0.5" />
            <path d="M -30 -45 L -30 45 M -15 -45 L -15 45 M 0 -45 L 0 45 M 15 -45 L 15 45 M 30 -45 L 30 45"
              stroke="#D0D0D0" strokeWidth="0.5" />
            <path d="M -50 -40 L -30 -20 M 30 -20 L 50 -40 M -50 40 L -30 20 M 30 20 L 50 40"
              stroke="#C0C0C0" strokeWidth="0.4" />
            <circle cx="-60" cy="-30" r="1.5" fill="#B0B0B0" />
            <circle cx="-60" cy="0" r="1.5" fill="#B0B0B0" />
            <circle cx="-60" cy="30" r="1.5" fill="#B0B0B0" />
            <circle cx="60" cy="-30" r="1.5" fill="#B0B0B0" />
            <circle cx="60" cy="0" r="1.5" fill="#B0B0B0" />
            <circle cx="60" cy="30" r="1.5" fill="#B0B0B0" />
          </g>
        </svg>
      </div>

      {/* Stacked Cards Visual Metaphor */}
      <div style={{
        position: 'relative',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        zIndex: 1,
        overflow: 'visible',
        flexShrink: 0
      }}>
        {/* Bottom card - peeking right */}
        <div style={{
          position: 'absolute',
          right: '20%',
          width: '70px',
          height: '90px',
          background: 'linear-gradient(135deg, #E3F2FD 0%, #90CAF9 100%)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
          transform: 'rotate(-5deg)'
        }} />

        {/* Middle card - peeking left */}
        <div style={{
          position: 'absolute',
          left: '20%',
          width: '70px',
          height: '90px',
          background: 'linear-gradient(135deg, #FFF3E0 0%, #FFCC80 100%)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 2,
          transform: 'rotate(5deg)'
        }} />

        {/* Top card - main placeholder */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '90px',
          background: '#FFFFFF',
          border: '2px dashed #D0D0D0',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <MdBarChart style={{ fontSize: 24, color: '#B0B0B0', marginBottom: '4px' }} />
          <div style={{
            width: '50px',
            height: '3px',
            background: '#E0E0E0',
            borderRadius: '2px',
            marginTop: '4px'
          }} />
        </div>
      </div>

      {/* Text Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontSize: 20,
          fontWeight: 600,
          color: '#2b2b2b',
          margin: 0,
          marginBottom: '8px',
          lineHeight: 1.4
        }}>
          Quản trị
        </h3>
        <p style={{
          fontSize: 14,
          color: '#6D7175',
          margin: 0,
          marginBottom: '16px',
          lineHeight: 1.5
        }}>
          Báo cáo và phân tích dữ liệu
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            type="default"
            style={{
              background: '#FFFFFF',
              borderColor: '#D0D0D0',
              color: '#2b2b2b',
              borderRadius: '6px',
              height: '36px',
              padding: '0 16px',
              fontWeight: 500,
              fontSize: 14
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveNavItem('bao-cao-van-hanh');
              setExpandedSubNav('quan-tri');
              setActiveModule('home');
            }}
          >
            Báo cáo vận hành
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Cài đặt Card - Control panel pattern with geometric grid, representing configuration and system management
const CaiDatCard = () => {
  return (
    <Card
      style={{
        background: '#FFFFFF',
        border: '1px solid #E1E3E5',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: 0,
        transition: 'all 0.2s ease',
        minHeight: '280px'
      }}
      bodyStyle={{ padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: 0 }}
      hoverable
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Control Panel Pattern - Geometric grid representing settings/configuration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background: '#FFFFFF',
        pointerEvents: 'none'
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.08 }}>
          <defs>
            <pattern id="controlGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="60" height="60" fill="none" stroke="#D0D0D0" strokeWidth="0.5" />
              <line x1="0" y1="30" x2="60" y2="30" stroke="#D0D0D0" strokeWidth="0.5" />
              <line x1="30" y1="0" x2="30" y2="60" stroke="#D0D0D0" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="8" fill="none" stroke="#D0D0D0" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="4" fill="none" stroke="#D0D0D0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#controlGrid)" />

          <g transform="translate(20%, 30%)">
            <rect x="-60" y="-45" width="120" height="90" fill="none" stroke="#C0C0C0" strokeWidth="1" rx="4" />
            <path d="M -40 -30 L 40 -30 M -40 -15 L 40 -15 M -40 0 L 40 0 M -40 15 L 40 15 M -40 30 L 40 30"
              stroke="#D0D0D0" strokeWidth="0.5" />
            <path d="M -30 -45 L -30 45 M -10 -45 L -10 45 M 10 -45 L 10 45 M 30 -45 L 30 45"
              stroke="#D0D0D0" strokeWidth="0.5" />
            <circle cx="-40" cy="-20" r="3" fill="#B0B0B0" />
            <circle cx="0" cy="-20" r="3" fill="#B0B0B0" />
            <circle cx="40" cy="-20" r="3" fill="#B0B0B0" />
            <circle cx="-40" cy="20" r="3" fill="#B0B0B0" />
            <circle cx="0" cy="20" r="3" fill="#B0B0B0" />
            <circle cx="40" cy="20" r="3" fill="#B0B0B0" />
          </g>
        </svg>
      </div>

      {/* Stacked Cards Visual Metaphor */}
      <div style={{
        position: 'relative',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        zIndex: 1,
        overflow: 'visible',
        flexShrink: 0
      }}>
        {/* Bottom card - peeking right */}
        <div style={{
          position: 'absolute',
          right: '20%',
          width: '70px',
          height: '90px',
          background: 'linear-gradient(135deg, #F3E5F5 0%, #CE93D8 100%)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
          transform: 'rotate(-5deg)'
        }} />

        {/* Middle card - peeking left */}
        <div style={{
          position: 'absolute',
          left: '20%',
          width: '70px',
          height: '90px',
          background: 'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 2,
          transform: 'rotate(5deg)'
        }} />

        {/* Top card - main placeholder */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '90px',
          background: '#FFFFFF',
          border: '2px dashed #D0D0D0',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <MdSettings style={{ fontSize: 24, color: '#B0B0B0', marginBottom: '4px' }} />
          <div style={{
            width: '50px',
            height: '3px',
            background: '#E0E0E0',
            borderRadius: '2px',
            marginTop: '4px'
          }} />
        </div>
      </div>

      {/* Text Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontSize: 20,
          fontWeight: 600,
          color: '#2b2b2b',
          margin: 0,
          marginBottom: '8px',
          lineHeight: 1.4
        }}>
          Cài đặt
        </h3>
        <p style={{
          fontSize: 14,
          color: '#6D7175',
          margin: 0,
          marginBottom: '16px',
          lineHeight: 1.5
        }}>
          Cấu hình và quản lý hệ thống
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            type="default"
            style={{
              background: '#FFFFFF',
              borderColor: '#D0D0D0',
              color: '#2b2b2b',
              borderRadius: '6px',
              height: '36px',
              padding: '0 16px',
              fontWeight: 500,
              fontSize: 14
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveNavItem('cai-dat');
              setExpandedSubNav(null);
              setActiveModule('workspace-settings');
            }}
          >
            Kết nối gian hàng
          </Button>
        </div>
      </div>
    </Card>
  );
};

// KPI Overview Card
const KPICard = ({ title, value, change, trend, changePrevPeriod, trendPrevPeriod, subtext, breakdown }) => (
  <Card
    size="small"
    style={{
      height: '100%',
      borderRadius: 12,
      background: '#F7F7F7',
      border: 'none',
      boxShadow: 'none'
    }}
    bodyStyle={{ padding: '20px 16px' }}
  >
    {breakdown ? (
      <div>
        <div style={{ fontSize: 13, color: '#2b2b2b', marginBottom: 12, fontWeight: 500 }}>{title}</div>
        {breakdown.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 13, color: '#2b2b2b' }}>{item.label}:</Text>
            <Text strong style={{ fontSize: 13, color: '#2b2b2b' }}>{item.value}</Text>
          </div>
        ))}
      </div>
    ) : (
      <div style={{ position: 'relative', minHeight: '100px' }}>
        {/* Title at top */}
        <div style={{
          fontSize: 13,
          color: '#2b2b2b',
          marginBottom: 12,
          fontWeight: 500,
          lineHeight: 1.4
        }}>
          {title}
        </div>

        {/* Large value in center */}
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          color: '#2b2b2b',
          marginBottom: 8,
          lineHeight: 1.2
        }}>
          {value}
        </div>

        {/* First row: "So với hôm qua" (left) + Change% (right) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 8
        }}>
          {/* Left: "So với hôm qua" text */}
          <div style={{
            fontSize: 12,
            color: '#6D7175'
          }}>
            So với hôm qua
          </div>

          {/* Right: Change percentage */}
          {change && (
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: trend === 'up' ? '#008060' : '#D72C0D',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              {change}{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '—'}
            </div>
          )}
        </div>

        {/* Second row: "So với kỳ trước" (left) + Change% (right) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 6
        }}>
          {/* Left: "So với kỳ trước" text */}
          <Tooltip title="So với cùng kỳ tháng trước">
            <div style={{
              fontSize: 12,
              color: '#6D7175',
              borderBottom: '1px dotted #6D7175',
              cursor: 'help',
              display: 'inline-block',
              paddingBottom: '1px'
            }}>
              So với kỳ trước
            </div>
          </Tooltip>

          {/* Right: Change percentage */}
          {changePrevPeriod && (
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: trendPrevPeriod === 'up' ? '#008060' : '#D72C0D',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              {changePrevPeriod}{trendPrevPeriod === 'up' ? '↑' : trendPrevPeriod === 'down' ? '↓' : '—'}
            </div>
          )}
        </div>
      </div>
    )}
  </Card>
);

// Custom Sparkles Icon
const SparklesIcon = ({ style }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M5.58115 0.0946875L6.08303 1.48844C6.64053 3.03531 7.85865 4.25344 9.40553 4.81094L10.7993 5.31281C10.9249 5.35844 10.9249 5.53656 10.7993 5.58156L9.40553 6.08344C7.85865 6.64094 6.64053 7.85906 6.08303 9.40594L5.58115 10.7997C5.53553 10.9253 5.3574 10.9253 5.3124 10.7997L4.81053 9.40594C4.25303 7.85906 3.0349 6.64094 1.48803 6.08344L0.0942798 5.58156C-0.0313452 5.53594 -0.0313452 5.35781 0.0942798 5.31281L1.48803 4.81094C3.0349 4.25344 4.25303 3.03531 4.81053 1.48844L5.3124 0.0946875C5.3574 -0.0315625 5.53553 -0.0315625 5.58115 0.0946875Z" fill="white" />
    <path d="M11.6368 6.58637L11.8912 7.29199C12.1737 8.07512 12.7906 8.69199 13.5737 8.97449L14.2793 9.22887C14.3431 9.25199 14.3431 9.34199 14.2793 9.36512L13.5737 9.61949C12.7906 9.90199 12.1737 10.5189 11.8912 11.302L11.6368 12.0076C11.6137 12.0714 11.5237 12.0714 11.5006 12.0076L11.2462 11.302C10.9637 10.5189 10.3468 9.90199 9.56368 9.61949L8.85805 9.36512C8.7943 9.34199 8.7943 9.25199 8.85805 9.22887L9.56368 8.97449C10.3468 8.69199 10.9637 8.07512 11.2462 7.29199L11.5006 6.58637C11.5237 6.52199 11.6143 6.52199 11.6368 6.58637Z" fill="white" />
    <path d="M3.28585 10.4205L3.48093 10.9616C3.69757 11.5621 4.17064 12.0352 4.7712 12.2519L5.31233 12.4469C5.36122 12.4647 5.36122 12.5337 5.31233 12.5514L4.7712 12.7465C4.17064 12.9631 3.69757 13.4362 3.48093 14.0368L3.28585 14.5779C3.26812 14.6268 3.1991 14.6268 3.18137 14.5779L2.98629 14.0368C2.76965 13.4362 2.29658 12.9631 1.69602 12.7465L1.15489 12.5514C1.106 12.5337 1.106 12.4647 1.15489 12.4469L1.69602 12.2519C2.29658 12.0352 2.76965 11.5621 2.98629 10.9616L3.18137 10.4205C3.1991 10.3716 3.2686 10.3716 3.28585 10.4205Z" fill="white" />
  </svg>
);

const previewChartData = [
  { name: 'T2', value: 24 },
  { name: 'T3', value: 30 },
  { name: 'T4', value: 27 },
  { name: 'T5', value: 35 },
  { name: 'T6', value: 32 },
  { name: 'T7', value: 40 },
  { name: 'CN', value: 36 }
];

const previewPieData = [
  { name: 'Shopee', value: 45 },
  { name: 'TikTok', value: 30 },
  { name: 'Website', value: 25 }
];

const PREVIEW_SLOT_GAP = 12;
const PREVIEW_SLOT_HEIGHT = 56;
const PREVIEW_SLOT_WIDTH = 140;
const previewSpanSteps = [1, 2, 3, 4, 6];

const getDefaultVisualization = (metric) => {
  if (!metric) return 'card';
  const name = metric.name.toLowerCase();
  if (name.includes('tỷ lệ') || name.includes('%')) {
    return 'line';
  }
  if (metric.domain === 'Ads') return 'column';
  if (metric.domain === 'Ops') return 'area';
  return 'card';
};

// Sortable Metric Card for Drag & Drop
const SortableMetricCard = ({ metric, isReorderMode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: metric.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isReorderMode ? 'move' : 'default',
    position: 'relative'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isReorderMode && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          background: '#fff',
          borderRadius: 8,
          padding: '4px 8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <DragOutlined style={{ fontSize: 14, color: '#2b2b2b' }} />
        </div>
      )}
      <KPICard {...metric} />
    </div>
  );
};

const SortablePreviewBlock = ({
  block,
  metric,
  onResize,
  onRemove,
  isHovered,
  onHoverChange
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.75 : 1,
    gridColumn: `span ${Math.min(block.span, 6)}`,
    minHeight: block.viewType === 'card' ? 120 : 170,
    background: '#fff',
    borderRadius: 12,
    border: isDragging ? '1px solid #1677FF' : '1px dashed #D0D5DD',
    boxShadow: isDragging || isHovered ? '0 0 0 2px rgba(22, 119, 255,0.25)' : '0 4px 8px rgba(15,23,42,0.06)',
    padding: 16,
    position: 'relative',
    cursor: 'grab',
    zIndex: isHovered ? 3 : 2
  };

  const renderPreviewContent = () => {
    switch (block.viewType) {
      case 'line':
        return (
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={previewChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FF" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <ChartTooltip />
                <RechartLine type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case 'column':
        return (
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={previewChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FF" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <ChartTooltip />
                <Bar dataKey="value" fill="#22A6B3" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'area':
        return (
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={previewChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FF" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <ChartTooltip />
                <RechartArea type="monotone" dataKey="value" stroke="#F59E0B" fill="#FCD34D" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      case 'pie':
        return (
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <RechartPie
                  data={previewPieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {previewPieData.map((entry, index) => (
                    <Cell
                      key={`slice-${entry.name}`}
                      fill={['#6366F1', '#22D3EE', '#FB7185'][index]}
                    />
                  ))}
                </RechartPie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Text style={{ fontSize: 28, fontWeight: 600, color: '#101828' }}>
              {metric?.value || '₫0'}
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              So với hôm qua {metric?.change || '--'}
            </Text>
            <Progress
              percent={metric?.trend === 'up' ? 68 : 42}
              showInfo={false}
              strokeColor={metric?.trend === 'up' ? '#16A34A' : '#DC2626'}
            />
          </div>
        );
    }
  };

  const resizeMenu = {
    items: [
      { key: 'smaller', label: 'Thu nhỏ 1 slot' },
      { key: 'larger', label: 'Phóng to 1 slot' }
    ],
    onClick: ({ key }) => {
      onResize(block.id, key === 'larger' ? 1 : -1);
    }
  };

  const dragHandleProps = {
    ...attributes,
    ...listeners
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <Text strong>{metric?.name}</Text>
        </div>
        {isHovered && (
          <Space size={4}>
            <Tooltip title="Di chuyển">
              <Button
                size="small"
                type="text"
                icon={<DragOutlined />}
                {...dragHandleProps}
                onClick={(e) => e.stopPropagation()}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <Button
                size="small"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(block.metricId);
                }}
              />
            </Tooltip>
          </Space>
        )}
      </div>
      {renderPreviewContent()}
      {isHovered && (
        <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
          <Dropdown
            menu={{
              items: [
                { key: 'smaller', label: 'Thu nhỏ 1 slot' },
                { key: 'larger', label: 'Phóng to 1 slot' }
              ],
              onClick: ({ key }) => onResize(block.id, key === 'larger' ? 1 : -1)
            }}
            trigger={['click']}
          >
            <Button
              icon={<ArrowsAltOutlined />}
              size="small"
              shape="circle"
              type="primary"
              style={{ boxShadow: '0 4px 10px rgba(15,23,42,0.15)' }}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </div>
      )}
    </div>
  );
};

// Alert Item Component - Shopify Style with AI touch
const AlertItem = ({ title, count, unit, severity, metric, desc }) => {
  const bgColor = severity === 'error' ? '#FEF3F2' : '#FFF8F1';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '14px 16px',
      borderRadius: 8,
      background: bgColor,
      border: 'none',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      gap: 12
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = severity === 'error' ? '#FEE4E2' : '#FFE8D7';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bgColor;
      }}
    >
      {/* Content - Number and Title Only */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          {/* Number - Primary Color (Not Semantic) */}
          <span style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#2b2b2b',
            lineHeight: 1
          }}>
            {count}
          </span>
          {unit && (
            <span style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#6D7175',
              lineHeight: 1
            }}>
              {unit}
            </span>
          )}
          <Text style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#2b2b2b',
            marginLeft: 4
          }}>
            {title}
          </Text>
        </div>
      </div>
    </div>
  );
};

// Helper function to get greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
};

// Main Layout Component
// Custom Tooltip component that only shows when content is truncated
const TruncatedTooltip = ({ children, title, placement = 'top', style }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    checkTruncation();
    // Optional: Add resize listener if needed, but for this sidebar width is fixed/transitioned
    // window.addEventListener('resize', checkTruncation);
    // return () => window.removeEventListener('resize', checkTruncation);
  }, [children]);

  const content = (
    <span ref={textRef} style={{ ...style, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );

  return isTruncated ? (
    <Tooltip title={title} placement={placement}>
      {content}
    </Tooltip>
  ) : content;
};

const HomepageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'day'), dayjs()]);

  // Sidebar navigation state
  const [expandedNavItems, setExpandedNavItems] = useState(new Set());
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Default collapsed, expand on hover
  const [sidebarLocked, setSidebarLocked] = useState(false); // Lock sidebar collapsed until mouse leave
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [expandedSubNav, setExpandedSubNav] = useState(null); // Track which parent item has sub-nav expanded (key of parent)

  // Get personalized greeting
  const userName = 'Dat'; // This could come from auth context
  const greeting = getGreeting();
  const [annotationDrawerVisible, setAnnotationDrawerVisible] = useState(false);
  const [insightsDrawerVisible, setInsightsDrawerVisible] = useState(false);
  const [annotations, setAnnotations] = useState([
    { id: 1, date: '2025-11-20', title: 'Flash Sale 11.11', description: 'GMV tăng đột biến do chạy flash sale', tags: ['marketing', 'sale'] },
    { id: 2, date: '2025-11-15', title: 'Thay đổi chiến lược ads', description: 'Chuyển từ CPM sang CPC', tags: ['ads'] },
    { id: 3, date: '2025-11-10', title: 'Ra mắt sản phẩm mới', description: 'SKU-NEW-001 đến SKU-NEW-010', tags: ['product'] }
  ]);
  const [newAnnotation, setNewAnnotation] = useState({ date: '', title: '', description: '', tags: '' });

  // Template System States
  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem('ups-metric-templates');
    const base = saved ? JSON.parse(saved) : defaultTemplates;
    return base.map(template => ({
      ...template,
      metrics: template.metrics || [],
      createdAt: template.createdAt || '24/12/2025'
    }));
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    return localStorage.getItem('ups-selected-template') || 'growth-default';
  });
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [tempMetricOrder, setTempMetricOrder] = useState([]);

  // Modal States
  const [newTemplateName, setNewTemplateName] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewBlocks, setPreviewBlocks] = useState([]);
  const [hoveredPreviewBlock, setHoveredPreviewBlock] = useState(null);
  const [hoveredMetricId, setHoveredMetricId] = useState(null);
  const [activeModule, setActiveModule] = useState('home');
  const [datePeriod, setDatePeriod] = useState('today'); // 'yesterday', 'today', 'thisWeek', 'thisMonth', 'thisYear'
  const [createTemplateModalVisible, setCreateTemplateModalVisible] = useState(false);
  const [editTemplateModalVisible, setEditTemplateModalVisible] = useState(false);
  const [previewTemplateModalVisible, setPreviewTemplateModalVisible] = useState(false);
  const [previewTemplateId, setPreviewTemplateId] = useState(null);
  const [previewContext, setPreviewContext] = useState(null); // 'settings' | 'gallery'
  const [hoveredTemplateCard, setHoveredTemplateCard] = useState(null);
  const [hoveredGalleryCard, setHoveredGalleryCard] = useState(null);
  const [editingTemplateName, setEditingTemplateName] = useState(null);
  const [editingTemplateNameValue, setEditingTemplateNameValue] = useState('');
  const [hoveredTemplateName, setHoveredTemplateName] = useState(null);
  const [templateGalleryVisible, setTemplateGalleryVisible] = useState(false);
  const [templateApplyConfirmVisible, setTemplateApplyConfirmVisible] = useState(false);
  const [templateToApply, setTemplateToApply] = useState(null); // Template ID to apply after confirmation
  const [confirmDontShowAgain, setConfirmDontShowAgain] = useState(false);
  const [skipTemplateConfirm, setSkipTemplateConfirm] = useState(() => {
    return localStorage.getItem('ups-skip-template-confirm') === 'true';
  });
  const [builderTemplateName, setBuilderTemplateName] = useState('');
  const [builderReports, setBuilderReports] = useState([]);
  const [builderAlertSelected, setBuilderAlertSelected] = useState(false);
  const [builderNewsSelected, setBuilderNewsSelected] = useState(false);
  const [templateTablePage, setTemplateTablePage] = useState(1);
  const [selectedTemplateIds, setSelectedTemplateIds] = useState(new Set());
  const [templateSearchQuery, setTemplateSearchQuery] = useState('');

  // New template builder state
  const [widgetLayout, setWidgetLayout] = useState([]);
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());
  const [widgetSearchQuery, setWidgetSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({});
  const [hoveredWidget, setHoveredWidget] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState(null);

  // Section-based template builder state
  const [sectionLayout, setSectionLayout] = useState([]);
  const [sectionsInPreview, setSectionsInPreview] = useState(new Set()); // Track which sections are in preview
  const SECTION_TITLE_MAP = {
    'bao-cao': 'Báo cáo',
    'loi-canh-bao': 'Lỗi & Cảnh báo',
    'tin-tuc': 'Tin tức'
  };
  const [sectionTitles, setSectionTitles] = useState({});
  const [sectionLinks, setSectionLinks] = useState({}); // Store links for each section
  const [sectionMetrics, setSectionMetrics] = useState({});
  const [metricOverlayVisible, setMetricOverlayVisible] = useState(false);
  const [currentSectionForMetric, setCurrentSectionForMetric] = useState(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState(null);
  const [hoveredSectionTitle, setHoveredSectionTitle] = useState(null);
  const [linkOverlayVisible, setLinkOverlayVisible] = useState(false);
  const [editingSectionLink, setEditingSectionLink] = useState(null); // Section ID being edited
  const [linkInputValue, setLinkInputValue] = useState(''); // Link URL input value
  const [linkTextValue, setLinkTextValue] = useState('Xem thêm'); // Link text input value
  const [linkOverlayPosition, setLinkOverlayPosition] = useState({ top: 0, left: 0 });
  const [linkButtonRef, setLinkButtonRef] = useState(null);
  const [alertSectionActiveTab, setAlertSectionActiveTab] = useState({}); // Track active tab for each alert section
  const [overlayButtonRef, setOverlayButtonRef] = useState(null);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [isDraggingOverlay, setIsDraggingOverlay] = useState(false);
  const [overlayDragStart, setOverlayDragStart] = useState({ x: 0, y: 0 });
  const [expandedAlerts, setExpandedAlerts] = useState(new Set()); // Track expanded alerts for accordion
  const [hoveredAlertId, setHoveredAlertId] = useState(null); // Track hovered alert row for showing actions
  const [metricChartTypes, setMetricChartTypes] = useState({}); // Track chart type for each metric
  const [sectionWidgetLayouts, setSectionWidgetLayouts] = useState({}); // Track widget layouts within each section
  const [sectionContainerWidths, setSectionContainerWidths] = useState({}); // Track actual container widths for GridLayout
  const getSectionType = (sectionId = '') => {
    if (!sectionId) return 'bao-cao';
    if (sectionId.startsWith('bao-cao')) return 'bao-cao';
    if (sectionId.startsWith('loi-canh-bao')) return 'loi-canh-bao';
    if (sectionId.startsWith('tin-tuc')) return 'tin-tuc';
    return sectionId;
  };
  const createDefaultSectionMetrics = (type) => {
    if (type === 'loi-canh-bao') {
      return []; // Store alert IDs as array, similar to bao-cao
    }
    return [];
  };
  const canSectionRepeat = (type) => type === 'bao-cao';

  // Update container widths when sections are rendered
  useEffect(() => {
    const updateWidths = () => {
      sectionLayout.forEach(({ i }) => {
        const container = document.getElementById(`section-widget-container-${i}`);
        if (container) {
          const width = container.offsetWidth;
          if (width > 0) {
            setSectionContainerWidths(prev => ({
              ...prev,
              [i]: width
            }));
          }
        }
      });
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);
    const interval = setInterval(updateWidths, 100); // Check periodically for initial render

    return () => {
      window.removeEventListener('resize', updateWidths);
      clearInterval(interval);
    };
  }, [sectionLayout, sectionMetrics]);

  // Sync activeNavItem with activeModule and expand parent items
  useEffect(() => {
    // Map activeModule to navigation item
    let matchedKey = null;
    let parentKey = null;
    let subParentKey = null;

    if (activeModule === 'home') {
      matchedKey = 'trang-chu';
    } else if (activeModule === 'workspace-settings') {
      matchedKey = 'cai-dat';
    } else if (activeModule === 'orders') {
      matchedKey = 'danh-sach-don-hang';
      parentKey = 'quan-ly-don-hang';
      subParentKey = 'van-hanh';
    } else {
      // Try to find matching nav item
      const findNavItem = (items, module) => {
        for (const item of items) {
          if (item.module === module) return { key: item.key, parent: null, subParent: null };
          if (item.children) {
            for (const child of item.children) {
              if (child.module === module) return { key: child.key, parent: item.key, subParent: null };
              if (child.children) {
                for (const nested of child.children) {
                  if (nested.module === module) return { key: nested.key, parent: child.key, subParent: item.key };
                }
              }
            }
          }
        }
        return null;
      };
      const result = findNavItem(navigationItems, activeModule);
      if (result) {
        matchedKey = result.key;
        parentKey = result.parent;
        subParentKey = result.subParent;
      }
    }

    if (matchedKey) {
      setActiveNavItem(matchedKey);
      // Expand parent items
      const newExpanded = new Set(expandedNavItems);
      if (parentKey) {
        newExpanded.add(parentKey);
      }
      if (subParentKey) {
        newExpanded.add(subParentKey);
        // Auto-show sub-nav for parent
        setExpandedSubNav(subParentKey);
      }
      setExpandedNavItems(newExpanded);
    }
  }, [activeModule]);

  // Update link overlay position when scrolling or resizing
  useEffect(() => {
    if (!linkOverlayVisible || !linkButtonRef) return;

    const updatePosition = () => {
      if (linkButtonRef) {
        const buttonRect = linkButtonRef.getBoundingClientRect();
        setLinkOverlayPosition({
          top: buttonRect.bottom + 4,
          left: buttonRect.left
        });
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [linkOverlayVisible, linkButtonRef]);

  // Handle overlay dragging with smooth animation
  useEffect(() => {
    if (!isDraggingOverlay) return;

    let animationFrameId = null;

    const handleMouseMove = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const canvasContainer = document.getElementById('grid-canvas-container');
        const canvasRect = canvasContainer?.getBoundingClientRect() || { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };

        const newX = e.clientX - overlayDragStart.x;
        const newY = e.clientY - overlayDragStart.y;

        // Overlay width is fixed at 520px
        const overlayWidth = 520;

        // Constrain to canvas bounds
        const constrainedX = Math.max(canvasRect.left, Math.min(canvasRect.right - overlayWidth, newX));
        const constrainedY = Math.max(canvasRect.top, Math.min(canvasRect.bottom - 500, newY));

        setOverlayPosition({ x: constrainedX, y: constrainedY });
      });
    };

    const handleMouseUp = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      setIsDraggingOverlay(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingOverlay, overlayDragStart]);

  // Helper function to determine widget type based on metric
  const getWidgetType = (metric) => {
    if (metric.breakdown) return 'breakdown';
    if (metric.name.includes('theo thời gian') || metric.name.includes('ngày hôm qua') || metric.name.includes('trend')) return 'time-series';
    if (metric.name.includes('so sánh') || metric.name.includes('đối chiếu')) return 'comparison';
    return 'single-number';
  };

  // Helper function to determine widget size based on type
  const getWidgetSize = (widgetType) => {
    switch (widgetType) {
      case 'single-number':
        return { w: 3, h: 2 };
      case 'time-series':
        return { w: 6, h: 4 };
      case 'breakdown':
        return { w: 6, h: 5 };
      case 'comparison':
        return { w: 6, h: 4 };
      default:
        return { w: 3, h: 2 };
    }
  };

  // Helper function to find first available position in grid
  const findAvailablePosition = (sectionId, widgetSize) => {
    const currentLayout = sectionWidgetLayouts[sectionId] || [];
    const maxCols = 12;
    // Calculate max rows based on section height (assuming section is in grid layout)
    // Each section card has a certain height, we'll use a reasonable max
    const maxRows = 24;

    // Try to find available position
    for (let y = 0; y < maxRows - widgetSize.h + 1; y++) {
      for (let x = 0; x < maxCols - widgetSize.w + 1; x++) {
        const canPlace = !currentLayout.some(item => {
          // Check if rectangles overlap
          return !(x >= item.x + item.w || x + widgetSize.w <= item.x ||
            y >= item.y + item.h || y + widgetSize.h <= item.y);
        });
        if (canPlace) {
          return { x, y };
        }
      }
    }
    // If no space found, place at bottom
    const maxY = currentLayout.length > 0
      ? Math.max(...currentLayout.map(item => item.y + item.h))
      : 0;
    return { x: 0, y: maxY };
  };

  // Helper function to check if widget can fit in section based on available space
  const canFitWidget = (sectionId, widgetSize) => {
    const currentLayout = sectionWidgetLayouts[sectionId] || [];
    const position = findAvailablePosition(sectionId, widgetSize);
    // Check if position is within reasonable bounds
    return position.y + widgetSize.h <= 24;
  };

  // Check if section has enough space to add new widget/metric
  const canAddToSection = (sectionId, sectionType, newItemSize = null) => {
    // Get section layout item to know section dimensions
    const sectionLayoutItem = sectionLayout.find(item => item.i === sectionId);
    if (!sectionLayoutItem) return true; // If section not found, allow adding

    // Calculate available height based on section grid height
    const sectionGridHeight = sectionLayoutItem.h; // Height in grid units
    const rowHeight = 30; // Grid row height in pixels
    const sectionHeight = sectionGridHeight * rowHeight; // Total section height in pixels
    const headerHeight = 50; // Approximate header height
    const padding = 32; // 16px top + 16px bottom
    const availableHeight = sectionHeight - headerHeight - padding;

    if (sectionType === 'bao-cao') {
      // For Báo cáo, calculate based on GridLayout
      const currentLayout = sectionWidgetLayouts[sectionId] || [];
      const margin = 8; // Margin between widgets
      const maxRows = Math.floor(availableHeight / (rowHeight + margin));

      if (newItemSize) {
        const newItemRows = newItemSize.h || 4;
        const position = findAvailablePosition(sectionId, newItemSize);
        const newItemBottom = position.y + newItemRows;
        return newItemBottom <= maxRows;
      } else {
        // Check if current content fits
        const maxY = currentLayout.length > 0
          ? Math.max(...currentLayout.map(item => item.y + item.h))
          : 0;
        return maxY < maxRows;
      }
    } else if (sectionType === 'loi-canh-bao') {
      // For Lỗi & Cảnh báo, calculate based on alert cards
      const alertsList = sectionMetrics[sectionId] || [];
      const cardHeight = 50; // Approximate height per alert card (including padding)
      const gap = 6; // Gap between cards
      // Use maximum height (expanded) for safety
      const maxCardHeight = 150; // Approximate height when expanded with guides
      const currentHeight = alertsList.length * (maxCardHeight + gap);
      const newItemHeight = maxCardHeight + gap;

      return currentHeight + newItemHeight <= availableHeight;
    }

    return true;
  };

  // Navigation handlers - moved to top level to comply with React hooks rules
  const handleNavItemClick = useCallback((item) => {
    if (item.expandable && item.children && item.children.length > 0) {
      // Set active nav item and show sub-menu
      setActiveNavItem(item.key);
      setExpandedSubNav(item.key);
      // Collapse sidebar when item is selected
      setSidebarCollapsed(true);
      setSidebarLocked(true); // Prevent re-expansion until mouse leave
      // If item has a module, navigate to it
      if (item.module) {
        setActiveModule(item.module);
      }
    } else {
      setActiveNavItem(item.key);
      // Collapse sidebar when item is selected
      setSidebarCollapsed(true);
      setSidebarLocked(true); // Prevent re-expansion until mouse leave
      if (item.module) {
        setActiveModule(item.module);
      }
      // Close sub-nav if clicking on non-expandable item
      setExpandedSubNav(null);
    }
  }, []);

  const handleSubItemClick = useCallback((parentKey, subItem) => {
    setActiveNavItem(subItem.key);
    // Keep sub-nav open
    setExpandedSubNav(parentKey);
    // Collapse sidebar when item is selected
    setSidebarCollapsed(true);
    if (subItem.module) {
      setActiveModule(subItem.module);
    }
  }, []);

  const handleNestedSubItemClick = useCallback((parentKey, subParentKey, nestedItem) => {
    setActiveNavItem(nestedItem.key);
    // Keep sub-nav open
    setExpandedSubNav(parentKey);
    // Collapse sidebar when item is selected
    setSidebarCollapsed(true);
    if (nestedItem.module) {
      setActiveModule(nestedItem.module);
    }
  }, []);

  // Template workspaces (predefined templates)
  const templateWorkspaces = [
    {
      id: 'template-default',
      name: 'Template mặc định',
      isTemplate: true,
      templateId: 'default',
      description: 'Hiển thị đầy đủ các section có sẵn',
      selectedItems: [
        { groupId: 'Dashboard', itemId: 'growth' },
        { groupId: 'Lỗi & Cảnh báo' },
        { groupId: 'Tin tức' }
      ],
      usedBy: '12.1k',
      layout: {
        showDashboard: true,
        showAlerts: true,
        showGuides: true
      }
    },
    {
      id: 'template-ceo',
      name: 'CEO',
      isTemplate: true,
      templateId: 'template-ceo',
      description: 'Dashboard tổng quan cho CEO',
      selectedItems: [
        { groupId: 'Dashboard', itemId: 'growth' },
        { groupId: 'Lỗi & Cảnh báo' },
        { groupId: 'Tin tức' }
      ],
      usedBy: '9.8k',
      layout: {
        showDashboard: true,
        showAlerts: true,
        showGuides: true
      }
    },
    {
      id: 'template-ecommerce-manager',
      name: 'Ecommerce Manager',
      isTemplate: true,
      templateId: 'template-ecommerce-manager',
      description: 'Dashboard cho Ecommerce Manager',
      selectedItems: [
        { groupId: 'Dashboard', itemId: 'growth' },
        { groupId: 'Lỗi & Cảnh báo' }
      ],
      usedBy: '8.6k',
      layout: {
        showDashboard: true,
        showAlerts: true,
        showGuides: false
      }
    },
    {
      id: 'template-media',
      name: 'Media',
      isTemplate: true,
      templateId: 'template-media',
      description: 'Dashboard cho Media team',
      selectedItems: [
        { groupId: 'Dashboard', itemId: 'media' },
        { groupId: 'Lỗi & Cảnh báo' }
      ],
      usedBy: '7.1k',
      layout: {
        showDashboard: true,
        showAlerts: true,
        showGuides: false
      }
    },
    {
      id: 'template-marketing',
      name: 'Marketing',
      isTemplate: true,
      templateId: 'template-marketing',
      description: 'Dashboard cho Marketing team',
      selectedItems: [
        { groupId: 'Dashboard', itemId: 'growth' },
        { groupId: 'Tin tức' }
      ],
      usedBy: '6.9k',
      layout: {
        showDashboard: true,
        showAlerts: false,
        showGuides: true
      }
    },
    {
      id: 'template-accounting',
      name: 'Kế toán',
      isTemplate: true,
      templateId: 'template-accounting',
      description: 'Dashboard cho Kế toán',
      selectedItems: [
        { groupId: 'Dashboard', itemId: 'accounting' },
        { groupId: 'Lỗi & Cảnh báo' }
      ],
      usedBy: '5.4k',
      layout: {
        showDashboard: true,
        showAlerts: true,
        showGuides: false
      }
    }
  ];

  // Render GA4-style sidebar navigation
  const renderSidebarNavigation = () => {
    const isSidebarExpanded = !sidebarCollapsed; // Collapse when item is selected

    const renderNavItem = (item, level = 0, isSettings = false) => {
      const isSubNavExpanded = expandedSubNav === item.key;
      const isActive = activeNavItem === item.key || (level === 0 && item.children?.some(child =>
        child.children?.some(nested => activeNavItem === nested.key) || activeNavItem === child.key
      ));
      const isHovered = hoveredNavItem === item.key;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.key}>
          <div
            onClick={() => handleNavItemClick(item)}
            onMouseEnter={() => setHoveredNavItem(item.key)}
            onMouseLeave={() => setHoveredNavItem(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: level === 0
                ? (isSidebarExpanded ? '10px 16px' : '10px 0')
                : '8px 16px 8px 32px',
              cursor: 'pointer',
              backgroundColor: isActive
                ? '#E8F0FE'
                : isHovered
                  ? '#F5F5F5'
                  : 'transparent',
              borderLeft: isActive ? '3px solid #1677FF' : '3px solid transparent',
              borderTopRightRadius: isActive && level === 0 ? '20px' : 0,
              borderBottomRightRadius: isActive && level === 0 ? '20px' : 0,
              marginRight: isActive && level === 0 ? '8px' : 0,
              color: isActive ? '#1677FF' : '#202124',
              fontSize: level === 0 ? 15 : 13,
              fontWeight: level === 0 ? 500 : 400,
              transition: 'all 0.2s',
              position: 'relative',
              justifyContent: isSidebarExpanded ? 'flex-start' : 'center',
              boxShadow: isActive && level === 0
                ? '0 4px 12px rgba(22, 119, 255, 0.15), 0 2px 4px rgba(22, 119, 255, 0.1)'
                : 'none',
              transform: isActive && level === 0 ? 'translateY(-1px)' : 'translateY(0)',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {item.icon && (
              <span
                style={{
                  marginRight: isSidebarExpanded ? 12 : 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {React.cloneElement(item.icon, {
                  style: {
                    fontSize: 28,
                    width: 28,
                    height: 28,
                    color: isActive ? '#1677FF' : '#5F6368',
                    ...item.icon.props?.style
                  }
                })}
              </span>
            )}
            {isSidebarExpanded && (
              <>
                <span style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {item.label}
                </span>
              </>
            )}
          </div>
          {/* Remove inline children - they will be shown in sub-nav column */}
        </div>
      );
    };

    // Render sub-navigation column
    const renderSubNavigation = () => {
      if (!parentItemToShow || !parentItemToShow.children) return null;

      const parentItem = parentItemToShow;

      return (
        <div
          style={{
            position: 'fixed',
            left: 64,
            top: 64,
            bottom: 0,
            width: 177,
            backgroundColor: '#FAFBFB',
            borderRight: '1px solid #E1E3E5',
            zIndex: 1001,
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            transition: 'left 0.2s ease'
          }}
        >
          <div style={{ paddingTop: 24, paddingBottom: 16 }}>
            {/* Items */}
            <div style={{ padding: '0 8px' }}>          {parentItem.children.map((child) => {
              if (child.children && child.children.length > 0) {
                // Nested children (e.g., Quản lý đơn hàng)
                const isSubExpanded = expandedNavItems.has(child.key);
                const isChildActive = activeNavItem === child.key ||
                  child.children.some(nested => activeNavItem === nested.key);

                return (
                  <div key={child.key}>
                    <div
                      onClick={() => {
                        const newExpanded = new Set();
                        if (!expandedNavItems.has(child.key)) {
                          newExpanded.add(child.key);
                        }
                        setExpandedNavItems(newExpanded);
                      }}
                      onMouseEnter={() => setHoveredNavItem(child.key)}
                      onMouseLeave={() => setHoveredNavItem(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        backgroundColor: isChildActive
                          ? '#F5F5F5'
                          : hoveredNavItem === child.key
                            ? '#F5F5F5'
                            : 'transparent',
                        color: isChildActive ? '#202124' : '#5F6368',
                        fontSize: 14,
                        fontWeight: 500,
                        borderRadius: 6,
                        transition: 'all 0.2s'
                      }}
                    >
                      <TruncatedTooltip title={child.label} placement="right" style={{ flex: 1 }}>
                        {child.label}
                      </TruncatedTooltip>
                      <CaretDownOutlined style={{
                        fontSize: 10,
                        transition: 'transform 0.2s',
                        transform: isSubExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                        color: '#5F6368',
                        flexShrink: 0
                      }} />
                    </div>
                    {isSubExpanded && (
                      <div>
                        {child.children.map((nestedChild) => (
                          <div
                            key={nestedChild.key}
                            onClick={() => {
                              setActiveNavItem(nestedChild.key);
                              if (nestedChild.module) {
                                setActiveModule(nestedChild.module);
                              }
                            }}
                            onMouseEnter={() => setHoveredNavItem(nestedChild.key)}
                            onMouseLeave={() => setHoveredNavItem(null)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '6px 16px 6px 28px',
                              cursor: 'pointer',
                              backgroundColor: activeNavItem === nestedChild.key
                                ? '#E8F0FE'
                                : hoveredNavItem === nestedChild.key
                                  ? '#F5F5F5'
                                  : 'transparent',
                              color: activeNavItem === nestedChild.key ? '#1677FF' : '#202124',
                              fontSize: 14,
                              fontWeight: 400,
                              borderRadius: 6,
                              transition: 'all 0.2s'
                            }}
                          >
                            <TruncatedTooltip title={nestedChild.label} placement="right">
                              {nestedChild.label}
                            </TruncatedTooltip>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                // Direct children (e.g., Báo cáo vận hành)
                return (
                  <div
                    key={child.key}
                    onClick={() => {
                      setActiveNavItem(child.key);
                      if (child.module) {
                        setActiveModule(child.module);
                      }
                    }}
                    onMouseEnter={() => setHoveredNavItem(child.key)}
                    onMouseLeave={() => setHoveredNavItem(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      backgroundColor: activeNavItem === child.key
                        ? '#E8F0FE'
                        : hoveredNavItem === child.key
                          ? '#F5F5F5'
                          : 'transparent',
                      color: activeNavItem === child.key ? '#1677FF' : '#202124',
                      fontSize: 14,
                      fontWeight: 400,
                      borderRadius: 6,
                      transition: 'all 0.2s'
                    }}
                  >
                    <TruncatedTooltip title={child.label} placement="right">
                      {child.label}
                    </TruncatedTooltip>
                  </div>
                );
              }
            })}
            </div>
          </div>
        </div>
      );
    };

    const settingsItem = {
      key: 'cai-dat',
      label: 'Cài đặt',
      icon: <MdSettings />,
      expandable: true,
      children: [
        { key: 'tai-khoan', label: 'Tài khoản', module: 'settings' },
        { key: 'gian-hang-ket-noi', label: 'Gian hàng kết nối', module: 'settings' },
        { key: 'nhan-hang', label: 'Nhãn hàng', module: 'settings' },
        { key: 'tai-khoan-quang-cao', label: 'Tài khoản quảng cáo', module: 'settings' },
        { key: 'ton-da-kenh', label: 'Tồn đa kênh', module: 'settings' },
        { key: 'ket-noi-mo-rong', label: 'Kết nối mở rộng', module: 'settings' },
        { key: 'thiet-lap-tai-chinh', label: 'Thiết lập tài chính', module: 'settings' },
        { key: 'trang-thai-hang-hoa', label: 'Trạng thái hàng hóa', module: 'settings' },
        { key: 'cau-hinh-van-chuyen', label: 'Cấu hình vận chuyển', module: 'settings' }
      ]
    };

    return (
      <>
        <div
          onMouseEnter={() => {
            if (!sidebarLocked) {
              setSidebarCollapsed(false);
            }
          }}
          onMouseLeave={() => {
            setSidebarCollapsed(true);
            setSidebarLocked(false); // Reset lock on mouse leave
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
            width: sidebarCollapsed ? 64 : 240,
            backgroundColor: '#fff',
            borderRight: '1px solid #E1E3E5',
            zIndex: 1002,
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            overflowX: 'hidden',
            transition: 'width 0.2s ease'
          }}
        >
          {/* Main Navigation Items */}
          <div style={{ flex: 1, paddingTop: 24 }}>
            {navigationItems.map((item) => renderNavItem(item))}
          </div>

          {/* Settings at bottom, separated */}
          <div style={{
            borderTop: '1px solid #E1E3E5',
            paddingTop: 8,
            paddingBottom: 16,
            marginTop: 'auto'
          }}>
            {renderNavItem(settingsItem, 0, true)}
          </div>
        </div>

        {/* Sub-navigation column */}
        {renderSubNavigation()}
      </>
    );
  };

  const renderTemplateGalleryScreen = () => (
    <Row gutter={[20, 20]}>
      {templateWorkspaces.map(template => {
        const templateId = template.templateId || template.id;
        return (
          <Col xs={24} md={12} xl={8} key={template.id}>
            <Card
              hoverable
              onMouseEnter={() => setHoveredGalleryCard(templateId)}
              onMouseLeave={() => setHoveredGalleryCard(null)}
              style={{
                borderRadius: 18,
                border: '1px solid #E1E3E5',
                boxShadow: '0 16px 32px rgba(15,23,42,0.12)',
                overflow: 'hidden'
              }}
              cover={
                <div style={{ position: 'relative' }}>
                  <div style={{
                    height: 160,
                    background: 'linear-gradient(135deg, #EEF2FF 0%, #FFF1F2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16
                  }}>
                    <div style={{
                      width: '90%',
                      height: '80%',
                      borderRadius: 16,
                      background: '#fff',
                      boxShadow: '0 12px 24px rgba(15,23,42,0.08)',
                      display: 'grid',
                      gridTemplateRows: 'repeat(3, 1fr)',
                      gap: 8,
                      padding: 16
                    }}>
                      {[...Array(6)].map((_, idx) => (
                        <div
                          key={idx}
                          style={{
                            borderRadius: 10,
                            background: idx % 2 === 0 ? '#F5F7FF' : '#FFF7F0',
                            border: '1px solid #E5E7EB'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(15,23,42,0.05), rgba(15,23,42,0.7))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: hoveredGalleryCard === templateId ? 1 : 0,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPreview(templateId, 'gallery');
                      }}
                    >
                      Xem trước
                    </Button>
                  </div>
                </div>
              }
            >
              <Title level={4} style={{ margin: 0 }}>{template.name}</Title>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  // Widget data structure with Vietnamese UI labels
  const widgetLibrary = {
    'Báo cáo': [
      { id: 'widget-sales-channel', name: 'Total sales by sales channel', displayName: 'Tổng doanh thu theo kênh', type: 'chart', defaultSize: { w: 6, h: 8 }, section: 'Báo cáo' },
      { id: 'widget-sessions', name: 'Sessions over time', displayName: 'Sessions theo thời gian', type: 'chart', defaultSize: { w: 6, h: 8 }, section: 'Báo cáo' },
      { id: 'widget-revenue', name: 'Revenue trend', displayName: 'Xu hướng doanh thu', type: 'chart', defaultSize: { w: 8, h: 6 }, section: 'Báo cáo' },
      { id: 'widget-orders', name: 'Orders by status', displayName: 'Đơn hàng theo trạng thái', type: 'chart', defaultSize: { w: 4, h: 4 }, section: 'Báo cáo' },
      { id: 'widget-gmv', name: 'GMV overview', displayName: 'Tổng quan GMV', type: 'metric', defaultSize: { w: 4, h: 4 }, section: 'Báo cáo' },
      { id: 'widget-aov', name: 'AOV metric', displayName: 'Giá trị đơn hàng trung bình', type: 'metric', defaultSize: { w: 4, h: 4 }, section: 'Báo cáo' },
      { id: 'widget-conversion', name: 'Conversion rate', displayName: 'Tỷ lệ chuyển đổi', type: 'metric', defaultSize: { w: 4, h: 4 }, section: 'Báo cáo' },
      { id: 'widget-traffic', name: 'Traffic sources', displayName: 'Nguồn traffic', type: 'chart', defaultSize: { w: 6, h: 6 }, section: 'Báo cáo' },
    ],
    'Lỗi & Cảnh báo': [
      { id: 'widget-alerts', name: 'Alert & Risks', displayName: 'Lỗi & Cảnh báo', type: 'alert', defaultSize: { w: 12, h: 6 }, section: 'Lỗi & Cảnh báo' },
    ],
    'Tin tức': [
      { id: 'widget-news', name: 'News & Insights', displayName: 'Tin tức & Insights', type: 'news', defaultSize: { w: 12, h: 6 }, section: 'Tin tức' },
    ]
  };

  // Initialize with 2 pre-placed widgets
  useEffect(() => {
    if (activeModule === 'template-create' && widgetLayout.length === 0) {
      const initialLayout = [
        { i: 'widget-sales-channel', x: 0, y: 0, w: 6, h: 8 },
        { i: 'widget-sessions', x: 0, y: 8, w: 6, h: 8 }
      ];
      setWidgetLayout(initialLayout);
      setSelectedWidgets(new Set(['widget-sales-channel', 'widget-sessions']));
    }
  }, [activeModule]);

  // Filtered widgets for template builder (moved to top level to comply with Rules of Hooks)
  const filteredWidgets = useMemo(() => {
    const query = widgetSearchQuery.toLowerCase();
    const filtered = {};
    Object.entries(widgetLibrary).forEach(([section, widgets]) => {
      const sectionWidgets = widgets.filter(w =>
        w.name.toLowerCase().includes(query) ||
        (w.displayName && w.displayName.toLowerCase().includes(query))
      );
      if (sectionWidgets.length > 0) {
        filtered[section] = sectionWidgets;
      }
    });
    return filtered;
  }, [widgetSearchQuery]);

  const handleWidgetToggle = (widgetId) => {
    const widget = Object.values(widgetLibrary).flat().find(w => w.id === widgetId);
    if (!widget) return;

    const newSelected = new Set(selectedWidgets);
    if (newSelected.has(widgetId)) {
      // Remove widget
      newSelected.delete(widgetId);
      setWidgetLayout(prev => prev.filter(item => item.i !== widgetId));
    } else {
      // Add widget - find first available position
      newSelected.add(widgetId);
      const existingPositions = widgetLayout.map(item => ({ x: item.x, y: item.y, w: item.w, h: item.h }));
      let placed = false;
      for (let y = 0; y < 20 && !placed; y++) {
        for (let x = 0; x < 12 && !placed; x++) {
          if (x + widget.defaultSize.w > 12) continue;
          const canPlace = !existingPositions.some(pos => {
            // Check if rectangles overlap
            return !(x >= pos.x + pos.w || x + widget.defaultSize.w <= pos.x ||
              y >= pos.y + pos.h || y + widget.defaultSize.h <= pos.y);
          });
          if (canPlace) {
            setWidgetLayout(prev => [...prev, {
              i: widgetId,
              x,
              y,
              w: widget.defaultSize.w,
              h: widget.defaultSize.h
            }]);
            placed = true;
          }
        }
      }
    }
    setSelectedWidgets(newSelected);
  };

  const handleLayoutChange = (layout) => {
    setWidgetLayout(layout);
  };

  const handleDeleteWidget = (widgetId) => {
    setWidgetLayout(prev => prev.filter(item => item.i !== widgetId));
    const newSelected = new Set(selectedWidgets);
    newSelected.delete(widgetId);
    setSelectedWidgets(newSelected);
  };

  const handleDeleteSection = (sectionId) => {
    setSectionLayout(prev => prev.filter(item => item.i !== sectionId));
    setSectionTitles(prev => {
      const next = { ...prev };
      delete next[sectionId];
      return next;
    });
    setSectionMetrics(prev => {
      const next = { ...prev };
      delete next[sectionId];
      return next;
    });
    setSectionWidgetLayouts(prev => {
      const next = { ...prev };
      delete next[sectionId];
      return next;
    });
    setSectionContainerWidths(prev => {
      const next = { ...prev };
      delete next[sectionId];
      return next;
    });
    setSectionsInPreview(prev => {
      const next = new Set(prev);
      next.delete(sectionId);
      return next;
    });
  };

  const calculateSectionPosition = (w = 6, h = 8) => {
    const existingPositions = sectionLayout.map(item => ({ x: item.x, y: item.y, w: item.w, h: item.h }));
    const maxCols = 12;
    const maxRows = 24;
    for (let y = 0; y <= maxRows - h; y++) {
      for (let x = 0; x <= maxCols - w; x++) {
        const canPlace = !existingPositions.some(pos => {
          return !(x >= pos.x + pos.w || x + w <= pos.x || y >= pos.y + pos.h || y + h <= pos.y);
        });
        if (canPlace) {
          return { x, y };
        }
      }
    }
    const maxY = existingPositions.length > 0
      ? Math.max(...existingPositions.map(pos => pos.y + pos.h))
      : 0;
    return { x: 0, y: maxY };
  };

  const addSectionToPreview = (type) => {
    const allowMultiple = canSectionRepeat(type);
    if (!allowMultiple && sectionLayout.some(item => (item.type || getSectionType(item.i)) === type)) {
      return;
    }
    const newId = allowMultiple ? `${type}-${Date.now()}` : type;
    const defaultSize = type === 'tin-tuc' ? { w: 6, h: 6 } : { w: 6, h: 8 };
    const position = calculateSectionPosition(defaultSize.w, defaultSize.h);
    const newLayoutItem = { i: newId, type, ...position, w: defaultSize.w, h: defaultSize.h };
    setSectionLayout(prev => [...prev, newLayoutItem]);
    setSectionTitles(prev => ({ ...prev, [newId]: SECTION_TITLE_MAP[type] }));
    setSectionMetrics(prev => ({ ...prev, [newId]: createDefaultSectionMetrics(type) }));
    setSectionWidgetLayouts(prev => ({ ...prev, [newId]: [] }));
    setSectionsInPreview(prev => {
      const next = new Set(prev);
      next.add(newId);
      return next;
    });
  };

  const renderSectionCard = (sectionId) => {
    const isHovered = hoveredWidget === sectionId;
    const isSelected = selectedWidget === sectionId;
    const sectionType = (sectionLayout.find(item => item.i === sectionId)?.type) || getSectionType(sectionId);
    const sectionKey = sectionId;
    const title = sectionTitles[sectionId] ?? SECTION_TITLE_MAP[sectionType];
    const borderColor = isSelected ? '#1677FF' : isHovered ? '#2b2b2b' : '#E1E3E5';
    const borderStyle = isSelected ? `2px solid ${borderColor}` : `1px solid ${borderColor}`;

    // Check if section has metrics/alerts
    const metricsList = sectionMetrics[sectionId] || [];
    const hasMetrics = metricsList.length > 0;
    const alertsList = sectionMetrics[sectionId] || [];
    const hasAlerts = alertsList.length > 0;
    const showAddButton = (sectionType === 'bao-cao' && hasMetrics) || (sectionType === 'loi-canh-bao' && hasAlerts);

    let content = null;
    if (sectionType === 'bao-cao') {
      const metricsList = sectionMetrics[sectionId] || [];
      const hasMetrics = metricsList.length > 0;
      const widgetLayout = sectionWidgetLayouts[sectionId] || [];

      content = (
        <>
          {hasMetrics ? (
            <div
              style={{
                marginBottom: 12,
                position: 'relative',
                minHeight: (() => {
                  const rowHeight = 30;
                  const gap = 8;
                  const maxY = widgetLayout.length > 0
                    ? Math.max(...widgetLayout.map(w => (w.y || 0) + (w.h || 2)))
                    : 0;
                  const rows = Math.max(8, maxY + 2);
                  return rows * (rowHeight + gap) - gap;
                })(),
                width: '100%'
              }}
              id={`section-widget-container-${sectionId}`}
            >
              {/* Grid Slots Background */}
              {(() => {
                const containerWidth = sectionContainerWidths[sectionId] || 600;
                const cols = 12;
                const rowHeight = 30;
                const gap = 8;
                const cellWidth = (containerWidth - (gap * (cols - 1))) / cols;
                // Calculate rows based on widget layout or minimum 8 rows
                const maxY = widgetLayout.length > 0
                  ? Math.max(...widgetLayout.map(w => (w.y || 0) + (w.h || 2)))
                  : 0;
                const rows = Math.max(8, maxY + 2); // At least 8 rows, or max widget position + 2
                return (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      pointerEvents: 'none',
                      zIndex: 0
                    }}
                  >
                    {Array.from({ length: rows }).map((_, rowIdx) =>
                      Array.from({ length: cols }).map((_, colIdx) => (
                        <div
                          key={`${rowIdx}-${colIdx}`}
                          style={{
                            position: 'absolute',
                            left: colIdx * (cellWidth + gap),
                            top: rowIdx * (rowHeight + gap),
                            width: cellWidth,
                            height: rowHeight,
                            border: '1px dashed #D9D9D9',
                            borderRadius: 4,
                            background: 'transparent'
                          }}
                        />
                      ))
                    )}
                  </div>
                );
              })()}
              <GridLayout
                className="section-widget-layout"
                layout={widgetLayout}
                cols={12}
                rowHeight={30}
                width={sectionContainerWidths[sectionId] || 600}
                style={{ position: 'relative', zIndex: 1 }}
                onLayoutChange={(layout) => {
                  setSectionWidgetLayouts(prev => ({
                    ...prev,
                    [sectionId]: layout
                  }));
                }}
                isDraggable={true}
                isResizable={true}
                draggableHandle=".react-draggable-handle"
                margin={[8, 8]}
                containerPadding={[0, 0]}
                compactType="vertical"
                preventCollision={false}
                useCSSTransforms={true}
                resizeHandles={['se']}
                minW={2}
                maxW={12}
                minH={2}
                maxH={12}
              >
                {widgetLayout.filter(item => (sectionMetrics[sectionId] || []).includes(item.i)).map(item => {
                  const metric = allMetricsPool.find(m => m.id === item.i);
                  if (!metric) return null;
                  const widgetType = getWidgetType(metric);
                  const chartType = metricChartTypes[item.i] || (widgetType === 'breakdown' ? 'pie' : widgetType === 'time-series' ? 'line' : 'card');
                  return (
                    <div key={item.i} style={{ position: 'relative', height: '100%' }}>
                      <Card
                        size="small"
                        style={{
                          borderRadius: 8,
                          border: '1px solid #E5E7EB',
                          background: '#fff',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          animation: 'fadeInScale 0.3s ease-out'
                        }}
                        bodyStyle={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}
                        extra={
                          <Space>
                            {(widgetType === 'breakdown' || widgetType === 'time-series') && (
                              <Dropdown
                                menu={{
                                  items: [
                                    { key: 'card', label: 'Card' },
                                    { key: 'pie', label: 'Pie Chart' },
                                    { key: 'line', label: 'Line Chart' },
                                    { key: 'column', label: 'Column Chart' }
                                  ],
                                  onClick: ({ key }) => {
                                    setMetricChartTypes(prev => ({ ...prev, [item.i]: key }));
                                  }
                                }}
                                trigger={['click']}
                                getPopupContainer={(trigger) => trigger.parentElement || document.body}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<BarChartOutlined />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                  }}
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                  }}
                                  style={{ pointerEvents: 'auto' }}
                                />
                              </Dropdown>
                            )}
                            <Button
                              type="text"
                              size="small"
                              icon={<CloseOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setSectionMetrics(prev => ({
                                  ...prev,
                                  [sectionId]: (prev[sectionId] || []).filter(id => id !== item.i)
                                }));
                                setSectionWidgetLayouts(prev => ({
                                  ...prev,
                                  [sectionId]: (prev[sectionId] || []).filter(w => w.i !== item.i)
                                }));
                                setMetricChartTypes(prev => {
                                  const newTypes = { ...prev };
                                  delete newTypes[item.i];
                                  return newTypes;
                                });
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                              }}
                              onPointerDown={(e) => {
                                e.stopPropagation();
                              }}
                              style={{
                                padding: 0,
                                height: 'auto',
                                pointerEvents: 'auto',
                                zIndex: 1000
                              }}
                            />
                          </Space>
                        }
                        title={
                          <div
                            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                            className="react-draggable-handle"
                          >
                            <DragOutlined
                              style={{ fontSize: 12, color: '#8c8c8c', cursor: 'move' }}
                              className="react-draggable-handle"
                            />
                            <Text strong style={{ fontSize: 14 }}>{metric.name}</Text>
                          </div>
                        }
                      >
                        {chartType === 'card' && widgetType === 'single-number' && (
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {metric.value && (
                              <div style={{ fontSize: 32, fontWeight: 700, color: '#2b2b2b', marginBottom: 8, textAlign: 'center' }}>
                                {metric.value}
                              </div>
                            )}
                            {metric.change && (
                              <div style={{ fontSize: 12, color: metric.trend === 'up' ? '#52c41a' : '#ff4d4f', textAlign: 'center' }}>
                                {metric.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                {metric.change}
                              </div>
                            )}
                          </div>
                        )}
                        {chartType === 'card' && widgetType === 'breakdown' && (
                          <div style={{ marginTop: 8 }}>
                            {metric.breakdown && metric.breakdown.map((item, idx) => (
                              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                                <Text style={{ color: '#6D7175' }}>{item.label}:</Text>
                                <Text strong style={{ color: '#2b2b2b' }}>{item.value}</Text>
                              </div>
                            ))}
                          </div>
                        )}
                        {chartType === 'pie' && metric.breakdown && (
                          <div style={{ flex: 1, minHeight: 120 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <RechartPie
                                  data={metric.breakdown.map(item => ({ name: item.label, value: parseFloat(item.value.replace(/[₫MB]/g, '').replace(/,/g, '')) }))}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                  outerRadius={Math.min(60, (item.h * 30 - 60) / 2)}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {metric.breakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#1677FF', '#52C41A', '#FA8C16', '#EB2F96'][index % 4]} />
                                  ))}
                                </RechartPie>
                                <ChartTooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        )}
                        {chartType === 'line' && (
                          <div style={{ flex: 1, minHeight: 120 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={templateData['default'].chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <ChartTooltip />
                                <RechartLine type="monotone" dataKey="value" stroke="#1677FF" strokeWidth={2} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        )}
                        {chartType === 'column' && metric.breakdown && (
                          <div style={{ flex: 1, minHeight: 120 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={metric.breakdown.map(item => ({ name: item.label, value: parseFloat(item.value.replace(/[₫MB]/g, '').replace(/,/g, '')) }))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <ChartTooltip />
                                <Bar dataKey="value" fill="#1677FF" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        )}
                      </Card>
                    </div>
                  );
                })}
              </GridLayout>
            </div>
          ) : !hasMetrics ? (
            <div style={{ position: 'relative' }}>
              <Button
                ref={(ref) => {
                  if (currentSectionForMetric === sectionId && metricOverlayVisible) {
                    setOverlayButtonRef(ref);
                  }
                }}
                type="dashed"
                size="small"
                icon={<PlusOutlined />}
                block
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSectionForMetric(sectionId);
                  setMetricOverlayVisible(true);
                  setOverlayButtonRef(e.currentTarget);
                  setOverlayPosition({ x: 0, y: 0 });
                  setIsDraggingOverlay(false);
                }}
              >
                Thêm chỉ số
              </Button>
            </div>
          ) : null}
          {/* Modal for Báo cáo */}
          <Modal
            title="Chọn chỉ số"
            open={metricOverlayVisible && currentSectionForMetric === sectionId}
            onCancel={() => setMetricOverlayVisible(false)}
            footer={null}
            width={520}
            style={{ top: 100 }}
            styles={{
              body: {
                maxHeight: '500px',
                overflowY: 'auto',
                padding: '16px'
              }
            }}
          >
            <style>{`
              .ant-modal-body::-webkit-scrollbar {
                width: 8px;
              }
              .ant-modal-body::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
              }
              .ant-modal-body::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 4px;
              }
              .ant-modal-body::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
            `}</style>
            {Object.entries(
              allMetricsPool.reduce((acc, metric) => {
                const domain = metric.domain || 'Khác';
                if (!acc[domain]) acc[domain] = [];
                acc[domain].push(metric);
                return acc;
              }, {})
            ).map(([domain, metrics]) => (
              <div key={domain} style={{ marginBottom: 20 }}>
                <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>
                  {domain}
                </Text>
                <Space direction="vertical" style={{ width: '100%' }} size={8}>
                  {metrics.map(metric => {
                    const isSelected = (sectionMetrics[currentSectionForMetric] || []).includes(metric.id);
                    return (
                      <div
                        key={metric.id}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 6,
                          border: isSelected ? '1px solid #FF5629' : '1px solid #E1E3E5',
                          background: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          pointerEvents: 'auto'
                        }}
                        onClick={(e) => {
                          // Allow clicking on the checkbox or text to toggle
                          const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
                          if (checkbox && e.target !== checkbox) {
                            checkbox.click();
                          }
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.background = '#FFF5F3';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff';
                        }}
                      >
                        <Checkbox
                          checked={isSelected}
                          className="custom-primary-checkbox"
                          onChange={(e) => {
                            e.stopPropagation();
                            const checked = e.target.checked;
                            if (checked) {
                              // Check if widget can fit
                              const widgetType = getWidgetType(metric);
                              const widgetSize = getWidgetSize(widgetType);
                              if (!canAddToSection(currentSectionForMetric, 'bao-cao', widgetSize)) {
                                message.warning('Không đủ không gian để thêm chỉ số này. Vui lòng xóa một số chỉ số khác trước.');
                                return;
                              }
                              // Add metric and create widget
                              setSectionMetrics(prev => ({
                                ...prev,
                                [currentSectionForMetric]: [...(prev[currentSectionForMetric] || []), metric.id]
                              }));
                              const position = findAvailablePosition(currentSectionForMetric, widgetSize);
                              setSectionWidgetLayouts(prev => {
                                const currentLayout = prev[currentSectionForMetric] || [];
                                // Check if widget already exists
                                if (currentLayout.some(w => w.i === metric.id)) {
                                  return prev;
                                }
                                return {
                                  ...prev,
                                  [currentSectionForMetric]: [...currentLayout, {
                                    i: metric.id,
                                    x: position.x,
                                    y: position.y,
                                    w: widgetSize.w,
                                    h: widgetSize.h
                                  }]
                                };
                              });
                              // Set default chart type
                              if (widgetType === 'breakdown') {
                                setMetricChartTypes(prev => ({ ...prev, [metric.id]: 'pie' }));
                              }
                            } else {
                              // Remove metric and its widget
                              setSectionMetrics(prev => ({
                                ...prev,
                                [currentSectionForMetric]: (prev[currentSectionForMetric] || []).filter(id => id !== metric.id)
                              }));
                              setSectionWidgetLayouts(prev => ({
                                ...prev,
                                [currentSectionForMetric]: (prev[currentSectionForMetric] || []).filter(item => item.i !== metric.id)
                              }));
                              setMetricChartTypes(prev => {
                                const newTypes = { ...prev };
                                delete newTypes[metric.id];
                                return newTypes;
                              });
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Text
                          style={{ marginLeft: 0, fontSize: 13, flex: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Toggle checkbox when clicking text
                            const checkbox = e.currentTarget.previousSibling?.querySelector('input[type="checkbox"]');
                            if (checkbox) {
                              checkbox.click();
                            }
                          }}
                        >
                          {metric.name}
                        </Text>
                      </div>
                    );
                  })}
                </Space>
              </div>
            ))}
          </Modal>
        </>
      );
    } else if (sectionId === 'loi-canh-bao') {
      const alertsList = sectionMetrics[sectionId] || [];
      const hasAlerts = alertsList.length > 0;
      const activeTab = alertSectionActiveTab[sectionId] || 'errors';

      // Helper to get alert data by ID
      const getAlertById = (alertId) => {
        const allErrors = alertsData?.errors || [];
        const allWarnings = alertsData?.warnings || [];
        const error = allErrors.find(a => a.id === alertId);
        const warning = allWarnings.find(a => a.id === alertId);
        if (error) return { ...error, type: 'error' };
        if (warning) return { ...warning, type: 'warning' };
        return null;
      };

      // Separate errors and warnings
      const errorsList = alertsList.filter(alertId => {
        const alert = getAlertById(alertId);
        return alert && alert.type === 'error';
      });
      const warningsList = alertsList.filter(alertId => {
        const alert = getAlertById(alertId);
        return alert && alert.type === 'warning';
      });
      const hasErrors = errorsList.length > 0;
      const hasWarnings = warningsList.length > 0;

      const renderAlertList = (alertIds) => {
        return (
          <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {alertIds.map(alertId => {
              const alert = getAlertById(alertId);
              if (!alert) return null;
              const isError = alert.type === 'error';
              const bgColor = isError ? '#FEF3F2' : '#FFF7E6';
              const hoverBgColor = isError ? '#FEE4E2' : '#FFE7BA';
              const guides = alertGuides[alert.id] || [];
              const isExpanded = expandedAlerts.has(alert.id);

              return (
                <div key={alertId}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 12px',
                      borderRadius: 6,
                      background: bgColor,
                      border: 'none',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      gap: 8,
                      position: 'relative'
                    }}
                    onClick={() => {
                      if (guides.length > 0) {
                        setExpandedAlerts(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has(alert.id)) {
                            newSet.delete(alert.id);
                          } else {
                            newSet.add(alert.id);
                          }
                          return newSet;
                        });
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = hoverBgColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = bgColor;
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: '#2b2b2b',
                          lineHeight: 1
                        }}>
                          {alert.value || alert.count || ''}
                        </span>
                        <Text style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: '#2b2b2b'
                        }}>
                          {alert.title}
                        </Text>
                      </div>
                    </div>
                    <Button
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSectionMetrics(prev => ({
                          ...prev,
                          [sectionId]: (prev[sectionId] || []).filter(id => id !== alertId)
                        }));
                        setExpandedAlerts(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(alert.id);
                          return newSet;
                        });
                      }}
                      style={{
                        padding: 0,
                        height: 'auto',
                        flexShrink: 0
                      }}
                    />
                  </div>
                  {isExpanded && guides.length > 0 && (
                    <div style={{
                      padding: '12px',
                      background: '#FAFAFA',
                      borderLeft: `3px solid ${isError ? '#D72C0D' : '#FA8C16'}`,
                      marginTop: 4,
                      borderRadius: '0 0 6px 6px'
                    }}>
                      <List
                        size="small"
                        dataSource={guides}
                        renderItem={(guide) => (
                          <List.Item style={{ padding: '8px 0', border: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                              <div style={{ flex: 1 }}>
                                <Text style={{ fontSize: 12, color: '#2b2b2b' }}>{guide.title}</Text>
                                <div style={{ fontSize: 11, color: '#6D7175', marginTop: 2 }}>{guide.category}</div>
                              </div>
                              <ExportOutlined
                                style={{
                                  fontSize: 12,
                                  color: '#8c8c8c',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = '#1677FF';
                                  e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = '#8c8c8c';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              />
                            </div>
                          </List.Item>
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      };

      content = (
        <>
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setAlertSectionActiveTab(prev => ({ ...prev, [sectionId]: key }))}
            items={[
              {
                key: 'errors',
                label: (
                  <Space>
                    <span>Lỗi</span>
                    {hasErrors && (
                      <span style={{
                        backgroundColor: '#FEF3F2',
                        color: '#D72C0D',
                        border: '1px solid #D72C0D',
                        borderRadius: '50%',
                        fontSize: 12,
                        fontWeight: 600,
                        width: '20px',
                        height: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        lineHeight: 1,
                        flexShrink: 0
                      }}>
                        {errorsList.length}
                      </span>
                    )}
                  </Space>
                ),
                children: hasErrors ? renderAlertList(errorsList) : (
                  <div style={{ position: 'relative', padding: '20px 0' }}>
                    <Button
                      ref={(ref) => {
                        if (currentSectionForMetric === sectionId && metricOverlayVisible && activeTab === 'errors') {
                          setOverlayButtonRef(ref);
                        }
                      }}
                      type="dashed"
                      size="small"
                      icon={<PlusOutlined />}
                      block
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSectionForMetric(sectionId);
                        setMetricOverlayVisible(true);
                        setOverlayButtonRef(e.currentTarget);
                        setOverlayPosition({ x: 0, y: 0 });
                        setIsDraggingOverlay(false);
                      }}
                    >
                      Thêm chỉ số
                    </Button>
                  </div>
                )
              },
              {
                key: 'warnings',
                label: (
                  <Space>
                    <span>Cảnh báo</span>
                    {hasWarnings && (
                      <span style={{
                        backgroundColor: '#FFFBE6',
                        color: '#D48806',
                        border: '1px solid #D48806',
                        borderRadius: '50%',
                        fontSize: 12,
                        fontWeight: 600,
                        width: '20px',
                        height: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        lineHeight: 1,
                        flexShrink: 0
                      }}>
                        {warningsList.length}
                      </span>
                    )}
                  </Space>
                ),
                children: hasWarnings ? renderAlertList(warningsList) : (
                  <div style={{ position: 'relative', padding: '20px 0' }}>
                    <Button
                      ref={(ref) => {
                        if (currentSectionForMetric === sectionId && metricOverlayVisible && activeTab === 'warnings') {
                          setOverlayButtonRef(ref);
                        }
                      }}
                      type="dashed"
                      size="small"
                      icon={<PlusOutlined />}
                      block
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSectionForMetric(sectionId);
                        setMetricOverlayVisible(true);
                        setOverlayButtonRef(e.currentTarget);
                        setOverlayPosition({ x: 0, y: 0 });
                        setIsDraggingOverlay(false);
                      }}
                    >
                      Thêm chỉ số
                    </Button>
                  </div>
                )
              }
            ]}
          />
          {/* Modal for Lỗi & Cảnh báo */}
          <Modal
            title="Chọn chỉ số"
            open={metricOverlayVisible && currentSectionForMetric === sectionId}
            onCancel={() => setMetricOverlayVisible(false)}
            footer={null}
            width={520}
            style={{ top: 100 }}
            styles={{
              body: {
                maxHeight: '500px',
                overflowY: 'auto',
                padding: '16px'
              }
            }}
          >
            <style>{`
              .ant-modal-body::-webkit-scrollbar {
                width: 8px;
              }
              .ant-modal-body::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
              }
              .ant-modal-body::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 4px;
              }
              .ant-modal-body::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
            `}</style>
            <Tabs
              size="small"
              items={[
                {
                  key: 'errors',
                  label: (
                    <Space>
                      <span>Lỗi</span>
                    </Space>
                  ),
                  children: (
                    <div>
                      {Object.entries(
                        (alertsData?.errors || []).reduce((acc, alert) => {
                          const metric = alert.metric || 'Khác';
                          if (!acc[metric]) acc[metric] = [];
                          acc[metric].push(alert);
                          return acc;
                        }, {})
                      ).map(([metric, alerts]) => (
                        <div key={metric} style={{ marginBottom: 20 }}>
                          <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>
                            {metric}
                          </Text>
                          <Space direction="vertical" style={{ width: '100%' }} size={8}>
                            {alerts.map(alert => {
                              const isSelected = (sectionMetrics[sectionId] || []).includes(alert.id);
                              return (
                                <div
                                  key={alert.id}
                                  style={{
                                    padding: '10px 12px',
                                    borderRadius: 6,
                                    border: isSelected ? '1px solid #FF5629' : '1px solid #E1E3E5',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    pointerEvents: 'auto'
                                  }}
                                  onClick={(e) => {
                                    // Allow clicking on the checkbox or text to toggle
                                    const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
                                    if (checkbox && e.target !== checkbox) {
                                      checkbox.click();
                                    }
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isSelected) e.currentTarget.style.background = '#FFF5F3';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#fff';
                                  }}
                                >
                                  <Checkbox
                                    checked={isSelected}
                                    className="custom-primary-checkbox"
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      const checked = e.target.checked;
                                      if (checked) {
                                        // Check if section has enough space
                                        if (!canAddToSection(sectionId, 'loi-canh-bao')) {
                                          message.warning('Không đủ không gian để thêm chỉ số này. Vui lòng xóa một số chỉ số khác trước.');
                                          return;
                                        }
                                        // Add alert
                                        setSectionMetrics(prev => ({
                                          ...prev,
                                          [sectionId]: [...(prev[sectionId] || []), alert.id]
                                        }));
                                      } else {
                                        // Remove alert
                                        setSectionMetrics(prev => ({
                                          ...prev,
                                          [sectionId]: (prev[sectionId] || []).filter(id => id !== alert.id)
                                        }));
                                        setExpandedAlerts(prev => {
                                          const newSet = new Set(prev);
                                          newSet.delete(alert.id);
                                          return newSet;
                                        });
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <Text
                                    style={{ marginLeft: 0, fontSize: 13, flex: 1 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const checkbox = e.currentTarget.previousSibling?.querySelector('input[type="checkbox"]');
                                      if (checkbox) {
                                        checkbox.click();
                                      }
                                    }}
                                  >
                                    {alert.title}
                                  </Text>
                                </div>
                              );
                            })}
                          </Space>
                        </div>
                      ))}
                    </div>
                  )
                },
                {
                  key: 'warnings',
                  label: (
                    <Space>
                      <span>Cảnh báo</span>
                    </Space>
                  ),
                  children: (
                    <div>
                      {Object.entries(
                        (alertsData?.warnings || []).reduce((acc, alert) => {
                          const metric = alert.metric || 'Khác';
                          if (!acc[metric]) acc[metric] = [];
                          acc[metric].push(alert);
                          return acc;
                        }, {})
                      ).map(([metric, alerts]) => (
                        <div key={metric} style={{ marginBottom: 20 }}>
                          <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>
                            {metric}
                          </Text>
                          <Space direction="vertical" style={{ width: '100%' }} size={8}>
                            {alerts.map(alert => {
                              const isSelected = (sectionMetrics[sectionId] || []).includes(alert.id);
                              return (
                                <div
                                  key={alert.id}
                                  style={{
                                    padding: '10px 12px',
                                    borderRadius: 6,
                                    border: isSelected ? '1px solid #FF5629' : '1px solid #E1E3E5',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    pointerEvents: 'auto'
                                  }}
                                  onClick={(e) => {
                                    // Allow clicking on the checkbox or text to toggle
                                    const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
                                    if (checkbox && e.target !== checkbox) {
                                      checkbox.click();
                                    }
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isSelected) e.currentTarget.style.background = '#FFF5F3';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#fff';
                                  }}
                                >
                                  <Checkbox
                                    checked={isSelected}
                                    className="custom-primary-checkbox"
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      const checked = e.target.checked;
                                      if (checked) {
                                        // Check if section has enough space
                                        if (!canAddToSection(sectionId, 'loi-canh-bao')) {
                                          message.warning('Không đủ không gian để thêm chỉ số này. Vui lòng xóa một số chỉ số khác trước.');
                                          return;
                                        }
                                        // Add alert
                                        setSectionMetrics(prev => ({
                                          ...prev,
                                          [sectionId]: [...(prev[sectionId] || []), alert.id]
                                        }));
                                      } else {
                                        // Remove alert
                                        setSectionMetrics(prev => ({
                                          ...prev,
                                          [sectionId]: (prev[sectionId] || []).filter(id => id !== alert.id)
                                        }));
                                        setExpandedAlerts(prev => {
                                          const newSet = new Set(prev);
                                          newSet.delete(alert.id);
                                          return newSet;
                                        });
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <Text
                                    style={{ marginLeft: 0, fontSize: 13, flex: 1 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const checkbox = e.currentTarget.previousSibling?.querySelector('input[type="checkbox"]');
                                      if (checkbox) {
                                        checkbox.click();
                                      }
                                    }}
                                  >
                                    {alert.title}
                                  </Text>
                                </div>
                              );
                            })}
                          </Space>
                        </div>
                      ))}
                    </div>
                  )
                }
              ]}
            />
          </Modal>
        </>
      );
    } else if (sectionId === 'tin-tuc') {
      content = (
        <List
          size="small"
          dataSource={contentItems.insights}
          renderItem={(item) => {
            const getIcon = (iconType) => {
              switch (iconType) {
                case 'chart': return <LineChartOutlined />;
                case 'bulb': return <BulbOutlined />;
                case 'book': return <BookOutlined />;
                default: return <BookOutlined />;
              }
            };
            return (
              <List.Item
                style={{
                  padding: '8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <List.Item.Meta
                  style={{ flex: 1 }}
                  avatar={
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {React.cloneElement(getIcon(item.icon), {
                        style: { fontSize: 12, color: item.color }
                      })}
                    </div>
                  }
                  title={<Text style={{ fontSize: 12 }}>{item.title}</Text>}
                  description={<Text type="secondary" style={{ fontSize: 11 }}>{item.date}</Text>}
                />
                <ExportOutlined
                  style={{
                    fontSize: 10,
                    color: '#8c8c8c',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    flexShrink: 0,
                    marginLeft: 8
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1677FF';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#8c8c8c';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </List.Item>
            );
          }}
        />
      );
    }

    return (
      <div
        data-section-id={sectionId}
        className={`react-grid-item ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          background: '#fff',
          borderRadius: 8,
          border: borderStyle,
          boxShadow: isHovered && !isSelected ? 'none' : '0 1px 2px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'move',
          transition: 'all 0.2s'
        }}
        onMouseEnter={() => setHoveredWidget(sectionId)}
        onMouseLeave={() => setHoveredWidget(null)}
        onClick={() => setSelectedWidget(sectionId)}
      >
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #E1E3E5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FAFAFA'
        }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}
            onMouseEnter={() => setHoveredSectionTitle(sectionKey)}
            onMouseLeave={() => setHoveredSectionTitle(null)}
          >
            {editingSectionTitle === sectionKey ? (
              <Input
                value={sectionTitles[sectionKey]}
                onChange={(e) => setSectionTitles(prev => ({ ...prev, [sectionKey]: e.target.value }))}
                onBlur={() => setEditingSectionTitle(null)}
                onPressEnter={() => setEditingSectionTitle(null)}
                autoFocus
                style={{ flex: 1 }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <Text
                  strong
                  style={{ fontSize: 14, display: 'inline-block' }}
                >
                  {title}
                </Text>
                {hoveredSectionTitle === sectionKey && (
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingSectionTitle(sectionKey);
                    }}
                    style={{
                      padding: '0 4px',
                      minWidth: 'auto',
                      height: 'auto',
                      marginLeft: 4,
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  />
                )}
              </>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {showAddButton && (
              <Button
                type="text"
                size="small"
                icon={<PlusOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSectionForMetric(sectionId);
                  setMetricOverlayVisible(true);
                }}
                style={{
                  color: '#1677FF',
                  fontSize: 12
                }}
              >
                Thêm chỉ số
              </Button>
            )}
            <Tooltip title={sectionLinks[sectionType] ? `Link: ${typeof sectionLinks[sectionType] === 'object' ? sectionLinks[sectionType].url : sectionLinks[sectionType]}` : 'Thêm link'}>
              <Button
                ref={(el) => {
                  if (el && editingSectionLink === sectionId) {
                    setLinkButtonRef(el);
                  }
                }}
                type="text"
                size="small"
                icon={<LinkOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  const buttonRect = e.currentTarget.getBoundingClientRect();
                  setEditingSectionLink(sectionId);
                  const currentLink = sectionLinks[sectionType];
                  setLinkInputValue(typeof currentLink === 'object' ? (currentLink?.url || '') : (currentLink || ''));
                  setLinkTextValue(typeof currentLink === 'object' ? (currentLink?.text || 'Xem thêm') : 'Xem thêm');
                  setLinkOverlayPosition({
                    top: buttonRect.bottom + 4,
                    left: buttonRect.left
                  });
                  setLinkButtonRef(e.currentTarget);
                  setLinkOverlayVisible(true);
                }}
                style={{
                  color: sectionLinks[sectionType] ? '#1677FF' : '#8c8c8c',
                  fontSize: 12
                }}
              />
            </Tooltip>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeleteSection(sectionId);
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              style={{
                color: '#8c8c8c',
                zIndex: 1000,
                position: 'relative',
                pointerEvents: 'auto'
              }}
            />
          </div>
        </div>
        <div className="section-content-area" style={{ flex: 1, padding: 16, overflow: 'hidden' }}>
          {content}
        </div>
      </div>
    );
  };

  const renderWidget = (widgetId) => {
    const widget = Object.values(widgetLibrary).flat().find(w => w.id === widgetId);
    if (!widget) return null;

    const isHovered = hoveredWidget === widgetId;
    const isSelected = selectedWidget === widgetId;

    let content = null;
    if (widget.type === 'chart') {
      if (widget.id === 'widget-sales-channel') {
        content = (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'Shopee', value: 1200 },
              { name: 'TikTok', value: 800 },
              { name: 'Website', value: 400 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <Bar dataKey="value" fill="#1677FF" />
            </BarChart>
          </ResponsiveContainer>
        );
      } else if (widget.id === 'widget-sessions') {
        content = (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={templateData['default'].chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <RechartLine type="monotone" dataKey="value" stroke="#1677FF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      } else {
        content = <div style={{ padding: 20, textAlign: 'center', color: '#8c8c8c' }}>No data for this date range</div>;
      }
    } else if (widget.type === 'metric') {
      content = (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#2b2b2b', marginBottom: 8 }}>₫2.4B</div>
          <div style={{ fontSize: 14, color: '#6D7175' }}>{widget.name}</div>
        </div>
      );
    } else if (widget.type === 'alert') {
      content = (
        <div style={{ padding: 16 }}>
          <Tabs size="small" items={[
            { key: 'errors', label: 'Lỗi', children: <div style={{ padding: '8px 0' }}>5 SKU quá trọng sắp hết</div> },
            { key: 'warnings', label: 'Cảnh báo', children: <div style={{ padding: '8px 0' }}>14 SKU sắp hết hàng</div> }
          ]} />
        </div>
      );
    } else if (widget.type === 'news') {
      content = (
        <List
          size="small"
          dataSource={contentItems.insights.slice(0, 3)}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.title} description={item.date} />
            </List.Item>
          )}
        />
      );
    }

    return (
      <div
        className={`react-grid-item ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          background: '#fff',
          borderRadius: 8,
          border: isSelected ? '2px solid #1677FF' : '1px solid #E1E3E5',
          boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'move',
          transition: 'all 0.2s'
        }}
        onMouseEnter={() => setHoveredWidget(widgetId)}
        onMouseLeave={() => setHoveredWidget(null)}
        onClick={() => setSelectedWidget(widgetId)}
      >
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #E1E3E5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FAFAFA'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
            <DragOutlined style={{ color: '#8c8c8c', cursor: 'move' }} />
            <Text strong style={{ fontSize: 14 }}>{widget.displayName || widget.name}</Text>
          </div>
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDeleteWidget(widgetId);
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
            style={{
              color: '#8c8c8c',
              zIndex: 1000,
              position: 'relative',
              pointerEvents: 'auto'
            }}
          />
        </div>
        <div style={{ flex: 1, padding: 16, overflow: 'auto' }}>
          {content}
        </div>
      </div>
    );
  };

  const renderTemplateBuilderScreen = () => {
    const hasAlertSection = sectionLayout.some(item => (item.type || getSectionType(item.i)) === 'loi-canh-bao');
    const hasNewsSection = sectionLayout.some(item => (item.type || getSectionType(item.i)) === 'tin-tuc');
    return (
      <>
        <style>{`
          .react-grid-layout {
            position: relative;
          }
          .react-grid-item {
            transition: all 200ms ease;
            transition-property: left, top, width, height;
          }
          .react-grid-item.cssTransforms {
            transition-property: transform, width, height;
          }
          .react-grid-item.resizing {
            z-index: 1;
            will-change: width, height;
          }
          .react-grid-item.react-draggable-dragging {
            transition: none;
            z-index: 3;
            opacity: 0.5;
          }
          .react-grid-item.dropping {
            visibility: hidden;
          }
          .react-grid-item > .react-resizable-handle {
            position: absolute;
            width: 20px;
            height: 20px;
            bottom: 0;
            right: 0;
            cursor: se-resize;
            z-index: 3;
          }
          .react-grid-item > .react-resizable-handle::after {
            content: "";
            position: absolute;
            right: 3px;
            bottom: 3px;
            width: 5px;
            height: 5px;
            border-right: 2px solid rgba(0, 0, 0, 0.4);
            border-bottom: 2px solid rgba(0, 0, 0, 0.4);
          }
          .react-grid-item:hover > .react-resizable-handle {
            opacity: 1;
          }
          .react-grid-item > .react-resizable-handle {
            opacity: 0;
            transition: opacity 0.2s;
          }
          .react-grid-item.selected {
            border: 2px solid #1677FF !important;
          }
          .react-grid-item.hovered > .react-resizable-handle {
            opacity: 1;
          }
        `}</style>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#FAFBFB',
          display: 'flex',
          zIndex: 1000
        }}>
          {/* Left Sidebar - Fixed 240px */}
          <div style={{
            width: '240px',
            background: '#fff',
            borderRight: '1px solid #E1E3E5',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              padding: '20px 16px',
              borderBottom: '1px solid #E1E3E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <Button
                type="text"
                icon={<LeftOutlined />}
                onClick={handleCancelTemplateCreation}
                style={{ position: 'absolute', left: 12 }}
              />
            </div>

            {/* Template name input */}
            <div style={{ padding: 16, borderBottom: '1px solid #F0F0F0' }}>
              <Input
                placeholder="Nhập tên template"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
              />
            </div>

            {/* Sections List - Only Titles */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              <Space direction="vertical" style={{ width: '100%' }} size={12}>
                {/* Section: Báo cáo */}
                <div
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #E1E3E5',
                    borderRadius: 8,
                    background: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => addSectionToPreview('bao-cao')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F5F7FB';
                    e.currentTarget.style.borderColor = '#1677FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = '#E1E3E5';
                  }}
                >
                  <Text strong style={{ fontSize: 14 }}>Báo cáo</Text>
                </div>

                {/* Section: Lỗi & Cảnh báo */}
                <div
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #E1E3E5',
                    borderRadius: 8,
                    background: '#fff',
                    cursor: hasAlertSection ? 'not-allowed' : 'pointer',
                    opacity: hasAlertSection ? 0.5 : 1,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8
                  }}
                  onClick={() => {
                    if (hasAlertSection) return;
                    addSectionToPreview('loi-canh-bao');
                  }}
                  onMouseEnter={(e) => {
                    if (hasAlertSection) return;
                    e.currentTarget.style.background = '#F5F7FB';
                    e.currentTarget.style.borderColor = '#1677FF';
                  }}
                  onMouseLeave={(e) => {
                    if (hasAlertSection) return;
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = '#E1E3E5';
                  }}
                >
                  <Text strong style={{ fontSize: 14 }}>Lỗi & Cảnh báo</Text>
                  {hasAlertSection && <Tag color="default">Đã thêm</Tag>}
                </div>

                {/* Section: Tin tức */}
                <div
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #E1E3E5',
                    borderRadius: 8,
                    background: '#fff',
                    cursor: hasNewsSection ? 'not-allowed' : 'pointer',
                    opacity: hasNewsSection ? 0.5 : 1,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8
                  }}
                  onClick={() => {
                    if (hasNewsSection) return;
                    addSectionToPreview('tin-tuc');
                  }}
                  onMouseEnter={(e) => {
                    if (hasNewsSection) return;
                    e.currentTarget.style.background = '#F5F7FB';
                    e.currentTarget.style.borderColor = '#1677FF';
                  }}
                  onMouseLeave={(e) => {
                    if (hasNewsSection) return;
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = '#E1E3E5';
                  }}
                >
                  <Text strong style={{ fontSize: 14 }}>Tin tức</Text>
                  {hasNewsSection && <Tag color="default">Đã thêm</Tag>}
                </div>
              </Space>
            </div>

            {/* Footer Actions */}
            <div style={{
              padding: '16px',
              borderTop: '1px solid #E1E3E5',
              display: 'flex',
              gap: 8
            }}>
              <Button onClick={handleCancelTemplateCreation} style={{ flex: 1 }}>
                Hủy
              </Button>
              <Button.Group style={{ flex: 1, display: 'flex' }}>
                <Button
                  type="primary"
                  onClick={() => {
                    if (!newTemplateName.trim() && sectionLayout.length === 0) {
                      message.error('Vui lòng nhập tên template và chọn ít nhất 1 section');
                      return;
                    }
                    if (!newTemplateName.trim()) {
                      message.error('Vui lòng nhập tên template');
                      return;
                    }
                    if (sectionLayout.length === 0) {
                      message.error('Vui lòng chọn ít nhất 1 section');
                      return;
                    }
                    handleSaveTemplateFromBuilder(false);
                  }}
                  disabled={!newTemplateName.trim() && sectionLayout.length === 0}
                  style={{
                    flex: 1,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRight: 'none'
                  }}
                >
                  Lưu
                </Button>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'save-and-use',
                        label: 'Lưu & Sử dụng',
                        onClick: () => {
                          if (!newTemplateName.trim() && sectionLayout.length === 0) {
                            message.error('Vui lòng nhập tên template và chọn ít nhất 1 section');
                            return;
                          }
                          if (!newTemplateName.trim()) {
                            message.error('Vui lòng nhập tên template');
                            return;
                          }
                          if (sectionLayout.length === 0) {
                            message.error('Vui lòng chọn ít nhất 1 section');
                            return;
                          }
                          handleSaveTemplateFromBuilder(true);
                        }
                      }
                    ]
                  }}
                  disabled={!newTemplateName.trim() && sectionLayout.length === 0}
                >
                  <Button
                    type="primary"
                    icon={<ArrowDownOutlined />}
                    style={{
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                </Dropdown>
              </Button.Group>
            </div>
          </div>

          {/* Right Canvas - 75% */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Canvas Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #E1E3E5',
              background: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text strong style={{ fontSize: 16 }}>Xem trước</Text>
            </div>

            {/* Grid Canvas */}
            <div
              id="grid-canvas-container"
              style={{
                flex: 1,
                padding: '24px',
                overflow: 'auto',
                background: '#F5F5F5',
                position: 'relative'
              }}
            >
              {/* Grid Cells Background - 12 columns × 24 rows */}
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  left: 24,
                  right: 24,
                  bottom: 24,
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              >
                {(() => {
                  const containerWidth = typeof window !== 'undefined'
                    ? Math.floor((window.innerWidth * 0.75 - 48) / 12) * 12
                    : 1200;
                  const rowHeight = 30;
                  const colWidth = (containerWidth - (16 * 11)) / 12; // 11 gaps between 12 columns
                  const cellHeight = rowHeight;

                  return Array.from({ length: 12 * 24 }).map((_, index) => {
                    const col = index % 12;
                    const row = Math.floor(index / 12);
                    return (
                      <div
                        key={`cell-${col}-${row}`}
                        style={{
                          position: 'absolute',
                          left: col * (colWidth + 16),
                          top: row * (cellHeight + 16),
                          width: colWidth,
                          height: cellHeight,
                          border: '1px dashed #D9D9D9',
                          borderRadius: 8,
                          background: 'transparent'
                        }}
                      />
                    );
                  });
                })()}
              </div>

              <GridLayout
                className="layout"
                layout={sectionLayout}
                cols={12}
                rowHeight={30}
                width={typeof window !== 'undefined' ? Math.floor((window.innerWidth * 0.75 - 48) / 12) * 12 : 1200}
                onLayoutChange={(layout) => setSectionLayout(layout)}
                isDraggable={true}
                isResizable={true}
                margin={[16, 16]}
                containerPadding={[0, 0]}
                compactType={null}
                preventCollision={true}
                useCSSTransforms={true}
                resizeHandles={['se']}
                minW={3}
                maxW={12}
                minH={3}
                maxH={12}
              >
                {sectionLayout.map(item => (
                  <div key={item.i} style={{ position: 'relative', zIndex: 10 }}>
                    {renderSectionCard(item.i)}
                  </div>
                ))}
              </GridLayout>
            </div>
          </div>

        </div>
        {/* Overlay for editing section link */}
        {linkOverlayVisible && editingSectionLink && (
          <>
            {/* Backdrop */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                background: 'transparent'
              }}
              onClick={() => {
                setLinkOverlayVisible(false);
                setEditingSectionLink(null);
                setLinkInputValue('');
                setLinkTextValue('Xem thêm');
              }}
            />
            {/* Overlay */}
            <div
              style={{
                position: 'fixed',
                top: linkOverlayPosition.top,
                left: linkOverlayPosition.left,
                zIndex: 10000,
                background: '#fff',
                border: '1px solid #E1E3E5',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                padding: 16,
                minWidth: 300,
                maxWidth: 400
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ marginBottom: 12 }}>
                <Text style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>URL:</Text>
                <Input
                  placeholder="Nhập link (ví dụ: https://example.com)"
                  value={linkInputValue}
                  onChange={(e) => setLinkInputValue(e.target.value)}
                  style={{ marginBottom: 12 }}
                  autoFocus
                />
                <Text style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>Text hiển thị:</Text>
                <Input
                  placeholder="Xem thêm"
                  value={linkTextValue}
                  onChange={(e) => setLinkTextValue(e.target.value)}
                  onPressEnter={() => {
                    if (editingSectionLink && linkInputValue.trim()) {
                      const sectionKey = getSectionType(editingSectionLink);
                      setSectionLinks(prev => ({
                        ...prev,
                        [sectionKey]: {
                          url: linkInputValue.trim(),
                          text: linkTextValue.trim() || 'Xem thêm'
                        }
                      }));
                      setLinkOverlayVisible(false);
                      setEditingSectionLink(null);
                      setLinkInputValue('');
                      setLinkTextValue('Xem thêm');
                    }
                  }}
                />
                {editingSectionLink && sectionLinks[getSectionType(editingSectionLink)] && (
                  <div style={{ marginTop: 12, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      Link hiện tại: <a href={typeof sectionLinks[getSectionType(editingSectionLink)] === 'object' ? sectionLinks[getSectionType(editingSectionLink)].url : sectionLinks[getSectionType(editingSectionLink)]} target="_blank" rel="noopener noreferrer">{typeof sectionLinks[getSectionType(editingSectionLink)] === 'object' ? sectionLinks[getSectionType(editingSectionLink)].url : sectionLinks[getSectionType(editingSectionLink)]}</a>
                    </Text>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    if (editingSectionLink && linkInputValue.trim()) {
                      const sectionKey = getSectionType(editingSectionLink);
                      setSectionLinks(prev => ({
                        ...prev,
                        [sectionKey]: {
                          url: linkInputValue.trim(),
                          text: linkTextValue.trim() || 'Xem thêm'
                        }
                      }));
                      setLinkOverlayVisible(false);
                      setEditingSectionLink(null);
                      setLinkInputValue('');
                      setLinkTextValue('Xem thêm');
                    }
                  }}
                >
                  Lưu
                </Button>
              </div>
            </div>
          </>
        )}
      </>
    );
  };
  const handleOpenPreview = (templateId, context) => {
    setPreviewTemplateId(templateId);
    setPreviewContext(context);
    setPreviewTemplateModalVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewTemplateModalVisible(false);
    setPreviewTemplateId(null);
    setPreviewContext(null);
  };

  const handleUsePreviewTemplate = () => {
    if (!previewTemplateId) return;
    if (previewContext === 'gallery') {
      const template = templateWorkspaces.find(t => (t.templateId || t.id) === previewTemplateId);
      if (!template) return;
      handleCreateFromTemplate(template);
      setActiveModule('workspace-settings');
    } else {
      handleTemplateCardApply(previewTemplateId);
    }
    handleClosePreview();
  };

  const cloneAlerts = (items = []) => items.map(item => ({ ...item }));

  const buildSectionLayoutFromFlags = (flags = {}) => {
    const {
      showDashboard = true,
      showAlerts = true,
      showGuides = true
    } = flags;
    const layout = [];
    let currentY = 0;
    if (showDashboard) {
      layout.push({ i: 'bao-cao', x: 0, y: currentY, w: 12, h: 10 });
      currentY += 10;
    }
    if (showAlerts) {
      layout.push({ i: 'loi-canh-bao', x: 0, y: currentY, w: 12, h: 8 });
      currentY += 8;
    }
    if (showGuides) {
      layout.push({ i: 'tin-tuc', x: 0, y: currentY, w: 12, h: 6 });
    }
    if (layout.length === 0) {
      return [{ i: 'bao-cao', x: 0, y: 0, w: 12, h: 10 }];
    }
    return layout;
  };

  const templateReportMetricPresets = {
    default: ['gmv-yesterday', 'orders-yesterday', 'aov', 'roas', 'gmv-channel', 'ads-cost'],
    'template-ceo': ['revenue-net', 'profit', 'margin', 'gmv-channel', 'stock-value', 'roas'],
    'template-ecommerce-manager': ['gmv-yesterday', 'orders-yesterday', 'repeat-rate', 'new-customers', 'aov', 'gmv-channel'],
    'template-media': ['ads-cost', 'roas', 'cpc', 'ctr', 'ad-impression', 'gmv-yesterday'],
    'template-marketing': ['new-customers', 'repeat-rate', 'customer-ltv', 'roas', 'gmv-channel', 'orders-yesterday'],
    'template-accounting': ['revenue-net', 'cogs', 'profit', 'margin', 'stock-value', 'gmv-yesterday']
  };

  const buildPresetSectionMetrics = (templateKey, flags = {}) => {
    const reports = templateReportMetricPresets[templateKey] || templateReportMetricPresets.default;
    const includeAlerts = flags.showAlerts !== false;
    const includeNews = flags.showGuides !== false;
    return {
      'bao-cao': reports,
      'loi-canh-bao': includeAlerts ? {
        errors: cloneAlerts(alertMetrics.errors.slice(0, 2)),
        warnings: cloneAlerts(alertMetrics.warnings.slice(0, 2))
      } : { errors: [], warnings: [] },
      'tin-tuc': includeNews ? contentItems.insights.slice(0, 3) : []
    };
  };

  const buildWidgetLayoutFromMetricIds = (metricIds = []) => {
    let x = 0;
    let y = 0;
    const layouts = [];
    metricIds.forEach(metricId => {
      const metric = allMetricsPool.find(m => m.id === metricId);
      const widgetType = getWidgetType(metric || { name: '' });
      const size = getWidgetSize(widgetType);
      layouts.push({
        i: metricId,
        x,
        y,
        w: size.w,
        h: size.h
      });
      x += size.w;
      if (x >= 12) {
        x = 0;
        y += size.h;
      }
    });
    return layouts;
  };

  const hydrateBuilderFromTemplate = (templateSource) => {
    if (!templateSource) return;
    const templateKey = templateSource.templateId || templateSource.id || 'default';
    const hasCustomSections = Array.isArray(templateSource.sectionLayout) && templateSource.sectionLayout.length > 0;
    let nextSectionLayout;
    let nextSectionMetrics;
    let nextSectionTitles = { ...sectionTitles };

    if (hasCustomSections) {
      nextSectionLayout = templateSource.sectionLayout;
      const metricsPayload = templateSource.sectionMetrics || {};
      nextSectionMetrics = {
        'bao-cao': Array.isArray(metricsPayload['bao-cao']) ? metricsPayload['bao-cao'] : [],
        'loi-canh-bao': metricsPayload['loi-canh-bao'] || { errors: [], warnings: [] },
        'tin-tuc': Array.isArray(metricsPayload['tin-tuc']) ? metricsPayload['tin-tuc'] : []
      };
      if (templateSource.sectionTitles) {
        nextSectionTitles = {
          ...sectionTitles,
          ...templateSource.sectionTitles
        };
      }
      if (templateSource.sectionLinks) {
        setSectionLinks(templateSource.sectionLinks);
      }
    } else {
      const flags = templateSource.layout || { showDashboard: true, showAlerts: true, showGuides: true };
      nextSectionLayout = buildSectionLayoutFromFlags(flags);
      nextSectionMetrics = buildPresetSectionMetrics(templateKey, flags);
    }

    setSectionLayout(nextSectionLayout);
    setSectionsInPreview(new Set(nextSectionLayout.map(item => item.i)));
    setSectionMetrics(nextSectionMetrics);
    setSectionTitles(nextSectionTitles);
    setSectionWidgetLayouts(prev => ({
      ...prev,
      'bao-cao': buildWidgetLayoutFromMetricIds(nextSectionMetrics['bao-cao']),
      'loi-canh-bao': [],
      'tin-tuc': []
    }));

    const newChartTypes = {};
    (nextSectionMetrics['bao-cao'] || []).forEach(metricId => {
      const metric = allMetricsPool.find(m => m.id === metricId);
      const widgetType = getWidgetType(metric || { name: '' });
      newChartTypes[metricId] = widgetType === 'breakdown'
        ? 'pie'
        : widgetType === 'time-series'
          ? 'line'
          : widgetType === 'comparison'
            ? 'bar'
            : 'card';
    });
    setMetricChartTypes(newChartTypes);
  };

  const handleCustomizePreviewTemplate = () => {
    if (!previewTemplateId) return;
    const templateSource = previewContext === 'gallery'
      ? templateWorkspaces.find(t => (t.templateId || t.id) === previewTemplateId)
      : templates.find(t => t.id === previewTemplateId);
    if (!templateSource) {
      message.error('Không tìm thấy template để tuỳ chỉnh');
      return;
    }
    resetTemplateBuilder();
    setNewTemplateName(`${templateSource.name || 'Template mới'} - tuỳ chỉnh`);
    hydrateBuilderFromTemplate(templateSource, previewContext);
    setActiveModule('template-create');
    setTemplateGalleryVisible(false);
    handleClosePreview();
  };

  const resetTemplateBuilder = () => {
    setNewTemplateName('');
    setBuilderTemplateName('');
    setBuilderReports([]);
    setBuilderAlertSelected(false);
    setBuilderNewsSelected(false);
    setWidgetLayout([]);
    setSelectedWidgets(new Set());
    setWidgetSearchQuery('');
    setHoveredWidget(null);
    setSelectedWidget(null);
    setSectionsInPreview(new Set());
    setSectionLayout([]);
    setSectionMetrics({
      'bao-cao': [],
      'loi-canh-bao': { errors: [], warnings: [] },
      'tin-tuc': []
    });
    setSectionTitles({
      'bao-cao': 'Báo cáo',
      'loi-canh-bao': 'Lỗi & Cảnh báo',
      'tin-tuc': 'Tin tức'
    });
  };

  const handleAddReportSection = () => {
    setBuilderReports((prev) => [
      ...prev,
      { id: `report-${Date.now()}-${Math.random().toString(36).slice(2, 5)}` }
    ]);
  };

  const handleRemoveReportSection = (reportId) => {
    setBuilderReports((prev) => prev.filter(report => report.id !== reportId));
  };

  const handleToggleAlertSection = () => {
    setBuilderAlertSelected((prev) => !prev);
  };

  const handleToggleNewsSection = () => {
    setBuilderNewsSelected((prev) => !prev);
  };

  const handleCancelTemplateCreation = () => {
    resetTemplateBuilder();
    setActiveModule('workspace-settings');
  };

  const handleSaveTemplateFromBuilder = (applyImmediately = false) => {
    const trimmedName = newTemplateName.trim();
    if (!trimmedName) {
      message.error('Vui lòng nhập tên template');
      return;
    }
    if (sectionLayout.length === 0) {
      message.error('Vui lòng chọn ít nhất 1 section');
      return;
    }
    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: trimmedName,
      isDefault: false,
      metrics: defaultTemplates[0].metrics,
      createdAt: dayjs().format('DD/MM/YYYY'),
      sectionLayout: sectionLayout,
      sectionTitles: sectionTitles,
      sectionMetrics: sectionMetrics,
      sectionLinks: sectionLinks
    };
    setTemplates((prev) => [...prev, newTemplate]);
    if (applyImmediately) {
      if (skipTemplateConfirm) {
        handleTemplateCardApply(newTemplate.id);
        resetTemplateBuilder();
        setActiveModule('workspace-settings');
      } else {
        setTemplateToApply(newTemplate.id);
        setTemplateApplyConfirmVisible(true);
        // Don't reset builder yet, wait for confirmation
      }
    } else {
      message.success(`Template "${newTemplate.name}" đã được lưu nháp`);
      resetTemplateBuilder();
      setActiveModule('workspace-settings');
    }
  };

  const previewModalTitle = useMemo(() => {
    if (!previewTemplateId) return '';
    const customTemplate = templates.find(t => t.id === previewTemplateId);
    if (customTemplate) return customTemplate.name;
    const galleryTemplate = templateWorkspaces.find(t => (t.templateId || t.id) === previewTemplateId);
    return galleryTemplate?.name || '';
  }, [previewTemplateId, templates, templateWorkspaces]);
  const previewTemplateName = previewModalTitle;

  // ========== WORKSPACE MANAGEMENT STATES ==========
  const [workspaces, setWorkspaces] = useState(() => {
    const saved = localStorage.getItem('ups-workspaces');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default workspace - shows current content (all sections visible)
    return [{
      id: 'default-workspace',
      name: 'Workspace mặc định',
      isDefault: true,
      isTemplate: false,
      groups: ['Dashboard', 'Alert & Risks', 'Guides / Case studies'],
      layout: {
        showDashboard: true,
        showAlerts: true,
        showGuides: true
      }
    }];
  });
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(() => {
    return localStorage.getItem('ups-selected-workspace') || 'default-workspace';
  });
  const [workspaceConfigDrawerVisible, setWorkspaceConfigDrawerVisible] = useState(false);
  const [workspaceEditModalVisible, setWorkspaceEditModalVisible] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); // Array of { groupId, itemId } or { groupId } for groups without items
  const [editingWorkspaceId, setEditingWorkspaceId] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState(null);

  // Workspace groups definition with sub-items
  const workspaceGroups = [
    {
      id: 'Dashboard',
      name: 'Dashboard',
      icon: <BarChartOutlined />,
      description: 'Chứa các dashboard chỉ số đã tạo sẵn',
      items: [
        { id: 'growth', name: 'Growth', description: 'Dashboard tăng trưởng' },
        { id: 'media', name: 'Media', description: 'Dashboard media' },
        { id: 'accounting', name: 'Kế toán', description: 'Dashboard kế toán' }
      ]
    },
    {
      id: 'Lỗi & Cảnh báo',
      name: 'Lỗi & Cảnh báo',
      icon: <WarningOutlined />,
      description: 'Chứa các widget/còn số liên quan báo lỗi, cảnh báo cho đơn hàng/sản phẩm/tồn kho',
      items: []
    },
    {
      id: 'Tin tức',
      name: 'Tin tức',
      icon: <BookOutlined />,
      description: 'Case study và blog',
      items: []
    }
  ];

  // Available metrics for Alerts & Risks
  const alertMetrics = {
    errors: [
      { id: 'sku-overweight', name: 'SKU quá trọng sắp hết', color: '#D72C0D', value: '5', unit: 'SKU' },
      { id: 'order-error', name: 'Đơn bị lỗi', color: '#D72C0D', value: '8', unit: 'đơn' },
      { id: 'cancel-rate', name: 'Tỷ lệ hủy tăng', color: '#D72C0D', value: '15', unit: '%' },
      { id: 'cr-low', name: 'CR hiện tại', color: '#D72C0D', value: '2', unit: '%' },
      { id: 'sku-out-of-range', name: 'SKU vượt phạm vi', color: '#D72C0D', value: '3', unit: 'SKU' }
    ],
    warnings: [
      { id: 'sku-low-stock', name: 'SKU sắp hết hàng', color: '#FA8C16', value: '14', unit: 'SKU' },
      { id: 'traffic-drop', name: 'Traffic giảm', color: '#FA8C16', value: '8', unit: '%' },
      { id: 'cost-increase', name: 'Chi phí tăng', color: '#FA8C16', value: '15.3', unit: '%' }
    ]
  };

  const [selectedAlertMetrics, setSelectedAlertMetrics] = useState({
    errors: [],
    warnings: []
  });
  const [alertMetricsOverlayVisible, setAlertMetricsOverlayVisible] = useState(false);

  // Get current workspace
  const selectedWorkspace = workspaces.find(w => w.id === selectedWorkspaceId) || (workspaces.length > 0 ? workspaces[0] : null);

  // Get template ID from workspace
  const getTemplateIdFromWorkspace = (workspace) => {
    if (!workspace) return 'default';
    // Check if workspace has templateId
    if (workspace.templateId) {
      return workspace.templateId;
    }
    // Check dashboard type if available
    const dashboardItem = workspace.selectedItems?.find(item => item.groupId === 'Dashboard' && item.itemId);
    if (dashboardItem) {
      const dashboardMap = {
        'growth': 'default',
        'media': 'template-media',
        'accounting': 'template-accounting'
      };
      return dashboardMap[dashboardItem.itemId] || 'default';
    }
    return 'default';
  };

  // Get current template data based on selected workspace
  const currentTemplateId = getTemplateIdFromWorkspace(selectedWorkspace);
  const currentTemplateData = templateData[currentTemplateId] || templateData['default'];

  // Use dynamic data
  const currentKpiOverview = currentTemplateData.kpiOverview;
  const currentChartData = currentTemplateData.chartData;
  const currentPieData = currentTemplateData.pieData;

  // Get current template
  const selectedTemplate = templates.length > 0
    ? (templates.find(t => t.id === selectedTemplateId) || templates[0])
    : null;

  // Get metrics for current template
  const currentMetrics = (selectedTemplate?.metrics || [])
    .map(metricId => allMetricsPool.find(m => m.id === metricId))
    .filter(Boolean);

  // Group metrics by domain for modals
  const groupedMetrics = allMetricsPool.reduce((acc, metric) => {
    if (!acc[metric.domain]) acc[metric.domain] = [];
    acc[metric.domain].push(metric);
    return acc;
  }, {});

  // Filter metrics by search
  const filteredMetrics = searchQuery
    ? Object.entries(groupedMetrics).reduce((acc, [domain, metrics]) => {
      const filtered = metrics.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        domain.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) acc[domain] = filtered;
      return acc;
    }, {})
    : groupedMetrics;

  // Save to localStorage whenever templates or selection changes
  const previewGridSnapModifier = useMemo(() => createSnapModifier({
    x: PREVIEW_SLOT_WIDTH + PREVIEW_SLOT_GAP,
    y: PREVIEW_SLOT_HEIGHT + PREVIEW_SLOT_GAP
  }), []);

  useEffect(() => {
    localStorage.setItem('ups-metric-templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('ups-selected-template', selectedTemplateId);
  }, [selectedTemplateId]);

  // Persist workspaces to localStorage
  useEffect(() => {
    localStorage.setItem('ups-workspaces', JSON.stringify(workspaces));
  }, [workspaces]);

  useEffect(() => {
    localStorage.setItem('ups-selected-workspace', selectedWorkspaceId);
  }, [selectedWorkspaceId]);

  useEffect(() => {
    if (!createTemplateModalVisible) return;
    setPreviewBlocks((prevBlocks) => {
      const map = new Map(prevBlocks.map(block => [block.metricId, block]));
      const nextBlocks = selectedMetrics.map(metricId => {
        if (map.has(metricId)) {
          return map.get(metricId);
        }
        const metric = allMetricsPool.find(m => m.id === metricId);
        if (!metric) return null;
        return {
          id: `preview-${metricId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          metricId,
          span: 3,
          viewType: getDefaultVisualization(metric)
        };
      }).filter(Boolean);
      return nextBlocks;
    });
  }, [selectedMetrics, createTemplateModalVisible]);

  useEffect(() => {
    if (!createTemplateModalVisible) {
      setPreviewBlocks([]);
    }
  }, [createTemplateModalVisible]);

  // Navigation structure for new GA4-style sidebar
  const navigationItems = [
    {
      key: 'trang-chu',
      label: 'Trang chủ',
      icon: <MdHome />,
      expandable: false,
      module: 'home'
    },
    {
      key: 'quan-tri',
      label: 'Quản trị',
      icon: <MdBarChart />,
      expandable: true,
      children: [
        { key: 'bao-cao-van-hanh', label: 'Báo cáo vận hành', module: 'home' },
        { key: 'theo-doi-fullfilment', label: 'Theo dõi Fullfilment', module: 'home' },
        { key: 'bao-cao-dieu-hanh', label: 'Báo cáo điều hành', module: 'home' },
        { key: 'dashboard', label: 'Dashboard', module: 'home' }
      ]
    },
    {
      key: 'van-hanh',
      label: 'Vận hành',
      icon: <MdAssignment />,
      expandable: true,
      children: [
        {
          key: 'san-pham',
          label: 'Sản phẩm',
          children: [
            { key: 'them-san-pham', label: 'Thêm sản phẩm', module: 'products' },
            { key: 'luu-nhap', label: 'Lưu nháp', module: 'products' },
            { key: 'danh-sach-san-pham', label: 'Danh sách sản phẩm', module: 'products' },
            { key: 'lien-ket-san-pham', label: 'Liên kết sản phẩm', module: 'products' },
            { key: 'quan-ly-dong-bo', label: 'Quản lý đồng bộ', module: 'products' },
            { key: 'lich-su-day-ton', label: 'Lịch sử đẩy tồn', module: 'products' }
          ]
        },
        {
          key: 'don-hang',
          label: 'Đơn hàng',
          children: [
            { key: 'danh-sach-don-hang', label: 'Danh sách đơn hàng', module: 'orders' },
            { key: 'xu-ly-hang-loat', label: 'Xử lý hàng loạt', module: 'orders' },
            { key: 'xu-ly-theo-danh-sach', label: 'Xử lý theo danh sách', module: 'orders' },
            { key: 'xu-ly-tra-hang', label: 'Xử lý trả hàng', module: 'orders' },
            { key: 'don-hoan', label: 'Đơn hoàn', module: 'orders' },
            { key: 'phien-ban-giao', label: 'Phiên bàn giao', module: 'orders' },
            { key: 'quy-tac-tang-qua', label: 'Quy tắc tặng quà', module: 'orders' }
          ]
        },
        {
          key: 'kho-van',
          label: 'Kho vận',
          children: [
            { key: 'san-pham-kho', label: 'Sản phẩm kho', module: 'inventory' },
            { key: 'danh-muc-san-pham', label: 'Danh mục sản phẩm', module: 'inventory' },
            { key: 'ton-kho', label: 'Tồn kho', module: 'inventory' },
            { key: 'kiem-kho', label: 'Kiểm kho', module: 'inventory' },
            { key: 'du-tru', label: 'Dự trữ', module: 'inventory' },
            { key: 'xuat-nhap-kho', label: 'Xuất nhập kho', module: 'inventory' },
            { key: 'dat-hang', label: 'Đặt hàng', module: 'inventory' },
            { key: 'chuyen-kho', label: 'Chuyển kho', module: 'inventory' },
            { key: 'quan-ly-nha-cung-cap', label: 'Quản lý nhà cung cấp', module: 'inventory' },
            { key: 'danh-sach-kho', label: 'Danh sách kho', module: 'inventory' },
            { key: 'bao-cao-thay-doi-ton', label: 'Báo cáo thay đổi tồn', module: 'inventory' },
            { key: 'quan-ly-han-su-dung', label: 'Quản lý hạn sử dụng', module: 'inventory' }
          ]
        },
        {
          key: 'khach-hang',
          label: 'Khách hàng',
          children: [
            { key: 'danh-sach-khach-hang', label: 'Danh sách khách hàng', module: 'customers' },
            { key: 'quan-ly-phan-hoi', label: 'Quản lý phản hồi', module: 'customers' },
            { key: 'danh-gia-tu-dong', label: 'Đánh giá tự động', module: 'customers' },
            { key: 'tro-chuyen', label: 'Trò chuyện', module: 'customers' }
          ]
        },
        {
          key: 'khung-anh-mau',
          label: 'Khung ảnh mẫu',
          children: [
            { key: 'danh-sach-khung-anh', label: 'Danh sách khung ảnh', module: 'templates' },
            { key: 'lap-lich-ap-khung', label: 'Lập lịch áp khung', module: 'templates' }
          ]
        },
        {
          key: 'marketing',
          label: 'Marketing',
          children: [
            { key: 'chuong-trinh-khuyen-mai-san', label: 'Chương trình khuyến mãi sàn', module: 'marketing' },
            { key: 'chuong-trinh-khuyen-mai-ups', label: 'Chương trình khuyến mãi UpS', module: 'marketing' },
            { key: 'canh-bao-vi-pham-gia', label: 'Cảnh báo vi phạm giá', module: 'marketing' }
          ]
        },
        {
          key: 'tai-chinh',
          label: 'Tài chính',
          children: [
            { key: 'doi-soat', label: 'Đối soát', module: 'finance' },
            { key: 'ban-hang', label: 'Bán hàng', module: 'finance' },
            { key: 'chi-phi', label: 'Chi phí', module: 'finance' },
            { key: 'gia-von-vat', label: 'Giá vốn và VAT', module: 'finance' },
            { key: 'bao-cao-kinh-doanh', label: 'Báo cáo kinh doanh', module: 'finance' },
            { key: 'giao-dich-ve-vi', label: 'Giao dịch về ví', module: 'finance' }
          ]
        },
        {
          key: 'doi-soat-group',
          label: 'Đối soát',
          children: [
            { key: 'doi-soat-du-lieu-tu-dong', label: 'Đối soát dữ liệu tự động', module: 'auto-reconciliation' }
          ]
        },
        {
          key: 'affiliate',
          label: 'Affiliate',
          children: [
            { key: 'tao-chien-dich', label: 'Tạo chiến dịch', module: 'affiliate' },
            { key: 'quan-ly-chien-dich', label: 'Quản lý chiến dịch', module: 'affiliate' }
          ]
        },
        {
          key: 'loyalty',
          label: 'Loyalty',
          children: [
            { key: 'khach-hang-than-thiet', label: 'Khách hàng thân thiết', module: 'loyalty' },
            { key: 'danh-sach-chuong-trinh', label: 'Danh sách chương trình', module: 'loyalty' },
            { key: 'danh-sach-hang-hanh-vien', label: 'Danh sách hạng hành viên', module: 'loyalty' },
            { key: 'cau-hinh-loyalty', label: 'Cấu hình Loyalty', module: 'loyalty' }
          ]
        },
        {
          key: 'thanh-toan',
          label: 'Thanh toán',
          children: [
            { key: 'cau-hinh-thanh-toan', label: 'Cấu hình thanh toán', module: 'payment' },
            { key: 'quan-ly-giao-dich-qua-cong', label: 'Quản lý giao dịch qua cổng', module: 'payment' }
          ]
        }
      ]
    }
  ];

  // Memoize sub-nav visibility calculation
  const isSubNavVisible = useMemo(() => {
    if (expandedSubNav) return true;
    // Auto-detect based on activeNavItem
    const activeItem = navigationItems.find(item => item.key === activeNavItem);
    if (activeItem && activeItem.expandable && activeItem.children) {
      return true;
    }
    // Check if activeNavItem is a child of any expandable item
    for (const item of navigationItems) {
      if (item.children) {
        const isDirectChild = item.children.some(child =>
          child.key === activeNavItem ||
          (child.children && child.children.some(nested => nested.key === activeNavItem))
        );
        if (isDirectChild) return true;
      }
    }
    return false;
  }, [expandedSubNav, activeNavItem]);

  // Memoize parent item to show in sub-nav
  const parentItemToShow = useMemo(() => {
    // Check if Settings is expanded
    if (expandedSubNav === 'cai-dat') {
      return {
        key: 'cai-dat',
        label: 'Cài đặt',
        icon: <MdSettings />,
        expandable: true,
        children: [
          { key: 'tai-khoan', label: 'Tài khoản', module: 'settings' },
          { key: 'gian-hang-ket-noi', label: 'Gian hàng kết nối', module: 'settings' },
          { key: 'nhan-hang', label: 'Nhãn hàng', module: 'settings' },
          { key: 'tai-khoan-quang-cao', label: 'Tài khoản quảng cáo', module: 'settings' },
          { key: 'ton-da-kenh', label: 'Tồn đa kênh', module: 'settings' },
          { key: 'ket-noi-mo-rong', label: 'Kết nối mở rộng', module: 'settings' },
          { key: 'thiet-lap-tai-chinh', label: 'Thiết lập tài chính', module: 'settings' },
          { key: 'trang-thai-hang-hoa', label: 'Trạng thái hàng hóa', module: 'settings' },
          { key: 'cau-hinh-van-chuyen', label: 'Cấu hình vận chuyển', module: 'settings' }
        ]
      };
    }

    if (expandedSubNav) {
      return navigationItems.find(item => item.key === expandedSubNav);
    }
    // Auto-detect based on activeNavItem
    const activeItem = navigationItems.find(item => item.key === activeNavItem);
    if (activeItem && activeItem.expandable && activeItem.children) {
      return activeItem;
    }
    // Check if activeNavItem is a child of any expandable item
    for (const item of navigationItems) {
      if (item.children) {
        const isDirectChild = item.children.some(child =>
          child.key === activeNavItem ||
          (child.children && child.children.some(nested => nested.key === activeNavItem))
        );
        if (isDirectChild) return item;
      }
    }
    return null;
  }, [expandedSubNav, activeNavItem]);

  // Memoize main content margin-left
  const mainContentMarginLeft = useMemo(() => {
    // Content always starts after the collapsed sidebar width (64px)
    // If sub-nav is visible, push content by sub-nav width (177px)
    // L1 hover expansion will still overlay everything
    const sidebarWidth = 64;
    const subNavWidth = isSubNavVisible ? 177 : 0;
    return sidebarWidth + subNavWidth;
  }, [isSubNavVisible]);

  // Legacy menu items (keeping for compatibility)
  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Trang chủ' },
    { key: 'analytics', icon: <BarChartOutlined />, label: 'Phân tích' },
    { key: 'orders', icon: <ShoppingOutlined />, label: 'Đơn hàng' },
    { key: 'inventory', icon: <InboxOutlined />, label: 'Kho hàng' },
    { key: 'shipping', icon: <CarOutlined />, label: 'Vận chuyển' },
    {
      key: 'workspace',
      icon: <SettingOutlined />,
      label: 'Quản lý Workspace',
      children: [
        { key: 'workspace-settings', label: 'Cài đặt' }
      ]
    }
  ];
  const moduleBreadcrumb = activeModule === 'workspace-settings'
    ? 'Quản lý Workspace / Cài đặt'
    : activeModule === 'template-gallery'
      ? 'Template mẫu'
      : 'Trang chủ';

  const handleTemplateCardApply = (templateId) => {
    if (templateId === selectedTemplateId) return;
    setSelectedTemplateId(templateId);
    message.success('Template đã được áp dụng cho homepage.');
  };

  const handleConfirmTemplateApply = () => {
    if (templateToApply) {
      handleTemplateCardApply(templateToApply);
      if (confirmDontShowAgain) {
        setSkipTemplateConfirm(true);
        localStorage.setItem('ups-skip-template-confirm', 'true');
      }
      setTemplateApplyConfirmVisible(false);
      setTemplateToApply(null);
      setConfirmDontShowAgain(false);
      // Reset builder if coming from template creation
      if (activeModule === 'template-create') {
        resetTemplateBuilder();
        setActiveModule('workspace-settings');
      }
    }
  };

  const handleCancelTemplateApply = () => {
    setTemplateApplyConfirmVisible(false);
    setTemplateToApply(null);
    setConfirmDontShowAgain(false);
    // Reset builder if coming from template creation
    if (activeModule === 'template-create') {
      resetTemplateBuilder();
      setActiveModule('workspace-settings');
    }
  };

  const renderTemplatePreviewContent = (templateId) => {
    if (!templateId) return null;
    const templateInState = templates.find(t => t.id === templateId);
    const galleryTemplate = templateWorkspaces.find(t => (t.templateId || t.id) === templateId);

    if (templateInState?.sections) {
      const sections = [];
      templateInState.sections.reports && sections.push(...Array(templateInState.sections.reports).fill('report'));
      if (templateInState.sections.alert) sections.push('alert');
      if (templateInState.sections.news) sections.push('news');
      return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          {sections.map((section, idx) => {
            if (section === 'report') {
              return (
                <Card key={`report-${idx}`} title={`Report section #${idx + 1}`}>
                  <Row gutter={[12, 12]}>
                    {previewCardData.map((card, index) => (
                      <Col span={8} key={`preview-card-${idx}-${index}`}>
                        <KPICard {...card} />
                      </Col>
                    ))}
                  </Row>
                </Card>
              );
            }
            if (section === 'alert') {
              return (
                <Card key="alert-section" title="Alert section">
                  <List
                    dataSource={alertsData.errors}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.title}
                          description={`${item.count} ${item.unit || ''}`}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              );
            }
            if (section === 'news') {
              return (
                <Card key="news-section" title="Tin tức">
                  <List
                    dataSource={contentItems.insights}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta title={item.title} description={item.date} />
                      </List.Item>
                    )}
                  />
                </Card>
              );
            }
            return null;
          })}
        </Space>
      );
    }

    const dataKey = templatePreviewKeyMap[templateId]
      || galleryTemplate?.templateId
      || (templateData[templateId] ? templateId : null);
    const previewData = dataKey ? templateData[dataKey] : null;

    if (!previewData) {
      const metricList = templateInState?.metrics || [];
      if (metricList.length === 0) {
        return <Empty description="Không có dữ liệu preview cho template này" />;
      }
      return (
        <div>
          <Title level={5} style={{ marginBottom: 12 }}>Danh sách metrics</Title>
          <Space wrap>
            {metricList.map(metricId => {
              const metric = allMetricsPool.find(m => m.id === metricId);
              return (
                <Tag key={metricId} color="geekblue">
                  {metric?.name || metricId}
                </Tag>
              );
            })}
          </Space>
        </div>
      );
    }

    return (
      <>
        <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
          {['col1', 'col2', 'col3'].map(col => (
            (previewData.kpiOverview?.[col] || []).map((kpi, idx) => (
              <Col span={8} key={`${col}-${idx}`}>
                <KPICard {...kpi} />
              </Col>
            ))
          ))}
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card size="small" title="Xu hướng Doanh thu" style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={previewData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <RechartLine type="monotone" dataKey="value" stroke="#1677FF" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="Phân bổ kênh" style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <RechartPie
                    data={previewData.pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {(previewData.pieData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#1677FF', '#52C41A', '#FA8C16'][index % 3]} />
                    ))}
                  </RechartPie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  const renderTemplateCard = (template) => {
    if (!template) return null;
    const isActive = template.id === selectedTemplateId;
    const metrics = template.metrics || [];
    return (
      <Col xs={24} md={12} xl={8} key={template.id}>
        <Card
          hoverable
          onMouseEnter={() => setHoveredTemplateCard(template.id)}
          onMouseLeave={() => setHoveredTemplateCard(null)}
          style={{
            border: isActive ? '1px solid #1677FF' : '1px solid #E1E3E5',
            borderRadius: 20,
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
            minHeight: 300,
            position: 'relative',
            overflow: 'hidden'
          }}
          bodyStyle={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <div style={{
              borderRadius: 16,
              padding: 16,
              background: 'linear-gradient(135deg, #F5F7FF 0%, #FDF2FF 100%)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              minHeight: 96
            }}>
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    background: idx % 2 === 0 ? '#fff' : '#F2F4FF',
                    borderRadius: 10,
                    height: idx < 3 ? 24 : 36,
                    border: '1px solid #E4E6F1'
                  }}
                />
              ))}
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15,23,42,0.1), rgba(15,23,42,0.7))',
                borderRadius: 16,
                opacity: hoveredTemplateCard === template.id ? 1 : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s'
              }}
            >
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenPreview(template.id, 'settings');
                }}
              >
                Xem trước
              </Button>
            </div>
          </div>
          <Space size={8} style={{ marginBottom: 12 }}>
            <Tag color={template.isDefault ? 'blue' : 'purple'}>
              {template.isDefault ? 'Template mẫu' : 'Template của bạn'}
            </Tag>
            {isActive && <Tag color="green">Đang sử dụng</Tag>}
          </Space>
          <Title level={4} style={{ margin: 0 }}>{template.name}</Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
            {metrics.length} metrics
          </Text>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', minHeight: 48 }}>
            {metrics.slice(0, 4).map(metricId => {
              const metric = allMetricsPool.find(m => m.id === metricId);
              return metric ? (
                <Tag key={metric.id} color="geekblue" style={{ marginBottom: 6 }}>
                  {metric.domain || 'Metric'}
                </Tag>
              ) : null;
            })}
            {metrics.length > 4 && (
              <Tag>+{metrics.length - 4}</Tag>
            )}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button
              type={isActive ? 'primary' : 'default'}
              disabled={isActive}
              onClick={() => handleTemplateCardApply(template.id)}
            >
              {isActive ? 'Đang sử dụng' : 'Áp dụng'}
            </Button>
            {!template.isDefault && (
              <Button icon={<EditOutlined />} onClick={() => handleOpenEditModal(template)}>
                Chỉnh sửa
              </Button>
            )}
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDeleteTemplate(template)}
            >
              Xóa
            </Button>
          </div>
        </Card>
      </Col>
    );
  };

  const handleOpenTemplateGallery = () => {
    setTemplateGalleryVisible(true);
  };

  const renderWorkspaceSettings = () => {
    const pageSize = 5;
    // Filter templates by search query
    const filteredTemplates = templateSearchQuery.trim()
      ? templates.filter(t =>
        t.name.toLowerCase().includes(templateSearchQuery.toLowerCase().trim())
      )
      : templates;
    const sortedTemplates = [...filteredTemplates].sort((a, b) => {
      if (a.id === selectedTemplateId && b.id !== selectedTemplateId) return -1;
      if (b.id === selectedTemplateId && a.id !== selectedTemplateId) return 1;
      return 0;
    });
    const startIndex = (templateTablePage - 1) * pageSize;
    const pagedTemplates = sortedTemplates.slice(startIndex, startIndex + pageSize);
    const allSelected = pagedTemplates.length > 0 && pagedTemplates.every(t => selectedTemplateIds.has(t.id));
    const someSelected = pagedTemplates.some(t => selectedTemplateIds.has(t.id));
    const selectedCount = selectedTemplateIds.size;

    const handleSelectAll = (checked) => {
      const newSelected = new Set(selectedTemplateIds);
      if (checked) {
        pagedTemplates.forEach(t => newSelected.add(t.id));
      } else {
        pagedTemplates.forEach(t => newSelected.delete(t.id));
      }
      setSelectedTemplateIds(newSelected);
    };

    const handleSelectTemplate = (templateId, checked) => {
      const newSelected = new Set(selectedTemplateIds);
      if (checked) {
        newSelected.add(templateId);
      } else {
        newSelected.delete(templateId);
      }
      setSelectedTemplateIds(newSelected);
    };

    const handleDeleteSelected = () => {
      if (selectedTemplateIds.size === 0) return;
      const deletableTemplates = templates.filter(t => selectedTemplateIds.has(t.id));
      if (deletableTemplates.length === 0) {
        setSelectedTemplateIds(new Set());
        return;
      }

      // Check if any selected template is in use
      const hasTemplateInUse = selectedTemplateIds.has(selectedTemplateId);

      // If template in use is selected, show confirmation with special message
      if (hasTemplateInUse) {
        Modal.confirm({
          title: 'Xác nhận xóa template đang sử dụng',
          content: `Bạn có chắc chắn muốn xóa ${deletableTemplates.length} template đã chọn? Template đang sử dụng sẽ bị xóa và hệ thống sẽ tự động chuyển sang template khác.`,
          okText: 'Xóa',
          okType: 'danger',
          cancelText: 'Hủy',
          onOk: () => {
            const updatedTemplates = templates.filter(t => !selectedTemplateIds.has(t.id));
            setTemplates(updatedTemplates);
            setSelectedTemplateIds(new Set());
            if (updatedTemplates.length > 0) {
              setSelectedTemplateId(updatedTemplates[0].id);
              message.success(`Đã xóa ${deletableTemplates.length} template. Đã chuyển sang template "${updatedTemplates[0].name}"`);
            } else {
              setSelectedTemplateId(null);
              message.success(`Đã xóa ${deletableTemplates.length} template`);
            }
          }
        });
        return;
      }

      // Regular deletion confirmation for templates not in use
      Modal.confirm({
        title: 'Xác nhận xóa',
        content: `Bạn có chắc chắn muốn xóa ${deletableTemplates.length} template đã chọn?`,
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk: () => {
          const updatedTemplates = templates.filter(t => !selectedTemplateIds.has(t.id));
          setTemplates(updatedTemplates);
          setSelectedTemplateIds(new Set());
          message.success(`Đã xóa ${deletableTemplates.length} template`);
        }
      });
    };

    const templateRowLayout = '40px 1fr 160px 180px 120px';

    const handleTemplateRowAction = (action, template) => {
      if (!template) return;
      switch (action) {
        case 'apply':
          if (skipTemplateConfirm) {
            handleTemplateCardApply(template.id);
          } else {
            setTemplateToApply(template.id);
            setTemplateApplyConfirmVisible(true);
          }
          break;
        case 'preview':
          handleOpenPreview(template.id, 'settings');
          break;
        case 'edit':
          handleOpenEditModal(template);
          break;
        case 'delete':
          handleDeleteTemplate(template);
          break;
        default:
          break;
      }
    };

    const buildActionMenu = (template) => ({
      items: [
        { key: 'apply', label: 'Sử dụng', disabled: template.id === selectedTemplateId },
        { key: 'preview', label: 'Xem trước' },
        { type: 'divider' },
        { key: 'edit', label: 'Chỉnh sửa' },
        { key: 'delete', label: <span style={{ color: '#D72C0D' }}>Xóa</span> }
      ],
      onClick: ({ key }) => handleTemplateRowAction(key, template)
    });

    const isEmptyState = sortedTemplates.length === 0 && !templateSearchQuery.trim();

    return (
      <Card
        bodyStyle={{ padding: 0 }}
        style={{ borderRadius: 20, border: '1px solid #E1E3E5', boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}
      >
        <div style={{ padding: 24 }}>
          {!isEmptyState && selectedCount > 0 && (
            <div style={{
              marginBottom: 16,
              padding: '12px 16px',
              background: '#F0F5FF',
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text style={{ color: '#1677FF', fontWeight: 500 }}>
                Đã chọn {selectedCount} template
              </Text>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleDeleteSelected}
              >
                Xóa ({selectedCount})
              </Button>
            </div>
          )}
          {!isEmptyState && (
            <div style={{ marginBottom: 16 }}>
              <Input
                placeholder="Tìm kiếm theo tên template"
                prefix={<SearchOutlined />}
                value={templateSearchQuery}
                onChange={(e) => {
                  setTemplateSearchQuery(e.target.value);
                  setTemplateTablePage(1); // Reset to first page when searching
                }}
                allowClear
                style={{ maxWidth: 400 }}
              />
            </div>
          )}
          {!isEmptyState && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: templateRowLayout,
                padding: '0 20px 8px',
                color: '#6D7175',
                fontSize: 12,
                fontWeight: 500,
                textAlign: 'left',
                alignItems: 'center'
              }}
            >
              <Checkbox
                indeterminate={someSelected && !allSelected}
                checked={allSelected && pagedTemplates.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <span style={{ display: 'flex', alignItems: 'center' }}>Tên</span>
              <span style={{ display: 'flex', alignItems: 'center' }}>Trạng thái</span>
              <span style={{ display: 'flex', alignItems: 'center' }}>Cập nhật gần nhất</span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4 }}>
                Thao tác
              </span>
            </div>
          )}
          {!isEmptyState && (
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              {pagedTemplates.map((template) => {
                const isSelected = selectedTemplateIds.has(template.id);
                return (
                  <div
                    key={template.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: templateRowLayout,
                      alignItems: 'center',
                      padding: '16px 20px',
                      borderRadius: 14,
                      border: '1px solid #E1E3E5',
                      background: isSelected ? 'rgba(22, 119, 255, 0.02)' : '#fff',
                      boxShadow: '0 8px 24px rgba(15,23,42,0.05)',
                      gap: 12
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={(e) => handleSelectTemplate(template.id, e.target.checked)}
                    />
                    <div
                      style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}
                      onMouseEnter={() => setHoveredTemplateName(template.id)}
                      onMouseLeave={() => setHoveredTemplateName(null)}
                    >
                      {editingTemplateName === template.id ? (
                        <Input
                          value={editingTemplateNameValue}
                          onChange={(e) => {
                            setEditingTemplateNameValue(e.target.value);
                          }}
                          onBlur={() => {
                            if (editingTemplateNameValue.trim()) {
                              const updatedTemplates = templates.map(t =>
                                t.id === template.id ? { ...t, name: editingTemplateNameValue.trim() } : t
                              );
                              setTemplates(updatedTemplates);
                              localStorage.setItem('ups-metric-templates', JSON.stringify(updatedTemplates));
                            }
                            setEditingTemplateName(null);
                            setEditingTemplateNameValue('');
                          }}
                          onPressEnter={() => {
                            if (editingTemplateNameValue.trim()) {
                              const updatedTemplates = templates.map(t =>
                                t.id === template.id ? { ...t, name: editingTemplateNameValue.trim() } : t
                              );
                              setTemplates(updatedTemplates);
                              localStorage.setItem('ups-metric-templates', JSON.stringify(updatedTemplates));
                            }
                            setEditingTemplateName(null);
                            setEditingTemplateNameValue('');
                          }}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                          style={{ flex: 1 }}
                        />
                      ) : (
                        <>
                          <Text strong style={{ fontSize: 15, display: 'inline-block' }}>{template.name}</Text>
                          {hoveredTemplateName === template.id && (
                            <Button
                              type="text"
                              size="small"
                              icon={<EditOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTemplateName(template.id);
                                setEditingTemplateNameValue(template.name);
                              }}
                              style={{
                                padding: '0 4px',
                                minWidth: 'auto',
                                height: 'auto',
                                marginLeft: 4,
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div>
                      <Tag
                        color={template.id === selectedTemplateId ? 'green' : 'default'}
                        style={{ padding: '0 12px' }}
                      >
                        {template.id === selectedTemplateId ? 'Đang sử dụng' : 'Nháp'}
                      </Tag>
                    </div>
                    <div>
                      <Text>{template.createdAt || '—'}</Text>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Dropdown trigger={['click']} placement="bottomRight" menu={buildActionMenu(template)}>
                        <Button type="text" icon={<EllipsisOutlined />} />
                      </Dropdown>
                    </div>
                  </div>
                );
              })}
              {sortedTemplates.length === 0 && !isEmptyState && (
                <Empty description="Không tìm thấy template nào" />
              )}
            </Space>
          )}
          {isEmptyState && (
            <div style={{
              padding: '60px 20px',
              textAlign: 'center',
              width: '100%'
            }}>
              <Empty
                description={
                  <div>
                    <div style={{ marginBottom: 8, fontSize: 16, color: '#262626' }}>
                      Chưa có template nào
                    </div>
                    <div style={{ fontSize: 14, color: '#8c8c8c' }}>
                      Tạo template mới để bắt đầu quản lý workspace của bạn
                    </div>
                  </div>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
          {!isEmptyState && (
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <Pagination
                current={templateTablePage}
                pageSize={pageSize}
                total={sortedTemplates.length}
                onChange={(page) => {
                  setTemplateTablePage(page);
                  setSelectedTemplateIds(new Set());
                }}
                showSizeChanger={false}
                disabled={sortedTemplates.length <= pageSize}
              />
            </div>
          )}
        </div>
      </Card>
    );
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

  // ========== TEMPLATE CRUD FUNCTIONS ==========

  const handleCreateTemplate = (applyImmediately = false) => {
    if (!newTemplateName.trim() || selectedMetrics.length === 0) {
      message.error('Vui lòng nhập tên template và chọn ít nhất 1 metric');
      return;
    }

    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: newTemplateName.trim(),
      isDefault: false,
      metrics: selectedMetrics,
      layout: previewBlocks.map(block => ({
        metricId: block.metricId,
        span: block.span,
        viewType: block.viewType
      }))
    };

    setTemplates([...templates, newTemplate]);
    setCreateTemplateModalVisible(false);
    setNewTemplateName('');
    setSelectedMetrics([]);
    setPreviewBlocks([]);
    setHoveredPreviewBlock(null);
    setSearchQuery('');
    if (applyImmediately) {
      handleTemplateCardApply(newTemplate.id);
    } else {
      message.success(`Template "${newTemplate.name}" đã được lưu nháp`);
    }
  };

  const handleEditTemplate = (applyImmediately = false) => {
    if (!newTemplateName.trim() || selectedMetrics.length === 0) {
      message.error('Vui lòng nhập tên template và chọn ít nhất 1 metric');
      return;
    }

    const updatedTemplates = templates.map(t =>
      t.id === selectedTemplateId
        ? { ...t, name: newTemplateName.trim(), metrics: selectedMetrics }
        : t
    );

    setTemplates(updatedTemplates);
    setEditTemplateModalVisible(false);
    setNewTemplateName('');
    setSelectedMetrics([]);
    setSearchQuery('');
    if (applyImmediately) {
      handleTemplateCardApply(selectedTemplateId);
    } else {
      message.success('Template đã được lưu nháp!');
    }
  };

  const handleDeleteTemplate = (templateToDelete = selectedTemplate) => {
    if (!templateToDelete) return;

    // Check if this is the only template left
    if (templates.length === 1) {
      Modal.warning({
        title: 'Không thể xóa',
        content: 'Không thể xóa template cuối cùng. Vui lòng tạo template mới trước khi xóa template này.',
        okText: 'Đã hiểu'
      });
      return;
    }

    // Special confirmation for template in use
    if (templateToDelete.id === selectedTemplateId) {
      Modal.confirm({
        title: 'Xác nhận xóa template đang sử dụng',
        content: `Template "${templateToDelete.name}" đang được sử dụng. Bạn có chắc chắn muốn xóa? Sau khi xóa, hệ thống sẽ tự động chuyển sang template khác.`,
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk: () => {
          const updatedTemplates = templates.filter(t => t.id !== templateToDelete.id);
          setTemplates(updatedTemplates);
          if (updatedTemplates.length > 0) {
            setSelectedTemplateId(updatedTemplates[0].id);
            message.success(`Template "${templateToDelete.name}" đã được xóa. Đã chuyển sang template "${updatedTemplates[0].name}"`);
          } else {
            setSelectedTemplateId(null);
            message.success(`Template "${templateToDelete.name}" đã được xóa`);
          }
        }
      });
      return;
    }

    // Regular confirmation for other templates
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa template "${templateToDelete.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        const updatedTemplates = templates.filter(t => t.id !== templateToDelete.id);
        setTemplates(updatedTemplates);
        message.success(`Template "${templateToDelete.name}" đã được xóa`);
      }
    });
  };

  const handleOpenCreateModal = () => {
    setNewTemplateName('');
    setSelectedMetrics([]);
    setSearchQuery('');
    setPreviewBlocks([]);
    setHoveredPreviewBlock(null);
    setHoveredMetricId(null);
    setCreateTemplateModalVisible(true);
  };

  const handleOpenEditModal = (templateToEdit = selectedTemplate) => {
    if (!templateToEdit) return;
    setSelectedTemplateId(templateToEdit.id);
    setNewTemplateName(templateToEdit.name);
    setSelectedMetrics([...(templateToEdit.metrics || [])]);
    setSearchQuery('');
    setEditTemplateModalVisible(true);
  };

  const handleCloseChildModal = (isCreate) => {
    if (isCreate) {
      setCreateTemplateModalVisible(false);
      setPreviewBlocks([]);
    } else {
      setEditTemplateModalVisible(false);
    }
    setHoveredPreviewBlock(null);
    setHoveredMetricId(null);
  };

  const handleCloneTemplate = (template) => {
    const templateMetrics = [...template.metrics];
    setNewTemplateName(`${template.name} - bản sao`);
    setSelectedMetrics(templateMetrics);
    setSearchQuery('');
    if (template.layout && template.layout.length) {
      const layoutBlocks = template.layout
        .filter(item => templateMetrics.includes(item.metricId))
        .map(item => {
          const metric = allMetricsPool.find(m => m.id === item.metricId);
          return {
            id: `preview-${item.metricId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            metricId: item.metricId,
            span: previewSpanSteps.includes(item.span) ? item.span : 6,
            viewType: item.viewType || getDefaultVisualization(metric)
          };
        });
      setPreviewBlocks(layoutBlocks);
    } else {
      const fallbackBlocks = templateMetrics.map(metricId => {
        const metric = allMetricsPool.find(m => m.id === metricId);
        return {
          id: `preview-${metricId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          metricId,
          span: 3,
          viewType: getDefaultVisualization(metric)
        };
      });
      setPreviewBlocks(fallbackBlocks);
    }
    setHoveredPreviewBlock(null);
    setHoveredMetricId(null);
    setCreateTemplateModalVisible(true);
  };

  const handleSaveOrder = () => {
    const updatedTemplates = templates.map(t =>
      t.id === selectedTemplateId
        ? { ...t, metrics: tempMetricOrder }
        : t
    );

    setTemplates(updatedTemplates);
    setIsReorderMode(false);
    setTempMetricOrder([]);
    message.success('Thứ tự metrics đã được lưu!');
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tempMetricOrder.indexOf(active.id);
      const newIndex = tempMetricOrder.indexOf(over.id);
      const newOrder = arrayMove(tempMetricOrder, oldIndex, newIndex);
      setTempMetricOrder(newOrder);
    }
  };

  const handlePreviewDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setPreviewBlocks((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleResizePreview = (blockId, direction) => {
    setPreviewBlocks((blocks) =>
      blocks.map(block => {
        if (block.id !== blockId) return block;
        const currentIndex = previewSpanSteps.indexOf(block.span);
        const nextIndex = Math.min(
          previewSpanSteps.length - 1,
          Math.max(0, currentIndex + direction)
        );
        return {
          ...block,
          span: previewSpanSteps[nextIndex]
        };
      })
    );
  };

  const handleRemovePreviewBlock = (metricId) => {
    setPreviewBlocks((blocks) => {
      const removedBlock = blocks.find(block => block.metricId === metricId);
      if (removedBlock) {
        setHoveredPreviewBlock((current) => current === removedBlock.id ? null : current);
      }
      return blocks.filter(block => block.metricId !== metricId);
    });
    setSelectedMetrics((metrics) => metrics.filter(id => id !== metricId));
  };

  const handleToggleMetricSelection = (metricId) => {
    setSelectedMetrics((metrics) =>
      metrics.includes(metricId)
        ? metrics.filter(id => id !== metricId)
        : [...metrics, metricId]
    );
  };

  const handleStartReorder = () => {
    setTempMetricOrder(selectedTemplate.metrics);
    setIsReorderMode(true);
  };

  const handleCancelReorder = () => {
    setIsReorderMode(false);
    setTempMetricOrder([]);
  };

  // ========== WORKSPACE MANAGEMENT FUNCTIONS ==========

  const handleCreateWorkspace = () => {
    if (!newWorkspaceName.trim()) {
      message.error('Vui lòng nhập tên workspace');
      return;
    }

    if (selectedItems.length === 0) {
      message.error('Vui lòng chọn ít nhất một nhóm hoặc mục');
      return;
    }

    const newWorkspace = {
      id: `workspace-${Date.now()}`,
      name: newWorkspaceName.trim(),
      isDefault: false,
      selectedItems: selectedItems,
      selectedAlertMetrics: selectedItems.some(item => item.groupId === 'Lỗi & Cảnh báo') ? selectedAlertMetrics : null,
      layout: {
        showDashboard: selectedItems.some(item => item.groupId === 'Dashboard'),
        showAlerts: selectedItems.some(item => item.groupId === 'Lỗi & Cảnh báo'),
        showGuides: selectedItems.some(item => item.groupId === 'Tin tức')
      }
    };

    setWorkspaces([...workspaces, newWorkspace]);
    setSelectedWorkspaceId(newWorkspace.id);
    setWorkspaceConfigDrawerVisible(false);
    setNewWorkspaceName('');
    setSelectedGroup(null);
    setSelectedItems([]);
    setSelectedAlertMetrics({ errors: [], warnings: [] });
    message.success(`Workspace "${newWorkspace.name}" đã được tạo!`);
  };

  const handleEditWorkspace = () => {
    if (!newWorkspaceName.trim() || !editingWorkspaceId) {
      message.error('Vui lòng nhập tên workspace');
      return;
    }

    const updatedWorkspaces = workspaces.map(w =>
      w.id === editingWorkspaceId
        ? {
          ...w,
          name: newWorkspaceName.trim(),
          groups: [selectedGroup],
          layout: {
            showDashboard: selectedGroup === 'Dashboard',
            showAlerts: selectedGroup === 'Alert & Risks',
            showGuides: selectedGroup === 'Guides / Case studies'
          }
        }
        : w
    );

    setWorkspaces(updatedWorkspaces);
    setWorkspaceEditModalVisible(false);
    setNewWorkspaceName('');
    setSelectedGroup('Dashboard');
    setEditingWorkspaceId(null);
    message.success('Workspace đã được cập nhật!');
  };

  const handleDeleteWorkspace = () => {
    if (!workspaceToDelete) return;

    if (workspaceToDelete.isDefault) {
      message.error('Không thể xóa workspace mặc định');
      setDeleteConfirmVisible(false);
      setWorkspaceToDelete(null);
      return;
    }

    const updatedWorkspaces = workspaces.filter(w => w.id !== workspaceToDelete.id);
    setWorkspaces(updatedWorkspaces);

    // If deleted workspace was selected, switch to default
    if (selectedWorkspaceId === workspaceToDelete.id) {
      const defaultWorkspace = updatedWorkspaces.find(w => w.isDefault) || updatedWorkspaces[0];
      setSelectedWorkspaceId(defaultWorkspace.id);
    }

    setDeleteConfirmVisible(false);
    setWorkspaceToDelete(null);
    message.success('Workspace đã được xóa!');
  };

  const handleOpenEditWorkspace = (workspace) => {
    if (workspace.isTemplate) {
      message.warning('Không thể chỉnh sửa template mẫu. Vui lòng tạo mới từ template.');
      return;
    }
    setEditingWorkspaceId(workspace.id);
    setNewWorkspaceName(workspace.name);
    setSelectedGroup(workspace.groups?.[0] || 'Dashboard');
    setSelectedSubItem(null);
    setWorkspaceEditModalVisible(true);
  };

  const handleCreateFromTemplate = (template) => {
    const newWorkspace = {
      id: `workspace-${Date.now()}`,
      name: `${template.name} (Copy)`,
      isDefault: false,
      isTemplate: false,
      templateId: template.templateId || template.id,
      selectedItems: template.selectedItems || [],
      selectedAlertMetrics: template.selectedAlertMetrics || { errors: [], warnings: [] },
      layout: template.layout || {
        showDashboard: true,
        showAlerts: true,
        showGuides: true
      }
    };

    setWorkspaces([...workspaces, newWorkspace]);
    setSelectedWorkspaceId(newWorkspace.id);
    message.success(`Đã tạo workspace mới từ template "${template.name}"!`);
  };

  const handleOpenDeleteConfirm = (workspace) => {
    setWorkspaceToDelete(workspace);
    setDeleteConfirmVisible(true);
  };

  const handleOpenCreateWorkspace = () => {
    setNewWorkspaceName('');
    setSelectedGroup(null);
    setSelectedItems([]);
    setSelectedAlertMetrics({ errors: [], warnings: [] });
    setWorkspaceConfigDrawerVisible(true);
  };

  const handleSelectItem = (groupId, itemId = null) => {
    try {
      // For Dashboard, only allow selecting one - remove existing dashboard selection first
      if (groupId === 'Dashboard' && itemId) {
        const hasDashboard = selectedItems.some(item => item.groupId === 'Dashboard' && item.itemId);
        if (hasDashboard) {
          message.warning('Chỉ có thể chọn một dashboard. Vui lòng xóa dashboard hiện tại trước khi chọn dashboard khác.');
          return;
        }
      }

      const exists = selectedItems.some(item =>
        itemId ? (item.groupId === groupId && item.itemId === itemId) : item.groupId === groupId && !item.itemId
      );

      if (!exists) {
        setSelectedItems(prev => [...prev, { groupId, itemId }]);
      }
    } catch (error) {
      console.error('Error selecting item:', error);
      message.error('Có lỗi xảy ra khi chọn mục');
    }
  };

  const hasDashboardSelected = () => {
    return selectedItems.some(item => item.groupId === 'Dashboard' && item.itemId);
  };

  const handleRemoveItem = (groupId, itemId = null) => {
    setSelectedItems(selectedItems.filter(item =>
      itemId ? !(item.groupId === groupId && item.itemId === itemId) : item.groupId !== groupId
    ));

    // Reset alert metrics if removing Lỗi & Cảnh báo
    if (groupId === 'Lỗi & Cảnh báo') {
      setSelectedAlertMetrics({ errors: [], warnings: [] });
    }
  };

  const isItemSelected = (groupId, itemId = null) => {
    return selectedItems.some(item =>
      itemId ? (item.groupId === groupId && item.itemId === itemId) : item.groupId === groupId && !item.itemId
    );
  };

  return (
    <>
      {activeModule === 'template-create' ? (
        renderTemplateBuilderScreen()
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          {/* Header */}
          <Header style={{
            background: '#fff',
            padding: '0 24px',
            paddingLeft: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
            position: 'sticky',
            top: 0,
            zIndex: 1002,
            width: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img src={logoSvg} alt="UpS Logo" style={{ height: 28 }} />
              <div style={{ fontSize: 13, color: '#8c8c8c' }}>
                Bảng điều khiển <span style={{ margin: '0 6px' }}>›</span> {moduleBreadcrumb}
              </div>
            </div>

            <Space size="middle">
              <Dropdown overlay={notificationMenu} trigger={['click']}>
                <Badge count={3} size="small">
                  <Button type="text" icon={<BellOutlined style={{ fontSize: 18 }} />} />
                </Badge>
              </Dropdown>
              <Dropdown overlay={userMenu} trigger={['click']}>
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar style={{ backgroundColor: '#1677FF' }} size="small">
                    D
                  </Avatar>
                  <span style={{ fontWeight: 500 }}>Dat Vu</span>
                </div>
              </Dropdown>
            </Space>
          </Header>

          <Layout>
            {/* GA4-style Sidebar */}
            {renderSidebarNavigation()}

            {/* Main Content Area */}
            <Layout style={{
              background: '#FAFBFB',
              marginLeft: mainContentMarginLeft,
              transition: 'margin-left 0.2s ease'
            }}>
              <Content style={{ padding: '24px', height: 'fit-content' }}>
                {/* Page Header */}
                <div
                  style={{
                    marginBottom: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 16
                  }}
                >
                  {activeModule !== 'home' && activeModule !== 'orders' && activeModule !== 'danh-sach-don-hang' && (
                    <Title
                      level={3}
                      style={{
                        marginBottom: 4,
                        color: '#2b2b2b',
                        fontWeight: 600
                      }}
                    >
                      {activeModule === 'workspace-settings' ? '' : 'Tạo template mới'}
                    </Title>
                  )}
                  {activeModule === 'workspace-settings' && (
                    <Space size="middle" wrap>
                      <Button
                        icon={<AppstoreAddOutlined />}
                        onClick={() => setTemplateGalleryVisible(true)}
                      >
                        Tạo mới từ template
                      </Button>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          resetTemplateBuilder();
                          setActiveModule('template-create');
                        }}
                      >
                        Tạo
                      </Button>
                    </Space>
                  )}
                  {activeModule === 'template-create' && (
                    <Space size="middle" wrap>
                      <Button
                        icon={<LeftOutlined />}
                        onClick={handleCancelTemplateCreation}
                      >
                        Quay lại danh sách
                      </Button>
                    </Space>
                  )}
                </div>

                {activeModule === 'home' ? (
                  <>
                    {/* Date Period Selector and Customize Action */}
                    <div style={{
                      marginBottom: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      flexWrap: 'wrap'
                    }}>
                      <Select
                        value={datePeriod}
                        onChange={setDatePeriod}
                        style={{ width: 150 }}
                        options={[
                          { label: 'Hôm qua', value: 'yesterday' },
                          { label: 'Hôm nay', value: 'today' },
                          { label: 'Tuần này', value: 'thisWeek' },
                          { label: 'Tháng này', value: 'thisMonth' },
                          { label: 'Năm nay', value: 'thisYear' }
                        ]}
                      />
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => setActiveModule('workspace-settings')}
                        style={{
                          color: '#6D7175',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        Tùy chỉnh
                      </Button>
                    </div>

                    <Row gutter={24}>
                      {/* Left Main Column */}
                      <Col xs={24} lg={17}>
                        <Space direction="vertical" size={20} style={{ width: '100%' }}>
                          {/* Báo cáo kết quả - Customizable với Template System */}
                          {(selectedWorkspace?.layout?.showDashboard !== false && selectedWorkspace) && (
                            <Card
                              title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Báo cáo kết quả</Text>}
                              extra={
                                isReorderMode ? (
                                  <Space>
                                    <Button
                                      size="small"
                                      onClick={handleCancelReorder}
                                    >
                                      Hủy
                                    </Button>
                                    <Button
                                      size="small"
                                      type="primary"
                                      icon={<SaveOutlined />}
                                      onClick={handleSaveOrder}
                                    >
                                      Lưu sắp xếp
                                    </Button>
                                  </Space>
                                ) : (() => {
                                  const linkData = selectedTemplate?.sectionLinks?.['bao-cao'];
                                  const linkUrl = typeof linkData === 'object' ? linkData?.url : linkData;
                                  const linkText = typeof linkData === 'object' ? (linkData?.text || 'Xem thêm') : 'Xem thêm';
                                  return (
                                    <Button
                                      type="link"
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (linkUrl) {
                                          window.open(linkUrl, '_blank', 'noopener,noreferrer');
                                        }
                                      }}
                                      style={{ padding: 0 }}
                                      className="xem-them-link"
                                    >
                                      {linkText}
                                    </Button>
                                  );
                                })()
                              }
                              style={{
                                background: '#fff',
                                border: '1px solid #E1E3E5',
                                borderRadius: 16,
                                boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                              }}
                            >
                              {isReorderMode ? (
                                <DndContext
                                  collisionDetection={closestCenter}
                                  onDragEnd={handleDragEnd}
                                >
                                  <SortableContext
                                    items={tempMetricOrder}
                                    strategy={verticalListSortingStrategy}
                                  >
                                    <Row gutter={[12, 12]}>
                                      {tempMetricOrder.map(metricId => {
                                        const metric = allMetricsPool.find(m => m.id === metricId);
                                        return metric ? (
                                          <Col span={8} key={metric.id}>
                                            <SortableMetricCard metric={metric} isReorderMode={true} />
                                          </Col>
                                        ) : null;
                                      })}
                                    </Row>
                                  </SortableContext>
                                </DndContext>
                              ) : (
                                <Row gutter={[12, 12]}>
                                  {currentMetrics.map((metric, idx) => (
                                    <Col span={8} key={metric.id || idx}>
                                      <KPICard {...metric} title={metric.name} />
                                    </Col>
                                  ))}
                                </Row>
                              )}
                            </Card>
                          )}

                          {/* Báo cáo tiến độ - Customizable */}
                          {(selectedWorkspace?.layout?.showDashboard !== false && selectedWorkspace) && (
                            <Card
                              title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Báo cáo tiến độ</Text>}
                              extra={(() => {
                                const linkData = selectedTemplate?.sectionLinks?.['bao-cao'];
                                const linkUrl = typeof linkData === 'object' ? linkData?.url : linkData;
                                const linkText = typeof linkData === 'object' ? (linkData?.text || 'Xem thêm') : 'Xem thêm';
                                return (
                                  <Button
                                    type="link"
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (linkUrl) {
                                        window.open(linkUrl, '_blank', 'noopener,noreferrer');
                                      }
                                    }}
                                    style={{ padding: 0 }}
                                    className="xem-them-link"
                                  >
                                    {linkText}
                                  </Button>
                                );
                              })()}
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
                                    <div style={{
                                      padding: '20px 16px',
                                      background: '#F7F7F7',
                                      borderRadius: 12,
                                      border: 'none'
                                    }}>
                                      <div style={{ fontSize: 13, color: '#6D7175', marginBottom: 8, fontWeight: 500 }}>
                                        {goal.title}
                                      </div>
                                      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: '#2b2b2b' }}>
                                        {goal.current} / {goal.target}
                                      </div>
                                      <Progress
                                        percent={goal.percent}
                                        strokeColor="#1677FF"
                                        strokeWidth={10}
                                        showInfo={false}
                                      />
                                      <div style={{
                                        fontSize: 14,
                                        color: '#2b2b2b',
                                        marginTop: 8,
                                        fontWeight: 500
                                      }}>
                                        {goal.percent}% {goal.status}
                                      </div>
                                    </div>
                                  </Col>
                                ))}
                              </Row>
                            </Card>
                          )}

                          {/* Xu hướng Doanh thu */}
                          {(selectedWorkspace?.layout?.showDashboard !== false && selectedWorkspace) && (
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
                              <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={revenueTrendData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#E1E3E5" />
                                  <XAxis
                                    dataKey="date"
                                    stroke="#6D7175"
                                    tick={{ fill: '#6D7175', fontSize: 11 }}
                                  />
                                  <YAxis
                                    stroke="#6D7175"
                                    tickFormatter={(v) => `₫${v}M`}
                                    tick={{ fill: '#6D7175', fontSize: 11 }}
                                  />
                                  <ChartTooltip
                                    contentStyle={{
                                      background: '#fff',
                                      border: '1px solid #e5e7eb',
                                      borderRadius: 8,
                                      fontSize: 13
                                    }}
                                    formatter={(value) => [`₫${value}M`, 'Doanh thu']}
                                  />
                                  <RechartLine
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#2b2b2b"
                                    strokeWidth={2}
                                    dot={{ fill: '#2b2b2b', stroke: '#fff', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6 }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </Card>
                          )}

                        </Space>
                      </Col>

                      {/* Right Sidebar */}
                      <Col xs={24} lg={7}>
                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                          {/* Alert & Risks - Tabbed */}
                          {(selectedWorkspace?.layout?.showAlerts !== false && selectedWorkspace) && (
                            <Card
                              title={<Text strong style={{ fontSize: 14, color: '#2b2b2b' }}>Alert & Risks</Text>}
                              size="small"
                              style={{
                                background: '#fff',
                                border: '1px solid #E1E3E5',
                                borderRadius: 12,
                                boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)',
                                cursor: selectedTemplate?.sectionLinks?.['loi-canh-bao'] ? 'pointer' : 'default'
                              }}
                              onClick={() => {
                                const link = selectedTemplate?.sectionLinks?.['loi-canh-bao'];
                                if (link) {
                                  window.open(link, '_blank', 'noopener,noreferrer');
                                }
                              }}
                            >
                              <Tabs
                                defaultActiveKey="errors"
                                size="small"
                                items={[
                                  {
                                    key: 'errors',
                                    label: (
                                      <Space size={4}>
                                        <ExclamationCircleOutlined style={{ color: '#D72C0D', fontSize: 14 }} />
                                        <span>Lỗi</span>
                                        <Tag
                                          color="error"
                                          style={{
                                            fontSize: 11,
                                            padding: '0 6px',
                                            background: '#FEF3F2',
                                            color: '#D72C0D',
                                            border: '1px solid #FECDD6',
                                            borderRadius: 10,
                                            marginLeft: 4
                                          }}
                                        >
                                          {alertsData.errors.length}
                                        </Tag>
                                      </Space>
                                    ),
                                    children: (
                                      <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 6
                                      }}>
                                        {alertsData.errors.map((alert) => {
                                          const isExpanded = expandedAlerts.has(alert.id);
                                          const guides = alertGuides[alert.id] || [];
                                          return (
                                            <div key={alert.id}>
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  padding: '10px 12px',
                                                  borderRadius: 6,
                                                  background: hoveredAlertId === alert.id ? '#FEE4E2' : '#FEF3F2',
                                                  border: 'none',
                                                  transition: 'all 0.2s',
                                                  cursor: 'pointer',
                                                  gap: 8
                                                }}
                                                onClick={() => {
                                                  setExpandedAlerts(prev => {
                                                    const newSet = new Set(prev);
                                                    if (newSet.has(alert.id)) {
                                                      newSet.delete(alert.id);
                                                    } else {
                                                      newSet.add(alert.id);
                                                    }
                                                    return newSet;
                                                  });
                                                }}
                                                onMouseEnter={() => setHoveredAlertId(alert.id)}
                                                onMouseLeave={() => setHoveredAlertId(null)}
                                              >
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                                                    <span style={{
                                                      fontSize: 20,
                                                      fontWeight: 700,
                                                      color: '#2b2b2b',
                                                      lineHeight: 1
                                                    }}>
                                                      {alert.value || alert.count}
                                                    </span>
                                                    <Text style={{
                                                      fontSize: 13,
                                                      fontWeight: 500,
                                                      color: '#2b2b2b'
                                                    }}>
                                                      {alert.title}
                                                    </Text>
                                                  </div>
                                                </div>
                                                {hoveredAlertId === alert.id && (
                                                  <Tooltip title="Xem thêm">
                                                    <EyeOutlined
                                                      style={{
                                                        fontSize: 14,
                                                        color: '#6D7175',
                                                        transition: 'all 0.2s',
                                                        marginRight: 8
                                                      }}
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                      }}
                                                      onMouseEnter={(e) => {
                                                        e.currentTarget.style.color = '#1677FF';
                                                        e.currentTarget.style.transform = 'scale(1.1)';
                                                      }}
                                                      onMouseLeave={(e) => {
                                                        e.currentTarget.style.color = '#6D7175';
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                      }}
                                                    />
                                                  </Tooltip>
                                                )}
                                                {guides.length > 0 && (
                                                  (isExpanded || hoveredAlertId === alert.id) ? (
                                                    isExpanded ? (
                                                      <DownOutlined
                                                        style={{
                                                          fontSize: 12,
                                                          color: '#6D7175',
                                                          transition: 'all 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                          e.currentTarget.style.color = '#2b2b2b';
                                                          e.currentTarget.style.transform = 'scale(1.1)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                          e.currentTarget.style.color = '#6D7175';
                                                          e.currentTarget.style.transform = 'scale(1)';
                                                        }}
                                                      />
                                                    ) : (
                                                      <Tooltip title="Hướng dẫn">
                                                        <BookOutlined
                                                          style={{
                                                            fontSize: 12,
                                                            color: '#6D7175',
                                                            transition: 'all 0.2s'
                                                          }}
                                                          onMouseEnter={(e) => {
                                                            e.currentTarget.style.color = '#2b2b2b';
                                                            e.currentTarget.style.transform = 'scale(1.1)';
                                                          }}
                                                          onMouseLeave={(e) => {
                                                            e.currentTarget.style.color = '#6D7175';
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                          }}
                                                        />
                                                      </Tooltip>
                                                    )
                                                  ) : (
                                                    <div style={{ width: 12 }} />
                                                  )
                                                )}
                                              </div>
                                              {isExpanded && guides.length > 0 && (
                                                <div style={{
                                                  padding: '12px',
                                                  background: '#FAFAFA',
                                                  borderLeft: '3px solid #D72C0D',
                                                  marginTop: 4,
                                                  borderRadius: '0 0 6px 6px'
                                                }}>
                                                  <List
                                                    size="small"
                                                    dataSource={guides}
                                                    renderItem={(item) => {
                                                      const getIcon = (type) => {
                                                        return type === 'case-study' ? <LineChartOutlined /> : <BookOutlined />;
                                                      };
                                                      const getColor = (type) => {
                                                        return type === 'case-study' ? '#52C41A' : '#1890FF';
                                                      };
                                                      return (
                                                        <List.Item
                                                          style={{ padding: '6px 0', cursor: 'pointer' }}
                                                          onClick={() => message.info(`Đang mở: ${item.title}`)}
                                                        >
                                                          <List.Item.Meta
                                                            avatar={
                                                              <div style={{
                                                                width: 24,
                                                                height: 24,
                                                                borderRadius: 6,
                                                                background: `${getColor(item.type)}15`,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                              }}>
                                                                {React.cloneElement(getIcon(item.type), {
                                                                  style: { fontSize: 12, color: getColor(item.type) }
                                                                })}
                                                              </div>
                                                            }
                                                            title={<Text style={{ fontSize: 12 }}>{item.title}</Text>}
                                                            description={
                                                              <Tag style={{ fontSize: 9, padding: '0 4px' }}>{item.category}</Tag>
                                                            }
                                                          />
                                                          <ExportOutlined
                                                            style={{
                                                              fontSize: 10,
                                                              color: '#8c8c8c',
                                                              transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                              e.currentTarget.style.color = '#1677FF';
                                                              e.currentTarget.style.transform = 'scale(1.1)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                              e.currentTarget.style.color = '#8c8c8c';
                                                              e.currentTarget.style.transform = 'scale(1)';
                                                            }}
                                                          />
                                                        </List.Item>
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )
                                  },
                                  {
                                    key: 'warnings',
                                    label: (
                                      <Space size={4}>
                                        <WarningOutlined style={{ color: '#F49342', fontSize: 14 }} />
                                        <span>Cảnh báo</span>
                                        <Tag
                                          color="warning"
                                          style={{
                                            fontSize: 11,
                                            padding: '0 6px',
                                            background: '#FFF8F1',
                                            color: '#F49342',
                                            border: '1px solid #FFE8D7',
                                            borderRadius: 10,
                                            marginLeft: 4
                                          }}
                                        >
                                          {alertsData.warnings.length}
                                        </Tag>
                                      </Space>
                                    ),
                                    children: (
                                      <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 6
                                      }}>
                                        {alertsData.warnings.map((alert) => {
                                          const isExpanded = expandedAlerts.has(alert.id);
                                          const guides = alertGuides[alert.id] || [];
                                          return (
                                            <div key={alert.id}>
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  padding: '10px 12px',
                                                  borderRadius: 6,
                                                  background: hoveredAlertId === alert.id ? '#FFE8D7' : '#FFF8F1',
                                                  border: 'none',
                                                  transition: 'all 0.2s',
                                                  cursor: 'pointer',
                                                  gap: 8
                                                }}
                                                onClick={() => {
                                                  setExpandedAlerts(prev => {
                                                    const newSet = new Set(prev);
                                                    if (newSet.has(alert.id)) {
                                                      newSet.delete(alert.id);
                                                    } else {
                                                      newSet.add(alert.id);
                                                    }
                                                    return newSet;
                                                  });
                                                }}
                                                onMouseEnter={() => setHoveredAlertId(alert.id)}
                                                onMouseLeave={() => setHoveredAlertId(null)}
                                              >
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                                                    <span style={{
                                                      fontSize: 20,
                                                      fontWeight: 700,
                                                      color: '#2b2b2b',
                                                      lineHeight: 1
                                                    }}>
                                                      {alert.value || alert.count}
                                                      {alert.unit === '%' ? '%' : alert.unit ? ` ${alert.unit}` : ''}
                                                    </span>
                                                    <Text style={{
                                                      fontSize: 13,
                                                      fontWeight: 500,
                                                      color: '#2b2b2b'
                                                    }}>
                                                      {alert.title}
                                                    </Text>
                                                  </div>
                                                </div>
                                                {hoveredAlertId === alert.id && (
                                                  <Tooltip title="Xem thêm">
                                                    <EyeOutlined
                                                      style={{
                                                        fontSize: 14,
                                                        color: '#6D7175',
                                                        transition: 'all 0.2s',
                                                        marginRight: 8
                                                      }}
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                      }}
                                                      onMouseEnter={(e) => {
                                                        e.currentTarget.style.color = '#1677FF';
                                                        e.currentTarget.style.transform = 'scale(1.1)';
                                                      }}
                                                      onMouseLeave={(e) => {
                                                        e.currentTarget.style.color = '#6D7175';
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                      }}
                                                    />
                                                  </Tooltip>
                                                )}
                                                {guides.length > 0 && (
                                                  (isExpanded || hoveredAlertId === alert.id) ? (
                                                    isExpanded ? (
                                                      <DownOutlined
                                                        style={{
                                                          fontSize: 12,
                                                          color: '#6D7175',
                                                          transition: 'all 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                          e.currentTarget.style.color = '#2b2b2b';
                                                          e.currentTarget.style.transform = 'scale(1.1)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                          e.currentTarget.style.color = '#6D7175';
                                                          e.currentTarget.style.transform = 'scale(1)';
                                                        }}
                                                      />
                                                    ) : (
                                                      <Tooltip title="Hướng dẫn">
                                                        <BookOutlined
                                                          style={{
                                                            fontSize: 12,
                                                            color: '#6D7175',
                                                            transition: 'all 0.2s'
                                                          }}
                                                          onMouseEnter={(e) => {
                                                            e.currentTarget.style.color = '#2b2b2b';
                                                            e.currentTarget.style.transform = 'scale(1.1)';
                                                          }}
                                                          onMouseLeave={(e) => {
                                                            e.currentTarget.style.color = '#6D7175';
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                          }}
                                                        />
                                                      </Tooltip>
                                                    )
                                                  ) : (
                                                    <div style={{ width: 12 }} />
                                                  )
                                                )}
                                              </div>
                                              {isExpanded && guides.length > 0 && (
                                                <div style={{
                                                  padding: '12px',
                                                  background: '#FAFAFA',
                                                  borderLeft: '3px solid #F49342',
                                                  marginTop: 4,
                                                  borderRadius: '0 0 6px 6px'
                                                }}>
                                                  <List
                                                    size="small"
                                                    dataSource={guides}
                                                    renderItem={(item) => {
                                                      const getIcon = (type) => {
                                                        return type === 'case-study' ? <LineChartOutlined /> : <BookOutlined />;
                                                      };
                                                      const getColor = (type) => {
                                                        return type === 'case-study' ? '#52C41A' : '#1890FF';
                                                      };
                                                      return (
                                                        <List.Item
                                                          style={{ padding: '6px 0', cursor: 'pointer' }}
                                                          onClick={() => message.info(`Đang mở: ${item.title}`)}
                                                        >
                                                          <List.Item.Meta
                                                            avatar={
                                                              <div style={{
                                                                width: 24,
                                                                height: 24,
                                                                borderRadius: 6,
                                                                background: `${getColor(item.type)}15`,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                              }}>
                                                                {React.cloneElement(getIcon(item.type), {
                                                                  style: { fontSize: 12, color: getColor(item.type) }
                                                                })}
                                                              </div>
                                                            }
                                                            title={<Text style={{ fontSize: 12 }}>{item.title}</Text>}
                                                            description={
                                                              <Tag style={{ fontSize: 9, padding: '0 4px' }}>{item.category}</Tag>
                                                            }
                                                          />
                                                          <ExportOutlined
                                                            style={{
                                                              fontSize: 10,
                                                              color: '#8c8c8c',
                                                              transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                              e.currentTarget.style.color = '#1677FF';
                                                              e.currentTarget.style.transform = 'scale(1.1)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                              e.currentTarget.style.color = '#8c8c8c';
                                                              e.currentTarget.style.transform = 'scale(1)';
                                                            }}
                                                          />
                                                        </List.Item>
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )
                                  }
                                ]}
                              />
                            </Card>
                          )}

                          {/* Có thể bạn quan tâm - Case Study & Blog Only */}
                          {(selectedWorkspace?.layout?.showGuides !== false && selectedWorkspace) && (
                            <Card
                              title={<Text strong style={{ fontSize: 14, color: '#2b2b2b' }}>Có thể bạn quan tâm</Text>}
                              size="small"
                              extra={
                                (() => {
                                  const linkData = selectedTemplate?.sectionLinks?.['tin-tuc'];
                                  const linkUrl = typeof linkData === 'object' ? linkData?.url : linkData;
                                  const linkText = typeof linkData === 'object' ? (linkData?.text || 'Xem thêm') : 'Xem thêm';
                                  return linkUrl ? (
                                    <Button
                                      type="link"
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(linkUrl, '_blank', 'noopener,noreferrer');
                                      }}
                                      style={{ padding: 0 }}
                                      className="xem-them-link"
                                    >
                                      {linkText}
                                    </Button>
                                  ) : (
                                    <Button
                                      type="link"
                                      size="small"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      Tất cả
                                    </Button>
                                  );
                                })()
                              }
                              style={{
                                background: '#fff',
                                border: '1px solid #E1E3E5',
                                borderRadius: 12,
                                boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                              }}
                            >
                              <List
                                size="small"
                                dataSource={contentItems.insights}
                                renderItem={(item) => {
                                  const getIcon = (iconType) => {
                                    switch (iconType) {
                                      case 'chart': return <LineChartOutlined />;
                                      case 'bulb': return <BulbOutlined />;
                                      case 'book': return <BookOutlined />;
                                      default: return <BookOutlined />;
                                    }
                                  };
                                  return (
                                    <List.Item
                                      style={{ padding: '8px 0', cursor: 'pointer' }}
                                      onClick={() => message.info('Đang mở bài viết...')}
                                    >
                                      <List.Item.Meta
                                        avatar={
                                          <div style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 8,
                                            background: `${item.color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                          }}>
                                            {React.cloneElement(getIcon(item.icon), {
                                              style: { fontSize: 16, color: item.color }
                                            })}
                                          </div>
                                        }
                                        title={<Text style={{ fontSize: 13 }}>{item.title}</Text>}
                                        description={
                                          <Space>
                                            <Tag style={{ fontSize: 10, padding: '0 4px' }}>{item.category}</Tag>
                                            <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{item.date}</Text>
                                          </Space>
                                        }
                                      />
                                      <ExportOutlined
                                        style={{
                                          fontSize: 12,
                                          color: '#8c8c8c',
                                          transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.color = '#1677FF';
                                          e.currentTarget.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.color = '#8c8c8c';
                                          e.currentTarget.style.transform = 'scale(1)';
                                        }}
                                      />
                                    </List.Item>
                                  );
                                }}
                              />
                            </Card>
                          )}
                        </Space>
                      </Col>
                    </Row>
                  </>
                ) : activeModule === 'orders' || activeModule === 'danh-sach-don-hang' ? (
                  <OrderList />
                ) : activeModule === 'workspace-settings' ? (
                  renderWorkspaceSettings()
                ) : activeModule === 'template-create' ? (
                  renderTemplateBuilderScreen()
                ) : (
                  <div style={{ padding: 64 }}>
                    <Empty description="Module đang được phát triển" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
              </Content>
            </Layout>
          </Layout>


          {/* Child Modal - Tạo Template Mới */}
          <Modal
            title="Tạo template mới"
            open={createTemplateModalVisible}
            onCancel={() => handleCloseChildModal(true)}
            footer={[
              <Button key="cancel" onClick={() => handleCloseChildModal(true)}>
                Hủy
              </Button>,
              <Button
                key="draft"
                onClick={() => handleCreateTemplate(false)}
                disabled={!newTemplateName.trim() || selectedMetrics.length === 0}
              >
                Lưu nháp
              </Button>,
              <Button
                key="save"
                type="primary"
                onClick={() => handleCreateTemplate(true)}
                disabled={!newTemplateName.trim() || selectedMetrics.length === 0}
              >
                Lưu & Sử dụng ({selectedMetrics.length} metrics)
              </Button>
            ]}
            width={1200}
            style={{ top: 20 }}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={10}>
                <Card
                  bodyStyle={{ padding: 20 }}
                  style={{ height: '100%' }}
                >
                  <Text strong style={{ display: 'block', marginBottom: 12 }}>
                    Thông tin template
                  </Text>
                  <Input
                    placeholder="Nhập tên template..."
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    size="large"
                    prefix={<EditOutlined />}
                    style={{ marginBottom: 16 }}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12
                  }}>
                    <Text type="secondary">
                      Đang chọn: <strong>{selectedMetrics.length}</strong> metrics
                    </Text>
                    <Button type="link" onClick={() => setSelectedMetrics([])}>
                      Bỏ chọn
                    </Button>
                  </div>
                  <Input.Search
                    placeholder="Tìm kiếm metrics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: 16 }}
                    size="middle"
                    allowClear
                  />
                  <div style={{ maxHeight: '55vh', overflowY: 'auto', paddingRight: 8 }}>
                    {Object.entries(filteredMetrics).map(([domain, metrics]) => {
                      const selectedCount = metrics.filter(m => selectedMetrics.includes(m.id)).length;
                      return (
                        <div key={domain} style={{ marginBottom: 24 }}>
                          <div style={{ marginBottom: 8 }}>
                            <Text strong style={{ fontSize: 13 }}>{domain}</Text>
                            <Space size={8} style={{ marginLeft: 8 }}>
                              <Tag color="blue">{metrics.length} metrics</Tag>
                              <Tag color="green">{selectedCount} đã chọn</Tag>
                            </Space>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {metrics.map(metric => {
                              const isSelected = selectedMetrics.includes(metric.id);
                              const isHovered = hoveredMetricId === metric.id;
                              return (
                                <div
                                  key={metric.id}
                                  onClick={() => handleToggleMetricSelection(metric.id)}
                                  onMouseEnter={() => setHoveredMetricId(metric.id)}
                                  onMouseLeave={() => setHoveredMetricId((current) => current === metric.id ? null : current)}
                                  style={{
                                    padding: '10px 12px',
                                    borderRadius: 12,
                                    border: isSelected ? '1px solid #1677FF' : '1px solid #E4E6EB',
                                    background: isSelected ? 'rgba(22, 119, 255, 0.08)' : (isHovered ? '#F5F7FB' : '#fff'),
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'all 0.2s',
                                    boxShadow: isHovered ? '0 2px 6px rgba(15,23,42,0.08)' : 'none'
                                  }}
                                >
                                  <div>
                                    <Text style={{ fontSize: 13, color: '#1E1E1E' }}>{metric.name}</Text>
                                  </div>
                                  {isSelected && (
                                    <Tag color="#1677FF" style={{ margin: 0 }}>
                                      Đã chọn
                                    </Tag>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={14}>
                <Card
                  title="Preview bố cục dashboard"
                  extra={
                    <Space size={12}>
                      <Tag color="blue">{selectedMetrics.length} metrics</Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Kéo thả & thay đổi kích thước
                      </Text>
                    </Space>
                  }
                  bodyStyle={{ padding: 0 }}
                >
                  <div style={{ position: 'relative', minHeight: 420, padding: 16 }}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 16,
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
                        gridAutoRows: `${PREVIEW_SLOT_HEIGHT}px`,
                        gap: PREVIEW_SLOT_GAP,
                        pointerEvents: 'none',
                        zIndex: 1,
                        width: '100%'
                      }}
                    >
                      {Array.from({ length: 36 }).map((_, idx) => (
                        <div
                          key={`slot-${idx}`}
                          style={{
                            border: '1px dashed #CBD5F5',
                            borderRadius: 24,
                            background: 'rgba(241, 245, 249, 0.6)',
                            minWidth: 0
                          }}
                        />
                      ))}
                    </div>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      {previewBlocks.length > 0 ? (
                        <DndContext
                          collisionDetection={closestCenter}
                          onDragEnd={handlePreviewDragEnd}
                          modifiers={[previewGridSnapModifier]}
                        >
                          <SortableContext
                            items={previewBlocks.map(block => block.id)}
                            strategy={rectSortingStrategy}
                          >
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
                              gap: PREVIEW_SLOT_GAP,
                              width: '100%'
                            }}>
                              {previewBlocks.map(block => {
                                const metric = allMetricsPool.find(m => m.id === block.metricId);
                                return (
                                  <SortablePreviewBlock
                                    key={block.id}
                                    block={block}
                                    metric={metric}
                                    onResize={handleResizePreview}
                                    onRemove={handleRemovePreviewBlock}
                                    isHovered={hoveredPreviewBlock === block.id}
                                    onHoverChange={(hovering) => {
                                      setHoveredPreviewBlock(prev => {
                                        if (hovering) return block.id;
                                        return prev === block.id ? null : prev;
                                      });
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </SortableContext>
                        </DndContext>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Modal>

          {/* Child Modal - Chỉnh Template */}
          <Modal
            title={`Chỉnh sửa: ${selectedTemplate?.name || ''}`}
            open={editTemplateModalVisible}
            onCancel={() => handleCloseChildModal(false)}
            footer={[
              <Button key="cancel" onClick={() => handleCloseChildModal(false)}>
                Hủy
              </Button>,
              <Button
                key="draft"
                onClick={() => handleEditTemplate(false)}
                disabled={!newTemplateName.trim() || selectedMetrics.length === 0}
              >
                Lưu nháp
              </Button>,
              <Button
                key="save"
                type="primary"
                onClick={() => handleEditTemplate(true)}
                disabled={!newTemplateName.trim() || selectedMetrics.length === 0}
              >
                Lưu & Sử dụng ({selectedMetrics.length} metrics)
              </Button>
            ]}
            width={1000}
            style={{ top: 20 }}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            {/* Template Name Input */}
            <Input
              placeholder="Tên template..."
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              size="large"
              prefix={<EditOutlined />}
              style={{ marginBottom: 16 }}
            />

            {/* Search Bar */}
            <Input.Search
              placeholder="Tìm kiếm metrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginBottom: 16 }}
              size="large"
              allowClear
            />

            {/* Metrics by Domain */}
            <Collapse
              defaultActiveKey={Object.keys(filteredMetrics)}
              style={{ marginBottom: 16 }}
            >
              {Object.entries(filteredMetrics).map(([domain, metrics]) => (
                <Collapse.Panel
                  key={domain}
                  header={
                    <Space>
                      <Text strong>{domain}</Text>
                      <Tag color="blue">{metrics.length} metrics</Tag>
                      <Tag color="green">
                        {metrics.filter(m => selectedMetrics.includes(m.id)).length} đã chọn
                      </Tag>
                    </Space>
                  }
                >
                  <Row gutter={[8, 8]}>
                    {metrics.map(metric => (
                      <Col span={12} key={metric.id}>
                        <Checkbox
                          checked={selectedMetrics.includes(metric.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMetrics([...selectedMetrics, metric.id]);
                            } else {
                              setSelectedMetrics(selectedMetrics.filter(id => id !== metric.id));
                            }
                          }}
                        >
                          {metric.name}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Collapse.Panel>
              ))}
            </Collapse>
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
              style={{ marginBottom: 16, borderLeft: '3px solid #1677FF', background: '#f0f5ff' }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ThunderboltOutlined style={{ color: '#1677FF', fontSize: 18 }} />
                  <Text strong style={{ color: '#1677FF' }}>Insight nổi bật</Text>
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

          {/* Workspace Configuration Drawer - Full Screen */}
          <Drawer
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text strong style={{ fontSize: 18 }}>Tạo workspace mới</Text>
                <Space>
                  <Button onClick={() => {
                    setWorkspaceConfigDrawerVisible(false);
                    setNewWorkspaceName('');
                    setSelectedGroup(null);
                    setSelectedItems([]);
                    setSelectedAlertMetrics({ errors: [], warnings: [] });
                  }}>
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleCreateWorkspace}
                    disabled={!newWorkspaceName.trim() || selectedItems.length === 0}
                  >
                    Lưu workspace
                  </Button>
                </Space>
              </div>
            }
            open={workspaceConfigDrawerVisible}
            onClose={() => {
              setWorkspaceConfigDrawerVisible(false);
              setNewWorkspaceName('');
              setSelectedGroup(null);
              setSelectedItems([]);
              setSelectedAlertMetrics({ errors: [], warnings: [] });
            }}
            width="100%"
            style={{ zIndex: 1001 }}
            bodyStyle={{ padding: 0, background: '#FAFBFB' }}
          >
            <div style={{ display: 'flex', height: 'calc(100vh - 55px)' }}>
              {/* Left Column - Tree Navigation */}
              <div style={{
                width: 360,
                background: '#fff',
                borderRight: '1px solid #E1E3E5',
                overflowY: 'auto',
                padding: 24
              }}>
                <div style={{ marginBottom: 24 }}>
                  <Input
                    placeholder="Nhập tên workspace..."
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    size="large"
                    prefix={<EditOutlined />}
                  />
                </div>

                <Text strong style={{ fontSize: 14, color: '#2b2b2b', display: 'block', marginBottom: 16 }}>
                  Chọn nhóm và mục
                </Text>

                <Space direction="vertical" style={{ width: '100%' }} size={8}>
                  {workspaceGroups.map(group => (
                    <div key={group.id} style={{ marginBottom: 8 }}>
                      {/* Group Header - Only show if group has no items or if group is not selected */}
                      {(!group.items || group.items.length === 0) && !isItemSelected(group.id) && (
                        <div
                          onClick={() => {
                            setSelectedGroup(group.id);
                            handleSelectItem(group.id);
                          }}
                          style={{
                            padding: '12px 16px',
                            borderRadius: 8,
                            border: selectedGroup === group.id ? '1px solid #1677FF' : '1px solid #E4E6EB',
                            background: selectedGroup === group.id ? 'rgba(22, 119, 255, 0.08)' : '#FAFAFA',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            marginBottom: 4
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 18, color: selectedGroup === group.id ? '#1677FF' : '#6D7175' }}>
                              {group.icon}
                            </span>
                            <Text strong style={{ fontSize: 14, color: selectedGroup === group.id ? '#1677FF' : '#2b2b2b' }}>
                              {group.name}
                            </Text>
                          </div>
                        </div>
                      )}

                      {/* Group Header with items - Expandable */}
                      {group.items && group.items.length > 0 && (
                        <>
                          <div
                            onClick={() => setSelectedGroup(selectedGroup === group.id ? null : group.id)}
                            style={{
                              padding: '12px 16px',
                              borderRadius: 8,
                              border: selectedGroup === group.id ? '1px solid #1677FF' : '1px solid #E4E6EB',
                              background: selectedGroup === group.id ? 'rgba(22, 119, 255, 0.08)' : '#FAFAFA',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              marginBottom: 4
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <span style={{ fontSize: 18, color: selectedGroup === group.id ? '#1677FF' : '#6D7175' }}>
                                {group.icon}
                              </span>
                              <Text strong style={{ fontSize: 14, color: selectedGroup === group.id ? '#1677FF' : '#2b2b2b' }}>
                                {group.name}
                              </Text>
                            </div>
                          </div>

                          {/* Sub-items - Only show items that are not selected */}
                          {selectedGroup === group.id && (
                            <div style={{ marginLeft: 32, marginTop: 8 }}>
                              {group.items
                                .filter(item => !isItemSelected(group.id, item.id))
                                .map(item => {
                                  // For Dashboard, disable if another dashboard is already selected
                                  const isDisabled = group.id === 'Dashboard' && hasDashboardSelected();

                                  return (
                                    <Tooltip
                                      key={item.id}
                                      title={isDisabled ? 'Chỉ có thể chọn một dashboard. Vui lòng xóa dashboard hiện tại trước.' : ''}
                                      placement="right"
                                    >
                                      <div
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (!isDisabled) {
                                            handleSelectItem(group.id, item.id);
                                          }
                                        }}
                                        style={{
                                          padding: '10px 12px',
                                          borderRadius: 6,
                                          border: '1px solid #E4E6EB',
                                          background: isDisabled ? '#F5F5F5' : '#fff',
                                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                                          transition: 'all 0.2s',
                                          marginBottom: 4,
                                          opacity: isDisabled ? 0.6 : 1
                                        }}
                                      >
                                        <Text style={{ fontSize: 13, color: isDisabled ? '#8c8c8c' : '#2b2b2b' }}>
                                          {item.name}
                                        </Text>
                                        {item.description && (
                                          <Text type="secondary" style={{ fontSize: 11, display: 'block', marginTop: 4 }}>
                                            {item.description}
                                          </Text>
                                        )}
                                      </div>
                                    </Tooltip>
                                  );
                                })}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </Space>
              </div>

              {/* Right Column - Preview */}
              <div style={{
                flex: 1,
                padding: 24,
                overflowY: 'auto',
                background: '#FAFBFB'
              }}>
                <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 20 }}>
                  Preview workspace: {newWorkspaceName || 'Chưa đặt tên'}
                </Text>

                {selectedItems.length === 0 ? (
                  <Empty description="Chưa chọn nhóm hoặc mục nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                  <Row gutter={24}>
                    {/* Left Main Column */}
                    <Col xs={24} lg={17}>
                      <Space direction="vertical" size={20} style={{ width: '100%' }}>
                        {/* Dashboard Items */}
                        {selectedItems
                          .filter(item => item.groupId === 'Dashboard' && item.itemId)
                          .map((item, idx) => {
                            try {
                              const group = workspaceGroups.find(g => g.id === item.groupId);
                              const subItem = group?.items?.find(i => i.id === item.itemId);
                              if (!subItem) return null;

                              return (
                                <Card
                                  key={`${item.groupId}-${item.itemId}-${idx}`}
                                  title={
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Báo cáo kết quả - {subItem.name}</Text>
                                      <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        onClick={() => handleRemoveItem(item.groupId, item.itemId)}
                                      />
                                    </div>
                                  }
                                  style={{
                                    background: '#fff',
                                    border: '1px solid #E1E3E5',
                                    borderRadius: 16,
                                    boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                                  }}
                                >
                                  <Row gutter={[12, 12]}>
                                    {/* KPI Cards */}
                                    {(currentKpiOverview?.col1 || []).map((kpi, i) => (
                                      <Col span={8} key={`col1-${i}`}>
                                        <KPICard {...kpi} />
                                      </Col>
                                    ))}
                                    {(currentKpiOverview?.col2 || []).map((kpi, i) => (
                                      <Col span={8} key={`col2-${i}`}>
                                        <KPICard {...kpi} />
                                      </Col>
                                    ))}
                                    {(currentKpiOverview?.col3 || []).map((kpi, i) => (
                                      <Col span={8} key={`col3-${i}`}>
                                        {kpi.breakdown ? (
                                          <Card size="small" style={{ background: '#F7F7F7', border: 'none', height: '100%' }}>
                                            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>{kpi.title}</Text>
                                            <Space direction="vertical" style={{ width: '100%' }} size={8}>
                                              {(kpi.breakdown || []).map((breakdownItem, breakdownIdx) => (
                                                <div key={`breakdown-${breakdownIdx}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                  <Text style={{ fontSize: 12 }}>{breakdownItem.label}</Text>
                                                  <Text strong style={{ fontSize: 12 }}>{breakdownItem.value}</Text>
                                                </div>
                                              ))}
                                            </Space>
                                          </Card>
                                        ) : (
                                          <KPICard {...kpi} />
                                        )}
                                      </Col>
                                    ))}
                                  </Row>

                                  {/* Charts Row */}
                                  <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
                                    <Col span={12}>
                                      <Card size="small" title="Xu hướng Doanh thu" style={{ height: 200 }}>
                                        <ResponsiveContainer width="100%" height={150}>
                                          <LineChart data={currentChartData || []}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <ChartTooltip />
                                            <RechartLine type="monotone" dataKey="value" stroke="#1677FF" />
                                          </LineChart>
                                        </ResponsiveContainer>
                                      </Card>
                                    </Col>
                                    <Col span={12}>
                                      <Card size="small" title="Phân bổ kênh" style={{ height: 200 }}>
                                        <ResponsiveContainer width="100%" height={150}>
                                          <PieChart>
                                            <RechartPie
                                              data={currentPieData || []}
                                              cx="50%"
                                              cy="50%"
                                              labelLine={false}
                                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                              outerRadius={50}
                                              fill="#8884d8"
                                              dataKey="value"
                                            >
                                              {(currentPieData || []).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={['#1677FF', '#52C41A', '#FA8C16'][index % 3]} />
                                              ))}
                                            </RechartPie>
                                            <ChartTooltip />
                                          </PieChart>
                                        </ResponsiveContainer>
                                      </Card>
                                    </Col>
                                  </Row>
                                </Card>
                              );
                            } catch (error) {
                              console.error('Error rendering dashboard preview:', error, item);
                              return (
                                <Card key={`error-${idx}`} title="Lỗi hiển thị">
                                  <Text type="danger">Có lỗi xảy ra khi hiển thị dashboard: {error.message}</Text>
                                </Card>
                              );
                            }
                          })}

                        {/* Báo cáo tiến độ - Show if any Dashboard is selected */}
                        {selectedItems.some(item => item.groupId === 'Dashboard' && item.itemId) && (
                          <Card
                            title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Báo cáo tiến độ</Text>}
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
                                  <div style={{
                                    padding: '20px 16px',
                                    background: '#F7F7F7',
                                    borderRadius: 12,
                                    border: 'none'
                                  }}>
                                    <div style={{ fontSize: 13, color: '#6D7175', marginBottom: 8, fontWeight: 500 }}>
                                      {goal.title}
                                    </div>
                                    <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: '#2b2b2b' }}>
                                      {goal.current} / {goal.target}
                                    </div>
                                    <Progress
                                      percent={goal.percent}
                                      strokeColor="#1677FF"
                                      strokeWidth={10}
                                      showInfo={false}
                                    />
                                    <div style={{
                                      fontSize: 14,
                                      color: '#2b2b2b',
                                      marginTop: 8,
                                      fontWeight: 500
                                    }}>
                                      {goal.percent}% {goal.status}
                                    </div>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Card>
                        )}
                      </Space>
                    </Col>

                    {/* Right Sidebar */}
                    <Col xs={24} lg={7}>
                      <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        {/* Lỗi & Cảnh báo */}
                        {selectedItems.some(item => item.groupId === 'Lỗi & Cảnh báo' && !item.itemId) && (
                          <Card
                            title={
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text strong style={{ fontSize: 14, color: '#2b2b2b' }}>Alert & Risks</Text>
                                <Button
                                  type="text"
                                  danger
                                  icon={<DeleteOutlined />}
                                  size="small"
                                  onClick={() => handleRemoveItem('Lỗi & Cảnh báo')}
                                />
                              </div>
                            }
                            size="small"
                            style={{
                              background: '#fff',
                              border: '1px solid #E1E3E5',
                              borderRadius: 12,
                              boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                            }}
                          >
                            <Tabs
                              defaultActiveKey="errors"
                              size="small"
                              items={[
                                {
                                  key: 'errors',
                                  label: (
                                    <Space size={4}>
                                      <ExclamationCircleOutlined style={{ color: '#D72C0D', fontSize: 14 }} />
                                      <span>Lỗi</span>
                                      {selectedAlertMetrics.errors.length > 0 && (
                                        <div style={{
                                          width: 20,
                                          height: 20,
                                          borderRadius: '50%',
                                          background: '#D72C0D',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginLeft: 4
                                        }}>
                                          <Text style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>
                                            {selectedAlertMetrics.errors.length}
                                          </Text>
                                        </div>
                                      )}
                                    </Space>
                                  ),
                                  children: (
                                    <div style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: 6
                                    }}>
                                      {selectedAlertMetrics.errors.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                          <Button
                                            size="small"
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => setAlertMetricsOverlayVisible(true)}
                                          >
                                            Thêm chỉ số
                                          </Button>
                                        </div>
                                      ) : (
                                        <>
                                          {selectedAlertMetrics.errors.map(metricId => {
                                            const metric = alertMetrics.errors.find(m => m.id === metricId);
                                            return metric ? (
                                              <div
                                                key={metricId}
                                                style={{
                                                  padding: '12px',
                                                  background: '#FEF3F2',
                                                  border: `1px solid ${metric.color}`,
                                                  borderRadius: 8
                                                }}
                                              >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                  <Text style={{ fontSize: 13, color: metric.color }}>
                                                    {metric.name}
                                                  </Text>
                                                  {metric.value && (
                                                    <Text strong style={{ fontSize: 13, color: metric.color }}>
                                                      {metric.value}{metric.unit}
                                                    </Text>
                                                  )}
                                                </div>
                                              </div>
                                            ) : null;
                                          })}
                                          <Button
                                            size="small"
                                            type="dashed"
                                            icon={<PlusOutlined />}
                                            onClick={() => setAlertMetricsOverlayVisible(true)}
                                            block
                                            style={{ marginTop: 8 }}
                                          >
                                            Thêm chỉ số
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  )
                                },
                                {
                                  key: 'warnings',
                                  label: (
                                    <Space size={4}>
                                      <WarningOutlined style={{ color: '#FA8C16', fontSize: 14 }} />
                                      <span>Cảnh báo</span>
                                      {selectedAlertMetrics.warnings.length > 0 && (
                                        <div style={{
                                          width: 20,
                                          height: 20,
                                          borderRadius: '50%',
                                          background: '#FA8C16',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginLeft: 4
                                        }}>
                                          <Text style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>
                                            {selectedAlertMetrics.warnings.length}
                                          </Text>
                                        </div>
                                      )}
                                    </Space>
                                  ),
                                  children: (
                                    <div style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: 6
                                    }}>
                                      {selectedAlertMetrics.warnings.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                          <Button
                                            size="small"
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => setAlertMetricsOverlayVisible(true)}
                                          >
                                            Thêm chỉ số
                                          </Button>
                                        </div>
                                      ) : (
                                        <>
                                          {selectedAlertMetrics.warnings.map(metricId => {
                                            const metric = alertMetrics.warnings.find(m => m.id === metricId);
                                            return metric ? (
                                              <div
                                                key={metricId}
                                                style={{
                                                  padding: '12px',
                                                  background: '#FFF7E6',
                                                  border: `1px solid ${metric.color}`,
                                                  borderRadius: 8
                                                }}
                                              >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                  <Text style={{ fontSize: 13, color: metric.color }}>
                                                    {metric.name}
                                                  </Text>
                                                  {metric.value && (
                                                    <Text strong style={{ fontSize: 13, color: metric.color }}>
                                                      {metric.value}{metric.unit}
                                                    </Text>
                                                  )}
                                                </div>
                                              </div>
                                            ) : null;
                                          })}
                                          <Button
                                            size="small"
                                            type="dashed"
                                            icon={<PlusOutlined />}
                                            onClick={() => setAlertMetricsOverlayVisible(true)}
                                            block
                                            style={{ marginTop: 8 }}
                                          >
                                            Thêm chỉ số
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  )
                                }
                              ]}
                            />
                          </Card>
                        )}

                        {/* Tin tức */}
                        {selectedItems.some(item => item.groupId === 'Tin tức' && !item.itemId) && (
                          <Card
                            title={
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text strong style={{ fontSize: 14, color: '#2b2b2b' }}>Có thể bạn quan tâm</Text>
                                <Space>
                                  <Button type="link" size="small">Tất cả</Button>
                                  <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    size="small"
                                    onClick={() => handleRemoveItem('Tin tức')}
                                  />
                                </Space>
                              </div>
                            }
                            size="small"
                            style={{
                              background: '#fff',
                              border: '1px solid #E1E3E5',
                              borderRadius: 12,
                              boxShadow: '0 1px 2px rgba(43, 43, 43, 0.06)'
                            }}
                          >
                            <List
                              size="small"
                              dataSource={contentItems.insights}
                              renderItem={(item) => {
                                const getIcon = (iconType) => {
                                  switch (iconType) {
                                    case 'chart': return <LineChartOutlined />;
                                    case 'bulb': return <BulbOutlined />;
                                    case 'book': return <BookOutlined />;
                                    default: return <BookOutlined />;
                                  }
                                };
                                return (
                                  <List.Item
                                    style={{ padding: '8px 0', cursor: 'pointer' }}
                                    onClick={() => message.info('Đang mở bài viết...')}
                                  >
                                    <List.Item.Meta
                                      avatar={
                                        <div style={{
                                          width: 32,
                                          height: 32,
                                          borderRadius: 8,
                                          background: `${item.color}15`,
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center'
                                        }}>
                                          {React.cloneElement(getIcon(item.icon), {
                                            style: { fontSize: 16, color: item.color }
                                          })}
                                        </div>
                                      }
                                      title={<Text style={{ fontSize: 13 }}>{item.title}</Text>}
                                      description={
                                        <Space>
                                          <Tag color={item.color} style={{ fontSize: 11 }}>
                                            {item.category}
                                          </Tag>
                                          <Text type="secondary" style={{ fontSize: 11 }}>
                                            {item.date}
                                          </Text>
                                        </Space>
                                      }
                                    />
                                  </List.Item>
                                );
                              }}
                            />
                          </Card>
                        )}
                      </Space>
                    </Col>
                  </Row>
                )}
              </div>
            </div>
          </Drawer>

          {/* Alert Metrics Selection Overlay */}
          <Modal
            title="Chọn chỉ số hiển thị"
            open={alertMetricsOverlayVisible}
            onCancel={() => setAlertMetricsOverlayVisible(false)}
            onOk={() => setAlertMetricsOverlayVisible(false)}
            okText="Xác nhận"
            cancelText="Hủy"
            width={600}
          >
            <Tabs
              defaultActiveKey="errors"
              items={[
                {
                  key: 'errors',
                  label: (
                    <Space size={4}>
                      <ExclamationCircleOutlined style={{ color: '#D72C0D' }} />
                      <span>Lỗi</span>
                    </Space>
                  ),
                  children: (
                    <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                      <Space direction="vertical" style={{ width: '100%' }} size={12}>
                        {alertMetrics.errors.map(metric => (
                          <Checkbox
                            key={metric.id}
                            checked={selectedAlertMetrics.errors.includes(metric.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAlertMetrics(prev => ({
                                  ...prev,
                                  errors: [...prev.errors, metric.id]
                                }));
                              } else {
                                setSelectedAlertMetrics(prev => ({
                                  ...prev,
                                  errors: prev.errors.filter(id => id !== metric.id)
                                }));
                              }
                            }}
                          >
                            <Text style={{ fontSize: 13, marginLeft: 8 }}>
                              {metric.name}
                            </Text>
                          </Checkbox>
                        ))}
                      </Space>
                    </div>
                  )
                },
                {
                  key: 'warnings',
                  label: (
                    <Space size={4}>
                      <WarningOutlined style={{ color: '#FA8C16' }} />
                      <span>Cảnh báo</span>
                    </Space>
                  ),
                  children: (
                    <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                      <Space direction="vertical" style={{ width: '100%' }} size={12}>
                        {alertMetrics.warnings.map(metric => (
                          <Checkbox
                            key={metric.id}
                            checked={selectedAlertMetrics.warnings.includes(metric.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAlertMetrics(prev => ({
                                  ...prev,
                                  warnings: [...prev.warnings, metric.id]
                                }));
                              } else {
                                setSelectedAlertMetrics(prev => ({
                                  ...prev,
                                  warnings: prev.warnings.filter(id => id !== metric.id)
                                }));
                              }
                            }}
                          >
                            <Text style={{ fontSize: 13, marginLeft: 8 }}>
                              {metric.name}
                            </Text>
                          </Checkbox>
                        ))}
                      </Space>
                    </div>
                  )
                }
              ]}
            />
          </Modal>

          {/* Workspace Edit Modal */}
          <Modal
            title="Chỉnh sửa workspace"
            open={workspaceEditModalVisible}
            onCancel={() => {
              setWorkspaceEditModalVisible(false);
              setNewWorkspaceName('');
              setSelectedGroup('Dashboard');
              setEditingWorkspaceId(null);
            }}
            footer={[
              <Button key="cancel" onClick={() => {
                setWorkspaceEditModalVisible(false);
                setNewWorkspaceName('');
                setSelectedGroup('Dashboard');
                setEditingWorkspaceId(null);
              }}>
                Hủy
              </Button>,
              <Button
                key="save"
                type="primary"
                onClick={handleEditWorkspace}
                disabled={!newWorkspaceName.trim()}
              >
                Lưu thay đổi
              </Button>
            ]}
            width={1200}
            style={{ top: 20 }}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            <Row gutter={[24, 24]}>
              {/* Left Column - Groups Navigation */}
              <Col xs={24} lg={8}>
                <Card
                  title="Chọn nhóm"
                  bodyStyle={{ padding: 16 }}
                >
                  <Space direction="vertical" style={{ width: '100%' }} size={12}>
                    {workspaceGroups.map(group => (
                      <div
                        key={group.id}
                        onClick={() => setSelectedGroup(group.id)}
                        style={{
                          padding: '16px',
                          borderRadius: 12,
                          border: selectedGroup === group.id ? '2px solid #1677FF' : '1px solid #E4E6EB',
                          background: selectedGroup === group.id ? 'rgba(22, 119, 255, 0.08)' : '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                          <span style={{ fontSize: 20, color: selectedGroup === group.id ? '#1677FF' : '#6D7175' }}>
                            {group.icon}
                          </span>
                          <Text strong style={{ fontSize: 14, color: selectedGroup === group.id ? '#1677FF' : '#2b2b2b' }}>
                            {group.name}
                          </Text>
                        </div>
                        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginLeft: 32 }}>
                          {group.description}
                        </Text>
                      </div>
                    ))}
                  </Space>
                </Card>
              </Col>

              {/* Right Column - Preview */}
              <Col xs={24} lg={16}>
                <Card
                  title="Preview workspace"
                  bodyStyle={{ padding: 24 }}
                >
                  <div style={{ marginBottom: 16 }}>
                    <Input
                      placeholder="Nhập tên workspace..."
                      value={newWorkspaceName}
                      onChange={(e) => setNewWorkspaceName(e.target.value)}
                      size="large"
                      prefix={<EditOutlined />}
                    />
                  </div>

                  <div style={{
                    border: '1px dashed #D9D9D9',
                    borderRadius: 8,
                    padding: 24,
                    background: '#FAFAFA',
                    minHeight: 300
                  }}>
                    <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>
                      Workspace: {newWorkspaceName || 'Chưa đặt tên'}
                    </Text>
                    <Divider style={{ margin: '16px 0' }} />

                    {selectedGroup === 'Dashboard' && (
                      <div>
                        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
                          ✓ Dashboard - Hiển thị các dashboard chỉ số
                        </Text>
                        <div style={{
                          background: '#fff',
                          border: '1px solid #E4E6EB',
                          borderRadius: 8,
                          padding: 16,
                          marginTop: 12
                        }}>
                          <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                            Section "Báo cáo kết quả" sẽ được hiển thị
                          </Text>
                        </div>
                      </div>
                    )}

                    {selectedGroup === 'Alert & Risks' && (
                      <div>
                        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
                          ✓ Alert & Risks - Hiển thị các widget cảnh báo
                        </Text>
                        <div style={{
                          background: '#fff',
                          border: '1px solid #E4E6EB',
                          borderRadius: 8,
                          padding: 16,
                          marginTop: 12
                        }}>
                          <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                            Section "Alert & Risks" sẽ được hiển thị
                          </Text>
                        </div>
                      </div>
                    )}

                    {selectedGroup === 'Guides / Case studies' && (
                      <div>
                        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
                          ✓ Guides / Case studies - Hiển thị hướng dẫn và case study
                        </Text>
                        <div style={{
                          background: '#fff',
                          border: '1px solid #E4E6EB',
                          borderRadius: 8,
                          padding: 16,
                          marginTop: 12
                        }}>
                          <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                            Section "Có thể bạn quan tâm" sẽ được hiển thị
                          </Text>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          </Modal>

          {/* Template Gallery Modal */}
          <Modal
            title="Template mẫu"
            open={templateGalleryVisible}
            onCancel={() => setTemplateGalleryVisible(false)}
            footer={null}
            width={960}
          >
            <Row gutter={[16, 16]}>
              {templateWorkspaces.map(template => (
                <Col xs={24} md={12} key={template.id}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: 16,
                      border: '1px solid #E1E3E5',
                      boxShadow: '0 8px 24px rgba(15,23,42,0.08)'
                    }}
                  >
                    <Space direction="vertical" size={8} style={{ width: '100%' }}>
                      <Title level={4} style={{ margin: 0 }}>{template.name}</Title>
                      <Space>
                        <Button
                          icon={<EyeOutlined />}
                          onClick={() => handleOpenPreview(template.templateId || template.id, 'gallery')}
                        >
                          Xem trước
                        </Button>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            handleCreateFromTemplate(template);
                            setTemplateGalleryVisible(false);
                          }}
                        >
                          Sử dụng
                        </Button>
                      </Space>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Modal>

          {/* Template Preview Modal */}
          <Modal
            title={previewModalTitle ? `Xem trước: ${previewModalTitle}` : 'Xem trước template'}
            open={previewTemplateModalVisible}
            onCancel={handleClosePreview}
            footer={[
              <Button key="back" onClick={handleClosePreview}>
                Quay lại
              </Button>,
              <Button key="customize" onClick={handleCustomizePreviewTemplate}>
                Tùy chỉnh
              </Button>,
              <Button key="apply" type="primary" onClick={handleUsePreviewTemplate}>
                {previewContext === 'gallery' ? 'Sử dụng' : 'Áp dụng'}
              </Button>
            ]}
            width={960}
          >
            {previewTemplateId ? renderTemplatePreviewContent(previewTemplateId) : <Empty description="Chưa chọn template" />}
          </Modal>

          {/* Template Apply Confirmation Modal */}
          <Modal
            title="Xác nhận áp dụng template"
            open={templateApplyConfirmVisible}
            onOk={handleConfirmTemplateApply}
            onCancel={handleCancelTemplateApply}
            okText="Áp dụng"
            cancelText="Hủy"
            okButtonProps={{ type: 'primary' }}
          >
            <Text>
              Template này sẽ thay thế template hiện tại đang sử dụng trên Homepage.
            </Text>
            <div style={{ marginTop: 16 }}>
              <Checkbox
                checked={confirmDontShowAgain}
                onChange={(e) => setConfirmDontShowAgain(e.target.checked)}
              >
                Không nhắc lại lần sau
              </Checkbox>
            </div>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal
            title="Xóa workspace"
            open={deleteConfirmVisible}
            onOk={handleDeleteWorkspace}
            onCancel={() => {
              setDeleteConfirmVisible(false);
              setWorkspaceToDelete(null);
            }}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Text>
              Bạn có chắc chắn muốn xóa workspace <strong>"{workspaceToDelete?.name}"</strong>?
            </Text>
            <br />
            <Text type="danger" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
              Hành động này không thể hoàn tác.
            </Text>
          </Modal>
        </Layout>
      )}
    </>
  );
};

export default HomepageLayout;

