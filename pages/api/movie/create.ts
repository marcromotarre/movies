import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUpdateFilmaffinityMovie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, name, netflixMovieId, image, movieCredits, year } = req.body;
  let movie;
  try {
    movie = await prisma.movie.upsert({
      where: {
        id,
      },
      update: {
        name,
        netflixMovieId,
        image,
        movieCredits,
        year,
      },
      create: {
        id,
        name,
        netflixMovieId,
        image,
        year,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "Movie" });
    return;
  }

  res.json(movie);
};

export default CreateUpdateFilmaffinityMovie;
