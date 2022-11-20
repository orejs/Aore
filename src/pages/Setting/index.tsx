import { useRef } from 'react';
import { request } from '@umijs/max';
import { ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';

const Home = () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ProForm
      autoFocusFirstInput
      formRef={formRef}
      request={() => request(`/api/v1/setting`, { method: 'GET' })}
    >
      <ProFormText
        required
        name="name"
        label="站点名称"
        placeholder="请输入站点名称"
        rules={[{ required: true, message: '请输入站点名称' }]}
      />
      <ProFormText
        required
        name="description"
        label="站点描述"
        placeholder="请输入站点描述"
        rules={[{ required: true, message: '请输入站点描述' }]}
      />
    </ProForm>
  );
};

export default Home;
