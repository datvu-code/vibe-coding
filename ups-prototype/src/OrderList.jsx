import React, { useState, useEffect, useRef } from 'react';
import {
    Card, Tabs, Button, Input, Space, Tag, Typography, Checkbox,
    Dropdown, Menu, Pagination, Badge, Alert, Row, Col, Tooltip, Select,
    Drawer, Divider, DatePicker, Radio, Popover, Modal, Spin, Upload,
    Switch, InputNumber, Form, Collapse, Steps, Progress
} from 'antd';
import {
    FilterOutlined, ReloadOutlined, DownOutlined, CopyOutlined,
    ClockCircleOutlined, InfoCircleOutlined, ShopOutlined,
    CheckCircleOutlined, HistoryOutlined, LeftOutlined,
    RightOutlined, DoubleRightOutlined, EditOutlined, DeleteOutlined,
    PrinterOutlined, FileTextOutlined, GiftOutlined, BookOutlined,
    LinkOutlined, TagsOutlined, SearchOutlined, SortAscendingOutlined,
    PlusOutlined, UploadOutlined, CaretUpOutlined, CloseOutlined,
    ExportOutlined, DownloadOutlined, SettingOutlined, UpOutlined,
    MenuOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

// Create Order Screen Component
const CreateOrderScreen = ({ onClose }) => {
    return (
        <div style={{ 
            maxWidth: 1400, 
            margin: '0 auto',
            padding: '24px'
        }}>
                {/* Header */}
                <div style={{ 
                    marginBottom: 24,
                    paddingBottom: 16,
                    borderBottom: '1px solid #F0F0F0'
                }}>
                    <Text style={{ fontSize: 14, fontWeight: 600 }}>Tạo đơn hàng</Text>
                </div>

                <Form layout="vertical">
                    {/* Thông tin khách hàng */}
                    <Card 
                        title={<Text style={{ fontSize: 14 }}>Thông tin khách hàng</Text>}
                        style={{ marginBottom: 16 }}
                        styles={{ body: { padding: '16px' } }}
                    >
                        <Input
                            placeholder="Tìm thông tin khách hàng (tên, số điện thoại, mã khách hàng, email, mã tham chiếu)"
                            prefix={<SearchOutlined />}
                            style={{ fontSize: 14 }}
                        />
                    </Card>

                    <Row gutter={16}>
                        {/* Left Column - Thông tin sản phẩm */}
                        <Col span={16}>
                            <Card 
                                title={<Text style={{ fontSize: 14 }}>Thông tin sản phẩm</Text>}
                                style={{ marginBottom: 16 }}
                                styles={{ body: { padding: '16px' } }}
                            >
                                {/* Product Selection Fields */}
                                <Row gutter={16} style={{ marginBottom: 16 }}>
                                    <Col span={8}>
                                        <Form.Item label={<Text style={{ fontSize: 14 }}>Kênh bán *</Text>} required>
                                            <Select placeholder="Chọn kênh bán" style={{ fontSize: 14 }}>
                                                <Option value="shopee">Shopee</Option>
                                                <Option value="tiktok">TikTok</Option>
                                                <Option value="haravan">Haravan</Option>
                                                <Option value="lazada">Lazada</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={<Text style={{ fontSize: 14 }}>Gian hàng *</Text>} required>
                                            <Select placeholder="Chọn gian hàng" style={{ fontSize: 14 }}>
                                                <Option value="shop1">Shop 1</Option>
                                                <Option value="shop2">Shop 2</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={<Text style={{ fontSize: 14 }}>Kho xử lý *</Text>} required>
                                            <Select placeholder="Chọn kho xử lý" style={{ fontSize: 14 }}>
                                                <Option value="warehouse1">Kho 1</Option>
                                                <Option value="warehouse2">Kho 2</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Radio buttons for warehouse allocation */}
                                <Radio.Group defaultValue="assign" style={{ marginBottom: 16 }}>
                                    <Radio value="auto" style={{ fontSize: 14 }}>Tự động điều phối</Radio>
                                    <Radio value="assign" style={{ fontSize: 14 }}>Chỉ định</Radio>
                                </Radio.Group>

                                {/* Action Buttons */}
                                <Space style={{ marginBottom: 16 }}>
                                    <Button icon={<GiftOutlined />} style={{ fontSize: 14 }}>Thêm quà</Button>
                                    <Button type="primary" icon={<PlusOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>
                                        Thêm sản phẩm
                                    </Button>
                                </Space>

                                {/* Empty Product State */}
                                <div style={{
                                    border: '1px dashed #D9D9D9',
                                    borderRadius: 4,
                                    padding: '60px 20px',
                                    textAlign: 'center',
                                    background: '#FAFAFA',
                                    marginBottom: 16
                                }}>
                                    <Space orientation="vertical" size={8}>
                                        <PlusOutlined style={{ fontSize: 32, color: '#BFBFBF' }} />
                                        <Text type="secondary" style={{ fontSize: 14 }}>Vui lòng chọn Kênh bán, Gian hàng để thêm sản phẩm</Text>
                                    </Space>
                                </div>

                                {/* Attachments and Notes */}
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item label={<Text style={{ fontSize: 14 }}>Đính kèm</Text>}>
                                            <Upload>
                                                <Button icon={<UploadOutlined />} style={{ width: '100%', fontSize: 14 }}>
                                                    Tải file lên
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                    <Col span={16}>
                                        <Form.Item label={<Text style={{ fontSize: 14 }}>Ghi chú</Text>}>
                                            <Space orientation="vertical" style={{ width: '100%' }}>
                                                <Radio.Group defaultValue="internal" size="small">
                                                    <Radio.Button value="internal" style={{ fontSize: 14 }}>Nội bộ</Radio.Button>
                                                    <Radio.Button value="customer" style={{ fontSize: 14 }}>Khách hàng</Radio.Button>
                                                </Radio.Group>
                                                <TextArea 
                                                    placeholder="Nhập ghi chú" 
                                                    rows={4}
                                                    showCount
                                                    maxLength={500}
                                                    style={{ fontSize: 14 }}
                                                />
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item label={<Text style={{ fontSize: 14 }}>Tag</Text>}>
                                    <Select
                                        mode="tags"
                                        placeholder="Nhập tag"
                                        style={{ width: '100%', fontSize: 14 }}
                                    />
                                </Form.Item>
                            </Card>
                        </Col>

                        {/* Right Column - Product Summary & Order Info */}
                        <Col span={8}>
                            {/* Product Summary */}
                            <Card
                                title={<Text style={{ fontSize: 14 }}>Tóm tắt</Text>}
                                style={{ marginBottom: 16 }}
                                styles={{ body: { padding: '16px' } }}
                            >
                                <Space orientation="vertical" style={{ width: '100%' }} size={12}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 14 }}>Số lượng hàng hoá:</Text>
                                        <Text strong style={{ fontSize: 14 }}>0</Text>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 14 }}>Tổng tiền hàng hoá:</Text>
                                        <Text strong style={{ fontSize: 14 }}>0₫</Text>
                                    </div>
                                    
                                    <Collapse ghost>
                                        <Panel header={<Text style={{ fontSize: 14 }}>Tổng giảm giá</Text>} key="1">
                                            <Space orientation="vertical" style={{ width: '100%' }} size={8}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontSize: 14 }}>Giảm giá sản phẩm:</Text>
                                                    <Text style={{ fontSize: 14 }}>0₫</Text>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 14 }}>Mã giảm giá:</Text>
                                                    <Space>
                                                        <InputNumber size="small" style={{ width: 80, fontSize: 14 }} addonAfter="%" />
                                                        <InputNumber size="small" style={{ width: 80, fontSize: 14 }} />
                                                    </Space>
                                                </div>
                                            </Space>
                                        </Panel>
                                    </Collapse>

                                    <Collapse ghost>
                                        <Panel header={<Text style={{ fontSize: 14 }}>Phí vận chuyển phải trả</Text>} key="2">
                                            <Space orientation="vertical" style={{ width: '100%' }} size={8}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Space>
                                                        <Text style={{ fontSize: 14 }}>Phí vận chuyển NBH hỗ trợ:</Text>
                                                        <InfoCircleOutlined style={{ fontSize: 12, color: '#8C8C8C' }} />
                                                    </Space>
                                                    <Space>
                                                        <InputNumber size="small" style={{ width: 80, fontSize: 14 }} addonAfter="%" />
                                                        <InputNumber size="small" style={{ width: 80, fontSize: 14 }} />
                                                    </Space>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Space>
                                                        <Text style={{ fontSize: 14 }}>Phí vận chuyển báo khách:</Text>
                                                        <InfoCircleOutlined style={{ fontSize: 12, color: '#8C8C8C' }} />
                                                    </Space>
                                                    <InputNumber size="small" style={{ width: 100, fontSize: 14 }} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontSize: 14 }}>Phí vận chuyển ĐVVC:</Text>
                                                    <Text style={{ fontSize: 14 }}>0₫</Text>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Space>
                                                        <Text style={{ fontSize: 14 }}>Chênh lệch phí vận chuyển:</Text>
                                                        <InfoCircleOutlined style={{ fontSize: 12, color: '#8C8C8C' }} />
                                                    </Space>
                                                    <Text style={{ fontSize: 14 }}>0₫</Text>
                                                </div>
                                            </Space>
                                        </Panel>
                                    </Collapse>

                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 14 }}>Xu đã sử dụng:</Text>
                                        <Text style={{ fontSize: 14 }}>0₫</Text>
                                    </div>

                                    <Collapse ghost>
                                        <Panel header={<Text style={{ fontSize: 14 }}>Điểm khách hàng thân thiết</Text>} key="3">
                                            <Space orientation="vertical" style={{ width: '100%' }} size={8}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontSize: 14 }}>Điểm quy đổi:</Text>
                                                    <Text style={{ fontSize: 14 }}>0 (0₫)</Text>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontSize: 14 }}>Điểm tích luỹ:</Text>
                                                    <Text style={{ fontSize: 14 }}>+0</Text>
                                                </div>
                                            </Space>
                                        </Panel>
                                    </Collapse>

                                    <Divider style={{ margin: '12px 0' }} />

                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Text strong style={{ fontSize: 14 }}>Tổng tiền phải trả:</Text>
                                        <Text strong style={{ fontSize: 14, color: '#EF5941' }}>0₫</Text>
                                    </div>
                                </Space>
                            </Card>

                            {/* Order Information */}
                            <Card 
                                title={<Text style={{ fontSize: 14 }}>Thông tin đơn hàng</Text>}
                                styles={{ body: { padding: '16px' } }}
                            >
                                <Space orientation="vertical" style={{ width: '100%' }} size={16}>
                                    <Form.Item>
                                        <Checkbox style={{ fontSize: 14 }}>Đơn sản phẩm gửi KOC, KOL</Checkbox>
                                    </Form.Item>

                                    <Form.Item label={<Text style={{ fontSize: 14 }}>Nhân viên bán hàng</Text>}>
                                        <Input
                                            defaultValue="daothingoc9@gmail.com"
                                            suffix={<CloseOutlined style={{ fontSize: 12, cursor: 'pointer' }} />}
                                            addonAfter={<InfoCircleOutlined style={{ fontSize: 12, color: '#8C8C8C' }} />}
                                            style={{ fontSize: 14 }}
                                        />
                                    </Form.Item>

                                    <Form.Item label={<Text style={{ fontSize: 14 }}>Nhân viên marketing</Text>}>
                                        <Select placeholder="Chọn nhân viên marketing" style={{ fontSize: 14 }}>
                                            <Option value="marketing1">Marketing 1</Option>
                                            <Option value="marketing2">Marketing 2</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label={
                                        <Space>
                                            <Text style={{ fontSize: 14 }}>Ngày phát sinh đơn</Text>
                                            <InfoCircleOutlined style={{ fontSize: 12, color: '#8C8C8C' }} />
                                        </Space>
                                    }>
                                        <Text style={{ fontSize: 14 }}>24/12/2025 14:47</Text>
                                    </Form.Item>

                                    <Form.Item label={
                                        <Space>
                                            <Text style={{ fontSize: 14 }}>Ngày dự kiến bàn giao ĐVVC</Text>
                                            <InfoCircleOutlined style={{ fontSize: 12, color: '#8C8C8C' }} />
                                        </Space>
                                    }>
                                        <DatePicker style={{ width: '100%', fontSize: 14 }} placeholder="Chọn" />
                                    </Form.Item>

                                    <Form.Item label={<Text style={{ fontSize: 14 }}>UTM</Text>}>
                                        <Input placeholder="Nhập link" style={{ fontSize: 14 }} />
                                    </Form.Item>

                                    <Form.Item label={<Text style={{ fontSize: 14 }}>Mã đơn hàng</Text>}>
                                        <Radio.Group defaultValue="auto">
                                            <Radio value="manual" style={{ fontSize: 14 }}>Nhập tay</Radio>
                                            <Radio value="auto" style={{ fontSize: 14 }}>Hệ thống tự động tạo</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Space>
                            </Card>
                        </Col>
                    </Row>

                    {/* Payment Information */}
                    <Card 
                        title={
                            <Space>
                                <Text style={{ fontSize: 14 }}>Thông tin thanh toán</Text>
                                <Button size="small" style={{ background: '#FAFAFA', border: '1px solid #D9D9D9', fontSize: 14 }}>
                                    Chưa thanh toán
                                </Button>
                            </Space>
                        }
                        style={{ marginBottom: 16 }}
                        styles={{ body: { padding: '16px' } }}
                    >
                        <Row gutter={16} style={{ marginBottom: 16 }}>
                            <Col span={8}>
                                <Text style={{ fontSize: 14 }}>Khách phải trả: <Text strong style={{ fontSize: 14 }}>0₫</Text></Text>
                            </Col>
                            <Col span={8}>
                                <Text style={{ fontSize: 14 }}>Đã thanh toán: <Text strong style={{ fontSize: 14 }}>0₫</Text></Text>
                            </Col>
                            <Col span={8}>
                                <Text style={{ fontSize: 14 }}>Còn phải trả: <Text strong style={{ fontSize: 14 }}>0₫</Text></Text>
                            </Col>
                        </Row>
                        <Text type="secondary" style={{ display: 'block', marginBottom: 12, fontSize: 14 }}>
                            Chưa có giao dịch thanh toán nào
                        </Text>
                        <Button icon={<PlusOutlined />} type="default" style={{ fontSize: 14 }}>
                            Thêm thanh toán
                        </Button>
                    </Card>

                    {/* Shipping Information */}
                    <Card 
                        title={
                            <Space>
                                <Text style={{ fontSize: 14 }}>Thông tin vận chuyển</Text>
                                <Button icon={<PlusOutlined />} type="default" style={{ fontSize: 14 }}>
                                    Thêm vận chuyển
                                </Button>
                            </Space>
                        }
                        style={{ marginBottom: 16 }}
                        styles={{ body: { padding: '16px' } }}
                    >
                        {/* Shipping content will be added here */}
                    </Card>

                    {/* Footer Buttons */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        gap: 12,
                        paddingTop: 16,
                        borderTop: '1px solid #F0F0F0'
                    }}>
                        <Button onClick={onClose} style={{ fontSize: 14 }}>
                            Huỷ bỏ
                        </Button>
                        <Button style={{ borderColor: '#EF5941', color: '#EF5941', fontSize: 14 }}>
                            Lưu nháp
                        </Button>
                        <Button type="primary" style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>
                            Lưu & chốt đơn
                        </Button>
                    </div>
                </Form>
            </div>
    );
};

const OrderList = ({ 
    isBatchProcessing = false, 
    isAbnormalCancellation = false, 
    isReturnOrderView = false,
    isProcessReturnOrder = false,
    guideDrawerVisible: externalGuideDrawerVisible,
    setGuideDrawerVisible: externalSetGuideDrawerVisible,
    exportFileModalVisible: externalExportFileModalVisible,
    setExportFileModalVisible: externalSetExportFileModalVisible,
    updateInfoModalVisible: externalUpdateInfoModalVisible,
    setUpdateInfoModalVisible: externalSetUpdateInfoModalVisible
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalOrders, setTotalOrders] = useState(50);
    const [orderTypeFilter, setOrderTypeFilter] = useState(isReturnOrderView ? 'noi-san' : 'platform'); // For return order: 'noi-san', 'ngoai-san'. For normal: 'platform', 'manual', 'my-orders', 'pos'
    const [activeStatusTab, setActiveStatusTab] = useState(isAbnormalCancellation ? 'all' : 'all');
    const [logisticsDrawerVisible, setLogisticsDrawerVisible] = useState(false);
    const [internalGuideDrawerVisible, setInternalGuideDrawerVisible] = useState(false);
    const guideDrawerVisible = externalGuideDrawerVisible !== undefined ? externalGuideDrawerVisible : internalGuideDrawerVisible;
    const setGuideDrawerVisible = externalSetGuideDrawerVisible || setInternalGuideDrawerVisible;
    const [activeStep, setActiveStep] = useState(0); // Step 1 is active by default (index 0)
    const [currentProgressStep, setCurrentProgressStep] = useState(0); // Progress stepper current step
    
    // Batch processing states
    const [batchProcessingStatusTab, setBatchProcessingStatusTab] = useState('cho-dong-goi'); // 'cho-dong-goi', 'dang-dong-goi', 'cho-lay-hang'
    const [selectedWarehouse, setSelectedWarehouse] = useState('hcm-hoc-mon-02');
    const [selectedStore, setSelectedStore] = useState('upbeauty-store');
    const [selectedShippingUnit, setSelectedShippingUnit] = useState('nhanh');
    const [orderStatusTab, setOrderStatusTab] = useState('don-hop-le'); // 'don-hop-le', 'cho-phan-bo-dvvc', 'loi-san-tmd', 'loi-kho'
    const [selectedPackages, setSelectedPackages] = useState(0);
    const [packageTypeFilter, setPackageTypeFilter] = useState(null);
    const [exportSlipStatus, setExportSlipStatus] = useState(null);
    const [pickingSlipStatus, setPickingSlipStatus] = useState(null);
    const [sortBy, setSortBy] = useState('order-time');

    // Add/remove blur class when drawer opens/closes
    useEffect(() => {
        if (logisticsDrawerVisible) {
            document.body.classList.add('drawer-open');
        } else {
            document.body.classList.remove('drawer-open');
        }
        return () => {
            document.body.classList.remove('drawer-open');
        };
    }, [logisticsDrawerVisible]);

    // Adjust content margin when guide drawer opens (split screen)
    useEffect(() => {
        const contentElement = document.querySelector('.ant-layout-content');
        if (guideDrawerVisible && contentElement) {
            contentElement.style.marginRight = '300px';
            contentElement.style.transition = 'margin-right 0.3s ease';
        } else if (contentElement) {
            contentElement.style.marginRight = '';
        }
        return () => {
            if (contentElement) {
                contentElement.style.marginRight = '';
            }
        };
    }, [guideDrawerVisible]);
    
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [hoveredOrderId, setHoveredOrderId] = useState(null);
    const [hoveredOrderCardId, setHoveredOrderCardId] = useState(null);
    const [hoveredSku, setHoveredSku] = useState(null);
    const [hoveredTrackingNumber, setHoveredTrackingNumber] = useState(null);
    const [hoveredOrderIdInDrawer, setHoveredOrderIdInDrawer] = useState(null);
    const [expandedGifts, setExpandedGifts] = useState(new Set());
    const [sortOption, setSortOption] = useState(null);
    const [cardHeight, setCardHeight] = useState(null);
    const cardRefs = useRef({});
    const [internalUpdateInfoModalVisible, setInternalUpdateInfoModalVisible] = useState(false);
    const [hoveredUpdateInfo, setHoveredUpdateInfo] = useState(false);
    const [exportOption, setExportOption] = useState(null);
    const [exportShopOption, setExportShopOption] = useState(null);
    const [internalExportFileModalVisible, setInternalExportFileModalVisible] = useState(false);
    
    const updateInfoModalVisible = externalUpdateInfoModalVisible !== undefined ? externalUpdateInfoModalVisible : internalUpdateInfoModalVisible;
    const setUpdateInfoModalVisible = externalSetUpdateInfoModalVisible || setInternalUpdateInfoModalVisible;
    const exportFileModalVisible = externalExportFileModalVisible !== undefined ? externalExportFileModalVisible : internalExportFileModalVisible;
    const setExportFileModalVisible = externalSetExportFileModalVisible || setInternalExportFileModalVisible;
    const [configDrawerVisible, setConfigDrawerVisible] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(['Sản phẩm', 'Tổng tiền', 'Người nhận']);
    const [availableColumns, setAvailableColumns] = useState(['Kho xử lý', 'Xử lý', 'Vận chuyển']);
    const [hoveredColumn, setHoveredColumn] = useState(null);

    // Helper function to highlight actions in description
    const renderDescriptionWithHighlights = (description) => {
        const actions = [
            'Đóng gói', 'Chờ đóng gói', 'Chọn', 'Chuẩn bị hàng', 'In vận đơn', 
            'Sẵn sàng giao', 'phiếu xuất kho', 'Chờ lấy hàng', 'phiếu xuất', 
            'phiếu bàn giao', 'ĐVVC', 'Đang đóng gói', 'Quản trị đơn hàng',
            'In phiếu xuất', 'In phiếu bàn giao'
        ];
        
        const highlightText = (text) => {
            let result = text;
            actions.forEach(action => {
                const regex = new RegExp(`(${action})`, 'gi');
                result = result.replace(regex, '<strong>$1</strong>');
            });
            return result;
        };
        
        // Handle array of descriptions (for bullet points)
        if (Array.isArray(description)) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {description.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 8 }}>
                            <span style={{ color: 'rgba(0,0,0,0.65)' }}>-</span>
                            <span dangerouslySetInnerHTML={{ __html: highlightText(item) }} />
                        </div>
                    ))}
                </div>
            );
        }
        
        // Handle string description
        return <span dangerouslySetInnerHTML={{ __html: highlightText(description) }} />;
    };
    const [searchFilterType, setSearchFilterType] = useState('order-code');
    const [isLoadingManualOrders, setIsLoadingManualOrders] = useState(false);
    const [isLoadingOrderTypeSwitch, setIsLoadingOrderTypeSwitch] = useState(false);
    const [createOrderModalVisible, setCreateOrderModalVisible] = useState(false);

    // Helper function to generate mock product images
    const getProductImage = (productId, seed = null) => {
        const imageId = seed || productId || Math.floor(Math.random() * 1000);
        return `https://picsum.photos/seed/${imageId}/60/60`;
    };

    // Helper function to generate mock gift images (orange-ish tint)
    const getGiftImage = (giftId, seed = null) => {
        const imageId = seed || giftId || Math.floor(Math.random() * 1000);
        // Using Unsplash with orange/gift keywords for gift items
        return `https://source.unsplash.com/60x60/?gift,present&sig=${imageId}`;
    };

    // Channel logos mapping - using real logos from CDN
    const channelLogos = {
        shopee: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
        tiktok: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg',
        haravan: 'https://www.haravan.com/favicon.ico',
        lazada: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Lazada_logo.svg',
        tiki: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Tiki.vn_logo.svg',
        default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjRUY1OTQxIi8+CjxwYXRoIGQ9Ik00IDRIMTJWMTJINFY0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'
    };

    const getChannelMeta = (channelKey) => {
        const key = (channelKey || '').toLowerCase();
        const labelMap = {
            shopee: 'Shopee',
            tiktok: 'TikTok Shop',
            lazada: 'Lazada',
            tiki: 'Tiki',
            haravan: 'Haravan'
        };
        return {
            key,
            platformLabel: labelMap[key] || 'Kênh bán',
            logo: channelLogos[key] || channelLogos.default
        };
    };

    // Generate mock data for a specific page
    const generateMockOrders = (page, size) => {
        const channels = ['shopee', 'tiktok', 'haravan', 'lazada', 'tiki'];
        const statuses = ['packing', 'cancelled', 'completed', 'shipping', 'pending'];
        const statusLabels = ['Đang đóng gói', 'Đã hủy', 'Hoàn thành', 'Đang giao hàng', 'Chờ duyệt'];
        const orders = [];
        
        for (let i = 0; i < size; i++) {
            const orderIndex = (page - 1) * size + i;
            const channel = channels[orderIndex % channels.length];
            const statusIndex = orderIndex % statuses.length;
            const orderId = `251007F3DE2EC${orderIndex + 1}`;
            
            orders.push({
                id: orderId,
                shopName: "Puka's Shop",
                channel: channel,
                orderDate: `07/10/2025 ${13 + (i % 12)}:${51 + i}`,
                status: statuses[statusIndex],
                statusLabel: statusLabels[statusIndex],
                products: [
                    {
                        id: `PROD${orderIndex}`,
                        name: `Sản phẩm ${orderIndex + 1} - Mô tả sản phẩm chi tiết`,
                        sku: `SKU-${orderIndex}-${Date.now()}`,
                        variant: orderIndex % 2 === 0 ? 'Mặc định' : 'Màu sắc',
                        quantity: (orderIndex % 3) + 1,
                        image: getProductImage(`PROD${orderIndex}`),
                        price: 1000000 + (orderIndex * 100000),
                        method: orderIndex % 2 === 0 ? 'Cash on Delivery' : 'Thanh toán khi giao hàng'
                    }
                ],
                gifts: orderIndex % 3 === 0 ? [
                    {
                        id: `GIFT${orderIndex}`,
                        name: 'Quà tặng đặc biệt',
                        sku: `GIFT-${orderIndex}`,
                        quantity: 1,
                        image: getGiftImage(`GIFT${orderIndex}`)
                    }
                ] : [],
                totalAmount: 1000000 + (orderIndex * 100000),
                warehouse: ['Kho thời trang', 'Kho Hà Nội', 'Kho TP.HCM', 'Kho Đà Nẵng'][orderIndex % 4],
                processing: {
                    remaining: statusIndex === 0 ? 'Quá hạn' : statusLabels[statusIndex],
                    shipBefore: '08/10/2025 23:59',
                    prepareBefore: '08/10/2025 23:59'
                },
                shipping: {
                    carrier: 'SPX Express',
                    trackingNumber: `SPXVN${orderIndex}${Date.now()}`,
                    orderId: orderId,
                    method: 'Vận chuyển tiêu chuẩn'
                },
                recipient: {
                    name: `Người nhận ${orderIndex + 1}`,
                    address: `Địa chỉ ${orderIndex + 1}, Quận ${(orderIndex % 10) + 1}, TP.HCM`
                }
            });
        }
        return orders;
    };

    // Get orders for current page
    const orders = generateMockOrders(currentPage, pageSize);

    // Mock Data with updated structure (keeping for reference)
    const originalOrders = [
        {
            id: '251007F3DE2EC1',
            shopName: "Puka's Shop",
            channel: 'shopee',
            orderDate: '07/10/2025 13:51',
            status: 'packing',
            statusLabel: 'Đang đóng gói',
            products: [
                {
                    id: '000327SKLTHMSP',
                    name: 'Gói Bột Gia Vị Bột Phomai Raw Hữu Cơ 200G Nguyên Chất',
                    sku: '000327SKLTHMSP-1748318375',
                    variant: 'Mặc định',
                    quantity: 1,
                    image: getProductImage('000327SKLTHMSP'),
                    price: 2416500,
                    method: 'Cash on Delivery'
                }
            ],
            gifts: [
                {
                    id: 'GIFT001',
                    name: 'Quà tặng đặc biệt',
                    sku: 'GIFT-001',
                    quantity: 1,
                    image: getGiftImage('GIFT001')
                },
                {
                    id: 'GIFT002',
                    name: 'Quà tặng khuyến mãi',
                    sku: 'GIFT-002',
                    quantity: 2,
                    image: getGiftImage('GIFT002')
                }
            ],
            totalAmount: 2416500,
            warehouse: 'KHO THỜI TRANG',
            processing: {
                remaining: 'Quá hạn',
                shipBefore: '08/10/2025 23:59',
                prepareBefore: '08/10/2025 23:59'
            },
            shipping: {
                carrier: 'SPX Express',
                trackingNumber: 'SPXVN05926370071A',
                orderId: '251007F3DE2EC1',
                method: 'Vận chuyển tiêu chuẩn'
            },
            recipient: {
                name: 'Dat Vu',
                address: 'Số 89, ngõ 89, phường Ba Đình, Hà Nội'
            }
        },
        {
            id: '251007F3DE2EC2',
            shopName: "Puka's Shop",
            channel: 'tiktok',
            orderDate: '10/07/2025 16:31:06',
            status: 'cancelled',
            statusLabel: 'Đã hủy',
            statusDetail: 'Bị hủy bởi người mua',
            products: [
                {
                    id: 'PROD002',
                    name: 'Áo Chống Nắng Nam GUZADO Vải Thoáng Mát Chống Tia UV',
                    sku: 'ACN-GUZ-001',
                    variant: 'Xanh than',
                    quantity: 1,
                    image: getProductImage('PROD002'),
                    price: 440000,
                    method: 'Thanh toán khi giao hàng'
                }
            ],
            gifts: [],
            totalAmount: 440000,
            warehouse: 'KHO THỜI TRANG',
            processing: {
                remaining: 'Đã hủy',
                shipBefore: '12/07/2025 23:59',
                prepareBefore: '12/07/2025 23:59'
            },
            shipping: {
                carrier: 'J&T Express',
                trackingNumber: 'JTVN123456789',
                orderId: '251007F3DE2EC2',
                method: 'Vận chuyển tiêu chuẩn'
            },
            recipient: {
                name: 'Nguyễn Văn A',
                address: '123 Đường ABC, Quận 1, TP.HCM'
            }
        },
        {
            id: '251007F3DE2EC3',
            shopName: "Puka's Shop",
            channel: 'haravan',
            orderDate: '29/06/2025 23:12:00',
            status: 'completed',
            statusLabel: 'Hoàn thành',
            products: [
                {
                    id: 'PROD003',
                    name: 'Dây Thun Cao Su Cao Cấp, COMBINATION LOCK',
                    sku: 'DT-CS-001',
                    variant: 'Mặc định',
                    quantity: 1,
                    image: getProductImage('PROD003'),
                    price: 500000,
                    method: 'Thanh toán khi giao hàng'
                }
            ],
            gifts: [
                {
                    id: 'GIFT002',
                    name: 'Quà tặng khuyến mãi',
                    sku: 'GIFT-002',
                    quantity: 1,
                    image: getGiftImage('GIFT002')
                }
            ],
            totalAmount: 500000,
            warehouse: 'KHO THỜI TRANG',
            processing: {
                remaining: 'Hoàn thành',
                shipBefore: '01/07/2025 23:59',
                prepareBefore: '01/07/2025 23:59'
            },
            shipping: {
                carrier: 'SPX Express',
                trackingNumber: 'SPXVN987654321',
                orderId: '251007F3DE2EC3',
                method: 'Vận chuyển tiêu chuẩn'
            },
            recipient: {
                name: 'Trần Thị B',
                address: '456 Đường XYZ, Quận 2, TP.HCM'
            }
        },
        {
            id: '251007F3DE2EC4',
            shopName: "Puka's Shop",
            channel: 'lazada',
            orderDate: '07/10/2025 13:51',
            status: 'packing',
            statusLabel: 'Đang đóng gói',
            products: [
                {
                    id: '000327SKLTHMSP',
                    name: 'Gói Bột Gia Vị Bột Phomai Raw Hữu Cơ 200G Nguyên Chất',
                    sku: '000327SKLTHMSP-1748318375',
                    variant: 'Mặc định',
                    quantity: 2,
                    image: getProductImage('000327SKLTHMSP-2'),
                    price: 2416500,
                    method: 'Cash on Delivery'
                }
            ],
            gifts: [],
            totalAmount: 4833000,
            warehouse: 'KHO THỜI TRANG',
            processing: {
                remaining: 'Quá hạn',
                shipBefore: '08/10/2025 23:59',
                prepareBefore: '08/10/2025 23:59'
            },
            shipping: {
                carrier: 'SPX Express',
                trackingNumber: 'SPXVN05926370071A',
                orderId: '251007F3DE2EC4',
                method: 'Vận chuyển tiêu chuẩn'
            },
            recipient: {
                name: 'Dat Vu',
                address: 'Số 89, ngõ 89, phường Ba Đình, Hà Nội'
            }
        }
    ];

    // Status tabs - add "Đơn nháp" after "Tất cả" for manual orders
    const baseStatusTabs = [
        { key: 'all', label: 'Tất cả' },
        { key: 'pending', label: 'Chờ duyệt (12)' },
    ];
    
    const draftTab = { key: 'draft', label: 'Đơn nháp (12)' };
    
    const remainingStatusTabs = [
        { key: 'packing', label: 'Đóng gói (12)' },
        { key: 'shipping', label: 'Đang giao hàng (12)' },
        { key: 'completed', label: 'Hoàn thành (12)' },
        { key: 'cancelled', label: 'Hủy (12)' },
    ];

    // Secondary status tabs group (right side with divider)
    const secondaryStatusTabs = [
        { key: 'error', label: 'Xử lý lỗi (12)' },
        { key: 'no-warehouse', label: 'Chưa có kho xử lý (12)' },
        { key: 'shipping-info', label: 'Thông tin vận đơn (21)' },
    ];

    // Status tabs for abnormal cancellation
    const abnormalCancellationTabs = [
        { key: 'all', label: 'Tất cả' },
        { key: 'delivery-failed', label: 'Giao hàng thất bại', count: 75 },
        { key: 'lost-damaged', label: 'Thất lạc & hư hỏng', count: 0 },
        { key: 'cancelled-before-carrier', label: 'Huỷ trước khi giao ĐVVC', count: 0 },
        { key: 'cancelled-while-packing', label: 'Huỷ khi đang đóng gói', count: 85 }
    ];

    // Status tabs for return order view - Đơn hoàn nội sàn
    const noiSanReturnTabs = [
        { key: 'all', label: 'Tất cả' },
        { key: 'yeu-cau-hoan', label: 'Yêu cầu hoàn' },
        { key: 'dang-xu-ly', label: 'Đang xử lý' },
        { key: 'dong-y-hoan', label: 'Đồng ý hoàn' },
        { key: 'hoan-tien-thanh-cong', label: 'Hoàn tiền thành công' },
        { key: 'huy-yeu-cau-san', label: 'Huỷ yêu cầu sàn' },
        { key: 'san-dong-yeu-cau', label: 'Sàn đóng yêu cầu' }
    ];

    // Status tabs for return order view - Đơn hoàn ngoại sàn
    const ngoaiSanReturnTabs = [
        { key: 'all', label: 'Tất cả' },
        { key: 'yeu-cau-hoan', label: 'Yêu cầu hoàn' },
        { key: 'dang-xu-ly', label: 'Đang xử lý' },
        { key: 'dong-y-hoan-1', label: 'Đồng ý hoàn' },
        { key: 'dong-y-hoan-2', label: 'Đồng ý hoàn' },
        { key: 'da-hoan-tien', label: 'Đã hoàn tiền' },
        { key: 'hoan-hang-thanh-cong', label: 'Hoàn hàng thành công' },
        { key: 'huy-yeu-cau', label: 'Huỷ yêu cầu' }
    ];

    // For normal order list, combine baseStatusTabs with remainingStatusTabs (excluding secondaryStatusTabs)
    // secondaryStatusTabs will be rendered separately on the right side with divider
    const statusTabs = isAbnormalCancellation
        ? abnormalCancellationTabs
        : isReturnOrderView
            ? (orderTypeFilter === 'noi-san' ? noiSanReturnTabs : ngoaiSanReturnTabs)
            : (orderTypeFilter === 'manual' 
                ? [{ key: 'all', label: 'Tất cả' }, draftTab, ...baseStatusTabs.slice(1), ...remainingStatusTabs]
                : [...baseStatusTabs, ...remainingStatusTabs]); // Note: secondaryStatusTabs are rendered separately on the right side

    const handleSelectAll = (e) => {
        const currentPageOrderIds = orders.map(order => order.id);
        if (e.target.checked) {
            // Add all orders from current page to selectedRowKeys (cumulative)
            setSelectedRowKeys([...new Set([...selectedRowKeys, ...currentPageOrderIds])]);
        } else {
            // Remove all orders from current page when unchecked
            setSelectedRowKeys(selectedRowKeys.filter(id => !currentPageOrderIds.includes(id)));
        }
    };

    const handleSelectOrder = (orderId, checked) => {
        if (checked) {
            setSelectedRowKeys([...new Set([...selectedRowKeys, orderId])]);
        } else {
            setSelectedRowKeys(selectedRowKeys.filter(id => id !== orderId));
        }
    };

    // Get current page selected orders
    const currentPageOrderIds = orders.map(order => order.id);
    const currentPageSelectedCount = currentPageOrderIds.filter(id => selectedRowKeys.includes(id)).length;
    const isAllCurrentPageSelected = currentPageSelectedCount === orders.length && orders.length > 0;
    const isIndeterminate = currentPageSelectedCount > 0 && currentPageSelectedCount < orders.length;

    // Calculate card height based on card with gifts
    useEffect(() => {
        const updateCardHeight = () => {
            let maxHeight = 0;
            let giftCardHeight = null;
            
            // Find card with gifts and get its height
            Object.keys(cardRefs.current).forEach(orderId => {
                const cardElement = cardRefs.current[orderId];
                if (cardElement) {
                    const height = cardElement.offsetHeight;
                    const order = orders.find(o => o.id === orderId);
                    if (order && order.gifts && order.gifts.length > 0) {
                        giftCardHeight = height;
                    }
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                }
            });
            
            // Use gift card height if found, otherwise use max height
            if (giftCardHeight) {
                setCardHeight(giftCardHeight);
            } else if (maxHeight > 0) {
                setCardHeight(maxHeight);
            }
        };
        
        // Update height after render
        const timeoutId = setTimeout(updateCardHeight, 100);
        
        // Also update on window resize
        window.addEventListener('resize', updateCardHeight);
        
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateCardHeight);
        };
    }, [orders]);

    // Calculate grid columns based on selectedColumns
    const getGridTemplateColumns = () => {
        const baseColumns = ['40px']; // Checkbox column
        selectedColumns.forEach((columnName) => {
            const widthMap = {
                'Sản phẩm': '1fr',
                'Tổng tiền': '180px',
                'Người nhận': '220px',
                'Kho xử lý': '150px',
                'Xử lý': '200px',
                'Vận chuyển': '250px'
            };
            baseColumns.push(widthMap[columnName] || '1fr');
        });
        baseColumns.push('220px'); // Column for Thao tác (includes date/status and action dropdown)
        return baseColumns.join(' ');
    };

    // Get column width for specific column
    const getColumnWidth = (columnName) => {
        const widthMap = {
            'Sản phẩm': '1fr',
            'Tổng tiền': '180px',
            'Người nhận': '220px',
            'Kho xử lý': '150px',
            'Xử lý': '200px',
            'Vận chuyển': '250px'
        };
        return widthMap[columnName] || '1fr';
    };

    // Render column content based on column name
    const renderColumnContent = (order, columnName) => {
        switch(columnName) {
            case 'Sản phẩm':
    return (
                    <div style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', width: '100%', alignItems: 'flex-start' }}>
                            {order.products.map((product, pIndex) => (
                                <div key={product.id} style={{ display: 'flex', gap: 12, textAlign: 'left', alignItems: 'flex-start', width: '100%' }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ width: 60, height: 60, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
                                    />
                                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4, textAlign: 'left', width: '100%' }}>
                                            <Tooltip title={product.name} placement="top">
                                                <Text 
                                                    style={{ 
                                                        fontSize: 14, 
                                                        display: 'inline-block', 
                                                        maxWidth: '200px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        flex: 1,
                                                        color: 'rgba(0,0,0,0.88)',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {product.name}
                                                </Text>
                                            </Tooltip>
                                            <Text style={{ fontSize: 14, whiteSpace: 'nowrap', color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>
                                                × {product.quantity}
                                            </Text>
                                        </div>
                                        <div style={{ marginBottom: 4, textAlign: 'left' }}>
                                            {product.variant && (
                                                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)', textAlign: 'left' }}>{product.variant}</Text>
                                            )}
                                        </div>
                                        <div style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4, textAlign: 'left' }}>
                                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)', textAlign: 'left' }}>SKU: </Text>
                                            <span
                                                style={{
                                                    fontSize: 12,
                                                    color: hoveredSku === `${order.id}-${product.id}` ? '#1677FF' : 'rgba(0,0,0,0.65)',
                                                    cursor: 'pointer',
                                                    textDecoration: hoveredSku === `${order.id}-${product.id}` ? 'underline' : 'none',
                                                    transition: 'all 0.2s',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 4
                                                }}
                                                onMouseEnter={() => setHoveredSku(`${order.id}-${product.id}`)}
                                                onMouseLeave={() => setHoveredSku(null)}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(product.sku);
                                                }}
                                            >
                                                {product.sku}
                                                {hoveredSku === `${order.id}-${product.id}` && (
                                                    <CopyOutlined style={{ fontSize: 12, color: '#1677FF' }} />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {order.gifts && order.gifts.length > 0 && (
                                <div style={{ marginTop: 8 }}>
                                    <Popover
                                        content={
                                            <div style={{ minWidth: 300, maxWidth: 400 }}>
                                                {order.gifts.map((gift, gIndex) => (
                                                    <div key={gift.id} style={{ 
                                                        marginBottom: gIndex < order.gifts.length - 1 ? 16 : 0,
                                                        display: 'flex',
                                                        gap: 12
                                                    }}>
                                                        {gift.image && (
                                                            <img
                                                                src={gift.image}
                                                                alt={gift.name}
                                                                style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
                                                            />
                                                        )}
                                                        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, textAlign: 'left' }}>
                                                                <Tooltip title={gift.name} placement="top">
                                                                    <Text 
                                                                        style={{ 
                                                                            fontSize: 13, 
                                                                            display: 'inline-block', 
                                                                            maxWidth: '200px',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap',
                                                                            flex: 1,
                                                                            color: 'rgba(0,0,0,0.88)',
                                                                            textAlign: 'left'
                                                                        }}
                                                                    >
                                                                        {gift.name}
                                                                    </Text>
                                                                </Tooltip>
                                                                <Text style={{ fontSize: 13, whiteSpace: 'nowrap', color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>
                                                                    × {gift.quantity}
                                                                </Text>
                                                            </div>
                                                            <div style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4, textAlign: 'left' }}>
                                                                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)', textAlign: 'left' }}>SKU: </Text>
                                                                <span
                                                                    style={{
                                                                        fontSize: 12,
                                                                        color: hoveredSku === `${order.id}-gift-${gift.id}` ? '#1677FF' : 'rgba(0,0,0,0.65)',
                                                                        cursor: 'pointer',
                                                                        textDecoration: hoveredSku === `${order.id}-gift-${gift.id}` ? 'underline' : 'none',
                                                                        transition: 'all 0.2s',
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: 4
                                                                    }}
                                                                    onMouseEnter={() => setHoveredSku(`${order.id}-gift-${gift.id}`)}
                                                                    onMouseLeave={() => setHoveredSku(null)}
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(gift.sku);
                                                                    }}
                                                                >
                                                                    {gift.sku}
                                                                    {hoveredSku === `${order.id}-gift-${gift.id}` && (
                                                                        <CopyOutlined style={{ fontSize: 12, color: '#1677FF' }} />
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                        trigger="click"
                                        placement="right"
                                    >
                                        <Tag 
                                            color="orange" 
                                            icon={<GiftOutlined />} 
                                            style={{ 
                                                margin: 0, 
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                            }}
                                        >
                                            Quà tặng ({order.gifts.length}) <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                                        </Tag>
                                    </Popover>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'Tổng tiền':
                return (
                    <div style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 14, display: 'block', color: 'rgba(0,0,0,0.88)', marginBottom: 4, textAlign: 'left' }}>
                                {order.totalAmount.toLocaleString()}₫
                            </Text>
                            <Text style={{ fontSize: 12, display: 'block', color: 'rgba(0,0,0,0.65)', textAlign: 'left' }}>
                                {order.products[0]?.method || 'Thanh toán khi giao hàng'}
                            </Text>
                        </div>
                    </div>
                );
            case 'Người nhận':
                return (
                    <div style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Tooltip title={order.recipient.name} placement="top">
                                <Text 
                                    style={{ 
                                        fontSize: 14, 
                                        display: 'block', 
                                        marginBottom: 8,
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        color: 'rgba(0,0,0,0.88)',
                                        textAlign: 'left'
                                    }}
                                >
                                    {order.recipient.name}
                                </Text>
                            </Tooltip>
                            <Tooltip title={order.recipient.address} placement="top">
                                <Text 
                                    style={{ 
                                        fontSize: 14,
                                        display: 'block',
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        color: 'rgba(0,0,0,0.65)',
                                        textAlign: 'left'
                                    }}
                                >
                                    {order.recipient.address}
                                </Text>
                            </Tooltip>
                        </div>
                    </div>
                );
            case 'Kho xử lý':
                return (
                    <div style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 14, display: 'block', color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>
                                {order.warehouse}
                            </Text>
                        </div>
                    </div>
                );
            case 'Xử lý':
                return (
                    <div style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', color: 'rgba(0,0,0,0.65)', marginBottom: 4, textAlign: 'left' }}>
                                    Giao trước:
                                </Text>
                                <Text style={{ fontSize: 14, display: 'block', color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>
                                    {order.processing.shipBefore}
                                </Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', color: 'rgba(0,0,0,0.65)', marginBottom: 4, textAlign: 'left' }}>
                                    Chuẩn bị hàng trước:
                                </Text>
                                <Text style={{ fontSize: 14, display: 'block', color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>
                                    {order.processing.prepareBefore}
                                </Text>
                            </div>
                        </div>
                    </div>
                );
            case 'Vận chuyển':
                return (
                    <div style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', color: 'rgba(0,0,0,0.65)', marginBottom: 4, textAlign: 'left' }}>
                                    Hình thức:
                                </Text>
                                <Text style={{ fontSize: 14, display: 'block', color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>
                                    {order.shipping.method}
                                </Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', color: 'rgba(0,0,0,0.65)', marginBottom: 4, textAlign: 'left' }}>
                                    Mã kiện hàng:
                                </Text>
                                <Text style={{ fontSize: 14, display: 'block', color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>
                                    {order.shipping.orderId}
                                </Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', color: 'rgba(0,0,0,0.65)', marginBottom: 4, textAlign: 'left' }}>
                                    Mã vận đơn:
                                </Text>
                                <Text style={{ fontSize: 14, display: 'block', color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>
                                    {order.shipping.trackingNumber}
                                </Text>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Handle loading when switching to manual orders
    useEffect(() => {
        if (orderTypeFilter === 'manual') {
            setIsLoadingManualOrders(true);
            // Simulate loading time
            setTimeout(() => {
                setIsLoadingManualOrders(false);
            }, 1000);
        } else {
            setIsLoadingManualOrders(false);
        }
    }, [orderTypeFilter]);

    // Handle loading when switching order type in return order view
    useEffect(() => {
        if (isReturnOrderView && (orderTypeFilter === 'noi-san' || orderTypeFilter === 'ngoai-san')) {
            setIsLoadingOrderTypeSwitch(true);
            // Simulate loading time
            setTimeout(() => {
                setIsLoadingOrderTypeSwitch(false);
            }, 500);
        } else {
            setIsLoadingOrderTypeSwitch(false);
        }
    }, [orderTypeFilter, isReturnOrderView]);

    const handleActionMenuClick = (order, action) => {
        if (action === 'logistics-info') {
            setSelectedOrder(order);
            setLogisticsDrawerVisible(true);
        } else {
            // Handle other actions
            console.log('Action:', action, 'Order:', order.id);
        }
    };

    const getActionMenu = (order) => ({
        items: [
            {
                key: 'detail',
                label: 'Chi tiết',
                onClick: () => handleActionMenuClick(order, 'detail')
            },
            {
                key: 'update-shipping',
                label: 'Cập nhật vận đơn',
                onClick: () => handleActionMenuClick(order, 'update-shipping')
            },
            {
                key: 'prepare',
                label: 'Chuẩn bị hàng',
                onClick: () => handleActionMenuClick(order, 'prepare')
            },
            {
                key: 'reload',
                label: 'Tải lại',
                onClick: () => handleActionMenuClick(order, 'reload')
            },
            {
                key: 'add-note',
                label: 'Thêm ghi chú người bán',
                onClick: () => handleActionMenuClick(order, 'add-note')
            },
            {
                key: 'copy',
                label: 'Sao chép đơn',
                onClick: () => handleActionMenuClick(order, 'copy')
            },
            {
                key: 'create-after-sale',
                label: 'Tạo đơn sau bán hàng',
                onClick: () => handleActionMenuClick(order, 'create-after-sale')
            },
            {
                key: 'cancel',
                label: 'Hủy đơn',
                danger: true,
                onClick: () => handleActionMenuClick(order, 'cancel')
            },
            { type: 'divider' },
            {
                key: 'print-shipping',
                label: 'In vận đơn',
                onClick: () => handleActionMenuClick(order, 'print-shipping')
            },
            {
                key: 'print-export',
                label: 'In phiếu xuất',
                onClick: () => handleActionMenuClick(order, 'print-export')
            },
            {
                key: 'print-handover',
                label: 'In biên bản bàn giao',
                onClick: () => handleActionMenuClick(order, 'print-handover')
            }
        ]
    });

    const bulkActionsMenu = {
        items: [
            {
                key: 'bulk-reload',
                label: 'Tải lại',
                icon: <ReloadOutlined />
            },
            {
                key: 'bulk-add-tag',
                label: 'Thêm tag',
                icon: <TagsOutlined />
            },
            {
                key: 'bulk-auto-link',
                label: 'Tự động liên kết đơn',
                icon: <LinkOutlined />
            }
        ]
    };

    const { RangePicker } = DatePicker;

    // If create order screen is open, show it instead of order list
    if (createOrderModalVisible) {
        return <CreateOrderScreen onClose={() => setCreateOrderModalVisible(false)} />;
    }

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Loading Overlay for Manual Orders */}
            {isLoadingManualOrders && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <Spin size="large" />
            </div>
            )}
            
            {/* Loading Overlay for Order Type Switch in Return Order View */}
            {isLoadingOrderTypeSwitch && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <Spin size="large" />
                </div>
            )}

            {/* Batch Processing View */}
            {isBatchProcessing && (
                <div></div>
            )}

            {/* Export Actions - Above Filter Section */}
            {!isBatchProcessing && !isReturnOrderView && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <Button 
                        icon={<BookOutlined />}
                        style={{ 
                            background: 'transparent', 
                            border: 'none',
                            padding: 0,
                            color: '#1677ff',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.8';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                        }}
                        onClick={() => setGuideDrawerVisible(true)}
                    >
                        Hướng dẫn
                    </Button>
                    <Space size={14}>
                        <Button 
                            style={{ background: 'rgba(0,0,0,0.06)', border: 'none' }}
                            onClick={() => setUpdateInfoModalVisible(true)}
                        >
                            Lịch sử đơn hàng
                        </Button>
                        <Button 
                            icon={<ExportOutlined />}
                            style={{ background: 'rgba(0,0,0,0.06)', border: 'none' }}
                            onClick={() => setExportFileModalVisible(true)}
                        >
                            Xuất file
                        </Button>
                        <Tooltip title="Lịch sử xuất đơn hàng">
                            <Button 
                                icon={<HistoryOutlined />}
                                style={{ background: 'rgba(0,0,0,0.06)', border: 'none' }}
                                onClick={() => setUpdateInfoModalVisible(true)}
                            />
                        </Tooltip>
                </Space>
            </div>
            )}

            {/* Order Type Filter Card - Separate Section with Tabs */}
            {!isBatchProcessing && !isProcessReturnOrder && (
                    <Card
                    styles={{ body: { padding: 0, background: 'transparent' } }}
                    style={{ marginBottom: 14, borderRadius: 8, background: 'transparent', border: 'none' }}
                >
                    <div style={{ display: 'flex', gap: 21, padding: '12px 0', flexWrap: 'wrap', alignItems: 'center', position: 'relative' }}>
                        {(isReturnOrderView ? [
                            { value: 'noi-san', label: 'Đơn hoàn nội sàn' },
                            { value: 'ngoai-san', label: 'Đơn hoàn ngoại sàn' }
                        ] : [
                            { value: 'platform', label: 'Đơn từ sàn' },
                            { value: 'manual', label: 'Đơn thủ công' },
                            { value: 'my-orders', label: 'Đơn của tôi' },
                            { value: 'pos', label: 'Đơn POS' }
                        ]).map((option) => {
                            const isActive = orderTypeFilter === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        if (!isLoadingOrderTypeSwitch) {
                                            setOrderTypeFilter(option.value);
                                        }
                                    }}
                                    disabled={isLoadingOrderTypeSwitch}
                                    style={{
                                        border: 'none',
                                        borderBottom: isActive ? '1.74px solid #EF5941' : 'none',
                                        background: 'transparent',
                                        padding: '10px 0',
                                        cursor: isLoadingOrderTypeSwitch ? 'wait' : 'pointer',
                                        fontSize: 16,
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                        opacity: isLoadingOrderTypeSwitch ? 0.6 : 1,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                        {isLoadingOrderTypeSwitch && (
                            <Spin size="small" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }} />
                        )}
                </div>
                </Card>
            )}

            {/* Filter Section Card */}
            {!isBatchProcessing && (
                <Card
                    styles={{ body: { padding: '14px' } }}
                    style={{ marginBottom: 14, borderRadius: 8 }}
                >
                <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Thời gian tạo đơn hàng</Text>
                                <RangePicker
                                    style={{ width: '100%' }}
                                    format="HH:mm DD/MM/YYYY"
                                    showTime
                                />
                </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Sàn</Text>
                                <Select
                                    placeholder="Chọn sàn"
                                    style={{ width: '100%' }}
                                    allowClear
                                >
                                    <Option value="shopee">Shopee</Option>
                                    <Option value="tiktok">TikTok</Option>
                                    <Option value="haravan">Haravan</Option>
                                    <Option value="lazada">Lazada</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Gian hàng</Text>
                                <Select
                                    placeholder="Chọn gian hàng"
                                    style={{ width: '100%' }}
                                    allowClear
                                >
                                    <Option value="shop1">Shop 1</Option>
                                    <Option value="shop2">Shop 2</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Kho</Text>
                                <Select
                                    placeholder="Chọn kho"
                                    style={{ width: '100%' }}
                                    allowClear
                                >
                                    <Option value="warehouse1">Kho 1</Option>
                                    <Option value="warehouse2">Kho 2</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Mã đơn hàng</Text>
                                <Input.Group compact>
                                    <Input
                                        placeholder="Tìm đơn hàng"
                                        prefix={<SearchOutlined />}
                                        allowClear
                                        style={{ width: '60%' }}
                                    />
                                    <Select
                                        value={searchFilterType}
                                        onChange={setSearchFilterType}
                                        style={{ width: '40%' }}
                                        dropdownMatchSelectWidth={false}
                                        dropdownStyle={{ minWidth: '200px' }}
                                    >
                                        <Option value="order-code">Mã đơn hàng</Option>
                                        <Option value="shipping-code">Mã vận đơn</Option>
                                        <Option value="sku">SKU hàng hoá sàn</Option>
                                        <Option value="product-name">Tên sản phẩm</Option>
                                        <Option value="utm">UTM</Option>
                                        <Option value="package-code">Mã kiện hàng</Option>
                                    </Select>
                                </Input.Group>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                                <Button icon={<FilterOutlined />} style={{ width: '100%' }}>
                                    Lọc đơn hàng nâng cao
                    </Button>
            </div>
                        </Col>
                    </Row>
                </Card>
            )}

            {/* Status Tabs and Summary Card - Sticky Container */}
            <Card
                className="status-tabs-sticky-card"
                styles={{ body: { padding: 0 } }}
                style={{ 
                    marginTop: 14,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    border: '1px solid #F0F0F0'
                }}
            >
                {/* Status Tabs */}
                    <div className="status-tabs-container" style={{ 
                        display: 'flex', 
                        gap: 21, 
                        padding: '12px 16px', 
                    borderBottom: '1px solid #F0F0F0',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        backgroundColor: '#fff'
                    }}>
                    {/* Main status tabs (left side) */}
                    {statusTabs.map(tab => {
                        const isActive = activeStatusTab === tab.key;
                        const hasCount = tab.count !== undefined;
                        
                        if (isAbnormalCancellation) {
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveStatusTab(tab.key)}
                                    style={{
                                        border: 'none',
                                        borderBottom: isActive ? '1.74px solid #EF5941' : 'none',
                                        background: 'transparent',
                                        padding: '10px 0',
                                        cursor: 'pointer',
                                        fontSize: 14,
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tab.label}{hasCount !== false && tab.count !== undefined ? ` (${tab.count})` : ''}
                                </button>
                            );
                        }
                        
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveStatusTab(tab.key)}
                                style={{
                                    border: 'none',
                                    borderBottom: isActive ? '1.74px solid #EF5941' : 'none',
                                    background: 'transparent',
                                    padding: '10px 0',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)'
                                }}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                    
                    {/* Vertical Divider and Secondary Status Tabs (right side) - Only for normal order list */}
                    {!isAbnormalCancellation && !isReturnOrderView && !isBatchProcessing && (
                        <>
                            <div style={{
                                width: '1px',
                                height: '20px',
                                background: '#D9D9D9',
                                margin: '0 8px',
                                flexShrink: 0
                            }} />
                            {secondaryStatusTabs.map(tab => {
                                const isActive = activeStatusTab === tab.key;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveStatusTab(tab.key)}
                                        style={{
                                            border: 'none',
                                            borderBottom: isActive ? '1.74px solid #EF5941' : 'none',
                                            background: 'transparent',
                                            padding: '10px 0',
                                            cursor: 'pointer',
                                            fontSize: 14,
                                            fontWeight: isActive ? 600 : 400,
                                            color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)'
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </>
                    )}
                </div>
                {/* Select All Header */}
                <div style={{
                    padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                    gap: 16,
                    backgroundColor: '#fff'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <Text style={{ fontSize: 14, color: '#000000A6' }}>
                            Tổng: {totalOrders} đơn hàng
                        </Text>
                        {orderTypeFilter !== 'manual' && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 7,
                                    cursor: 'pointer',
                                    background: hoveredUpdateInfo ? 'rgba(0,0,0,0.06)' : 'transparent',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={() => setHoveredUpdateInfo(true)}
                                onMouseLeave={() => setHoveredUpdateInfo(false)}
                                onClick={() => setUpdateInfoModalVisible(true)}
                            >
                        <Badge status="success" />
                                <Text 
                                    type="secondary" 
                                    style={{ 
                                        fontSize: 14,
                                        color: hoveredUpdateInfo ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.45)',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    Lần cập nhật gần nhất: 14:02 24/12/2025
                                </Text>
                </div>
                        )}
                    </div>
                    <Space size={14}>
                        <Button 
                            icon={<SettingOutlined />}
                            onClick={() => setConfigDrawerVisible(true)}
                            style={{ height: 32 }}
                        />
                        <Dropdown
                            trigger={['click']}
                            placement="bottomRight"
                            dropdownRender={() => (
                                <div style={{
                                    background: '#fff',
                                    padding: '12px',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    minWidth: '250px'
                                }}>
                                    <Radio.Group
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        style={{ width: '100%' }}
                                    >
                                        <Space orientation="vertical" style={{ width: '100%' }}>
                                            <Radio value="order-time-oldest">Thời gian đặt hàng (cũ nhất trước)</Radio>
                                            <Radio value="order-time-newest">Thời gian đặt hàng (mới nhất trước)</Radio>
                                            <Radio value="warehouse-time-oldest">Thời gian xuất kho (cũ nhất trước)</Radio>
                                            <Radio value="warehouse-time-newest">Thời gian xuất kho (mới nhất trước)</Radio>
                                            <Radio value="delivery-deadline-oldest">Hạn giao hàng (cũ nhất trước)</Radio>
                                            <Radio value="delivery-deadline-newest">Hạn giao hàng (mới nhất trước)</Radio>
                                    </Space>
                                    </Radio.Group>
                </div>
                            )}
                        >
                            <Button icon={<SortAscendingOutlined />} style={{ height: 32 }}>
                                Sắp xếp theo
                            </Button>
                        </Dropdown>
                        {isProcessReturnOrder && (
                            <Button 
                                type="primary"
                                style={{ background: '#EF5941', borderColor: '#EF5941', height: 32 }}
                            >
                                Xử lý hàng loạt
                            </Button>
                        )}
                        {!isProcessReturnOrder && orderTypeFilter === 'platform' && (
                            <Button 
                                type="primary"
                                style={{ height: 32 }}
                                onClick={() => {
                                    // Navigate to batch processing view
                                    // This will be handled by parent component or routing
                                    window.location.href = '#/quan-tri-don-hang/xu-ly-hang-loat';
                                }}
                            >
                                Xử lý hàng loạt
                            </Button>
                        )}
                        {orderTypeFilter === 'manual' && (
                            <>
                                <Dropdown 
                                    menu={{
                                        items: [
                                            { 
                                                key: 'create-order', 
                                                label: 'Tạo đơn',
                                                onClick: () => setCreateOrderModalVisible(true)
                                            },
                                            { key: 'upload-order-file', label: 'Tải file đơn hàng' }
                                        ]
                                    }}
                                    trigger={['click']}
                                >
                                    <Button 
                                        size="small"
                                        type="primary"
                                    >
                                        Tạo đơn <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                                    </Button>
                                </Dropdown>
                                {(activeStatusTab === 'pending' || activeStatusTab === 'packing') && (
                                    <Button 
                                        size="small"
                                        style={{ background: 'rgba(0,0,0,0.06)', border: 'none' }}
                                    >
                                        Tải file vận chuyển
                                    </Button>
                                )}
                            </>
                        )}
                                    </Space>
                </div>
            </Card>

            {/* Main Content Card */}
            <div
                style={{ borderRadius: 8, marginTop: 14 }}
            >
                {/* Card List Container */}
                <div style={{ marginTop: 14, position: 'relative' }}>
                {/* Table Header / Selection Overlay */}
                {selectedRowKeys.length > 0 ? (
                <div style={{
                                display: 'flex',
                                alignItems: 'center',
                        gap: 16,
                        padding: '12px 16px',
                        marginBottom: 0
                    }}>
                        <Checkbox
                            checked={isAllCurrentPageSelected}
                            indeterminate={isIndeterminate}
                            onChange={handleSelectAll}
                        />
                        <Text style={{ fontSize: 14 }}>
                            Đã chọn <strong>{selectedRowKeys.length}</strong> đơn hàng
                        </Text>
                                    <Space>
                            <Button size="small">
                                Tải lại
                            </Button>
                            <Button size="small">
                                Thêm tag
                            </Button>
                            <Button size="small">
                                Tự động liên kết đơn
                            </Button>
                                </Space>
                    </div>
                ) : (
                    <div style={{ overflowX: guideDrawerVisible ? 'auto' : 'visible', overflowY: 'visible' }}>
                    <div 
                                        style={{
                    display: 'grid',
                            gridTemplateColumns: getGridTemplateColumns(),
                            gap: 16,
                            padding: '12px 0',
                            marginBottom: 0,
                            alignItems: 'start',
                            minWidth: guideDrawerVisible ? 'max-content' : 'auto',
                            background: 'transparent'
                        }}
                    >
                        <div style={{ 
                            padding: '0 0 0 16px', 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            position: guideDrawerVisible ? 'sticky' : 'static',
                            left: guideDrawerVisible ? 0 : 'auto',
                            background: 'transparent',
                            zIndex: guideDrawerVisible ? 10 : 1
                        }}>
                            <Checkbox
                                checked={isAllCurrentPageSelected}
                                indeterminate={isIndeterminate}
                                onChange={handleSelectAll}
                            />
                </div>
                        {selectedColumns.map((columnName, colIndex) => (
                            <div 
                                key={columnName} 
                                style={{ 
                                    padding: '0 16px', 
                                    textAlign: 'left', 
                                    display: 'flex', 
                                    alignItems: 'flex-start',
                                    position: guideDrawerVisible && columnName === 'Sản phẩm' ? 'sticky' : 'static',
                                    left: guideDrawerVisible && columnName === 'Sản phẩm' ? '40px' : 'auto',
                                    background: 'transparent',
                                    zIndex: guideDrawerVisible && columnName === 'Sản phẩm' ? 10 : 1
                                }}
                            >
                                <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>{columnName}</Text>
                            </div>
                        ))}
                        <div style={{ 
                            padding: '0 16px', 
                            textAlign: 'left', 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            position: guideDrawerVisible ? 'sticky' : 'static',
                            right: guideDrawerVisible ? 0 : 'auto',
                            background: 'transparent',
                            zIndex: guideDrawerVisible ? 10 : 1
                        }}>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)', textAlign: 'left' }}>Thao tác</Text>
                        </div>
                    </div>
                    </div>
                )}

                    {/* Order Cards List */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 12,
                        overflowX: guideDrawerVisible ? 'auto' : 'visible',
                        overflowY: 'visible'
                    }}>
                    {orders.map((order, index) => (
                        <div
                            key={order.id}
                            ref={(el) => {
                                if (el) {
                                    cardRefs.current[order.id] = el;
                                } else {
                                    delete cardRefs.current[order.id];
                                }
                            }}
                            style={{
                                borderRadius: 8,
                                border: '1px solid #F0F0F0',
                                background: '#fff',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                ...(cardHeight ? { height: `${cardHeight}px` } : {})
                            }}
                        >
                            {/* Order Header */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: getGridTemplateColumns(),
                                gap: 16,
                                padding: '12px 0',
                                background: '#FFF',
                                borderBottom: '1px solid #F0F0F0',
                                alignItems: 'start',
                                minWidth: guideDrawerVisible ? 'max-content' : 'auto'
                            }}>
                                <div style={{ 
                                    padding: '0 0 0 16px', 
                                display: 'flex',
                                    alignItems: 'flex-start',
                                    position: guideDrawerVisible ? 'sticky' : 'static',
                                    left: guideDrawerVisible ? 0 : 'auto',
                                    background: 'transparent',
                                    zIndex: guideDrawerVisible ? 9 : 1
                                }}>
                                    <Checkbox
                                        checked={selectedRowKeys.includes(order.id)}
                                        onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                                    />
                                </div>
                                <div style={{ 
                                    padding: '0 16px', 
                                    display: 'flex', 
                                    alignItems: 'flex-start',
                                    position: guideDrawerVisible && selectedColumns[0] === 'Sản phẩm' ? 'sticky' : 'static',
                                    left: guideDrawerVisible && selectedColumns[0] === 'Sản phẩm' ? '40px' : 'auto',
                                    background: 'transparent',
                                    zIndex: guideDrawerVisible && selectedColumns[0] === 'Sản phẩm' ? 9 : 1
                                }}>
                                    <Space size={8} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                padding: '2px 8px',
                                                borderRadius: 999,
                                                background: 'rgba(0,0,0,0.04)',
                                                lineHeight: 1.2
                                            }}
                                        >
                                            <img
                                                src={getChannelMeta(order.channel).logo}
                                                alt={getChannelMeta(order.channel).platformLabel}
                                                style={{
                                                    width: 14,
                                                    height: 14,
                                                    borderRadius: 3,
                                                    objectFit: 'contain',
                                                    background: '#fff'
                                                }}
                                            />
                                            <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.88)' }}>
                                                {order.shopName || 'UpBeauty'}
                                            </Text>
                                            <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>
                                                · {getChannelMeta(order.channel).platformLabel}
                                            </Text>
                                        </span>
                                        <Text style={{ fontSize: 14, textAlign: 'left' }}>Mã đơn hàng: </Text>
                                        <span
                                        style={{
                                                fontSize: 14,
                                                color: hoveredOrderId === order.id ? '#1677FF' : 'inherit',
                                                cursor: 'pointer',
                                                textDecoration: hoveredOrderId === order.id ? 'underline' : 'none',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.stopPropagation();
                                                setHoveredOrderId(order.id);
                                            }}
                                            onMouseLeave={(e) => {
                                                e.stopPropagation();
                                                setHoveredOrderId(null);
                                            }}
                                            onClick={() => {
                                                navigator.clipboard.writeText(order.id);
                                            }}
                                        >
                                            {order.id}
                                        </span>
                                        <Tooltip title="Sao chép mã đơn hàng">
                                            <CopyOutlined 
                                                style={{ 
                                                    color: hoveredOrderId === order.id ? '#1677FF' : '#BFBFBF', 
                                                    cursor: 'pointer', 
                                                    fontSize: 14,
                                                    transition: 'color 0.2s'
                                                }}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(order.id);
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.stopPropagation();
                                                    setHoveredOrderId(order.id);
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.stopPropagation();
                                                    setHoveredOrderId(null);
                                                }}
                                            />
                                        </Tooltip>
                                    </Space>
                                </div>
                                {selectedColumns.map((columnName, index) => {
                                    if (index === 0) {
                                        // First column already has "Mã đơn hàng", skip
                                        return null;
                                    }
                                    return (
                                        <div key={columnName} style={{ padding: '0 16px', display: 'flex', alignItems: 'flex-start' }}>
                                            {/* Empty cells for other columns */}
                                        </div>
                                    );
                                })}
                                <div style={{ 
                                    padding: '0 16px', 
                                    display: 'flex', 
                                    alignItems: 'flex-start', 
                                    justifyContent: 'flex-end', 
                                    gap: 8,
                                    position: guideDrawerVisible ? 'sticky' : 'static',
                                    right: guideDrawerVisible ? 0 : 'auto',
                                    background: 'transparent',
                                    zIndex: guideDrawerVisible ? 9 : 1
                                }}>
                                    <Space size={16} style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
                                        <Text type="secondary" style={{ fontSize: 13, textAlign: 'left', whiteSpace: 'nowrap' }}>
                                            {order.orderDate}
                                        </Text>
                                        <Tag
                                            color={order.status === 'cancelled' ? 'error' : order.status === 'completed' ? 'success' : 'processing'}
                                            style={{ margin: 0, flexShrink: 0 }}
                                        >
                                        {order.statusLabel}
                                    </Tag>
                                </Space>
                                </div>
                            </div>

                            {/* Order Content - Card Layout */}
                            <div 
                                style={{
                                display: 'grid',
                                    gridTemplateColumns: getGridTemplateColumns(),
                                    gap: 16,
                                    padding: 0,
                                    position: 'relative',
                                    alignItems: 'start',
                                    minWidth: guideDrawerVisible ? 'max-content' : 'auto'
                                }}
                            >
                                {/* Empty cell for checkbox column alignment */}
                                <div style={{ 
                                    padding: '16px 0 16px 16px',
                                    position: guideDrawerVisible ? 'sticky' : 'static',
                                    left: guideDrawerVisible ? 0 : 'auto',
                                    background: 'transparent',
                                    zIndex: guideDrawerVisible ? 8 : 1
                                }}></div>
                                {/* Render columns based on selectedColumns */}
                                {selectedColumns.map((columnName, colIndex) => (
                                    <div 
                                        key={columnName}
                                        style={{
                                            position: guideDrawerVisible && columnName === 'Sản phẩm' ? 'sticky' : 'static',
                                            left: guideDrawerVisible && columnName === 'Sản phẩm' ? '40px' : 'auto',
                                            background: 'transparent',
                                            zIndex: guideDrawerVisible && columnName === 'Sản phẩm' ? 8 : 1
                                        }}
                                    >
                                        {renderColumnContent(order, columnName)}
                                    </div>
                                ))}
                                {/* Thao tác column */}
                                <div style={{ 
                                    padding: '16px', 
                                    textAlign: 'left', 
                                    display: 'flex', 
                                    alignItems: 'flex-start', 
                                    justifyContent: 'flex-start',
                                    position: guideDrawerVisible ? 'sticky' : 'static',
                                    right: guideDrawerVisible ? 0 : 'auto',
                                    background: 'transparent',
                                    zIndex: guideDrawerVisible ? 8 : 1
                                }}>
                                    <Dropdown
                                        menu={getActionMenu(order)}
                                        trigger={['click']}
                                        placement="bottomRight"
                                    >
                                        <Button type="text" size="small" style={{ padding: '4px 8px' }}>
                                            Thao tác <DownOutlined style={{ fontSize: 12, marginLeft: 4 }} />
                                        </Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                                </div>

                {/* Footer / Pagination */}
                <div style={{ 
                    padding: '14px 0 0 0', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '0.87px solid #F0F0F0',
                    marginTop: 0
                }}>
                    <Select
                        className="page-size-select"
                        value={pageSize.toString()}
                        onChange={(value) => {
                            setPageSize(parseInt(value));
                            setCurrentPage(1);
                        }}
                        style={{ 
                            width: 160, 
                            background: '#fff',
                            color: 'rgba(0,0,0,0.88)'
                        }}
                        suffixIcon={<DownOutlined style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }} />}
                    >
                        <Option value="20">20 bản ghi/trang</Option>
                        <Option value="50">50 bản ghi/trang</Option>
                        <Option value="100">100 bản ghi/trang</Option>
                    </Select>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            Hiển thị {orders.length} / Tổng: {totalOrders} đơn hàng
                                        </Text>
                        <Space size={7}>
                            <Button 
                                type="text" 
                                icon={<LeftOutlined style={{ fontSize: 14 }} />}
                                style={{ width: 28, height: 28, padding: 0 }}
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            />
                            {Array.from({ length: Math.min(3, Math.ceil(totalOrders / pageSize)) }, (_, i) => {
                                const page = i + 1;
                                return (
                                    <Button 
                                        key={page}
                                        type="text"
                                        style={{ 
                                            width: 28, 
                                            height: 28, 
                                            padding: 0,
                                            background: currentPage === page ? '#fff' : 'transparent',
                                            border: currentPage === page ? '0.87px solid rgba(0,0,0,0.15)' : 'none',
                                            color: 'rgba(0,0,0,0.88)',
                                            fontWeight: currentPage === page ? 600 : 400
                                        }}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Button>
                                );
                            })}
                            <Button 
                                type="text" 
                                icon={<RightOutlined style={{ fontSize: 14 }} />}
                                style={{ width: 28, height: 28, padding: 0 }}
                                disabled={currentPage >= Math.ceil(totalOrders / pageSize)}
                                onClick={() => setCurrentPage(Math.min(Math.ceil(totalOrders / pageSize), currentPage + 1))}
                            />
                            <Button 
                                type="text" 
                                icon={<DoubleRightOutlined style={{ fontSize: 12 }} />}
                                style={{ width: 28, height: 28, padding: 0 }}
                                disabled={currentPage >= Math.ceil(totalOrders / pageSize)}
                                onClick={() => setCurrentPage(Math.ceil(totalOrders / pageSize))}
                            />
                                        </Space>
                                    </div>
                                    </div>
                                </div>

            {/* Update Info Modal */}
            <Modal
                title={null}
                open={updateInfoModalVisible}
                onCancel={() => setUpdateInfoModalVisible(false)}
                footer={null}
                width={600}
                centered
                closable={true}
                maskClosable={true}
            >
                <div style={{ padding: 0 }}>
                    {/* Header */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: 16,
                        paddingBottom: 12,
                        borderBottom: '1px solid #F0F0F0'
                    }}>
                        <Text style={{ fontSize: 14 }}>Ngày: 22 - 23/12/2025</Text>
                        <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.65)' }}>Cập nhật gần nhất lúc: 20:00 23/12/2025</Text>
                    </div>

                    {/* Shop List */}
                                <div>
                        {[
                            { name: 'upbase1', channel: 'shopee', status: '0/0' },
                            { name: 'Puka1', channel: 'haravan', status: '0/0' },
                            { name: 'Baybyyy Shop', channel: 'tiktok', status: '0/0' },
                            { name: "Puka's Shop", channel: 'shopee', status: '0/0' }
                        ].map((shop, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px 0',
                                borderBottom: index < 3 ? '1px solid #F0F0F0' : 'none'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                                    <img
                                        src={channelLogos[shop.channel] || channelLogos.default}
                                        alt={shop.channel}
                                        style={{ width: 20, height: 20, objectFit: 'contain' }}
                                        onError={(e) => {
                                            e.target.src = channelLogos.default;
                                        }}
                                    />
                                    <Text style={{ fontSize: 14 }}>{shop.name}</Text>
                                </div>
                                <div style={{ marginRight: 16 }}>
                                    <Text style={{ fontSize: 14, color: '#FF4D4F' }}>0</Text>
                                    <Text style={{ fontSize: 14 }}>/0</Text>
                                </div>
                                <Button 
                                    size="small"
                                    style={{ 
                                        background: 'rgba(0,0,0,0.06)',
                                        borderColor: 'rgba(0,0,0,0.06)',
                                        color: 'rgba(0,0,0,0.88)',
                                        fontSize: 12,
                                        height: 28
                                    }}
                                >
                                    Cập nhật
                                </Button>
                        </div>
                    ))}
                </div>
                </div>
            </Modal>

            {/* Logistics Info Drawer */}
            <Drawer
                title="Thông tin kho vận"
                placement="right"
                size={500}
                onClose={() => setLogisticsDrawerVisible(false)}
                open={logisticsDrawerVisible}
                zIndex={1003}
                mask={false}
                style={{ zIndex: 1003 }}
            >
                {selectedOrder && (
                                <div>
                        {/* Kho xử lý */}
                        <div style={{ marginBottom: 24 }}>
                            <Title level={5} style={{ marginBottom: 12 }}>Kho xử lý</Title>
                            <Text style={{ fontSize: 14 }}>{selectedOrder.warehouse}</Text>
                                </div>

                        <Divider />

                        {/* Xử lý */}
                        <div style={{ marginBottom: 24 }}>
                            <Title level={5} style={{ marginBottom: 12 }}>Xử lý</Title>
                            <Space orientation="vertical" size={12} style={{ width: '100%' }}>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Giao trước:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>{selectedOrder.processing.shipBefore}</Text>
                                    </div>
                                    </div>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Chuẩn bị hàng trước:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>{selectedOrder.processing.prepareBefore}</Text>
                                    </div>
                                </div>
                            </Space>
                                </div>

                        <Divider />

                        {/* Vận chuyển */}
                        <div>
                            <Title level={5} style={{ marginBottom: 12 }}>Vận chuyển</Title>
                            <Space orientation="vertical" size={12} style={{ width: '100%' }}>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Hình thức:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>{selectedOrder.shipping.method}</Text>
                                </div>
                            </div>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Mã kiện hàng:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <span
                                            style={{
                                                fontSize: 14,
                                                color: hoveredOrderIdInDrawer === 'orderId' ? '#1677FF' : 'rgba(0,0,0,0.88)',
                                                cursor: 'pointer',
                                                textDecoration: hoveredOrderIdInDrawer === 'orderId' ? 'underline' : 'none',
                                                transition: 'all 0.2s',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 4
                                            }}
                                            onMouseEnter={() => setHoveredOrderIdInDrawer('orderId')}
                                            onMouseLeave={() => setHoveredOrderIdInDrawer(null)}
                                            onClick={() => {
                                                navigator.clipboard.writeText(selectedOrder.shipping.orderId);
                                            }}
                                        >
                                            {selectedOrder.shipping.orderId}
                                            {hoveredOrderIdInDrawer === 'orderId' && (
                                                <CopyOutlined style={{ fontSize: 12, color: '#1677FF' }} />
                                            )}
                                        </span>
                        </div>
                </div>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Mã vận đơn:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <span
                                            style={{
                                                fontSize: 14,
                                                color: hoveredTrackingNumber === selectedOrder.shipping.trackingNumber ? '#1677FF' : 'rgba(0,0,0,0.88)',
                                                cursor: 'pointer',
                                                textDecoration: hoveredTrackingNumber === selectedOrder.shipping.trackingNumber ? 'underline' : 'none',
                                                transition: 'all 0.2s',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 4
                                            }}
                                            onMouseEnter={() => setHoveredTrackingNumber(selectedOrder.shipping.trackingNumber)}
                                            onMouseLeave={() => setHoveredTrackingNumber(null)}
                                            onClick={() => {
                                                navigator.clipboard.writeText(selectedOrder.shipping.trackingNumber);
                                            }}
                                        >
                                            {selectedOrder.shipping.trackingNumber}
                                            {hoveredTrackingNumber === selectedOrder.shipping.trackingNumber && (
                                                <CopyOutlined style={{ fontSize: 12, color: '#1677FF' }} />
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </Space>
                        </div>
                    </div>
                )}
            </Drawer>

            {/* Overlay mask for drawer - darkens background */}
            {logisticsDrawerVisible && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1002,
                        pointerEvents: 'auto',
                        background: 'rgba(0, 0, 0, 0.45)',
                        transition: 'background 0.3s ease'
                    }}
                    onClick={() => setLogisticsDrawerVisible(false)}
                />
            )}

            {/* Export File Modal */}
            <Modal
                title="Xuất file"
                open={exportFileModalVisible}
                onCancel={() => {
                    setExportFileModalVisible(false);
                    setExportOption(null);
                    setExportShopOption(null);
                }}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setExportFileModalVisible(false);
                        setExportOption(null);
                        setExportShopOption(null);
                    }}>
                        Huỷ
                    </Button>,
                    <Button 
                        key="export" 
                        type="primary"
                        disabled={!exportOption}
                        onClick={() => {
                            if (exportOption) {
                                console.log('Export:', exportOption, exportShopOption);
                                setExportFileModalVisible(false);
                                setExportOption(null);
                                setExportShopOption(null);
                            }
                        }}
                    >
                        Xuất
                                    </Button>
                ]}
                width={500}
            >
                <div style={{ padding: '8px 0' }}>
                    <div style={{ marginBottom: 20 }}>
                        <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>
                            Xuất đơn hàng
                        </Text>
                        <Radio.Group
                            value={exportOption}
                            onChange={(e) => {
                                setExportOption(e.target.value);
                                if (e.target.value !== 'export-orders-filter') {
                                    setExportShopOption(null);
                                }
                            }}
                            style={{ width: '100%' }}
                        >
                            <Space orientation="vertical" style={{ width: '100%' }}>
                                <div>
                                    <Radio value="export-orders-filter">Theo bộ lọc</Radio>
                                    {exportOption === 'export-orders-filter' && (
                                        <div style={{ marginLeft: 24, marginTop: 8 }}>
                                            <Radio.Group
                                                value={exportShopOption}
                                                onChange={(e) => setExportShopOption(e.target.value)}
                                            >
                                                <Space orientation="vertical">
                                                    <Radio value="merge-all">Gộp tất cả gian hàng</Radio>
                                                    <Radio value="separate-shops">Tách từng gian hàng</Radio>
                                                </Space>
                                            </Radio.Group>
                                </div>
                                    )}
                            </div>
                                <Radio value="export-orders-custom">Theo tuỳ chỉnh</Radio>
                            </Space>
                        </Radio.Group>
                        </div>
                    <Divider style={{ margin: '16px 0' }} />
                    <div>
                        <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>
                            Xuất giao dịch thanh toán
                        </Text>
                        <Radio.Group
                            value={exportOption}
                            onChange={(e) => {
                                setExportOption(e.target.value);
                                setExportShopOption(null);
                            }}
                            style={{ width: '100%' }}
                        >
                            <Space orientation="vertical" style={{ width: '100%' }}>
                                <Radio value="export-payment-filter">Theo bộ lọc</Radio>
                                <Radio value="export-payment-custom">Theo tuỳ chỉnh</Radio>
                            </Space>
                        </Radio.Group>
                </div>
                </div>
            </Modal>

            {/* Config Drawer */}
            <Drawer
                title={<Text strong style={{ fontSize: 16 }}>Cấu hình hiển thị</Text>}
                placement="right"
                open={configDrawerVisible}
                onClose={() => setConfigDrawerVisible(false)}
                size={400}
                footer={
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="primary"
                            onClick={() => {
                                console.log('Selected columns:', selectedColumns);
                                setConfigDrawerVisible(false);
                            }}
                            style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                        >
                            Lưu
                        </Button>
                    </div>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(() => {
                        const allColumns = [...selectedColumns, ...availableColumns];
                        const fixedColumns = ['Sản phẩm', 'Tổng tiền', 'Người nhận'];
                        
                        const moveColumn = (column, direction) => {
                            const currentIndex = selectedColumns.indexOf(column);
                            if (currentIndex === -1) return;
                            
                            const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
                            if (newIndex < 0 || newIndex >= selectedColumns.length) return;
                            
                            const newSelectedColumns = [...selectedColumns];
                            [newSelectedColumns[currentIndex], newSelectedColumns[newIndex]] = 
                                [newSelectedColumns[newIndex], newSelectedColumns[currentIndex]];
                            setSelectedColumns(newSelectedColumns);
                        };
                        
                        return allColumns.map((column) => {
                            const isSelected = selectedColumns.includes(column);
                            const isFixed = fixedColumns.includes(column);
                            const selectedIndex = selectedColumns.indexOf(column);
                            const canMoveUp = isSelected && !isFixed && selectedIndex > 0;
                            const canMoveDown = isSelected && !isFixed && selectedIndex < selectedColumns.length - 1;
                            const isHovered = hoveredColumn === column;
                            
                            return (
                                <div
                                    key={column}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '8px 12px',
                                        border: '1px solid #F0F0F0',
                                        borderRadius: 4,
                                        position: 'relative'
                                    }}
                                    onMouseEnter={() => setHoveredColumn(column)}
                                    onMouseLeave={() => setHoveredColumn(null)}
                                >
                                    <Checkbox
                                        checked={isSelected}
                                        disabled={isFixed}
                                        onChange={(e) => {
                                            if (e.target.checked && !isFixed) {
                                                if (selectedColumns.length < 5) { // max 5 columns (3 fixed + 2 others)
                                                    setSelectedColumns([...selectedColumns, column]);
                                                    setAvailableColumns(availableColumns.filter(c => c !== column));
                                                }
                                            } else if (!e.target.checked && !isFixed) {
                                                setSelectedColumns(selectedColumns.filter(c => c !== column));
                                                setAvailableColumns([...availableColumns, column]);
                                            }
                                        }}
                                    >
                                        <span style={{ color: 'rgba(0,0,0,0.88)' }}>{column}</span>
                                    </Checkbox>
                                    {isSelected && isHovered && (
                                        <Dropdown
                                            menu={{
                                                items: [
                                                    {
                                                        key: 'move-up',
                                                        label: 'Di chuyển lên',
                                                        icon: <UpOutlined />,
                                                        disabled: !canMoveUp,
                                                        onClick: () => moveColumn(column, 'up')
                                                    },
                                                    {
                                                        key: 'move-down',
                                                        label: 'Di chuyển xuống',
                                                        icon: <DownOutlined />,
                                                        disabled: !canMoveDown,
                                                        onClick: () => moveColumn(column, 'down')
                                                    }
                                                ]
                                            }}
                                            trigger={['click']}
                                            placement="bottomRight"
                                        >
                                            <Button
                                                type="text"
                                                size="small"
                                                icon={<MenuOutlined />}
                                                style={{ 
                                                    marginLeft: 'auto',
                                                    padding: 0,
                                                    width: 24,
                                                    height: 24,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'rgba(0,0,0,0.45)'
                                                }}
                                            />
                    </Dropdown>
                                    )}
                                </div>
                            );
                        });
                    })()}
                </div>
            </Drawer>

            {/* Guide Drawer - Split Screen */}
            <Drawer
                title={<Text strong style={{ fontSize: 14 }}>Hướng dẫn xử lý đơn hàng</Text>}
                placement="right"
                open={guideDrawerVisible}
                onClose={() => setGuideDrawerVisible(false)}
                size={300}
                mask={false}
                zIndex={1001}
                className="guide-drawer-split"
                drawerStyle={{
                    top: 64,
                    height: 'calc(100vh - 64px)',
                    width: '300px',
                    maxWidth: '300px',
                    paddingTop: 0,
                    position: 'fixed',
                    right: 0
                }}
                contentWrapperStyle={{
                    top: 64,
                    height: 'calc(100vh - 64px)',
                    width: '300px',
                    maxWidth: '300px',
                    position: 'fixed',
                    right: 0
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 12px', overflowY: 'auto', height: '100%' }}>
                    {[
                        {
                            title: 'Chuẩn bị hàng',
                            description: [
                                'Tại màn Quản trị đơn hàng → Click Đóng gói → Chọn Chờ đóng gói.',
                                'Nhấp Chọn → Nhấn Chuẩn bị hàng →',
                                'Hệ thống sẽ load Chuẩn bị hàng → Đơn được chuyển sang trạng thái Đang đóng gói.'
                            ]
                        },
                        {
                            title: 'In vận đơn',
                            description: 'Khi đơn ở trạng thái Đang đóng gói, nhấn Chọn → chọn In vận đơn, thao tác in đơn và gói hàng.'
                        },
                        {
                            title: 'Gom hàng',
                            description: 'Tập hợp và sắp xếp sản phẩm của cùng một đơn hàng. Đảm bảo đã gom đầy đủ trước khi đóng gói.'
                        },
                        {
                            title: 'Đóng hàng',
                            description: 'Đóng gói vào thùng/hộp phù hợp, dán vận đơn. Đảm bảo đóng gói chắc chắn, an toàn.'
                        },
                        {
                            title: 'Sẵn sàng giao',
                            description: [
                                'Sau khi đơn gói hàng, nhấn Chọn → Sẵn sàng giao',
                                'Hệ thống sẽ tự động tạo phiếu xuất kho, trừ tồn kho thực tế và đơn hàng sẽ được chuyển sang trạng thái Chờ lấy hàng.'
                            ]
                        },
                        {
                            title: 'Chia đơn theo ĐVVC',
                            description: 'Khi đơn hàng ở trạng thái Chờ lấy hàng, thực hiện In phiếu xuất (nếu cần) và In phiếu bàn giao để bàn giao cho ĐVVC.'
                        },
                        {
                            title: 'Bàn giao cho ĐVVC',
                            description: 'Bàn giao đơn hàng đã phân loại cho đơn vị vận chuyển. Đối soát số lượng và ký xác nhận.'
                        }
                    ].map((step, index) => {
                        const isActive = activeStep === index;
                        return (
                            <div 
                                key={index} 
                                style={{ 
                                    paddingBottom: 12, 
                                    borderBottom: index < 6 ? '1px solid #F0F0F0' : 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => setActiveStep(index)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        background: isActive ? '#1677FF' : 'rgba(0,0,0,0.25)',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 10,
                                        fontWeight: 600,
                                        flexShrink: 0,
                                        transition: 'background 0.2s'
                                    }}>
                                        {index + 1}
                    </div>
                                    <div style={{ flex: 1, minWidth: 0, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: isActive ? 8 : 0 }}>
                                            <Text strong style={{ 
                                                fontSize: 13, 
                                                color: isActive ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.65)',
                                                transition: 'color 0.2s',
                                                wordWrap: 'break-word',
                                                overflowWrap: 'break-word',
                                                lineHeight: '18px'
                                            }}>
                                                {step.title}
                                            </Text>
                                            {(step.title === 'Gom hàng' || step.title === 'Đóng hàng' || step.title === 'Chia đơn theo ĐVVC' || step.title === 'Bàn giao cho ĐVVC') && (
                                                <Tooltip title="Thao tác này sẽ được thực hiện ngoài UpS" placement="top">
                                                    <InfoCircleOutlined style={{ 
                                                        fontSize: 12, 
                                                        color: 'rgba(0,0,0,0.45)',
                                                        cursor: 'help',
                                                        flexShrink: 0
                                                    }} />
                                                </Tooltip>
                                            )}
                </div>
                                        {isActive && (
                                            <div style={{ 
                                                fontSize: 12, 
                                                color: 'rgba(0,0,0,0.65)', 
                                                lineHeight: 1.6,
                                                wordWrap: 'break-word',
                                                overflowWrap: 'break-word'
                                            }}>
                                                {renderDescriptionWithHighlights(step.description)}
                </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Drawer>

        </div>
    );
};

export default OrderList;
