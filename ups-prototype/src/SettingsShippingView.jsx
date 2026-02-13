import React, { useState } from 'react';
import { Card, Tabs, Form, Radio, Select, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;

const SettingsShippingView = () => {
  const [activeTab, setActiveTab] = useState('service');
  const [configType, setConfigType] = useState('manual');
  const [storeOption, setStoreOption] = useState('specify');

  const tabItems = [
    { key: 'service', label: 'Cấu hình dịch vụ vận chuyển' },
    { key: 'fee', label: 'Cấu hình phí vận chuyển' }
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
          <div style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 8, fontSize: 14, fontWeight: 500 }}>Cấu hình ĐVVC</div>
            <Radio.Group value={configType} onChange={(e) => setConfigType(e.target.value)}>
              <Radio value="manual">Chọn ĐVVC thủ công</Radio>
            </Radio.Group>
          </div>
          <Form layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ fontSize: 14 }}>
            <Form.Item label="ĐVVC mặc định*">
              <Select value="ghn" style={{ width: '100%' }} suffixIcon={<DownOutlined />}>
                <Option value="ghn">Giao hàng nhanh</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Dịch vụ*">
              <Select mode="tags" style={{ width: '100%' }} value={['Hàng nhẹ']} placeholder="Chọn dịch vụ" />
            </Form.Item>
            <Form.Item label="Dịch vụ cộng thêm">
              <Select style={{ width: '100%' }} placeholder="Khai giá" allowClear />
            </Form.Item>
            <Form.Item label="Kho áp dụng*">
              <Select mode="tags" style={{ width: '100%' }} value={['Kho mặc định']} />
            </Form.Item>
            <Form.Item label="Cửa hàng *">
              <div style={{ marginBottom: 8 }}>
                <Radio.Group value={storeOption} onChange={(e) => setStoreOption(e.target.value)}>
                  <Radio value="specify">Chỉ định</Radio>
                  <Radio value="auto">Tự động chọn theo trọng lượng phù hợp</Radio>
                </Radio.Group>
              </div>
              <Select mode="tags" style={{ width: '100%' }} value={['Ngoc test']} placeholder="Chọn cửa hàng" />
            </Form.Item>
          </Form>
          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Button type="primary" style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>Cập nhật</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsShippingView;
