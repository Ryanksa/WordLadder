import Game from "./components/Game";

export default async function Home() {
  const response = await fetch(process.env.URL + "/mocks");
  const words: { start: string; end: string } = await response.json();

  return <Game startWord={words.start} endWord={words.end} />;
}
