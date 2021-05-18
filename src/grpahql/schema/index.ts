import glob from 'glob';
import path from 'path';
import {gql} from 'apollo-server';
import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';


const schemaString = glob.sync(path.resolve(__dirname, './**/*.graphql')).map(filename => {
  const contents = readFileSync(filename).toString();
  return contents;
}).join('\n');

const schema = gql`${schemaString}`

export default schema;
