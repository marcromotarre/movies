import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUpdateNetflixMovie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let movies;
  try {
    movies = await prisma.crewCredit.findMany();
  } catch (e) {
    res.status(401);
    res.json({ error: "Cannot find Movies" });
    return;
  }

  res.json(movies);
};

export default CreateUpdateNetflixMovie;
