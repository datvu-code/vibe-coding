import React, { useState } from 'react';
import { Card, Row, Col, Select, DatePicker, Button, Table, Empty, Typography } from 'antd';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const CostView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const columns = [
    { title: 'Tên chi phí', dataIndex: 'name', key: 'name', width: 200 },
    { title: 'Khoản mục chi phí', dataIndex: 'item', key: 'item', width: 160 },
    { title: 'Tổng chi phí', dataIndex: 'total', key: 'total', width: 120, align: 'right' },
    { title: 'Gian hàng phân bổ', dataIndex: 'store', key: 'store', width: 140 },
    { title: 'Cách phân bổ', dataIndex: 'method', key: 'method', width: 120 },
    { title: 'Thời gian phân bổ', dataIndex: 'time', key: 'time', width: 140 },
    { title: 'Thao tác', dataIndex: 'action', key: 'action', width: 100 }
  ];

  const dataSource = [];
  const total = 0;

  return (
    <div>
      <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, border: '1px solid #F0F0F0' }}>
        {/* Filter bar */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <Row gutter={[16, 12]} align="middle">
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Khoản mục chi phí</Text>
              <Select defaultValue="all" style={{ width: '100%' }}>
                <Option value="all">Tất cả</Option>
              </Select>
            </Col>
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Thời gian phân bổ</Text>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <Button type="primary" style={{ background: '#EF5941', borderColor: '#EF5941' }}>Nhập chi phí</Button>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có chi phí" /> }}
        />

        <div style={{ padding: '0 16px 14px' }}>
          <PaginationFooter
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            label="bản ghi"
          />
        </div>
      </Card>
    </div>
  );
};

export default CostView;
