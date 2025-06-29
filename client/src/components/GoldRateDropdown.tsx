import { ChevronDown, RefreshCcw } from "lucide-react";
import { useGoldRateContext } from "../contexts/GoldRateContext";
import { formatTimestamp } from "../utils/formatTimestamp";
import Loader from "./Loader";

const GoldRateDropDown = () => {
  // const { data, error, loading, refetch } = useGoldRate();
  const { data, loading, error, refetch } = useGoldRateContext();
const handleReload = () => {
  refetch()
};
    if (loading) return <Loader text="Loading gold rates..." />;
    if (error)
      return (
        <div>
          {/* Error: {error} */}
          <button onClick={handleReload} disabled={loading} className="flex items-center hover:bg-neutral-700 px-4 py-2 rounded-md gap-2">
            Retry
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      );
    if (!data) return <div>No data available.</div>;
  return (
    <div className="group relative inline-block">
      <button
        className="flex px-4 py-2 text-white rounded-none border-b border-transparent hover:border-neutral-400 transition-colors"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Gold Rate 22K (1gm) -₹{data.rates["22K"]["1_gram"]}{" "}
        <ChevronDown className="text-white" />
      </button>

      <div
        className="hidden group-hover:block px-6 py-8 absolute right-5 mt-2 w-70 bg-white shadow-lg z-10 border border-gray-200"
        role="menu"
      >
        <div className="grid grid-cols-2 gap-24">
          {/* Left column - left aligned */}
          <div className="text-left space-y-2">
            <div className="text-gray-700 text-[13px] font-[500] pb-4">
              Metal Type
            </div>
            <div className="text-gray-800 text-[13px] font-[500]">Gold 22k</div>
            <div className="text-gray-800 text-[13px] font-[500]">Gold 24k</div>
          </div>

          {/* Right column - right aligned */}
          <div className="text-left space-y-2">
            <div className="text-gray-700 text-[13px] font-[500] pb-4">
              Per Gram
            </div>
            <div className="text-gray-800 text-[13px] font-[500]">
              ₹{data.rates["22K"]["1_gram"]}
            </div>
            <div className="text-gray-800 text-[13px] font-[500]">
              ₹{data.rates["24K"]["1_gram"]}
            </div>
          </div>
        </div>

        {/* Centered timestamp */}
        <div className="text-center text-gray-800 text-[12px] font-[500] mt-8">
          {formatTimestamp(data.timestamp)}
          {data.lastUpdated}
        </div>
      </div>
    </div>
  );
};

export default GoldRateDropDown;
