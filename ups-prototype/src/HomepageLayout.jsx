import React, { useState, useEffect } from 'react';
import {
  Layout, Menu, Card, Statistic, Progress, Tabs, Timeline, Tag, 
  Drawer, Modal, Popover, Tooltip, Button, List, Collapse, DatePicker, 
  Badge, Avatar, Dropdown, Row, Col, Empty, Input, Form, Select, Space,
  Radio, message, Switch, Divider, Alert, Checkbox, Typography
} from 'antd';
import {
  HomeOutlined, BarChartOutlined, ShoppingOutlined, InboxOutlined, 
  CarOutlined, BellOutlined, SettingOutlined, UserOutlined, MenuFoldOutlined, 
  MenuUnfoldOutlined, PlusOutlined, MinusOutlined, EditOutlined, DeleteOutlined, 
  CommentOutlined, BulbOutlined, LineChartOutlined, ShareAltOutlined,
  DownloadOutlined, ArrowUpOutlined, ArrowDownOutlined, CloseOutlined,
  DragOutlined, SaveOutlined, AppstoreAddOutlined, EyeOutlined,
  RiseOutlined, FallOutlined, WarningOutlined, CheckCircleOutlined,
  SyncOutlined, StarOutlined, SearchOutlined, CalendarOutlined,
  TagsOutlined, InfoCircleOutlined, ThunderboltOutlined, ClockCircleOutlined,
  ExclamationCircleOutlined, FireOutlined, BookOutlined,
  RightOutlined, ShopOutlined, ExportOutlined,
  ArrowsAltOutlined
} from '@ant-design/icons';
import { LineChart, Line as RechartLine, BarChart, Bar, PieChart, Pie as RechartPie, AreaChart, Area as RechartArea, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import dayjs from 'dayjs';
import logoSvg from './assets/logo-dark.svg';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  { id: 'gmv-channel', name: 'GMV theo kênh', domain: 'Sales', breakdown: [
    { label: 'Shopee', value: '₫1.2B' },
    { label: 'TikTok', value: '₫800M' },
    { label: 'Website', value: '₫400M' }
  ]},
  
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

// ========== COMPONENTS ==========

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
        <div style={{ fontSize: 13, color: '#6D7175', marginBottom: 12, fontWeight: 500 }}>{title}</div>
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
          color: '#6D7175', 
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
          <div style={{ 
            fontSize: 12, 
            color: '#6D7175',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            So với kỳ trước
            <Tooltip title="So với cùng kỳ tháng trước">
              <InfoCircleOutlined 
                style={{ 
                  fontSize: 11, 
                  color: '#8c8c8c'
                }} 
              />
            </Tooltip>
          </div>
          
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
    <path d="M5.58115 0.0946875L6.08303 1.48844C6.64053 3.03531 7.85865 4.25344 9.40553 4.81094L10.7993 5.31281C10.9249 5.35844 10.9249 5.53656 10.7993 5.58156L9.40553 6.08344C7.85865 6.64094 6.64053 7.85906 6.08303 9.40594L5.58115 10.7997C5.53553 10.9253 5.3574 10.9253 5.3124 10.7997L4.81053 9.40594C4.25303 7.85906 3.0349 6.64094 1.48803 6.08344L0.0942798 5.58156C-0.0313452 5.53594 -0.0313452 5.35781 0.0942798 5.31281L1.48803 4.81094C3.0349 4.25344 4.25303 3.03531 4.81053 1.48844L5.3124 0.0946875C5.3574 -0.0315625 5.53553 -0.0315625 5.58115 0.0946875Z" fill="white"/>
    <path d="M11.6368 6.58637L11.8912 7.29199C12.1737 8.07512 12.7906 8.69199 13.5737 8.97449L14.2793 9.22887C14.3431 9.25199 14.3431 9.34199 14.2793 9.36512L13.5737 9.61949C12.7906 9.90199 12.1737 10.5189 11.8912 11.302L11.6368 12.0076C11.6137 12.0714 11.5237 12.0714 11.5006 12.0076L11.2462 11.302C10.9637 10.5189 10.3468 9.90199 9.56368 9.61949L8.85805 9.36512C8.7943 9.34199 8.7943 9.25199 8.85805 9.22887L9.56368 8.97449C10.3468 8.69199 10.9637 8.07512 11.2462 7.29199L11.5006 6.58637C11.5237 6.52199 11.6143 6.52199 11.6368 6.58637Z" fill="white"/>
    <path d="M3.28585 10.4205L3.48093 10.9616C3.69757 11.5621 4.17064 12.0352 4.7712 12.2519L5.31233 12.4469C5.36122 12.4647 5.36122 12.5337 5.31233 12.5514L4.7712 12.7465C4.17064 12.9631 3.69757 13.4362 3.48093 14.0368L3.28585 14.5779C3.26812 14.6268 3.1991 14.6268 3.18137 14.5779L2.98629 14.0368C2.76965 13.4362 2.29658 12.9631 1.69602 12.7465L1.15489 12.5514C1.106 12.5337 1.106 12.4647 1.15489 12.4469L1.69602 12.2519C2.29658 12.0352 2.76965 11.5621 2.98629 10.9616L3.18137 10.4205C3.1991 10.3716 3.2686 10.3716 3.28585 10.4205Z" fill="white"/>
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
    border: isDragging ? '1px solid #2684FF' : '1px dashed #D0D5DD',
    boxShadow: isDragging || isHovered ? '0 0 0 2px rgba(38,132,255,0.25)' : '0 4px 8px rgba(15,23,42,0.06)',
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
const HomepageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'day'), dayjs()]);
  
  // Get personalized greeting
  const userName = 'Dat'; // This could come from auth context
  const greeting = getGreeting();
  const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
  const [annotationDrawerVisible, setAnnotationDrawerVisible] = useState(false);
  const [insightsDrawerVisible, setInsightsDrawerVisible] = useState(false);
  const [expandedAlerts, setExpandedAlerts] = useState([]);
  const [annotations, setAnnotations] = useState([
    { id: 1, date: '2025-11-20', title: 'Flash Sale 11.11', description: 'GMV tăng đột biến do chạy flash sale', tags: ['marketing', 'sale'] },
    { id: 2, date: '2025-11-15', title: 'Thay đổi chiến lược ads', description: 'Chuyển từ CPM sang CPC', tags: ['ads'] },
    { id: 3, date: '2025-11-10', title: 'Ra mắt sản phẩm mới', description: 'SKU-NEW-001 đến SKU-NEW-010', tags: ['product'] }
  ]);
  const [newAnnotation, setNewAnnotation] = useState({ date: '', title: '', description: '', tags: '' });
  
  // Template System States
  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem('ups-metric-templates');
    return saved ? JSON.parse(saved) : defaultTemplates;
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    return localStorage.getItem('ups-selected-template') || 'growth-default';
  });
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [tempMetricOrder, setTempMetricOrder] = useState([]);
  
  // Modal States
  const [createTemplateModalVisible, setCreateTemplateModalVisible] = useState(false);
  const [editTemplateModalVisible, setEditTemplateModalVisible] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewBlocks, setPreviewBlocks] = useState([]);
  const [hoveredPreviewBlock, setHoveredPreviewBlock] = useState(null);
  const [hoveredMetricId, setHoveredMetricId] = useState(null);
  
  // Get current template
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];
  
  // Get metrics for current template
  const currentMetrics = selectedTemplate.metrics
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
  useEffect(() => {
    localStorage.setItem('ups-metric-templates', JSON.stringify(templates));
  }, [templates]);
  
  useEffect(() => {
    localStorage.setItem('ups-selected-template', selectedTemplateId);
  }, [selectedTemplateId]);
  
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
  
  // ========== TEMPLATE CRUD FUNCTIONS ==========
  
  const handleCreateTemplate = () => {
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
    setSelectedTemplateId(newTemplate.id);
    setCreateTemplateModalVisible(false);
    setCustomizeModalVisible(true);
    setNewTemplateName('');
    setSelectedMetrics([]);
    setPreviewBlocks([]);
    setHoveredPreviewBlock(null);
    setSearchQuery('');
    message.success(`Template "${newTemplate.name}" đã được tạo!`);
  };
  
  const handleEditTemplate = () => {
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
    setCustomizeModalVisible(true);
    setNewTemplateName('');
    setSelectedMetrics([]);
    setSearchQuery('');
    message.success('Template đã được cập nhật!');
  };
  
  const handleDeleteTemplate = () => {
    if (selectedTemplate.isDefault) {
      message.error('Không thể xóa template mặc định');
      return;
    }
    
    const updatedTemplates = templates.filter(t => t.id !== selectedTemplateId);
    setTemplates(updatedTemplates);
    setSelectedTemplateId(updatedTemplates[0].id);
    message.success(`Template "${selectedTemplate.name}" đã được xóa`);
  };
  
  const handleOpenCreateModal = () => {
    setNewTemplateName('');
    setSelectedMetrics([]);
    setSearchQuery('');
    setPreviewBlocks([]);
    setHoveredPreviewBlock(null);
    setHoveredMetricId(null);
    setCustomizeModalVisible(false);
    setCreateTemplateModalVisible(true);
  };
  
  const handleOpenEditModal = () => {
    setNewTemplateName(selectedTemplate.name);
    setSelectedMetrics([...selectedTemplate.metrics]);
    setSearchQuery('');
    setCustomizeModalVisible(false);
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
    setCustomizeModalVisible(true);
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
    setCustomizeModalVisible(false);
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
          <img src={logoSvg} alt="UpS Logo" style={{ height: 28 }} />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />
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
              <Title 
                level={2} 
                style={{ 
                  marginBottom: 8, 
                  color: '#2b2b2b', 
                  fontWeight: 400,
                  fontFamily: '"Italianno", cursive',
                  fontSize: 48,
                  letterSpacing: '1px'
                }}
              >
                {greeting}, {userName} 👋
              </Title>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              </div>
            </div>
            
            <Row gutter={24}>
              {/* Left Main Column */}
              <Col xs={24} lg={17}>
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
                  {/* Báo cáo kết quả - Customizable với Template System */}
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
                      ) : (
                        <Tooltip title="Tùy chỉnh">
                          <Button 
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => setCustomizeModalVisible(true)}
                            style={{ color: '#6D7175' }}
                          />
                        </Tooltip>
                      )
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
                  
                  {/* Báo cáo tiến độ - Customizable */}
                  <Card 
                    title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Báo cáo tiến độ</Text>}
                    extra={
                      <Tooltip title="Tùy chỉnh">
                        <Button 
                          type="text"
                          icon={<EditOutlined />}
                          style={{ color: '#6D7175' }}
                        />
                      </Tooltip>
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
                              strokeColor="#2684FF"
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
                  
                </Space>
              </Col>
              
              {/* Right Sidebar */}
              <Col xs={24} lg={7}>
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  {/* Alert & Risks - Tabbed */}
                  <Card 
                    title={<Text strong style={{ fontSize: 14, color: '#2b2b2b' }}>Alert & Risks</Text>}
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
                                const isExpanded = expandedAlerts.includes(alert.id);
                                const guides = alertGuides[alert.id] || [];
                                return (
                                  <div key={alert.id}>
                                    <div
                                      style={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px 12px',
                                        borderRadius: 6,
                                        background: '#FEF3F2',
                                        border: 'none',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                        gap: 8
                                      }}
                                      onClick={() => {
                                        if (isExpanded) {
                                          setExpandedAlerts(expandedAlerts.filter(id => id !== alert.id));
                                        } else {
                                          setExpandedAlerts([...expandedAlerts, alert.id]);
                                        }
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#FEE4E2';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#FEF3F2';
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
                                            {alert.count}
                                          </span>
                                          {alert.unit && (
                                            <span style={{ 
                                              fontSize: 13, 
                                              fontWeight: 600, 
                                              color: '#6D7175',
                                              lineHeight: 1
                                            }}>
                                              {alert.unit}
                                            </span>
                                          )}
                                          <Text style={{ 
                                            fontSize: 13, 
                                            fontWeight: 500,
                                            color: '#2b2b2b'
                                          }}>
                                            {alert.title}
                                          </Text>
                                        </div>
                                      </div>
                                      {guides.length > 0 && (
                                        isExpanded ? (
                                          <MinusOutlined 
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
                                          <PlusOutlined 
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
                                                    e.currentTarget.style.color = '#1890ff';
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
                                const isExpanded = expandedAlerts.includes(alert.id);
                                const guides = alertGuides[alert.id] || [];
                                return (
                                  <div key={alert.id}>
                                    <div
                                      style={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px 12px',
                                        borderRadius: 6,
                                        background: '#FFF8F1',
                                        border: 'none',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                        gap: 8
                                      }}
                                      onClick={() => {
                                        if (isExpanded) {
                                          setExpandedAlerts(expandedAlerts.filter(id => id !== alert.id));
                                        } else {
                                          setExpandedAlerts([...expandedAlerts, alert.id]);
                                        }
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#FFE8D7';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#FFF8F1';
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
                                            {alert.count}
                                          </span>
                                          {alert.unit && (
                                            <span style={{ 
                                              fontSize: 13, 
                                              fontWeight: 600, 
                                              color: '#6D7175',
                                              lineHeight: 1
                                            }}>
                                              {alert.unit}
                                            </span>
                                          )}
                                          <Text style={{ 
                                            fontSize: 13, 
                                            fontWeight: 500,
                                            color: '#2b2b2b'
                                          }}>
                                            {alert.title}
                                          </Text>
                                        </div>
                                      </div>
                                      {guides.length > 0 && (
                                        isExpanded ? (
                                          <MinusOutlined 
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
                                          <PlusOutlined 
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
                                                    e.currentTarget.style.color = '#1890ff';
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
                  
                  {/* Có thể bạn quan tâm - Case Study & Blog Only */}
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
                      dataSource={contentItems.insights}
                      renderItem={(item) => {
                        const getIcon = (iconType) => {
                          switch(iconType) {
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
                                e.currentTarget.style.color = '#1890ff';
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
                </Space>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
      
      {/* Parent Modal - Chọn template */}
      <Modal
        title="Chọn template"
        open={customizeModalVisible}
        onCancel={() => setCustomizeModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setCustomizeModalVisible(false)}>
            Đóng
          </Button>,
          <Button key="save" type="primary" onClick={() => {
            message.success('Đã áp dụng template!');
            setCustomizeModalVisible(false);
          }}>
            Lưu thay đổi
          </Button>
        ]}
        width={800}
      >
        {/* Default Templates Section */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 16,
            gap: 12,
            flexWrap: 'wrap'
          }}>
            <Text strong style={{ fontSize: 14, color: '#2b2b2b', display: 'block' }}>
              Templates có sẵn
            </Text>
            <Button 
              type="text" 
              icon={<PlusOutlined />} 
              onClick={handleOpenCreateModal}
              style={{ color: '#1677FF', fontWeight: 600 }}
            >
              Tạo template
            </Button>
          </div>
          <Radio.Group 
            value={selectedTemplateId} 
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }} size={8}>
              {templates.filter(t => t.isDefault).map(template => (
                <div key={template.id}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: selectedTemplateId === template.id ? '#F0F5FF' : '#FAFBFB',
                    border: selectedTemplateId === template.id ? '1px solid #2684FF' : '1px solid #E1E3E5',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setSelectedTemplateId(template.id)}
                  >
                    <Radio value={template.id} style={{ marginRight: 12 }} />
                    <div style={{ flex: 1 }}>
                      <Space>
                        <Text strong style={{ fontSize: 14 }}>{template.name}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {template.metrics.length} metrics
                        </Text>
                      </Space>
                    </div>
                    <Tooltip title="Tạo mới từ template">
                      <Button
                        type="text"
                        icon={<AppstoreAddOutlined />}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloneTemplate(template);
                        }}
                        style={{ color: '#6D7175' }}
                      />
                    </Tooltip>
                  </div>
                  {selectedTemplateId === template.id && (
                    <div style={{ 
                      padding: '12px 16px 12px 44px',
                      background: '#F9FAFB',
                      borderLeft: '2px solid #2684FF',
                      marginTop: 4,
                      borderRadius: '0 0 8px 8px'
                    }}>
                      <Row gutter={[8, 8]}>
                        {template.metrics.map(metricId => {
                          const metric = allMetricsPool.find(m => m.id === metricId);
                          return metric ? (
                            <Col span={12} key={metric.id}>
                              <Tag color="blue" style={{ fontSize: 11, marginBottom: 4 }}>
                                {metric.domain}
                              </Tag>
                              <Text style={{ fontSize: 12, display: 'block' }}>{metric.name}</Text>
                            </Col>
                          ) : null;
                        })}
                      </Row>
                    </div>
                  )}
                </div>
              ))}
            </Space>
          </Radio.Group>
        </div>

        {/* Custom Templates Section */}
        {templates.filter(t => !t.isDefault).length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text strong style={{ fontSize: 14, color: '#2b2b2b' }}>
                Templates của tôi
              </Text>
            </div>
            <Radio.Group 
              value={selectedTemplateId} 
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size={8}>
                {templates.filter(t => !t.isDefault).map(template => (
                  <div key={template.id}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: selectedTemplateId === template.id ? '#F0F5FF' : '#FAFBFB',
                      border: selectedTemplateId === template.id ? '1px solid #2684FF' : '1px solid #E1E3E5',
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => setSelectedTemplateId(template.id)}
                    >
                      <Radio value={template.id} style={{ marginRight: 12 }} />
                      <div style={{ flex: 1 }}>
                        <Space>
                          <Text strong style={{ fontSize: 14 }}>{template.name}</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {template.metrics.length} metrics
                          </Text>
                        </Space>
                      </div>
                      <Space>
                        <Tooltip title="Tạo mới từ template">
                          <Button
                            type="text"
                            icon={<AppstoreAddOutlined />}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloneTemplate(template);
                            }}
                            style={{ color: '#6D7175' }}
                          />
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              Modal.confirm({
                                title: 'Xóa template này?',
                                content: 'Hành động không thể hoàn tác.',
                                okText: 'Xóa',
                                cancelText: 'Hủy',
                                okButtonProps: { danger: true },
                                onOk: handleDeleteTemplate
                              });
                            }}
                            style={{ color: '#6D7175' }}
                          />
                        </Tooltip>
                      </Space>
                    </div>
                    {selectedTemplateId === template.id && (
                      <div style={{ 
                        padding: '12px 16px 12px 44px',
                        background: '#F9FAFB',
                        borderLeft: '2px solid #2684FF',
                        marginTop: 4,
                        borderRadius: '0 0 8px 8px'
                      }}>
                        <Row gutter={[8, 8]}>
                          {template.metrics.map(metricId => {
                            const metric = allMetricsPool.find(m => m.id === metricId);
                            return metric ? (
                              <Col span={12} key={metric.id}>
                                <Tag color="blue" style={{ fontSize: 11, marginBottom: 4 }}>
                                  {metric.domain}
                                </Tag>
                                <Text style={{ fontSize: 12, display: 'block' }}>{metric.name}</Text>
                              </Col>
                            ) : null;
                          })}
                        </Row>
                      </div>
                    )}
                  </div>
                ))}
              </Space>
            </Radio.Group>
          </div>
        )}
      </Modal>

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
            key="save" 
            type="primary" 
            onClick={handleCreateTemplate}
            disabled={!newTemplateName.trim() || selectedMetrics.length === 0}
          >
            Lưu template mới ({selectedMetrics.length} metrics)
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
                    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                    gridAutoRows: '56px',
                    gap: 12,
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                >
                  {Array.from({ length: 36 }).map((_, idx) => (
                    <div 
                      key={`slot-${idx}`} 
                      style={{ 
                        border: '1px dashed #CBD5F5', 
                        borderRadius: 24, 
                        background: 'rgba(241, 245, 249, 0.6)' 
                      }} 
                    />
                  ))}
                </div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {previewBlocks.length > 0 ? (
                    <DndContext
                      collisionDetection={closestCenter}
                      onDragEnd={handlePreviewDragEnd}
                    >
                      <SortableContext 
                        items={previewBlocks.map(block => block.id)} 
                        strategy={rectSortingStrategy}
                      >
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                          gap: 12 
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
        title={`Chỉnh sửa: ${selectedTemplate.name}`}
        open={editTemplateModalVisible}
        onCancel={() => handleCloseChildModal(false)}
        footer={[
          <Button key="cancel" onClick={() => handleCloseChildModal(false)}>
            Hủy
          </Button>,
          <Button 
            key="save" 
            type="primary" 
            onClick={handleEditTemplate}
            disabled={!newTemplateName.trim() || selectedMetrics.length === 0}
          >
            Lưu thay đổi ({selectedMetrics.length} metrics)
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

