$(document).ready(function () {
    $(".error").hide();
    $("#logged-in").hide();

    //Login click / enter
    $(".login").click(function () {
        $(".error").hide();
        if ($(".login-password").val().length <= 0 && $(".login-username").val().length > 0)
        {
            $(".p-inc").show();
        }
        else
            $.ajax(Login());
    });
    $(".login-password").keydown(function (event) {
        if (event.keyCode == 13) {
            $(".login").click();
        }
    });

    //Create Account click / enter
    $(".create").click(function () {
        $(".error").hide();
        if ($(".create-email2").val().length <= 0 && $(".create-email1").val().length > 0) {
            $(".e-match").show();
        }
        else
            $.ajax(CreateAcct());
    });
    $(".create-password").keydown(function (event) {
        if (event.keyCode == 13) {
            $(".create").click();
        }
    });
    $(".create-email2").keydown(function (event) {
        if (event.keyCode == 13) {
            $(".create").click();
        }
    });

    //Add element
    $(".add-elem").click(function () {
        $(".error").hide();
        if ($(".elem-name").val().length <= 0)
        {
            $(".e-elem").show();
        }
        else
            $.ajax(AddElement());
    });
    $(".elem-val").keydown(function (event) {
        if (event.keyCode == 13) {
            $(".add-elem").click();
        }
    });
});

//update element on update button click
$(document).on("click", ".dynam", function (e) {
    var target = $(e.target);
    for (var i = 1; i < length; i++)   
    {
        if(target.is(".acct-up" + i))
            Update(i);
    }
});

//updates existing element
Update = function(i)
{
    $.ajax({
        type: "GET",
        url: "Home/AddOrUpdateElement",
        data: {
            "Username": $(".login-username").val(),
            "ElementName": $(".acct-info" + i).text().toLowerCase(),
            "ElementValue": $(".acct-val" + i).val().toLowerCase()
        },
        success: function (Message) {
            m = Message;
            if (m.includes("Error" && "Username" && "Exist"))
                alert("Username Does Not Exist!");
            else if (m.includes("Error" && "Username" && "Change"))
                alert("Cannot Change Username!");
            if (m.includes("Error" && "ElementName"))
                $(".n-elem").show();
            if (m.includes("Payload")) {
                $(".acct-val" + i).val($(".acct-val" + i).val().toLowerCase());
                alert("Element updated");
                $(".bottom-screen").find(".elem-name").val("");
                $(".bottom-screen").find(".elem-val").val("");
            }
        }
    });
}

//Login screen - login
Login = function()
{
    $.ajax({
        type: "GET",
        url: "Home/Login",
        data: {
            "Username": $(".login-username").val(),
            "Password": $(".login-password").val()
        },
        success: function (Message) {
            var m = Message;
            if (m.includes('"Username":"Invalid"'))
                $(".u-inc").show();
            else if (m.includes('"Password":"Wrong"'))
                $(".p-inc").show();

            if (m.includes("Success")) {
                
                $("#logged-in").animate({ width: 'toggle' }, 700, function () {
                    $(this).show();
                });
                $("#logged-out").animate({ width: 'toggle' }, 700, function () {
                    $(this).hide();
                });
                PopulateAcctInfo();
            }
        }
    });
}

//Login screen - Create Account
CreateAcct = function () {
    $.ajax({
        type: "GET",
        url: "Home/CreateAccount",
        data: {
            "Username": $(".create-username").val(),
            "Password": $(".create-password").val(),
            "EmailAdd": $(".create-email1").val(),
            "EmailCon": $(".create-email2").val()
        },
        success: function (Message) {
            var m = Message;
            if (m.includes('"Username":"Exists"'))
                $(".u-exist").show();
            else if (m.includes('"Username":"Invalid"'))
                $(".u-inval").show();
            if (m.includes('"Password":"Invalid"'))
                $(".p-inval").show();
            if (m.includes('"EmailAdd":"Invalid"'))
                $(".e-inval").show();
            if (m.includes('"EmailCon":"Mismatch"'))
                $(".e-match").show();
            if (m.includes("Success"))
            {
                alert("Account successfully created!");
                $(".user-info").find("input").val("");
            } 
        }
    });
}

//populates screen with account info according to login
PopulateAcctInfo = function()
{
    $.ajax({
        type: "GET",
        url: "Home/GetAccountInformation",
        data: {
            "Username": $(".login-username").val()
        },
        success: function (Message) {
            m = Message;
            if (m.includes("Error"))
                $(".account-id").text("Username Does Not Exist");
            else if (m.includes("Payload"))
            {
                //splits message string into array
                FormatString(m);

                //Overwrite placeholder username
                $("#account-name").text(items[0].substring(items[0].lastIndexOf('"'), items[0].lastIndexOf(':')));
                $(".account-id").text(items[0].substring(items[0].lastIndexOf(':') + 1));

                //add and populate elements
                for(var i = 1; i < items.length; i++)
                {
                    //if element does not already exist
                    if (!$(".acct-info" + i).length) {
                        AddInfo(i);
                    }
                    //Overwrite value with new value if element does exist
                    else
                    {
                        $(".acct-val" + i).val(items[i].substring(items[i].lastIndexOf(':') + 1));
                    }
                }
            }
        }
    });
}

//splits account info string into array
FormatString = function (m)
{
    //splits string into array
    items = m;
    items = items.substring(m.lastIndexOf('username'), m.lastIndexOf('"}}'));
    items = items.split('\",');
    length = items.length;
    //removes extra characters in file
    for (var i = 0; i < items.length; i++) {
        items[i] = items[i].replace(/\\"/g, '').replace(/\\/g, '');
    }
}

//Adds html for elements in user info
AddInfo = function (i)
{
    //adds password field
    if (i == 1) {
        $(".account-id").after('<div class="' + i + ' field-label acct-info' + i
        + '">Placeholder' + '</div><input class="textbox acct-val' + i
        + '" type="password" value="" /><div class="dynam button acct-up' + i
        + '" unselectable="on">Update</div>')
        $(".acct-info" + i).text(items[i].substring(items[i].lastIndexOf('"'), items[i].lastIndexOf(':')));
        $(".acct-val" + i).val(items[i].substring(items[i].lastIndexOf(':') + 1));
    }

    //adds all other fields
    else {
        $(".account-id").after('<div class="' + i + ' field-label acct-info' + i
        + '">Placeholder' + '</div><input class="textbox acct-val' + i
        + '" type="text" value="" /><div class="dynam button acct-up' + i
        + '" unselectable="on">Update</div>')
        $(".acct-info" + i).text(items[i].substring(items[i].lastIndexOf('"'), items[i].lastIndexOf(':')));
        $(".acct-val" + i).val(items[i].substring(items[i].lastIndexOf(':') + 1));
    }
}

//adds new element
AddElement = function ()
{
    $.ajax({
        type: "GET",
        url: "Home/AddOrUpdateElement",
        data: {
            "Username": $(".login-username").val(),
            "ElementName": $(".elem-name").val().toLowerCase(),
            "ElementValue": $(".elem-val").val().toLowerCase()
        },
        success: function (Message) {
            m = Message;
            if (m.includes("Error" && "Username" && "Exist"))
                $(".account-name").text("Username does not exist");
            else if (m.includes("Error" && "Username" && "Change"))
                $(".u-elem").show();
            if (m.includes("Error" && "ElementName"))
                $(".n-elem").show();
            if (m.includes("Payload")) {
                PopulateAcctInfo();
            }
        }
    });
    $(".bottom-screen").find(".elem-name").val("");
    $(".bottom-screen").find(".elem-val").val("");
}

