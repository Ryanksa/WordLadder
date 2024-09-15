const serverUrl = process.env.NEXT_PUBLIC_URL;

type GenerateGameResponse = {
  start_word: string;
  end_word: string;
};

type ValidateResponse = {
  valid_word: boolean;
  error?: string;
};

// /api/generate_game

// /api/validate (current_ladder, end_word, word_to_validate)
