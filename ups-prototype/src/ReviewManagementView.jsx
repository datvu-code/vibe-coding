import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Tag, Typography, Select,
    Row, Col, Checkbox, Alert, DatePicker
} from 'antd';
import {
    SearchOutlined, ReloadOutlined, CopyOutlined, StarFilled
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

// Channel metadata helper
const getChannelMeta = (channelKey) => {
    const key = (channelKey || '').toLowerCase();
    const labelMap = {
        shopee: 'Shopee',
        tiktok: 'TikTok Shop',
        lazada: 'Lazada'
    };
    const logoMap = {
        shopee: '🛍️',
        tiktok: '🎵',
        lazada: '🛒'
    };
    return {
        key,
        platformLabel: labelMap[key] || 'Kênh bán',
        logo: logoMap[key] || '🏪'
    };
};

// Mock data
const generateMockReviews = () => {
    return [
        {
            id: 1,
            store: 'UpBeauty Store',
            channel: 'shopee',
            buyer: 'tucutede thuong',
            productImage: 'https://picsum.photos/seed/product1/60/60',
            productName: 'Tinh Chất Hỗ Trợ Giảm Mụn Bioverse B351 Acne Clear ...',
            sku: '8936213940012',
            rating: 5,
            reviewText: 'Giá rẻ, dùng ổn, nên thêm vào skincare routine (hình ảnh, video mang tính chất kiếm xu)',
            reviewTime: '20:05 25/01/2026',
            orderId: '25122488SS9KCG',
            replyBy: 'Tự động',
            replyText: 'UpBeauty cảm ơn bạn đã tin tưởng và sử dụng sản phẩm. Shop sẽ luôn cố gắng cải thiện chất lượng và dịch vụ ... Xem thêm',
            replyTime: '21:01 25/01/2026',
            replyStatus: 'success'
        },
        {
            id: 2,
            store: 'UpBeauty Store',
            channel: 'shopee',
            buyer: 'diem123345',
            productImage: 'https://picsum.photos/seed/product2/60/60',
            productName: 'Mặt Nạ Giấy FOODAHOLIC Chăm Sóc Da Toàn Diện 23g',
            sku: '8936213940013',
            rating: 5,
            reviewText: 'Sản phẩm giống hình, shop gói hàng kỹ, giao hàng rất nhanh',
            reviewTime: '19:24 25/01/2026',
            orderId: '260124U6AKC6M',
            replyBy: 'Tự động',
            replyText: 'UpBeauty cảm ơn bạn đã tin tưởng và sử dụng sản phẩm. Shop sẽ luôn cố gắng cải thiện chất lượng và dịch vụ ... Xem thêm',
            replyTime: '21:01 25/01/2026',
            replyStatus: 'success'
        }
    ];
};

const ReviewManagementView = () => {
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [activeStarTab, setActiveStarTab] = useState('all');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [orderIdSearch, setOrderIdSearch] = useState('');
    const [buyerNameSearch, setBuyerNameSearch] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [selectedStore, setSelectedStore] = useState('all');
    const [dateRange, setDateRange] = useState(null);
    
    const reviews = generateMockReviews();

    const statusTabs = [
        { key: 'all', label: 'Tất cả', count: 3659 },
        { key: 'replied', label: 'Đã phản hồi', count: 3615 },
        { key: 'unreplied', label: 'Chưa phản hồi', count: 44 },
        { key: 'error', label: 'Phản hồi lỗi', count: 0, hasWarning: true }
    ];

    const starTabs = [
        { key: 'all', label: 'Tất cả', count: 3659 },
        { key: '5', label: '5 sao', count: 3486 },
        { key: '4', label: '4 sao', count: 124 },
        { key: '3', label: '3 sao', count: 26 },
        { key: '2', label: '2 sao', count: 6 },
        { key: '1', label: '1 sao', count: 17 }
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRowKeys(reviews.map(r => r.id));
        } else {
            setSelectedRowKeys([]);
        }
    };

    const handleSelectRow = (id, checked) => {
        if (checked) {
            setSelectedRowKeys([...selectedRowKeys, id]);
        } else {
            setSelectedRowKeys(selectedRowKeys.filter(key => key !== id));
        }
    };

    const renderStars = (rating) => {
        return (
            <Space>
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarFilled
                        key={star}
                        style={{
                            fontSize: 14,
                            color: star <= rating ? '#FADB14' : '#D9D9D9'
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

            {/* Status Tabs - Separate Section, no background */}
            <div style={{ 
                display: 'flex', 
                gap: 24, 
                marginBottom: 14,
                alignItems: 'center'
            }}>
                {statusTabs.map(tab => {
                    const isActive = activeStatusTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveStatusTab(tab.key)}
                            style={{
                                border: 'none',
                                borderBottom: isActive ? '2px solid #EF5941' : '2px solid transparent',
                                background: 'transparent',
                                padding: '8px 0',
                                cursor: 'pointer',
                                fontSize: 16,
                                fontWeight: isActive ? 600 : 400,
                                color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                            }}
                        >
                            {tab.label}
                            {tab.hasWarning && <span style={{ color: '#FF4D4F' }}>⚠</span>}
                            {tab.count !== undefined && (
                                <span style={{
                                    marginLeft: 8,
                                    fontSize: 16,
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

            {/* Filter Section - Separate Card */}
            <Card
                styles={{ body: { padding: '14px 16px' } }}
                style={{ marginBottom: 14, borderRadius: 8 }}
            >
                <Space size="middle" wrap>
                    <span style={{ fontSize: 14 }}>Thời gian đánh giá</span>
                    <RangePicker
                        value={dateRange}
                        onChange={setDateRange}
                        format="DD/MM/YYYY"
                        style={{ width: 240 }}
                        placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']}
                    />

                    <span style={{ fontSize: 14, marginLeft: 16 }}>Sàn</span>
                    <Select
                        value={selectedPlatform}
                        onChange={setSelectedPlatform}
                        style={{ width: 120 }}
                    >
                        <Option value="all">Tất cả</Option>
                        <Option value="shopee">Shopee</Option>
                        <Option value="lazada">Lazada</Option>
                    </Select>

                    <span style={{ fontSize: 14, marginLeft: 16 }}>Gian hàng</span>
                    <Select
                        value={selectedStore}
                        onChange={setSelectedStore}
                        style={{ width: 150 }}
                    >
                        <Option value="all">Tất cả</Option>
                        <Option value="upbeauty">UpBeauty Store</Option>
                    </Select>

                    <span style={{ fontSize: 14, marginLeft: 16 }}>Mã đơn hàng</span>
                    <Search
                        placeholder="Nhập mã đơn hàng"
                        allowClear
                        onSearch={setOrderIdSearch}
                        style={{ width: 180 }}
                    />

                    <span style={{ fontSize: 14, marginLeft: 16 }}>Tên người mua</span>
                    <Search
                        placeholder="Nhập tên người mua"
                        allowClear
                        onSearch={setBuyerNameSearch}
                        style={{ width: 180 }}
                    />
                </Space>
            </Card>

            {/* Table Section */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, background: '#fff' }}
            >
                {/* Star Rating Tabs */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size={21} wrap>
                        {starTabs.map((tab) => {
                            const isActive = activeStarTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveStarTab(tab.key)}
                                    style={{
                                        border: 'none',
                                        borderBottom: isActive ? '2px solid #EF5941' : '2px solid transparent',
                                        background: 'transparent',
                                        padding: '8px 0',
                                        cursor: 'pointer',
                                        fontSize: 14,
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {tab.label}
                                    {tab.count !== undefined && (
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

                        {selectedRowKeys.length > 0 && (
                            <>
                                <span style={{ fontSize: 14, marginLeft: 16 }}>
                                    Đã chọn {selectedRowKeys.length}
                                </span>
                                <Button 
                                    icon={<ReloadOutlined />}
                                    style={{ 
                                        background: 'rgba(0,0,0,0.06)',
                                        border: 'none',
                                        fontSize: 14
                                    }}
                                >
                                    Tải lại
                                </Button>
                            </>
                        )}
                    </Space>
                </div>

                {/* Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr 1fr 1fr 120px',
                    gap: 16,
                    padding: '12px 16px',
                    background: '#F5F5F5',
                    borderBottom: '1px solid #F0F0F0',
                    alignItems: 'center'
                }}>
                    <Checkbox
                        onChange={handleSelectAll}
                        checked={selectedRowKeys.length === reviews.length && reviews.length > 0}
                        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < reviews.length}
                    />
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thông tin sản phẩm</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Đánh giá người mua</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Phản hồi đánh giá</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thao tác</Text>
                </div>

                {/* Table Rows */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 0
                }}>
                    {reviews.map((review, index) => {
                        const channelMeta = getChannelMeta(review.channel);
                        return (
                            <div
                                key={review.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '48px 1fr 1fr 1fr 120px',
                                    gap: 16,
                                    padding: '16px',
                                    background: '#fff',
                                    borderBottom: index < reviews.length - 1 ? '1px solid #F0F0F0' : 'none',
                                    alignItems: 'flex-start',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#FAFAFA';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#fff';
                                }}
                            >
                                {/* Checkbox */}
                                <Checkbox
                                    checked={selectedRowKeys.includes(review.id)}
                                    onChange={(e) => handleSelectRow(review.id, e.target.checked)}
                                    style={{ marginTop: 4 }}
                                />

                                {/* Thông tin sản phẩm */}
                                <div>
                                    <Text style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 8 }}>
                                        {review.store}
                                    </Text>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                        <Text style={{ fontSize: 14 }}>Người mua: {review.buyer}</Text>
                                        <Button
                                            type="text"
                                            icon={<CopyOutlined />}
                                            size="small"
                                            style={{ padding: 0, height: 'auto' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <img 
                                            src={review.productImage} 
                                            alt={review.productName}
                                            style={{ 
                                                width: 60, 
                                                height: 60, 
                                                objectFit: 'cover',
                                                borderRadius: 4,
                                                border: '1px solid #F0F0F0'
                                            }}
                                        />
                                        <div>
                                            <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>
                                                {review.productName}
                                            </Text>
                                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                SKU {review.sku}
                                            </Text>
                                        </div>
                                    </div>
                                </div>

                                {/* Đánh giá người mua */}
                                <div>
                                    <div style={{ marginBottom: 8 }}>
                                        {renderStars(review.rating)}
                                    </div>
                                    <Text style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>
                                        {review.reviewText}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                        Lúc: {review.reviewTime}
                                    </Text>
                                </div>

                                {/* Phản hồi đánh giá */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                        <Text style={{ fontSize: 14 }}>Mã đơn hàng: {review.orderId}</Text>
                                        <Button
                                            type="text"
                                            icon={<CopyOutlined />}
                                            size="small"
                                            style={{ padding: 0, height: 'auto' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                        <Text style={{ fontSize: 14 }}>Trả lời bởi: {review.replyBy}</Text>
                                        <span style={{ fontSize: 12 }}>🤖</span>
                                    </div>
                                    <Text style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>
                                        {review.replyText}
                                    </Text>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                            Lúc: {review.replyTime}
                                        </Text>
                                        {review.replyStatus === 'success' && (
                                            <span style={{ color: '#52C41A', fontSize: 14 }}>✓</span>
                                        )}
                                    </div>
                                </div>

                                {/* Thao tác */}
                                <div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
};

export default ReviewManagementView;
