import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Tag, Typography, Tooltip, Select,
    Dropdown, DatePicker, Radio, Row, Col, Badge
} from 'antd';
import {
    CopyOutlined, DownOutlined, SearchOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock data for delivery sessions
const generateMockSessions = (type) => {
    const sessions = [
        {
            id: 'SH_7587',
            quantity: 40,
            carrier: 'SPX Express',
            status: type === 'giao' ? 'completed' : 'new',
            createTime: '22/01/2026 16:16',
            deliveryTime: '22/01/2026 16:17',
            receivedQuantity: 40,
            totalQuantity: 40
        },
        {
            id: 'SH_7586',
            quantity: 12,
            carrier: 'LEX VN',
            status: 'completed',
            createTime: '22/01/2026 16:11',
            deliveryTime: '22/01/2026 16:11',
            receivedQuantity: 12,
            totalQuantity: 12
        },
        {
            id: 'SH_7584',
            quantity: 35,
            carrier: 'GHN - Hàng Công Kênh',
            status: 'completed',
            createTime: '22/01/2026 15:33',
            deliveryTime: '22/01/2026 15:37',
            receivedQuantity: 35,
            totalQuantity: 35
        },
        {
            id: 'SH_7585',
            quantity: 0,
            carrier: 'GHN - Hàng Công Kênh',
            status: 'completed',
            createTime: '22/01/2026 15:36',
            deliveryTime: '22/01/2026 15:36',
            receivedQuantity: 0,
            totalQuantity: 0
        },
        {
            id: 'SH_7583',
            quantity: 4,
            carrier: 'Giao Hàng Nhanh',
            status: 'completed',
            createTime: '22/01/2026 15:33',
            deliveryTime: '22/01/2026 15:33',
            receivedQuantity: 4,
            totalQuantity: 4
        },
        {
            id: 'SH_7582',
            quantity: 6,
            carrier: 'J&T VN',
            status: 'completed',
            createTime: '22/01/2026 15:19',
            deliveryTime: '22/01/2026 15:19',
            receivedQuantity: 6,
            totalQuantity: 6
        }
    ];
    return sessions;
};

const DeliverySessionView = () => {
    const [activeTab, setActiveTab] = useState('giao'); // 'giao' or 'nhan'
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [dateRange, setDateRange] = useState([dayjs('25/12/2025', 'DD/MM/YYYY'), dayjs('23/01/2026', 'DD/MM/YYYY')]);
    const [hoveredSessionId, setHoveredSessionId] = useState(null);
    
    const sessions = generateMockSessions(activeTab);

    const statusTabs = [
        { key: 'all', label: 'Tất cả' },
        { key: 'new', label: 'Mới', count: 0 },
        { key: 'completed', label: 'Hoàn thành', count: 209 },
        { key: 'cancelled', label: 'Huỷ', count: 2 }
    ];

    const getStatusTag = (status) => {
        const statusConfig = {
            new: { color: '#1677FF', text: 'Mới' },
            completed: { color: '#52C41A', text: 'Hoàn thành' },
            cancelled: { color: '#FF4D4F', text: 'Đã huỷ' }
        };
        const config = statusConfig[status] || statusConfig.new;
        return (
            <Tag color={config.color} style={{ 
                fontSize: 14, 
                padding: '2px 8px',
                border: 'none'
            }}>
                {config.text}
            </Tag>
        );
    };

    return (
        <div>
            {/* Top Tabs - Phiên giao / Phiên nhận */}
            <Card
                styles={{ body: { padding: 0, background: 'transparent' } }}
                style={{ marginBottom: 14, borderRadius: 8, background: 'transparent', border: 'none' }}
            >
                <div style={{ display: 'flex', gap: 21, padding: '12px 0', flexWrap: 'wrap', alignItems: 'center' }}>
                    {[
                        { value: 'giao', label: 'Phiên giao' },
                        { value: 'nhan', label: 'Phiên nhận' }
                    ].map((option) => {
                        const isActive = activeTab === option.value;
                        return (
                            <button
                                key={option.value}
                                onClick={() => setActiveTab(option.value)}
                                style={{
                                    border: 'none',
                                    borderBottom: isActive ? '1.74px solid #EF5941' : 'none',
                                    background: 'transparent',
                                    padding: '10px 0',
                                    cursor: 'pointer',
                                    fontSize: 16,
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </Card>

            {/* Filter Section Card */}
            <Card
                styles={{ body: { padding: '14px' } }}
                style={{ marginBottom: 14, borderRadius: 8 }}
            >
                <Row gutter={[16, 16]} align="middle">
                    <Col span={5}>
                        <div>
                            <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Thời gian tạo</Text>
                            <RangePicker
                                value={dateRange}
                                onChange={setDateRange}
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                            />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div>
                            <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Kho vật lý</Text>
                            <Select
                                placeholder="Kho vật lý"
                                style={{ width: '100%' }}
                                allowClear
                            >
                                <Option value="kho1">Kho 1</Option>
                                <Option value="kho2">Kho 2</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div>
                            <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Mã phiên giao</Text>
                            <Input
                                placeholder="Mã phiên giao"
                                prefix={<SearchOutlined />}
                                allowClear
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div>
                            <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Vận chuyển</Text>
                            <Select
                                placeholder="Vận chuyển"
                                style={{ width: '100%' }}
                                allowClear
                            >
                                <Option value="spx">SPX Express</Option>
                                <Option value="ghn">GHN</Option>
                                <Option value="jt">J&T VN</Option>
                                <Option value="lex">LEX VN</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Status Tabs and Table Card */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ 
                    marginTop: 14,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    border: '1px solid #F0F0F0'
                }}
            >
                {/* Status Tabs */}
                <div style={{ 
                    display: 'flex', 
                    gap: 21, 
                    padding: '12px 16px', 
                    borderBottom: '1px solid #F0F0F0',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    backgroundColor: '#fff'
                }}>
                    {statusTabs.map(tab => {
                        const isActive = activeStatusTab === tab.key;
                        const hasCount = tab.count !== undefined;
                        
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveStatusTab(tab.key)}
                                style={{
                                    border: 'none',
                                    borderBottom: isActive ? '1.74px solid #EF5941' : 'none',
                                    background: 'transparent',
                                    padding: '10px 0',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab.label}
                                {hasCount && (
                                    <span style={{
                                        marginLeft: 8,
                                        fontSize: 14,
                                        fontWeight: 400,
                                        color: isActive ? '#EF5941' : 'rgba(0,0,0,0.45)'
                                    }}>
                                        ({tab.count})
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Table Container */}
                <div style={{ overflowX: 'auto' }}>
                    {/* Table Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '140px 140px 180px 140px 180px 180px 150px 120px',
                        gap: 16,
                        padding: '12px 16px',
                        background: '#F5F5F5',
                        borderBottom: '1px solid #F0F0F0',
                        alignItems: 'center',
                        minWidth: 'max-content'
                    }}>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Mã phiên</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Số lượng kiện hàng</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Vận chuyển</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Trạng thái</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thời gian tạo</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thời gian bàn giao</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>ĐVVC nhận hàng</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thao tác</Text>
                    </div>

                    {/* Table Rows */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 0
                    }}>
                        {sessions.map((session, index) => (
                            <div
                                key={session.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '140px 140px 180px 140px 180px 180px 150px 120px',
                                    gap: 16,
                                    padding: '16px',
                                    background: '#fff',
                                    borderBottom: index < sessions.length - 1 ? '1px solid #F0F0F0' : 'none',
                                    alignItems: 'center',
                                    minWidth: 'max-content',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#FAFAFA';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#fff';
                                }}
                            >
                                {/* Mã phiên */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span
                                        style={{
                                            fontSize: 14,
                                            color: hoveredSessionId === session.id ? '#1677FF' : '#1677FF',
                                            cursor: 'pointer',
                                            textDecoration: hoveredSessionId === session.id ? 'underline' : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={() => setHoveredSessionId(session.id)}
                                        onMouseLeave={() => setHoveredSessionId(null)}
                                        onClick={() => {
                                            navigator.clipboard.writeText(session.id);
                                        }}
                                    >
                                        {session.id}
                                    </span>
                                    <Tooltip title="Sao chép mã phiên">
                                        <CopyOutlined 
                                            style={{ 
                                                color: hoveredSessionId === session.id ? '#1677FF' : '#BFBFBF', 
                                                cursor: 'pointer', 
                                                fontSize: 14,
                                                transition: 'color 0.2s'
                                            }}
                                            onClick={() => {
                                                navigator.clipboard.writeText(session.id);
                                            }}
                                            onMouseEnter={() => setHoveredSessionId(session.id)}
                                            onMouseLeave={() => setHoveredSessionId(null)}
                                        />
                                    </Tooltip>
                                </div>

                                {/* Số lượng kiện hàng */}
                                <Text style={{ fontSize: 14 }}>{session.quantity}</Text>

                                {/* Vận chuyển */}
                                <Text style={{ fontSize: 14 }}>{session.carrier}</Text>

                                {/* Trạng thái */}
                                <div>
                                    {getStatusTag(session.status)}
                                </div>

                                {/* Thời gian tạo */}
                                <Text style={{ fontSize: 14 }}>{session.createTime}</Text>

                                {/* Thời gian bàn giao */}
                                <Text style={{ fontSize: 14 }}>{session.deliveryTime}</Text>

                                {/* ĐVVC nhận hàng */}
                                <Text style={{ 
                                    fontSize: 14,
                                    color: session.receivedQuantity !== session.totalQuantity ? '#FF4D4F' : 'rgba(0,0,0,0.88)'
                                }}>
                                    {session.receivedQuantity} / {session.totalQuantity}
                                </Text>

                                {/* Thao tác */}
                                <Dropdown
                                    menu={{
                                        items: [
                                            { key: 'view', label: 'Xem chi tiết' },
                                            { key: 'edit', label: 'Chỉnh sửa' },
                                            { key: 'cancel', label: 'Huỷ phiên', danger: true }
                                        ]
                                    }}
                                    trigger={['click']}
                                >
                                    <Button size="small">
                                        Chọn <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                                    </Button>
                                </Dropdown>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DeliverySessionView;
