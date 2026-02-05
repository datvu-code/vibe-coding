import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, DatePicker, Empty
} from 'antd';
import {
    SearchOutlined, DownOutlined, ExportOutlined, SyncOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const TransactionGatewayView = () => {
    const [activeTab, setActiveTab] = useState('napas');
    const [dateRange, setDateRange] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const gatewayData = [];
    const [selectedStore, setSelectedStore] = useState(undefined);
    const [selectedBank, setSelectedBank] = useState(undefined);
    const [transactionId, setTransactionId] = useState(undefined);
    const [searchOrderCode, setSearchOrderCode] = useState('');
    const [transactionStatus, setTransactionStatus] = useState(undefined);
    const [moneyDiff, setMoneyDiff] = useState(undefined);

    const tabItems = [
        { key: 'napas', label: <span style={{ fontSize: 14 }}>Cổng Napas</span> },
        { key: 'sepay', label: <span style={{ fontSize: 14 }}>Cổng Sepay</span> }
    ];

    const columns = [
        { title: 'Mã thanh toán', dataIndex: 'paymentCode', key: 'paymentCode', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Mã giao dịch tham chiếu', dataIndex: 'refCode', key: 'refCode', width: '16%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tài khoản ngân hàng', dataIndex: 'bankAccount', key: 'bankAccount', width: '16%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tiền cần chuyển', dataIndex: 'amountTransfer', key: 'amountTransfer', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tiền thực nhận', dataIndex: 'amountReceived', key: 'amountReceived', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Mã đơn hàng', dataIndex: 'orderCode', key: 'orderCode', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thao tác', key: 'actions', width: '6%', align: 'center', render: () => <Button type="link" size="small" style={{ fontSize: 14 }}>Chi tiết</Button> }
    ];

    const locale = {
        emptyText: (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <Space direction="vertical" align="center" size={4}>
                        <span style={{ fontSize: 14 }}>Không có dữ liệu</span>
                        <span style={{ fontSize: 14, color: '#8C8C8C' }}>Không tìm thấy giao dịch</span>
                    </Space>
                }
            />
        )
    };

    return (
        <div>
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, background: '#fff' }}
            >
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={tabItems}
                    />
                </div>

                {/* Filter Section */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                        <Space size="middle" wrap>
                            <span style={{ fontSize: 14 }}>Ngày phát sinh giao dịch</span>
                            <RangePicker
                                showTime
                                value={dateRange}
                                onChange={setDateRange}
                                style={{ width: 320, fontSize: 14 }}
                            />
                            <span style={{ fontSize: 14 }}>Gian hàng</span>
                            <Select
                                placeholder="Chọn gian hàng"
                                allowClear
                                value={selectedStore}
                                onChange={setSelectedStore}
                                style={{ width: 160, fontSize: 14 }}
                                suffixIcon={<DownOutlined />}
                            >
                                <Option value="store1">Gian hàng 1</Option>
                                <Option value="store2">Gian hàng 2</Option>
                            </Select>
                            <span style={{ fontSize: 14 }}>Chọn ngân hàng</span>
                            <Select
                                placeholder="Chọn ngân hàng"
                                allowClear
                                value={selectedBank}
                                onChange={setSelectedBank}
                                style={{ width: 160, fontSize: 14 }}
                                suffixIcon={<DownOutlined />}
                            >
                                <Option value="vcb">VCB</Option>
                                <Option value="tcb">TCB</Option>
                            </Select>
                        </Space>
                        <Space size="middle" wrap>
                            <span style={{ fontSize: 14 }}>Mã giao dịch</span>
                            <Select
                                placeholder="Mã giao dịch"
                                allowClear
                                value={transactionId}
                                onChange={setTransactionId}
                                style={{ width: 140, fontSize: 14 }}
                                suffixIcon={<DownOutlined />}
                            />
                            <Search
                                placeholder="Tìm theo mã đơn hàng"
                                allowClear
                                onSearch={setSearchOrderCode}
                                style={{ width: 220, fontSize: 14 }}
                                prefix={<SearchOutlined />}
                            />
                            <span style={{ fontSize: 14 }}>Trạng thái giao dịch</span>
                            <Select
                                placeholder="Trạng thái"
                                allowClear
                                value={transactionStatus}
                                onChange={setTransactionStatus}
                                style={{ width: 140, fontSize: 14 }}
                                suffixIcon={<DownOutlined />}
                            >
                                <Option value="success">Thành công</Option>
                                <Option value="pending">Chờ xử lý</Option>
                                <Option value="failed">Thất bại</Option>
                            </Select>
                            <span style={{ fontSize: 14 }}>Chênh lệch tiền</span>
                            <Select
                                placeholder="Chênh lệch"
                                allowClear
                                value={moneyDiff}
                                onChange={setMoneyDiff}
                                style={{ width: 120, fontSize: 14 }}
                                suffixIcon={<DownOutlined />}
                            >
                                <Option value="yes">Có</Option>
                                <Option value="no">Không</Option>
                            </Select>
                        </Space>
                    </Space>
                </div>

                {/* Summary + Actions */}
                <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #F0F0F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12
                }}>
                    <Space size="large">
                        <span style={{ fontSize: 14 }}>Tổng số tiền cần chuyển: <strong>0 đ</strong></span>
                        <span style={{ fontSize: 14 }}>Tổng số tiền thực nhận: <strong>0 đ</strong></span>
                    </Space>
                    <Space>
                        <Button
                            icon={<ExportOutlined />}
                            style={{ fontSize: 14 }}
                        >
                            Xuất dữ liệu
                        </Button>
                        <Button type="text" icon={<SyncOutlined />} style={{ fontSize: 14 }} />
                    </Space>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={gatewayData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    locale={locale}
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={gatewayData.length}
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

export default TransactionGatewayView;
