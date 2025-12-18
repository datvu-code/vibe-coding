# 🎛️ Hệ thống Tùy chỉnh Metrics - Đặc tả Chi tiết

## 📋 Tổng quan

Hệ thống cho phép user:
- **Chọn template** metrics có sẵn
- **Tạo template mới** với metrics tùy chọn
- **Chỉnh sửa template** hiện tại
- **Xóa template** không cần
- **Drag & drop** để sắp xếp lại metrics

---

## 🏗️ Kiến trúc System

### 1. **Data Structure**

```javascript
// Template Structure
const template = {
  id: 'growth-default',
  name: 'Growth Default',
  metrics: [
    { id: 'gmv', name: 'GMV ngày hôm qua', domain: 'Sales' },
    { id: 'orders', name: 'Số đơn ngày hôm qua', domain: 'Sales' },
    { id: 'aov', name: 'AOV', domain: 'Sales' },
    { id: 'roas', name: 'ROAS tổng', domain: 'Ads' },
    { id: 'gmv-channel', name: 'GMV theo kênh', domain: 'Sales' },
    { id: 'ads-cost', name: 'Chi phí Ads', domain: 'Ads' }
  ],
  isDefault: true // Không thể xóa
};

// Available Metrics Pool
const allMetrics = [
  // Sales Domain
  { id: 'gmv', name: 'GMV ngày hôm qua', domain: 'Sales', ... },
  { id: 'orders', name: 'Số đơn ngày hôm qua', domain: 'Sales', ... },
  { id: 'aov', name: 'AOV', domain: 'Sales', ... },
  { id: 'revenue', name: 'Doanh thu thuần', domain: 'Sales', ... },
  
  // Ads Domain
  { id: 'roas', name: 'ROAS tổng', domain: 'Ads', ... },
  { id: 'ads-cost', name: 'Chi phí Ads', domain: 'Ads', ... },
  { id: 'cpc', name: 'CPC', domain: 'Ads', ... },
  { id: 'ctr', name: 'CTR', domain: 'Ads', ... },
  
  // Ops Domain
  { id: 'fulfillment-rate', name: 'Tỷ lệ hoàn thành đơn', domain: 'Ops', ... },
  { id: 'cancel-rate', name: 'Tỷ lệ hủy đơn', domain: 'Ops', ... },
  
  // Inventory Domain
  { id: 'stock-value', name: 'Giá trị tồn kho', domain: 'Inventory', ... },
  { id: 'sku-count', name: 'Số SKU', domain: 'Inventory', ... },
  
  // Accounting Domain
  { id: 'profit', name: 'Lợi nhuận', domain: 'Kế toán', ... },
  { id: 'margin', name: 'Margin', domain: 'Kế toán', ... }
];
```

### 2. **State Management**

```javascript
const [templates, setTemplates] = useState([...defaultTemplates]);
const [selectedTemplateId, setSelectedTemplateId] = useState('growth-default');
const [isReorderMode, setIsReorderMode] = useState(false);
const [tempMetricOrder, setTempMetricOrder] = useState([]);

// Modal States
const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
const [createTemplateModalVisible, setCreateTemplateModalVisible] = useState(false);
const [editTemplateModalVisible, setEditTemplateModalVisible] = useState(false);
const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
```

---

## 🎨 UI Components

### **Component 1: Section Header với 2 Actions**

```jsx
<Card 
  title={<Text strong style={{ fontSize: 16, color: '#2b2b2b' }}>Báo cáo kết quả</Text>}
  extra={
    <Space>
      {isReorderMode ? (
        <Button 
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSaveOrder}
        >
          Lưu sắp xếp
        </Button>
      ) : (
        <>
          <Button 
            size="small" 
            icon={<DragOutlined />}
            onClick={() => setIsReorderMode(true)}
          >
            Di chuyển
          </Button>
          <Button 
            size="small" 
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setCustomizeModalVisible(true)}
          >
            Tùy chỉnh
          </Button>
        </>
      )}
    </Space>
  }
>
  {/* Metric Cards */}
</Card>
```

---

### **Component 2: Parent Modal - Tùy chỉnh các chỉ số**

```jsx
<Modal
  title="Tùy chỉnh các chỉ số"
  open={customizeModalVisible}
  onCancel={() => setCustomizeModalVisible(false)}
  width={800}
  footer={[
    <Button key="cancel" onClick={() => setCustomizeModalVisible(false)}>
      Đóng
    </Button>,
    <Button key="save" type="primary" onClick={handleSaveChanges}>
      Lưu thay đổi
    </Button>
  ]}
>
  {/* Dropdown Template */}
  <div style={{ marginBottom: 24 }}>
    <Text strong>Template hiện tại:</Text>
    <Select
      value={selectedTemplateId}
      onChange={setSelectedTemplateId}
      style={{ width: '100%', marginTop: 8 }}
      size="large"
    >
      {templates.map(t => (
        <Select.Option key={t.id} value={t.id}>
          {t.name} {t.isDefault && <Tag color="blue">Mặc định</Tag>}
        </Select.Option>
      ))}
    </Select>
  </div>

  {/* Preview Metrics */}
  <div style={{ marginBottom: 24 }}>
    <Text strong>Preview ({selectedTemplate.metrics.length} metrics):</Text>
    <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
      {selectedTemplate.metrics.slice(0, 6).map((metric, idx) => (
        <Col span={8} key={metric.id}>
          <Card size="small" style={{ background: '#F7F7F7', textAlign: 'center' }}>
            <Text style={{ fontSize: 11, color: '#6D7175' }}>{metric.domain}</Text>
            <div style={{ fontSize: 16, fontWeight: 600, margin: '8px 0' }}>
              {metric.name}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
    {selectedTemplate.metrics.length > 6 && (
      <Text type="secondary" style={{ fontSize: 12 }}>
        +{selectedTemplate.metrics.length - 6} metrics khác...
      </Text>
    )}
  </div>

  {/* Actions */}
  <Space direction="vertical" style={{ width: '100%' }} size="middle">
    <Button 
      block 
      icon={<PlusOutlined />}
      onClick={() => setCreateTemplateModalVisible(true)}
    >
      Tạo template mới
    </Button>
    
    <Button 
      block 
      icon={<EditOutlined />}
      onClick={() => setEditTemplateModalVisible(true)}
      disabled={selectedTemplate.isDefault}
    >
      Chỉnh template này
    </Button>
    
    <Popconfirm
      title="Xóa template này?"
      description="Hành động không thể hoàn tác."
      open={deleteConfirmVisible}
      onConfirm={handleDeleteTemplate}
      onCancel={() => setDeleteConfirmVisible(false)}
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }}
    >
      <Button 
        block 
        danger
        icon={<DeleteOutlined />}
        onClick={() => setDeleteConfirmVisible(true)}
        disabled={selectedTemplate.isDefault}
      >
        Xóa template
      </Button>
    </Popconfirm>
  </Space>
</Modal>
```

---

### **Component 3: Child Modal - Tạo Template Mới**

```jsx
<Modal
  title="Tạo template mới"
  open={createTemplateModalVisible}
  onCancel={() => setCreateTemplateModalVisible(false)}
  width={900}
  style={{ top: 40 }} // Stack trên parent modal
  footer={[
    <Button key="cancel" onClick={() => setCreateTemplateModalVisible(false)}>
      Hủy
    </Button>,
    <Button 
      key="save" 
      type="primary" 
      onClick={handleCreateTemplate}
      disabled={newTemplateName.trim() === '' || selectedMetrics.length === 0}
    >
      Lưu template mới ({selectedMetrics.length} metrics)
    </Button>
  ]}
>
  {/* Template Name Input */}
  <Input
    placeholder="Nhập tên template..."
    value={newTemplateName}
    onChange={(e) => setNewTemplateName(e.target.value)}
    size="large"
    style={{ marginBottom: 16 }}
  />

  {/* Search Bar */}
  <Input.Search
    placeholder="Tìm kiếm metrics..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ marginBottom: 16 }}
    allowClear
  />

  {/* Metrics by Domain */}
  <Collapse
    defaultActiveKey={['Sales', 'Ads']}
    style={{ marginBottom: 16 }}
  >
    {Object.entries(groupedMetrics).map(([domain, metrics]) => (
      <Collapse.Panel 
        key={domain} 
        header={
          <Space>
            <Text strong>{domain}</Text>
            <Tag>{metrics.length} metrics</Tag>
          </Space>
        }
      >
        <Checkbox.Group
          value={selectedMetrics}
          onChange={setSelectedMetrics}
          style={{ width: '100%' }}
        >
          <Row gutter={[8, 8]}>
            {metrics.map(metric => (
              <Col span={12} key={metric.id}>
                <Checkbox value={metric.id}>
                  {metric.name}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Collapse.Panel>
    ))}
  </Collapse>
</Modal>
```

---

### **Component 4: Child Modal - Chỉnh Template**

```jsx
<Modal
  title={`Chỉnh sửa: ${selectedTemplate.name}`}
  open={editTemplateModalVisible}
  onCancel={() => setEditTemplateModalVisible(false)}
  width={900}
  style={{ top: 40 }}
  footer={[
    <Button key="cancel" onClick={() => setEditTemplateModalVisible(false)}>
      Hủy
    </Button>,
    <Button 
      key="save" 
      type="primary" 
      onClick={handleEditTemplate}
    >
      Lưu thay đổi
    </Button>
  ]}
>
  {/* Tương tự Create Modal nhưng pre-filled với metrics hiện tại */}
</Modal>
```

---

### **Component 5: Drag & Drop Mode**

```jsx
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Metric Card
const SortableMetricCard = ({ metric, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: metric.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isReorderMode ? 'move' : 'default'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isReorderMode && (
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
          <DragOutlined style={{ fontSize: 16, color: '#8c8c8c' }} />
        </div>
      )}
      <KPICard {...metric} {...props} />
    </div>
  );
};

// In render
{isReorderMode ? (
  <DndContext
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <SortableContext items={metrics.map(m => m.id)}>
      <Row gutter={[12, 12]}>
        {metrics.map(metric => (
          <Col span={8} key={metric.id}>
            <SortableMetricCard metric={metric} />
          </Col>
        ))}
      </Row>
    </SortableContext>
  </DndContext>
) : (
  <Row gutter={[12, 12]}>
    {/* Normal render */}
  </Row>
)}
```

---

## 🔄 Luồng Hoạt động

### **Luồng 1: Tạo Template Mới**

```
1. User click "Tùy chỉnh" → Parent Modal mở
2. User click "+ Tạo template mới" → Child Modal mở (Parent ẩn)
3. User nhập tên, chọn metrics
4. User click "Lưu template mới"
5. Child Modal đóng
6. Parent Modal hiện lại
7. Template mới được chọn tự động
8. Preview cập nhật
```

### **Luồng 2: Chỉnh Template**

```
1. User chọn template từ dropdown
2. User click "✏️ Chỉnh template này"
3. Child Modal mở với metrics đã chọn
4. User add/remove metrics
5. User click "Lưu thay đổi"
6. Child Modal đóng
7. Parent Modal cập nhật preview
```

### **Luồng 3: Xóa Template**

```
1. User click "🗑 Xóa template"
2. Popconfirm hiển thị (không phải modal)
3. User click "Xóa" → Template bị xóa
4. Dropdown tự động chọn template khác
5. Parent Modal giữ nguyên
```

### **Luồng 4: Drag & Drop**

```
1. User click "Di chuyển"
2. Tất cả metric cards có drag handle
3. User kéo thả sắp xếp
4. User click "Lưu sắp xếp"
5. Thứ tự mới được lưu vào template hiện tại
6. Trở về chế độ xem bình thường
```

---

## 🎨 UX Details

### **Modal Stacking**
- Parent modal z-index: 1000
- Child modal z-index: 1050
- Child modal `top: 40px` để stack đẹp
- Khi child mở, parent opacity giảm (blur effect)

### **Visual Feedback**
- Template dropdown: Show tag "Mặc định" cho default templates
- Metrics count: Hiển thị số metrics đã chọn
- Drag mode: Show drag handle icon
- Disabled states: Default templates không thể chỉnh/xóa

### **Validation**
- Template name không được trống
- Phải chọn ít nhất 1 metric
- Không thể xóa default templates

---

## 🚀 Implementation Priority

### Phase 1 (Core):
- ✅ Template data structure
- ✅ Parent modal với dropdown
- ✅ Preview metrics

### Phase 2 (CRUD):
- ✅ Create template modal
- ✅ Edit template modal
- ✅ Delete confirmation

### Phase 3 (Advanced):
- ✅ Drag & drop reorder
- ✅ Modal stacking
- ✅ Search & filter metrics

---

Đây là specification chi tiết. Tôi sẽ implement từng phần một cách incremental!
















