export function Signup() {

    return (
        <div>
            <form id="signupForm" method="post">
                <div>
                    <label>이름</label>
                    <input id="nameInput" name="name" placeholder="이름"></input>
                </div>
                <div>
                    <label>아이디</label>
                    <input id="idInput" name="userID" placeholder="아이디"></input>
                </div>
                <div>
                    <label>이메일</label>
                    <input id="emailInput" name="email" type="email" placeholder="이메일"></input>
                </div>
                <div>
                    <label>비밀번호</label>
                    <input id="pwInput" name="password" type="password" placeholder="비밀번호"></input>
                </div>
                <div>
                    <label>비밀번호 확인</label>
                    <input id="pwConfirmInput" name="passwordConfirm" type="password" placeholder="비밀번호 확인"></input>
                </div>
                <div>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );

}