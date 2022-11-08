import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUpdateNetflixMovie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let movies;
  try {
    movies = await prisma.movie.findMany({
      where: { NOT: [{ filmaffinityMovieId: null }] },
      include: {
        filmaffinity: true,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "Cannot find Movies for Gallery" });
    return;
  }

  res.json(movies);
};

export default CreateUpdateNetflixMovie;
