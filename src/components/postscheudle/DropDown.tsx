import { useState } from "react";

const SORT_OPTIONS = ['최신순', '좋아요순', '조회순', '제목순'];

type SortType = (typeof SORT_OPTIONS)[number];

export default function DropDown(){
    const [isOpen, setIsOpen] = useState(false);
    const [sortType, setSortType] = useState<SortType>('최신순');

    const handleSelect = (option: SortType) => {
    setSortType(option);
    setIsOpen(!isOpen);
  };
  

    return(
        <div>
            <button onClick={() => setIsOpen((prev) => !prev)} className= "border border-black rounded"> {sortType}
                <span>
                    {isOpen ? '▲' : '▼'}
                </span>
            </button>

      {isOpen && (
        <ul>
          {SORT_OPTIONS.map((option) => (
            <li key={option}>
              <button onClick={() => handleSelect(option)} className= "border border-black rounded"> {option} </button>
            </li>))}
        </ul>)}
    </div>
    );
}