import Layout from '../components/layout';

export default function Dashboard() {
  return (
    <div>
      Dashboard
    </div>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};