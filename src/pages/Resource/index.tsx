import { useRef } from 'react';
import { Link, request } from '@umijs/max';
import { ActionType, ProTable } from '@ant-design/pro-components';

const Home = () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable
      cardBordered
      rowKey="_id"
      actionRef={actionRef}
      request={(params = {}) => request('/api/v1/resource', { method: 'GET', params })}
      columns={[
        {
          title: '',
          hideInSearch: true,
          dataIndex: 'url',
          width: 240,
          render: (_, record) => (
            <Link to={record.url} className="w-40 h-40 flex items-center justify-center">
              <img width={record.width} height={record.height} src={record.url} />
            </Link>
          ),
        },
        {
          title: '名字',
          dataIndex: 'name',
          ellipsis: true,
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          width: 200,
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
      ]}
    />
  );
};

export default Home;
