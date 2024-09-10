const serverUrl = process.env.NEXT_PUBLIC_URL;

type GenerateGameResponse = {
  start_word: string;
  end_word: string;
};

type ValidateResponse = {
  valid_word: boolean;
  error?: string;
};

export const generateGame = async (): Promise<GenerateGameResponse> => {
  const response = await (
    await fetch(`${serverUrl}/api/generate_game`, { cache: "no-cache" })
  ).json();
  return response;
};

export const validate = async (
  currentLadder: string[],
  endWord: string,
  wordToValidate: string
): Promise<ValidateResponse> => {
  const response = await (
    await fetch(`${serverUrl}/api/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        current_ladder: currentLadder,
        end_word: endWord,
        word_to_validate: wordToValidate,
      }),
    })
  ).json();
  return response;
};
