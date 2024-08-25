// TODO: temporary mock EP while I work on FE, remove after BE is ready
export async function GET(_request: Request) {
  return Response.json({
    start: "BONG",
    end: "DOOM",
  });
}
