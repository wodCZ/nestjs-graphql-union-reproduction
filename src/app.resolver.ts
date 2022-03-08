import {
  createUnionType,
  Field,
  Int,
  ObjectType,
  Resolver,
  Query,
} from '@nestjs/graphql';

@ObjectType()
class Square {
  @Field(() => Int)
  side: number;
}

@ObjectType()
class Circle {
  @Field(() => Int)
  radius: number;
}

const Shape = createUnionType({
  name: 'Shape',
  types: () => [Square, Circle] as const,
  resolveType: (value: any) => {
    return value.side ? Square : Circle;
  },
});

@Resolver(() => Shape)
export class AppResolver {
  @Query(() => Shape)
  shape() {
    return { side: 10 };
  }
}
