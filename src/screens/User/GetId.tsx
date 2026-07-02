export function GetId() {

    return (
        <div>
            <form id="getIdForm" method="post">
                <div>
                    <label>이름</label>
                    <input id="nameInput" name="name" placeholder="이름을 입력하세요"></input>
                </div>
                <div>
                    <label>이메일</label>
                    <input type="email" id="emailInput" name="email" placeholder="이메일을 입력하세요"></input>
                </div>
                <div>
                    <button type="submit">아이디 찾기</button>
                </div>
            </form>
            
        </div>
    );

}