import Layout from '../components/layout';

export default function About() {
  return (
    <div>
      About
    </div>
  );
};

About.getLayout = function getLayout(page) {
  return (
    <Layout name="About Page">
      {page}
    </Layout>
  );
};