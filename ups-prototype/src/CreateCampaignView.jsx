import React, { useState } from 'react';
import {
    Card, Form, Input, Button, Select, DatePicker, Radio, Switch, Table, Row, Col, Space, Typography, Empty
} from 'antd';
import {
    PlusOutlined, SearchOutlined, DeleteOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import PaginationFooter from './PaginationFooter';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const CreateCampaignView = () => {
    const [form] = Form.useForm();
    const [noEndDate, setNoEndDate] = useState(false);
    const [selectedProductKeys, setSelectedProductKeys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const productDataSource = [];

    const locale = {
        emptyText: (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span style={{ fontSize: 14, color: '#8C8C8C' }}>Chưa có sản phẩm nào</span>}
            />
        )
    };

    const productColumns = [
        { title: 'Hàng hóa', dataIndex: 'name', key: 'name', width: '30%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Giá bán sau giảm giá', dataIndex: 'price', key: 'price', width: '18%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: '% Hoa hồng', dataIndex: 'commissionPct', key: 'commissionPct', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tổng Hoa hồng', dataIndex: 'commissionTotal', key: 'commissionTotal', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Có sẵn', dataIndex: 'available', key: 'available', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <Button type="link" size="small" danger style={{ fontSize: 14 }} icon={<DeleteOutlined />}>
                    Xóa
                </Button>
            )
        }
    ];

    return (
        <div>
            {/* Section 1: THÔNG SỐ CHIẾN DỊCH */}
            <Card
                title={<Text strong style={{ fontSize: 14, letterSpacing: '0.5px', color: '#262626' }}>THÔNG SỐ CHIẾN DỊCH</Text>}
                styles={{ body: { padding: '24px 24px 16px' } }}
                style={{ borderRadius: 8, marginBottom: 14, background: '#fff' }}
            >
                <Form form={form} layout="vertical" initialValues={{ createBy: 'whole-store' }}>
                    <Row gutter={24}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="platform" label={<span style={{ fontSize: 14 }}>Chọn sàn</span>}>
                                <Select placeholder="Lựa chọn sàn" allowClear style={{ fontSize: 14 }} size="large">
                                    <Option value="shopee">Shopee</Option>
                                    <Option value="tiktok">TikTok</Option>
                                    <Option value="lazada">Lazada</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="store" label={<span style={{ fontSize: 14 }}>Chọn gian hàng</span>} rules={[{ required: true, message: 'Vui lòng chọn gian hàng' }]}>
                                <Select placeholder="Lựa chọn gian hàng" allowClear style={{ fontSize: 14 }} size="large">
                                    <Option value="upbeauty">UpBeauty Store</Option>
                                    <Option value="upbase">UpBase Beauty</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="name" label={<span style={{ fontSize: 14 }}>Tên chiến dịch</span>} rules={[{ required: true, message: 'Vui lòng nhập tên chiến dịch' }]}>
                                <Input placeholder="Ví dụ: Khuyến mãi 10/10" maxLength={50} showCount style={{ fontSize: 14 }} size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="commissionRate" label={<span style={{ fontSize: 14 }}>Mức hoa hồng</span>} rules={[{ required: true, message: 'Vui lòng nhập mức hoa hồng' }]}>
                                <Input placeholder="Ví dụ: 8%" style={{ fontSize: 14 }} size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="description" label={<span style={{ fontSize: 14 }}>Mô tả chiến dịch</span>}>
                        <TextArea placeholder="Ví dụ: Chiến dịch hoa hồng 8%" rows={3} maxLength={150} showCount style={{ fontSize: 14 }} />
                    </Form.Item>
                    <Row gutter={24} align="middle">
                        <Col xs={24} sm={12}>
                            <Form.Item name="startDate" label={<span style={{ fontSize: 14 }}>Chọn ngày bắt đầu</span>} rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu' }]}>
                                <DatePicker showTime placeholder="Chọn thời gian bắt đầu" style={{ width: '100%', fontSize: 14 }} size="large" format="DD/MM/YYYY HH:mm" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="endDate"
                                label={<span style={{ fontSize: 14 }}>Chọn ngày kết thúc</span>}
                                rules={[{ required: !noEndDate, message: 'Vui lòng chọn thời gian kết thúc' }]}
                            >
                                <DatePicker
                                    showTime
                                    placeholder="Chọn thời gian kết thúc"
                                    style={{ width: '100%', fontSize: 14 }}
                                    size="large"
                                    format="DD/MM/YYYY HH:mm"
                                    disabled={noEndDate}
                                />
                            </Form.Item>
                            <Form.Item label=" " colon={false} style={{ marginTop: -8 }}>
                                <Space>
                                    <Switch checked={noEndDate} onChange={setNoEndDate} />
                                    <span style={{ fontSize: 14, color: '#595959' }}>Không có ngày kết thúc</span>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="createBy" label={<span style={{ fontSize: 14 }}>Tạo chiến dịch theo</span>} rules={[{ required: true }]}>
                        <Radio.Group style={{ fontSize: 14 }}>
                            <Radio value="whole-store">Toàn gian hàng</Radio>
                            <Radio value="specific-products">Sản phẩm nhất định</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Card>

            {/* Section 2: CHỌN SẢN PHẨM */}
            <Card
                title={<Text strong style={{ fontSize: 14, letterSpacing: '0.5px', color: '#262626' }}>CHỌN SẢN PHẨM</Text>}
                styles={{ body: { padding: '16px 24px 24px' } }}
                style={{ borderRadius: 8, marginBottom: 14, background: '#fff' }}
            >
                <Text type="secondary" style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>
                    Chọn sản phẩm hoặc hàng hóa mà bạn muốn đặt giá khuyến mại
                </Text>
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Space wrap>
                            <Input
                                placeholder="Tìm kiếm theo tên hàng hóa / SKU"
                                prefix={<SearchOutlined />}
                                style={{ width: 280, fontSize: 14 }}
                                allowClear
                            />
                            <Select mode="tags" placeholder="Nhập tags" style={{ width: 180, fontSize: 14 }} allowClear />
                        </Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                        >
                            Lựa chọn sản phẩm +
                        </Button>
                    </Space>
                    <Space wrap>
                        <Button type="default" icon={<DeleteOutlined />} style={{ fontSize: 14 }}>
                            Xóa hàng loạt
                        </Button>
                        <Text style={{ fontSize: 14, color: '#8C8C8C' }}>Đã chọn {selectedProductKeys.length}/{productDataSource.length}</Text>
                    </Space>
                </Space>
                <Table
                    columns={productColumns}
                    dataSource={productDataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    locale={locale}
                    rowSelection={{
                        selectedRowKeys: selectedProductKeys,
                        onChange: setSelectedProductKeys
                    }}
                    pagination={false}
                    style={{ marginTop: 16, fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ borderTop: '0.87px solid #F0F0F0', paddingTop: 14 }}>
                    <PaginationFooter
                        total={productDataSource.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="sản phẩm"
                    />
                </div>
            </Card>

            {/* Footer actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <Button size="large" style={{ fontSize: 14 }}>
                    Hủy
                </Button>
                <Button
                    type="primary"
                    size="large"
                    style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                >
                    Tạo chiến dịch
                </Button>
            </div>
        </div>
    );
};

export default CreateCampaignView;
