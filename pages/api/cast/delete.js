import { prisma }  from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const Delete = async (
  req,
  res
) => {
  let movies;
  try {
    movies = await prisma.castCredit.deleteMany({});
  } catch (e) {
    res.status(401);
    res.json({ error: "Cannot find Movies" });
    return;
  }

  res.json(movies);
};

export default Delete;
