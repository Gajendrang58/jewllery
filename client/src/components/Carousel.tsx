import React from "react";
import { ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react";

// Import images
import gold from "../assets/457a6.webp";
import gold1 from "../assets/az5ho.webp";
import gold2 from "../assets/dev_ndk5m.png";
import gold3 from "../assets/dev_qw34n.png";
import gold4 from "../assets/gev73.png";

import { useGoldRateContext } from "../contexts/GoldRateContext";
import { goldCoins } from "../data/goldCoins";
import Loader from "./Loader";

const imageMap: { [key: string]: string } = {
  gold,
  gold1,
  gold2,
  gold3,
  gold4
};

type GoldPurity = "22K" | "24K";

interface MenuItem {
  name: string;
  image: string;
  description: string;
  weight: number;
  purity: GoldPurity;
  warning: boolean;
}

const Carousel = () => {
  const { data, loading, error, refetch } = useGoldRateContext();

  const menuItems: MenuItem[] = goldCoins.map((item:any) => ({
    ...item,
    image: imageMap[item.image]
  }));

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsToShow, setItemsToShow] = React.useState(1);

  const updateItemsToShow = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setItemsToShow(4);
    } else if (width >= 1000) {
      setItemsToShow(3);
    } else if (width >= 768) {
      setItemsToShow(2);
    } else {
      setItemsToShow(1);
    }
  };

  React.useEffect(() => {
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= menuItems.length - itemsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? menuItems.length - itemsToShow : prev - 1
    );
  };

  const getGoldPrice = (item: MenuItem): string => {
    if (!data?.rates) return "Loading...";
    try {
      const rateStr: string = data.rates[item.purity]["1_gram"].replace(",", "");
      const rateNumber: number = Number(rateStr);
      const total = rateNumber * item.weight;
      return `₹${total.toFixed(2)}`;
    } catch (error) {
      console.error("Gold price error:", error);
      return "Error";
    }
  };

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= menuItems.length - itemsToShow ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [itemsToShow]);

  const visibleItems: MenuItem[] = [];
  for (let i = 0; i < itemsToShow; i++) {
    const index = (currentIndex + i) % menuItems.length;
    visibleItems.push(menuItems[index]);
  }

  if (loading)
    return <div className="flex items-center justify-center h-100"><Loader text="Loading gold rates..." /></div>;
  if (error)
    return (
      <div className="text-center py-8">
        <button
          onClick={refetch}
          className="flex items-center mx-auto hover:bg-neutral-700 px-4 py-2 rounded-md gap-2"
        >
          Retry <RefreshCcw className="w-5 h-5" />
        </button>
      </div>
    );

  if (!data) return <div className="text-center py-8">No data available.</div>;

  return (
    <div className="mx-auto p-6 max-w-[1200px]">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Our Premium Gold Collection ({menuItems.length} Items)
        </h2>
        <p className="text-lg text-gray-600">Invest in Timeless Value Today</p>
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-hidden">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="flex-1 min-w-0 bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="overflow-hidden flex justify-center items-center h-[200px] sm:h-[240px] md:h-[280px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-contain w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[200px] md:h-[200px]"
                />
              </div>

              <div className="bg-neutral-100">
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <div
                      aria-live="polite"
                      role="status"
                      className="text-lg font-bold text-amber-600"
                    >
                      {getGoldPrice(item)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="text-sm text-gray-500 mb-1">
                    Purity: {item.purity} | Weight: {item.weight}g
                  </div>
                  {item.warning && (
                    <span className="text-red-600 text-sm font-semibold">
                      Limited Stock
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="text-center mt-6 text-gray-500 italic">
        Prices update every 5 minutes | Rates as of{" "}
        {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default Carousel;
