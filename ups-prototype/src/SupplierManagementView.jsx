import React, { useState } from 'react';
import { Card, Input, Button, Table, Space, Select, Tabs, Dropdown, Empty } from 'antd';
import { SearchOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;

const SUPPLIER_STATUS = {
  CONNECTED: 'connected',
  NOT_CONNECTED: 'not_connected',
};

const SupplierManagementView = () => {
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(undefined);
  const [connectionTab, setConnectionTab] = useState('all'); // 'all' | 'connected'
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const allSuppliers = [
    { key: '1', name: 'Công ty TNHH Dược phẩm A', status: SUPPLIER_STATUS.CONNECTED },
    { key: '2', name: 'Nhà cung cấp B Beauty', status: SUPPLIER_STATUS.NOT_CONNECTED },
    { key: '3', name: 'Công ty Mỹ phẩm C', status: SUPPLIER_STATUS.CONNECTED },
  ];

  const supplierData =
    connectionTab === 'connected'
      ? allSuppliers.filter((s) => s.status === SUPPLIER_STATUS.CONNECTED)
      : allSuppliers;

  const filteredData = supplierData.filter(
    (s) => !searchText || s.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    {
      title: 'Tên nhà cung cấp',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      render: (t) => <span style={{ fontSize: 14, color: '#111827' }}>{t}</span>,
    },
    {
      title: 'Trạng thái kết nối',
      dataIndex: 'status',
      key: 'status',
      width: '22%',
      render: (status) => (
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: status === SUPPLIER_STATUS.CONNECTED ? '#059669' : '#6B7280',
          }}
        >
          {status === SUPPLIER_STATUS.CONNECTED ? 'Đã kết nối' : 'Chưa kết nối'}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: '38%',
      align: 'right',
      render: (_, record) => (
        <Space size="middle">
          {record.status === SUPPLIER_STATUS.NOT_CONNECTED ? (
            <Button type="link" size="small" style={{ fontSize: 14, color: '#EF5941', padding: 0 }}>
              Kết nối
            </Button>
          ) : null}
          <Dropdown
            menu={{
              items: [
                { key: '1', label: 'Xem chi tiết' },
                { key: '2', label: 'Chỉnh sửa' },
              ],
            }}
            trigger={['click']}
          >
            <Button
              size="small"
              style={{
                fontSize: 14,
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#111827',
                borderRadius: 8,
              }}
            >
              Chọn <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const emptyDescription = 'Chưa có nhà cung cấp nào';
  const locale = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span style={{ fontSize: 14, color: '#9CA3AF' }}>{emptyDescription}</span>}
      />
    ),
  };

  const tabItems = [
    { key: 'all', label: 'Tất cả' },
    { key: 'connected', label: 'Đã kết nối' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#111827' }}>Đối tác</h2>
        <Button type="primary" icon={<PlusOutlined />} style={{ fontSize: 14, borderRadius: 10 }}>
          Thêm nhà cung cấp
        </Button>
      </div>

      <Card
        styles={{ body: { padding: 0 } }}
        style={{
          borderRadius: 16,
          background: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          border: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Search
            placeholder="Tìm kiếm tên nhà cung cấp"
            allowClear
            onSearch={setSearchText}
            style={{ width: 320, fontSize: 14 }}
          />
          <Select
            placeholder="Danh mục"
            allowClear
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 160, fontSize: 14 }}
            suffixIcon={<DownOutlined style={{ fontSize: 12, color: '#6B7280' }} />}
            options={[
              { value: 'cat1', label: 'Danh mục 1' },
              { value: 'cat2', label: 'Danh mục 2' },
            ]}
          />
          <Tabs
            activeKey={connectionTab}
            onChange={setConnectionTab}
            items={tabItems.map((item) => ({
              key: item.key,
              label: item.label,
            }))}
            style={{ marginBottom: 0, marginLeft: 'auto' }}
            className="supplier-connection-tabs"
          />
        </div>

        <Table
          columns={columns}
          dataSource={paginatedData}
          rowKey="key"
          locale={locale}
          pagination={false}
          style={{ fontSize: 14 }}
          className="neutral-header-table"
        />

        <div style={{ padding: '0 20px 16px', borderTop: '1px solid #E5E7EB' }}>
          <PaginationFooter
            total={filteredData.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            label="nhà cung cấp"
          />
        </div>
      </Card>
    </div>
  );
};

export default SupplierManagementView;
