import { prisma }  from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUpdateNetflixMovie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, title, releaseYear } = req.body;
  let movie;
  try {
    movie = await prisma.notFoundNetflixMovie.upsert({
      where: {
        id,
      },
      update: {
        title,
        releaseYear,
      },
      create: {
        id,
        title,
        releaseYear,
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
