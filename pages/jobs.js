import Layout from '../components/layout';

export default function Jobs() {
  return (
    <div>
      Jobs
    </div>
  );
};

Jobs.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};