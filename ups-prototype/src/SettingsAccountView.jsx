import React, { useState } from 'react';
import { Card, Button, Input, Typography, Row, Col, Tabs, Table, Tag, Dropdown, Select } from 'antd';
import { EditOutlined, InfoCircleOutlined, GiftOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;

const SettingsAccountView = () => {
  const [activeTab, setActiveTab] = useState('sub-accounts');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const subAccounts = [
    { key: '1', name: 'BaoNgoc', userName: 'Test khiếu nại', permissionGroup: 'Check phân quyền xử lý khiếu nại', brand: 'Tất cả', shop: 'Tất cả', warehouse: 'Tất cả', createdAt: '01/02/2026 23:01', updatedAt: '01/02/2026 23:01' },
    { key: '2', name: 'Ngoc1', userName: 'Như Ngọc', permissionGroup: 'Quyền lọc đơn tk phụ tạo + Xuất đơn báo cáo fulfilment', brand: 'Tất cả', shop: 'Tất cả', warehouse: 'Tất cả', createdAt: '01/02/2026 22:00', updatedAt: '01/02/2026 22:00' },
    { key: '3', name: 'nhungoc190123@gmail.com', userName: '', permissionGroup: 'GHN', brand: 'Tất cả', shop: 'Tất cả', warehouse: 'Tất cả', createdAt: '01/02/2026 20:00', updatedAt: '01/02/2026 20:00' }
  ];

  const columns = [
    { title: 'Tên tài khoản', dataIndex: 'name', key: 'name', width: '14%', render: (t) => <Text style={{ fontSize: 14 }}>{t}</Text> },
    { title: 'Tên người dùng', dataIndex: 'userName', key: 'userName', width: '14%', render: (t) => <Text style={{ fontSize: 14 }}>{t || '—'}</Text> },
    { title: 'Nhóm quyền', dataIndex: 'permissionGroup', key: 'permissionGroup', width: '22%', render: (t) => <Text style={{ fontSize: 14 }}>{t}</Text> },
    { title: 'Nhãn hàng', dataIndex: 'brand', key: 'brand', width: '10%', render: (t) => <Text style={{ fontSize: 14 }}>{t}</Text> },
    { title: 'Gian hàng', dataIndex: 'shop', key: 'shop', width: '10%', render: (t) => <Text style={{ fontSize: 14 }}>{t}</Text> },
    { title: 'Kho hàng', dataIndex: 'warehouse', key: 'warehouse', width: '10%', render: (t) => <Text style={{ fontSize: 14 }}>{t}</Text> },
    {
      title: 'Thời gian',
      key: 'time',
      width: '14%',
      render: (_, r) => (
        <div style={{ fontSize: 14 }}>
          <div>Thời gian tạo: {r.createdAt}</div>
          <div>Thời gian cập nhật: {r.updatedAt}</div>
        </div>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: '6%',
      align: 'center',
      render: () => (
        <Dropdown menu={{ items: [{ key: 'edit', label: 'Chỉnh sửa' }, { key: 'delete', label: 'Xóa', danger: true }] }} trigger={['click']}>
          <Button size="small" style={{ fontSize: 14 }}>Chọn <DownOutlined /></Button>
        </Dropdown>
      )
    }
  ];

  return (
    <div>
      {/* Thông tin chung */}
      <Card style={{ marginBottom: 14, borderRadius: 8, background: '#fff' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <Text strong style={{ display: 'block', marginBottom: 16, fontSize: 16 }}>Thông tin chung</Text>
            <Row gutter={[0, 12]}>
              <Col span={24}><Text strong>Email: </Text><Text>daothingoc9@gmail.com</Text></Col>
              <Col span={24}><Text strong>Số điện thoại: </Text><Text>0972565720</Text></Col>
              <Col span={24}><Text strong>Hình thức tổ chức: </Text><Text>Doanh nghiệp</Text></Col>
              <Col span={24}><Text strong>Tên doanh nghiệp/ cá nhân: </Text><Text>Thời trang genZ</Text></Col>
              <Col span={24}>
                <Text strong>Mã tài khoản: </Text>
                <Text>327</Text>
                <InfoCircleOutlined style={{ marginLeft: 6, color: '#8C8C8C', fontSize: 14 }} />
              </Col>
            </Row>
          </div>
          <div style={{ width: 120, height: 120, border: '1px solid #D9D9D9', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA' }}>
            <EditOutlined style={{ fontSize: 28, color: '#8C8C8C', marginBottom: 8 }} />
            <Text type="secondary" style={{ fontSize: 12 }}>Tải ảnh lên</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button type="primary" style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>Chỉnh sửa</Button>
            <Button type="primary" style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>Đổi mật khẩu</Button>
          </div>
        </div>
      </Card>

      {/* Tài khoản phụ */}
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
        <div style={{ padding: '0 16px' }} className="order-processing-tabs">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'sub-accounts', label: <span style={{ fontSize: 14 }}>Tài khoản phụ</span> },
              { key: 'permission-groups', label: <span style={{ fontSize: 14 }}>Nhóm quyền</span> }
            ]}
          />
        </div>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 14 }}>Tên tài khoản</span>
          <Select placeholder="Chọn" style={{ width: 160, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
          <Input placeholder="Nhập tên tài khoản" prefix={<SearchOutlined />} style={{ width: 220, fontSize: 14 }} allowClear />
          <div style={{ flex: 1, textAlign: 'right' }}>
            <Button type="primary" style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>Thêm tài khoản phụ</Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={subAccounts}
          pagination={false}
          size="middle"
          style={{ fontSize: 14 }}
          className="neutral-header-table"
        />
        <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
          <PaginationFooter total={subAccounts.length} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} label="tài khoản" />
        </div>
      </Card>
    </div>
  );
};

export default SettingsAccountView;
