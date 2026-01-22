import React from 'react';
import BatchProcessingView from './BatchProcessingView';
import './index.css';

const OrderProcessing = () => {
    return (
        <div style={{ minHeight: '100vh' }} className="order-processing-tabs">
            <BatchProcessingView />
        </div>
    );
};

export default OrderProcessing;
