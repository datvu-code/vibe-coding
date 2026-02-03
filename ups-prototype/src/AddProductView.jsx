import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Typography, Select, Radio, Form
} from 'antd';

const { Text } = Typography;
const { Option } = Select;

const AddProductView = () => {
    const [form] = Form.useForm();
    const [createMethod, setCreateMethod] = useState('from-warehouse'); // 'from-warehouse' or 'from-scratch'
    
    return (
        <div style={{ 
            maxWidth: 800, 
            margin: '0 auto',
            padding: '24px 0'
        }}>
            <Card
                style={{ 
                    borderRadius: 8,
                    border: '1px solid #F0F0F0'
                }}
                styles={{ body: { padding: '24px' } }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark="optional"
                >
                    {/* Gian hàng */}
                    <Form.Item
                        label={
                            <span>
                                <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.88)' }}>
                                    Gian hàng
                                </Text>
                                <Text style={{ color: '#FF4D4F', marginLeft: 4 }}>*</Text>
                            </span>
                        }
                        name="store"
                        rules={[{ required: true, message: 'Vui lòng chọn gian hàng' }]}
                        style={{ marginBottom: 24 }}
                    >
                        <Select
                            placeholder="Chọn gian hàng"
                            style={{ width: '100%' }}
                            size="large"
                        >
                            <Option value="upbeauty">UpBeauty</Option>
                            <Option value="upbase">UpBase Beauty</Option>
                            <Option value="shop1">Shop 1</Option>
                            <Option value="shop2">Shop 2</Option>
                        </Select>
                    </Form.Item>

                    {/* Chọn cách tạo */}
                    <div style={{ marginBottom: 24 }}>
                        <Text style={{ 
                            fontSize: 14, 
                            color: 'rgba(0,0,0,0.88)',
                            display: 'block',
                            marginBottom: 12
                        }}>
                            Chọn cách tạo
                        </Text>
                        <Radio.Group 
                            value={createMethod} 
                            onChange={(e) => setCreateMethod(e.target.value)}
                            style={{ display: 'flex', gap: 24 }}
                        >
                            <Radio 
                                value="from-warehouse"
                                style={{ fontSize: 14 }}
                            >
                                Từ sản phẩm kho
                            </Radio>
                            <Radio 
                                value="from-scratch"
                                style={{ fontSize: 14 }}
                            >
                                Tạo từ đầu
                            </Radio>
                        </Radio.Group>
                    </div>

                    {/* Sản phẩm kho */}
                    {createMethod === 'from-warehouse' && (
                        <Form.Item
                            label={
                                <span>
                                    <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.88)' }}>
                                        Sản phẩm kho
                                    </Text>
                                    <Text style={{ color: '#FF4D4F', marginLeft: 4 }}>*</Text>
                                </span>
                            }
                            name="warehouseProduct"
                            rules={[{ required: true, message: 'Vui lòng nhập sản phẩm kho' }]}
                            style={{ marginBottom: 32 }}
                        >
                            <Input
                                placeholder="Nhập tên sản phẩm kho/SKU sản phẩm kho"
                                size="large"
                                style={{ fontSize: 14 }}
                            />
                        </Form.Item>
                    )}

                    {/* Footer Buttons */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end',
                        gap: 12,
                        paddingTop: 24,
                        borderTop: '1px solid #F0F0F0',
                        marginTop: 32
                    }}>
                        <Button 
                            size="large"
                            style={{ 
                                background: 'rgba(0,0,0,0.06)', 
                                border: 'none',
                                color: 'rgba(0,0,0,0.88)',
                                padding: '4px 16px',
                                fontSize: 14
                            }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Huỷ bỏ
                        </Button>
                        <Button 
                            type="primary"
                            size="large"
                            style={{ 
                                background: '#EF8C7A', 
                                borderColor: '#EF8C7A',
                                padding: '4px 16px',
                                fontSize: 14
                            }}
                            onClick={() => {
                                form.validateFields().then(values => {
                                    console.log('Form values:', values);
                                    // Handle form submission
                                });
                            }}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default AddProductView;
