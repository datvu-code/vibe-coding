import React, { useState, useEffect } from 'react';
import {
    Card, Button, Input, Space, Tag, Typography, Select, DatePicker,
    Table, Tooltip, Row, Col, Drawer, Progress
} from 'antd';
import {
    SearchOutlined, CopyOutlined, InfoCircleOutlined, DownOutlined,
    PlusOutlined, CloseOutlined, BookOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ProcessByList = () => {
    const [dateRange, setDateRange] = useState([dayjs('2026-01-03'), dayjs('2026-01-09')]);
    const [warehouse, setWarehouse] = useState(null);
    const [listCode, setListCode] = useState('');
    const [listType, setListType] = useState(null);
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [guideDrawerVisible, setGuideDrawerVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(0); // Step 1 is active by default (index 0)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

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

    // Helper function to highlight keywords in descriptions
    const highlightText = (text) => {
        if (!text) return '';
        const keywords = ['Tạo danh sách', 'Chuẩn bị hàng', 'In phiếu nhặt hàng', 'In vận đơn', 'Sẵn sàng giao', 
                         'Chọn', 'Nhấn', 'Click', 'Hệ thống', 'Đơn hàng', 'Danh sách'];
        let highlighted = text;
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            highlighted = highlighted.replace(regex, '<strong>$1</strong>');
        });
        return highlighted;
    };

    // Helper function to render description with highlights
    const renderDescriptionWithHighlights = (description) => {
        if (!description) return null;
        
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

    // Mock data
    const mockData = [
        {
            key: '1',
            listCode: 'PTS_1040_PL_27886',
            packageCount: 9,
            listType: 'Đơn hỗn hợp',
            status: 'Đang đóng hàng (8/9)',
            statusType: 'packing',
            staff: 'khanhan',
            createdAt: '08/01/2026 15:56'
        },
        {
            key: '2',
            listCode: 'PTS_1040_PL_27887',
            packageCount: 12,
            listType: 'Đơn hỗn hợp',
            status: 'Đã đóng hàng',
            statusType: 'packed',
            staff: 'khanhan',
            createdAt: '08/01/2026 14:32'
        },
        {
            key: '3',
            listCode: 'PTS_1040_PL_27888',
            packageCount: 5,
            listType: 'Đơn hỗn hợp',
            status: 'Đã đóng hàng',
            statusType: 'packed',
            staff: 'khanhan',
            createdAt: '08/01/2026 13:15'
        }
    ];

    const statusTabCounts = { new: 0, ready: 0, packing: 4, packed: 48, cancelled: 1 };
    const totalAll = Object.values(statusTabCounts).reduce((a, b) => a + b, 0);
    const statusTabs = [
        { key: 'all', label: 'Tất cả', count: totalAll },
        { key: 'new', label: 'Mới', count: 0 },
        { key: 'ready', label: 'Sẵn sàng đóng', count: 0 },
        { key: 'packing', label: 'Đang đóng hàng', count: 4 },
        { key: 'packed', label: 'Đã đóng hàng', count: 48 },
        { key: 'cancelled', label: 'Huỷ', count: 1 }
    ];

    const columns = [
        {
            title: 'Mã danh sách',
            dataIndex: 'listCode',
            key: 'listCode',
            render: (text) => (
                <Space>
                    <Text 
                        style={{ 
                            color: '#1677FF', 
                            cursor: 'pointer',
                            fontSize: 14
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(text);
                        }}
                    >
                        {text}
                    </Text>
                    <CopyOutlined 
                        style={{ 
                            color: '#1677FF', 
                            cursor: 'pointer',
                            fontSize: 12
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(text);
                        }}
                    />
                </Space>
            )
        },
        {
            title: 'Số lượng kiện hàng',
            dataIndex: 'packageCount',
            key: 'packageCount',
            render: (text) => <Text style={{ fontSize: 14 }}>{text}</Text>
        },
        {
            title: 'Loại danh sách',
            dataIndex: 'listType',
            key: 'listType',
            render: (text) => <Text style={{ fontSize: 14 }}>{text}</Text>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                if (record.statusType === 'packed') {
                    return (
                        <Text 
                            style={{ 
                                color: '#1677FF', 
                                cursor: 'pointer',
                                fontSize: 14
                            }}
                        >
                            {text}
                        </Text>
                    );
                }
                return <Text style={{ fontSize: 14 }}>{text}</Text>;
            }
        },
        {
            title: 'Nhân viên phụ trách',
            dataIndex: 'staff',
            key: 'staff',
            render: (text) => <Text style={{ fontSize: 14 }}>{text}</Text>
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => <Text style={{ fontSize: 14 }}>{text}</Text>
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: () => (
                <Button 
                    type="default"
                    style={{ fontSize: 14 }}
                >
                    Chọn <DownOutlined />
                </Button>
            )
        }
    ];

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Hướng dẫn Button and Tạo danh sách */}
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
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                        background: '#EF5941',
                        borderColor: '#EF5941',
                        fontSize: 14
                    }}
                >
                    Tạo danh sách
                </Button>
            </div>

            {/* Main Card: Tabs → Filter → Summary → Table */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    border: '1px solid #F0F0F0'
                }}
            >
                {/* Status Tabs */}
                <div style={{
                    display: 'flex',
                    gap: 21,
                    padding: '12px 16px',
                    borderBottom: '1px solid #F0F0F0',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    backgroundColor: '#fff'
                }}>
                    {statusTabs.map((tab) => {
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
                                    color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        );
                    })}
                </div>

                {/* Filter Section */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Thời gian</Text>
                                <RangePicker
                                    value={dateRange}
                                    onChange={(dates) => setDateRange(dates)}
                                    format="DD/MM/YYYY"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Kho vật lý</Text>
                                <Select
                                    placeholder="Chọn kho"
                                    value={warehouse}
                                    onChange={setWarehouse}
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
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Mã danh sách</Text>
                                <Input
                                    placeholder="Tìm mã danh sách"
                                    prefix={<SearchOutlined />}
                                    value={listCode}
                                    onChange={(e) => setListCode(e.target.value)}
                                    style={{ fontSize: 14 }}
                                />
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Loại danh sách</Text>
                                <Select
                                    placeholder="Chọn loại"
                                    value={listType}
                                    onChange={setListType}
                                    style={{ width: '100%' }}
                                    allowClear
                                >
                                    <Option value="mixed">Đơn hỗn hợp</Option>
                                    <Option value="single">Đơn đơn lẻ</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Summary Line */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 14 }}>
                        Tổng số lượng kiện hàng đã xử lý theo bộ lọc : <strong>2,584</strong>
                    </Text>
                    <Tooltip title="Thông tin về số lượng kiện hàng">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14 }} />
                    </Tooltip>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <Table
                        columns={columns}
                        dataSource={mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                        pagination={false}
                        style={{ fontSize: 14 }}
                    />
                </div>

                {/* Pagination Footer */}
                <div style={{ padding: '0 16px 14px' }}>
                    <PaginationFooter
                        total={mockData.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="danh sách"
                    />
                </div>
            </Card>

            {/* Guide Drawer - Split Screen */}
            <Drawer
                title={<Text strong style={{ fontSize: 14 }}>Hướng dẫn xử lý theo danh sách</Text>}
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
                            title: 'Tạo danh sách',
                            description: [
                                'Bước đầu tiên trong quy trình xử lý theo danh sách. Người dùng sẽ tạo một danh sách mới bằng cách chọn các đơn hàng cần xử lý.',
                                'Sau đó hệ thống sẽ tự động nhóm các đơn hàng lại với nhau để tối ưu hóa quy trình đóng gói và vận chuyển.'
                            ]
                        },
                        {
                            title: 'Chuẩn bị hàng',
                            description: [
                                'Sau khi danh sách đã được tạo, nhân viên sẽ tiến hành chuẩn bị hàng hóa theo từng đơn trong danh sách.',
                                'Bước này bao gồm việc kiểm tra số lượng, chất lượng sản phẩm và đảm bảo tất cả các mặt hàng đã được chuẩn bị đầy đủ trước khi chuyển sang bước tiếp theo.'
                            ]
                        },
                        {
                            title: 'In phiếu nhặt hàng',
                            description: [
                                'Sau khi hàng đã được chuẩn bị, hệ thống sẽ tự động tạo phiếu nhặt hàng.',
                                'Phiếu này chứa thông tin chi tiết về các sản phẩm cần nhặt từ kho, giúp nhân viên kho dễ dàng thực hiện việc nhặt hàng một cách chính xác và hiệu quả.'
                            ]
                        },
                        {
                            title: 'In vận đơn',
                            description: [
                                'Khi hàng đã được nhặt và chuẩn bị xong, hệ thống sẽ tạo vận đơn cho từng đơn hàng.',
                                'Vận đơn chứa thông tin giao hàng, địa chỉ người nhận và các thông tin cần thiết khác để đảm bảo quá trình vận chuyển diễn ra suôn sẻ.'
                            ]
                        },
                        {
                            title: 'Sẵn sàng giao',
                            description: [
                                'Đây là bước cuối cùng trong quy trình xử lý theo danh sách. Tất cả các đơn hàng trong danh sách đã được đóng gói, dán nhãn vận đơn và sẵn sàng để bàn giao cho đơn vị vận chuyển.',
                                'Hệ thống sẽ tự động cập nhật trạng thái và tạo phiếu xuất kho.'
                            ]
                        }
                    ].map((step, index) => {
                        const isActive = activeStep === index;
                        return (
                            <div 
                                key={index} 
                                style={{ 
                                    paddingBottom: 12, 
                                    borderBottom: index < 4 ? '1px solid #F0F0F0' : 'none',
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
                                        <Text strong style={{ 
                                            fontSize: 13, 
                                            display: 'block', 
                                            marginBottom: isActive ? 8 : 0, 
                                            color: isActive ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.65)',
                                            transition: 'color 0.2s',
                                            wordWrap: 'break-word',
                                            overflowWrap: 'break-word',
                                            lineHeight: '18px'
                                        }}>
                                            {step.title}
                                        </Text>
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

export default ProcessByList;
