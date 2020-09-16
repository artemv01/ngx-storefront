import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
  '@app': path.resolve(__dirname, '..'),
});
