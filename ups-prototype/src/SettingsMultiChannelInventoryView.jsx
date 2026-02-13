import React from 'react';
import { Card, Alert, Table, Switch, Typography } from 'antd';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

const SettingsMultiChannelInventoryView = () => {
  const stores = [
    { key: '1', name: 'web Test tải đơn', platform: 'haravan', products: '1/1', stockFrom: 'Bật', pushRule: 'Gian hàng', warehouse: 'Kho mặc định', autoLink: true, inventoryProcess: true, pendingOrders: true },
    { key: '2', name: 'Shoptest1', platform: 'haravan', products: '1/2', stockFrom: 'Bật', pushRule: 'Gian hàng', warehouse: '3 Kho', autoLink: true, inventoryProcess: true, pendingOrders: true },
    { key: '3', name: 'Puka1', platform: 'haravan', products: '1/2', stockFrom: 'Bật', pushRule: 'Gian hàng', warehouse: 'Kho smart của Ngọc', autoLink: true, inventoryProcess: true, pendingOrders: true }
  ];

  const columns = [
    { title: 'Tên gian hàng', dataIndex: 'name', key: 'name', width: '16%', render: (t, r) => <span><span style={{ marginRight: 6 }}>🔵</span>{t}</span> },
    { title: 'Hàng hóa', dataIndex: 'products', key: 'products', width: '8%', render: (t) => <span>{t} <InfoCircleOutlined style={{ marginLeft: 4, color: '#8C8C8C' }} /></span> },
    {
      title: 'Cài đặt đẩy tồn',
      key: 'push',
      width: '22%',
      render: (_, r) => (
        <div style={{ fontSize: 14 }}>
          <div>Tồn từ kho: {r.stockFrom}</div>
          <div>Quy tắc đẩy tồn: {r.pushRule}</div>
          <EditOutlined style={{ marginLeft: 4, cursor: 'pointer' }} />
        </div>
      )
    },
    {
      title: 'Cài đặt liên kết kho',
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: '18%',
      render: (t) => <span>{t} <EditOutlined style={{ marginLeft: 4, cursor: 'pointer' }} /></span>
    },
    {
      title: 'Cài đặt tính năng',
      key: 'features',
      width: '36%',
      render: (_, r) => (
        <div style={{ fontSize: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span>Tự động liên kết</span><InfoCircleOutlined style={{ color: '#8C8C8C' }} />
            <Switch checked={r.autoLink} style={{ backgroundColor: r.autoLink ? '#EF5941' : undefined }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span>Xử lý tồn kho</span><InfoCircleOutlined style={{ color: '#8C8C8C' }} />
            <Switch checked={r.inventoryProcess} style={{ backgroundColor: r.inventoryProcess ? '#EF5941' : undefined }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Đơn chờ duyệt</span><InfoCircleOutlined style={{ color: '#8C8C8C' }} />
            <Switch checked={r.pendingOrders} style={{ backgroundColor: r.pendingOrders ? '#EF5941' : undefined }} />
          </div>
        </div>
      )
    }
  ];

  return (
    <div>
      <Alert
        message="Khi cần xử lý kiểm kho bạn có thể tắt xử lý tồn để hệ thống không tác động đến thay đổi tồn của kho, kiểm kho xong bạn có thể bật lại bình thường."
        type="info"
        showIcon
        icon={<InfoCircleOutlined />}
        style={{ marginBottom: 14, borderRadius: 8 }}
      />
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
        <Table columns={columns} dataSource={stores} rowKey="key" pagination={false} size="middle" style={{ fontSize: 14 }} className="neutral-header-table" />
      </Card>
    </div>
  );
};

export default SettingsMultiChannelInventoryView;
