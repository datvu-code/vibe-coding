import React, { useState } from 'react';
import {
    Card, Tabs, Button, Space, Collapse, Input, Typography
} from 'antd';
import {
    DownOutlined, LinkOutlined, EyeOutlined, EyeInvisibleOutlined,
    CopyOutlined
} from '@ant-design/icons';

const { Text } = Typography;
const { Panel } = Collapse;

const PaymentConfigView = () => {
    const [activeTab, setActiveTab] = useState('methods');
    const [webhookSecretVisible, setWebhookSecretVisible] = useState(false);

    const tabItems = [
        { key: 'methods', label: <span style={{ fontSize: 16 }}>Phương thức thanh toán</span> },
        { key: 'beneficiary', label: <span style={{ fontSize: 16 }}>Thông tin thụ hưởng</span> }
    ];

    return (
        <div>
            {/* Tabs outside Card, font 16px */}
            <div style={{ marginBottom: 14 }} className="order-processing-tabs">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={tabItems}
                    style={{ fontSize: 16 }}
                />
            </div>

            {activeTab === 'methods' && (
                <>
                    {/* Section: Cổng thanh toán Napas */}
                    <Card
                        title={<Text strong style={{ fontSize: 16 }}>Cổng thanh toán Napas</Text>}
                        extra={
                            <Button type="default" size="small" style={{ fontSize: 14 }}>
                                Thêm thông tin thụ hưởng
                            </Button>
                        }
                        styles={{ body: { padding: 0 } }}
                        style={{ borderRadius: 8, marginBottom: 14 }}
                    >
                        <Collapse ghost expandIconPosition="end" expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} style={{ fontSize: 14 }} />}>
                            <Panel
                                header={<span style={{ fontSize: 14 }}>Chuyển khoản qua ngân hàng</span>}
                                key="napas-bank"
                                style={{ borderBottom: '1px solid #F0F0F0' }}
                            >
                                <div style={{ padding: '8px 16px 16px', fontSize: 14, color: '#8C8C8C' }}>
                                    Cấu hình chi tiết phương thức chuyển khoản qua ngân hàng.
                                </div>
                            </Panel>
                            <Panel
                                header={<span style={{ fontSize: 14 }}>Chuyển khoản qua thẻ ngân hàng</span>}
                                key="napas-card"
                            >
                                <div style={{ padding: '8px 16px 16px', fontSize: 14, color: '#8C8C8C' }}>
                                    Cấu hình chi tiết phương thức chuyển khoản qua thẻ ngân hàng.
                                </div>
                            </Panel>
                        </Collapse>
                    </Card>

                    {/* Section: Cổng thanh toán Sepay */}
                    <Card
                        title={<Text strong style={{ fontSize: 16 }}>Cổng thanh toán Sepay</Text>}
                        extra={
                            <Button type="default" size="small" icon={<LinkOutlined />} style={{ fontSize: 14 }}>
                                Thêm thông tin thụ hưởng
                            </Button>
                        }
                        styles={{ body: { padding: 0 } }}
                        style={{ borderRadius: 8, marginBottom: 14 }}
                    >
                        <div style={{ padding: '16px', borderBottom: '1px solid #F0F0F0' }}>
                            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <LinkOutlined style={{ fontSize: 14, color: '#8C8C8C' }} />
                                    <Text style={{ fontSize: 14, minWidth: 100 }}>Webhook:</Text>
                                    <Text style={{ fontSize: 14, color: '#1890ff' }} copyable>
                                        https://webhook.upbase.vn/provider/sepay/301
                                    </Text>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <LinkOutlined style={{ fontSize: 14, color: '#8C8C8C' }} />
                                    <Text style={{ fontSize: 14, minWidth: 120 }}>Webhook Secret:</Text>
                                    <Input
                                        type={webhookSecretVisible ? 'text' : 'password'}
                                        value="••••••••••••••••••"
                                        readOnly
                                        style={{ width: 220, fontSize: 14 }}
                                        suffix={
                                            <Space size="small">
                                                <span
                                                    style={{ cursor: 'pointer', color: '#8C8C8C' }}
                                                    onClick={() => setWebhookSecretVisible(!webhookSecretVisible)}
                                                >
                                                    {webhookSecretVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                                </span>
                                                <CopyOutlined style={{ cursor: 'pointer', color: '#8C8C8C' }} />
                                            </Space>
                                        }
                                    />
                                </div>
                            </Space>
                        </div>
                        <Collapse ghost expandIconPosition="end" expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} style={{ fontSize: 14 }} />}>
                            <Panel
                                header={<span style={{ fontSize: 14 }}>Chuyển khoản qua ngân hàng</span>}
                                key="sepay-bank"
                            >
                                <div style={{ padding: '8px 16px 16px', fontSize: 14, color: '#8C8C8C' }}>
                                    Cấu hình chi tiết phương thức chuyển khoản qua ngân hàng Sepay.
                                </div>
                            </Panel>
                        </Collapse>
                    </Card>

                    {/* Section: Thanh toán thủ công */}
                    <Card
                        title={<Text strong style={{ fontSize: 16 }}>Thanh toán thủ công</Text>}
                        styles={{ body: { padding: 0 } }}
                        style={{ borderRadius: 8 }}
                    >
                        <Collapse ghost expandIconPosition="end" expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} style={{ fontSize: 14 }} />}>
                            <Panel
                                header={<span style={{ fontSize: 14 }}>Thanh toán khi nhận hàng (COD)</span>}
                                key="cod"
                            >
                                <div style={{ padding: '8px 16px 16px', fontSize: 14, color: '#8C8C8C' }}>
                                    Cấu hình thanh toán khi nhận hàng (COD).
                                </div>
                            </Panel>
                        </Collapse>
                    </Card>
                </>
            )}

            {activeTab === 'beneficiary' && (
                <Card style={{ borderRadius: 8 }}>
                    <div style={{ padding: 24, textAlign: 'center', color: '#8C8C8C', fontSize: 14 }}>
                        Nội dung Thông tin thụ hưởng
                    </div>
                </Card>
            )}
        </div>
    );
};

export default PaymentConfigView;
