import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Typography, Select, DatePicker,
    Row, Col, Checkbox, Radio, Tooltip, Badge
} from 'antd';
import {
    SearchOutlined, ReloadOutlined, SortAscendingOutlined, InfoCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const BatchProcessingView = () => {
    const [batchProcessingStatusTab, setBatchProcessingStatusTab] = useState('cho-dong-goi');
    const [selectedWarehouse, setSelectedWarehouse] = useState('hcm-hoc-mon-02');
    const [selectedStore, setSelectedStore] = useState('upbeauty-store');
    const [selectedShippingUnit, setSelectedShippingUnit] = useState('spx-express');
    const [orderStatusTab, setOrderStatusTab] = useState('don-hop-le');
    const [selectedPackages, setSelectedPackages] = useState(0);
    const [packageTypeFilter, setPackageTypeFilter] = useState('single-qty-1');
    const [exportSlipStatus, setExportSlipStatus] = useState(null);
    const [pickingSlipStatus, setPickingSlipStatus] = useState(null);
    const [sortBy, setSortBy] = useState('order-time');

    return (
        <div style={{ display: 'flex', gap: 16 }}>
            {/* Main Content */}
            <div style={{ flex: 1 }}>
                {/* Filter Section */}
                <Card
                    bodyStyle={{ padding: 0 }}
                    style={{ marginBottom: 16, borderRadius: 8 }}
                >
                    {/* Status Tabs - Inside Card Body, at the top */}
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0' }}>
                        <Space size={0} style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {[
                                { key: 'cho-dong-goi', label: 'Chờ đóng gói' },
                                { key: 'dang-dong-goi', label: 'Đang đóng gói' },
                                { key: 'cho-lay-hang', label: 'Chờ lấy hàng' }
                            ].map((tab) => (
                                <div
                                    key={tab.key}
                                    onClick={() => setBatchProcessingStatusTab(tab.key)}
                                    style={{
                                        padding: '12px 16px',
                                        cursor: 'pointer',
                                        borderBottom: batchProcessingStatusTab === tab.key ? '2px solid #FF5629' : '2px solid transparent',
                                        marginBottom: '-1px',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: batchProcessingStatusTab === tab.key ? 500 : 400,
                                            color: batchProcessingStatusTab === tab.key ? '#FF5629' : 'rgba(0,0,0,0.88)'
                                        }}
                                    >
                                        {tab.label}
                                    </Text>
                                </div>
                            ))}
                        </Space>
                    </div>

                    {/* Filter Content */}
                    <div style={{ padding: '16px' }}>
                        {/* Warehouse Filter */}
                        <div style={{ marginBottom: 16 }}>
                            <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Kho hàng</Text>
                            <Space size={8} wrap>
                                {[
                                    { key: 'hcm-hoc-mon-02', label: 'Kho HCM - Hóc Môn - 02', count: 76 },
                                    { key: 'cu-chi', label: 'Kho Củ Chi', count: 0 }
                                ].map((warehouse) => (
                                    <Button
                                        key={warehouse.key}
                                        type="default"
                                        style={{
                                            background: selectedWarehouse === warehouse.key ? '#fff' : '#FAFAFA',
                                            borderColor: selectedWarehouse === warehouse.key ? '#FF5629' : '#D9D9D9',
                                            color: selectedWarehouse === warehouse.key ? '#FF5629' : 'rgba(0,0,0,0.88)',
                                            fontSize: 14
                                        }}
                                        onClick={() => setSelectedWarehouse(warehouse.key)}
                                    >
                                        {warehouse.label} ({warehouse.count})
                                    </Button>
                                ))}
                            </Space>
                        </div>

                        {/* Store Filter */}
                        <div style={{ marginBottom: 16 }}>
                            <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Gian hàng</Text>
                            <Space size={8} wrap>
                                {[
                                    { key: 'upbeauty-store', label: 'UpBeauty Store', count: 11 },
                                    { key: 'upbase-beauty', label: 'UpBase Beauty', count: 4 },
                                    { key: 'upbeautyy', label: 'UpBeautyy', count: 61 }
                                ].map((store) => (
                                    <Button
                                        key={store.key}
                                        type="default"
                                        style={{
                                            background: selectedStore === store.key ? '#fff' : '#FAFAFA',
                                            borderColor: selectedStore === store.key ? '#FF5629' : '#D9D9D9',
                                            color: selectedStore === store.key ? '#FF5629' : 'rgba(0,0,0,0.88)',
                                            fontSize: 14
                                        }}
                                        onClick={() => setSelectedStore(store.key)}
                                    >
                                        {store.label} ({store.count})
                                    </Button>
                                ))}
                            </Space>
                        </div>

                        {/* Shipping Unit Filter */}
                        <div style={{ marginBottom: 16 }}>
                            <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Đơn vị vận chuyển</Text>
                            <Space size={8} wrap>
                                {[
                                    { key: 'spx-express', label: 'SPX Express', count: 11 }
                                ].map((unit) => (
                                    <Button
                                        key={unit.key}
                                        type="default"
                                        style={{
                                            background: selectedShippingUnit === unit.key ? '#fff' : '#FAFAFA',
                                            borderColor: selectedShippingUnit === unit.key ? '#FF5629' : '#D9D9D9',
                                            color: selectedShippingUnit === unit.key ? '#FF5629' : 'rgba(0,0,0,0.88)',
                                            fontSize: 14
                                        }}
                                        onClick={() => setSelectedShippingUnit(unit.key)}
                                    >
                                        {unit.label} ({unit.count})
                                    </Button>
                                ))}
                            </Space>
                        </div>

                        {/* Other Filters */}
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <div>
                                    <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Thời gian tạo đơn hàng</Text>
                                    <RangePicker
                                        style={{ width: '100%' }}
                                        format="HH:mm DD/MM/YYYY"
                                        showTime
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div>
                                    <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Tên sản phẩm</Text>
                                    <Input
                                        placeholder="Nhập tên sản phẩm"
                                        prefix={<SearchOutlined />}
                                        style={{ fontSize: 14 }}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div>
                                    <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Trạng thái in phiếu xuất</Text>
                                    <Select
                                        placeholder="Chọn trạng thái"
                                        style={{ width: '100%' }}
                                        allowClear
                                        value={exportSlipStatus}
                                        onChange={setExportSlipStatus}
                                    >
                                        <Option value="printed">Đã in</Option>
                                        <Option value="not-printed">Chưa in</Option>
                                    </Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div>
                                    <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Trạng thái in phiếu nhặt hàng</Text>
                                    <Select
                                        placeholder="Chọn trạng thái"
                                        style={{ width: '100%' }}
                                        allowClear
                                        value={pickingSlipStatus}
                                        onChange={setPickingSlipStatus}
                                    >
                                        <Option value="printed">Đã in</Option>
                                        <Option value="not-printed">Chưa in</Option>
                                    </Select>
                                </div>
                            </Col>
                        </Row>

                        {/* Package Type Filter */}
                        <div style={{ marginTop: 16 }}>
                            <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Loại kiện hàng</Text>
                            <Radio.Group value={packageTypeFilter} onChange={(e) => setPackageTypeFilter(e.target.value)}>
                                <Space direction="vertical" size={8}>
                                    <Radio value="single-qty-1">Sản phẩm đơn lẻ (Số lượng 1)</Radio>
                                    <Radio value="single-qty-many">Sản phẩm đơn lẻ (Số lượng nhiều)</Radio>
                                    <Radio value="multiple-products">Nhiều sản phẩm</Radio>
                                    <Radio value="has-gift">Có sản phẩm quà tặng</Radio>
                                    <Radio value="has-seller-note">Có ghi chú người bán</Radio>
                                    <Radio value="has-buyer-note">Có ghi chú người mua</Radio>
                                </Space>
                            </Radio.Group>
                        </div>

                        {/* Sort */}
                        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                            <Select
                                value={sortBy}
                                onChange={setSortBy}
                                style={{ width: 250 }}
                                suffixIcon={<SortAscendingOutlined />}
                            >
                                <Option value="order-time">Sắp xếp theo: Thời gian đặt hàng</Option>
                                <Option value="warehouse-time">Sắp xếp theo: Thời gian xuất kho</Option>
                                <Option value="delivery-deadline">Sắp xếp theo: Hạn giao hàng</Option>
                            </Select>
                        </div>
                    </div>
                </Card>

                {/* Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text style={{ fontSize: 14 }}>Đã chọn: {selectedPackages} kiện hàng</Text>
                    <Button icon={<ReloadOutlined />}>Tải lại</Button>
                </div>

                {/* Order Status Tabs */}
                <div style={{ marginBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
                    <Space size={0} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {[
                            { key: 'don-hop-le', label: 'Đơn hợp lệ', count: 11 },
                            { key: 'cho-phan-bo-dvvc', label: 'Chờ phân bổ ĐVVC', count: 0 },
                            { key: 'loi-san-tmd', label: 'Lỗi sàn TMĐT', count: 0 },
                            { key: 'loi-kho', label: 'Lỗi kho', count: 0 }
                        ].map((tab) => (
                            <div
                                key={tab.key}
                                onClick={() => setOrderStatusTab(tab.key)}
                                style={{
                                    padding: '12px 16px',
                                    cursor: 'pointer',
                                    borderBottom: orderStatusTab === tab.key ? '2px solid #FF5629' : '2px solid transparent',
                                    marginBottom: '-1px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: orderStatusTab === tab.key ? 500 : 400,
                                        color: orderStatusTab === tab.key ? '#FF5629' : 'rgba(0,0,0,0.88)'
                                    }}
                                >
                                    {tab.label} ({tab.count})
                                </Text>
                            </div>
                        ))}
                    </Space>
                </div>

                {/* Order List - Placeholder for now */}
                <Card
                    bodyStyle={{ padding: 0 }}
                    style={{ borderRadius: 8 }}
                >
                    <div style={{ padding: 24, textAlign: 'center' }}>
                        <Text type="secondary">Danh sách đơn hàng sẽ được hiển thị ở đây</Text>
                    </div>
                </Card>

                {/* Pagination */}
                <div style={{ 
                    marginTop: 16,
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                }}>
                    <Select
                        defaultValue="25"
                        style={{ width: 160 }}
                    >
                        <Option value="25">25 bản ghi/trang</Option>
                        <Option value="50">50 bản ghi/trang</Option>
                        <Option value="100">100 bản ghi/trang</Option>
                    </Select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            Hiển thị 1 - 11 của 11
                        </Text>
                        <Button type="text" style={{ width: 28, height: 28, padding: 0 }}>1</Button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Batch Actions */}
            <div style={{ width: 300, flexShrink: 0 }}>
                <Card
                    title={<Text strong style={{ fontSize: 14 }}>In phiếu hàng loạt</Text>}
                    bodyStyle={{ padding: '16px' }}
                    style={{ marginBottom: 16, borderRadius: 8 }}
                >
                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                        <Checkbox>In phiếu xuất</Checkbox>
                        <Checkbox>In phiếu nhặt hàng</Checkbox>
                        <div>
                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>Kiện hàng đã chọn: {selectedPackages}</Text>
                        </div>
                        <Button type="primary" block style={{ background: '#FF5629', borderColor: '#FF5629' }}>
                            In phiếu
                        </Button>
                        <div>
                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>Số kiện theo bộ lọc: 11</Text>
                        </div>
                        <Button block style={{ background: '#FFF1F0', borderColor: '#FF5629', color: '#FF5629' }}>
                            In phiếu theo bộ lọc
                        </Button>
                    </Space>
                </Card>

                <Card
                    title={<Text strong style={{ fontSize: 14 }}>Xử lý hàng hàng loạt</Text>}
                    bodyStyle={{ padding: '16px' }}
                    style={{ marginBottom: 16, borderRadius: 8 }}
                >
                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                        <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>
                            Những đơn hàng đã được tạo vận đơn sẽ được chuyển sang phần Đang đóng gói
                        </Text>
                        <div>
                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>Số kiện theo bộ lọc: 11</Text>
                        </div>
                        <Button block style={{ background: '#FFF1F0', borderColor: '#FF5629', color: '#FF5629' }}>
                            Kiểm tra trạng thái theo bộ lọc
                        </Button>
                    </Space>
                </Card>

                <Card
                    title={<Text strong style={{ fontSize: 14 }}>Chuẩn bị hàng hàng loạt</Text>}
                    bodyStyle={{ padding: '16px' }}
                    style={{ borderRadius: 8 }}
                >
                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                        <div>
                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>Kiện hàng đã chọn: {selectedPackages}</Text>
                        </div>
                        <Button type="primary" block style={{ background: '#FF5629', borderColor: '#FF5629' }}>
                            Chuẩn bị hàng
                        </Button>
                        <div>
                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>Số kiện theo bộ lọc: 11</Text>
                        </div>
                        <Button block style={{ background: '#FFF1F0', borderColor: '#FF5629', color: '#FF5629' }}>
                            Chuẩn bị hàng theo bộ lọc
                        </Button>
                    </Space>
                </Card>
            </div>
        </div>
    );
};

export default BatchProcessingView;
