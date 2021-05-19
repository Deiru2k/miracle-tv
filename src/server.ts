import Express from 'express';
import { graphqlEndpoint } from 'miracle-tv/graphql';
import 'miracle-tv/db/setup-db';

const app = Express();

app.get('/', (_, res) => res.send('FUCK!'));

graphqlEndpoint.applyMiddleware({ app })

app.listen(4000, () => {
  console.info('Server started on localhost:4000');
})
