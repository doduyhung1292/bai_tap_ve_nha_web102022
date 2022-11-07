$(document).ready(function() {
    initEvents();
    loadData();
})

/**
 * Tạo các sự hiện cho element
 * Author: doduyhung1292 (06/11/2022)
 */
var errMsg = [];

function initEvents() {
    try {
    // 1. Nhấn close ẩn dialog thông báo
    $(".icon-close.btn__close").click(function (e) { 
        $(".model").hide();
        e.preventDefault();
    });
    // 2. Nhấn button thêm, hiển thị dialog thêm nhân viên
    $(".btn__add-new").click(function (e) { 
        $(".model").css("display", "flex");

    // Focus ô input đầu tiên khi hiển thị dialog
    $('.model input')[2].focus();
        e.preventDefault();
    });
    
    // Nhấn button hủy ở dialog chi tiết nhân viên, ẩn dialog
    $(".btn-cancel").click(function (e) { 
        $(".model").hide();
        e.preventDefault();
    });

    // Nhấn close dialog thông báo
    $(".close-dialog").click(function (e) { 
        $(".dialog-notice").hide();
        e.preventDefault();
    });

    // Nhấn close toast
    $(".icon-close.close-notice").click(function (e) { 
        $(".notice-success").hide();
        e.preventDefault();
    });

    // Kiểm tra ô dữ liệu không được bỏ trống
    $(".model input[required]").blur(function(e) {
        var value =  $(this).val();
        if (!value) {
            // Tô màu ô bị bỏ trống
            this.classList.add("boder-red");
            $(this).attr("title", "Thông tin này không được phép để trống.");
        } else {
            this.classList.remove("boder-red");
            $(this).attr("title", ""); 
        }
        e.preventDefault();
    })

    // Ấn button cất và thêm.
    $(".btn-save").click(saveData);

    } catch (error) {
        console.log(error);
    }
}

/**
 * Save dữ liệu
 * Author: doduyhung1292 (06/11/2022)
 */
function saveData() {
    try {
        // Remove thông báo cũ
        $(".content-warning").empty();
        errMsg = [];

        validateData();

        if (errMsg.length >0) {
            showDialogNotice();
        }
        // nếu hợp lệ => call api save data
        sendApiSaveData();
    } catch (error) {
        console.log(error);
    }
}

/**
 * Validate dữ liệu
 * Author: doduyhung1292 (06/11/2022)
 */
 function validateData() {
    try {
        // lấy các trường require
        var inputRequired = $(".model input[required]");

        // validate từng trường
        for(const input of inputRequired) {
            var value = $(input).val();
            if (!value) {
            var label = $(input).attr("label");
            errMsg.push(`${label} không được phép để trống.`);}
        }
    } catch (error) {
        console.log(error);
    }
}


/**
 * Show dialog warning
 * Author: doduyhung1292 (07/11/2022)
 */

function showDialogNotice(msg) {
    try {
        var dialogNotice = $(".dialog-notice");
        $(dialogNotice).css("display", "flex");

        

        // Push cảnh báo lỗi từ errMsg vào trong dialog notice
        for ( const msg of errMsg) {
            var warningItem = `<div class="warning">${msg}</div>`;
            $(".content-warning").append(warningItem);
        }
    } catch (error) {
        console.log(error);
    }
}

function sendApiSaveData() {
    try {
        var employee = {
            EmployeeCode: $("#id-employee").val(),
            EmployeeName: $("#full-name").val(),
            Email: $("#email").val(),
            PhoneNumber: $("#mobile-phone-number").val(),
            DepartmentId: "469b3ece-744a-45d5-957d-e8c757976496"
        }

        $.ajax({
            type: "POST",
            url: "https://amis.manhnv.net/api/v1/Employees",
            data: JSON.stringify(employee),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                $(".notice-success").css("display", "flex");
                setTimeout(function() {
                    $(".notice-success").css("display", "none");
                }, 2000);

                $(".model").css("display", "none");
            },
            error: function (response) {
                switch (response.status) {
                    case 400:
                        showDialogNoticeServer(response.responseJSON.userMsg);
                        break;
                
                    default:
                        break;
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Show dialog warning from server
 * Author: doduyhung1292 (07/11/2022)
 */

 function showDialogNoticeServer(msg) {
    try {
        var dialogNotice = $(".dialog-notice");
        $(dialogNotice).css("display", "flex");

        // Push cảnh báo lỗi từ errMsg vào trong dialog notice
            var warningItem = `<div class="warning">${msg}</div>`;
            $(".content-warning").append(warningItem);

    } catch (error) {
        console.log(error);
    }
}

/**
 * Get data employees
 * Author: doduyhung1292 (07/11/2022)
 */

function loadData() {
    try {
        $.ajax({
            type: "GET",
            url: "https://amis.manhnv.net/api/v1/Employees",
            success: function (response) {
                for (emp of response) {
                    var employeeCode = emp.EmployeeCode;
                    var employeeName = emp.EmployeeName;

                    var trHTML = `
                    <tr>
                        <td class="td__checkbox">
                            <input type="checkbox">
                        </td>
                        <td class="td__employee-id">${employeeCode}</td>
                        <td>${employeeName}</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td class="td__function" style="display: flex;
                        flex-direction: row;  align-items: center;justify-content: center;">
                            Sửa
                            <div class="dropdown">
                                <select style="height: 16px; width: 19px;border: none; margin: 0">
                                    <option hidden></option>
                                    <option><button>Nhân bản</button></option>
                                    <option><button>Xóa</button></option>
                                    <option><button>Sử dụng</button></option>
                                </select>
                            </div>
                        </td>
                    </tr>`;
                $("tbody").append(trHTML);
                }
            },
            error: function (response) {

            }
        });
    } catch (error) {
        console.log(error);
    }
}