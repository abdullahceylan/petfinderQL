const { GraphQLObjectType, GraphQLString } = require('graphql');

const BreedType = new GraphQLObjectType({
  name: 'Breed',
  description: 'Breed(s) in pet listed',

  fields: () => ({
    breed: {
      type: GraphQLString,
      resolve: json => json.$t
    }
  })
});

module.exports = BreedType;
