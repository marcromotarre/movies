import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const fMovie = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name } = req.body;
  let movie;
  try {
    movie = await prisma.fimaffinityMovie.upsert({
      where: {
        id,
      },
      update: {
        name,
      },
      create: {
        id,
        name,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "Movie" });
    return;
  }

  res.json(movie);
};

export default fMovie;
