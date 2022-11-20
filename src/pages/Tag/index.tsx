import { message } from 'antd';
import { useRef } from 'react';
import { Link, request } from '@umijs/max';
import {
  ActionType,
  ProTable,
  ModalForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import omit from 'lodash/omit';

const typeEnum = {
  all: { text: '全部', type: 'Default' },
  tag: { text: '标签', type: 'Processing' },
  categorie: { text: '分类', type: 'Success' },
  topic: { text: '专栏', type: 'Error' },
};

const Home = () => {
  const actionRef = useRef<ActionType>();
  const renderForm = () => {
    return (
      <>
        <ProFormText
          required
          name="name"
          label="名字"
          placeholder="请输入名字"
          rules={[{ required: true, message: '请输入名字' }]}
        />
        <ProFormText
          required
          name="slug"
          label="短链"
          placeholder="请输入短链"
          rules={[{ required: true, message: '请输入短链' }]}
        />
        <ProFormSelect
          required
          name="type"
          label="类型"
          placeholder="请选择类型"
          rules={[{ required: true, message: '请选择类型' }]}
          valueEnum={omit(typeEnum, 'all')}
        />
      </>
    );
  };
  return (
    <ProTable
      cardBordered
      rowKey="_id"
      actionRef={actionRef}
      request={(params = {}) => request('/api/v1/tag', { method: 'GET', params })}
      columns={[
        {
          title: '短链',
          dataIndex: 'slug',
          width: 200,
          render: (_, record) => (
            <Link to={`/tag/${record.slug}`} target="_blank">
              {record.slug}
            </Link>
          ),
        },
        {
          title: '名字',
          dataIndex: 'name',
          ellipsis: true,
        },
        {
          title: '类型',
          dataIndex: 'type',
          width: 120,
          valueType: 'select',
          valueEnum: typeEnum,
          initialValue: ['all'],
        },
        {
          title: '引用数',
          dataIndex: 'count',
          hideInSearch: true,
          width: 120,
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          width: 160,
          valueType: 'date',
          sorter: true,
          hideInSearch: true,
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          width: 160,
          valueType: 'date',
          sorter: true,
          hideInSearch: true,
        },
        {
          title: '操作',
          width: 80,
          valueType: 'option',
          key: 'option',
          render: (_, record) => [
            <ModalForm
              key="editable"
              title="编辑标签"
              autoFocusFirstInput
              trigger={<a>编辑</a>}
              request={() => request(`/api/v1/tag/${record._id}`, { method: 'GET' })}
              onFinish={async (values) => {
                await request(`/api/v1/tag/${record._id}`, { method: 'PUT', data: values });
                message.success('更新成功');
                actionRef.current?.reload();
                return true;
              }}
            >
              {renderForm()}
            </ModalForm>,
          ],
        },
      ]}
      toolBarRender={() => [
        <ModalForm
          key="new"
          title="新建标签"
          autoFocusFirstInput
          initialValues={{ type: 'tag' }}
          trigger={
            <a className="flex items-center gap-1">
              <PlusOutlined />
              新建
            </a>
          }
          onFinish={async (values) => {
            await request('/api/v1/tag', { method: 'POST', data: values });
            message.success('创建成功');
            actionRef.current?.reload();
            return true;
          }}
        >
          {renderForm()}
        </ModalForm>,
      ]}
    />
  );
};

export default Home;
