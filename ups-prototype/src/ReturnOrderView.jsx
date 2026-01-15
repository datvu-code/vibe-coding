import React, { useState } from 'react';
import { Tabs, Button, Space, Tooltip } from 'antd';
import { BookOutlined, ExportOutlined, HistoryOutlined, ReloadOutlined } from '@ant-design/icons';
import OrderList from './OrderList';
import './index.css';

const ReturnOrderView = () => {
    const [activeTab, setActiveTab] = useState('don-hoan');
    const [guideDrawerVisible, setGuideDrawerVisible] = useState(false);
    const [exportFileModalVisible, setExportFileModalVisible] = useState(false);
    const [updateInfoModalVisible, setUpdateInfoModalVisible] = useState(false);

    const tabItems = [
        {
            key: 'don-hoan',
            label: 'Đơn hoàn',
            children: (
                <OrderList 
                    isReturnOrderView={true}
                    guideDrawerVisible={guideDrawerVisible}
                    setGuideDrawerVisible={setGuideDrawerVisible}
                    exportFileModalVisible={exportFileModalVisible}
                    setExportFileModalVisible={setExportFileModalVisible}
                    updateInfoModalVisible={updateInfoModalVisible}
                    setUpdateInfoModalVisible={setUpdateInfoModalVisible}
                />
            )
        },
        {
            key: 'don-huy-bat-thuong',
            label: 'Đơn huỷ bất thường',
            children: (
                <OrderList 
                    isAbnormalCancellation={true} 
                    isReturnOrderView={true}
                    guideDrawerVisible={guideDrawerVisible}
                    setGuideDrawerVisible={setGuideDrawerVisible}
                    exportFileModalVisible={exportFileModalVisible}
                    setExportFileModalVisible={setExportFileModalVisible}
                    updateInfoModalVisible={updateInfoModalVisible}
                    setUpdateInfoModalVisible={setUpdateInfoModalVisible}
                />
            )
        }
    ];

    return (
        <div style={{ minHeight: '100vh' }} className="order-processing-tabs">
            {/* Action Buttons - Above Tabs */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 14,
                padding: '0 24px'
            }}>
                <Button 
                    icon={<BookOutlined />}
                    style={{ 
                        background: 'transparent', 
                        border: 'none',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.06)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
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
                            icon={<ReloadOutlined />}
                            style={{ background: 'rgba(0,0,0,0.06)', border: 'none' }}
                            onClick={() => {}}
                        />
                    </Tooltip>
                </Space>
            </div>
            
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                style={{ marginBottom: 0 }}
            />
        </div>
    );
};

export default ReturnOrderView;
