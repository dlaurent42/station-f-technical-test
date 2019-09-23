import routes from '../../routes';

export default (app) => {
  Object.entries(routes).forEach((entry) => {
    const [relativePath, routesList] = entry;

    // Loop through routes list
    routesList.forEach((route) => {

      // Check wheter it is a middleware or a route
      if (relativePath === '') app.use(route);
      else app.use(relativePath, route);

    });
  });
};
