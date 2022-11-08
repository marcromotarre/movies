import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUpdateFilmaffinityMovie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, name, rating, votes, movie } = req.body;
  let fmovie;
  try {
    fmovie = await prisma.filmaffinityMovie.upsert({
      where: {
        id,
      },
      update: {
        name,
        rating,
        votes,
        movie: { connect: { id: movie } },
      },
      create: {
        id,
        name,
        rating,
        votes,
        movie: { connect: { id: movie } },
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "Filmaffinity Movie", e });
    return;
  }

  res.json(fmovie);
};

export default CreateUpdateFilmaffinityMovie;
