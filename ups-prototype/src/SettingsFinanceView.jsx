import React, { useState } from 'react';
import { Card, Tabs, Form, Switch, Select, Button, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

const SettingsFinanceView = () => {
  const [activeTab, setActiveTab] = useState('sales-return');
  const [salesOrderEnabled, setSalesOrderEnabled] = useState(true);
  const [returnOrderEnabled, setReturnOrderEnabled] = useState(true);
  const [giftValueZero, setGiftValueZero] = useState(false);
  const [suffixKm, setSuffixKm] = useState(false);
  const [suffixPromo, setSuffixPromo] = useState(false);

  const tabItems = [
    { key: 'sales-return', label: 'Cài đặt tạo đơn bán hàng/trả hàng' },
    { key: 'other', label: 'Cài đặt tài chính khác' },
    { key: 'invoice', label: 'Cài đặt xuất hóa đơn' },
    { key: 'report', label: 'Cài đặt báo cáo kinh doanh' },
    { key: 'template', label: 'Cấu hình xuất file mẫu' },
    { key: 'export', label: 'Cài đặt xuất dữ liệu lên Hệ thống quản lý' }
  ];

  return (
    <div>
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
        <div style={{ padding: '0 16px' }} className="order-processing-tabs">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems.map((t) => ({ ...t, label: <span style={{ fontSize: 14 }}>{t.label}</span> }))}
          />
        </div>
        <div style={{ padding: 24 }}>
          <Form layout="horizontal" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={{ fontSize: 14 }}>
            <Form.Item label={<span>Bật tạo đơn bán hàng <InfoCircleOutlined style={{ color: '#8C8C8C', marginLeft: 4 }} /></span>}>
              <Switch checked={salesOrderEnabled} onChange={setSalesOrderEnabled} style={{ backgroundColor: salesOrderEnabled ? '#EF5941' : undefined }} />
            </Form.Item>
            <Form.Item label={<span>Trạng thái tạo đơn bán hàng <InfoCircleOutlined style={{ color: '#8C8C8C', marginLeft: 4 }} /></span>}>
              <Select mode="tags" style={{ width: '100%' }} value={['Chờ lấy hàng']} placeholder="Chọn trạng thái" />
            </Form.Item>
            <Form.Item label={<span>Tạo số chứng từ <InfoCircleOutlined style={{ color: '#8C8C8C', marginLeft: 4 }} /></span>}>
              <Select style={{ width: '100%' }} value="auto"><Option value="auto">Tự tạo</Option></Select>
            </Form.Item>
            <Form.Item label={<span>Bật tạo đơn trả hàng <InfoCircleOutlined style={{ color: '#8C8C8C', marginLeft: 4 }} /></span>}>
              <Switch checked={returnOrderEnabled} onChange={setReturnOrderEnabled} style={{ backgroundColor: returnOrderEnabled ? '#EF5941' : undefined }} />
            </Form.Item>
            <Form.Item label={<span>Tạo số chứng từ <InfoCircleOutlined style={{ color: '#8C8C8C', marginLeft: 4 }} /></span>}>
              <Select style={{ width: '100%' }} value="auto"><Option value="auto">Tự tạo</Option></Select>
            </Form.Item>
            <Form.Item label={<span>Hàng tặng quy hết giá trị về 0 <InfoCircleOutlined style={{ color: '#8C8C8C', marginLeft: 4 }} /></span>}>
              <Switch checked={giftValueZero} onChange={setGiftValueZero} />
            </Form.Item>
            <Form.Item label={<span>Thêm đuôi KM vào sau đuôi SKU <InfoCircleOutlined style={{ color: '#8C8C8C', marginLeft: 4 }} /></span>}>
              <Switch checked={suffixKm} onChange={setSuffixKm} />
            </Form.Item>
            <Form.Item label={<span>Thêm đuôi "Hàng khuyến mại không thu tiền" <InfoCircleOutlined style={{ color: '#8C8C8C', marginLeft: 4 }} /></span>}>
              <Switch checked={suffixPromo} onChange={setSuffixPromo} />
            </Form.Item>
          </Form>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Button type="primary" size="large" style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>Cập nhật</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsFinanceView;
