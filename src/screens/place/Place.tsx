import SearchInput from "./SearchInput";
import LookupTable from "./LookupTable";
import PlaceBox from "./PlaceBox";
import Header from "../../components/layout/Header";

export default function Place() {
    return (
        <div className="flex flex-col gap-4 pb-6">
            <Header />
            <SearchInput />
            <LookupTable />
            <PlaceBox />
        </div>
    );
}
