import { Send } from "lucide-react";
import ChatBotHeader from "./ChatBotHeader";
export default function ChatBot() {
    return (
        <div className="flex flex-col w-[332px] mx-auto h-[calc(100vh-64px)] bg-gray-50">
            <ChatBotHeader />
            <div className="flex-grow overflow-y-auto p-4">

            </div>

            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center">
                    <input className="w-[500px] h-14 px-4 py-4 border border-gray-300 rounded-full focus:outline-none"
                        type="text" placeholder="메시지를 입력해주세요" />
                    <button className="w-10 h-10 rounded-full flex items-center justify-center -ml-12">
                        <Send className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>

        </div>
    );
}
