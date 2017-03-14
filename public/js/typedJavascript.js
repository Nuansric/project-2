$(function(){
        //#typed is the ID of the section where the text needs to be pushed
        $("#typed").typed({
            // string of the words that need to be animated
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
        // not used in the app.
        // $(".reset").click(function(){
        //     $("#typed").typed('reset');
        // });

});

function newTyped(){ /* A new typed object */ }

// function foo(){ console.log("Callback"); }

//