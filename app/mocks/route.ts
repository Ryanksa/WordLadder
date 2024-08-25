// TODO: temporary mock EP while I work on FE, remove after BE is ready
export async function GET(_request: Request) {
  return new Response(
    JSON.stringify({
      start: "BONG",
      end: "DOOM",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
