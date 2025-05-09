var addressCondition = 0;
function getRegionsData() {
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refregion.csv",
        //dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].replaceAll('"', '').split(",");
            //console.log(array.length);
            //console.log(headers);
            $("#region").empty();
            $("#region").append('<option value="0" disabled selected></option>');
            $("#region").append('<option value="0" disabled >Select Region</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].replaceAll('"', '').split(",");

                $("#region").append('<option value="' + headers[2] + '" data-id="' + headers[3] + '">' + headers[2] + "</option>");
            }
        }
    });
}
function getProvinceData() {
    var region = $("#region option:selected").data('id').toString().trim();
    region = parseInt(region, 10);
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refprovince.csv",
        dataType: "text",
        success: function (data) {
            const array = data.toString().split("\n");
            $("#province").empty();
            $("#province").append('<option value="0" disabled selected></option>');
            $("#province").append('<option value="0" disabled >Select Province</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].replaceAll('"', '').split(",");
                var lookupProvince = parseInt(headers[3], 10);
                //console.log(headers[3]);
                if (lookupProvince == region) {
                    //console.log(headers[2].replaceAll('"', ''));
                    //console.log(headers[2]);
                    //console.log(lookupProvince);
                    //console.log(region);
                    $("#province").append('<option value="' + headers[2] + '"  data-id="' + headers[4] + '">' + headers[2] + "</option>");
                }

            }


        }
    });
}
function getCityData() {
    var province = $("#province option:selected").data('id').toString().trim();
    province = parseInt(province, 10);
    //console.log("province");
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refcitymun.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",");
            //console.log(array.length);
            $("#municipality").empty();
            $("#municipality").append('<option value="0" disabled selected></option>');
            $("#municipality").append('<option value="0" disabled >Select City</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].replaceAll('"', '').split(",");
                var lookUpCity = parseInt(headers[4], 10);
                //console.log(headers[2]);
                if (lookUpCity == province) {
                    $("#municipality").append('<option value="' + headers[2] + '"  data-id="' + headers[5] + '">' + headers[2] + "</option>");
                }

            }

        }
    });
}
function getBarangayData() {
    var city = $("#municipality option:selected").data('id').toString().trim();

    city = parseInt(city, 10);
    //console.log("city");
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refbrgy.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].replaceAll('"', '').split(",");
            //console.log(array.length);
            $("#barangay").empty();
            $("#barangay").append('<option value="0" disabled selected></option>');
            $("#barangay").append('<option value="0" disabled >Select Barangay</option>');
            for (var i = 0; i < array.length; i++) {
                let headers = array[i].replaceAll('"', '').split(",");
                //console.log(headers[2]);
                if (headers[5] == city) {
                    $("#barangay").append('<option value="' + headers[2] + '">' + headers[2].toUpperCase() + "</option>");
                }

            }

        }
    });
}
function addressDOM() {
    var region = document.getElementById('region');
    var province = document.getElementById('province');
    var municipality = document.getElementById('municipality');
    var barangay = document.getElementById('barangay');

    province.disabled = 'true';
    municipality.disabled = 'true';
    barangay.disabled = 'true';
    $("#region").change(function () {
        var regionValue = $("#region option:selected").data('id');
        //console.log(regionValue);

        localStorage.setItem('region', regionValue);

        getProvinceData();
        $("#province").removeAttr('disabled');
        //console.log($("#region option:selected").text());
    });
    $("#province").change(function () {
        getCityData();
        $("#municipality").removeAttr('disabled');
        //console.log($("#province option:selected").text());
    });
    $("#municipality").change(function () {
        getBarangayData();
        $("#barangay").removeAttr('disabled');
        console.log($("#municipality option:selected").text());
    });
    $("#barangay").change(function () {
        console.log($("#barangay option:selected").text());
    });
}
function GetAllDataAddress() {
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refregion.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#region").empty();
            $("#region").append('<option value="0" disabled selected>Select Region</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",");
                //console.log(headers[2]);
                $("#region").append('<option value="' + headers[2].replaceAll('"', '') + '" data-id="' + headers[3].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '') + "</option>");
            }


        }
    });
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refprovince.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#province").empty();
            $("#province").append('<option value="0" disabled selected>Select Province</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",")
                //console.log(region);
                $("#province").append('<option value="' + headers[2].replaceAll('"', '') + '"  data-id="' + headers[4].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '') + "</option>");

            }

        }
    });
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refcitymun.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#municipality").empty();
            $("#municipality").append('<option value="0" disabled selected>Select City</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",")
                //console.log(headers[2]);
                $("#municipality").append('<option value="' + headers[2].replaceAll('"', '') + '"  data-id="' + headers[5].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '') + "</option>");


            }

        }
    });
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refbrgy.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#barangay").empty();
            $("#barangay").append('<option value="0" disabled selected>Select Barangay</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",")
                //console.log(headers[2]);
                $("#barangay").append('<option value="' + headers[2].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '').toUpperCase() + "</option>");


            }

        }
    });
}

function initializeEmployeeListDataTable() {
    var tableId = '#emp-table';
    var lastSelectedRow = null;
    var img = "/img/OPTION.webp";
    // Check if DataTable is already initialized
    if ($.fn.DataTable.isDataTable(tableId)) {
        // Destroy the existing DataTable instance
        $(tableId).DataTable().clear().destroy();
    }

    // Get date values
    // var data = {
    //     datefrom: $('#datefrom_ol').val(),
    //     dateto: $('#dateto_ol').val() // Assuming this refers to the date input element
    // };
    const data = { Username: 'username', Department: 'department', page: 1 };
    // DataTable properties
    var dtProperties = {
        ajax: {
            url: '/Employee/GetDataRegistrationList',
            type: "POST",
            data: {
                data: data
            },
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {
                var url = new URL(window.location.href);
                var _currentPage = url.searchParams.get("page01") == null ? 1 : url.searchParams.get("page01");
                // console.log('table1', _currentPage);
                table.page(_currentPage - 1).draw('page');
            },
            error: function (err) {
                alert(err.responseText);
            }
        },
        responsive: true,
        "columns": [
            { "title": "<input type='checkbox' id='checkAllemployee' class='checkAllemployee'>", "data": null, "orderable": false },
            {
                "title": "Profile",
                "data": "id",
                "render": function (data, type, row) {

                    // var images = "https://eportal.odeccisolutions.com/" + row['filePath'] == null ? img : "https://eportal.odeccisolutions.com/" + row['filePath'];
                    var images = "../../" + row['filePath'] == null ? img : "../../" + row['filePath'];
                    let profile = "";
                    var initial = row['fname'].charAt(0) + row['lname'].charAt(0);
                    var fullname = row['fullname'].toUpperCase();
                    var employeeId = row['employeeId'].toUpperCase();
                    initial = initial.toUpperCase()
                    if (row['filePath'] == "" || row['filePath'] == null) {
                        profile = `<div class="employeeprofile">
                                        <div class="initial"> ${initial} </div>
                                        <div class="empdetails">
                                            <strong>${fullname}</strong>
                                            <span>${employeeId}</span>
                                        </div>
                                    </div>`;
                    }
                    else {
                        profile = `<div class="data-img"> <img src='${images}' width="100%" /> </div>`;
                        profile = `<div class="employeeprofile">
                                        <div class="data-img"> <img src='${images}' width="100%" /> </div>
                                        <div class="empdetails">
                                            <strong>${fullname}</strong>
                                            <span>${employeeId}</span>
                                        </div>
                                    </div>`;
                    }
                    return profile;
                }
            },

            {
                "title": "Position",
                "data": "position"
            },
            {
                "title": "Email",
                "data": "email"
            },
            {
                "title": "Gender",
                "data": "gender"
            },
            {
                "title": "Action",
                "data": "id", "orderable": false,
                "render": function (data, type, row) {
                    var button = `<label class="popup">
                                    <input type="checkbox">
                                    <div class="burger" tabindex="0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="5" viewBox="0 0 20 5" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 5C16.837 5 16.2011 4.73661 15.7322 4.26777C15.2634 3.79893 15 3.16304 15 2.5C15 1.83696 15.2634 1.20107 15.7322 0.732234C16.2011 0.263393 16.837 0 17.5 0C18.163 0 18.7989 0.263393 19.2678 0.732234C19.7366 1.20107 20 1.83696 20 2.5C20 3.16304 19.7366 3.79893 19.2678 4.26777C18.7989 4.73661 18.163 5 17.5 5ZM2.5 5C1.83696 5 1.20107 4.73661 0.732233 4.26777C0.263392 3.79893 0 3.16304 0 2.5C0 1.83696 0.263392 1.20107 0.732233 0.732234C1.20107 0.263393 1.83696 0 2.5 0C3.16304 0 3.79893 0.263393 4.26777 0.732234C4.73661 1.20107 5 1.83696 5 2.5C5 3.16304 4.73661 3.79893 4.26777 4.26777C3.79893 4.73661 3.16304 5 2.5 5ZM10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5C7.5 1.83696 7.76339 1.20107 8.23223 0.732234C8.70107 0.263393 9.33696 0 10 0C10.663 0 11.2989 0.263393 11.7678 0.732234C12.2366 1.20107 12.5 1.83696 12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5Z" fill="#205375"/>
                                        </svg>
                                    </div>
                                    <nav class="popup-window">
                                        
                                        <button class="tbl-edit btn btn-info act-btn" data-id="${data}" style="width: 100px; font-size:13px; padding: 5px 5px">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                                Edit
                                        </button>
                                        <button class="tbl-delete btn btn-danger act-btn" data-id="${data}" style="width: 100px; font-size:13px; padding: 5px 5px">
                                            <i class="fa-solid fa-trash"></i>
                                            Delete
                                        </button>
                                    </nav>
                                </label>`;
                    return button;
                }
            }
        ], lengthChange: false,
        dom: 'frtip',
        responsive: true,
        pagingType: "simple_numbers",
        language: {
            searchPlaceholder: "Type to search...",
            search: ""
        },
        pageLength: 10,
        order: [[0, 'desc']], // Sort the second column (index 1) by descending order
        columnDefs: [
            {
                targets: [0], // Checkbox column
                searchable: false,
                width: "5%", // Adjust width
                "className": "text-center",
                render: function (data, type, row) {
                    return '<input type="checkbox" id="" class="salary-row-checkbox" value="' + row.id + '">';
                },
                orderable: false,
            }
        ]
    };
    $('#emp-table').on('page.dt', function () {

        var info = table.page.info();
        var url = new URL(window.location.href);
        url.searchParams.set('page01', (info.page + 1));
        window.history.replaceState(null, null, url);
    });

    var table = $(tableId).DataTable(dtProperties);
    $(tableId + '_filter input').attr('placeholder', 'Searching...');
    $(tableId + ' tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        // console.log(data);
        // Remove highlight from the previously selected row
        if (lastSelectedRow) {
            $(lastSelectedRow).removeClass('selected-row');
        }

        // Highlight the currently selected row
        $(this).addClass('selected-row');
        lastSelectedRow = this;

    });
}


//Employee Type
function initializeEmployeeTypeDataTable() {
    var tableId = '#etype-table';
    var lastSelectedRow = null;

    // Check if DataTable is already initialized
    if ($.fn.DataTable.isDataTable(tableId)) {
        // Destroy the existing DataTable instance
        $(tableId).DataTable().clear().destroy();
    }

    var dtProperties = {
        ajax: {
            url: '/EmployeeType/GetETypeList',
            type: "GET",
            data: {
            },
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {

            },
            error: function (err) {
                alert(err.responseText);
            }
        },
        columns: [
            { "title": "<input type='checkbox' id='checkAlletype' class='checkAlletype'>", "data": null, "orderable": false },
            {
                "title": "Type",
                "data": "title"
            },
            {
                "title": "Description",
                "data": "description"
            },

            {
                "title": "Action",
                "data": "id",
                "render": function (data, type, row) {

                    var button = `<label class="popup">
                                    <input type="checkbox">
                                    <div class="burger" tabindex="0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="5" viewBox="0 0 20 5" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 5C16.837 5 16.2011 4.73661 15.7322 4.26777C15.2634 3.79893 15 3.16304 15 2.5C15 1.83696 15.2634 1.20107 15.7322 0.732234C16.2011 0.263393 16.837 0 17.5 0C18.163 0 18.7989 0.263393 19.2678 0.732234C19.7366 1.20107 20 1.83696 20 2.5C20 3.16304 19.7366 3.79893 19.2678 4.26777C18.7989 4.73661 18.163 5 17.5 5ZM2.5 5C1.83696 5 1.20107 4.73661 0.732233 4.26777C0.263392 3.79893 0 3.16304 0 2.5C0 1.83696 0.263392 1.20107 0.732233 0.732234C1.20107 0.263393 1.83696 0 2.5 0C3.16304 0 3.79893 0.263393 4.26777 0.732234C4.73661 1.20107 5 1.83696 5 2.5C5 3.16304 4.73661 3.79893 4.26777 4.26777C3.79893 4.73661 3.16304 5 2.5 5ZM10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5C7.5 1.83696 7.76339 1.20107 8.23223 0.732234C8.70107 0.263393 9.33696 0 10 0C10.663 0 11.2989 0.263393 11.7678 0.732234C12.2366 1.20107 12.5 1.83696 12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5Z" fill="#205375"/>
                                        </svg>
                                    </div>
                                    <nav class="popup-window">
                                        <button class="tbl-edit btn btn-info act-btn" id="add-timeout" title="Time Out"
                                            data-id="${data}"
                                            data-title="${row.title}"
                                            data-description="${row.description}"
                                            data-schedule = "${row.scheduleId}"
                                            >
                                            <i class="fa-solid fa-pen-to-square"></i> edit
                                        </button>
                                        <button class="tbl-delete btn btn-danger act-btn" id="add-timeout" title="Time Out"
                                            data-id="${data}"
                                            data-title="${row.title}"
                                            data-description="${row.description}"
                                            data-schedule = "${row.scheduleId}"
                                            >
                                            <i class="fa-solid fa-trash"></i> delete
                                        </button>
                                    </nav>
                                </label>`;

                    return button;
                }
            }
        ], lengthChange: false,
        dom: 'frtip',
        responsive: true,
        pagingType: "simple_numbers",
        language: {
            searchPlaceholder: "Type to search...",
            search: ""
        },
        order: [[0, 'desc']], // Sort the second column (index 1) by descending order
        columnDefs: [
            {
                targets: [0], // Checkbox column
                searchable: false,
                width: "5%", // Adjust width
                "className": "text-center",
                render: function (data, type, row) {
                    return '<input type="checkbox" id="" class="etype-row-checkbox" value="' + row.id + '">';
                },
                orderable: false,
            },
            {
                targets: 0,
                orderable: false,
            },
            {
                targets: 1,
                orderable: false,
            },
            {
                targets: 2,
                orderable: false,
            },
            {
                targets: 3,
                orderable: false,
            },
        ]

    };

    var table = $(tableId).DataTable(dtProperties);

    // Attach computeTotalRenderedHours to the search event
    $(tableId + '_filter input').on('keyup', function () {
        computeTotalRenderedHours();
    });

    $(tableId).on('page.dt', function () {
        var info = table.page.info();
        var url = new URL(window.location.href);
        url.searchParams.set('page01', (info.page + 1));
        window.history.replaceState(null, null, url);
    });

    $(tableId + '_filter input').attr('placeholder', 'Search anything here...');

    $(tableId + ' tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        // console.log(data);
        // Remove highlight from the previously selected row
        if (lastSelectedRow) {
            $(lastSelectedRow).removeClass('selected-row');
        }

        // Highlight the currently selected row
        $(this).addClass('selected-row');
        lastSelectedRow = this;
    });
}
function openETypeModal() {
    document.getElementById('eTypeId').value = "";
    document.getElementById('eTypetitle').value = "";
    document.getElementById('eTypedescription').value = "";
    document.getElementById('schedule').value = "";
    etypemodal.style.display = "flex";
    actionetype.style.display = "none";
    penciletype.style.display = "none";
}
function closeETypeModal() {
   
    etypemodal.style.display = "none";
    actionetype.style.display = "none";
    penciletype.style.display = "flex";
}
$('#etype-table').on('click', '.tbl-edit', function () {


    document.getElementById('eTypeId').value = $(this).data('id');
    document.getElementById('eTypetitle').value = $(this).data('title');
    document.getElementById('eTypedescription').value = $(this).data('description');
    document.getElementById('schedule').value = $(this).data('schedule');

    //etmodal = document.getElementById('etypemodal');
    etypemodal.style.display = "flex";
});
$('#etype-table').on('click', '.tbl-delete', function () {
    var id = $(this).data('id');
    localStorage.setItem('etypeid', id);

    deletemodalEType();
    $("#alertmodal").modal('show');
});
function delete_item_EType() {
    var data = {};
    var eTypeId = localStorage.getItem('etypeid');
    data.id = eTypeId;
    data.title = "";
    $.ajax({
        url: '/EmployeeType/AddEType',
        data: data,
        type: "POST",
        dataType: "json"
    }).done(function (data) {
        //console.log(data);
        notifyMsg('Success!', 'Successfully Deleted', 'green', 'fas fa-check');
        $("#alertmodal").modal('hide');
        initializeEmployeeTypeDataTable();
    });
}
$("#add-eType-form").on("submit", function (event) {
    event.preventDefault();
    var eTypeId = document.getElementById('eTypeId').value;
    var eTypetitle = document.getElementById('eTypetitle').value;
    var eTypedescription = document.getElementById('eTypedescription').value;
    var schedule = document.getElementById('schedule').value;

    var data = {};
    data.id = eTypeId;
    data.title = eTypetitle;
    data.description = eTypedescription;
    data.scheduleId = schedule;
    // console.log(data);

    var etmodal = document.getElementById('etypemodal');
    $.ajax({
        url: '/EmployeeType/AddEType',
        data: data,
        type: "POST",
        dataType: "json"
    }).done(function (data) {
        //console.log(data);
        notifyMsg('Success!', data.status, 'green', 'fas fa-check');
        etmodal.style.display = "none";
        initializeEmployeeTypeDataTable();
        penciletype.style.display = "flex";
    });

});
$('#etype-table').on('click', '.checkAlletype', function () {

    var checkAll = document.getElementById("checkAlletype");

    if (checkAll.checked == true) {
        var checkboxes = document.querySelectorAll('.etype-row-checkbox');
        for (var checkbox of checkboxes) {
            checkbox.checked = this.checked;
        }
    }
    else {
        var checkboxes = document.querySelectorAll('.etype-row-checkbox');
        for (var checkbox of checkboxes) {
            checkbox.checked = false;
        }
    }
});
function etypeActionFunction() {

    //payrollmodal.style.display = "none";
    actionetype.style.display = "flex";
    penciletype.style.display = "none";
}
function MultiDeleteEType() {
    var checkboxes = document.querySelectorAll('.etype-row-checkbox');
    var checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);


    actionetype.style.display = "none";
    penciletype.style.display = "flex";
    if (checkedCheckboxes.length == 0) {
        notifyMsg('Warning!', 'Select Employee Type First', 'yellow', 'fas fa-check');
    }
    else {

        for (var checkbox of checkedCheckboxes) {
            var value = checkbox.value;

            var data = {};
            data.id = value;
            data.title = "";
            $.ajax({
                url: '/EmployeeType/AddEType',
                data: data,
                type: "POST",
                dataType: "json"
            }).done(function (data) {
                //console.log(data);
                //notifyMsg('Success!', 'Successfully Deleted', 'green', 'fas fa-check');
                //$("#alertmodal").modal('hide');
                //initializeEmployeeTypeDataTable();
            });
        }


        notifyMsg('Success!', 'Successfully Deleted', 'green', 'fas fa-check');
        window.location.reload();
    }
}

function WizzardFunction() {
    var prev = document.getElementById('wizzard-prev');
    var next = document.getElementById('wizzard-next');
    if (wizzardPage == 1) {
        prev.disabled = true;
    }
    else {
        prev.disabled = false;
    }
    if (wizzardPage == 5) {
        next.disabled = true;
    }
    else {
        next.disabled = false;
    }
}
//Wizzard Form
$('#wizzard-prev').on('click', function () {
    if (wizzardPage == 2) {
        page2.classList.remove('active');
        page2.classList.remove('completed');
        page1.classList.remove('completed');
        page1.classList.add('active');


        pagecontainer1.style.display = "flex";
        pagecontainer2.style.display = "none";
    }
    else if (wizzardPage == 3) {
        page3.classList.remove('active');
        page3.classList.remove('completed');
        page2.classList.remove('completed');
        page2.classList.add('active');

        pagecontainer2.style.display = "flex";
        pagecontainer3.style.display = "none";
    }
    else if (wizzardPage == 4) {
        page4.classList.remove('active');
        page4.classList.remove('completed');
        page3.classList.remove('completed');
        page3.classList.add('active');

        pagecontainer3.style.display = "flex";
        pagecontainer4.style.display = "none";
    }
    else if (wizzardPage == 5) {
        page5.classList.remove('active');
        page5.classList.remove('completed');
        page4.classList.remove('completed');
        page4.classList.add('active');

        pagecontainer4.style.display = "flex";
        pagecontainer5.style.display = "none";
    }
    wizzardPage--;
    WizzardFunction();
});
$('#wizzard-next').on('click', function () {
    if (wizzardPage == 1) {
        page1.classList.remove('active');
        page1.classList.add('completed');
        page2.classList.add('active');

        pagecontainer1.style.display = "none";
        pagecontainer2.style.display = "flex";

    } else if (wizzardPage == 2) {
        page2.classList.remove('active');
        page2.classList.add('completed');
        page3.classList.add('active');

        pagecontainer2.style.display = "none";
        pagecontainer3.style.display = "flex";

    } else if (wizzardPage == 3) {
        page3.classList.remove('active');
        page3.classList.add('completed');
        page4.classList.add('active');

        pagecontainer3.style.display = "none";
        pagecontainer4.style.display = "flex";

    } else if (wizzardPage == 4) {
        page4.classList.remove('active');
        page4.classList.add('completed');
        page5.classList.add('active');

        pagecontainer4.style.display = "none";
        pagecontainer5.style.display = "flex";
    }
    wizzardPage++;
    WizzardFunction();
});


//Files Upload
function filesUpload() {
    const dropArea = document.getElementById('drop-area');
    const fileList = document.getElementById('file-list');
    const fileElem = document.getElementById('fileElem');

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('highlight');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('highlight');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('highlight');
        handleFiles(e.dataTransfer.files);
    });

    fileElem.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        [...files].forEach(uploadFile);
    }

    function uploadFile(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';

        const fileName = document.createElement('div');
        fileName.innerHTML = `<strong>${file.name}</strong>`;

        const status = document.createElement('div');
        status.textContent = 'Uploading...';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        const actions = document.createElement('div');
        actions.className = 'file-actions';

        const cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = '??';
        actions.appendChild(cancelBtn);

        cancelBtn.addEventListener('click', () => {
            fileItem.remove();
        });

        fileItem.append(fileName, status, progressBar, actions);
        fileList.appendChild(fileItem);

        // Simulate upload
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20; // random speed
            progressBar.style.width = `${Math.min(progress, 100)}%`;

            if (progress >= 100) {
                clearInterval(interval);
                status.innerHTML = '<span style="color: green;">Completed</span>';
                cancelBtn.innerHTML = '???';
                cancelBtn.onclick = () => fileItem.remove();
            }
        }, 500);
    }

}