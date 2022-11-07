import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUpdateFilmaffinityMovie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { movieId } = req.body;
  let movie;
  try {
    movie = await prisma.movieCredits.create({
      data: {
        movieId,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "Cannot create movie credit" });
    return;
  }

  res.json(movie);
};

export default CreateUpdateFilmaffinityMovie;
