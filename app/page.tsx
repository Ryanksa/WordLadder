import Game from "./components/Game";

export default async function Home() {
  // TODO: fetch start and end words from BE once its ready
  // const response = await fetch(process.env.URL + "/");

  return <Game startWord={"BONG"} endWord={"DOOM"} />;
}
