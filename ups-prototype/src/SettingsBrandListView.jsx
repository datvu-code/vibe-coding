import React, { useState } from 'react';
import { Card, Button, Table, Typography, Switch } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;

const SettingsBrandListView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [defaultBrandId, setDefaultBrandId] = useState(322);

  const brands = [
    { id: 646, name: 'Corx', updatedAt: '11:10 26/01/2026', isDefault: false },
    { id: 639, name: 'ABC', updatedAt: '15:53 17/11/2025', isDefault: false },
    { id: 638, name: 'No Brand', updatedAt: '15:53 17/11/2025', isDefault: false },
    { id: 264, name: 'Ngọc', updatedAt: '15:53 17/11/2025', isDefault: false },
    { id: 322, name: 'Nhãn hàng mặc định', updatedAt: '15:53 17/11/2025', isDefault: true }
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80, render: (t) => <Text style={{ fontSize: 14 }}>{t}</Text> },
    { title: 'Tên nhãn hàng', dataIndex: 'name', key: 'name', render: (t, r) => <span><Text style={{ fontSize: 14 }}>{t}</Text> <EditOutlined style={{ marginLeft: 6, fontSize: 12, color: '#8C8C8C' }} /></span> },
    { title: 'Ngày cập nhật', dataIndex: 'updatedAt', key: 'updatedAt', render: (t) => <Text style={{ fontSize: 14 }}>{t}</Text> },
    {
      title: 'Cấu hình',
      key: 'config',
      render: (_, r) => (
        <span style={{ fontSize: 14 }}>
          Nhãn hàng mặc định{' '}
          <Switch
            checked={defaultBrandId === r.id}
            onChange={(checked) => checked && setDefaultBrandId(r.id)}
            style={{ backgroundColor: defaultBrandId === r.id ? '#EF5941' : undefined }}
          />
        </span>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
        <Text strong style={{ fontSize: 16 }}>Danh sách nhãn hàng</Text>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>Thêm nhãn hàng</Button>
      </div>
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
        <Table columns={columns} dataSource={brands} rowKey="id" pagination={false} size="middle" style={{ fontSize: 14 }} className="neutral-header-table" />
        <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
          <PaginationFooter
            total={brands.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            label="nhãn hàng"
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

export default SettingsBrandListView;
