import { prisma }  from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateMultipleCastCredit = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const createMany = await prisma.castCredit.createMany({
      data: [
        ...req.body.map((cast: any) => ({
          credit_id: cast.credit_id,
          adult: cast.adult,
          known_for_department: cast.known_for_department,
          name: cast.name,
          original_name: cast.original_name,
          popularity: cast.popularity,
          character: cast.character,
          department: cast.department,
          //order: cast.order,
          profile_path: cast.profile_path,
          cast_id: cast.cast_id,
          movieCreditsId: cast.movieCreditsId,
        })),
      ],
      skipDuplicates: true,
    });
    res.status(200);
    res.json(createMany);
  } catch (e) {
    res.status(401);
    res.json({ error: e });
    return;
  }
};

export default CreateMultipleCastCredit;
