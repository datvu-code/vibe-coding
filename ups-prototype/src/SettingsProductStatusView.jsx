import React, { useState } from 'react';
import { Card, Alert, Table, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const SettingsProductStatusView = () => {
  const [statuses, setStatuses] = useState([
    { key: '1', name: 'Mới', enabled: true },
    { key: '2', name: 'Hư hỏng 1 phần', enabled: false },
    { key: '3', name: 'Hư hỏng do đối tác', enabled: false },
    { key: '4', name: 'Hư hỏng do 3PL', enabled: false },
    { key: '5', name: 'Hư hỏng do kho', enabled: false },
    { key: '6', name: 'Hết hạn sử dụng', enabled: true }
  ]);

  const toggleStatus = (key) => {
    setStatuses(prev => prev.map(s => s.key === key ? { ...s, enabled: !s.enabled } : s));
  };

  const columns = [
    { title: 'Trạng thái hàng hóa', dataIndex: 'name', key: 'name', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
    {
      title: 'Hiện trạng',
      key: 'enabled',
      render: (_, r) => <Switch checked={r.enabled} onChange={() => toggleStatus(r.key)} style={{ backgroundColor: r.enabled ? '#EF5941' : undefined }} />
    }
  ];

  return (
    <div>
      <Alert
        message="Trạng thái hàng hoá chỉ được tắt khi tất cả sản phẩm phát sinh trạng thái đó có tồn bằng 0"
        type="info"
        showIcon
        icon={<InfoCircleOutlined />}
        style={{ marginBottom: 14, borderRadius: 8 }}
      />
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
        <Table columns={columns} dataSource={statuses} rowKey="key" pagination={false} size="middle" showHeader style={{ fontSize: 14 }} className="neutral-header-table" />
      </Card>
    </div>
  );
};

export default SettingsProductStatusView;
