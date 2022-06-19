import Layout from '../components/layout';

export default function SignIn() {
  return (
    <div>
      Sign In
    </div>
  );
};

SignIn.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};