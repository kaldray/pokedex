export type PokemonAttribute = {
  description: string;
  hires: string | null;
  id: number;
  french: string;
  sprite: string;
  thumbnail: string;
  type: { primary: string; secondary?: string };
  favorite: boolean;
};

export type PokemonAttributes = Array<PokemonAttribute>;
