import React from "react";
import Section from "@/components/Section";

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

export default function RachelOrderSection() {
  const [order, setOrder] = React.useState<RachelOrder | null>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    fetch("/api/rachel-order")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch Rachel's order");
        }

        return response.json() as Promise<RachelOrder>;
      })
      .then((data) => {
        if (isMounted) {
          setOrder(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Section
      title="Rachel's Cupcake Order"
      className="py-12 mt-16 bg-pink-50 dark:bg-pink-950/20 border-y border-pink-100 dark:border-pink-900/40"
      center
      maxWidthClass="max-w-3xl"
    >
      <div className="rounded-lg border border-pink-200 dark:border-pink-900 bg-white dark:bg-black p-5 shadow-sm text-left">
        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400">
            Rachel's cupcake order could not be loaded.
          </p>
        ) : !order ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fetching Rachel's cupcake order...
          </p>
        ) : (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-pink-700 dark:text-pink-300">
                Order {order.orderNumber}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {order.customer} is picking up cupcakes {order.pickupWindow.toLowerCase()}.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {order.items.map((item) => (
                <div
                  key={`${item.flavor}-${item.frosting}`}
                  className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4"
                >
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.quantity} {item.flavor} cupcakes
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {item.frosting} with {item.topping}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
