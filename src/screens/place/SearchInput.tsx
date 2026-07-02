import { Search } from "lucide-react";

export default function SearchInput() {
    return (
        <div className="w-full px-4 mt-6">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    className="w-full py-3 pl-12 pr-5 border border-gray-300 rounded-full bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder="여행지를 검색하세요"
                />
            </div>
        </div>
    );
}