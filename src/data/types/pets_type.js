const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');
const { makeIterable } = require('../helpers');

const SinglePetType = require('./pet_type');

module.exports = new GraphQLObjectType({
  name: 'Pets',
  description: 'The pet list and the offset',

  fields: () => ({
    lastOffset: {
      type: GraphQLInt,
      resolve: json => json.lastOffset
    },
    isLastRecord: {
      type: GraphQLBoolean,
      resolve: json => !Array.isArray(json.pets)
    },
    pets: {
      type: new GraphQLList(SinglePetType),
      resolve: json => makeIterable(json.pets)
    }
  })
});
