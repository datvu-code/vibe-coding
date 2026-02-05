import React, { useState } from 'react';
import {
    Card, Button, Space, Typography, Select, Switch, Alert, Tabs
} from 'antd';
import {
    EditOutlined
} from '@ant-design/icons';
import { StarFilled } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;

// Channel metadata helper
const getChannelMeta = (channelKey) => {
    const key = (channelKey || '').toLowerCase();
    const labelMap = {
        shopee: 'Shopee',
        lazada: 'Lazada'
    };
    const logoMap = {
        shopee: '🛍️',
        lazada: '🛒'
    };
    return {
        key,
        platformLabel: labelMap[key] || 'Kênh bán',
        logo: logoMap[key] || '🏪'
    };
};

// Mock data
const generateMockReviewSettings = () => {
    return [
        {
            id: 1,
            store: 'UpBeauty Store',
            channel: 'shopee',
            template: 'Mẫu mặc định',
            reviewProcessing: {
                rating1: 5,
                rating2: 5
            },
            sentToday: 0,
            status: true,
            updateTime: '09:25 05/12/2024'
        }
    ];
};

const AutoReviewView = () => {
    const [activeTab, setActiveTab] = useState('auto-reply');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [settings, setSettings] = useState(generateMockReviewSettings());
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    const tabItems = [
        { key: 'auto-reply', label: <span style={{ fontSize: 14 }}>Thiết lập trả lời đánh giá tự động</span> },
        { key: 'templates', label: <span style={{ fontSize: 14 }}>Mẫu trả lời</span> }
    ];

    const platforms = [
        { key: 'all', label: 'Tất cả' },
        { key: 'lazada', label: 'Lazada' },
        { key: 'shopee', label: 'Shopee' }
    ];

    const handleStatusChange = (id, checked) => {
        setSettings(settings.map(s => 
            s.id === id ? { ...s, status: checked } : s
        ));
    };

    const renderStars = (count) => {
        return (
            <Space>
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarFilled
                        key={star}
                        style={{
                            fontSize: 14,
                            color: star <= count ? '#FADB14' : '#D9D9D9'
                        }}
                    />
                ))}
            </Space>
        );
    };

    return (
        <div>
            {/* Alert Banner */}
            <Alert
                message="Hiện tại hệ thống đang chỉ hỗ trợ tải và trả lời đánh giá từ kênh Shopee, Lazada."
                type="success"
                showIcon
                style={{ marginBottom: 14, borderRadius: 8 }}
            />

            {/* Sàn - above table */}
            <div style={{ marginBottom: 14 }}>
                <Space size="middle">
                    <span style={{ fontSize: 14 }}>Sàn</span>
                    <Select
                        value={selectedPlatform}
                        onChange={setSelectedPlatform}
                        style={{ width: 150, fontSize: 14 }}
                    >
                        {platforms.map((platform) => {
                            const meta = platform.key !== 'all' ? getChannelMeta(platform.key) : null;
                            return (
                                <Option key={platform.key} value={platform.key}>
                                    {meta && <span style={{ marginRight: 8 }}>{meta.logo}</span>}
                                    {platform.label}
                                </Option>
                            );
                        })}
                    </Select>
                </Space>
            </div>

            {/* Main Section - Tabs, Table */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, background: '#fff' }}
            >
                {/* Tabs */}
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={tabItems}
                    />
                </div>

                {/* Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '200px 200px 200px 150px 120px 180px',
                    gap: 16,
                    padding: '12px 16px',
                    background: '#F5F5F5',
                    borderBottom: '1px solid #F0F0F0',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Gian hàng</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Mẫu trả lời</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Xử lý đánh giá</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Đã gửi hôm nay</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Trạng thái</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thời gian cập nhật</Text>
                </div>

                {/* Table Rows */}
                {(() => {
                    const pageSettings = settings.slice((currentPage - 1) * pageSize, currentPage * pageSize);
                    return (
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 0
                }}>
                    {pageSettings.map((setting, index) => {
                        const channelMeta = getChannelMeta(setting.channel);
                        return (
                            <div
                                key={setting.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '200px 200px 200px 150px 120px 180px',
                                    gap: 16,
                                    padding: '16px',
                                    background: '#fff',
                                    borderBottom: index < pageSettings.length - 1 ? '1px solid #F0F0F0' : 'none',
                                    alignItems: 'center',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#FAFAFA';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#fff';
                                }}
                            >
                                {/* Gian hàng */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 18 }}>{channelMeta.logo}</span>
                                    <Text style={{ fontSize: 14 }}>{setting.store}</Text>
                                </div>

                                {/* Mẫu trả lời */}
                                <Text style={{ fontSize: 14 }}>{setting.template}</Text>

                                {/* Xử lý đánh giá */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Button
                                        type="text"
                                        icon={<EditOutlined />}
                                        style={{ padding: 0, color: 'rgba(0,0,0,0.45)' }}
                                    />
                                    <Space direction="vertical" size={4}>
                                        {renderStars(setting.reviewProcessing.rating1)}
                                        {renderStars(setting.reviewProcessing.rating2)}
                                    </Space>
                                </div>

                                {/* Đã gửi hôm nay */}
                                <Text style={{ fontSize: 14 }}>{setting.sentToday}</Text>

                                {/* Trạng thái */}
                                <Switch
                                    checked={setting.status}
                                    onChange={(checked) => handleStatusChange(setting.id, checked)}
                                />

                                {/* Thời gian cập nhật */}
                                <Text style={{ fontSize: 14 }}>{setting.updateTime}</Text>
                            </div>
                        );
                    })}
                </div>
                    );
                })()}

                {/* Pagination Footer */}
                <div style={{ padding: '0 16px 14px' }}>
                    <PaginationFooter
                        total={settings.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="bản ghi"
                        pageSizeOptions={[
                            { value: 25, label: '25 bản ghi/trang' },
                            { value: 50, label: '50 bản ghi/trang' },
                            { value: 100, label: '100 bản ghi/trang' }
                        ]}
                    />
                </div>
            </Card>
        </div>
    );
};

export default AutoReviewView;
