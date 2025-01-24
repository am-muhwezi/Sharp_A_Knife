$(document).ready(function() {
    $('#login-btn').on('click', function() {
      $('#login-form').removeClass('hidden');
      $('#signup-form').addClass('hidden');
      $(this).addClass('active');
      $('#signup-btn').removeClass('active');
    });
  
    $('#signup-btn').on('click', function() {
      $('#signup-form').removeClass('hidden');
      $('#login-form').addClass('hidden');
      $(this).addClass('active');
      $('#login-btn').removeClass('active');
    });

    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        var formData = {
            email: $('#login-email').val(),
            password: $('#login-password').val(),
        };
        $('#auth-btn').text("Loggin...");
    
        $.ajax({
            type: 'POST',
            url:  'http://localhost:5000/auth/login',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                $('#auth-btn').text("Logged In Successfully");
                $('#auth-btn').css("color","green");
                alert('login successful!');
                localStorage.setItem('current_user', JSON.stringify(response))
                console.log(response);
                
                setTimeout(() => {
                    location.href = "dashboard.html"
                }, 2000); 

            },
            error: function(error) {
                $('#auth-btn').text("Error");
                $('#auth-btn').css("color","yellow");
                alert('An error occurred during Log In. Please try again.'); 
            }
          });
        });
        
    $('#signup-form').on('submit', function(event) {
        event.preventDefault();
        var formData = {
            fullname: $('#signup-name').val(),
            email: $('#signup-email').val(),
            password: $('#signup-password').val(),
        };
    
        $.ajax({
            type: 'POST',
            url:  'http://localhost:5000/auth/signup',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                $('#auth-btn').text("Signed In Successfully");
                $('#auth-btn').css("color","green");
                alert('SignUp successful! Please Proceed to login');
            },
            
            error: function(error) {
                $('#auth-btn').text("Error");
                $('#auth-btn').css("color","yellow");
                alert('An error occurred during checkout. Please try again.'); 
            },
            
            });
        });
  });
  