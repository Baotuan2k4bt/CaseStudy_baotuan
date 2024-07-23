function emailIsValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function Save() {
    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let phonenumber = document.getElementById("phonenumber").value;
    let studentID = document.getElementById("studentID").value;
    let major = document.getElementById("major").value;
    let classs = document.getElementById("classs").value;
    let dateofbirth = document.getElementById("dateofbirth").value;
    let status = document.getElementById("status").value;

    let gender = '';
    if (document.getElementById("male").checked) {
        gender = document.getElementById("male").value;
    } else if (document.getElementById("female").checked) {
        gender = document.getElementById("female").value;
    }
    if (_.isEmpty(fullname)) {
        document.getElementById('fullname-error').innerHTML = 'vui lòng nhập họ tên';
    } else if (fullname.trim().length <= 2) {
        document.getElementById('fullname-error').innerHTML = 'họ và tên không nhỏ hơn 2 kí tự';
    } else {
        document.getElementById('fullname-error').innerHTML = ' ';
    }
    if (_.isEmpty(email)) {
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email';
    } else if (!emailIsValid(email)) {
        document.getElementById('email-error').innerHTML = 'Email không đúng định dạng';
    } else {
        document.getElementById('email-error').innerHTML = ' ';
    }
    if (_.isEmpty(phonenumber)) {
        document.getElementById('phonenumber-error').innerHTML = 'Vui lòng nhập số điện thoại';
    } else {
        document.getElementById('phonenumber-error').innerHTML = '';
    }
    if (_.isEmpty(studentID)) {
        document.getElementById('studentID-error').innerHTML = 'Vui lòng nhập mã sinh viên';
    } else {
        document.getElementById('studentID-error').innerHTML = ' ';
    }
    if (_.isEmpty(classs)) {
        document.getElementById('classs-error').innerHTML = 'Vui lòng nhập lớp';
    } else {
        document.getElementById('classs-error').innerHTML = ' ';
    }
    if (_.isEmpty(major)) {
        document.getElementById('major-error').innerHTML = 'Vui lòng nhập chuyên ngành';
    } else {
        document.getElementById('major-error').innerHTML = ' ';
    }
    if (_.isEmpty(address)) {
        document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ';
    } else {
        document.getElementById('address-error').innerHTML = ' ';

    }
    if (_.isEmpty(status)) {
        document.getElementById('status-error').innerHTML = 'Vui lòng nhập trạng thái';
        isValid = false;
    } else {
        document.getElementById('status-error').innerHTML = '';
    }
    if (_.isEmpty(gender)) {
        document.getElementById('gender-error').innerHTML = 'Vui lòng nhập giới tính';
    } else {
        document.getElementById('gender-error').innerHTML = ' ';

    }
    if (fullname && email && phonenumber && address && gender && studentID && classs && major && status && dateofbirth) {
        let students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")):[];
        students.push({
            fullname: fullname,
            email: email,
            phonenumber: phonenumber,
            address: address,
            gender: gender,
            studentID: studentID,
            classs: classs,
            major: major,
            status: status,
            dateofbirth: dateofbirth,

        });
        localStorage.setItem("students", JSON.stringify(students));
        this.renderListStudent();
    }
}
function renderListStudent() {
    let students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];
    if (students.length === 0)
        return false;
    let tableContent = `<tr>
        <td width="25"> #</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Số điện thoại</td>
        <td>Địa chỉ</td>
        <td>Giới tính</td>
        <td>Mã sinh viên</td>
        <td> Lớp</td>
        <td> Chuyên ngành</td>
        <td> Trạng thái</td>
        <td> ngày sinh</td>
        <td width="25">Action</td>
    </tr>`;
    students.forEach((student, index) => {
        let studentIId = index;
        index++;
        tableContent += `<tr>
            <td>${index}</td>
            <td>${student.fullname}</td>
            <td>${student.email}</td>
            <td>${student.phonenumber}</td>
            <td>${student.address}</td>
            <td>${student.gender}</td>
            <td>${student.studentID}</td>
            <td>${student.classs}</td>
            <td>${student.major}</td>
            <td>${student.status}</td>
            <td>${student.dateofbirth}</td>
            <td><a href='#'onclick="deleteStudent(${studentIId})">Delete</a>|<a href='#' onclick="editStudent(${studentIId})">Edit</a></td>
        </tr>`;
    });
    document.getElementById("grid-student").innerHTML = tableContent;

}
function deleteStudent(id){
    let students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")):[];
    students.splice(id, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderListStudent();
}
function editStudent(id) {
    let students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];
    let student = students[id];

    document.getElementById('fullname').value = student.fullname;
    document.getElementById('email').value = student.email;
    document.getElementById('phonenumber').value = student.phonenumber;
    document.getElementById('address').value = student.address;
    document.getElementById('gender').value = student.gender;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('classs').value = student.classs;
    document.getElementById('major').value = student.major;
    document.getElementById('status').value = student.status;
    document.getElementById('dateofbirth').value = student.dateofbirth;
    document.getElementById('student-index').value = id;
    renderListStudent();
}
