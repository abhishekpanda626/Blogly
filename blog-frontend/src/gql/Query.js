import { gql } from "@apollo/client";
export const GET_GEN_3 = gql`
  query getGen3 {
    pokemon_v2_pokemonspecies(
      order_by: { id: asc }
      where: { pokemon_v2_generation: { name: { _eq: "generation-iii" } } }
    ) {
      name
      id
    }
  }
`;