import React from 'react';
import { Select, Button, Space, Typography } from 'antd';
import { LeftOutlined, RightOutlined, DoubleRightOutlined, DownOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

/**
 * Pagination footer matching OrderList.jsx style.
 * @param {number} total - Total number of items
 * @param {number} currentPage - 1-based current page
 * @param {number} pageSize - Items per page
 * @param {(page: number) => void} onPageChange
 * @param {(size: number) => void} onPageSizeChange
 * @param {string} label - Unit label e.g. "đơn hàng", "quy tắc", "sản phẩm"
 * @param {Array<{value: number, label: string}>} pageSizeOptions
 */
const PaginationFooter = ({
    total = 0,
    currentPage = 1,
    pageSize = 20,
    onPageChange,
    onPageSizeChange,
    label = 'bản ghi',
    pageSizeOptions = [
        { value: 20, label: '20 bản ghi/trang' },
        { value: 50, label: '50 bản ghi/trang' },
        { value: 100, label: '100 bản ghi/trang' }
    ]
}) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const from = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, total);

    const handlePageSizeChange = (value) => {
        const size = parseInt(value, 10);
        onPageSizeChange && onPageSizeChange(size);
        onPageChange && onPageChange(1);
    };

    return (
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
                onChange={handlePageSizeChange}
                style={{
                    width: 160,
                    background: '#fff',
                    color: 'rgba(0,0,0,0.88)'
                }}
                suffixIcon={<DownOutlined style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }} />}
            >
                {pageSizeOptions.map((opt) => (
                    <Option key={opt.value} value={String(opt.value)}>{opt.label}</Option>
                ))}
            </Select>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                    Hiển thị {total === 0 ? 0 : `${from}-${to}`} / Tổng: {total} {label}
                </Text>
                <Space size={7}>
                    <Button
                        type="text"
                        icon={<LeftOutlined style={{ fontSize: 14 }} />}
                        style={{ width: 28, height: 28, padding: 0 }}
                        disabled={currentPage === 1}
                        onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
                    />
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                        const page = i + 1;
                        const isCurrent = currentPage === page;
                        return (
                            <Button
                                key={page}
                                type="text"
                                style={{
                                    width: 28,
                                    height: 28,
                                    padding: 0,
                                    background: isCurrent ? '#fff' : 'transparent',
                                    border: isCurrent ? '0.87px solid rgba(0,0,0,0.15)' : 'none',
                                    color: 'rgba(0,0,0,0.88)',
                                    fontWeight: isCurrent ? 600 : 400
                                }}
                                onClick={() => onPageChange && onPageChange(page)}
                            >
                                {page}
                            </Button>
                        );
                    })}
                    <Button
                        type="text"
                        icon={<RightOutlined style={{ fontSize: 14 }} />}
                        style={{ width: 28, height: 28, padding: 0 }}
                        disabled={currentPage >= totalPages}
                        onClick={() => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))}
                    />
                    <Button
                        type="text"
                        icon={<DoubleRightOutlined style={{ fontSize: 12 }} />}
                        style={{ width: 28, height: 28, padding: 0 }}
                        disabled={currentPage >= totalPages}
                        onClick={() => onPageChange && onPageChange(totalPages)}
                    />
                </Space>
            </div>
        </div>
    );
};

export default PaginationFooter;
