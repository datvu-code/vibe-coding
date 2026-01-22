import React, { useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { BookOutlined, ExportOutlined, HistoryOutlined, ReloadOutlined } from '@ant-design/icons';
import OrderList from './OrderList';
import './index.css';

const ReturnOrderOnlyView = () => {
    const [guideDrawerVisible, setGuideDrawerVisible] = useState(false);
    const [exportFileModalVisible, setExportFileModalVisible] = useState(false);
    const [updateInfoModalVisible, setUpdateInfoModalVisible] = useState(false);

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Action Buttons - Above Content */}
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
                            icon={<ReloadOutlined />}
                            style={{ background: 'rgba(0,0,0,0.06)', border: 'none' }}
                            onClick={() => {}}
                        />
                    </Tooltip>
                </Space>
            </div>
            
            {/* OrderList with return order view - shows Đơn hoàn nội sàn and Đơn hoàn ngoại sàn tabs */}
            <OrderList 
                isReturnOrderView={true}
                guideDrawerVisible={guideDrawerVisible}
                setGuideDrawerVisible={setGuideDrawerVisible}
                exportFileModalVisible={exportFileModalVisible}
                setExportFileModalVisible={setExportFileModalVisible}
                updateInfoModalVisible={updateInfoModalVisible}
                setUpdateInfoModalVisible={setUpdateInfoModalVisible}
            />
        </div>
    );
};

export default ReturnOrderOnlyView;
