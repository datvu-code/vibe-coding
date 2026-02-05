import React, { useState } from 'react';
import { Card, Input, Button, Table, Space, Switch } from 'antd';
import { SearchOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;

const WarehouseListView = () => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [defaultWh, setDefaultWh] = useState({ 1: false, 2: true });
    const [negativeStock, setNegativeStock] = useState({ 1: false, 2: false });
    const [locationMgmt, setLocationMgmt] = useState({ 1: false, 2: false });
    const [activeStatus, setActiveStatus] = useState({ 1: true, 2: false });

    const mockData = [
        {
            key: '1',
            name: 'Kho Hồ Chí Minh',
            code: 'KHOHCM',
            linkedWarehouse: 'N/A',
            goods: '221',
            voucherPrefixIn: '--',
            voucherPrefixOut: '--',
            address: 'Kho A7-1, Cụm Công Nghiệp Indira Gradhi, Số 02, Xa Lộ Trường Sơn'
        },
        {
            key: '2',
            name: 'Kho Thanh Trì',
            code: 'KHOTHANHTRI',
            linkedWarehouse: 'N/A',
            goods: '219',
            voucherPrefixIn: '--',
            voucherPrefixOut: '--',
            address: 'Đôi 2, Đại Lan'
        }
    ];

    const columns = [
        {
            title: 'Tên kho',
            key: 'name',
            width: '16%',
            render: (_, r) => (
                <div>
                    <div style={{ fontSize: 14, marginBottom: 2 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: '#8C8C8C' }}>Mã kho: {r.code}</div>
                </div>
            )
        },
        { title: 'Kho liên kết', dataIndex: 'linkedWarehouse', key: 'linkedWarehouse', width: '10%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Hàng hoá', dataIndex: 'goods', key: 'goods', width: '8%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Tiền tố của phiếu',
            key: 'voucherPrefix',
            width: '12%',
            render: (_, r) => (
                <div style={{ fontSize: 14, lineHeight: '22px' }}>
                    <div>Phiếu nhập: {r.voucherPrefixIn}</div>
                    <div>Phiếu xuất: {r.voucherPrefixOut}</div>
                </div>
            )
        },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address', width: '22%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Cấu hình',
            key: 'config',
            width: '18%',
            render: (_, r) => (
                <div style={{ fontSize: 14, lineHeight: '32px' }}>
                    <Space align="center">
                        <span>Kho mặc định</span>
                        <InfoCircleOutlined style={{ color: '#8C8C8C', fontSize: 12 }} />
                        <Switch size="small" checked={defaultWh[r.key]} onChange={(v) => setDefaultWh((s) => ({ ...s, [r.key]: v }))} />
                    </Space>
                    <div />
                    <Space align="center">
                        <span>Tồn âm</span>
                        <InfoCircleOutlined style={{ color: '#8C8C8C', fontSize: 12 }} />
                        <Switch size="small" checked={negativeStock[r.key]} onChange={(v) => setNegativeStock((s) => ({ ...s, [r.key]: v }))} />
                    </Space>
                    <div />
                    <Space align="center">
                        <span>Quản lý vị trí</span>
                        <InfoCircleOutlined style={{ color: '#8C8C8C', fontSize: 12 }} />
                        <Switch size="small" checked={locationMgmt[r.key]} onChange={(v) => setLocationMgmt((s) => ({ ...s, [r.key]: v }))} />
                    </Space>
                </div>
            )
        },
        {
            title: 'Trạng thái hoạt động',
            key: 'active',
            width: '8%',
            render: (_, r) => (
                <Switch checked={activeStatus[r.key]} onChange={(v) => setActiveStatus((s) => ({ ...s, [r.key]: v }))} />
            )
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '6%',
            align: 'center',
            render: () => (
                <Button type="primary" size="small" style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>
                    Cập nhật
                </Button>
            )
        }
    ];

    return (
        <div>
            {/* Top Action + Filter - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
                <Space size="middle">
                    <Search placeholder="Nhập tên kho" allowClear onSearch={setSearchText} style={{ width: 280, fontSize: 14 }} prefix={<SearchOutlined />} />
                </Space>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                >
                    Thêm kho
                </Button>
            </div>

            {/* Main Section - Card: Table (FrameScheduleManagement pattern) */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                <Table
                    columns={columns}
                    dataSource={mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockData.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="kho"
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

export default WarehouseListView;
