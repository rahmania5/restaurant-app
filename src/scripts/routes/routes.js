import CulinaryCatalog from '../views/pages/culinary-catalog';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': CulinaryCatalog,
  '/culinary-catalog': CulinaryCatalog,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
