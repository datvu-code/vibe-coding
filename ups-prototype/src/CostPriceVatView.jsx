import React, { useState } from 'react';
import {
  Card, Row, Col, Input, Button, Table, Empty, Typography, Checkbox, Space
} from 'antd';
import { SearchOutlined, FilterOutlined, UploadOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;

const CostPriceVatView = () => {
  const [search, setSearch] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const mockData = [
    { id: 1, name: '[NGỌC] test hh kho có HSD', sku: '001628NTHKCH-1762329332', merchandise: '001628NTHKCH-1762329382', costPrice: '--', vat: '5%' },
    { id: 2, name: 'XUANMO Local brand Áo baby tee...', sku: 'SKU-002', merchandise: 'MA_001', costPrice: '0 ₫', vat: '2%' }
  ];
  const pageData = mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const total = mockData.length;

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 320,
      render: (name, row) => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Checkbox
            checked={selectedRowKeys.includes(row.id)}
            onChange={e => {
              if (e.target.checked) setSelectedRowKeys([...selectedRowKeys, row.id]);
              else setSelectedRowKeys(selectedRowKeys.filter(k => k !== row.id));
            }}
          />
          <div style={{ width: 48, height: 48, background: '#f0f0f0', borderRadius: 4 }} />
          <div>
            <Text style={{ fontSize: 14, display: 'block' }}>{name}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>{row.sku}</Text>
          </div>
        </div>
      )
    },
    {
      title: 'Hàng hóa',
      dataIndex: 'merchandise',
      key: 'merchandise',
      width: 180,
      render: t => <Text style={{ fontSize: 13 }}>{t}</Text>
    },
    { title: 'Giá vốn', dataIndex: 'costPrice', key: 'costPrice', width: 100, align: 'right' },
    { title: 'VAT', dataIndex: 'vat', key: 'vat', width: 80, align: 'right' }
  ];

  return (
    <div>
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, border: '1px solid #F0F0F0' }}>
        {/* Search + Filter */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 12]}>
            <Col xs={24} md={12}>
              <Input
                placeholder="Tên sản phẩm/SKU"
                prefix={<SearchOutlined />}
                value={search}
                onChange={e => setSearch(e.target.value)}
                allowClear
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} md={6}>
              <Button icon={<FilterOutlined />}>Lọc sản phẩm</Button>
            </Col>
          </Row>
        </div>

        {/* Action bar */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <Text>Đã chọn: {selectedRowKeys.length} sản phẩm</Text>
            <Button style={{ marginLeft: 12 }}>Sửa giá và VAT</Button>
          </div>
          <Button icon={<UploadOutlined />}>Thêm file</Button>
        </div>

        <Table
          columns={columns}
          dataSource={pageData}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có dữ liệu" /> }}
        />

        <div style={{ padding: '0 16px 14px' }}>
          <PaginationFooter
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            label="sản phẩm"
          />
        </div>
      </Card>
    </div>
  );
};

export default CostPriceVatView;
