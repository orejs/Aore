import { MarkdownEditor } from '@/components';
import { request, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { PageLoading } from '@ant-design/pro-components';

interface BlogInfo {
  slug: string;
  title: string;
  description?: string;
  content?: string;
  status?: string;
  type?: string;
  recommend?: boolean;
}

const Home = () => {
  const params = useParams();
  const id = params.id as string;

  const { loading, data } = useRequest(() =>
    request<BlogInfo>(`/api/v1/blog/${id}`, {
      method: 'GET',
      params: { fields: ['title', 'content'] },
    }),
  );

  const onPublish = (content: string) =>
    request(`/api/v1/blog/${id}`, { method: 'PATCH', data: { content } });

  if (loading) return <PageLoading />;

  return (
    <MarkdownEditor
      defaultTitle={data?.title}
      defaultValue={data?.content || ''}
      onPublish={onPublish}
    />
  );
};

export default Home;
