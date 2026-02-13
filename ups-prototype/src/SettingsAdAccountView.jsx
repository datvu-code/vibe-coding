import React from 'react';
import { Card, Button, Table, Empty, Space } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';

const SettingsAdAccountView = () => {
  const columns = [
    { title: 'Tên tài khoản QC', dataIndex: 'name', key: 'name', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Thời hạn ủy quyền', dataIndex: 'authExpiry', key: 'authExpiry', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Thời gian kết nối', dataIndex: 'connectedAt', key: 'connectedAt', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Tài khoản kết nối', dataIndex: 'connectedAccount', key: 'connectedAccount', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Trung tâm doanh nghiệp', dataIndex: 'businessCenter', key: 'businessCenter', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    { title: 'Thao tác', key: 'actions', align: 'center', render: () => <Button size="small" style={{ fontSize: 14 }}>Chọn <DownOutlined /></Button> }
  ];
  const data = [];

  const locale = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Space direction="vertical" align="center" size={4}>
            <span style={{ fontSize: 14 }}>Không có dữ liệu</span>
            <span style={{ fontSize: 14, color: '#8C8C8C' }}>Chưa có tài khoản quảng cáo</span>
          </Space>
        }
      />
    )
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>Thêm tài khoản</Button>
      </div>
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
        <Table columns={columns} dataSource={data} pagination={false} size="middle" style={{ fontSize: 14 }} className="neutral-header-table" locale={locale} />
      </Card>
    </div>
  );
};

export default SettingsAdAccountView;
