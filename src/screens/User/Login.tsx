import { BrowserRouter, Link } from "react-router-dom";

export function Login() {

    return (
        <div>
            <h1>LetsGo</h1>

            <form id="loginForm" method="post" action="/login">
                <div>
                    <label>아이디</label>
                    <input id="userId" name="userID" placeholder="아이디를 입력하세요"></input>
                </div>
                <div>
                    <label>비밀번호</label>
                    <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요"></input>
                </div>
                <div>
                    <button type="submit">로그인</button>
                </div>
            </form>  

            <BrowserRouter>
                <Link to="/getId">아이디 찾기</Link>
                <Link to="/updatePw">비밀번호 찾기</Link>
                <Link to="/signup">회원가입</Link>
            </BrowserRouter>
        </div>
    );

}