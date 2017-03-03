$(function(){

        $("#typed").typed({
            strings: ["tutor","lawyer","plumber", "dog walker","mechanic","Neighbor Network!"],
            // stringsElement: $('#typed-strings'),
            typeSpeed: 70,
            backDelay: 500,
            loop: false,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
            callback: function(){ foo(); },
            resetCallback: function() { newTyped(); }
        });

        $(".reset").click(function(){
            $("#typed").typed('reset');
        });

    });

    function newTyped(){ /* A new typed object */ }

    function foo(){ console.log("Callback"); }

//