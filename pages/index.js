import Layout from '../components/layout';

export default function Index() {
  return (
    <div className="flex flex-col items-center w-full">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce semper auctor hendrerit. Curabitur varius pellentesque velit congue hendrerit. In feugiat, erat in viverra hendrerit, risus sem consectetur ipsum, at volutpat augue lorem eget orci. Aenean volutpat eu felis eget dapibus. Sed ornare risus risus, ac ultricies odio suscipit in. In aliquam augue non magna porta, vitae ornare odio vulputate. Phasellus vestibulum mattis odio, ac egestas ipsum sodales in. Aliquam sit amet aliquam dui, et commodo lectus. Cras dapibus, diam eget eleifend rhoncus, purus velit dignissim lacus, vel posuere odio sem vitae felis. Etiam condimentum justo diam, vitae rutrum odio luctus ut. Duis eget nibh eu risus tincidunt hendrerit in vel orci. Sed egestas purus quis dolor viverra congue. Nullam eget dolor hendrerit, volutpat sem eget, euismod mi. Quisque nec magna vitae nunc accumsan fringilla. Nullam vel mauris ut sapien placerat ultrices in non mauris.
      </p>
      <p>
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce tincidunt est sit amet dui consequat, a rhoncus velit bibendum. Duis auctor tellus in ex ullamcorper, vehicula faucibus velit pharetra. Aliquam ac leo dictum, bibendum metus eu, tempor orci. Proin tempus vestibulum vulputate. Sed felis erat, feugiat sed lobortis ac, imperdiet nec nulla. Suspendisse sagittis viverra dictum.
      </p>
      <p>
        Suspendisse blandit viverra mollis. Pellentesque tortor nisi, venenatis sed ligula vitae, lobortis bibendum neque. Pellentesque nec lacinia massa. Nullam cursus ante malesuada, pharetra nisi et, rhoncus lectus. Mauris lacinia enim eu hendrerit placerat. Fusce quis risus erat. Praesent finibus elementum mauris, et tempus nunc tempus a. Vivamus eu cursus felis. Nunc non lectus urna. Nullam vestibulum ex turpis, eu rutrum sem commodo sed.
      </p>
      <p>
        Nam neque orci, finibus sed odio sed, varius imperdiet elit. Suspendisse in ipsum ut eros iaculis iaculis. Phasellus erat elit, rutrum volutpat tincidunt sit amet, vestibulum ut odio. Pellentesque elit erat, commodo quis neque at, lobortis facilisis mauris. Aenean non consectetur ex. Ut ut justo nibh. Suspendisse a viverra libero. Aenean quis mauris pulvinar, interdum ligula quis, pharetra lacus. Donec nec ligula posuere, ultricies eros nec, tincidunt ex. Maecenas eu massa nec est suscipit maximus. Pellentesque scelerisque dapibus mauris sed interdum. Pellentesque elementum et quam at vestibulum. Nam cursus ut ex at accumsan. Nulla ligula dolor, molestie et semper eu, tristique sit amet ipsum.
      </p>
      <p>
        Proin lacinia enim at est consequat, vel gravida felis feugiat. Ut non rhoncus nisi, sit amet congue eros. Aenean suscipit, orci in egestas vestibulum, ligula metus pharetra justo, eu tristique ipsum elit sit amet ex. Nam sit amet lectus dignissim neque tincidunt egestas sit amet ut nisl. Morbi quis metus in metus consectetur interdum nec nec erat. Quisque molestie tellus eu eros consectetur eleifend. Donec euismod, ante in volutpat scelerisque, diam nisi euismod libero, sed placerat urna dui malesuada metus. Proin ut ligula pretium, sagittis nisl ut, euismod velit. Quisque in neque id eros elementum commodo. Integer mi felis, tempus at risus ut, porta efficitur lorem. Suspendisse ut pharetra lacus, posuere imperdiet urna. Etiam arcu magna, convallis et maximus sed, vestibulum vel libero. Phasellus consequat accumsan risus.
      </p>
    </div>
  );
};

Index.getLayout = function getLayout(page) {
  return (
    <Layout name="Home Page">
      {page}
    </Layout>
  );
};