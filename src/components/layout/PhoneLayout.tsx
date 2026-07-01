import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Navbar from './NavBar';
import MySchedulePage from '../../screens/mySchedule/MyScheduleList';

function PhoneLayout() {
    return (
        <BrowserRouter>
            <div className="flex flex-col h-screen">
                <Header />

                <main className="flex-1 overflow-y-auto mt-16 mb-16 bg-gray-50">
                    <Routes>
                        <Route path="/mySchedule" element={<MySchedulePage />} />
                    </Routes>
                </main>

                <Navbar />
            </div>
        </BrowserRouter>
    );
}

export default PhoneLayout;