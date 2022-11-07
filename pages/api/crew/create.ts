import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateMultipleCrewCredit = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const createMany = await prisma.crewCredit.createMany({
      data: [
        ...req.body.map((crew: any) => ({
          credit_id: crew.credit_id,
          id: crew.id,
          movieCreditsId: crew.movieCreditsId,
          profile_path: crew.profile_path,
          cast_id: crew.cast_id,
          adult: crew.adult,
          known_for_department: crew.known_for_department,
          name: crew.name,
          original_name: crew.original_name,
          popularity: crew.popularity,
        })),
      ],
      skipDuplicates: true,
    });
  } catch (e) {
    res.status(401);
    res.json({ error: e });
    return;
  }
};

export default CreateMultipleCrewCredit;
