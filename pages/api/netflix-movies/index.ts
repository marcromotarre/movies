import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUpdateNetflixMovie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, title, releaseYear } = req.body;
  let movies;
  try {
    movies = await prisma.netflixMovie.findMany();
  } catch (e) {
    res.status(401);
    res.json({ error: "Cannot find Netflix" });
    return;
  }

  res.json(movies);
};

export default CreateUpdateNetflixMovie;
