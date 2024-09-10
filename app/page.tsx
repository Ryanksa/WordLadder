import Game from "./components/Game";
import { generateGame } from "./lib/api";

export default async function Home() {
  const game = await generateGame();

  return <Game startWord={game.start_word} endWord={game.end_word} />;
}
