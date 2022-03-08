# Installation instructions

```shell
yarn
yarn start:dev
```

# Reproduction

```shell

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "query s { shape { ... on Circle { radius } ... on Square { side } } }"}' \
  http://localhost:3000/graphql

# should return {"data":{"shape":{"side":10}}}

# run the same query again
# {"data":null,"errors":[{"message":"Abstract type Shape must resolve to an Object type at runtime for field Query.shape. Either the Shape type should provide a \"resolveType\" function or each possible types should provide an \"isTypeOf\" function.","locations":[{"line":1,"column":11}],"path":["shape"]}]}

```

The query returns fine for the first run, then fails for the second run. 
This is because of the `jit: 1` option, which says 
> The minimum number of execution a query needs to be executed before being jit'ed.

On the second run, Mercurius attempts to compile the query.

But since @nestjs/graphql `resolveType` factory wraps the original (synchronous) `resolveType` function to promise, which is not supported (https://github.com/zalando-incubator/graphql-jit/issues/69), the request fails.


