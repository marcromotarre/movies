import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUpdateNetflixMovie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, title, releaseYear, isPlayable, orderQuery,searchIndex } = req.body;
  let movie;
  try {
    movie = await prisma.netflixMovie.upsert({
      where: {
        id,
      },
      update: {
        title,
        releaseYear,
        isPlayable,
        orderQuery,
        searchIndex
      },
      create: {
        id,
        title,
        releaseYear,
        isPlayable,
        orderQuery,
        searchIndex
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "Movie" });
    return;
  }

  res.json(movie);
};

export default CreateUpdateNetflixMovie;
