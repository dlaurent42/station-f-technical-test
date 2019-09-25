import { get } from 'lodash';
import { verify } from '../helpers';
import { isEmpty } from '../utils';
import SCOPE from '../config/constants/scope';

export default (req, res, next) => {

  const { url, method } = req;

  // Get scope based on url and method
  const scope = get(SCOPE.ROUTES.filter(el => el.method === method && url.startsWith(el.url)), '[0].scope');
  if (!scope) return res.status(404).end();

  // Check if scope is public
  if (scope === SCOPE.STATUS.PUBLIC) return next();

  // Check if scope is admin
  if (scope === SCOPE.STATUS.ADMIN) return res.status(403).end();

  // Get bearer token
  const bearerHeader = req.headers.authorization;
  if (isEmpty(bearerHeader)) return res.status(403).end();
  const bearerToken = bearerHeader.split(' ')[1];

  // Verify token
  return verify(bearerToken)
    .then(() => next())
    .catch(error => (
      (error.name === 'TokenExpiredError')
        ? res.status(401).end()
        : res.status(403).end()
    ));
};
