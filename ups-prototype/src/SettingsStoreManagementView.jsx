import React from 'react';
import { Card, Alert, Button, Table, Tag, Dropdown } from 'antd';
import { CloseOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';

const SettingsStoreManagementView = () => {
  const [alertVisible, setAlertVisible] = React.useState(true);
  const stores = [
    { key: '1', name: 'web Test tải đơn', platform: 'haravan', status: 'Đã kết nối', country: 'Việt Nam', expiry: '05/02/2041 14:05 (còn 5472 ngày)', brand: 'Nhãn hàng mặc định' },
    { key: '2', name: 'Shoptest1', platform: 'haravan', status: 'Đã kết nối', country: 'Việt Nam', expiry: '-', brand: 'Nhãn hàng mặc định' },
    { key: '3', name: 'Puka1', platform: 'haravan', status: 'Đã kết nối', country: 'Việt Nam', expiry: '-', brand: 'Nhãn hàng mặc định' },
    { key: '4', name: 'Gian mới offline', platform: 'shop', status: '-', country: 'Việt Nam', expiry: '-', brand: 'Nhãn hàng mặc định' },
    { key: '5', name: 'Zina Shop', platform: 'shop', status: '-', country: 'Việt Nam', expiry: '-', brand: 'Ngọc' },
    { key: '6', name: 'TA beauty', platform: 'facebook', status: 'Đã kết nối', country: 'Việt Nam', expiry: '-', brand: 'Nhãn hàng mặc định' },
    { key: '7', name: 'upbase1', platform: 'upbase', status: 'Đã kết nối', country: 'Việt Nam', expiry: '-', brand: 'Nhãn hàng mặc định' },
    { key: '8', name: 'UpBase Beauty', platform: 'upbase', status: 'Đã kết nối', country: 'Việt Nam', expiry: '-', brand: 'Nhãn hàng mặc định' },
    { key: '9', name: 'Khác-TC', platform: 'shop', status: '-', country: 'Việt Nam', expiry: '-', brand: 'Nhãn hàng mặc định' },
    { key: '10', name: 'Baybyyy Shop', platform: 'tiktok', status: 'Đã kết nối', country: 'Việt Nam', expiry: '-', brand: 'Nhãn hàng mặc định' }
  ];

  const platformIcons = { haravan: '🔵', shop: '🏪', facebook: '📘', upbase: '🟠', tiktok: '🎵' };
  const columns = [
    { title: 'Tên gian hàng', dataIndex: 'name', key: 'name', render: (t, r) => <span style={{ fontSize: 14 }}><span style={{ marginRight: 6 }}>{platformIcons[r.platform] || '🏪'}</span>{t}</span> },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (t) => t === 'Đã kết nối' ? <Tag color="success">{t}</Tag> : <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Quốc gia', dataIndex: 'country', key: 'country', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Thời gian hết hạn ủy quyền', dataIndex: 'expiry', key: 'expiry', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Nhãn hàng', dataIndex: 'brand', key: 'brand', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Thao tác', key: 'actions', align: 'center', render: () => <Dropdown menu={{ items: [{ key: '1', label: 'Xem' }, { key: '2', label: 'Chỉnh sửa' }] }} trigger={['click']}><Button size="small" style={{ fontSize: 14 }}>Chọn <DownOutlined /></Button></Dropdown> }
  ];

  return (
    <div>
      {alertVisible && (
        <Alert
          message="Gian hàng Baybyyy Shop có 1 danh mục thiếu thuộc tính, bấm vào đây để tải lại thuộc tính cho danh mục."
          type="error"
          showIcon
          closable
          onClose={() => setAlertVisible(false)}
          closeIcon={<CloseOutlined />}
          style={{ marginBottom: 14, borderRadius: 8 }}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>THÊM GIAN HÀNG</Button>
      </div>
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
        <Table columns={columns} dataSource={stores} rowKey="key" pagination={false} size="middle" style={{ fontSize: 14 }} className="neutral-header-table" />
      </Card>
    </div>
  );
};

export default SettingsStoreManagementView;
