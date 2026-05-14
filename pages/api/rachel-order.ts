import type { NextApiRequest, NextApiResponse } from "next";

type RachelOrder = {
  customer: string;
  orderNumber: string;
  pickupWindow: string;
  items: Array<{
    quantity: number;
    flavor: string;
    frosting: string;
    topping: string;
  }>;
};

const rachelOrder: RachelOrder = {
  customer: "Rachel",
  orderNumber: "RC-0427",
  pickupWindow: "Today after 3:00 PM",
  items: [
    {
      quantity: 6,
      flavor: "vanilla bean",
      frosting: "strawberry buttercream",
      topping: "rainbow sprinkles",
    },
    {
      quantity: 6,
      flavor: "dark chocolate",
      frosting: "salted caramel",
      topping: "chocolate curls",
    },
  ],
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<RachelOrder>
) {
  res.status(200).json(rachelOrder);
}
