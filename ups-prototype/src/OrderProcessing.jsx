import React, { useState } from 'react';
import { Tabs } from 'antd';
import ProcessByList from './ProcessByList';
import BatchProcessingView from './BatchProcessingView';
import './index.css';

const OrderProcessing = () => {
    const [activeTab, setActiveTab] = useState('batch');

    const tabItems = [
        {
            key: 'batch',
            label: 'Hàng loạt',
            children: <BatchProcessingView />
        },
        {
            key: 'list',
            label: 'Theo danh sách',
            children: <ProcessByList />
        }
    ];

    return (
        <div style={{ minHeight: '100vh' }} className="order-processing-tabs">
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                style={{ marginBottom: 0 }}
            />
        </div>
    );
};

export default OrderProcessing;
