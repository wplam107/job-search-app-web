import Layout from '../components/layout';

export default function Index() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};