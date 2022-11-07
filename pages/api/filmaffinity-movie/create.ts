import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUpdateFilmaffinityMovie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, name, rating, votes } = req.body;
  let movie;
  try {
    movie = await prisma.filmaffinityMovie.upsert({
      where: {
        id,
      },
      update: {
        name,
        rating,
        votes,
      },
      create: {
        id,
        name,
        rating,
        votes,
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
