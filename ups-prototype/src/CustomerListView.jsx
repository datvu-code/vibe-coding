import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Tag, Typography, Select,
    Row, Col, Checkbox, Alert, Tabs
} from 'antd';
import {
    SearchOutlined, FilterOutlined, PlusOutlined, CloudUploadOutlined,
    ExportOutlined, ReloadOutlined, EyeOutlined, EditOutlined
} from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;

// Mock data
const generateMockCustomers = () => {
    return [
        {
            id: 1,
            customerId: 'CUS959989474',
            name: 'H***h G** H**',
            phone: '(+84)090*****23',
            email: '--',
            tags: []
        },
        {
            id: 2,
            customerId: 'CUS0312201733',
            name: 'Y**',
            phone: '(+84)984****99',
            email: '--',
            tags: []
        },
        {
            id: 3,
            customerId: 'CUS123456789',
            name: 'T*** N**',
            phone: '(+84)091*****45',
            email: 'test@example.com',
            tags: []
        }
    ];
};

const CustomerListView = () => {
    const [activeTab, setActiveTab] = useState('customer-info');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedUpsId, setSelectedUpsId] = useState(null);
    const [hasDuplicates, setHasDuplicates] = useState(false);
    
    const customers = generateMockCustomers();

    const tabItems = [
        { key: 'customer-info', label: <span style={{ fontSize: 14 }}>Thông tin khách hàng</span> },
        { key: 'action-history', label: <span style={{ fontSize: 14 }}>Lịch sử thao tác</span> },
        { key: 'settings', label: <span style={{ fontSize: 14 }}>Cài đặt</span> }
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRowKeys(customers.map(c => c.id));
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

    return (
        <div>
            {/* Alert Banner */}
            <Alert
                message="Dữ liệu về đơn hàng, phản hồi khách hàng sẽ được cập nhật và tổng hợp thông tin định kỳ 1h/lần nên số liệu có thể bị lệch so với thực tế!"
                type="info"
                showIcon
                style={{ marginBottom: 14, borderRadius: 8 }}
            />

            {/* Top Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14, gap: 8 }}>
                <Button 
                    icon={<CloudUploadOutlined />}
                    style={{ 
                        background: 'rgba(0,0,0,0.06)', 
                        border: 'none',
                        color: 'rgba(0,0,0,0.88)',
                        fontSize: 14
                    }}
                >
                    Nhập khách hàng
                </Button>
                <Button 
                    icon={<ExportOutlined />}
                    style={{ 
                        background: 'rgba(0,0,0,0.06)', 
                        border: 'none',
                        color: 'rgba(0,0,0,0.88)',
                        fontSize: 14
                    }}
                >
                    Xuất khách hàng
                </Button>
                <Button 
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ 
                        background: '#EF5941', 
                        borderColor: '#EF5941',
                        fontSize: 14
                    }}
                >
                    Thêm khách hàng
                </Button>
            </div>

            {/* Main Section - Tabs, Filter, Table */}
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

                {/* Filter Section */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle" wrap>
                        <span style={{ fontSize: 14 }}>Mã trên UpS</span>
                        <Select
                            placeholder="Chọn"
                            value={selectedUpsId}
                            onChange={setSelectedUpsId}
                            style={{ width: 150, fontSize: 14 }}
                            allowClear
                        >
                            <Option value="ups1">UpS ID 1</Option>
                            <Option value="ups2">UpS ID 2</Option>
                        </Select>

                        <span style={{ fontSize: 14, marginLeft: 16 }}>Tìm kiếm</span>
                        <Search
                            placeholder="Họ tên, SĐT, Email, Mã KH"
                            allowClear
                            onSearch={setSearchText}
                            style={{ width: 280, fontSize: 14 }}
                        />

                        <Checkbox
                            checked={hasDuplicates}
                            onChange={(e) => setHasDuplicates(e.target.checked)}
                            style={{ marginLeft: 16 }}
                        >
                            <span style={{ fontSize: 14 }}>Có khách hàng trùng</span>
                        </Checkbox>

                        <Button 
                            icon={<FilterOutlined />}
                            style={{ fontSize: 14, marginLeft: 16 }}
                        />

                        {selectedRowKeys.length > 0 && (
                            <>
                                <span style={{ fontSize: 14, marginLeft: 16 }}>
                                    Đã chọn {selectedRowKeys.length}
                                </span>
                                <Button 
                                    style={{ 
                                        background: 'rgba(0,0,0,0.06)', 
                                        border: 'none',
                                        fontSize: 14
                                    }}
                                >
                                    Thêm tag
                                </Button>
                            </>
                        )}
                    </Space>
                </div>

                {/* Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 180px 200px 180px 200px 150px 120px',
                    gap: 16,
                    padding: '12px 16px',
                    background: '#F5F5F5',
                    borderBottom: '1px solid #F0F0F0',
                    alignItems: 'center'
                }}>
                    <Checkbox
                        onChange={handleSelectAll}
                        checked={selectedRowKeys.length === customers.length && customers.length > 0}
                        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < customers.length}
                    />
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Mã khách hàng</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Tên khách hàng</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Số điện thoại</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Email</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Tag</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thao tác</Text>
                </div>

                {/* Table Rows */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 0
                }}>
                    {customers.map((customer, index) => (
                        <div
                            key={customer.id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '48px 180px 200px 180px 200px 150px 120px',
                                gap: 16,
                                padding: '16px',
                                background: '#fff',
                                borderBottom: index < customers.length - 1 ? '1px solid #F0F0F0' : 'none',
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
                            {/* Checkbox */}
                            <Checkbox
                                checked={selectedRowKeys.includes(customer.id)}
                                onChange={(e) => handleSelectRow(customer.id, e.target.checked)}
                            />

                            {/* Mã khách hàng */}
                            <Text style={{ fontSize: 14, color: '#1677FF', cursor: 'pointer' }}>
                                {customer.customerId}
                            </Text>

                            {/* Tên khách hàng */}
                            <Text style={{ fontSize: 14 }}>{customer.name}</Text>

                            {/* Số điện thoại */}
                            <Text style={{ fontSize: 14 }}>{customer.phone}</Text>

                            {/* Email */}
                            <Text style={{ fontSize: 14 }}>{customer.email}</Text>

                            {/* Tag */}
                            <Button
                                icon={<PlusOutlined />}
                                style={{
                                    width: 24,
                                    height: 24,
                                    padding: 0,
                                    background: 'rgba(0,0,0,0.06)',
                                    border: 'none',
                                    color: 'rgba(0,0,0,0.45)',
                                    borderRadius: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            />

                            {/* Thao tác */}
                            <Space>
                                <Button
                                    type="text"
                                    icon={<EyeOutlined />}
                                    style={{ padding: 0, color: 'rgba(0,0,0,0.45)' }}
                                />
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    style={{ padding: 0, color: 'rgba(0,0,0,0.45)' }}
                                />
                            </Space>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default CustomerListView;
